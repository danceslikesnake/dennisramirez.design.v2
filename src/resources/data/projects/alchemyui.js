export const alchemyui = {
  id: "alchemyui",
  heroImage: require("../../img/alchemyui-cover.jpg"),
  heroIcon: require("../../img/alchemyui-logo.svg"),
  heroIconBlack: require("../../img/alchemyui-logo-black.svg"),
  projectName: "Alchemy UI Kit",
  heroSkillSet: "UI, UX",
  tagline:
    "Alchemy is a suite of components and patterns developed for the Wala Financial App.",
  externalLinks: [
    {
      label: "View GitHub",
      href: "https://www.starsetonline.com"
    },
    {
      label: "Download APK",
      href: "https://www.starsetonline.com",
      icon: "fad fa-download"
    }
  ],
  client: "Wala, Inc.",
  tools: "React Native, Sketch, GitBook",
  skills: "UI, UX",
  year: "2018-2019",
  description:
    "I was the only designer at Wala, so both myself and the devs had to" +
    " implement the UI in the app, which could lead to inconsistency and" +
    " confusion as the product shipped. Eventually, I realized we needed a design system to help make everyone's lives easier. While there wasn't time to make a full system, I created this UI kit in my free time to help speed development.",
  showcase: [
    {
      type: "text",
      headline: "Branding",
      description: [
        "This is a description of the section to give some context to whatever is going on with this project."
      ]
    },
    {
      type: "image",
      extend: true,
      src: require("../../img/showcase/alchemyui/feed.jpg")
    },
    {
      type: "imageGroup",
      srcs: [
        {
          src: require("../../img/showcase/alchemyui/phone01temp.png"),
          noBg: true,
          caption: "Profile Page"
        },
        {
          src: require("../../img/showcase/alchemyui/phone02temp.png"),
          noBg: true,
          caption: "Earn Page"
        },
        {
          src: require("../../img/showcase/alchemyui/phone01temp.png"),
          noBg: true,
          caption: "Profile Page"
        }
      ]
    },
    {
      type: "text",
      headline: "Branding"
    },
    {
      type: "image",
      extend: true,
      src: require("../../img/showcase/alchemyui/connect.jpg")
    }
  ]
};
