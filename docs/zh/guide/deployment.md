---
outline: deep
---
# Deployment

Cloudflare Pages 是托管网站的绝佳方式。本文件主要介绍如何在 3 分钟内使用 Cloudflare Pages 托管您的文档站点。

## 部署到 Cloudflare Pages

### 前置条件

注册一个 [Cloudflare 账户](https://www.cloudflare.com/plans/)，大多数情况下免费计划已足够。

然后前往 [Cloudflare 仪表板](https://dash.cloudflare.com)，您还可以在 Cloudflare 购买域名来托管您的网站。

### 创建应用

进入 Workers & Pages 菜单，选择 创建应用 > Pages > 连接到 Git。

![](https://filecdn.code2life.top/create-pages-cloudflare.png)

按照向导操作并配置构建/部署流水线，只需更改以下几个字段。

![](https://filecdn.code2life.top/connect-git-and-build.png)

详情请参考 [本文档](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/)。

### 设置自定义域名

如果您已购买或将域名添加到 Cloudflare，请配置自定义域名，输入您的域名后，系统将在 1 分钟内自动生效，HTTPS 证书也会自动签发和续订。

![](https://filecdn.code2life.top/custom-domain.png)

## 部署到您自己的服务器

如果您希望自行托管网站而不使用 Cloudflare，则需要自行配置 CI/CD 流水线。

首先运行构建命令以生成 dist 文件夹。

```bash
# 构建包含所有站点静态资源的 dist 文件夹
npm run build
```

然后将 `docs/.vitepress/dist` 文件夹复制到像 Nginx 这样的网络服务器。

最后，为您选择的供应商配置域名、TLS 证书、网络服务器端口和配置。
```
