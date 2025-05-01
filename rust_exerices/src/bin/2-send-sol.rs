use bootcamp3::utils::*;
use solana_sdk::signer::{keypair::Keypair, Signer};
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

#[tokio::main]
async fn main() {
    let keypair = load_keypair("SECRET_KEY");
    println!("🔑 Key loaded from .env file: {}\n\n ", keypair.try_pubkey().unwrap());

    let wallet: Pubkey = Pubkey::from_str("B5EucqcybsSdvP2CYQzJwmKDmTLgPMWnY2Gswjv4LwNb").unwrap();

    // run_check_balance(&keypair.pubkey()).await;
    send_sol(&keypair, &wallet, 20_000_000);

}

// cargo run --bin 2-send-sol