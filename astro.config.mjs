// @ts-check

import preact from "@astrojs/preact";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@/": "src/",
      },
    },
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Fira Code",
      cssVariable: "--mc--type--font--display",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/fira-code/FiraCode-Regular.woff2"],
            style: "normal",
            weight: 400,
          },
          {
            src: ["./src/assets/fonts/fira-code/FiraCode-Medium.woff2"],
            style: "normal",
            weight: 500,
          },
          {
            src: ["./src/assets/fonts/fira-code/FiraCode-SemiBold.woff2"],
            style: "normal",
            weight: 600,
          },
          {
            src: ["./src/assets/fonts/fira-code/FiraCode-Bold.woff2"],
            style: "normal",
            weight: 700,
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Fira Sans",
      cssVariable: "--mc--type--font--body",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/fira-sans/FiraSans-Regular.woff2"],
            style: "normal",
            weight: 400,
          },
          {
            src: ["./src/assets/fonts/fira-sans/FiraSans-Medium.woff2"],
            style: "normal",
            weight: 500,
          },
          {
            src: ["./src/assets/fonts/fira-sans/FiraSans-SemiBold.woff2"],
            style: "normal",
            weight: 600,
          },
          {
            src: ["./src/assets/fonts/fira-sans/FiraSans-Bold.woff2"],
            style: "normal",
            weight: 700,
          },
          {
            src: ["./src/assets/fonts/fira-sans/FiraSans-Italic.woff2"],
            style: "italic",
            weight: 400,
          },
          {
            src: ["./src/assets/fonts/fira-sans/FiraSans-MediumItalic.woff2"],
            style: "italic",
            weight: 500,
          },
          {
            src: ["./src/assets/fonts/fira-sans/FiraSans-SemiBoldItalic.woff2"],
            style: "italic",
            weight: 600,
          },
          {
            src: ["./src/assets/fonts/fira-sans/FiraSans-BoldItalic.woff2"],
            style: "italic",
            weight: 700,
          },
        ],
      },
    },
  ],

  integrations: [preact({ compat: true })],
});
