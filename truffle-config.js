require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");
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
    // develop: {
    //   port: 8545
    // }
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${projectId}`);
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${projectId}`);
      },
      network_id: 42,
      gas: 0,
      gasPrice: 10000000000,
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${projectId}`);
      },
      network_id: 5,
      gas: 4500000,
      gasPrice: 10000000000,
    }
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
      }
    }
  }
};
