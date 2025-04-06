import "dotenv/config";
import {
  Connection, clusterApiUrl, Keypair, PublicKey, sendAndConfirmTransaction, Transaction,
} from "@solana/web3.js";
import { getExplorerLink } from "@solana-developers/helpers";
// Yes, createCreate! We're making an instruction for createMetadataV3...
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
let mintPublicKey = process.env["MINT_PUBKEY"];
let somePublicKey = process.env["SOME_PUBKEY"];

const asArray = Uint8Array.from(JSON.parse(privateKey));
const user = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
  
const tokenMintAccount = new PublicKey(mintPublicKey);
  
const metadataData = {
    name: "Solana UA Bootcamp 250319",
    symbol: "UAB-3",
    uri: "https://teal-naval-condor-252.mypinata.cloud/ipfs/bafkreihmpu246n7gc3dajv6bsavc2qggxqi5a65gra7irrbav6qpg5woge",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const [metadataPDA, _metadataBump] = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
);
  
const transaction = new Transaction();
const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: user.publicKey,
      payer: user.publicKey,
      updateAuthority: user.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    }
);
transaction.add(createMetadataAccountInstruction);

await sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
);
  
const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
);
console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);
  
/*
zip@pop-os:~/dev/bootcamp3/traning$ npx esrun 03-create-token-metadata.ts 
✅ Look at the token mint again: https://explorer.solana.com/address/CgLrSioMCBGwGZW3ANjAXZaRkpCBVNzr16Nx9yAF9uJz?cluster=devnet!
*/