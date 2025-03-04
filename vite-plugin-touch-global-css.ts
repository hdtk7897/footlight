import fs from 'node:fs'
import type { Plugin, ViteDevServer } from 'vite'


function touchFile(filePath: string): void {
  const time = new Date();
  fs.utimesSync(filePath, time, time);
}

type TouchGlobalCSSPluginOptions = {
  cssFilePath: string;
  watchMatch: RegExp;
};

export default function touchGlobalCSSPlugin({
  cssFilePath,
  watchMatch,
}: TouchGlobalCSSPluginOptions): Plugin {
  return {
    name: "touch-global-css",
    configureServer(server: ViteDevServer) {
      server.watcher.on("change", (path: string) => {
        console.log("path: ",path);
        // path = path.replace(/\\/g, '/') // <-- Add this to add support to Windows
        if (watchMatch.test(path)) {
          touchFile(cssFilePath);
        }
      });
    },
  };
}