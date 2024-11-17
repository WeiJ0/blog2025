---
title: "透過 MutationObserver 監聽 DOM 的 class 變化"
description: "使用 MutationObserver 監聽 DOM class 變化，達到在適當時機控制 Lenis 滾動行為的需求。"
pubDate: "July 20 2024"
heroImage: "/blog/cover/mtation_observer_listen_dom_class_change_with_lenis.png"
slug: "mtation_observer_listen_dom_class_change_with_lenis"
---

## 前言

最近在一個專案上發現有使用到 [Lenis](https://lenis.studiofreight.com/) 這款讓滾動變得絲滑的 libray 來加強網頁的互動效果。

Lenis 本身會取消掉瀏覽器的滾動行為，並實作了滾動行為，其中加上計算讓滾動增加一些慣性的效果，讓整體頁面在使用體驗上會和其他網站有一點不同。

因為是重新代理了 body 的滾動事件，所以在一些情境下如果不需要或是要阻止整個頁面滾動，就需要額外做處理。

例如彈跳視窗開啟後，背景新增了遮罩效果，理論上這時候畫面需要 focus 在彈跳視窗的內容中，會阻止了背景的滾動行為，但因為 lenis 所以還是會有滾動的效果。

透過官方提供的 methods 需要暫時的將 lenis 做 `stop()`，關閉彈跳視窗後再做恢復 `start()`，但因為專案大小較大，需要補上的程式有點多，所以想要找一個更好的方法。

而查了一下 js 相關的 API 中就發現了 [MutationObserver](https://developer.mozilla.org/zh-TW/docs/Web/API/MutationObserver) 這個 API，可以監聽 DOM 的變化。

## 作法

在專案中的每一個 modal 都會有一個遮罩的效果，所以我們可以透過 `MutationObserver` 來監聽這些遮罩的 class 變化，當遮罩的 class 有 show 時就停止 Lenis，反之則啟動。

```javascript
function handleLenisMask() {
  const targets = document.querySelectorAll(".modalMask");
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const { attributeName, target } = mutation;
      // 若是有 show 的 class 則銷毀 Lenis
      if (attributeName === "class" && target.classList.contains("show"))
        lenis.stop();
      // 若是沒有 show 的 class 則重新初始化 Lenis
      else 
        lenis.start();
    });
  });

  // 因為我是傳入多個 dom 來監聽，所以要用 forEach 來進行監聽
  targets.forEach(target => {
    observer.observe(target, {
      // 監聽 class 的變化
      attributeFilter: ["class"],
    });
  });
}
```

這樣就完成了上述的功能，在適當的時機來做 Lenis 的控制。

## 參考資料

- [Lenis](https://lenis.studiofreight.com/)
- [MutationObserver](https://developer.mozilla.org/zh-TW/docs/Web/API/MutationObserver)