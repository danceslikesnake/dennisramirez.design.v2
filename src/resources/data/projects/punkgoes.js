export const punkgoes = {
  id: "punkgoes",
  heroImage: require("../../img/punkgoes-cover.jpg"),
  heroIcon: require("../../img/punkgoes-logo.svg"),
  heroIconBlack: require("../../img/punkgoes-logo-black.svg"),
  projectName: "Punk Goes MySpace",
  heroSkillSet: "Website, CMS",
  tagline: "A nostalgic throwback promoting Punk Goes Acoustic, Vol 3.",
  externalLinks: [
    {
      label: "View Website",
      href: "https://www.punkgoes.com"
    }
  ],
  client: "Fearless Records",
  tools: "Laravel, MySQL",
  skills: "Website, CMS",
  year: "2019",
  description:
    "Fearless wanted a nostalgic feel to promote the latest Punk Goes" +
    " Acoustic, so we redesigned everything to look like the old MySpace website, warts and all.",
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
