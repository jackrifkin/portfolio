import { Project } from "../../../types";

export const projects: Project[] = [
  {
    name: "Portfolio Site",
    time: { start: { month: 1, year: 25 }, end: { month: 4, year: 25 } },
    description:
      "A 3D React Three Fiber interactive experience showcasing my projects and experience",
    button1: {
      label: "GitHub",
      link: "https://github.com/jackrifkin/portfolio",
    },
    backgroundImage: "/PortfolioContent/PortfolioScreenshot.png",
    textColor: "white",
  },
  {
    name: "Short Stack",
    time: { start: { month: 10, year: 24 }, end: { month: 12, year: 24 } },
    description:
      "A pancake-themed full-stack community forum platform with user authentication, Q&A functionality, configurable notifications, community-written articles, and a challenges/rewards system",
    button1: { label: "Demo", link: "https://cs4530-f24-808.onrender.com/" },
    button2: {
      label: "GitHub",
      link: "https://github.com/neu-cs4530/shortstack",
    },
    backgroundColor: "#FFC171",
    textColor: "#381404",
    backgroundLogos: [
      "/PortfolioContent/Short Stack Logo.png",
      "/PortfolioContent/reactLogo.png",
    ],
  },
  {
    name: "Movement Undercommons",
    time: { start: { month: 1, year: 25 } },
    description:
      'A motion capture data visualization project creating "movement vernaculars" or movement portraits, capturing everyday movement.',
    backgroundImage: "/PortfolioContent/MU_Galaxy.png",
    backgroundColor: "#151515",
    textColor: "white",
    button1: {
      label: "Site",
      link: "https://jackrifkin.github.io/movement-undercommons",
    },
  },
  {
    name: "ScrAIbble",
    time: { start: { month: 10, year: 24 }, end: { month: 12, year: 24 } },
    description:
      "A Scrabble-playing heuristic-based AI model, accompanied by a Scrabble gym environment and a GADDAG dictionary implementation\n(please forgive the name)",
    button1: {
      label: "GitHub",
      link: "https://github.com/jackrifkin/scraibble",
    },
    backgroundColor: "#9F2D2E",
    textColor: "#F5E3C2",
    backgroundLogos: [
      "/PortfolioContent/python_logo.png",
      "/PortfolioContent/scrabble-logo.png",
    ],
  },
  {
    name: "Mixr",
    time: { start: { month: 10, year: 23 }, end: { month: 12, year: 23 } },
    description:
      "A full-stack cocktail recipe-sharing platform with functionality for user authentication, reviewing, liking, searching, and creating cocktail recipes",
    button1: {
      label: "Demo",
      link: "https://serene-mousse-081bb3.netlify.app/",
    },
    button2: {
      label: "GitHub",
      link: "https://github.com/BalinVanessa/mixr-react-web-app",
    },
    backgroundColor: "#13232C",
    textColor: "white",
    backgroundLogos: [
      "/PortfolioContent/mixrLogo.svg",
      "/PortfolioContent/reactLogo.png",
      "/PortfolioContent/reduxLogo.png",
      "/PortfolioContent/nodeLogo.png",
      "/PortfolioContent/mongoLogo.png",
    ],
  },
  {
    name: "Asset Album",
    time: { start: { month: 5, year: 23 }, end: { month: 6, year: 23 } },
    description:
      "A Java Spring REST API for storing and filtering PNG files/assets for 2D animation in a MySQL relational database.",
    button1: {
      label: "GitHub",
      link: "https://github.com/jackrifkin/AssetAlbum",
    },
    backgroundColor: "white",
    textColor: "#85034c",
    backgroundLogos: [
      "/PortfolioContent/javaLogo.png",
      "/PortfolioContent/javaSpringLogo.png",
      "/PortfolioContent/mySQLLogo.png",
    ],
  },
  {
    name: "Apocalypse Environment",
    time: { start: { month: 2, year: 25 }, end: { month: 4, year: 25 } },
    description:
      "An apocalyptic desert compound built for Unity using Autodesk Maya and Adobe Substance Painter",
    backgroundImage: "/PortfolioContent/apocalypse_screenshot.png",
    backgroundColor: "#151515",
    textColor: "white",
    button1: {
      label: "Video",
      link: "https://vimeo.com/1078551288",
    },
  },
  {
    name: "Chasing Cheddar",
    time: { start: { month: 9, year: 24 }, end: { month: 12, year: 24 } },
    description: "A corporate rat's morning routine",
    backgroundImage: "/PortfolioContent/chasing_cheddar.png",
    backgroundColor: "#151515",
    textColor: "white",
    button1: {
      label: "Watch",
      link: "https://vimeo.com/1038757181",
    },
  },
  {
    name: "frog.mp4",
    time: { start: { month: 4, year: 22 }, end: { month: 7, year: 22 } },
    description: "My magnum opus\n\nR.I.P. White Hall",
    backgroundImage: "/PortfolioContent/frog.png",
    backgroundColor: "#151515",
    textColor: "white",
    button1: {
      label: "Watch",
      link: "https://vimeo.com/726340859",
    },
  },
];
