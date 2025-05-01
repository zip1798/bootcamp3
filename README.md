# bootcamp3
Solana Bootcamp v3

# Usefull links
- [Presentation](https://docs.google.com/presentation/d/1ioDlrqPk5ghKIGAHoiAjG7PoLAPQomGeVE6xQfJk2LA/edit#slide=id.p24)
- [Google Class](https://classroom.google.com/u/1/c/NzYwMDIxMDE5NzQ1)
- [Devnet faucet](https://faucet.solana.com/)


# Usefull commands

- Get default solana config values
```
solana config get
```

- Get default address
```
solana address
```

- Get balance in devnet claster
```
solana balance -u devnet
```

# Tasks
## 2.9 Create multisig token
```
npx esrun 02-multisig-mint-tokens.ts 
```

```
✅ Create Multisig Account transaction: https://explorer.solana.com/address/FgBQqVHirbF6kaFqoj9vxvkMm4XeiMNMSL1qrTeXkV6X?cluster=devnet
Multisig Account: FgBQqVHirbF6kaFqoj9vxvkMm4XeiMNMSL1qrTeXkV6X
✅ Token Mint: https://explorer.solana.com/address/A4qGFx2v7iynoYS3anfNSrYPF61fikd7p7TkwRYmQZ2N?cluster=devnet
Token Mint Address: A4qGFx2v7iynoYS3anfNSrYPF61fikd7p7TkwRYmQZ2N
✅ Success! 7777 tokens minted to J7mvtHKC7PaPtrL53y4m39aZE6ScLtWbF7BLNYiyQCKD with 2 signatures.
 Mint Transaction: https://explorer.solana.com/tx/2ou1KKMgKjpEWgtWdUANPfjAARJ568tEbmF4Pc75J7qmTnKd3rzswXdWVmP7QeeFAwcXqDy9CkfCshVe7iB9R9cu?cluster=devnet
```

## 2.10 Transaction with receiver is paeer of fee
```
npx esrun 02-pay_recipient.ts 
```

```
alt@alt-OptiPlex-3070:~/dev/bootcamp3/traning$ npx esrun 02-pay_recipient.ts 
bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)
✅ Token Mint: https://explorer.solana.com/address/6pY4d3JsrgVf7CJN3YD7n51DbCCtSvMHQwioact5zZ6g?cluster=devnet
Token Mint Address: 6pY4d3JsrgVf7CJN3YD7n51DbCCtSvMHQwioact5zZ6g
✅ 100000 tokens 6pY4d3JsrgVf7CJN3YD7n51DbCCtSvMHQwioact5zZ6g  minted to FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA .
 Mint Transaction: https://explorer.solana.com/tx/3wrbYoewBPD62txWz4gY7PY5gx2AHRUAGLhX3NjTRkhW6PymES6wgkVGRCkHTtjwHizAvuyepsWE52AprToxZgsG?cluster=devnet

💰 Solana balances before transfer:
Sender FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA balance: 5.87283972 SOL
Recipient HKaBCgkfsg9yVaG3wCaisb8oQtXzfpXcWBKe173UmVJQ balance: 1.99991 SOL 


Partial Sign Transaction: AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSJzqNtOiEeulJ3KMTqmOr+cL8027znxMFbCjxP0YFgu4PMDkODNt4eOJxxL7l2Mzeac9OwhOl2MdNLvnWf3IKAgEBBfJ89R1xj0dXq0whnu7+68Sv6ChjoVUrqeSxW+hnKX0x1XepkOifz70v71iUWPrQYqI9NwgzqlRuhAkrgi+oVFs17J3kKwQDZnhPiriEoTOstjsbZIjl8inULIkQ6ASZGaWtVI2RY+VeKhKgxMrXy1POGwBF23Sz9h29cEdEb96RBt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKnwx9f+lCAGX46T1Nrl/CmW5hlrca1vtOBvuUSViY7ZPAEEAwMCAQkDUMMAAAAAAAA=

✅ Success! Partial Transfer Transaction: https://explorer.solana.com/tx/4VuWGkv9QcLxkPyEWfaGUSQ882F2BF5BvKsPt5kaP4TvJKLVyZKXaGKD6UDMx4tqAMKBwY6iQ5G4mBqGQiXWrfWc?cluster=devnet

💰 Solana balances after transfer:
Sender FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA balance: 5.87283972 SOL
Recipient HKaBCgkfsg9yVaG3wCaisb8oQtXzfpXcWBKe173UmVJQ  balance: 1.9999 SOL
```

## 2.11 Use nonce account
```
npx esrun 02-nonce-sign-transaction.ts 
```

```
alt@alt-OptiPlex-3070:~/dev/bootcamp3/traning$ npx esrun 02-nonce-sign-transaction.ts 
bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)
✅ Token Mint: https://explorer.solana.com/address/HGoqV9Wgih6fnv5sxz2GFzgnrXexA9j9mX5x8Q9gh7VW?cluster=devnet
Token Mint Address: HGoqV9Wgih6fnv5sxz2GFzgnrXexA9j9mX5x8Q9gh7VW
Nonce Account:  B6bqpwNPwTGM374wpsaY5yphGRL1f69ZxBTxvSXUQN8W
Nonce:  4HSMvakt2QfGATfQEwLHRY8URaZmbPzCbuNYfvsQNEWN

✅ Success! Mint Transaction: https://explorer.solana.com/tx/iVzbkGbAkvCVBwH3132WD2KnsySjw6HSsX9yvjxQx1TfNV9xYaQ5X5J8DuyvZVXrQtSYDQS1YcqsnuJwnjvDXzw?cluster=devnet

Partial Sign Transaction: AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADvcfLW94jMjsYlz8a2h7PGj14MhwadYf2jf4aPqlb3oW3T07UBnBdr5pH0wvMRE+OMvgZ1ULLZV4LK3sSicGYDAgEECfJ89R1xj0dXq0whnu7+68Sv6ChjoVUrqeSxW+hnKX0x1XepkOifz70v71iUWPrQYqI9NwgzqlRuhAkrgi+oVFuCJfKlP6JrJSVgUdhIKwcsxC7H0eN4v1v0CCtgP4hohpYEK0oPie2YiDqFTUFFzaPZ21s804TZqeHH+sXOB1xvy5X3ZvivEstOFkf9oSNIIBwVkWppMpHRmL3zaAXckOcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPHHqRkUg3gXa09uxvxXZL8QI/rjomZj2Y2TczayfmY9BqfVFxksVo7gioRfc9KXiM8DXDFFshqzRNgGLqlAAAAG3fbh12Whk9nL4UbO63msHLSF7V9bN5E6jPWFfv8AqTDJB3sZVej6jKiD8pu7jGPchJTEfw2vV9sNldQax2ezAgUDAwcBBAQAAAAIBAIGBAEKDIwKAAAAAAAAAg==

Start sleep for 120sec 5/1/2025, 1:33:23 PM
End sleep for 120sec 5/1/2025, 1:35:23 PM

💰 Solana balances before transfer:
Sender FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA balance: 5.87840488 SOL
Recipient HKaBCgkfsg9yVaG3wCaisb8oQtXzfpXcWBKe173UmVJQ balance: 1.99992 SOL 

✅ Success! Partial Transfer Transaction: https://explorer.solana.com/tx/GVEPEv1V6LJY4kJcGJP3Fym7Q57ZYYxjdCHmSee8RDFe8zf85NrWqR3XFPpfFvEWiamduSE5ezVmVFfkMzDFDQS?cluster=devnet
💰 Sent 27 tokens (HGoqV9Wgih6fnv5sxz2GFzgnrXexA9j9mX5x8Q9gh7VW) from FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA to HKaBCgkfsg9yVaG3wCaisb8oQtXzfpXcWBKe173UmVJQ

💰 Solana balances after transfer:
Sender FNHfqdMc79nWbBaPtuTQJnvdZFzkDH11smUH5AQpufiA balance: 5.87840488 SOL
Recipient HKaBCgkfsg9yVaG3wCaisb8oQtXzfpXcWBKe173UmVJQ  balance: 1.99991 SOL
alt@alt-OptiPlex-3070:~/dev/bootcamp3/traning$ 
``` 