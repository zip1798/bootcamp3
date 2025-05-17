import "dotenv/config";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction
} from "@solana/web3.js";

import { AccountLayout } from "@solana/spl-token";
import {
  Metadata,
  PROGRAM_ID as METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";


async function getMetadata(mint: PublicKey, connection: Connection): Promise<any> {
  const [metadataPDA] = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  );

  const metadataAccount = await connection.getAccountInfo(metadataPDA);
  if (!metadataAccount) return null;

  const metadata = Metadata.deserialize(metadataAccount.data);
  return metadata[0].data;
}

const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);
const TOKEN_2022_PROGRAM_ID = new PublicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
);

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);



const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const walletPublicKey = new PublicKey("J7mvtHKC7PaPtrL53y4m39aZE6ScLtWbF7BLNYiyQCKD");

const tokenAccounts = await connection.getTokenAccountsByOwner(
  walletPublicKey, { programId: TOKEN_PROGRAM_ID }
);
const token2022Accounts = await connection.getTokenAccountsByOwner(
  walletPublicKey, { programId: TOKEN_2022_PROGRAM_ID }
);

console.log(`✅ : `);
for (const { pubkey, account } of tokenAccounts.value) {
  const accountInfo = AccountLayout.decode(new Uint8Array(account.data));
  const mintAddress = new PublicKey(accountInfo.mint);
  const amountRaw = Number(accountInfo.amount); 

  // Отримуємо decimals (опційно)
  const mintInfo = await connection.getParsedAccountInfo(mintAddress);
  //@ts-ignore
  const decimals = mintInfo.value?.data?.parsed?.info?.decimals ?? 0;
  const amount = amountRaw / Math.pow(10, decimals);  

  const metadata = await getMetadata(mintAddress, connection);
  const name = metadata?.name.trim();
  const symbol = metadata?.symbol.trim();

  console.log(`Token: ${name} (${symbol})`);
  console.log(`Amount: ${amount}`);

  console.log("Mint:", mintAddress.toBase58());
  console.log("Raw amount:", amountRaw);
  // console.log(accountInfo);
  console.log("------");
}