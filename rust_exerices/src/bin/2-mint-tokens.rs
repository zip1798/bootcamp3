use bootcamp3::utils::*;
use solana_sdk::signer::Signer;
use solana_sdk::signer::keypair::Keypair;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

#[tokio::main]
async fn main() {
    let keypair = load_keypair("SECRET_KEY");
    println!("🔑 Key loaded from .env file: {}\n ", keypair.try_pubkey().unwrap());

    let wallet: Pubkey = Pubkey::from_str(load_key_from_env("SOME_PUBKEY").as_str()).unwrap();

    let mint_keypair = Keypair::new();
    process_transaction_result("✅ Create token mint", create_mint(&keypair, &mint_keypair));
    println!("💸 Mint pubkey: {}\n ", mint_keypair.try_pubkey().unwrap());

    process_transaction_result("✅ Create associated token account", create_associated_account(&keypair, &wallet, &mint_keypair));

    let associated_account_address = get_associated_account_address(&wallet, &mint_keypair.pubkey());
    println!("🪙 Associated token account: {}\n ", &associated_account_address);

    let amount = 178;
    println!("💸 Minting {} tokens {} to {}", &amount, mint_keypair.try_pubkey().unwrap(), &wallet);
    process_transaction_result("✅ Token minted", mint_token(&keypair, &mint_keypair, &associated_account_address, amount * 100));
}

// cargo run --bin 2-mint-tokens
