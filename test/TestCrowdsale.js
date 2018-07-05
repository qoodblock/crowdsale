import ether from './helpers/ether';
import { advanceBlock } from './helpers/advanceToBlock';
import latestTime from './helpers/latestTime';
import { increaseTimeTo, duration } from './helpers/increaseTime';

const QoodBlockToken = artifacts.require("QoodBlockToken");
const QoodBlockCrowdsale = artifacts.require("QoodBlockCrowdsale");

const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('QoodBlockCrowdsale', function([owner, wallet, investor]) {

    const RATE = new BigNumber(10);
    const GOAL = ether(10);
    const CAP = ether(20);

    before(async function () {
        // Advance to the next block to correctly read time in the solidity "now" function interpreted by ganache
        await advanceBlock();
    });

    beforeEach(async function () {
        this.openingTime = latestTime() + duration.weeks(1);
        this.closingTime = this.openingTime + duration.weeks(1);
        this.afterClosingTime = this.closingTime + duration.seconds(1);

        this.token = await QoodBlockToken.new({ from: owner });
        this.crowdsale = await QoodBlockCrowdsale.new(this.openingTime, this.closingTime, RATE, wallet, GOAL, CAP, this.token.address);
        await this.token.transferOwnership(this.crowdsale.address);
    });

    it('should create crowdsale with correct parameters', async function () {
        this.crowdsale.should.exist;
        this.token.should.exist;

        const openingTime = await this.crowdsale.openingTime();
        const closingTime = await this.crowdsale.closingTime();
        const rate = await this.crowdsale.rate();
        const walletAddress = await this.crowdsale.wallet();
        const goal = await this.crowdsale.goal();
        const cap = await this.crowdsale.cap();

        openingTime.should.be.bignumber.equal(this.openingTime);
        closingTime.should.be.bignumber.equal(this.closingTime);
        rate.should.be.bignumber.equal(RATE);
        walletAddress.should.be.equal(wallet);
        goal.should.be.bignumber.equal(GOAL);
        cap.should.be.bignumber.equal(CAP);
    });

});
