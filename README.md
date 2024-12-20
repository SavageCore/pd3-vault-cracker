![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/SavageCore/pd3-vault-cracker/release.yml?style=for-the-badge) ![Codecov](https://img.shields.io/codecov/c/github/SavageCore/pd3-vault-cracker?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/SavageCore/pd3-vault-cracker?style=for-the-badge)

# PD3 Vault Cracker

A website to help you crack the vault in Payday 3. Enter the 2-4 digits highlighted on the in-game keypad and it will tell you the possible combinations. Go get those no mask runs!

Click [here](https://savagecore.github.io/pd3-vault-cracker/) to view it.

Inspired by [this](https://www.reddit.com/r/paydaytheheist/comments/15jvvpq/payday_3_beta_vault_code_generator_from/) Reddit post.

There is also a [UE4SS](https://modworkshop.net/mod/47771) mod in the `ue4ss_mod` [folder](https://github.com/SavageCore/pd3-vault-cracker/tree/main/ue4ss_mod) of this repo, it prints the door/vault code to the console.

## Development

1. Clone the repo
2. Run `pnpm install`
3. Run `pnpm dev` to start the development server
4. Visit `http://localhost:5173/pd3-vault-cracker/` in your browser. The port may be different if you have other things running on your machine, so check the output of the `pnpm dev` command.

## Publishing

1. Push a tag to the repo
