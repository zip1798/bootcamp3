import "dotenv/config";
import base58 from "bs58";
import { 
    mintTo, 
    getOrCreateAssociatedTokenAccount, 
    transfer, 
    createMint, 
    createTransferCheckedInstruction 
} from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { 
  Connection, 
  PublicKey, 
  clusterApiUrl, 
  Transaction, 
  Keypair,
  SystemProgram,
  NonceAccount,
  LAMPORTS_PER_SOL,
  NONCE_ACCOUNT_LENGTH 
} from "@solana/web3.js";
import {sleep, sleepAsync} from "./utils";

const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
const TRANSFER_AMOUNT = 2700;

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}

const sender = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env["SECRET_KEY"]||'')));
const recipient = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env["SECRET_KEY2"]||'')));
const nonceKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env["NONCE_ACCOUNT_KEY"]||'')));

// Create token mint account 
const mintPublicKey: PublicKey = await createMint(
    connection,
    sender,
    sender.publicKey,
    null,
    2
);

const link_create_mint = getExplorerLink("address", mintPublicKey.toString(), "devnet");
console.log(`✅ Token Mint: ${link_create_mint}`);
console.log(`Token Mint Address: ${mintPublicKey.toString()}`);

await sleepAsync(5000);

// Get Nonce Account 
let nonceAccount: NonceAccount | null = null;
nonceAccount = await getNonceAccount(nonceKeypair.publicKey);
if (nonceAccount === null) {
    await createNonceAccount(sender, sender, nonceKeypair );    
    nonceAccount = await getNonceAccount(nonceKeypair.publicKey);
}
if (nonceAccount === null) {
    throw new Error(`Unable to find nonce account: ${nonceKeypair.publicKey}`);
}

console.log('Nonce Account: ', nonceKeypair.publicKey.toBase58());
console.log('Nonce: ', nonceAccount.nonce);

await sleepAsync(5000);

// get sender token account
const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    mintPublicKey,
    sender.publicKey
);

// mint some tokens to sender
const transactionSignature = await mintTo(
    connection,
    sender,
    mintPublicKey,
    senderTokenAccount.address,
    sender,
    TRANSFER_AMOUNT
);
const linkMint = getExplorerLink("transaction", transactionSignature, "devnet");
console.log(`\n✅ Success! Mint Transaction: ${linkMint}\n`);

// get recipient token account
const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    mintPublicKey,
    recipient.publicKey
);


const transaction = new Transaction();
transaction.add(
    SystemProgram.nonceAdvance({
        noncePubkey: nonceKeypair.publicKey,
        authorizedPubkey: sender.publicKey,
    }),
    createTransferCheckedInstruction(
      senderTokenAccount.address, // source
      mintPublicKey, // mint
      recipientTokenAccount.address, // destination
      sender.publicKey, // owner of source account
      TRANSFER_AMOUNT, // amount to transfer
      2
    )
);
transaction.recentBlockhash = nonceAccount.nonce;
transaction.feePayer = recipient.publicKey;

transaction.partialSign(sender);

// Serialize the transaction and convert to base64 to return it
const serializedTransaction = transaction.serialize({
  // We will need recipient to deserialize and sign the transaction
  requireAllSignatures: false,
});
const transactionBase64 = serializedTransaction.toString("base64");
console.log(`Partial Sign Transaction: ${transactionBase64}\n`);

console.log("Start sleep for 120sec "+(new Date().toLocaleString()));
await sleepAsync(120000);
console.log("End sleep for 120sec "+(new Date().toLocaleString()));

////////////////////////////////////////////////////////////////////////////////////////////
// Recipient part of the transaction


// Get solana balances of sender and recipient
const senderBalance = await connection.getBalance(sender.publicKey);
const recipientBalance = await connection.getBalance(recipient.publicKey);
console.log('\n💰 Solana balances before transfer:');
console.log(`Sender ${sender.publicKey.toBase58()} balance: ${senderBalance / LAMPORTS_PER_SOL} SOL`);
console.log(`Recipient ${recipient.publicKey.toBase58()} balance: ${recipientBalance / LAMPORTS_PER_SOL} SOL \n`);

// Deserialize the transaction
const recoveredTransaction = Transaction.from(
  Buffer.from(transactionBase64, "base64")
);

recoveredTransaction.partialSign(recipient);
const recoveredTransactionSignature = await connection.sendRawTransaction(
    recoveredTransaction.serialize(),
  );

const linkRecoveredTransactionSignature = getExplorerLink("transaction", recoveredTransactionSignature, "devnet");
console.log(`✅ Success! Partial Transfer Transaction: ${linkRecoveredTransactionSignature}`);
console.log(`💰 Sent ${TRANSFER_AMOUNT / MINOR_UNITS_PER_MAJOR_UNITS} tokens (${mintPublicKey.toString()}) from ${sender.publicKey.toBase58()} to ${recipient.publicKey.toBase58()}`);
await sleepAsync(60000);  

const senderPostBalance = await connection.getBalance(sender.publicKey);
const recipientPostBalance = await connection.getBalance(recipient.publicKey);
console.log('\n💰 Solana balances after transfer:');
console.log(`Sender ${sender.publicKey.toBase58()} balance: ${senderPostBalance / LAMPORTS_PER_SOL} SOL`);
console.log(`Recipient ${recipient.publicKey.toBase58()}  balance: ${recipientPostBalance / LAMPORTS_PER_SOL} SOL`);


async function createNonceAccount(payer: Keypair, auth: Keypair, nonceAccount: Keypair ) {
    let tx = new Transaction();
    tx.add(
        // create nonce account
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: nonceAccount.publicKey,
            lamports: await connection.getMinimumBalanceForRentExemption(NONCE_ACCOUNT_LENGTH),
            space: NONCE_ACCOUNT_LENGTH,
            programId: SystemProgram.programId,
        }),
        // init nonce account
        SystemProgram.nonceInitialize({
            noncePubkey: nonceAccount.publicKey, // nonce account pubkey
            authorizedPubkey: auth.publicKey, // nonce account auth
        })
    );
    tx.feePayer = payer.publicKey;
    const signature = await connection.sendTransaction(tx, [nonceAccount, payer])
    const link = getExplorerLink("transaction", signature, "devnet");

    console.log(`Nonce Account: ${nonceAccount.publicKey.toBase58()}`);
    console.log(`Create Nonce Account Transaction: ${link}`)
}


async function getNonceAccount(nonceAccountPubkey: PublicKey) { 
    const accountInfo = await connection.getAccountInfo(nonceAccountPubkey);

    if (accountInfo === null) {
        return null;
        // throw new Error(`Unable to find nonce account: ${nonceAccountPubkey}`);
    }

    return  NonceAccount.fromAccountData(accountInfo.data);
}