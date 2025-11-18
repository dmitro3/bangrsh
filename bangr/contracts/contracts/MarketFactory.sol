// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./ShareToken.sol";

/**
 * @title MarketFactory
 * @notice Creates and manages prediction markets for Twitter engagement
 * @dev Handles market creation, validation, and resolution
 */
contract MarketFactory is Ownable, ReentrancyGuard {

    // Enums
    enum MetricType { VIEWS, LIKES, RETWEETS, COMMENTS }
    enum Duration { SIX_HOURS, TWENTY_FOUR_HOURS }
    enum ResolutionStatus { PENDING, RESOLVED_YES, RESOLVED_NO, RESOLVED_INVALID }

    // Structs
    struct Market {
        uint256 id;
        string tweetUrl;
        string tweetId;
        string authorHandle;
        address scout;              // Market creator
        address claimedBy;          // Tweet author (if claimed)
        bool isClaimed;
        MetricType metric;
        Duration duration;
        uint256 currentValue;       // Snapshot at creation
        uint256 targetValue;        // currentValue * multiplier
        uint256 multiplier;         // 2, 5, 10, or 20
        uint256 startTime;
        uint256 endTime;
        ResolutionStatus status;
        uint256 yesTokenId;
        uint256 noTokenId;
    }

    // State variables
    ShareToken public shareToken;
    IERC20 public collateralToken;  // USDC

    uint256 public nextMarketId;
    mapping(uint256 => Market) public markets;

    // Market uniqueness: hash(tweetId, metric, duration, multiplier) => exists
    mapping(bytes32 => bool) public marketExists;

    // Author claiming: twitterHandle => wallet address
    mapping(string => address) public claimedHandles;

    // Constants
    uint256 public constant INITIAL_LIQUIDITY = 10 * 10**6; // 10 USDC (6 decimals)
    uint256 public constant SHARES_PER_MARKET = 10 * 10**18; // 10 shares
    uint256 public constant RESOLUTION_DELAY = 2 hours;

    // Minimum thresholds
    uint256 public constant MIN_VIEWS = 10000;
    uint256 public constant MIN_LIKES = 500;
    uint256 public constant MIN_RETWEETS = 100;
    uint256 public constant MIN_COMMENTS = 50;

    // Valid multipliers
    mapping(uint256 => bool) public validMultipliers;

    // Events
    event MarketCreated(
        uint256 indexed marketId,
        address indexed scout,
        string tweetUrl,
        MetricType metric,
        Duration duration,
        uint256 multiplier,
        uint256 currentValue,
        uint256 targetValue
    );

    event MarketResolved(
        uint256 indexed marketId,
        ResolutionStatus status,
        uint256 finalValue
    );

    event AccountClaimed(
        string indexed twitterHandle,
        address indexed claimedBy
    );

    constructor(
        address _shareToken,
        address _collateralToken
    ) Ownable(msg.sender) {
        shareToken = ShareToken(_shareToken);
        collateralToken = IERC20(_collateralToken);

        // Set valid multipliers
        validMultipliers[2] = true;
        validMultipliers[5] = true;
        validMultipliers[10] = true;
        validMultipliers[20] = true;
        validMultipliers[100] = true; // Safety cap
    }

    /**
     * @notice Create a new prediction market
     * @param tweetUrl Full tweet URL
     * @param metric Type of metric to track
     * @param duration Time window for market
     * @param multiplier Target multiplier (2x, 5x, 10x, 20x)
     * @param currentValue Current metric value (from oracle)
     * @return marketId ID of created market
     */
    function createMarket(
        string memory tweetUrl,
        MetricType metric,
        Duration duration,
        uint256 multiplier,
        uint256 currentValue,
        string memory tweetId,
        string memory authorHandle
    ) external nonReentrant returns (uint256 marketId) {
        // Validate multiplier
        require(validMultipliers[multiplier], "Invalid multiplier");

        // NOTE: Threshold validation disabled for now to allow markets on any tweet/metric
        // _validateThreshold(metric, currentValue);

        // Check market uniqueness
        bytes32 marketHash = keccak256(abi.encode(tweetId, metric, duration, multiplier));
        require(!marketExists[marketHash], "Market already exists");

        // Transfer initial liquidity from scout
        require(
            collateralToken.transferFrom(msg.sender, address(this), INITIAL_LIQUIDITY),
            "USDC transfer failed"
        );

        // Create market
        marketId = nextMarketId++;
        uint256 targetValue = currentValue * multiplier;
        uint256 durationSeconds = duration == Duration.SIX_HOURS ? 6 hours : 24 hours;

        markets[marketId] = Market({
            id: marketId,
            tweetUrl: tweetUrl,
            tweetId: tweetId,
            authorHandle: authorHandle,
            scout: msg.sender,
            claimedBy: address(0),
            isClaimed: false,
            metric: metric,
            duration: duration,
            currentValue: currentValue,
            targetValue: targetValue,
            multiplier: multiplier,
            startTime: block.timestamp,
            endTime: block.timestamp + durationSeconds,
            status: ResolutionStatus.PENDING,
            yesTokenId: shareToken.getYesTokenId(marketId),
            noTokenId: shareToken.getNoTokenId(marketId)
        });

        // Mark market as existing
        marketExists[marketHash] = true;

        // Mint shares to scout (10 YES + 10 NO)
        shareToken.mint(msg.sender, markets[marketId].yesTokenId, SHARES_PER_MARKET);
        shareToken.mint(msg.sender, markets[marketId].noTokenId, SHARES_PER_MARKET);

        emit MarketCreated(
            marketId,
            msg.sender,
            tweetUrl,
            metric,
            duration,
            multiplier,
            currentValue,
            targetValue
        );
    }

    /**
     * @notice Claim a Twitter account (author claiming)
     * @param twitterHandle Twitter handle (e.g., "@elonmusk")
     * @param signature Signed message proving ownership
     */
    function claimAccount(
        string memory twitterHandle,
        bytes memory signature
    ) external {
        // TODO: Verify Twitter OAuth signature
        // For now, simplified version
        require(claimedHandles[twitterHandle] == address(0), "Already claimed");

        claimedHandles[twitterHandle] = msg.sender;

        emit AccountClaimed(twitterHandle, msg.sender);
    }

    /**
     * @notice Resolve a market
     * @param marketId Market to resolve
     * @param finalValue Final metric value from oracle
     */
    function resolveMarket(
        uint256 marketId,
        uint256 finalValue
    ) external onlyOwner {
        Market storage market = markets[marketId];
        require(market.status == ResolutionStatus.PENDING, "Already resolved");
        require(block.timestamp >= market.endTime + RESOLUTION_DELAY, "Too early to resolve");

        // Determine outcome
        if (finalValue >= market.targetValue) {
            market.status = ResolutionStatus.RESOLVED_YES;
        } else {
            market.status = ResolutionStatus.RESOLVED_NO;
        }

        emit MarketResolved(marketId, market.status, finalValue);
    }

    /**
     * @notice Resolve a market as INVALID (tweet deleted, API failure, etc.)
     * @param marketId Market to invalidate
     */
    function resolveAsInvalid(uint256 marketId) external onlyOwner {
        Market storage market = markets[marketId];
        require(market.status == ResolutionStatus.PENDING, "Already resolved");

        market.status = ResolutionStatus.RESOLVED_INVALID;

        emit MarketResolved(marketId, ResolutionStatus.RESOLVED_INVALID, 0);
    }

    /**
     * @notice Get fee distribution for a market
     * @param marketId Market ID
     * @return authorAddress Author wallet (if claimed)
     * @return scoutAddress Scout wallet
     * @return authorShare Author fee percentage (0-100)
     * @return scoutShare Scout fee percentage (0-100)
     * @return protocolShare Protocol fee percentage (0-100)
     */
    function getFeeRecipients(uint256 marketId) public view returns (
        address authorAddress,
        address scoutAddress,
        uint256 authorShare,
        uint256 scoutShare,
        uint256 protocolShare
    ) {
        Market storage market = markets[marketId];
        address claimedAuthor = claimedHandles[market.authorHandle];

        scoutAddress = market.scout;

        if (claimedAuthor != address(0)) {
            // Claimed: Author 15%, Scout 5%, Protocol 80%
            authorAddress = claimedAuthor;
            authorShare = 15;
            scoutShare = 5;
            protocolShare = 80;
        } else {
            // Unclaimed: Scout 5%, Protocol 95%
            authorAddress = address(0);
            authorShare = 0;
            scoutShare = 5;
            protocolShare = 95;
        }
    }

    /**
     * @notice Validate minimum threshold for metric
     * @param metric Metric type
     * @param value Current value
     */
    function _validateThreshold(MetricType metric, uint256 value) internal pure {
        if (metric == MetricType.VIEWS) {
            require(value >= MIN_VIEWS, "Tweet must have 10K+ views");
        } else if (metric == MetricType.LIKES) {
            require(value >= MIN_LIKES, "Tweet must have 500+ likes");
        } else if (metric == MetricType.RETWEETS) {
            require(value >= MIN_RETWEETS, "Tweet must have 100+ retweets");
        } else if (metric == MetricType.COMMENTS) {
            require(value >= MIN_COMMENTS, "Tweet must have 50+ comments");
        }
    }

    /**
     * @notice Get market details
     * @param marketId Market ID
     * @return Market struct
     */
    function getMarket(uint256 marketId) external view returns (Market memory) {
        return markets[marketId];
    }
}
