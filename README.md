# 🦅 beBird 嚮鳥

> 結合地理資訊與生態數據的現代化賞鳥輔助平台

[beBird 嚮鳥](https://github.com/z94624/beBird) 是一個專為賞鳥愛好者與生態觀察者打造的 Web 應用程式。透過直覺的操作介面與豐富的數據整合，協助使用者探索周遭的鳥類生態、追蹤稀有鳥種，並掌握最佳的觀測時機。

## ✨ 核心特色 (Features)

-   **🗺️ 互動式生態地圖**：整合地理圖資，視覺化呈現鳥類觀測熱點與稀有鳥種出沒位置。
-   **☁️ 即時氣象與日地動態**：結合即時天氣資料、日出日落時間，輔助規劃最佳賞鳥行程。
-   **🌓 現代化 UI/UX 設計**：支援深淺色模式（Dark/Light Mode）無縫切換，並針對電腦與行動裝置提供流暢的響應式體驗 (RWD)。
-   **🌐 多語系支援**：內建 i18n 多國語系架構，提供更友善的在地化操作介面。
-   **🎨 動態視覺回饋**：自訂的高質感過場動畫與「等高羽紋」動態幾何背景，提升探索時的沉浸感。

## 🛠️ 技術棧 (Tech Stack)

-   **前端框架**：[Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
-   **UI 框架**：[Quasar Framework](https://quasar.dev/)
-   **樣式處理**：[Tailwind CSS](https://tailwindcss.com/) + SCSS
-   **狀態管理**：Pinia
-   **路由管理**：Vue Router
-   **地圖引擎**：[Leaflet](https://leafletjs.com/)

## 🚀 快速開始 (Getting Started)

請確認您的開發環境已安裝 [Node.js](https://nodejs.org/) (建議 v18+)。

### 1. 複製專案

```bash
git clone [https://github.com/z94624/beBird.git](https://github.com/z94624/beBird.git)
cd beBird
```

### 2. 安裝依賴套件

```bash
npm install
# 或是使用 yarn / pnpm
```

### 3. 環境變數設定

請複製根目錄下的 `.env.example` 並重新命名為 `.env`，然後填入您專屬的 API Keys：

```env
# 範例
VITE_EBIRD_API_KEY=your_ebird_api_key
VITE_TOMORROW_API_KEY=your_tomorrow_io_api_key
```

### 4. 啟動開發伺服器

```bash
npm run dev
```

### 5. 建置正式環境版本

```bash
npm run build
```

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
