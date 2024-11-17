---
outline: deep
---

# 快速开始

### 1. 替换域名

打开 **config.mts** 文件，将 'sitemap' 和 'socialLinks' 部分更改为您自己的域名。

```js
{
    sitemap: {
        hostname: "https://docs.code2life.top", // [!code --]
        hostname: "https://docs.awesome.com", // [!code ++]
    },

    socialLinks: [
        {
            icon: "github",
            link: "https://github.com/code2life/vitepress-diataxis-template", // [!code --]
            link: "https://github.com/your-org/your-project", // [!code ++]
        },
    ]
}
```

### 2. 设置 Giscus 评论

1. 将 [Giscus 应用](https://github.com/apps/giscus)安装到您的 **公共** 文档仓库。

2. 启用仓库的讨论功能。

   ![](https://filecdn.code2life.top/enable-discussions.png)

3. 在 `docs/.vitepress/theme/components/VComments.vue` 中替换 `data-repo`、`data-repo-id`、`data-category` 和 `data-category-id`，代码片段可在 [Giscus 官网](https://giscus.app/)找到。

   ![](https://filecdn.code2life.top/giscus-setup.png)

   ```vue
   // docs/.vitepress/theme/components/VComment.vue
   <ClientOnly>
     <component :is="'script'" src="https://giscus.app/client.js" 
       data-repo="replace-me" // [!code ++]
       data-repo-id="replace-me" // [!code ++]
       data-category="General" // [!code ++]
       data-category-id="replace-me" // [!code ++]
       data-mapping="pathname" data-strict="0" 
       :data-theme="isDark ? 'dark' : 'light'"
       data-reactions-enabled="1" data-emit-metadata="0"
       crossorigin="anonymous"
       data-input-position="top" data-lang="en"  data-loading="lazy" async />
   </ClientOnly>
   ```

### 3. 设置翻译功能

大多数自动翻译效果不佳，您可以使用 Cursor 翻译 Markdown 文件。此仓库为 Cursor 内置了 Prompt 文件，您可以按照以下 3 个步骤开始使用。

1. 选择一个文件或部分，点击 Command+K 或 Command+L 打开 Cursor 聊天。
2. 输入 @translate-revise，然后按 Enter。
3. Cursor 将自动翻译所选文本，您可以审核并保存。

### 4. 设置 Google 和 PostHog 分析

1. 注册一个 [Google Analytics](https://analytics.google.com) 账户并获取测量 ID（G-XXXXXXXXXX）。
2. 将测量 ID 添加到 `docs/.vitepress/config.mts` 的 head 部分：

   ```js
   head: [
       ["script", { src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" }],
       ["script", {}, `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');`],
   ],
   ```

请记得更新 `public/robots.txt` 以匹配您自己的主机名。

PostHog 是一个出色的 SaaS 产品，几乎涵盖了所有客户行为分析需求。

前往 [PostHog](https://posthog.com)，注册账户并按照设置步骤进行，然后复制代码片段以替换 `docs/.vitepress/config.mts` 的 head 部分。

```js
head: [
    ["meta", { name: "color-scheme", content: "dark" }],
    ...
    [
        "script",
        {},
        // 从 PostHog 入门页面复制您自己的脚本
        `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=...{api_host:'https://us.i.posthog.com'...`,  // [!code focus]
    ],
],
```

### 5. 设置 Sandpack 代码沙箱

[Sandpack](https://sandpack.codesandbox.io/) 是在文档中添加交互式教程的绝佳工具，特别适用于前端技术栈。这个模板已经开箱即用，详见 

参见 [示例页面](/guide/playground) 并查阅 [vitepress-plugin-sandpack 文档](https://vitepress-sandbox.js-bridge.com/get-started/introduction.html) 了解更多详细信息。

### 6. 添加自动生成的 API 文档

此模板集成了 [Stoplightio Elements](https://stoplight-site.webflow.io/open-source/elements) ，基于 OpenAPI 模式自动生成 API 文档，建议使用无布局的单独页面。

只需一行文档即可使用 WebComponent，参见 [此示例](/reference/api)。

```html{2,6}
---
layout: false
---

<ClientOnly>
    <elements-api apiDescriptionUrl="https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml" router="hash" layout="sidebar"></elements-api>
</ClientOnly>
```

如果需要自定义 API 文档页面，请查看 [Stoplight Elements 选项](https://github.com/stoplightio/elements/blob/main/docs/getting-started/elements/elements-options.md)。

## 7. 自定义

阅读 VitePress 官方文档以了解自定义方法，以下是一些常见的自定义入口点。

- `docs/.vitepress/sidebar.mts` 用于更改指南/参考的菜单，**添加新 Markdown 后记得更新它**。
- `docs/.vitepress/en.mts` 和 `docs/.vitepress/zh.mts` 是配置整个页面菜单和链接的入口点，根据需求进行调整。
- 您可以通过编辑 `docs/.vitepress/theme/index.ts` 来 [更改默认布局](https://vitepress.dev/guide/extending-default-theme#layout-slots)。
- 您可以通过添加新组件并在前端格式器中使用它们来 [自定义其他布局](https://vitepress.dev/reference/default-theme-layout#custom-layout)。

## 已知问题

1. 由于 `vitepress-plugin-mermaid` 的 bug，Mermaid 饼图和 ZenUML 无法正常工作。
2. 页面布局未针对多产品优化。
3. 搜索功能默认是本地前端搜索，如果内容很多，建议切换为像 [Algolia](https://vitepress.dev/reference/default-theme-search#algolia-search) 这样的远程搜索。

