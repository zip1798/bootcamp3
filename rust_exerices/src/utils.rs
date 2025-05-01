// Load an existing keypair from .env file
use solana_sdk::signer::{keypair::Keypair, Signer};
use solana_sdk::pubkey::Pubkey;
use dotenvy::dotenv;
use std::env;


use solana_client::rpc_client::RpcClient;
use std::str::FromStr;

use solana_sdk::{
    transaction::Transaction,
    system_instruction,
};
/// Loads a keypair from a specified environment variable containing a serialized secret key.
/// 
/// This function reads a `.env` file to retrieve the value of the specified environment variable.
/// The secret key is expected to be a string representation of a byte array, formatted as a list
/// of comma-separated integers enclosed in square brackets (e.g., "[1, 2, 3, ...]"). The function
/// removes the enclosing brackets, parses the integers into bytes, and constructs a `Keypair`.
/// 
/// # Arguments
/// 
/// * `env_key` - A string slice that holds the name of the environment variable to read the secret key from.
/// 
/// # Returns
/// 
/// A `Keypair` constructed from the parsed secret key.
/// 
/// # Panics
/// 
/// The function will panic if the environment variable is not set, if the secret key cannot be
/// parsed into a valid byte array, or if the length of the parsed byte array is incorrect.

pub fn load_keypair(env_key: &str) -> Keypair {
    // Load the .env file
    dotenv().ok();

    let secret_key = env::var(env_key).expect(format!("{} must be set", env_key).as_str());

    // Remove the brackets and split the string by commas
    let trimmed = secret_key.trim_matches(&['[', ']'][..]);
    let bytes: Vec<u8> = trimmed
        .split(',')
        .filter_map(|s| s.trim().parse::<u8>().ok()) // Parse each component into u8
        .collect(); // Collect into a Vec<u8>

    // If you need a fixed-size array, you can convert it (only if the length is known)
    let secret_key_byte_array: [u8; 64] = bytes.try_into().expect("Incorrect length");
    let keypair: Keypair = Keypair::from_bytes(&secret_key_byte_array).expect("Invalid secret key");

    keypair
}

pub fn test() {
    println!("Hello, world TEST!");
}


pub fn send_sol(keypair: &Keypair, wallet: &Pubkey, amount: u64) {
    let rpc_url = "https://api.devnet.solana.com"; // Use the appropriate cluster URL
    let client = RpcClient::new(rpc_url);

    // Create the transfer instruction
    let instruction = system_instruction::transfer(&keypair.pubkey(), wallet, amount);

    // Get the recent blockhash
    let recent_blockhash = client.get_latest_blockhash().unwrap();

    // Create the transaction
    let mut transaction = Transaction::new_with_payer(&[instruction], Some(&keypair.pubkey()));
    transaction.sign(&[keypair], recent_blockhash);

    // Send the transaction
    match client.send_and_confirm_transaction(&transaction) {
        Ok(signature) => {
            println!("Send sol transaction successful with signature: {:?}\n\n", signature);
        }
        Err(err) => {
            eprintln!("Transaction failed: {:?}", err);
        }
    }

}