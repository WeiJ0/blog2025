---
title: "Safari 使用 audio 造成畫面渲染緩慢問題"
description: "最近遇到一個案子是廣播電台，並在頁面中使用 audio 來播放 audio/mpeg 檔案，在電腦及 Android 上正常，在 Safari 系列卻一直無法載入。經過開發者工具查看後發現非 Safari 的瀏覽器在載入 audio 時不會等到檔案載入完成再繼續渲染，所以不會有卡在畫面的問題，而 Safari 會先將檔案完全載入後再播放，這導致了在載入 audio 時會有一段時間的等待，而這段時間的等待會讓使用者感覺到網頁讀取緩慢。"
pubDate: "Apr 29 2024"
heroImage: "/blog/cover/safari_load_audio_slow.png"
slug: "safari_load_audio_slow"
---

## 前言

最近遇到一個案子是廣播電台，並在頁面中使用 audio 來播放 audio/mpeg 檔案，在電腦及 Android 上正常，在 Safari 系列卻一直無法載入。

經過開發者工具查看後發現，非 Safari 的瀏覽器在載入 audio 時，不會等待檔案完全載入後再繼續渲染，因此不會出現畫面卡頓的問題。

而 Safari 則會先將檔案完全載入後再播放，這導致在載入 audio 時會有一段時間的等待，頁面會完全空白，使用者感覺到網頁讀取緩慢而造成困惑。

## 解決方法

解決方法是將 audio 的 preload 設定為 `none`，這樣就可以讓 Safari 在載入 audio 時不會等到檔案完全載入再繼續渲染，而是在載入 audio 時就直接繼續渲染頁面。

**這邊需要設定 `none` 才行**，如果只是刪除該屬性，Safari 預設會是 `metadata`，這樣還是會等到檔案載入完成再繼續渲染。

```html
<!-- 改成 none 後不會阻擋渲染 -->
<audio controls="controls" preload="none">
    <source src="xxxx" type="audio/mpeg" />
</audio>
``` 