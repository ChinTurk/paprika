export default {
  src: "../packages",
  public: "/assets",
  files: "**/*.mdx",
  title: "Paprika",
  port: 4000,
  description: "Paprika library",
  htmlContext: {
    favicon: "assests/favicon.ico",
  },
  themeConfig: {
    colors: {
      background: "linear-gradient(-180deg,#FAFAFB 0,#EFEFF1 438px)",
    },
  },
};
