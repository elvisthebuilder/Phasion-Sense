# Phasion Sense 🌟
Builders: Elvis & Kephas

Phasion Sense is a premium, contemporary e-commerce and interactive lookbook application. Rooted in Accra, Ghana, it bridges rich cultural heritage with modern avant-garde design, offering a sleek, high-fashion shopping experience coupled with advanced AI-powered styling services.

---

## ✨ Core Features

### 🛍️ Premium E-Commerce Experience
- **Minimalist Aesthetics**: Tailored typography, curated color palettes, and fluid transitions that capture a high-fashion editorial vibe.
- **Asymmetric Masonry Grid**: Displays products in a dynamic, magazine-style masonry layout.
- **Interactive Campaign Drops**: Showcases limited collection releases featuring live countdown timers.
- **Onboarding Tour**: Uses `driver.js` to automatically guide new visitors through key features of the application.

### 🤖 PhasionAI Stylist & Search
- **PhasionAI Assistant**: A floating, Gemini-powered personal stylist panel (`gemini-2.5-flash`) that acts as an editor-level stylist, suggests outfit combinations, and embeds interactive product cards directly in chat.
- **Semantic Product Search**: Natural language search powered by AI, allowing customers to query styled prompts like *"something dark and formal under GH₵500"* instead of standard keywords.
- **"Complete the Look" recommendations**: Recommends complementary pieces dynamically on product detail pages to prompt complete outfits.

### 💬 WhatsApp Checkout Flow
- **Direct Merchant Ordering**: A basket system that compiles products, quantities, and notes, and generates a formatted message to checkout directly with the merchant via WhatsApp.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router, React 19)
- **Styling**: Tailwind CSS & CSS Variables (Vanilla variables for theme tokens)
- **State & Data Fetching**: TanStack Query (React Query) & Axios
- **AI Engine**: Google Gemini API (`gemini-2.5-flash` with fallback to `gemini-2.0-flash`)
- **Interactivity**: Driver.js (onboarding tour) & Zustand (client-side state management)
- **Package Manager**: `pnpm`

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory (refer to `.env.example`):

```env
NEXT_PUBLIC_API_BASE_URL=https://api-hackathon.codedematrixtech.com
NEXT_PUBLIC_MERCHANT_SLUG=phasion-sense
NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER=233553010003
NEXT_PUBLIC_TEAM_SLUG=
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run the Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Run Production Build
```bash
pnpm build
pnpm start
```

### 4. Code Quality & Linting
```bash
pnpm lint
```
