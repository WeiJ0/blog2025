---
title: "解決使用 zoom 時 GSAP ScrollTrigger 的觸發點不正確問題"
description: "如何解決在使用 GSAP ScrollTrigger 與 zoom 一起時，觸發點可能出現的問題。我們將透過 scrollerProxy 方法調整觸發點的位置，確保在不同尺寸裝置上的正確顯示。"
pubDate: "Sep 11 2024"
heroImage: "/blog/cover/fix_scrolltrigger_with_zoom.png"
slug: "fix_scrolltrigger_with_zoom"
---

## 前言

最近有一個專案，因為客戶的特殊需求，RWD 為了能在不同尺寸的裝置能保有原始設計稿的排列，需要使用 zoom 的方式來實作

但在使用 zoom 的時候，發現 GSAP ScrollTrigger 的觸發點會有問題，所以這篇文章就來記錄一下解決的方式。

## 問題

問題出在使用 zoom 的時候，雖然將整個頁面都縮小了，但實際的高度並沒有改變，所以在使用 ScrollTrigger 的時候開啟 markers，觸發點 start 的位置會有偏差。  

例如原本的觸發點是在畫面中間，但因為 zoom 的關係，觸發點在同樣的位置，但在畫面上反而偏下方，這樣就會造成觸發點不正確的問題。

## 解決方式

最後在 ScrollTrigger 的文件中有找到 `scrollerProxy` 這個 method，可以調整觸發點的位置，所以就可以透過這個 method 來解決這個問題。

```javascript
// 先取得 body 的 zoom 值
const bodyZoom = getComputedStyle(document.body).zoom || 1;
ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
        if (arguments.length) {
            bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop / bodyZoom; // 這邊要除以 zoom調整觸發點的位置
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    },
});
```

## 心得

在 RWD 使用 `zoom` 的確能夠保留完整的設計稿樣式等比縮放，和 `scale` 一樣，但相對著很多套件或者是針對位置的計算都會有問題，所以在使用時要特別注意。  

<span style="color:red">最後就是 firefox 目前仍然對 zoom 不支援</span>，所以在使用時還要針對 firefox 做額外的處理。