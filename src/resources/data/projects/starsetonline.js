export const starsetonline = {
  id: "starsetonline",
  heroImage: require("../../img/starsetonline-cover.jpg"),
  heroIcon: require("../../img/starsetonline-logo.svg"),
  heroIconBlack: require("../../img/starsetonline-logo-black.svg"),
  projectName: "Starset Online",
  heroSkillSet: "Website, UX, UI",
  tagline: "An interactive website promoting STARSET's album release, Divsions",
  externalLinks: [
    {
      label: "View Website",
      href: "https://www.starsetonline.com"
    }
  ],
  client: "STARSET, Fearless Records",
  tools: "Laravel, MySQL, React",
  skills: "Website, UX, UI",
  year: "2019",
  description:
    "STARSET has an epic sci-fi narrative that manifests in both their music" +
    " and in the real world via ARG-style marketing campaigns.</p><p>For Divisions, they asked me to help create an interactive experience based on an idea of transmissions being broadcasted and intercepeted. Fans used clues found in social media to unlock content on the site via the terminal UI, culminating in the site being overtaken by the antagonist of the larger narrative.",
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
