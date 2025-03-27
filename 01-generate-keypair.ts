import { Keypair } from "@solana/web3.js";
const keypair = Keypair.generate();

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);
console.log(`✅ Finished!`);

/**
 * 

# Run 
```
zip@pop-os:~/dev/bootcamp3/traning$ npx esrun 01-generate-keypair.ts 
The public key is:  FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA
The secret key is:  Uint8Array(64) [
  197, 128, 251, 170,  47, 114, 249, 230, 172,  93, 214,
  182, 142, 148,  23, 190, 156, 137, 109,  12, 237,  55,
   35, 100, 137, 100,  76,  55,  95, 220,   6, 192, 213,
  119, 169, 144, 232, 159, 207, 189,  47, 239,  88, 148,
   88, 250, 208,  98, 162,  61,  55,   8,  51, 170,  84,
  110, 132,   9,  43, 130,  47, 168,  84,  91
]
✅ Finished! 
```
*/