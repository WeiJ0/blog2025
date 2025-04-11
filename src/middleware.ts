import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ request, redirect }, next) => {
  const url = new URL(request.url);
  // 檢查路徑是否以 '/' 結尾
  if (!url.pathname.endsWith('/')) {
    // 如果不是，添加 '/' 並進行 301 跳轉
    url.pathname += '/';
    return redirect(url.toString(), 301);
  }
  // 如果已經以 '/' 結尾，繼續處理請求
  return next();
});
