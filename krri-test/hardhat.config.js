require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();
const projectId = "c821454ffc5f455ab7ecebc76c5a3739"
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

module.exports = {
  network: {
    docker: {
      chainId: 7881,
      accounts: [privateKey]
    },
    hardhat: {
      chainId: 5777
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${projectId}`,
      accounts: []
    },
  },
  solidity: "0.8.4",
};
