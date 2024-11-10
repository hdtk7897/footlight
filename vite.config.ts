import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "footlight",
  description: "検索窓の値を取得し、コミュニケーションサービスのAPIからの検索結果を検索結果の右側に表示して、組織のナレッジなどを簡単に拾えるようにするchrome拡張です",
  version: '0.3.0',
  background: {
    service_worker: "src/background/background.ts"
  },
  permissions: ["storage", "activeTab", "tabs"],
  host_permissions:[ "*://www.google.com/", "https://*.atlassian.net/"],
  icons: {
    '16': 'images/get_started16.png',
    '48': 'images/get_started48.png',
    '128': 'images/get_started128.png',
  },
  action: {
    default_popup: 'src/popup/popup.html',
    default_icon: {
      '16': 'images/get_started16.png',
      '48': 'images/get_started48.png',
      '128': 'images/get_started128.png',
    },
  },
  content_scripts:[
    {
      matches:[
        "*://*.google.com/search*"
      ],
      js:[
        "src/content/content.tsx"
      ]
    }
  ],
  options_page: "src/options/options.html",
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    port: 5173,
    hmr: {
        host: "localhost",
        protocol: "ws",
        port: 5173,
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: 'src/popup/popup.html',
        options: 'src/options/options.html'
      }
    }
  },
});
