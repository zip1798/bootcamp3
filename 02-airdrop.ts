import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
  Keypair
} from "@solana/web3.js";
import { airdropIfRequired } from "@solana-developers/helpers"

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`⚡️ Connected to devnet`);

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);
const pubkeyString = keypair.publicKey.toBase58();

const publicKey = new PublicKey(pubkeyString);

// first method airdrop
const airdrop1 = await airdropIfRequired(connection, publicKey, LAMPORTS_PER_SOL, 0.5 * LAMPORTS_PER_SOL);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 The balance for the wallet at address ${publicKey} is: ${balanceInSOL}`
);
