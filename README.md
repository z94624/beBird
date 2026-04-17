# 🦅 beBird 嚮鳥

> 結合地理資訊與生態數據的現代化賞鳥輔助平台 / A modern birdwatching assistant platform combining geographical info and ecological data.

![License](https://img.shields.io/badge/license-AGPL--3.0-blue.svg) ![Vue](https://img.shields.io/badge/vue-%5E3.4.19-brightgreen.svg) ![Vite](https://img.shields.io/badge/vite-%5E5.1.4-blueviolet.svg) ![Quasar](https://img.shields.io/badge/quasar-%5E2.15.1-blue.svg) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%5E3.4.1-38B2AC.svg)

[beBird 嚮鳥](https://github.com/z94624/beBird) 是一個專為賞鳥愛好者與生態觀察者打造的 Web 應用程式。透過直覺的操作介面與豐富的數據整合，協助使用者探索周遭的鳥類生態、追蹤稀有鳥種，並掌握最佳的觀測時機。

<!-- TODO: 可在此處放上應用的實際畫面截圖 / Insert App Screenshots here -->

## ✨ 核心特色 (Features)

-   **🗺️ 互動式生態地圖 (Interactive Eco-Map)**：基於 Leaflet 開發，整合地理圖資，視覺化呈現鳥類觀測熱點與稀有鳥種出沒位置，支援標記聚合 (Marker Clustering)。
-   **🦅 稀有鳥種追蹤 (Rare Birds Tracking)**：串接 eBird API，即時獲取熱門與稀有鳥種觀測數據，讓您不漏接任何生態動態。
-   **🌤️ 即時氣象與日地動態 (Live Weather & Sun Activity)**：結合 Tomorrow.io 即時天氣資料與日出日落時間，輔助規劃最佳賞鳥行程，日夜間自動切換不同視覺。
-   **📱 漸進式網頁應用 (PWA Support)**：支援 PWA 安裝，可於行動裝置上享有如原生 App 般的順暢體驗，提供離線支援基礎體驗。
-   **🌗 現代化 UI/UX 體驗 (Modern UI/UX)**：支援深淺色模式（Dark/Light Mode）無縫切換，並針對電腦與行動裝置提供流暢的響應式體驗 (RWD)。
-   **🌐 多語系支援 (i18n)**：內建完整的國際化多國語系架構，支援使用者切換不同語言介面。
-   **☁️ 雲端服務整合 (Cloud Integration)**：藉由 Firebase 提供穩定的後端服務，並且整合 EmailJS 提供聯絡客服等傳遞模組。
-   **🎨 動態視覺回饋 (Dynamic UI Feedback)**：結合 Quasar 與 Tailwind CSS，帶來高質感的過場動畫與流暢的元件互動。

## 🛠️ 技術棧 (Tech Stack)

-   **前端框架 (Framework)**：[Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) + [Vite](https://vitejs.dev/)
-   **UI 框架 (UI Library)**：[Quasar Framework](https://quasar.dev/)
-   **樣式處理 (Styling)**：[Tailwind CSS](https://tailwindcss.com/) + SCSS + PostCSS
-   **狀態管理 (State Management)**：[Pinia](https://pinia.vuejs.org/)
-   **路由管理 (Routing)**：[Vue Router](https://router.vuejs.org/)
-   **地圖引擎 (Map Engine)**：[Leaflet](https://leafletjs.com/) & [@vue-leaflet/vue-leaflet](https://ui.vueland.bg/)
-   **後端與雲端 (Backend & Cloud)**：[Firebase](https://firebase.google.com/) (Vuefire), EmailJS
-   **其他工具 (Utilities)**：Axios, Dayjs, ESLint, Prettier, TypeScript

## 📂 專案結構 (Project Structure)

```text
src/
├── api/          # API 封裝與請求管理 (eBird, Tomorrow.io 等)
├── assets/       # 靜態資源 (圖示、圖片、字體)
├── components/   # 共用 Vue 元件 (地圖、卡片、對話框等)
├── hooks/        # 共用 Composables 功能
├── layout/       # 應用程式版型與結構排版
├── locales/      # i18n 多國語系翻譯檔
├── models/       # 資料模型與 TypeScript 型別定義
├── plugins/      # 第三方套件與全域設定 (Firebase 等)
├── router/       # Vue Router 路由設定
├── store/        # Pinia 狀態管理
├── styles/       # 全域樣式與 Tailwind 配置
├── utils/        # 輔助函式庫工具
└── views/        # 頁面級 Vue 元件 (Home, RareBirds, ContactUs 等)
```

## 🚀 快速開始 (Getting Started)

請確認您的開發環境已安裝 [Node.js](https://nodejs.org/) (建議 v18+)。

### 1. 複製專案 (Clone Repository)

```bash
git clone https://github.com/z94624/beBird.git
cd beBird
```

### 2. 安裝依賴套件 (Install Dependencies)

```bash
npm install
# 或是使用 yarn / pnpm
```

### 3. 環境變數設定 (Environment Variables)

請複製根目錄下的 `.env.example` 並重新命名為 `.env`，然後填入您專屬的 API Keys 資訊。專案依賴多個第三方服務：

```env
# eBird API
VITE_EBIRD_API_KEYGEN=your_ebird_api_key

# EmailJS
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_USER_ID=
VITE_EMAILJS_ACCESS_TOKEN=

# Tomorrow.io API
VITE_TOMORROW_API_KEY=your_tomorrow_io_api_key

# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
...
```

### 4. 啟動開發伺服器 (Start Dev Server)

```bash
npm run dev
```

### 5. 建置正式環境版本 (Build for Production)

```bash
npm run build
```

## 🧑‍💻 指令碼 (Scripts)

-   `npm run dev`：啟動開發伺服器 (本地測試用)
-   `npm run build`：執行 TypeScript 檢查並打包生產環境部署檔
-   `npm run preview`：預覽打包後的發佈版本
-   `npm run lint`：執行 ESLint 自動修復程式碼規範
-   `npm run format`：使用 Prettier 格式化所有程式碼與樣式設定

## 📡 資源與資料來源 (Attributions)

本專案的順利運作仰賴以下優質的開源專案與第三方資料服務，特此致謝：

-   **地圖與地理 (Map & Geo)**
    -   [Leaflet](https://leafletjs.com/) - 互動式地圖核心
-   **資料與服務 (API & Service)**
    -   [eBird API 2.0](https://ebird.org/home) (Cornell Lab of Ornithology) - 核心鳥類觀測數據
    -   [Tomorrow.io](https://www.tomorrow.io/) - 即時天氣 API
    -   [SunriseSunset.io](https://sunrisesunset.io/) - 日出日落時間 API
-   **視覺設計 (Design & UI)**
    -   Weather Animated Icons by [Freepik - Flaticon](https://www.flaticon.com/animated-icons)
    -   [Lovart.ai](https://www.lovart.ai/)

## 📄 授權條款 (License)

This project is licensed under the AGPL-3.0 license - see the [LICENSE](LICENSE) file for details.
