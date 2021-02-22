const path = require('path');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, '/contracts'),
  networks: {
    development: {
      // host: "172.21.80.1",
      // host: "172.23.192.1",
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
  },
};
