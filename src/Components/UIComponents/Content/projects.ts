import { Project } from "../../../types";

export const projects: Project[] = [
  {
    name: "Portfolio Site",
    time: { start: { month: 1, year: 25 }, end: { month: 4, year: 25 } },
    description:
      "A 3D React Three Fiber interactive experience showcasing my projects and experience",
    button1: { label: "Demo", link: "" },
    button2: {
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
      "A full-stack community forum platform with user authentication, Q&A functionality, configurable notifications, community-written articles, and a challenges/rewards system",
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
];
