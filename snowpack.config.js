// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  exclude: ["**/server.pl", "**/node_modules/**/*", "**/.git/**/*"],
  mount: {},
  plugins: ['@snowpack/plugin-typescript'],
  packageOptions: {},
  devOptions: {},
  buildOptions: {
    out: "dist",
  },
};
