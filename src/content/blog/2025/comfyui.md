---
title: "初入 ComfyUI"
description: "AI 繪圖新手初入近期最熱門的工作流工具 ComfyUI，看了許多介紹開始彙整自己測試使用上的心得感想，從安裝到資料夾結構介紹"
pubDate: "March 12 2025"
heroImage: "/blog/cover/comfyui.webp"
slug: "comfyui"
---

## 簡介

ComfyUI 是一款強大的開源 GUI 工具，專為 Stable Diffusion 設計，相較於傳統的 Stable Diffusion WebUI，ComfyUI 將參數模組化為節點（Node），透過拖拉連接即可打造客製化流程，大幅提升創作彈性。

## 如何安裝

有兩種方式可以安裝，一種是直接透過官方的 [Github comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI#installing) 下載，使用 python 環境直接進行安裝以及開啟。

另一種方式則是透過 Docker 來安裝，不過目前官方還沒有提供 dockerfile，推薦使用 YanWenKun 打包好的檔案進行安裝 [YanWenKun/ComfyUI-Docker](https://github.com/YanWenKun/ComfyUI-Docker)。

## Docker 安裝

我這邊使用的是 `cu126-slim` 版本的 dockerfile，若是本機使用可以不用修改直接進行安裝，若是有要讓外網連接的需求則需要修改 dockerfile：

```yaml
environment:
      - CLI_ARGS=--listen # 補上 listen
```

接著直接啟動 `docker compose up -d` 即可，會在該目錄下產生 `storage` 的資料夾就是整個 `comfyui` 的目錄了

## 執行 UI 

如果針對上面的 dockerfile 沒有特別設定 port 的話，預設都是會在 8188，可以透過 `http://localhost:8188` 來執行。

沒問題後進入就會看到一個預設的工作流，透過該工作流就可以進行基本的圖像產生，
![預設的工作流畫面](/blog/comfyui/comfyui_001.webp)

接著直接點擊執行會出現錯誤訊息
![缺少模型的錯誤訊息畫面](/blog/comfyui/comfyui_002.webp)

原因是因為找不到 `v1-5-pruned-emaonly-fp16.safetensors` 這個模型。

而缺少模型的訊息格式是固定的，前面會有顯示是哪個類型的模型，例如這個錯誤就是 `list: ckpt_name` 代表為 /checkpoint 下沒有找到這個檔案

往後使用別人的工作流，也可以利用這個方式判別我缺少什麼類型的什麼檔案，在到網路上下載後放到相對位置。

## 下載模型

目前大部分的模型都可以在以下這兩個地方找到

- [Hugging Face](https://huggingface.co/models)
- [Civitai](https://civitai.com/models)

只要搜尋模型的名稱關鍵字就可以找到對應模型，在下載完成後放至相對應的目錄即可。

如上述的例子，我到了 `Hugging Face` 搜尋並找到了 [Hugging Face v1-5-pruned-emaonly-fp16.safetensors](https://huggingface.co/genai-archive/stable-diffusion-v1-5/blob/main/v1-5-pruned-emaonly.fp16.safetensors) 在下載完成後放至 `models/checkpoints` 目錄即可。

此外 `Hugging Face` 本身也是一個 git 的儲存庫，可以透過 git clone 的方式直接下載，

## 重新載入模型列表

接著開啟 `ComfyUI` 點選左邊的 `Models`，點擊 `Reload` 即可重新載入模型列表。

再重新產生一次圖片就成功了
![成功產生圖片](/blog/comfyui/comfyui_003.webp)

---

## 常用的目錄說明

- `input / output` 分別存放在工作流中上傳及輸出的照片，每次輸出都會儲存在裡面。
- `custom_nodes`：自定義節點 (非官方節點)的存放位置，多半會透過 git 下載或是 zip 檔解壓縮，或者若有安裝 `ComfyUI-Manager` 則會透過該工具進行安裝，安裝的檔案也是存放在這裡。
- `models`: 預設存放所有工具流中載入的模型檔案，子層目錄為各類型模組名稱的資料夾。
- `extra_model_paths.yaml.example`: 模型設定檔的範例說明，可以自訂模型存取的路徑，例如若同時有安裝 `Stable-diffusion WebUI` 工具的話則可以將模型存放在同一個目錄下，就不用在硬碟中放入兩份相同的模組檔案，節省硬碟的空間。

    可以參照範例檔的說明進行調整：
    ```yaml
    #config for a1111 ui
    #all you have to do is change the base_path to where yours is installed
    a111:
        base_path: # 你的 Stable-diffusion WebUI 安裝路徑
        checkpoints: models/Stable-diffusion
        configs: models/Stable-diffusion
        vae: models/VAE
        #... 以下若都預設則不用動
    ```

## 模型目錄說明

接著進入模型目錄，對於新手來說更是眼花撩亂，十幾種不同的模型。

資料夾的結構會影響到工作流中模組的載入路徑，的命名可以採分類及次分類的概念來建置，例如下列結構 

```
    - checkpoints
        - SD1.5
            - abc.safetensors
```

在工作流中載入 `abc.safetensors` 時，路徑會是 `/SD1.5/abc.safetensors`，**也因此很常會有工作流中的內容對應不到模型的問題，因為路徑都是可以自行設定的**。

- `checkpoints` : 主要模型的存放位置，會有 `.ckpt` 和 `.safetensors` 兩種常見的副檔名檔案。
- `clip`:處理文字與圖片的關聯，像是輸入提示詞轉化成模型可以理解的格式。
- `clip_vision`: 處理視覺相關的 clip 模型，像是圖像分析、標註、相似度比對等等。
- `controlnet`: 用來處理控制圖像產生的姿勢、線條結構等等，像是繪製一張手稿草圖，在透過模型產生一張新圖。
- `diffusers`: 用來處理擴散相關的模型，可以優化整體的產生效率以及圖像系制度的調整。
- `diffusion_models`: diffusers 的核心模型存放處，會直接參與 diffuser 演算法運算，從一開產生的雜訊圖到逐漸清晰的模組。
- `embeddings`: 存放嵌入模型，可以用於定義特定的風格。
- `gligen`: 用來產生特定的文、圖，比較適用於精準控制圖文的創作用到。
- `loras`: 主要處理微調的模型，可以透過少量的訓練，讓模型學習新的風格，產出像是動漫風格。
- `style_models`: 儲存統一風格轉換的模型，例如像是浮世繪這種有整體大致相同風格。
- `unet`: 也是生成圖的核心模型之一，參與圖片生成的上採樣及下採樣，決定了最終成品的細節。
- `upscale_models`: 擴圖模型，提升圖片的解析度，例如從 512 到 1024。
- `vae`: 編碼器，會用來壓縮及還原圖像中的空間，會直接影響產出結果的表現。

**上述只是對於模型基礎中的基礎定義，詳細的細節都非常的複雜。**