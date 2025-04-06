import "dotenv/config";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log(`Public key: ${keypair.publicKey.toBase58()}`);
console.log(`Private key: ${base58.encode(keypair.secretKey) }`);

/*
# Run
```
zip@pop-os:~/dev/bootcamp3/traning$ npx esrun 01-load-keypair.ts 
Public key: FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA
```

*/