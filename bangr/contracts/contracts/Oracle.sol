// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MarketFactory.sol";

/**
 * @title Oracle
 * @notice Fetches Twitter metrics and resolves markets
 * @dev For testing: owner can manually submit metrics
 *      For production: integrate with Apify API via Chainlink Functions or similar
 */
contract Oracle {
    MarketFactory public marketFactory;
    address public owner;

    // Store metric snapshots: marketId => metricValue
    mapping(uint256 => uint256) public baselineMetrics;
    mapping(uint256 => uint256) public finalMetrics;

    event MetricRecorded(uint256 indexed marketId, uint256 value, bool isFinal);
    event MarketResolvedByOracle(uint256 indexed marketId, uint256 finalValue);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(address _marketFactory) {
        marketFactory = MarketFactory(_marketFactory);
        owner = msg.sender;
    }

    /**
     * @notice Record baseline metric when market is created
     * @param marketId Market ID
     * @param value Current metric value
     */
    function recordBaseline(uint256 marketId, uint256 value) external onlyOwner {
        require(baselineMetrics[marketId] == 0, "Baseline already recorded");
        baselineMetrics[marketId] = value;
        emit MetricRecorded(marketId, value, false);
    }

    /**
     * @notice Submit final metric and resolve market
     * @param marketId Market ID
     * @param finalValue Final metric value from Twitter
     */
    function submitMetricAndResolve(uint256 marketId, uint256 finalValue) external onlyOwner {
        // Record final metric
        finalMetrics[marketId] = finalValue;
        emit MetricRecorded(marketId, finalValue, true);

        // Resolve the market
        marketFactory.resolveMarket(marketId, finalValue);
        emit MarketResolvedByOracle(marketId, finalValue);
    }

    /**
     * @notice Mark a market as invalid (tweet deleted, API failure, etc.)
     * @param marketId Market ID
     */
    function markAsInvalid(uint256 marketId) external onlyOwner {
        marketFactory.resolveAsInvalid(marketId);
    }

    /**
     * @notice Get baseline metric for a market
     * @param marketId Market ID
     */
    function getBaseline(uint256 marketId) external view returns (uint256) {
        return baselineMetrics[marketId];
    }

    /**
     * @notice Get final metric for a market
     * @param marketId Market ID
     */
    function getFinalMetric(uint256 marketId) external view returns (uint256) {
        return finalMetrics[marketId];
    }

    /**
     * @notice Transfer ownership
     * @param newOwner New owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
