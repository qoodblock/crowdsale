const QoodBlockToken = artifacts.require('QoodBlockToken');

contract('QoodBlockToken', accounts => {
  let token;
  const creator = accounts[0];

  beforeEach(async function () {
    token = await QoodBlockToken.new({ from: creator });
  });

  it('has a name', async function () {
    const name = await token.name();
    assert.equal(name, 'QoodBlock Token');
  });


  it('has a symbol', async function () {
    const symbol = await token.symbol();
    assert.equal(symbol, 'QDT');
  });

  it('has 18 decimals', async function () {
    const decimals = await token.decimals();
    assert(decimals.eq(18));
  });

  /*
  it('assigns the initial total supply to the creator', async function () {
    const totalSupply = await token.totalSupply();
    const creatorBalance = await token.balanceOf(creator);

    assert(creatorBalance.eq(totalSupply));

    const receipt = web3.eth.getTransactionReceipt(token.transactionHash);
    const logs = decodeLogs(receipt.logs, SimpleToken, token.address);
    assert.equal(logs.length, 1);
    assert.equal(logs[0].event, 'Transfer');
    assert.equal(logs[0].args.from.valueOf(), 0x0);
    assert.equal(logs[0].args.to.valueOf(), creator);
    assert(logs[0].args.value.eq(totalSupply));
  });
  */

});