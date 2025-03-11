---
title: "什麼是 MCP (Model Context Protocol)，與 API 的不同之處"
description: "在每天都不斷演變的 AI 領域中，Model Context Protocol，簡稱 MCP 已經成為一股革命性的力量，改變人工智慧與資料來源互動的方式。將深入探討 MCP 是什麼、為何重要、如何運作、其在現實世界的影響。"
pubDate: "March 11 2025"
heroImage: "/post_img.webp"
slug: "mcp_differences_api"
---

## 前言

最近幾個月，AI 的發展真的是快到讓我瞠目結舌！我訂閱了一堆 AI 相關的電子報，結果信件塞爆收件匣的速度遠遠超越我能閱讀的速度。

前幾天，剛好看了一篇關於 MCP（Model Context Protocol）的文章，對 AI 的可能性又多了一層認識。所以決定寫一篇關於 MCP 的文章，順便整理一下想法。

## MCP 是什麼

MCP 是 Model (模型) Context (上下文) Protocol (協定) 的縮寫，簡單來說，它是一個開放標準，目的是讓 AI 跟各種工具之間的互動變得更聰明。

舉個例子而言，當今天像是 Windsurf 或 Cursor 這些 AI 編輯器，可以通過 Figma 的 MCP 協定取得 Figma 中的資料，像是設計稿或是 Wireframe接著可以將這些資料直接回傳到編輯器中，透過 Claude 3.5 的模型直接實作 HTML CSS 的程式碼，大大的提升了在切版的工作效率。

[Creating a UI with Figma to Cursor MCP Server](https://www.youtube.com/watch?v=6G9yb-LrEqg)

他從空白頁開始，丟個 Figma 連結給 AI，幾秒後就產出一個一模一樣的畫面，先撇開程式碼不談，這樣的結果已經不是幾個月的我可以想像的。

## MCP 的重要性

隨著 AI 的發展，各式各樣的工具已經百花齊放，但始終仍須不停的切換視窗，切換不同的工具，才能完成一件工作，或者是仰賴 n8n 這種自動化流程的工具才能夠達到雙手解放的境界。不過 MCP 的誕生完全改變了這個情形，就是像突然有了中間人，讓各式各樣的 AI 能夠互相對話。

舉個生活化的例子來說，以前你要請 AI 幫你做飯，但你得先把冰箱裡的食材、食譜、鍋子全都搬到他面前，他才能開始。現在有了 MCP，他就直接走進廚房，開冰箱、找食譜，幫你煮好一桌菜。

也因為 MCP 的存在，各家服務商為了搶客戶，勢必得推出更完整，使用者體驗度更高的服務，而我們也坐享其成。

## MCP 和 API 不同之處

第一次看到 MCP 的概念會覺得，這不就是給 AI 的串接的 API 嗎？

[What is Model Context Protocol (MCP)? How it simplifies AI integrations compared to APIs](https://norahsakal.com/blog/mcp-vs-api-model-context-protocol-explained/#mcp-vs-api-quick-comparison)

看完上面這篇文章的說明才發現差異，API 就像是每扇門 (工具) 會有不同的鑰匙以及開門規則，可能是傳統鑰匙鎖、密碼鎖或是指紋(身分驗證方式、內容)。

也意味著開發人員在串接不同資料來源時，都需要針對各系統撰寫專屬的程式。

而 MCP 則是提供了一個標準的協定，就像是目前的 type C 連接埠，一次整合裡過往的許多連接規格，讓連接電腦更佳的容易。

## 總結

MCP 的出現讓 AI 助理變得更成熟，幾乎不需要我們在一旁協助，就能自己完成多件事。

另一方面，它也逼著各家 AI 服務商推出更高品質的產品，才能留住萬中比較的用戶。就像 Graham 在影片裡試著修 bug 時說的，雖然現在還有些小問題，但 MCP 的潛力已經很明顯了。隨著它越來越成熟，我相信未來不久，這些大型語言模型（LLM）會在更多領域大放異彩。




