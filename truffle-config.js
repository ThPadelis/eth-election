require("dotenv").config();
// const HDWalletProvider = require("truffle-hdwallet-provider");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.APP_MNEMONIC;
const projectId = process.env.APP_PROJECT_ID;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777" // "*" Match any network id
    },
    mainnet: {
      provider: new HDWalletProvider({
        mnemonic,
        providerOrUrl: `https://mainnet.infura.io/v3/${projectId}`
      }),
      network_id: 1
    },
    ropsten: {
      provider: new HDWalletProvider({
        mnemonic,
        providerOrUrl: `https://ropsten.infura.io/v3/${projectId}`
      }),
      network_id: 3
    },
    kovan: {
      provider: new HDWalletProvider({
        mnemonic,
        providerOrUrl: `https://kovan.infura.io/v3/${projectId}`
      }),
      network_id: 42
    },
    rinkeby: {
      provider: new HDWalletProvider({
        mnemonic,
        providerOrUrl: `https://rinkeby.infura.io/v3/${projectId}`
      }),
      network_id: 4
    },
    goerli: {
      provider: new HDWalletProvider({
        mnemonic,
        providerOrUrl: `https://goerli.infura.io/v3/${projectId}`
      }),
      network_id: 5
    }
    // alastria: {
    //   provider: new HDWalletProvider({
    //     mnemonic,
    //     providerOrUrl: `<Insert alastria's url here>`
    //   }),
    //   network_id: "*",
    //   gasPrice: 0,
    //   type: "quorum"
    // }
  },
  compilers: {
    solc: {
      version: "0.8.1", // ex:  "0.4.20". (Default: Truffle's installed solc)
      parser: "solcjs",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      },
      evmVersion: "byzantium"
    }
  }
};
