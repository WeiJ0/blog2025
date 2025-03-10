---
title: "Node MySQL 連線時遇到 er_not_supported_auth_mod"
description: "使用 MutationObserver 監聽 DOM class 變化，達到在適當時機控制 Lenis 滾動行為的需求。"
pubDate: "Nov 29 2024"
heroImage: "/post_img.webp"
slug: "node_mysql_er_not_supported_auth_mod"
---

## 前言

最近在使用 node MySQL 連線時出現錯誤  
`Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client`

登入資訊都已經確認沒問題，但還是無法登入。錯誤訊息是目前 Client 端使用的驗證方法未支援 MySQL 新版本預設的 `caching_sha2_password` 驗證方式導致無法連線。

解決的方法有兩種，一種是直接升級為 [mysql2](https://www.npmjs.com/package/mysql2) 做使用  
另一種就是調整該 user 在 db 中的加密方法回到`mysql_native_password` 即可。

## 解決方法

用 MySQL 指令登入，修改使用者的密碼加密模式，接著再重新 FLUSH 權限可以了

```bash
mysql> ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'PASSWORD';
FLUSH PRIVILEGES;
```