## 文檔

- [v1 文檔地址](https://docs.naiveadmin.com)
- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -項目開發環境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基礎語法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本語法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本語法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Naive-ui-admin](https://www.naiveui.com/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本語法
- [xicons](https://xicons.org/#/zh-CN) - 此專案的圖標引入

## 安裝開發用擴充工具

套件市集中的輸入框輸入 @recommended 逐一安裝

## 使用

- 安裝依賴

```bash
yarn install

```

- 運行

```bash
yarn dev
```

- 打包

```bash
yarn build
```

## Git 貢獻提交規範

- 參考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 規範 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修復問題/BUG
  - `style` 代碼風格相關無影響運行結果的
  - `perf` 優化/性能提升
  - `refactor` 重構
  - `revert` 撤銷修改
  - `test` 測試相關
  - `docs` 文檔/註釋
  - `chore` 依賴更新/腳手架配置修改等
  - `workflow` 工作流改進
  - `ci` 持續集成
  - `types` 類型定義文件更改
  - `wip` 開發中

## 權限相關組件

- 權限的構成是由"機構可不可以使用該模組" 與 "使用者有沒有該模組的權限" 與 "是否為超級使用者" 三個值取交集判斷
- 權限相關組件會依照當前的頁面判斷是否有權限去做對應的限制，其功能都是由原先的 naive UI 做擴充，相關邏輯如下

#按鈕類 擴充自 n-button

- nv-button 必須要有查看以上的權限，否則 disable
- ne-button 必須要有修改以上的權限，否則 disable

#輸入框類 擴充自 n-input

- 待補

#選擇器類 擴充自 n-select

- 待補
