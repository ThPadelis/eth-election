# EthElection

## Description

[EthElection](https://gitlab.com/atceng/ilab/trublo/blockchain-tools) is a free and open-source starter template that helps you get started on Blockchain development. It contains an Election contract that keeps the votes for the candidates.

## Demo

- [Live demo](https://eth-election.surge.sh/)

## Built With

- [Node.js](https://nodejs.org/en/)
- [Truffle](https://www.trufflesuite.com/)
- [Ganache](https://www.trufflesuite.com/ganache) - for local development
- [Metamask](https://metamask.io/)
- [jQuery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Surge](https://surge.sh/) - for live deployment

## Getting Started

### Environment

- Node version - `14.15.4`
- Truffle version - `4.1.17`
- Solidity version - `0.4.26`

### Prerequisites

- Node - Download [here](https://nodejs.org/en/download/)
- Truffle - `npm install -g truffle@4.1.17`
- Ganache - Download [here](https://www.trufflesuite.com/ganache)
- Surge - `npm install --global surge` - Read [here](https://surge.sh/help/getting-started-with-surge) for set up

### Installation

1. Clone the repository

   ```bash
   git clone https://gitlab.com/atceng/ilab/trublo/blockchain-tools.git
   ```

2. Install NPM packages

   ```bash
   npm install
   ```

3. Edit environment variables

   - Create `.env` file

     ```bash
     cp .env.example .env
     ```

4. Deploy contract

   You have two options for the deployment.

   - **Local server**

     In order to deploy your contract locally, you first need to set up the **Ganache** environment.

     - Install Ganache and open it

     - Set up Metamask

       Copy your **phrase** and paste it in the `.env` file that you've created in step 3. Edit the `APP_MNEMONIC` variable.
       [This](https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask) document will help you with the process.

     **Deployment**

     ```bash
     # compile and delpoy contract
     npm run migrate:local
     # deploy ui application
     npm run dev
     ```

   - **Live servers**

     In order to deploy your contract in a test server you will need to generate a **project id** using the [infura.io](https://infura.io/).

     - Register and create a new project.
     - Copy the **project id** and paste it in the `.env` file. Edit the `APP_PROJECT_ID` variable.

     **Deployment**

     ```bash
     # compile and delpoy contract
     npm run migrate:mainnet # or
     npm run migrate:ropsten # or
     npm run migrate:kovan   # or
     npm run migrate:rinkeby # or
     npm run migrate:goerli
     # deploy ui application
     npm run deploy:surge    # or
     ```

## Roadmap

See the [open issues](https://gitlab.com/atceng/ilab/trublo/blockchain-tools/-/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
