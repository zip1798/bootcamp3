import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
let mintPublicKey = process.env["MINT_PUBKEY"];
let somePublicKey = process.env["SOME_PUBKEY"];

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
  `🔑 Our pubic key is: ${sender.publicKey.toBase58()}`
);

const tokenMintAccount = new PublicKey(mintPublicKey);
  const recipient = new PublicKey(somePublicKey);
  
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
  );
  
  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
  
  const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
  );
  
  console.log(`✅ Created token account: ${link}`);

  /*
zip@pop-os:~/dev/bootcamp3/traning$ npx esrun 03-create-token-account.ts 
🔑 Our pubic key is: FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA
Token Account: HRgyNHxdiiW5regVC3CUi5ZJhmG7BKXiLCR5DLJkQK9Q
✅ Created token account: https://explorer.solana.com/address/HRgyNHxdiiW5regVC3CUi5ZJhmG7BKXiLCR5DLJkQK9Q?cluster=devnet
  */