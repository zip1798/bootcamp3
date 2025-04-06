import "dotenv/config";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
let mintPublicKey = process.env["MINT_PUBKEY"];
// let somePublicKey = process.env["SOME_PUBKEY"];

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey(mintPublicKey);

const recipientAssociatedTokenAccount = new PublicKey("HRgyNHxdiiW5regVC3CUi5ZJhmG7BKXiLCR5DLJkQK9Q");
  
  const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );
  
  const link = getExplorerLink("transaction", transactionSignature, "devnet");
  
  console.log("✅ Success!");
  console.log(`Mint Token Transaction: ${link}`);

/*
zip@pop-os:~/dev/bootcamp3/traning$ npx esrun 03-mint-token.ts 
✅ Success!
Mint Token Transaction: https://explorer.solana.com/tx/36a9SE7yXDyQuQAeM5Q4tUiC6EwoYUb82qpRZ2MPRBfnnRBQLCzMewD7wdeM4xh87qYTAphfor4xwikagGmGaz67?cluster=devnet
*/  