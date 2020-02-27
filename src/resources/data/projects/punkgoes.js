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
    " Acoustic, so we redesigned everything to look like the old MySpace" +
    " website, warts and all, while adding a responsive design lacking in" +
    " the original.",
  showcase: [
    {
      type: "image",
      src: require("../../img/showcase/punkgoes/site-01.jpg")
    },
    {
      type: "text",
      headline: "Customizable Homepage",
      description: [
        "Users were able to customize the" +
          " homepage just like their old MySpace profiles, and then share them" +
          " with friends."
      ]
    },
    {
      type: "image",
      src: require("../../img/showcase/punkgoes/site-02.jpg")
    },
    {
      type: "image",
      src: require("../../img/showcase/punkgoes/site-03.jpg")
    },
    {
      type: "image",
      src: require("../../img/showcase/punkgoes/site-04.jpg")
    },
    {
      type: "imageGroup",
      srcs: [
        {
          src: require("../../img/showcase/punkgoes/mobile-01.png"),
          phoneMask: true,
          noBg: true
        },
        {
          src: require("../../img/showcase/punkgoes/mobile-02.png"),
          phoneMask: true,
          noBg: true
        },
        {
          src: require("../../img/showcase/punkgoes/mobile-03.png"),
          phoneMask: true,
          noBg: true
        },
        {
          src: require("../../img/showcase/punkgoes/mobile-04.png"),
          phoneMask: true,
          noBg: true
        },
        {
          src: require("../../img/showcase/punkgoes/mobile-05.png"),
          phoneMask: true,
          noBg: true
        }
      ]
    }
  ]
};
