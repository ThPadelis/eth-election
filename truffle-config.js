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
  },
  compilers: {
    solc: {
      version: "0.8.1", // ex:  "0.4.20". (Default: Truffle's installed solc)
      parser: "solcjs",
      settings: {
        optimizer: {
          enabled: true
        }
      }
    }
  }
};
