# 💥 BANGR - Prediction Market Dashboard

A modern, retro-styled prediction market platform for betting on Twitter engagement metrics. Built with React, TypeScript, and Tailwind CSS.

## 📊 Standardized Formula

**BANGR uses a simple, fixed formula for all markets:**

- **Metric**: VIEWS (always)
- **Timeframe**: 24 hours (always)
- **Threshold**: Current Views × 20
- **Question Format**: "Will this hit [target] views in 24h?"

**Example:**
- Tweet has 2.5M views when market created
- Target = 2.5M × 20 = 50M views
- Question: "Will this hit 50M views in 24h?"
- Market closes in exactly 24 hours

## 🎨 Design Philosophy

**Aesthetic**: Retro Web 2.0 / Y2K style with:
- Thick black borders (4px)
- Comic book/trading card visual language
- Offset shadows (no blur)
- High contrast colors
- Playful but functional
- "Fun betting" not "serious finance"

## 🎯 Core Features

### 1. Market Cards (360px × 500px)
**Standardized Structure:**
1. **Header (50px)**: User avatar, @username, timestamp, optional badges
2. **Tweet Content (120px)**: Tweet text (max 100 chars), optional image
3. **Market Question (60px)**: "Will this hit [target] views in 24h?"
4. **Progress Indicator (40px)**: Current vs Target views with progress bar
5. **Trade Buttons (100px)**: YES (teal) and NO (red) with current prices
6. **Metadata (60px)**: Time remaining, volume, bettor count

**Multiple States:**
- Active, Claimed (🔥), Ending Soon, High Volume, Resolved

### 2. Interactive Header
- Brand logo and search
- Create Market button
- Connect Wallet CTA
- Fully responsive (desktop & mobile)

### 3. Filter System
- Hot 🔥
- New ⚡
- Closing 🎯
- Big Bets 💰
- Resolved ✅

### 4. Modals & Overlays
- **Create Market Modal**: 
  - Single input: Tweet URL
  - Auto-calculates target (current views × 20)
  - Live preview with formula breakdown
  - No custom questions/thresholds/timeframes
- **Toast Notifications**: Success, error, warning with auto-dismiss
- **Empty State**: Clean CTA when no markets exist

### 5. Mobile Experience
- Responsive card grid
- Bottom navigation bar
- Touch-optimized buttons
- Simplified header

## 🎨 Color Palette

```css
Background: #1A1A2E (dark navy blue)
Header: #FFB627 (vibrant yellow/orange)
Cards: #FFFFFF (pure white)
Borders: #000000 (black, 4px thick)

YES Button: #4ECDC4 (teal/cyan)
NO Button: #FF6B6B (coral red)
Verified Badge: #FFB627 (yellow/gold)

Live Indicator: #00D9A3 (bright green)
Ending Soon: #FF4757 (urgent red)
```

## 🛠️ Technical Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **ShadcN/UI** - Component library

## 📱 Components

### BangrCard
Main market card component with:
- Header (user, timestamp, badges)
- Tweet preview (optional)
- Question display
- Trading buttons (YES/NO)
- Progress bar
- Metrics (volume, bettors, time)
- Multiple states support

### CreateMarketModal
Modal for creating new markets:
- Tweet URL input
- Preview display
- Question customization
- Target metric setup
- Time limit configuration

### Toast
Notification system:
- Success ✅
- Error ❌
- Warning ⚠️
- Auto-dismiss (5s)

### EmptyState
Shown when no markets exist:
- Large emoji
- Call-to-action
- Create button

## 🎭 Interactive Elements

### Buttons
- Border-radius: 8-12px
- Border: 4px solid black
- Shadow: offset (no blur)
- Hover: lift effect
- Active: press down
- Smooth transitions

### Cards
- Hover: translateY(-4px) + shadow growth
- Click: scale(0.98)
- Smooth cubic-bezier transitions

### Animations
- Pulse (ending soon)
- Slide in (toasts)
- Shake (errors)
- Scale (button interactions)

## 📐 Layout

- **Desktop**: 3-column grid
- **Tablet**: 2-column grid
- **Mobile**: 1-column stack

## ♿ Accessibility

- Min 44px touch targets
- 4px yellow focus indicators
- Keyboard navigation support
- WCAG AA color contrast
- Semantic HTML
- ARIA labels

## 🚀 Usage Examples

### Creating a Market (Ultra-Simplified)
1. Click "Create Market" button
2. Paste Twitter URL
3. Preview auto-calculated target (current × 20)
4. Click "Create Market 🚀"
5. Market launches with 24h countdown

**That's it!** No question writing, no threshold selection, no timeframe choice. Everything is standardized.

### Betting
1. Browse active markets
2. Review current odds
3. Click YES or NO button
4. Connect wallet (if needed)
5. Confirm bet

### Filtering
- Use filter bar to view specific market types
- Active filter highlighted with yellow background

## 🎨 Customization

### Adding New Market States
Update `BangrCard.tsx`:
```tsx
isNewState?: boolean
```

Add conditional styling:
```tsx
{isNewState && (
  <div className="badge">NEW STATE</div>
)}
```

### Custom Color Themes
Modify Tailwind classes or add CSS variables in `globals.css`

## 📊 Market Data Structure

```typescript
{
  username: string;           // Tweet author
  timeAgo: string;            // "3h ago"
  tweetText: string;          // First 100 chars of tweet
  tweetImage?: string;        // Optional image URL
  currentViews: number;       // Fetched from Twitter API
  targetViews: number;        // Always currentViews × 20
  yesPrice: number;           // Current YES price (0-1)
  noPrice: number;            // Current NO price (0-1)
  timeRemaining: string;      // "21h left" (countdown from 24h)
  volume: string;             // Total trading volume
  bettors: number;            // Number of participants
  isClaimed?: boolean;        // Tweet author verified
  isEndingSoon?: boolean;     // < 6 hours remaining
  isHighVolume?: boolean;     // > $100K volume
  isResolved?: boolean;       // Market closed
  outcome?: "yes" | "no";     // Final result
}
```

**Note**: Question is auto-generated, not stored. Format: `"Will this hit ${targetViews} views in 24h?"`

## 🎯 Future Enhancements

- [ ] Real-time price updates
- [ ] User portfolio view
- [ ] Leaderboard system
- [ ] Social sharing
- [ ] Market analytics
- [ ] Historical data
- [ ] Chart visualizations
- [ ] Push notifications

## 📝 License

MIT License - Feel free to use for your own projects!

## 🙏 Credits

- Design inspiration: Retro Web 2.0 / Y2K aesthetic
- Icons: Lucide React + Emoji
- Components: ShadcN/UI
- Built with ❤️ for the culture

---

**bangr.lol** - Where predictions meet viral moments 💥
