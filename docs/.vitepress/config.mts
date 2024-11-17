/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type DefaultTheme, defineConfig, type UserConfig } from "vitepress";
import { renderSandbox } from "vitepress-plugin-sandpack";
// @ts-ignore
import { withMermaid } from "vitepress-plugin-mermaid";
// @ts-ignore
import container from "markdown-it-container";

import { en } from "./en.mts";
import { zh } from "./zh.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig(
  withMermaid({
    locales: {
      root: { label: "English", ...en },
      zh: { label: "简体中文", ...zh },
    },

    vite: {
      optimizeDeps: {
        include: ["@videojs-player/vue"],
      },
    },

    title: "Awesome Doc Site",

    rewrites: {
      "en/:rest*": ":rest*",
    },
    markdown: {
      lineNumbers: true,
      config(md) {
        md.use(container, "sandbox", {
          render(tokens: unknown[], idx: number) {
            return renderSandbox(tokens, idx, "sandbox");
          },
        });
      },
    },
    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    sitemap: {
      hostname: "https://docs.code2life.top",
    },

    mermaid: {},

    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => {
            // elements-api is API reference generator, need exclude from Vue components
            // refer https://github.com/stoplightio/elements?tab=readme-ov-file#web-component
            return tag.toLowerCase().indexOf("elements-api") === 0;
          },
        },
      },
    },

    head: [
      ["meta", { name: "color-scheme", content: "dark" }],
      ["link", { rel: "icon", href: "/favicon.ico" }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      [
        "link",
        {
          rel: "stylesheet",
          href: "https://unpkg.com/@stoplight/elements/styles.min.css",
        },
      ],
      [
        "script",
        {
          src: "https://unpkg.com/@stoplight/elements/web-components.min.js",
        },
      ],
      [
        "script",
        {},
        `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('phc_ebcwZBxJNxpbbX2Mb3YJdlAIwg9Se8z2PIL9egV0Ra2',{api_host:'https://us.i.posthog.com', person_profiles: 'always'
          })`,
      ],
    ],

    themeConfig: {
      logo: { src: "/logo.svg", width: 24, height: 24 },
      search: {
        provider: "local",
        options: {
		  // Refer https://github.com/lucaong/minisearch/issues/201
          miniSearch: {
            options: {
              tokenize: (term: string) => {
                if (typeof term === "string") term = term.toLowerCase();
                // @ts-ignore
                const segmenter = Intl.Segmenter &&
                  new Intl.Segmenter("zh", { granularity: "word" });
                if (!segmenter) return [term];
                const tokens = [];
                for (const seg of segmenter.segment(term)) {
                  // @ts-ignore
                  tokens.push(seg.segment);
                }
                return tokens;
              },
            },
            searchOptions: {
              combineWith: "AND", // important for search chinese
              processTerm: (term: string) => {
                if (typeof term === "string") term = term.toLowerCase();
                // @ts-ignore
                const segmenter = Intl.Segmenter &&
                  new Intl.Segmenter("zh", { granularity: "word" });
                if (!segmenter) return term;
                const tokens = [];
                for (const seg of segmenter.segment(term)) {
                  // @ts-ignore
                  tokens.push(seg.segment);
                }
                return tokens;
              },
            },
          },
          locales: {
            zh: {
              // make this `root` if you want to translate the default locale
              translations: {
                button: {
                  buttonText: "搜索",
                  buttonAriaLabel: "搜索",
                },
                modal: {
                  displayDetails: "显示详细列表",
                  resetButtonTitle: "重置搜索",
                  backButtonTitle: "关闭搜索",
                  noResultsText: "没有结果",
                  footer: {
                    selectText: "选择",
                    selectKeyAriaLabel: "输入",
                    navigateText: "导航",
                    navigateUpKeyAriaLabel: "上箭头",
                    navigateDownKeyAriaLabel: "下箭头",
                    closeText: "关闭",
                    closeKeyAriaLabel: "esc",
                  },
                },
              },
            },
          },
        },
      },

      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/code2life/vitepress-diataxis-template",
        },
      ],
    },
  }) as unknown as UserConfig<DefaultTheme.Config> & { mermaid: unknown },
);
