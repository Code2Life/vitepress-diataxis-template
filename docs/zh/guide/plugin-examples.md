---
outline: deep
---
 // Start of Selection

## Video.js

该模板集成了 [Video.js](https://github.com/videojs/video.js)。您可以使用带有 `src` 和 `poster` 属性的简单 Vue 组件添加视频播放器。

```html
<video-player 
  src="https://files.testfile.org/Video%20MP4%2FLake%20-%20testfile.org.mp4" 
  poster="https://vitepress.dev/vitepress-logo-large.webp" 
/>
```

<video-player src="https://files.testfile.org/Video%20MP4%2FLake%20-%20testfile.org.mp4" poster="https://vitepress.dev/vitepress-logo-large.webp" />


## Image Viewer

该模板集成了 [Viewer.js](https://github.com/fengyuanchen/viewerjs)，无需额外设置，只需使用 Markdown 图片语法 `![](image url)`。

尝试点击图片，然后放大/缩小。

![](https://vitepress.dev/vitepress-logo-large.webp)


## PostHog Analysis

PostHog 是一个出色的平台，涵盖了 [Google Analytics](https://developers.google.com/analytics)、[Microsoft Clarity](https://clarity.microsoft.com/) 以及更多的客户行为分析功能。

注册一个免费账户并更改 `config.mts` 文件，您将在几秒钟内看到读者的实时活动。

![](https://filecdn.code2life.top/posthog-demo.png)


## Mermaid Examples

大多数 Mermaid 图表类型在此模板中均可使用，尝试在 [Mermaid Playground](https://mermaid.live/) 学习 Mermaid。

```mermaid
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
```

```mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
```

```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }
    class Fish{
      -int sizeInFeet
      -canEat()
    }
    class Zebra{
      +bool is_wild
      +run()
    }
```

```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
```

