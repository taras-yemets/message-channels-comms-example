// vite.config.js
import url from "@rollup/plugin-url";

export default {
  plugins: [
    url({
      include: ["**/*.worker.ts"],
    }),
  ],
  // other options...
};
