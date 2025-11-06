# Bangr Figma Design - Complete Extraction

**Repository:** https://github.com/nocaligic/Polymarketdashboarddesign.git
**Extracted:** January 2025
**Status:** Ready for new repository

---

## **Tech Stack**

### **Framework & Build**
- **React** 18.3.1 (UI library)
- **TypeScript** (type safety)
- **Vite** 6.3.5 (build tool, fast HMR)
- **@vitejs/plugin-react-swc** 3.10.2 (SWC for fast refresh)

### **Styling**
- **Tailwind CSS** (utility-first CSS)
- **class-variance-authority** 0.7.1 (component variants)
- **clsx** + **tailwind-merge** (conditional classes)

### **UI Components (ShadcN/UI + Radix)**
Complete component library based on Radix UI primitives:

```json
{
  "@radix-ui/react-accordion": "^1.2.3",
  "@radix-ui/react-alert-dialog": "^1.1.6",
  "@radix-ui/react-aspect-ratio": "^1.1.2",
  "@radix-ui/react-avatar": "^1.1.3",
  "@radix-ui/react-checkbox": "^1.1.4",
  "@radix-ui/react-collapsible": "^1.1.3",
  "@radix-ui/react-context-menu": "^2.2.6",
  "@radix-ui/react-dialog": "^1.1.6",
  "@radix-ui/react-dropdown-menu": "^2.1.6",
  "@radix-ui/react-hover-card": "^1.1.6",
  "@radix-ui/react-label": "^2.1.2",
  "@radix-ui/react-menubar": "^1.1.6",
  "@radix-ui/react-navigation-menu": "^1.2.5",
  "@radix-ui/react-popover": "^1.1.6",
  "@radix-ui/react-progress": "^1.1.2",
  "@radix-ui/react-radio-group": "^1.2.3",
  "@radix-ui/react-scroll-area": "^1.2.3",
  "@radix-ui/react-select": "^2.1.6",
  "@radix-ui/react-separator": "^1.1.2",
  "@radix-ui/react-slider": "^1.2.3",
  "@radix-ui/react-slot": "^1.1.2",
  "@radix-ui/react-switch": "^1.1.3",
  "@radix-ui/react-tabs": "^1.1.3",
  "@radix-ui/react-toggle": "^1.1.2",
  "@radix-ui/react-toggle-group": "^1.1.2",
  "@radix-ui/react-tooltip": "^1.1.8"
}
```

### **Additional Libraries**
- **lucide-react** 0.487.0 (icon library - clean, modern icons)
- **recharts** 2.15.2 (charting library for analytics)
- **react-hook-form** 7.55.0 (form validation)
- **react-day-picker** 8.10.1 (date picker)
- **sonner** 2.0.3 (toast notifications)
- **cmdk** 1.1.1 (command palette)
- **vaul** 1.1.2 (drawer component)
- **embla-carousel-react** 8.6.0 (carousel)
- **input-otp** 1.4.2 (OTP input)
- **next-themes** 0.4.6 (theme switching)
- **react-resizable-panels** 2.1.7 (resizable layouts)

---

## **Design System**

### **Color Palette**

```css
/* Primary Brand Colors */
--bangr-yellow: #FFB627 (vibrant yellow/orange)
--bangr-orange: #FF9500 (orange accent)
--gradient-header: linear-gradient(to right, #FFB627, #FF9500)

/* Background */
--bg-primary: #1A1A2E (dark navy blue)
--bg-card: #FFFFFF (pure white cards)

/* Borders & Shadows */
--border-black: #000000 (4px thick borders everywhere)
--shadow-offset: 6px 6px 0px rgba(0,0,0,1) (no blur, hard shadow)

/* Button Colors */
--yes-button: #4ECDC4 (teal/cyan)
--no-button: #FF6B6B (coral red)

/* Status Colors */
--hot-badge: #FFB627 (yellow)
--verified-badge: #FFB627 (yellow/gold)
--ending-soon: #FF4757 (urgent red)
--high-volume: #FF9500 (orange)

/* Connect Wallet */
--wallet-gradient: linear-gradient(to right, #ff00ff, #a020f0) (pink to purple)
```

### **Typography**

```css
/* Font Weights */
--font-black: 900 (BANGR logo)
--font-bold: 700 (headings, buttons)
--font-semibold: 600 (labels)
--font-medium: 500 (filters)
--font-normal: 400 (body text)

/* Font Sizes */
--text-4xl: 2.25rem (36px) - Logo
--text-3xl: 1.875rem (30px) - Modal titles
--text-2xl: 1.5rem (24px) - YES/NO prices
--text-xl: 1.25rem (20px) - Market questions
--text-lg: 1.125rem (18px) - Formula banner
--text-base: 1rem (16px) - Body
--text-sm: 0.875rem (14px) - Metadata
--text-xs: 0.75rem (12px) - Timestamps, badges
```

### **Spacing System**

```css
/* Card Dimensions */
--card-width: 360px
--card-height: 500px
--card-padding: 20px (p-5)

/* Card Section Heights */
--header-height: 50px
--tweet-content-height: 120px
--market-question-height: 60px
--progress-height: 40px
--trade-buttons-height: 100px
--metadata-height: 60px

/* Border Widths */
--border-thin: 2px
--border-medium: 3px
--border-thick: 4px
--border-ultra: 6px (modals)

/* Border Radius */
--radius-sm: 8px
--radius-md: 12px (buttons, cards)
--radius-lg: 16px (xl - modals)
--radius-full: 9999px (pills, badges)
```

### **Shadow System**

```css
/* Offset Shadows (No Blur - Retro Style) */
--shadow-sm: 2px 2px 0px rgba(0,0,0,1)
--shadow-md: 3px 3px 0px rgba(0,0,0,1)
--shadow-lg: 4px 4px 0px rgba(0,0,0,1)
--shadow-xl: 6px 6px 0px rgba(0,0,0,1)
--shadow-2xl: 8px 8px 0px rgba(0,0,0,1)
--shadow-modal: 12px 12px 0px rgba(0,0,0,1)

/* Hover States */
--shadow-hover: 5px 5px 0px rgba(0,0,0,1) (lift effect)
--shadow-active: 2px 2px 0px rgba(0,0,0,1) (press down)
```

---

## **Core Components**

### **1. BangrCard.tsx**

**Purpose:** Main market card component
**Size:** 360px × 500px
**Border:** 4px solid black
**Shadow:** 6px 6px 0px (lifts to 8px on hover)

**Structure:**
```
┌─────────────────────────────────────┐
│ Header (50px)                       │ Avatar, @username, timestamp, badge
├─────────────────────────────────────┤
│ Tweet Content (120px)               │ Optional image + text (100 chars)
├─────────────────────────────────────┤
│ Market Question (60px)              │ "Will this hit 52M views in 24h?"
├─────────────────────────────────────┤
│ Progress Indicator (40px)           │ Current/Target + progress bar
├─────────────────────────────────────┤
│ Trade Buttons (100px)               │ YES (teal) | NO (red)
├─────────────────────────────────────┤
│ Metadata (60px)                     │ Time left, volume, bettors
└─────────────────────────────────────┘
```

**Props:**
```typescript
interface BangrCardProps {
  username: string;
  timeAgo: string;
  tweetText: string;
  tweetImage?: string;
  currentViews: number;
  targetViews: number;
  yesPrice: number; // 0-1 (displayed as $0.XX)
  noPrice: number;  // 0-1
  timeRemaining: string; // "21h left"
  volume: string; // "$45K"
  bettors: number;
  isClaimed?: boolean;
  claimedBy?: string;
  isEndingSoon?: boolean;
  isHighVolume?: boolean;
  isResolved?: boolean;
  outcome?: "yes" | "no";
}
```

**States:**
- **Default:** White background, 4px black border, 6px shadow
- **Claimed:** + Yellow ring (ring-4 ring-yellow-400)
- **High Volume:** Orange "🔥 HOT" badge
- **Ending Soon:** Red pulsing time indicator
- **Resolved:** 70% opacity + "RESOLVED" rotated overlay

**Animations:**
```css
/* Hover */
hover:translate-y-[-4px]
hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]

/* Active (button press) */
active:translate-y-[1px]
active:shadow-[2px_2px_0px_rgba(0,0,0,1)]
```

**Key Features:**
- **Progress bar:** Teal gradient fill showing current/target
- **Format helper:** `formatViews(2600000) → "2.6M"`
- **Truncation:** Tweet text limited to 100 chars
- **Badge system:** Claimed 🔥, High Volume 🔥 HOT
- **Resolved overlay:** Rotated black badge with yellow border

---

### **2. CreateMarketModal.tsx**

**Purpose:** Modal for creating new markets
**Size:** max-w-2xl (672px)
**Border:** 6px solid black
**Shadow:** 12px 12px 0px (largest shadow)

**Structure:**
```
┌────────────────────────────────────────┐
│ [X] Close Button                       │
│                                        │
│ Create Market 💥                       │
│ Paste a tweet URL to create a         │
│ prediction market                      │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ Auto-calc: Current × 20 | 24h     │ │ Yellow info box
│ └────────────────────────────────────┘ │
│                                        │
│ Tweet URL                              │
│ ┌────────────────────────────────────┐ │
│ │ https://twitter.com/...            │ │ Input field
│ └────────────────────────────────────┘ │
│                                        │
│ Market Preview                         │
│ ┌────────────────────────────────────┐ │
│ │ @username • Now                    │ │
│ │ Tweet preview text...              │ │
│ │                                    │ │
│ │ Will this hit 50M views in 24h?   │ │
│ │                                    │ │
│ │ Current: 2.5M | Target: 50M       │ │
│ │ Formula: 2.5M × 20 = 50M          │ │
│ └────────────────────────────────────┘ │
│                                        │
│ [Cancel] [Create Market 🚀]           │
└────────────────────────────────────────┘
```

**Features:**
- **Auto-preview:** Detects twitter.com or x.com URLs
- **Live calculation:** Shows current × 20 = target
- **Gradient preview box:** Yellow to orange background
- **Loading state:** Spinner animation during creation
- **Backdrop blur:** Dark overlay with backdrop-blur-sm
- **Click outside to close:** Overlay onClick closes modal

**Formula Display:**
```
📊 Formula:
[Current Views × 20] • [Timeframe = 24h] • [Metric = VIEWS]
```

**States:**
- **Empty:** Info box with "How it works" bullets
- **Preview:** Shows tweet + calculated target
- **Loading:** Spinner on create button
- **Success:** Closes modal, returns to dashboard

---

### **3. Header Component** (in App.tsx)

**Desktop Header (h-16):**
```
┌──────────────────────────────────────────────────────────┐
│ 💥 BANGR │ [Search...........] │ [+Create] [Connect] │
│  bangr.lol                                               │
└──────────────────────────────────────────────────────────┘
```

**Mobile Header:**
```
┌───────────────────────────────┐
│ 💥 BANGR      [Connect]       │
│  bangr.lol                    │
│ [Search...................]   │
└───────────────────────────────┘
```

**Styling:**
- Background: `linear-gradient(to right, #FFB627, #FF9500)`
- Border bottom: 4px solid black
- Shadow: `0 6px 0px rgba(0,0,0,1)` (bottom offset)
- Sticky: `position: sticky, top: 0, z-index: 50`

**Buttons:**
- **Create Market:** Black bg, white text, + icon
- **Connect Wallet:** Pink-purple gradient, white text

---

### **4. Filter Bar**

**Filters:**
```
🔥 Hot | ⚡ New | 🎯 Closing | 💰 Big Bets | ✅ Resolved
```

**Active State:**
```css
.active {
  background: #FFB627;
  border: 4px solid black;
  box-shadow: 3px 3px 0px rgba(0,0,0,1);
}
```

**Inactive State:**
```css
.inactive {
  border: 2px solid rgba(255,255,255,0.2);
  color: white;
}

.inactive:hover {
  background: #FFB627;
  border: 4px solid black;
  color: black;
}
```

---

### **5. Formula Banner**

**Purpose:** Shows standardized formula to all users

```
┌──────────────────────────────────────────────────────────┐
│ 📊 Formula: [Target = Current Views × 20] •             │
│             [Timeframe = 24h] • [Metric = VIEWS]         │
└──────────────────────────────────────────────────────────┘
```

**Styling:**
- Background: Yellow-orange gradient
- Border: 4px solid black
- Shadow: 4px 4px 0px rgba(0,0,0,1)
- Pills: White background for each formula component
- Separators: • between pills

---

### **6. Mobile Bottom Navigation**

```
┌─────────────────────────────────────┐
│  Home    +Create    Profile         │
│  🏠        ➕         👤             │
└─────────────────────────────────────┘
```

**Styling:**
- Height: 64px (h-16)
- Background: Yellow-orange gradient
- Border top: 4px solid black
- Shadow: `0 -6px 0px rgba(0,0,0,1)` (top offset)
- Fixed bottom position
- Icons: lucide-react (Home, Plus, User)

---

## **Animations**

### **Custom Keyframes** (globals.css)

```css
/* Pulse Scale */
@keyframes pulse-scale {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

/* Slide In */
@keyframes slide-in-from-top {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Shake */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
```

### **Usage:**

```css
.animate-pulse-scale { animation: pulse-scale 2s ease-in-out infinite; }
.animate-in { animation: slide-in-from-top 0.3s ease-out; }
.animate-shake { animation: shake 0.3s ease-in-out 3; }
```

**Applied To:**
- Pulse: Ending soon indicator
- Slide in: Toast notifications
- Shake: Error states

---

## **Layout System**

### **Grid Breakpoints:**

```css
/* Mobile (default) */
grid-cols-1

/* Tablet (md: 768px+) */
md:grid-cols-2

/* Desktop (lg: 1024px+) */
lg:grid-cols-3
```

### **Container:**
```css
.container {
  max-width: 1280px; /* max-w-7xl */
  margin: 0 auto;
  padding: 1rem; /* px-4 mobile */

  @media (min-width: 768px) {
    padding: 1.5rem; /* md:px-6 */
  }
}
```

### **Card Grid Spacing:**
```css
gap: 1.5rem; /* gap-6 mobile */

@media (min-width: 768px) {
  gap: 2rem; /* md:gap-8 */
}
```

---

## **Responsive Behavior**

### **Desktop (1024px+):**
- 3-column card grid
- Full header with search + buttons
- No bottom nav
- Cards: 360px × 500px

### **Tablet (768px-1023px):**
- 2-column card grid
- Full header (may wrap search)
- No bottom nav
- Cards: 360px × 500px

### **Mobile (<768px):**
- 1-column card stack
- Compact header (logo + connect only)
- Search bar below logo
- Bottom navigation (Home, Create, Profile)
- Cards: 100% width × 500px height

---

## **File Structure**

```
polymarket-extract/
├── index.html
├── package.json
├── vite.config.ts
├── README.md
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Main app component
│   ├── index.css                   # Tailwind imports
│   ├── BANGR_README.md            # Design documentation
│   ├── Attributions.md
│   ├── styles/
│   │   └── globals.css            # CSS variables, animations
│   ├── components/
│   │   ├── BangrCard.tsx          # Market card
│   │   ├── CreateMarketModal.tsx  # Create modal
│   │   ├── Toast.tsx              # Notifications
│   │   ├── EmptyState.tsx         # No markets state
│   │   └── ui/                    # ShadcN components
│   │       ├── input.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── progress.tsx
│   │       ├── ... (30+ components)
│   └── guidelines/                # Additional docs
```

---

## **Mock Data Structure**

```typescript
const marketData = [
  {
    username: "elonmusk",
    timeAgo: "3h ago",
    tweetText: "Just launched the new Starship prototype...",
    currentViews: 2600000,        // 2.6M
    targetViews: 52000000,        // 52M (2.6M × 20)
    yesPrice: 0.68,               // $0.68
    noPrice: 0.32,                // $0.32
    timeRemaining: "21h",
    volume: "$45K",
    bettors: 234,
    isClaimed: true,
    claimedBy: "elonmusk",
    isHighVolume: false
  },
  // ... more markets
];
```

---

## **Key Design Decisions**

### **1. Standardized Formula (No Customization)**

**Rule:** Target is ALWAYS current views × 20, timeframe is ALWAYS 24h

**Why:**
- ✅ Eliminates decision paralysis
- ✅ Faster market creation (paste URL → one click)
- ✅ Easier to understand for new users
- ✅ Consistent UX across all markets

**Implementation:**
- No threshold input field
- No timeframe selector
- No metric type dropdown
- Auto-calculated and displayed in preview

### **2. Views-Only for MVP**

**Why:**
- ✅ Biggest numbers (millions vs thousands)
- ✅ Most impressive for viral tweets
- ✅ Only available via Apify (unique differentiator)
- ✅ Simplifies UI (no metric selection)

**Post-MVP:** Add likes, retweets, replies

### **3. Retro/Y2K Aesthetic**

**Design Language:**
- Thick borders (4px everywhere)
- Hard shadows (no blur)
- Comic book/trading card feel
- Playful but functional
- "Fun betting" not "serious finance"

**Why:**
- ✅ Stands out from "serious" crypto UI
- ✅ Appeals to Gen Z (nostalgia)
- ✅ Matches "Bangr" brand (explosive, energetic)
- ✅ Makes betting feel less intimidating

### **4. Mobile-First Design**

**Strategy:**
- Cards stack vertically on mobile
- Bottom nav for easy thumb reach
- Large touch targets (44px minimum)
- Simplified header
- Progressive enhancement for desktop

---

## **Interactive States**

### **Button Interaction Pattern:**

```css
/* Rest */
shadow: 3px 3px 0px
transform: translate(0, 0)

/* Hover */
shadow: 5px 5px 0px
transform: translateY(-2px)

/* Active (click) */
shadow: 2px 2px 0px
transform: translate(1px, 1px)
```

**This creates a "press down" effect that feels tactile.**

### **Card Interaction:**

```css
/* Rest */
shadow: 6px 6px 0px

/* Hover */
shadow: 8px 8px 0px
transform: translateY(-4px)

/* (No active state on cards) */
```

---

## **Accessibility Features**

### **Touch Targets:**
- Minimum 44px height for all buttons
- Cards are large (360px wide) - easy to tap
- Spacing prevents mis-taps

### **Focus States:**
```css
focus:ring-4
focus:ring-yellow-400
focus:ring-offset-2
```

### **Contrast:**
- Black text on white (cards): WCAG AAA
- White text on dark backgrounds: WCAG AA
- Yellow on dark: WCAG AA

### **Semantic HTML:**
- Proper heading hierarchy (h1 → h2 → h3)
- Button elements (not divs)
- Form labels properly associated

---

## **Next Steps for New Repository**

### **What to Extract:**

1. ✅ **Complete UI components** (BangrCard, CreateMarketModal, etc.)
2. ✅ **Design system** (colors, typography, spacing)
3. ✅ **Tailwind config** (if customized)
4. ✅ **Animation keyframes** (globals.css)
5. ✅ **Responsive breakpoints** (grid, layout)
6. ✅ **Icon library** (lucide-react icons used)

### **What to Add (New Repo):**

1. **Smart contract integration:**
   - Connect BangrCard to actual market data
   - Wire up buy/sell buttons to contract calls
   - Real-time price updates via WebSocket

2. **Backend APIs:**
   - POST /api/markets (create market from tweet URL)
   - GET /api/markets/:id (fetch market details)
   - POST /api/trades (buy/sell shares)

3. **Apify integration:**
   - Fetch tweet metrics on market creation
   - Tiered polling for live updates
   - Auto-resolution at 24h

4. **Biconomy AA:**
   - Gasless transaction flow
   - Email/wallet/Twitter/guest auth
   - Smart account creation

5. **Claim feature:**
   - Twitter OAuth verification
   - 50/50 revenue split logic
   - Verified badge UI

### **File Mapping (Old → New):**

```
polymarket-extract/src/components/BangrCard.tsx
  → bangr-new/src/components/MarketCard.tsx

polymarket-extract/src/components/CreateMarketModal.tsx
  → bangr-new/src/components/CreateMarketModal.tsx

polymarket-extract/src/styles/globals.css
  → bangr-new/src/styles/globals.css

polymarket-extract/src/App.tsx
  → bangr-new/src/pages/Dashboard.tsx
```

---

## **Package.json for New Repo**

```json
{
  "name": "bangr",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-*": "^1.x.x",  // Keep all Radix components
    "lucide-react": "^0.487.0",
    "recharts": "^2.15.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "*",
    "clsx": "*",
    "class-variance-authority": "^0.7.1",

    // NEW ADDITIONS:
    "@biconomy/account": "^latest",        // Account abstraction
    "ethers": "^6.x.x",                    // Web3 interactions
    "viem": "^2.x.x",                      // Alternative to ethers
    "wagmi": "^2.x.x",                     // React hooks for Web3
    "@tanstack/react-query": "^5.x.x",     // Data fetching
    "apify-client": "^2.x.x",              // Twitter scraping
    "socket.io-client": "^4.x.x",          // Real-time updates
    "next-auth": "^5.x.x"                  // Auth (email, Twitter OAuth)
  },
  "devDependencies": {
    "@vitejs/plugin-react-swc": "^3.10.2",
    "vite": "6.3.5",
    "tailwindcss": "^3.x.x",
    "postcss": "^8.x.x",
    "autoprefixer": "^10.x.x",
    "@types/node": "^20.10.0",
    "typescript": "^5.x.x"
  }
}
```

---

## **Summary**

### **What You Have:**
- ✅ Complete UI design (Figma → React)
- ✅ All components built and styled
- ✅ Responsive mobile/tablet/desktop
- ✅ Retro aesthetic with thick borders + hard shadows
- ✅ Standardized formula (current × 20, 24h, views)
- ✅ Mock data structure ready

### **What You Need to Add:**
- Smart contracts (MarketFactory, PredictionMarket)
- Backend API (market creation, trading, resolution)
- Apify integration (fetch metrics, polling, resolution)
- Biconomy AA (gasless UX, multi-auth)
- WebSocket (real-time price/view updates)
- Claim feature (Twitter OAuth verification)

### **Estimated Build Time:**
- Day 1-2: Smart contracts + deploy
- Day 3-4: Backend API + Apify integration
- Day 5-6: Frontend connection + AA setup
- Day 7-8: Claim feature + WebSocket updates
- Day 9-10: Testing + polish
- Day 11: Demo prep + presentation

---

**This design is PRODUCTION-READY. Just needs the blockchain/backend layer.** 🚀

**Repository ready to clone into new Bangr project.** 🔥
