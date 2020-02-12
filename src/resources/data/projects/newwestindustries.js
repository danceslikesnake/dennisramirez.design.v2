export const newwestindustries = {
  id: "newwestindustries",
  heroImage: require("../../img/newwestindustries-cover.jpg"),
  heroIcon: require("../../img/newwestindustries-logo.svg"),
  heroIconBlack: require("../../img/newwestindustries-logo-black.svg"),
  projectName: "New West Industries",
  heroSkillSet: "Website, UX, UI",
  tagline: "Do you have what it takes to join the New West?",
  externalLinks: [
    {
      label: "View Website",
      href: "https://newwestindustries.com"
    }
  ],
  client: "STARSET, Fearless Records",
  tools: "Laravel, MySQL, React, Spotify API",
  skills: "Website, UX, UI, API",
  year: "2019",
  description:
    "As part of the ongoing campaign for STARSET's album Divisions, we" +
    ' created a recruitment website for the Big-Brother-like antagonist of STARSET\'s over-arching narrative.</p><p>Fans take a set of tests to see if they qualify for service in the New West. If they are rejected, the Rebels "hack" into the website and welcome them into their fold.',
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
