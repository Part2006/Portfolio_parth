// =============================================================
//  data/projects.js
//  HOW TO ADD A NEW PROJECT:
//  1. Copy one object below
//  2. Fill in title, description, technologies, image, github, liveDemo
//  3. Put the project screenshot in  public/projects/your-image.png
//  4. Save — the card appears automatically on the page
// =============================================================

const PROJECTS = [
  {
    title: "College Canteen Pre-Order System",
    description:
      "A full-stack college canteen ordering platform that eliminates waiting lines. Students can pre-order food, track orders in real time, and pay securely via Razorpay.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "public/projects/SmartCanteen.png",
    github: "https://github.com/Part2006/CollegeCanteenApp",
    liveDemo: "https://canteen-cf9eb.web.app/",
  },
  {
    title: "EcoTracker – Carbon Footprint Dashboard",
    description:
      "An intuitive carbon footprint calculator and sustainability dashboard. Users measure their environmental impact, visualize emissions, and get personalized eco-friendly tips.",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Express.js"],
    image: "public/projects/EcoTracker.png",
    github: "https://github.com/Part2006/ECOTRACKER",
    liveDemo: "https://ecotracker-rho.vercel.app/",
  },
  {
    title: "UrbanKicks:The ultimate online shoes shopping platform",
    description:
      "UrbanKicks is a modern and responsive e-commerce website for browsing and purchasing premium footwear. It features a clean, user-friendly interface with product listings, detailed product views, shopping cart functionality, responsive design, and a modern UI built with HTML, CSS, JavaScript, and Tailwind CSS.",
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "JWT" , "Razorpay"],
    image: "public/projects/UrbanKicks.png",
    github: "https://github.com/Part2006/urbankicks-store",
    liveDemo: "https://urbankicks-store-qqhv.vercel.app/",
  },
  {
    title: "Mini Compiler Pre-processing Tool",
    description:
      "A client-side password strength analyzer with real-time feedback, entropy scoring, and actionable security recommendations to help users create stronger passwords.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "public/projects/PreProx.png",
    github: "https://github.com/Part2006/Mini-Compiler-Pre-processing-Tool",
    liveDemo: "https://mini-compiler-pre-processing-tool.vercel.app/",
  },
];
