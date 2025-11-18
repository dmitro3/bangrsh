// Multi-metric price history generator
export function generatePriceHistory() {
  const data = [];
  const metrics = {
    views: 50,
    likes: 30,
    retweets: 20,
    replies: 10,
  };

  for (let i = 0; i < 24; i++) {
    const entry: { time: string; [key: string]: number | string } = { time: `${i}h` };
    for (const metric in metrics) {
      let price = metrics[metric as keyof typeof metrics];
      price += (Math.random() - 0.5) * 5;
      price = Math.max(5, Math.min(95, price));
      metrics[metric as keyof typeof metrics] = price;
      entry[metric] = price;
    }
    data.push(entry);
  }
  return data;
}

// Fake top holders data
export const FAKE_HOLDERS = {
  yes: [
    { name: "CryptoWhale", shares: 18692, avatar: "🐋" },
    { name: "DiamondHands", shares: 16478, avatar: "💎" },
    { name: "MoonBoy", shares: 13907, avatar: "🌙" },
    { name: "HODLer", shares: 12166, avatar: "🚀" },
    { name: "BullMarket", shares: 9431, avatar: "🐂" },
  ],
  no: [
    { name: "BearWhale", shares: 79213, avatar: "🐻" },
    { name: "Skeptic", shares: 20156, avatar: "🤔" },
    { name: "Realist", shares: 10064, avatar: "📊" },
    { name: "Contrarian", shares: 7524, avatar: "🎯" },
    { name: "Doubter", shares: 6683, avatar: "❓" },
  ],
};

// Mock data for multiple tweet markets
export const MOCK_TWEET_MARKETS = {
  views: { id: 1, yesTokenId: 2, noTokenId: 3, targetValue: 50000000, currentValue: 2500000, volume: 10 },
  likes: { id: 2, yesTokenId: 4, noTokenId: 5, targetValue: 10000, currentValue: 8500, volume: 25 },
  retweets: { id: 3, yesTokenId: 6, noTokenId: 7, targetValue: 5000, currentValue: 4200, volume: 15 },
  replies: { id: 4, yesTokenId: 8, noTokenId: 9, targetValue: 1000, currentValue: 950, volume: 5 },
};

export const MOCK_ACTIVITY = {
  views: [{ user: '0x123...', action: 'Bought 10 YES' }, { user: '0x456...', action: 'Sold 5 NO' }],
  likes: [{ user: '0x789...', action: 'Bought 20 YES' }],
  retweets: [{ user: '0xabc...', action: 'Bought 10 YES' }],
  replies: [{ user: '0xdef...', action: 'Sold 5 NO' }],
};

export const MOCK_HOLDERS = {
  views: [{ user: '0xabc...', shares: 100 }, { user: '0xdef...', shares: 50 }],
  likes: [{ user: '0xghi...', shares: 200 }],
  retweets: [{ user: '0xjkl...', shares: 150 }],
  replies: [{ user: '0xmnop...', shares: 100 }],
};
