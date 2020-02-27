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
      href: "https://github.com/danceslikesnake/wala-alchemy-ui"
    },
    {
      label: "Download APK",
      href: "/app-release-apk.zip",
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
      headline: "Buying Dala",
      description: [
        "A cryptocurrency called Dala powered Wala's features," +
          " and users were able to exchange fiat for the coin inside the app" +
          " itself."
      ]
    },
    {
      type: "imageGroup",
      srcs: [
        {
          src: require("../../img/showcase/alchemyui/main-screens-06.png"),
          noBg: true
        },
        {
          src: require("../../img/showcase/alchemyui/buy-dala-01.png"),
          noBg: true
        },
        {
          src: require("../../img/showcase/alchemyui/buy-dala-02.png"),
          noBg: true
        },
        {
          src: require("../../img/showcase/alchemyui/buy-dala-03.png"),
          noBg: true
        },
        {
          src: require("../../img/showcase/alchemyui/buy-dala-04.png"),
          noBg: true
        }
      ]
    },
    {
      type: "text",
      headline: "Main Screens"
    },
    {
      type: "imageGroup",
      srcs: [
        {
          src: require("../../img/showcase/alchemyui/main-screens-01.png"),
          noBg: true
        },
        {
          src: require("../../img/showcase/alchemyui/main-screens-02.png"),
          noBg: true
        },
        {
          src: require("../../img/showcase/alchemyui/main-screens-03.png"),
          noBg: true
        },
        {
          src: require("../../img/showcase/alchemyui/main-screens-04.png"),
          noBg: true
        },
        {
          src: require("../../img/showcase/alchemyui/main-screens-05.png"),
          noBg: true
        }
      ]
    },
    {
      type: "text",
      headline: "Earn",
      description: [
        "Users were able to earn money performing various microjobs they" +
          " could then send to friends or spend in the Market"
      ]
    },
    {
      type: "image",
      src: require("../../img/showcase/alchemyui/earn.png"),
      extend: true
    },
    {
      type: "text",
      headline: "Connect",
      description: [
        "Users could send and receive Dala payments from any friends or" +
          " family that had joined Wala"
      ]
    },
    {
      type: "image",
      src: require("../../img/showcase/alchemyui/connect.png"),
      extend: true
    },
    {
      type: "text",
      headline: "Market",
      description: [
        "Users could use Dala to purchase utilities like airtime," +
          " electricity, and" +
          " water from local providers for themselves or friends and family"
      ]
    },
    {
      type: "image",
      src: require("../../img/showcase/alchemyui/market.png"),
      extend: true
    }
  ]
};
