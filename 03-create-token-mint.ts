import "dotenv/config";
import {
  getExplorerLink,
} from "@solana-developers/helpers";
import {
  Keypair,
  clusterApiUrl,
  Connection,
} from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const tokenMint = await createMint(
    connection,
    sender,
    sender.publicKey,
    null,
    2
  );
  
  const link = getExplorerLink("address", tokenMint.toString(), "devnet");
  
  console.log(`✅ Token Mint: ${link}`);

  /*

zip@pop-os:~/dev/bootcamp3/traning$ npx esrun 03-create-token-mint.ts
🔑 Our public key is: FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA
✅ Token Mint: https://explorer.solana.com/address/CgLrSioMCBGwGZW3ANjAXZaRkpCBVNzr16Nx9yAF9uJz?cluster=devnet  

  */