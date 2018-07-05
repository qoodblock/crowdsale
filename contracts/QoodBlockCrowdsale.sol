pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "./QoodBlockToken.sol";

contract QoodBlockCrowdsale is CappedCrowdsale, RefundableCrowdsale {

    constructor(
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _rate,
        address _wallet,
        uint256 _goal,
        uint256 _cap,
        QoodBlockToken _token
    )
    public
    Crowdsale(_rate, _wallet, _token)
    CappedCrowdsale(_cap)
    TimedCrowdsale(_openingTime, _closingTime)
    RefundableCrowdsale(_goal)
    {
        //As goal needs to be met for a successful crowdsale
        //the value needs to less or equal than a cap which is limit for accepted funds
        require(_goal <= _cap);
    }
}