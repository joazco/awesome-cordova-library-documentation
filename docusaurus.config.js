// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Awesome Cordova Library by Joazco",
  tagline: "Cordova with Typescript",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-test-site.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "joazco", // Usually your GitHub org/user name.
  projectName: "awesome cordova library", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: ["docusaurus-plugin-sass"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Awesome Cordova Library by Joazco",
        logo: {
          alt: "Awesome Cordova Library by Joazco Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "apiSidebar",
            position: "left",
            label: "Docs",
          },
          {
            to: "/canvas-compressor-image",
            position: "left",
            label: "Canvas Compressor Image",
          },
          {
            href: "https://github.com/joazco/awesome-cordova-library",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Intro",
                to: "/docs/",
              },
              {
                label: "Plugins",
                to: "/docs/plugins",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Linkedin",
                href: "https://www.linkedin.com/in/jordan-azoulay/",
              },
              {
                label: "X",
                href: "https://twitter.com/DarkblueDungeon",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Joazco",
                href: "https://joazco.com/",
              },
              {
                label: "GitHub",
                href: "https://github.com/joazco/awesome-cordova-library",
              },
              {
                label: "NPM",
                href: "https://www.npmjs.com/~joazco",
              },
            ],
          },
        ],
        copyright: `Copyright © 2021 joazco.com, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
