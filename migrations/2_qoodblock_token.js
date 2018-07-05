var QoodBlockToken = artifacts.require("./QoodBlockToken.sol");
var QoodBlockCrowdsale = artifacts.require("./QoodBlockCrowdsale.sol");

module.exports = function(deployer) {
  deployer.deploy(QoodBlockToken).then(function() {
    const startTime = Math.round((new Date(Date.now()).getTime())/1000); // Now
    const endTime = Math.round((new Date().getTime() + (86400000 * 20))/1000); // Today + 20 days
    deployer.deploy(QoodBlockCrowdsale,
      startTime,
      endTime,
      5,
      "0x79198adc8706c5a71a906c587286b60036157390", // Replace this wallet address with the last one (10th account) from Ganache UI. This will be treated as the beneficiary address.
      2000000000000000000, // 2 ETH
      500000000000000000000, // 500 ETH
      QoodBlockToken.address
    );
  });
};