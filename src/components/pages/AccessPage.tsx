import { useState, useEffect, type ReactNode } from "react";
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

// ─── DATA ───────────────────────────────────────────────────────────────────
const CERTS = [
  { id:"acaf",name:"Advanced Facilitator",abbr:"ACAF",color:"#1a3a4a" },
  { id:"cf",name:"Certified Facilitator",abbr:"CF",color:"#2d6a7a" },
  { id:"bf",name:"Bars Facilitator",abbr:"BF",color:"#3d8a7a" },
  { id:"bp",name:"Bars Practitioner",abbr:"BP",color:"#5aaa8a" },
  { id:"bycf",name:"Being You CF",abbr:"BYCF",color:"#7ac0a0" },
  { id:"jcf",name:"Joy of Business CF",abbr:"JCF",color:"#4a8a6a" },
  { id:"bpf",name:"Body Process Facilitator",abbr:"BPF",color:"#3a7a6a" },
  { id:"aff",name:"Facelift Facilitator",abbr:"AFF",color:"#2a6a5a" },
  { id:"rrycf",name:"Right Riches For You CF",abbr:"RRFY CF",color:"#4a7a5a" },
  { id:"bodycf",name:"3-Day Body Class CF",abbr:"BodyCF",color:"#3a6a5a" },
  { id:"ceoc",name:"Creative Edge of Consciousness",abbr:"CEOC",color:"#2a5a5a" },
  { id:"rdd",name:"Relationships Done Different",abbr:"RDD",color:"#5a7a6a" },
];
const REGIONS = [{id:"americas",name:"The Americas"},{id:"europe",name:"Europe"},{id:"asiapac",name:"Asia Pacific"},{id:"mideast",name:"Middle East & Africa"}];
const F = [
  {id:1,name:"Simone Milasas",country:"Australia",city:"Gold Coast",region:"asiapac",certs:["acaf","cf","bf","bycf","jcf","rrycf","aff","bpf","rdd","ceoc"],languages:["English"],classes:47,bio:"Worldwide Business Coordinator. Author of Joy of Business.",featured:true,lat:-28.02,lng:153.4},
  {id:2,name:"Dr. Dain Heer",country:"United States",city:"Houston, TX",region:"americas",certs:["acaf","cf","bf","bycf","bpf","ceoc"],languages:["English"],classes:62,bio:"Co-creator of Access Consciousness. Author of Being You, Changing the World.",featured:true,lat:29.76,lng:-95.37},
  {id:3,name:"Gary Douglas",country:"United States",city:"Houston, TX",region:"americas",certs:["acaf","cf","bf"],languages:["English"],classes:38,bio:"Founder of Access Consciousness.",featured:true,lat:29.76,lng:-95.37},
  {id:4,name:"Grace Douglas",country:"United States",city:"Houston, TX",region:"americas",certs:["acaf","cf","bf","bycf"],languages:["English"],classes:33,bio:"Senior facilitator offering advanced classes worldwide.",featured:true,lat:29.76,lng:-95.37},
  {id:5,name:"Brendon Watt",country:"Australia",city:"Gold Coast",region:"asiapac",certs:["cf","bf","jcf","rrycf"],languages:["English"],classes:24,bio:"CFO of Access Consciousness.",featured:false,lat:-28.02,lng:153.4},
  {id:6,name:"Lauren Marie",country:"United States",city:"Los Angeles, CA",region:"americas",certs:["cf","bf","bycf","aff"],languages:["English"],classes:19,bio:"Being You facilitator in Los Angeles.",featured:false,lat:34.05,lng:-118.24},
  {id:7,name:"Jessica Thompson",country:"United States",city:"New York, NY",region:"americas",certs:["cf","bf","jcf","rrycf"],languages:["English"],classes:28,bio:"Joy of Business on Wall Street.",featured:false,lat:40.71,lng:-74.01},
  {id:8,name:"David Kuhn",country:"United States",city:"Austin, TX",region:"americas",certs:["cf","bf","bpf","bodycf"],languages:["English"],classes:16,bio:"Body process specialist.",featured:false,lat:30.27,lng:-97.74},
  {id:9,name:"Michelle Rivera",country:"United States",city:"Miami, FL",region:"americas",certs:["cf","bf","aff","rdd"],languages:["English","Español"],classes:22,bio:"Bilingual facilitator. Relationships Done Different.",featured:false,lat:25.76,lng:-80.19},
  {id:10,name:"Patricia Owens",country:"United States",city:"Denver, CO",region:"americas",certs:["cf","bf"],languages:["English"],classes:11,bio:"Bars classes and retreats in Colorado.",featured:false,lat:39.74,lng:-104.99},
  {id:11,name:"Karen Mitchell",country:"United States",city:"Seattle, WA",region:"americas",certs:["cf","bf","bycf"],languages:["English"],classes:14,bio:"Being You facilitator. Tech background.",featured:false,lat:47.61,lng:-122.33},
  {id:12,name:"Robert Chen",country:"United States",city:"San Francisco, CA",region:"americas",certs:["cf","bf","jcf"],languages:["English","中文"],classes:17,bio:"Joy of Business in Silicon Valley.",featured:false,lat:37.77,lng:-122.42},
  {id:13,name:"Nathalie Tremblay",country:"Canada",city:"Montreal, QC",region:"americas",certs:["cf","bf","bycf","rdd"],languages:["Français","English"],classes:21,bio:"Bilingual facilitator serving Quebec.",featured:false,lat:45.50,lng:-73.57},
  {id:14,name:"Jennifer Walsh",country:"Canada",city:"Vancouver, BC",region:"americas",certs:["cf","bf","aff","bpf"],languages:["English"],classes:15,bio:"Body and facelift specialist.",featured:false,lat:49.28,lng:-123.12},
  {id:15,name:"Emily Lawson",country:"Canada",city:"Toronto, ON",region:"americas",certs:["cf","bf","jcf"],languages:["English"],classes:18,bio:"Joy of Business with entrepreneurs.",featured:false,lat:43.65,lng:-79.38},
  {id:16,name:"Ana Carolina Silva",country:"Brazil",city:"São Paulo",region:"americas",certs:["cf","bf","bycf","rrycf"],languages:["Português","English","Español"],classes:29,bio:"Right Riches across Brazil and Portugal.",featured:false,lat:-23.55,lng:-46.63},
  {id:17,name:"Luciana Ferreira",country:"Brazil",city:"Rio de Janeiro",region:"americas",certs:["cf","bf","aff","bpf"],languages:["Português","English"],classes:17,bio:"Body and facelift facilitator in Rio.",featured:false,lat:-22.91,lng:-43.17},
  {id:18,name:"Marcela Gutiérrez",country:"Mexico",city:"Mexico City",region:"americas",certs:["cf","bf","jcf"],languages:["Español","English"],classes:23,bio:"Growing Access across Central America.",featured:false,lat:19.43,lng:-99.13},
  {id:19,name:"Valentina Rojas",country:"Colombia",city:"Bogotá",region:"americas",certs:["cf","bf","bycf"],languages:["Español","English"],classes:16,bio:"Being You in Colombia.",featured:false,lat:4.71,lng:-74.07},
  {id:20,name:"Camila Herrera",country:"Argentina",city:"Buenos Aires",region:"americas",certs:["cf","bf","rrycf","rdd"],languages:["Español","English"],classes:20,bio:"Right Riches and Relationships.",featured:false,lat:-34.60,lng:-58.38},
  {id:21,name:"Sarah Bennett",country:"United Kingdom",city:"London",region:"europe",certs:["cf","bf","bycf","jcf","ceoc"],languages:["English"],classes:31,bio:"UK's most active facilitator.",featured:false,lat:51.51,lng:-0.13},
  {id:22,name:"James Harrington",country:"United Kingdom",city:"Manchester",region:"europe",certs:["cf","bf","bpf"],languages:["English"],classes:14,bio:"Body process facilitator.",featured:false,lat:53.48,lng:-2.24},
  {id:23,name:"Fiona McCarthy",country:"Ireland",city:"Dublin",region:"europe",certs:["cf","bf","aff","rdd"],languages:["English"],classes:16,bio:"Facelift and Relationships in Ireland.",featured:false,lat:53.35,lng:-6.26},
  {id:24,name:"Marie Dupont",country:"France",city:"Paris",region:"europe",certs:["acaf","cf","bf","jcf"],languages:["Français","English"],classes:22,bio:"Advanced facilitator across France.",featured:false,lat:48.86,lng:2.35},
  {id:25,name:"Isabelle Laurent",country:"France",city:"Lyon",region:"europe",certs:["cf","bf","bycf","aff"],languages:["Français","English"],classes:15,bio:"Being You and Facelift in France.",featured:false,lat:45.76,lng:4.84},
  {id:26,name:"Katrin Müller",country:"Germany",city:"Berlin",region:"europe",certs:["cf","bf","bycf","rdd"],languages:["Deutsch","English"],classes:19,bio:"Being You and Relationships in Berlin.",featured:false,lat:52.52,lng:13.41},
  {id:27,name:"Stefan Weber",country:"Germany",city:"Munich",region:"europe",certs:["cf","bf","jcf","rrycf"],languages:["Deutsch","English"],classes:17,bio:"Joy of Business across German-speaking Europe.",featured:false,lat:48.14,lng:11.58},
  {id:28,name:"Andrea Hoffmann",country:"Austria",city:"Vienna",region:"europe",certs:["cf","bf","bpf","bodycf"],languages:["Deutsch","English"],classes:14,bio:"Body class specialist in Vienna.",featured:false,lat:48.21,lng:16.37},
  {id:29,name:"Claudia Brunner",country:"Switzerland",city:"Zürich",region:"europe",certs:["cf","bf","jcf"],languages:["Deutsch","Français","English"],classes:16,bio:"Trilingual facilitator.",featured:false,lat:47.38,lng:8.54},
  {id:30,name:"Elena Rodríguez",country:"Spain",city:"Barcelona",region:"europe",certs:["cf","bf","bycf"],languages:["Español","English","Français"],classes:18,bio:"Being You in Spain.",featured:false,lat:41.39,lng:2.17},
  {id:31,name:"Carlos Vega",country:"Spain",city:"Madrid",region:"europe",certs:["cf","bf","jcf","rrycf"],languages:["Español","English"],classes:21,bio:"Right Riches in central Spain.",featured:false,lat:40.42,lng:-3.70},
  {id:32,name:"Teresa Santos",country:"Portugal",city:"Lisbon",region:"europe",certs:["cf","bf","aff"],languages:["Português","English","Español"],classes:13,bio:"Facelift facilitator in Portugal.",featured:false,lat:38.72,lng:-9.14},
  {id:33,name:"Marco Bianchi",country:"Italy",city:"Rome",region:"europe",certs:["cf","bf","bpf","aff","bodycf"],languages:["Italiano","English"],classes:16,bio:"Body class specialist in Italy.",featured:false,lat:41.90,lng:12.50},
  {id:34,name:"Giulia Conti",country:"Italy",city:"Milan",region:"europe",certs:["cf","bf","jcf"],languages:["Italiano","English","Français"],classes:14,bio:"Joy of Business in Milan.",featured:false,lat:45.46,lng:9.19},
  {id:35,name:"Ingrid van der Berg",country:"Netherlands",city:"Amsterdam",region:"europe",certs:["cf","bf","rrycf"],languages:["Nederlands","English","Deutsch"],classes:14,bio:"Right Riches facilitator.",featured:false,lat:52.37,lng:4.90},
  {id:36,name:"Lars Eriksson",country:"Sweden",city:"Stockholm",region:"europe",certs:["cf","bf","bpf"],languages:["English","Svenska"],classes:11,bio:"Consciousness tools in Scandinavia.",featured:false,lat:59.33,lng:18.07},
  {id:37,name:"Petra Nováková",country:"Czech Republic",city:"Prague",region:"europe",certs:["cf","bf","bycf"],languages:["Čeština","English","Deutsch"],classes:15,bio:"Being You in Central Europe.",featured:false,lat:50.08,lng:14.44},
  {id:38,name:"Marina Ivanova",country:"Russia",city:"Moscow",region:"europe",certs:["cf","bf","bycf","jcf"],languages:["Русский","English"],classes:23,bio:"Being You and Joy of Business in Russia.",featured:false,lat:55.76,lng:37.62},
  {id:39,name:"Rachel Cooper",country:"Australia",city:"Sydney",region:"asiapac",certs:["cf","bf","bycf","jcf"],languages:["English"],classes:25,bio:"Australia's longest-serving facilitator.",featured:false,lat:-33.87,lng:151.21},
  {id:40,name:"Lisa Nguyen",country:"Australia",city:"Melbourne",region:"asiapac",certs:["cf","bf","aff","bpf"],languages:["English"],classes:18,bio:"Body and facelift in Melbourne.",featured:false,lat:-37.81,lng:144.96},
  {id:41,name:"Kalpana Raghuraman",country:"India",city:"Mumbai",region:"asiapac",certs:["cf","bf","bpf","aff","bodycf"],languages:["English","हिन्दी"],classes:31,bio:"200+ sessions. Growing Access in South Asia.",featured:false,lat:19.08,lng:72.88},
  {id:42,name:"Priya Sharma",country:"India",city:"Delhi",region:"asiapac",certs:["cf","bf","bycf"],languages:["English","हिन्दी"],classes:19,bio:"Being You. Women's empowerment.",featured:false,lat:28.61,lng:77.21},
  {id:43,name:"Tomoko Hayashi",country:"Japan",city:"Tokyo",region:"asiapac",certs:["cf","bf","aff","bpf"],languages:["日本語","English"],classes:15,bio:"Access in the Japanese context.",featured:false,lat:35.68,lng:139.65},
  {id:44,name:"Soo-Jin Park",country:"South Korea",city:"Seoul",region:"asiapac",certs:["cf","bf","bycf"],languages:["한국어","English"],classes:17,bio:"Being You in South Korea.",featured:false,lat:37.57,lng:126.98},
  {id:45,name:"Sarah Tan",country:"Singapore",city:"Singapore",region:"asiapac",certs:["cf","bf","jcf","rrycf"],languages:["English","中文"],classes:27,bio:"Joy of Business across Southeast Asia.",featured:false,lat:1.35,lng:103.82},
  {id:46,name:"Jason Wong",country:"Hong Kong",city:"Hong Kong",region:"asiapac",certs:["cf","bf","jcf","rrycf"],languages:["中文","English"],classes:22,bio:"Right Riches in Hong Kong's financial community.",featured:false,lat:22.32,lng:114.17},
  {id:47,name:"Fatima Al-Rashid",country:"UAE",city:"Dubai",region:"mideast",certs:["cf","bf","aff","bycf"],languages:["العربية","English"],classes:19,bio:"First certified facilitator in the Gulf.",featured:false,lat:25.20,lng:55.27},
  {id:48,name:"Yael Cohen",country:"Israel",city:"Tel Aviv",region:"mideast",certs:["cf","bf","bycf","rdd"],languages:["עברית","English"],classes:21,bio:"Being You and Relationships in Israel.",featured:false,lat:32.09,lng:34.78},
  {id:49,name:"Zeynep Kaya",country:"Turkey",city:"Istanbul",region:"mideast",certs:["cf","bf","bycf","jcf"],languages:["Türkçe","English"],classes:20,bio:"Bridging Europe and Asia.",featured:false,lat:41.01,lng:28.98},
  {id:50,name:"Thandi Nkosi",country:"South Africa",city:"Cape Town",region:"mideast",certs:["cf","bf","bycf"],languages:["English","Afrikaans"],classes:16,bio:"Growing Access in Southern Africa.",featured:false,lat:-33.92,lng:18.42},
  {id:51,name:"Nadia Benali",country:"Morocco",city:"Casablanca",region:"mideast",certs:["cf","bf","aff"],languages:["العربية","Français","English"],classes:11,bio:"Trilingual facilitator in North Africa.",featured:false,lat:33.57,lng:-7.59},
  {id:52,name:"Sara Al-Mutairi",country:"Saudi Arabia",city:"Riyadh",region:"mideast",certs:["cf","bf","bycf"],languages:["العربية","English"],classes:14,bio:"Being You in Saudi Arabia.",featured:false,lat:24.71,lng:46.68},
];

const CLASS_TYPES = [
  { id:"bars",name:"Access Bars",color:"#3d8a7a",icon:"◆",dur:"1 day",price:"$350" },
  { id:"foundation",name:"The Foundation",color:"#2d6a7a",icon:"◇",dur:"4 days",price:"$1,500" },
  { id:"bycw",name:"Being You, Changing the World",color:"#7ac0a0",icon:"○",dur:"3 days",price:"$1,200" },
  { id:"cfp",name:"Choice for Possibilities",color:"#4a8a6a",icon:"□",dur:"3 days",price:"$1,000" },
  { id:"esb",name:"Energetic Synthesis of Being",color:"#1a3a4a",icon:"△",dur:"3 days",price:"$1,500" },
  { id:"joy",name:"Joy of Business",color:"#4a7a5a",icon:"☆",dur:"2 days",price:"$800" },
  { id:"body",name:"3-Day Body Class",color:"#3a6a5a",icon:"●",dur:"3 days",price:"$1,200" },
  { id:"facelift",name:"Energetic Facelift",color:"#2a6a5a",icon:"◎",dur:"1 day",price:"$350" },
  { id:"rdd",name:"Relationships Done Different",color:"#5a7a6a",icon:"♡",dur:"2 days",price:"$700" },
  { id:"rrfy",name:"Right Riches For You",color:"#4a7a5a",icon:"✦",dur:"2 days",price:"$800" },
];

const CL = [
  {id:1,type:"bars",fac:"Sarah Bennett",city:"London",country:"UK",date:"Mar 8",fmt:"In Person",spots:12,lat:51.51,lng:-0.13},
  {id:2,type:"foundation",fac:"Dr. Dain Heer",city:"Houston, TX",country:"US",date:"Mar 12–15",fmt:"In Person",spots:30,lat:29.76,lng:-95.37},
  {id:3,type:"bycw",fac:"Dr. Dain Heer",city:"Rome",country:"Italy",date:"Mar 20–22",fmt:"In Person",spots:45,lat:41.90,lng:12.50},
  {id:4,type:"bars",fac:"Marcela Gutiérrez",city:"Mexico City",country:"Mexico",date:"Mar 15",fmt:"In Person",spots:8,lat:19.43,lng:-99.13},
  {id:5,type:"joy",fac:"Simone Milasas",city:"Gold Coast",country:"Australia",date:"Mar 22–23",fmt:"In Person",spots:25,lat:-28.02,lng:153.4},
  {id:6,type:"bars",fac:"Katrin Müller",city:"Berlin",country:"Germany",date:"Mar 10",fmt:"In Person",spots:10,lat:52.52,lng:13.41},
  {id:7,type:"esb",fac:"Dr. Dain Heer",city:"Online",country:"",date:"Apr 3–5",fmt:"Online",spots:200,lat:0,lng:0},
  {id:8,type:"facelift",fac:"Kalpana Raghuraman",city:"Mumbai",country:"India",date:"Mar 16",fmt:"In Person",spots:6,lat:19.08,lng:72.88},
  {id:9,type:"rdd",fac:"Simone Milasas",city:"Online",country:"",date:"Apr 10–11",fmt:"Online",spots:100,lat:0,lng:0},
  {id:10,type:"bars",fac:"Ana Carolina Silva",city:"São Paulo",country:"Brazil",date:"Mar 22",fmt:"In Person",spots:10,lat:-23.55,lng:-46.63},
  {id:11,type:"foundation",fac:"Gary Douglas",city:"Houston, TX",country:"US",date:"Apr 1–4",fmt:"In Person",spots:40,lat:29.76,lng:-95.37},
  {id:12,type:"body",fac:"Marco Bianchi",city:"Rome",country:"Italy",date:"Mar 27–29",fmt:"In Person",spots:8,lat:41.90,lng:12.50},
  {id:13,type:"bars",fac:"Fatima Al-Rashid",city:"Dubai",country:"UAE",date:"Mar 14",fmt:"In Person",spots:8,lat:25.20,lng:55.27},
  {id:14,type:"joy",fac:"Jessica Thompson",city:"New York, NY",country:"US",date:"Mar 28–29",fmt:"In Person",spots:15,lat:40.71,lng:-74.01},
  {id:15,type:"bars",fac:"Tomoko Hayashi",city:"Tokyo",country:"Japan",date:"Mar 21",fmt:"In Person",spots:8,lat:35.68,lng:139.65},
  {id:16,type:"cfp",fac:"Grace Douglas",city:"Houston, TX",country:"US",date:"Apr 8–10",fmt:"In Person",spots:35,lat:29.76,lng:-95.37},
  {id:17,type:"bycw",fac:"Grace Douglas",city:"Online",country:"",date:"Apr 17–19",fmt:"Online",spots:150,lat:0,lng:0},
  {id:18,type:"bars",fac:"Zeynep Kaya",city:"Istanbul",country:"Turkey",date:"Mar 29",fmt:"In Person",spots:10,lat:41.01,lng:28.98},
  {id:19,type:"rrfy",fac:"Stefan Weber",city:"Munich",country:"Germany",date:"Apr 5–6",fmt:"In Person",spots:12,lat:48.14,lng:11.58},
  {id:20,type:"foundation",fac:"Simone Milasas",city:"Casalborgone",country:"Italy",date:"May 5–8",fmt:"In Person",spots:20,lat:45.16,lng:7.93},
  {id:21,type:"bars",fac:"Soo-Jin Park",city:"Seoul",country:"S. Korea",date:"Mar 15",fmt:"In Person",spots:8,lat:37.57,lng:126.98},
  {id:22,type:"joy",fac:"Sarah Tan",city:"Singapore",country:"Singapore",date:"Apr 18–19",fmt:"In Person",spots:15,lat:1.35,lng:103.82},
  {id:23,type:"bars",fac:"Thandi Nkosi",city:"Cape Town",country:"S. Africa",date:"Apr 12",fmt:"In Person",spots:10,lat:-33.92,lng:18.42},
  {id:24,type:"bars",fac:"Nathalie Tremblay",city:"Montreal",country:"Canada",date:"Mar 29",fmt:"In Person",spots:8,lat:45.50,lng:-73.57},
];

const JOURNEY = [
  {id:"bars_class",name:"Access Bars Class",desc:"Learn to run the Bars — 32 points on the head.",status:"done",date:"Sep 2024",cert:"BP"},
  {id:"gifting",name:"Bars Gifting & Receiving",desc:"Practice sessions. Build confidence.",status:"done",date:"Oct–Dec 2024",cert:null},
  {id:"foundation",name:"The Foundation",desc:"4-day deep dive into core Access tools.",status:"done",date:"Jan 2025",cert:null},
  {id:"foundation2",name:"The Foundation (repeat)",desc:"Different facilitator, new layers.",status:"done",date:"Jun 2025",cert:null},
  {id:"bars_fac",name:"Bars Facilitator Training",desc:"Certification to teach Access Bars worldwide.",status:"active",date:"Feb 2026",cert:"BF"},
  {id:"choice",name:"Choice for Possibilities",desc:"3-day class: choice, awareness, creation.",status:"next",date:null,cert:null},
  {id:"bycw",name:"Being You, Changing the World",desc:"What if you being you is the gift?",status:"next",date:null,cert:null},
  {id:"certified",name:"Certified Facilitator Training",desc:"Full certification for all core classes.",status:"locked",date:null,cert:"CF"},
  {id:"specialty",name:"Specialty Certifications",desc:"Body, Facelift, Being You, Joy of Business…",status:"locked",date:null,cert:null},
  {id:"advanced",name:"Advanced Facilitator",desc:"Highest level of Access certification.",status:"locked",date:null,cert:"ACAF"},
];

type TabId = "home" | "facilitators" | "classes" | "journey" | "dashboard" | "resources";

const CORE_TOOLS = [
  {id:"clearing",name:"The Clearing Statement",icon:"◎",color:"#1a3a4a",short:"The foundational tool of Access.",detail:"Right and wrong, good and bad, POD and POC, all 9, shorts, boys and beyonds.® It bypasses the logical mind and goes directly to you, the being. You don't have to understand it for it to work."},
  {id:"wdtbt",name:"Who Does This Belong To?",icon:"◇",color:"#2d6a7a",short:"The awareness tool for empaths.",detail:"For every thought, feeling, and emotion you have, ask: who does this belong to? If it lightens up, it's not yours. Return it to sender. 98% of your thoughts, feelings, and emotions don't belong to you."},
  {id:"fourq",name:"The Four Questions",icon:"□",color:"#3d8a7a",short:"Four questions to make your life work.",detail:"What is this? What can I do with it? Can I change it? If so, how can I change it? Being aware of something doesn't mean you can change it — you've got to be in the question."},
  {id:"qcpc",name:"Question, Choice, Possibility, Contribution",icon:"△",color:"#5aaa8a",short:"The four sources of creation.",detail:"A question gives you awareness. A choice starts you on the road. Possibilities are all the choices available. Contribution is an awareness of what you can be and receive at all times — not a doing."},
];

const CLASS_PATH = [
  {id:"bars",name:"Access Bars",sub:"1 day · No prerequisites",color:"#3d8a7a"},
  {id:"foundation",name:"The Foundation",sub:"4 days · Bars required",color:"#2d6a7a"},
  {id:"choice",name:"Choice for Possibilities",sub:"3 days",color:"#4a8a6a"},
  {id:"being",name:"Being You, Changing the World",sub:"3 days",color:"#7ac0a0"},
  {id:"cf",name:"Certified Facilitator",sub:"Intensive training",color:"#1a3a4a"},
];

const KEY_CONCEPTS = [
  {id:"consciousness",name:"Consciousness",short:"Includes everything and judges nothing.",detail:"Consciousness is where you're actually present and engaged with everything going on around you. You have no judgment about it and there's no limitation in it. Totally present means you have no point of view — you're just there."},
  {id:"pkbr",name:"Perceiving, Knowing, Being & Receiving",short:"The four elements of you as an infinite being.",detail:"Thoughts are the lower harmonic of knowing. Feelings are the lower harmonic of perceiving. Emotions are the lower harmonic of being. Bodies feel; beings sense. Any time you're doing thoughts, feelings, emotions as your functional point of view, you're being less than you could choose to be."},
  {id:"humanoids",name:"Humanoids, Humans & Techies",short:"Three species on this planet.",detail:"Humanoids always judge themselves — they always know they're wrong. Humans always judge everybody else — they know they're right and you're wrong. As a humanoid, you need at least 10 things going on in your life at all times to be happy. Humanoids don't fail. They just quit before they get to success."},
  {id:"intimacy",name:"Five Elements of Intimacy",short:"Honoring, Trust, Allowance, Vulnerability, Gratitude.",detail:"These five elements create true intimacy — not the romantic version this reality sells you, but the willingness to be present with someone without walls, without barriers, and without judgment."},
  {id:"implants",name:"Distractor Implants",short:"The autopilot programs that run your life.",detail:"Anger, rage, fury, hate. Blame, shame, regret, guilt. These are implanted distractions designed to keep you from being present and conscious. When you recognize them as implants rather than truth, they begin to lose their hold."},
  {id:"money",name:"Money & Abundance",short:"The universe is an abundance universe.",detail:"Your point of view creates your reality — reality does not create your point of view. It's about being money, not having it. Money is a space of being you can choose. When you be it, it's no longer an issue. You don't have to be smart to make money — you just have to be willing to have it and ask for it."},
];

const DAILY_QUESTIONS = [
  "Who am I today and what grand and glorious adventure am I going to have?",
  "What else is possible?",
  "How does it get any better than this?",
  "What can I add to my life today that would make everything fun for me?",
  "What energy, space, and consciousness can my body and I be today?",
];

type Facilitator = typeof F[number];
type ClassItem = typeof CL[number];
type Location = { lat: number; lng: number };
type LocStatus = "idle" | "req" | "ok" | "no";

type PillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
};

type StatProps = {
  val: string;
  label: string;
  color?: string;
};

type LocBtnProps = {
  locSt: LocStatus;
  reqLoc: () => void;
};

type SearchBarProps = {
  val: string;
  set: (value: string) => void;
  placeholder: string;
  locSt: LocStatus;
  reqLoc: () => void;
};

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

type ProfileModalProps = {
  f: Facilitator;
  onClose: () => void;
  loc: Location | null;
};

type BookModalProps = {
  f: Facilitator;
  onClose: () => void;
};

type FCardProps = {
  f: Facilitator;
  loc: Location | null;
  onP: (f: Facilitator) => void;
  onB: (f: Facilitator) => void;
};

type CCardProps = {
  cl: ClassItem;
  loc: Location | null;
};

type HomeTabProps = {
  loc: Location | null;
  setTab: (tabId: TabId) => void;
  setProfileModal: (f: Facilitator) => void;
};

// ─── UTILS ──────────────────────────────────────────────────────────────────
const ini = (n: string) => n.split(" ").map((w: string) => w[0]).join("").slice(0,2);
const cc = (id: string) => CERTS.find(c=>c.id===id)?.color||"#666";
const ca = (id: string) => CERTS.find(c=>c.id===id)?.abbr||id;
const hav = (a: number,b: number,c: number,d: number) => {const R=6371,p=Math.PI/180,dl=(c-a)*p,dn=(d-b)*p;const x=Math.sin(dl/2)**2+Math.cos(a*p)*Math.cos(c*p)*Math.sin(dn/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x))};
const fd = (d: number) => d<100?`${Math.round(d)} km`:`${Math.round(d)} km`;
const ft = "'DM Sans',system-ui,sans-serif";
const mn = "'DM Mono',monospace";
const sf = "'Source Serif 4',Georgia,serif";

// ─── PILL ───────────────────────────────────────────────────────────────────
const Pill = ({label,active,onClick,count}: PillProps) => (
  <button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:100,border:active?"1.5px solid #1a3a4a":"1px solid #dde0de",background:active?"#1a3a4a":"#fff",color:active?"#fff":"#4a5a5a",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:ft,transition:"all 0.2s",whiteSpace:"nowrap"}}>
    {label}{count!==undefined&&<span style={{fontSize:11,opacity:0.7}}>{count}</span>}
  </button>
);

// ─── STAT BOX ───────────────────────────────────────────────────────────────
const Stat = ({val,label,color}: StatProps) => (
  <div style={{background:"#fff",borderRadius:14,padding:"18px 20px",flex:1,minWidth:100,border:"1px solid #e8ebe9"}}>
    <div style={{fontSize:24,fontWeight:700,color:color||"#1a3a4a",fontFamily:mn,lineHeight:1}}>{val}</div>
    <div style={{fontSize:10,color:"#8a9a9a",marginTop:6,fontFamily:mn,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
  </div>
);

// ─── LOC BUTTON ─────────────────────────────────────────────────────────────
const LocBtn = ({locSt,reqLoc}: LocBtnProps) => locSt==="idle"?<button onClick={reqLoc} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",borderRadius:12,border:"none",background:"#f0f7f4",color:"#1a3a4a",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:ft,whiteSpace:"nowrap"}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg>Near me</button>:locSt==="ok"?<div style={{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",borderRadius:12,background:"#e8f5ee",fontSize:13,color:"#2a6a4a"}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>Located</div>:<button onClick={reqLoc} style={{padding:"10px 18px",borderRadius:12,border:"none",background:"#f0f2f1",color:"#8a9a9a",fontSize:13,cursor:"pointer"}}>Retry</button>;

// ─── SEARCH BAR ─────────────────────────────────────────────────────────────
const SearchBar = ({val,set,placeholder,locSt,reqLoc}: SearchBarProps) => (
  <div style={{background:"#fff",borderRadius:16,padding:"6px 6px 6px 20px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 8px 32px rgba(0,0,0,0.12)",maxWidth:640,margin:"0 auto"}}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a9a9a" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input type="text" value={val} onChange={e=>set(e.target.value)} placeholder={placeholder} style={{flex:1,border:"none",outline:"none",fontSize:15,color:"#1a2a2a",fontFamily:ft,padding:"12px 0",background:"transparent"}} />
    {val&&<button onClick={()=>set("")} style={{background:"none",border:"none",cursor:"pointer",padding:"8px",color:"#8a9a9a",fontSize:18}}>×</button>}
    <LocBtn locSt={locSt} reqLoc={reqLoc} />
  </div>
);

// ─── MODALS ─────────────────────────────────────────────────────────────────
const Modal = ({onClose,children}: ModalProps) => (
  <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(4px)"}}>
    <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,maxWidth:560,width:"100%",maxHeight:"90vh",overflow:"auto",position:"relative"}}>
      <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"rgba(0,0,0,0.06)",border:"none",color:"#5a6a6a",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2}}>×</button>
      {children}
    </div>
  </div>
);

const ProfileModal = ({f,onClose,loc}: ProfileModalProps) => {
  const d=loc?hav(loc.lat,loc.lng,f.lat,f.lng):null;
  return <Modal onClose={onClose}>
    <div style={{background:`linear-gradient(135deg,${cc(f.certs[0])},${cc(f.certs[Math.min(2,f.certs.length-1)])})`,padding:"32px 28px 24px",borderRadius:"20px 20px 0 0"}}>
      <div style={{display:"flex",gap:18,alignItems:"center"}}>
        <div style={{width:72,height:72,borderRadius:18,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:mn,fontSize:22,fontWeight:500,flexShrink:0}}>{ini(f.name)}</div>
        <div><h2 style={{margin:0,fontSize:22,fontWeight:700,color:"#fff",fontFamily:sf}}>{f.name}</h2><div style={{fontSize:14,color:"rgba(255,255,255,0.7)",marginTop:4}}>{f.city}, {f.country}{d?` · ${fd(d)} away`:""}</div></div>
      </div>
    </div>
    <div style={{padding:"24px 28px"}}>
      <p style={{margin:"0 0 20px",fontSize:14,lineHeight:1.7,color:"#3a4a4a"}}>{f.bio}</p>
      <div style={{display:"flex",gap:16,marginBottom:20,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:120,background:"#f6f7f6",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontFamily:mn}}>Languages</div><div style={{fontSize:13,color:"#2a3a3a",fontWeight:500}}>{f.languages.join(", ")}</div></div>
        <div style={{flex:1,minWidth:120,background:"#f6f7f6",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontFamily:mn}}>Classes</div><div style={{fontSize:13,color:"#2a3a3a",fontWeight:500}}>{f.classes} upcoming</div></div>
      </div>
      <div style={{marginBottom:20}}><div style={{fontSize:10,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:mn}}>Certifications</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{f.certs.map(c=><span key={c} style={{padding:"6px 12px",borderRadius:8,fontSize:11,fontWeight:500,background:cc(c)+"10",color:cc(c),border:`1px solid ${cc(c)}20`,fontFamily:mn}}>{ca(c)}</span>)}</div></div>
      <button style={{width:"100%",padding:"14px 16px",borderRadius:12,border:"none",background:"#1a3a4a",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:ft}}>Book a Class</button>
    </div>
  </Modal>;
};

const BookModal = ({f,onClose}: BookModalProps) => {
  const [sent,setSent]=useState(false);
  return <Modal onClose={onClose}>
    <div style={{padding:"32px 28px"}}>
      {!sent?<>
        <h3 style={{margin:"0 0 4px",fontSize:20,fontWeight:700,color:"#1a2a2a",fontFamily:sf}}>Book a Session</h3>
        <p style={{margin:"0 0 24px",fontSize:14,color:"#6a7a7a"}}>with {f.name} · {f.city}</p>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div><label style={{display:"block",fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:mn}}>Your Name</label><input placeholder="Full name" style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid #dde0de",fontSize:14,fontFamily:ft,boxSizing:"border-box",outline:"none"}} /></div>
          <div><label style={{display:"block",fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:mn}}>Email</label><input placeholder="your@email.com" style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid #dde0de",fontSize:14,fontFamily:ft,boxSizing:"border-box",outline:"none"}} /></div>
          <div><label style={{display:"block",fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:mn}}>Interested in</label>
            <select style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid #dde0de",fontSize:14,fontFamily:ft,boxSizing:"border-box",background:"#fff",outline:"none"}}>
              <option>Access Bars Session</option><option>Access Bars Class</option>
              {f.certs.includes("aff")&&<option>Energetic Facelift</option>}
              {f.certs.includes("bpf")&&<option>Body Process</option>}
              {f.certs.includes("bycf")&&<option>Being You Class</option>}
              {f.certs.includes("jcf")&&<option>Joy of Business</option>}
              <option>Other / Not sure</option>
            </select></div>
          <button onClick={()=>setSent(true)} style={{padding:"14px",borderRadius:12,border:"none",background:"#1a3a4a",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:ft,marginTop:4}}>Request a Session</button>
        </div>
      </>:<div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{width:56,height:56,borderRadius:14,background:"#e8f5ee",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2a6a4a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg></div>
        <h3 style={{margin:"0 0 8px",fontSize:20,fontWeight:700,fontFamily:sf}}>Request Sent</h3>
        <p style={{margin:"0 0 24px",fontSize:14,color:"#6a7a7a"}}>They'll respond within 24–48 hours.</p>
        <button onClick={onClose} style={{padding:"12px 24px",borderRadius:10,border:"1.5px solid #1a3a4a",background:"transparent",color:"#1a3a4a",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:ft}}>Close</button>
      </div>}
    </div>
  </Modal>;
};

// ─── FACILITATOR CARD ───────────────────────────────────────────────────────
const FCard = ({f,loc,onP,onB}: FCardProps) => {
  const [o,setO]=useState(false);
  const d=loc?hav(loc.lat,loc.lng,f.lat,f.lng):null;
  return <div onClick={()=>setO(!o)} onMouseEnter={e=>{if(!o)(e.currentTarget.style.transform="translateY(-1px)");e.currentTarget.style.boxShadow="0 6px 24px rgba(26,58,74,0.1)"}} onMouseLeave={e=>{if(!o)(e.currentTarget.style.transform="translateY(0)");if(!o)e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)"}} style={{background:"#fff",borderRadius:16,padding:"24px 28px",cursor:"pointer",transition:"all 0.3s",border:f.featured?"1.5px solid #1a3a4a":"1px solid #e8ebe9",boxShadow:o?"0 12px 40px rgba(26,58,74,0.12)":"0 1px 3px rgba(0,0,0,0.04)",position:"relative"}}>
    {f.featured&&<div style={{position:"absolute",top:12,right:16,fontSize:10,fontFamily:mn,color:"#1a3a4a",letterSpacing:"0.1em",textTransform:"uppercase",opacity:0.6}}>Featured</div>}
    <div style={{display:"flex",gap:18,alignItems:"flex-start"}}>
      <div style={{width:56,height:56,borderRadius:14,background:`linear-gradient(135deg,${cc(f.certs[0])},${cc(f.certs[Math.min(1,f.certs.length-1)])})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:mn,fontSize:16,fontWeight:500,flexShrink:0}}>{ini(f.name)}</div>
      <div style={{flex:1,minWidth:0}}>
        <h3 style={{margin:0,fontSize:17,fontWeight:600,color:"#1a2a2a",fontFamily:sf}}>{f.name}</h3>
        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4,color:"#5a6a6a",fontSize:13,flexWrap:"wrap"}}><span>{f.city}, {f.country}</span>{d&&<span style={{color:"#8a9a9a"}}>· {fd(d)}</span>}</div>
        <div style={{display:"flex",gap:5,marginTop:10,flexWrap:"wrap"}}>
          {f.certs.slice(0,o?undefined:4).map(c=><span key={c} style={{display:"inline-block",padding:"3px 8px",borderRadius:6,fontSize:10.5,fontWeight:600,fontFamily:mn,background:cc(c)+"12",color:cc(c)}}>{ca(c)}</span>)}
          {!o&&f.certs.length>4&&<span style={{fontSize:10.5,color:"#8a9a9a",padding:"3px 4px",fontFamily:mn}}>+{f.certs.length-4}</span>}
        </div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:22,fontWeight:700,color:"#1a3a4a",fontFamily:mn,lineHeight:1}}>{f.classes}</div><div style={{fontSize:10,color:"#8a9a9a",marginTop:2,fontFamily:mn,textTransform:"uppercase"}}>classes</div></div>
    </div>
    {o&&<div style={{marginTop:20,paddingTop:16,borderTop:"1px solid #f0f2f1"}}>
      <p style={{margin:"0 0 14px",fontSize:14,lineHeight:1.65,color:"#3a4a4a"}}>{f.bio}</p>
      <div style={{display:"flex",gap:10}}>
        <button onClick={e=>{e.stopPropagation();onP(f)}} style={{flex:1,padding:"12px 16px",borderRadius:10,border:"none",background:"#1a3a4a",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:ft}}>View Profile & Classes</button>
        <button onClick={e=>{e.stopPropagation();onB(f)}} style={{padding:"12px 16px",borderRadius:10,border:"1.5px solid #1a3a4a",background:"transparent",color:"#1a3a4a",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:ft}}>Book</button>
      </div>
    </div>}
  </div>;
};

// ─── CLASS CARD ─────────────────────────────────────────────────────────────
const CCard = ({cl,loc}: CCardProps) => {
  const [o,setO]=useState(false);
  const ct=CLASS_TYPES.find(t=>t.id===cl.type);
  if (!ct) return null;
  const d=loc&&cl.lat?hav(loc.lat,loc.lng,cl.lat,cl.lng):null;
  return <div onClick={()=>setO(!o)} onMouseEnter={e=>{if(!o)(e.currentTarget.style.transform="translateY(-1px)");e.currentTarget.style.boxShadow="0 6px 24px rgba(26,58,74,0.1)"}} onMouseLeave={e=>{if(!o)(e.currentTarget.style.transform="translateY(0)");if(!o)e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)"}} style={{background:"#fff",borderRadius:16,padding:"20px 24px",cursor:"pointer",transition:"all 0.3s",border:"1px solid #e8ebe9",boxShadow:o?"0 12px 40px rgba(26,58,74,0.12)":"0 1px 3px rgba(0,0,0,0.04)"}}>
    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
      <div style={{width:48,height:48,borderRadius:12,background:ct.color+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,color:ct.color}}>{ct.icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <h3 style={{margin:0,fontSize:16,fontWeight:600,color:"#1a2a2a",fontFamily:sf}}>{ct.name}</h3>
          {cl.fmt==="Online"&&<span style={{padding:"2px 8px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:mn,background:"#e8f0fe",color:"#2a5a9a"}}>ONLINE</span>}
        </div>
        <div style={{fontSize:13,color:"#5a6a6a",marginTop:4}}>{cl.fac} · {cl.city}{cl.country?`, ${cl.country}`:""}{d&&d>0?<span style={{color:"#8a9a9a"}}> · {fd(d)}</span>:null}</div>
        <div style={{display:"flex",gap:12,marginTop:8,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:"#3a4a4a",fontFamily:mn}}>{cl.date}</span><span style={{fontSize:12,color:"#8a9a9a"}}>·</span>
          <span style={{fontSize:12,color:"#3a4a4a",fontFamily:mn}}>{ct.dur}</span><span style={{fontSize:12,color:"#8a9a9a"}}>·</span>
          <span style={{fontSize:12,color:"#5aaa8a",fontWeight:600,fontFamily:mn}}>{cl.spots} spots</span>
        </div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:18,fontWeight:700,color:"#1a3a4a",fontFamily:mn}}>{ct.price}</div></div>
    </div>
    {o&&<div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #f0f2f1"}}>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16}}>
        <div style={{flex:1,minWidth:130,background:"#f6f7f6",borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:10,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontFamily:mn}}>Facilitator</div><div style={{fontSize:13,fontWeight:500}}>{cl.fac}</div></div>
        <div style={{flex:1,minWidth:130,background:"#f6f7f6",borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:10,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontFamily:mn}}>Prerequisites</div><div style={{fontSize:13,fontWeight:500}}>{cl.type==="bars"||cl.type==="facelift"?"None":"Bars Class"}</div></div>
      </div>
      <button style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:"#1a3a4a",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:ft}}>Register for This Class</button>
    </div>}
  </div>;
};

// ─── HOME TAB ───────────────────────────────────────────────────────────────
const HomeTab = ({loc,setTab,setProfileModal}: HomeTabProps) => {
  const nearbyClasses = loc ? [...CL].filter(c=>c.lat).sort((a,b)=>hav(loc.lat,loc.lng,a.lat,a.lng)-hav(loc.lat,loc.lng,b.lat,b.lng)).slice(0,3) : CL.slice(0,3);
  const nearbyFacs = loc ? [...F].sort((a,b)=>hav(loc.lat,loc.lng,a.lat,a.lng)-hav(loc.lat,loc.lng,b.lat,b.lng)).slice(0,4) : F.filter(f=>f.featured).slice(0,4);
  const activeStep = JOURNEY.find(s=>s.status==="active");
  const nextSteps = JOURNEY.filter(s=>s.status==="next");
  const done = JOURNEY.filter(s=>s.status==="done").length;

  return <div style={{maxWidth:800,margin:"0 auto",padding:"0 24px 60px"}}>
    {/* Welcome */}
    <div style={{background:"#fff",borderRadius:20,padding:"28px",marginBottom:20,border:"1px solid #e8ebe9"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16}}>
        <div>
          <div style={{fontSize:14,color:"#8a9a9a",marginBottom:4}}>Welcome back,</div>
          <h2 style={{margin:"0 0 6px",fontSize:26,fontWeight:700,color:"#1a2a2a",fontFamily:sf}}>Jordi</h2>
          <div style={{fontSize:13,color:"#5a6a6a"}}>Bars Facilitator in training · Mazunte, Oaxaca</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <div style={{background:"#1a3a4a",borderRadius:10,padding:"10px 14px",textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:"#fff",fontFamily:mn}}>{done}</div><div style={{fontSize:9,color:"rgba(255,255,255,0.6)",fontFamily:mn,textTransform:"uppercase",marginTop:2}}>Completed</div></div>
          <div style={{background:"#e8f5ee",borderRadius:10,padding:"10px 14px",textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:"#2a6a4a",fontFamily:mn}}>BF</div><div style={{fontSize:9,color:"#5a8a6a",fontFamily:mn,textTransform:"uppercase",marginTop:2}}>Next cert</div></div>
        </div>
      </div>
    </div>

    {/* Continue your journey */}
    {activeStep && <div style={{marginBottom:20}}>
      <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:mn}}>Continue Your Journey</div>
      <div style={{background:"#fff",borderRadius:16,padding:"22px 24px",border:"1.5px solid #5aaa8a"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div>
            <h3 style={{margin:"0 0 4px",fontSize:17,fontWeight:600,color:"#1a2a2a",fontFamily:sf}}>{activeStep.name}</h3>
            <p style={{margin:0,fontSize:13,color:"#6a7a7a"}}>{activeStep.desc}</p>
          </div>
          {activeStep.cert&&<span style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:600,fontFamily:mn,background:"#5aaa8a20",color:"#2a6a4a"}}>{activeStep.cert}</span>}
        </div>
        <div style={{marginTop:14,display:"flex",gap:10,alignItems:"center"}}>
          <div style={{flex:1,background:"#e8f5ee",borderRadius:6,height:6}}><div style={{width:"65%",height:"100%",background:"#5aaa8a",borderRadius:6}} /></div>
          <span style={{fontSize:12,color:"#5aaa8a",fontFamily:mn,fontWeight:600}}>65%</span>
        </div>
        <div style={{fontSize:12,color:"#5a7a6a",marginTop:6}}>2 sessions to go — what else is possible?</div>
        <div style={{display:"flex",gap:8,marginTop:14}}>
          {nextSteps.slice(0,2).map(s=><span key={s.id} style={{fontSize:12,color:"#8a9a9a",background:"#f6f7f6",padding:"6px 12px",borderRadius:8}}>Next → {s.name}</span>)}
        </div>
        <button onClick={()=>setTab("journey")} style={{marginTop:14,padding:"10px 16px",borderRadius:10,border:"none",background:"#1a3a4a",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:ft}}>View Full Journey</button>
      </div>
    </div>}

    {/* Classes near you */}
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:mn}}>{loc?"Classes Near You":"Upcoming Classes"}</div>
        <button onClick={()=>setTab("classes")} style={{fontSize:12,color:"#1a3a4a",background:"none",border:"none",cursor:"pointer",fontWeight:600,fontFamily:ft}}>See all →</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {nearbyClasses.map(cl=><CCard key={cl.id} cl={cl} loc={loc} />)}
      </div>
    </div>

    {/* Featured facilitators */}
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:mn}}>{loc?"Facilitators Near You":"Featured Facilitators"}</div>
        <button onClick={()=>setTab("facilitators")} style={{fontSize:12,color:"#1a3a4a",background:"none",border:"none",cursor:"pointer",fontWeight:600,fontFamily:ft}}>See all →</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
        {nearbyFacs.map(f=>(
          <div key={f.id} onClick={()=>setProfileModal(f)} style={{background:"#fff",borderRadius:14,padding:"18px 20px",cursor:"pointer",border:"1px solid #e8ebe9",transition:"all 0.2s"}}>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10}}>
              <div style={{width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${cc(f.certs[0])},${cc(f.certs[Math.min(1,f.certs.length-1)])})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:mn,fontSize:14,flexShrink:0}}>{ini(f.name)}</div>
              <div><div style={{fontSize:14,fontWeight:600,color:"#1a2a2a",fontFamily:sf}}>{f.name}</div><div style={{fontSize:12,color:"#8a9a9a"}}>{f.city}</div></div>
            </div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{f.certs.slice(0,3).map(c=><span key={c} style={{padding:"2px 6px",borderRadius:4,fontSize:9.5,fontWeight:600,fontFamily:mn,background:cc(c)+"12",color:cc(c)}}>{ca(c)}</span>)}{f.certs.length>3&&<span style={{fontSize:9.5,color:"#aaa",fontFamily:mn}}>+{f.certs.length-3}</span>}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Daily question */}
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:mn}}>Daily Question</div>
        <button onClick={()=>setTab("resources")} style={{fontSize:12,color:"#1a3a4a",background:"none",border:"none",cursor:"pointer",fontWeight:600,fontFamily:ft}}>All resources →</button>
      </div>
      <div style={{background:"#fff",borderRadius:16,padding:"22px 24px",border:"1px solid #e8ebe9"}}>
        <p style={{margin:0,fontSize:16,color:"#1a3a4a",fontFamily:sf,fontStyle:"italic",lineHeight:1.6}}>Who am I today and what grand and glorious adventure am I going to have?</p>
        <p style={{margin:"10px 0 0",fontSize:12,color:"#8a9a9a"}}>Ask this every morning — your life becomes the adventure of living.</p>
      </div>
    </div>

    {/* Quick stats */}
    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
      <Stat val="52" label="Facilitators" />
      <Stat val="24" label="Classes This Month" />
      <Stat val="176" label="Countries" />
      <Stat val="10" label="Class Types" color="#5aaa8a" />
    </div>
  </div>;
};

// ─── DASHBOARD TAB ──────────────────────────────────────────────────────────
const DashTab = () => {
  const months = ["Sep","Oct","Nov","Dec","Jan","Feb"];
  const earnings = [420,680,1150,890,1340,780];
  const maxE = Math.max(...earnings);
  const students = [
    {name:"Maria L.",class:"Access Bars",date:"Feb 20",status:"confirmed"},
    {name:"Carlos R.",class:"Access Bars",date:"Feb 22",status:"confirmed"},
    {name:"Sophie M.",class:"Access Bars",date:"Mar 8",status:"pending"},
    {name:"Yuki T.",class:"Access Bars",date:"Mar 8",status:"pending"},
    {name:"Ahmed K.",class:"Access Bars",date:"Mar 15",status:"pending"},
  ];
  const myClasses = [
    {name:"Access Bars Class",date:"Mar 8, 2026",city:"Mazunte",enrolled:4,capacity:8,revenue:"$1,400"},
    {name:"Access Bars Class",date:"Mar 22, 2026",city:"Puerto Escondido",enrolled:2,capacity:8,revenue:"$700"},
    {name:"Access Bars Class",date:"Apr 5, 2026",city:"Oaxaca City",enrolled:0,capacity:10,revenue:"$0"},
  ];

  return <div style={{maxWidth:800,margin:"0 auto",padding:"0 24px 60px"}}>
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16}}>
        <div>
          <h2 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,color:"#1a2a2a",fontFamily:sf}}>Facilitator Dashboard</h2>
          <div style={{fontSize:14,color:"#5a6a6a"}}>Jordi Amat · Bars Facilitator · Mazunte, Oaxaca</div>
          <div style={{fontSize:12,color:"#5aaa8a",marginTop:4,fontStyle:"italic"}}>Your facilitation is creating change in the world.</div>
        </div>
        <button style={{padding:"10px 18px",borderRadius:10,border:"none",background:"#1a3a4a",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:ft}}>+ Create Class</button>
      </div>
    </div>

    {/* Stats row */}
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:24}}>
      <Stat val="$5,260" label="Total Earnings" />
      <Stat val="$780" label="This Month" color="#5aaa8a" />
      <Stat val="18" label="Total Students" />
      <Stat val="342" label="Profile Views" />
    </div>

    {/* Earnings chart */}
    <div style={{background:"#fff",borderRadius:16,padding:"24px",marginBottom:20,border:"1px solid #e8ebe9"}}>
      <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:16,fontFamily:mn}}>Earnings (6 months)</div>
      <div style={{display:"flex",alignItems:"flex-end",gap:8,height:120}}>
        {months.map((m,i)=>(
          <div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
            <div style={{fontSize:11,fontFamily:mn,color:"#1a3a4a",fontWeight:600}}>${earnings[i]}</div>
            <div style={{width:"100%",background:`linear-gradient(180deg, #1a3a4a, ${i===months.length-1?"#5aaa8a":"#2d6a7a"})`,borderRadius:6,height:`${(earnings[i]/maxE)*80}px`,transition:"height 0.5s",minHeight:4}} />
            <div style={{fontSize:10,fontFamily:mn,color:"#8a9a9a"}}>{m}</div>
          </div>
        ))}
      </div>
    </div>

    {/* My classes */}
    <div style={{marginBottom:20}}>
      <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:mn}}>My Upcoming Classes</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {myClasses.map((cl,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:14,padding:"18px 22px",border:"1px solid #e8ebe9"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
              <div>
                <h4 style={{margin:"0 0 4px",fontSize:15,fontWeight:600,color:"#1a2a2a",fontFamily:sf}}>{cl.name}</h4>
                <div style={{fontSize:13,color:"#5a6a6a"}}>{cl.date} · {cl.city}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:16,fontWeight:700,color:"#1a3a4a",fontFamily:mn}}>{cl.revenue}</div>
                <div style={{fontSize:11,color:"#8a9a9a",fontFamily:mn}}>{cl.enrolled}/{cl.capacity} enrolled</div>
              </div>
            </div>
            <div style={{marginTop:10,background:"#f0f2f1",borderRadius:4,height:4,overflow:"hidden"}}>
              <div style={{width:`${(cl.enrolled/cl.capacity)*100}%`,height:"100%",background:cl.enrolled>0?"#5aaa8a":"#dde0de",borderRadius:4}} />
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button style={{padding:"8px 14px",borderRadius:8,border:"1px solid #dde0de",background:"#fff",color:"#3a4a4a",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:ft}}>Edit Class</button>
              <button style={{padding:"8px 14px",borderRadius:8,border:"none",background:"#f0f7f4",color:"#1a3a4a",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:ft}}>Share Link</button>
              <button style={{padding:"8px 14px",borderRadius:8,border:"none",background:"#f6f7f6",color:"#5a6a6a",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:ft}}>View Enrollees</button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent students */}
    <div style={{marginBottom:20}}>
      <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:mn}}>Recent Students</div>
      <div style={{background:"#fff",borderRadius:16,border:"1px solid #e8ebe9",overflow:"hidden"}}>
        {students.map((s,i)=>(
          <div key={i} style={{padding:"14px 22px",borderBottom:i<students.length-1?"1px solid #f0f2f1":"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:34,height:34,borderRadius:10,background:"#f0f7f4",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a3a4a",fontFamily:mn,fontSize:12,fontWeight:500}}>{s.name.split(" ").map(w=>w[0]).join("")}</div>
              <div><div style={{fontSize:14,fontWeight:500,color:"#1a2a2a"}}>{s.name}</div><div style={{fontSize:12,color:"#8a9a9a"}}>{s.class} · {s.date}</div></div>
            </div>
            <span style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:500,fontFamily:mn,background:s.status==="confirmed"?"#e8f5ee":"#fef3e2",color:s.status==="confirmed"?"#2a6a4a":"#8a6a2a"}}>{s.status}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Profile discovery */}
    <div style={{background:"#fff",borderRadius:16,padding:"24px",border:"1px solid #e8ebe9"}}>
      <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:16,fontFamily:mn}}>Profile Discovery</div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:140}}>
          <div style={{fontSize:28,fontWeight:700,color:"#1a3a4a",fontFamily:mn}}>342</div>
          <div style={{fontSize:12,color:"#5a6a6a"}}>Profile views this month</div>
          <div style={{fontSize:12,color:"#5aaa8a",fontWeight:600,marginTop:2}}>↑ 23% from last month</div>
        </div>
        <div style={{flex:1,minWidth:140}}>
          <div style={{fontSize:28,fontWeight:700,color:"#1a3a4a",fontFamily:mn}}>47</div>
          <div style={{fontSize:12,color:"#5a6a6a"}}>Directory appearances</div>
          <div style={{fontSize:12,color:"#8a9a9a",marginTop:2}}>Top searches: "bars mazunte", "oaxaca"</div>
        </div>
        <div style={{flex:1,minWidth:140}}>
          <div style={{fontSize:28,fontWeight:700,color:"#5aaa8a",fontFamily:mn}}>12%</div>
          <div style={{fontSize:12,color:"#5a6a6a"}}>Conversion rate</div>
          <div style={{fontSize:12,color:"#8a9a9a",marginTop:2}}>View → booking request</div>
        </div>
      </div>
    </div>
  </div>;
};

// ─── JOURNEY TAB ────────────────────────────────────────────────────────────
const JourneyTab = () => {
  const done=JOURNEY.filter(s=>s.status==="done").length;
  return <div style={{maxWidth:800,margin:"0 auto",padding:"0 24px 60px"}}>
    <div style={{background:"#fff",borderRadius:20,padding:"28px",marginBottom:24,border:"1px solid #e8ebe9"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16}}>
        <div><div style={{fontSize:10,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:mn}}>Your Access Journey</div><h2 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,fontFamily:sf}}>Jordi Amat</h2><div style={{fontSize:14,color:"#5a6a6a"}}>Mazunte, Oaxaca · Since Sep 2024</div></div>
        <div style={{display:"flex",gap:12}}><div style={{textAlign:"center",background:"#f6f7f6",borderRadius:12,padding:"12px 18px"}}><div style={{fontSize:22,fontWeight:700,color:"#1a3a4a",fontFamily:mn}}>{done}</div><div style={{fontSize:10,color:"#8a9a9a",fontFamily:mn,textTransform:"uppercase"}}>Done</div></div><div style={{textAlign:"center",background:"#f6f7f6",borderRadius:12,padding:"12px 18px"}}><div style={{fontSize:22,fontWeight:700,color:"#5aaa8a",fontFamily:mn}}>BF</div><div style={{fontSize:10,color:"#8a9a9a",fontFamily:mn,textTransform:"uppercase"}}>Next</div></div></div>
      </div>
      <div style={{marginTop:20,background:"#f0f2f1",borderRadius:8,height:6,overflow:"hidden"}}><div style={{width:`${(done/JOURNEY.length)*100}%`,height:"100%",background:"linear-gradient(90deg,#1a3a4a,#5aaa8a)",borderRadius:8}} /></div>
      <div style={{marginTop:6,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:"#8a9a9a",fontFamily:mn}}>{done} of {JOURNEY.length}</span><span style={{fontSize:11,color:"#5aaa8a",fontFamily:mn,fontWeight:500}}>{Math.round((done/JOURNEY.length)*100)}%</span></div>
    </div>
    <div style={{position:"relative"}}>
      <div style={{position:"absolute",left:28,top:0,bottom:0,width:2,background:"#e8ebe9",zIndex:0}} />
      <div style={{display:"flex",flexDirection:"column",gap:12,position:"relative",zIndex:1}}>
        {JOURNEY.map(s=>{
          const d=s.status==="done",a=s.status==="active",n=s.status==="next",l=s.status==="locked";
          return <div key={s.id} style={{display:"flex",gap:20,alignItems:"flex-start"}}>
            <div style={{width:20,height:20,borderRadius:10,flexShrink:0,marginTop:18,marginLeft:19,background:d?"#1a3a4a":a?"#5aaa8a":"#e8ebe9",border:a?"3px solid #c8e8d8":"none",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}>{d&&<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}{a&&<div style={{width:8,height:8,borderRadius:4,background:"#fff"}}/>}</div>
            <div style={{flex:1,background:"#fff",borderRadius:14,padding:"18px 22px",border:a?"1.5px solid #5aaa8a":"1px solid #e8ebe9",opacity:l?0.5:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                <div><h4 style={{margin:"0 0 4px",fontSize:15,fontWeight:600,color:"#1a2a2a",fontFamily:sf}}>{s.name}</h4><p style={{margin:0,fontSize:13,color:"#6a7a7a",lineHeight:1.5}}>{s.desc}</p></div>
                <div style={{textAlign:"right",flexShrink:0}}>{s.date&&<div style={{fontSize:12,color:"#8a9a9a",fontFamily:mn}}>{s.date}</div>}{s.cert&&<div style={{marginTop:4,display:"inline-block",padding:"3px 8px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:mn,background:d||a?"#1a3a4a12":"#f0f2f1",color:d||a?"#1a3a4a":"#aaa"}}>{s.cert}</div>}</div>
              </div>
              {a&&<div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #e8f5ee"}}><div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{flex:1,background:"#e8f5ee",borderRadius:6,height:4}}><div style={{width:"65%",height:"100%",background:"#5aaa8a",borderRadius:6}}/></div><span style={{fontSize:11,color:"#5aaa8a",fontFamily:mn,fontWeight:600}}>65%</span></div><div style={{fontSize:12,color:"#5a7a6a",marginTop:6}}>2 sessions to go — how does it get even better?</div></div>}
              {n&&<button style={{marginTop:12,padding:"10px 16px",borderRadius:10,border:"1.5px solid #1a3a4a",background:"transparent",color:"#1a3a4a",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:ft}}>Find a Class</button>}
              {l&&<div style={{marginTop:8,fontSize:11,color:"#aababa",fontFamily:mn}}>{s.id==="certified"?"Requires: Foundation ×2 + Choice for Possibilities":s.id==="advanced"?"Requires: CF + extensive facilitation":"Each choice opens the next"}</div>}
            </div>
          </div>;
        })}
      </div>
    </div>
  </div>;
};

// ─── RESOURCES TAB ─────────────────────────────────────────────────────────
const ResourcesTab = () => {
  const [openTool,setOpenTool]=useState<string|null>(null);
  const [openConcept,setOpenConcept]=useState<string|null>(null);
  const [cat,setCat]=useState<"all"|"tools"|"concepts"|"path"|"questions">("all");

  return <div style={{maxWidth:800,margin:"0 auto",padding:"0 24px 60px"}}>
    {/* Header */}
    <div style={{marginBottom:24}}>
      <h2 style={{margin:"0 0 4px",fontSize:24,fontWeight:700,color:"#1a2a2a",fontFamily:sf}}>Resources</h2>
      <p style={{margin:0,fontSize:14,color:"#5a6a6a"}}>Tools, concepts, and questions from The Foundation and beyond.</p>
    </div>

    {/* Category pills */}
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24}}>
      <Pill label="All" active={cat==="all"} onClick={()=>setCat("all")} />
      <Pill label="Core Tools" active={cat==="tools"} onClick={()=>setCat("tools")} />
      <Pill label="Class Path" active={cat==="path"} onClick={()=>setCat("path")} />
      <Pill label="Key Concepts" active={cat==="concepts"} onClick={()=>setCat("concepts")} />
      <Pill label="Daily Questions" active={cat==="questions"} onClick={()=>setCat("questions")} />
    </div>

    {/* Core Tools */}
    {(cat==="all"||cat==="tools")&&<div style={{marginBottom:28}}>
      <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12,fontFamily:mn}}>Core Tools</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
        {CORE_TOOLS.map(t=>{
          const open=openTool===t.id;
          return <div key={t.id} onClick={()=>setOpenTool(open?null:t.id)} style={{background:"#fff",borderRadius:16,padding:"20px 22px",cursor:"pointer",transition:"all 0.3s",border:open?`1.5px solid ${t.color}`:"1px solid #e8ebe9",boxShadow:open?"0 8px 28px rgba(26,58,74,0.1)":"0 1px 3px rgba(0,0,0,0.04)"}}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:40,height:40,borderRadius:10,background:t.color+"12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:t.color,flexShrink:0}}>{t.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <h4 style={{margin:"0 0 4px",fontSize:15,fontWeight:600,color:"#1a2a2a",fontFamily:sf}}>{t.name}</h4>
                <p style={{margin:0,fontSize:13,color:"#6a7a7a",lineHeight:1.5}}>{t.short}</p>
              </div>
            </div>
            {open&&<div style={{marginTop:14,paddingTop:14,borderTop:"1px solid #f0f2f1"}}>
              <p style={{margin:0,fontSize:13,color:"#3a4a4a",lineHeight:1.7,fontStyle:t.id==="clearing"?"italic":"normal"}}>{t.detail}</p>
            </div>}
          </div>;
        })}
      </div>
    </div>}

    {/* Class Path */}
    {(cat==="all"||cat==="path")&&<div style={{marginBottom:28}}>
      <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12,fontFamily:mn}}>Class Path</div>
      <div style={{background:"#fff",borderRadius:16,padding:"24px",border:"1px solid #e8ebe9"}}>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#6a7a7a"}}>How classes connect — each choice opens the next.</p>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {CLASS_PATH.map((step,i)=>(
            <div key={step.id} style={{display:"flex",alignItems:"flex-start",gap:16}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                <div style={{width:14,height:14,borderRadius:7,background:step.color,flexShrink:0}} />
                {i<CLASS_PATH.length-1&&<div style={{width:2,height:40,background:"#e8ebe9"}} />}
              </div>
              <div style={{paddingBottom:i<CLASS_PATH.length-1?16:0}}>
                <div style={{fontSize:15,fontWeight:600,color:"#1a2a2a",fontFamily:sf}}>{step.name}</div>
                <div style={{fontSize:12,color:"#8a9a9a",marginTop:2,fontFamily:mn}}>{step.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:20,padding:"14px 16px",background:"#f6f7f6",borderRadius:10}}>
          <div style={{fontSize:12,color:"#5a6a6a",lineHeight:1.6}}>
            <strong style={{color:"#1a3a4a"}}>Beyond CF:</strong> Specialty certifications (Body Process, Facelift, Being You, Joy of Business, Right Riches for You) and Advanced Facilitator training.
          </div>
        </div>
      </div>
    </div>}

    {/* Key Concepts */}
    {(cat==="all"||cat==="concepts")&&<div style={{marginBottom:28}}>
      <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12,fontFamily:mn}}>Key Concepts</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {KEY_CONCEPTS.map(c=>{
          const open=openConcept===c.id;
          return <div key={c.id} onClick={()=>setOpenConcept(open?null:c.id)} style={{background:"#fff",borderRadius:14,padding:"18px 22px",cursor:"pointer",transition:"all 0.3s",border:"1px solid #e8ebe9",boxShadow:open?"0 8px 28px rgba(26,58,74,0.1)":"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
              <div>
                <h4 style={{margin:"0 0 4px",fontSize:15,fontWeight:600,color:"#1a2a2a",fontFamily:sf}}>{c.name}</h4>
                <p style={{margin:0,fontSize:13,color:"#6a7a7a"}}>{c.short}</p>
              </div>
              <div style={{fontSize:18,color:"#aababa",flexShrink:0,transition:"transform 0.2s",transform:open?"rotate(45deg)":"rotate(0)"}}>+</div>
            </div>
            {open&&<div style={{marginTop:14,paddingTop:14,borderTop:"1px solid #f0f2f1"}}>
              <p style={{margin:0,fontSize:13,color:"#3a4a4a",lineHeight:1.7}}>{c.detail}</p>
            </div>}
          </div>;
        })}
      </div>
    </div>}

    {/* Daily Questions */}
    {(cat==="all"||cat==="questions")&&<div style={{marginBottom:20}}>
      <div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12,fontFamily:mn}}>Daily Questions</div>
      <div style={{background:"#fff",borderRadius:16,padding:"24px",border:"1px solid #e8ebe9"}}>
        <p style={{margin:"0 0 16px",fontSize:13,color:"#6a7a7a"}}>Ask these every morning. A question empowers — it opens awareness, not answers.</p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {DAILY_QUESTIONS.map((q,i)=>(
            <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:24,height:24,borderRadius:6,background:"#1a3a4a12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#1a3a4a",fontFamily:mn,fontWeight:600,flexShrink:0}}>{i+1}</div>
              <p style={{margin:0,fontSize:14,color:"#2a3a3a",lineHeight:1.6,fontFamily:sf,fontStyle:"italic"}}>{q}</p>
            </div>
          ))}
        </div>
      </div>
    </div>}

    {/* Source attribution */}
    <div style={{textAlign:"center",padding:"20px 0"}}>
      <p style={{margin:0,fontSize:11,color:"#aababa",fontFamily:mn}}>Content drawn from The Foundation by Gary Douglas & Dr. Dain Heer</p>
    </div>
  </div>;
};

// ─── PROTOTYPE ──────────────────────────────────────────────────────────────
function AccessPrototype() {
  const [tab,setTab]=useState<TabId>("home");
  const [q,setQ]=useState<string>("");const [cQ,setCQ]=useState<string>("");
  const [region,setRegion]=useState<string | null>(null);const [cert,setCert]=useState<string | null>(null);const [lang,setLang]=useState<string | null>(null);
  const [loc,setLoc]=useState<Location | null>(null);const [sort,setSort]=useState<"relevance" | "distance" | "classes">("relevance");
  const [filters,setFilters]=useState<boolean>(false);const [locSt,setLocSt]=useState<LocStatus>("idle");const [show,setShow]=useState<number>(20);
  const [pM,setPM]=useState<Facilitator | null>(null);const [bM,setBM]=useState<Facilitator | null>(null);
  const [cType,setCType]=useState<string | null>(null);const [cFmt,setCFmt]=useState<"person" | "online" | null>(null);

  const reqLoc=()=>{setLocSt("req");navigator.geolocation?.getCurrentPosition(p=>{setLoc({lat:p.coords.latitude,lng:p.coords.longitude});setLocSt("ok");setSort("distance")},()=>setLocSt("no"))};

  const ql=q.toLowerCase();
  const fRes=F.filter(f=>{if(q&&!f.name.toLowerCase().includes(ql)&&!f.city.toLowerCase().includes(ql)&&!f.country.toLowerCase().includes(ql))return false;if(region&&f.region!==region)return false;if(cert&&!f.certs.includes(cert))return false;if(lang&&!f.languages.includes(lang))return false;return true}).sort((a,b)=>{if(sort==="distance"&&loc)return hav(loc.lat,loc.lng,a.lat,a.lng)-hav(loc.lat,loc.lng,b.lat,b.lng);if(sort==="classes")return b.classes-a.classes;return(b.featured?1:0)-(a.featured?1:0)||b.classes-a.classes});

  const cql=cQ.toLowerCase();
  const cRes=CL.filter(cl=>{if(cType&&cl.type!==cType)return false;if(cFmt==="online"&&cl.fmt!=="Online")return false;if(cFmt==="person"&&cl.fmt!=="In Person")return false;if(cQ&&!cl.fac.toLowerCase().includes(cql)&&!cl.city.toLowerCase().includes(cql))return false;return true}).sort((a,b)=>loc&&a.lat&&b.lat?hav(loc.lat,loc.lng,a.lat,a.lng)-hav(loc.lat,loc.lng,b.lat,b.lng):0);

  const langs=[...new Set(F.flatMap(f=>f.languages))].sort();
  const af=(region?1:0)+(cert?1:0)+(lang?1:0);

  const tabs: { id: TabId; label: string }[] = [
    {id:"home",label:"Home"},
    {id:"facilitators",label:"Facilitators"},
    {id:"classes",label:"Classes"},
    {id:"journey",label:"Your Journey"},
    {id:"dashboard",label:"Dashboard"},
    {id:"resources",label:"Resources"},
  ];

  return <div style={{minHeight:"100vh",background:"#f6f7f6",fontFamily:ft}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@400;600;700&display=swap" rel="stylesheet" />

    <header style={{background:"#1a3a4a",padding:"0 24px"}}>
      <div style={{maxWidth:800,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:56}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:8,height:8,borderRadius:"50%",background:"#7ac0a0"}} /><span style={{color:"#fff",fontSize:14,fontWeight:600}}>Access Consciousness</span></div>
        <span style={{color:"rgba(255,255,255,0.4)",fontSize:10,fontFamily:mn,letterSpacing:"0.08em"}}>PROTOTYPE · ASTRAL INTEGRATION</span>
      </div>
    </header>

    <div style={{background:"#1a3a4a",borderBottom:"1px solid rgba(255,255,255,0.1)",padding:"0 24px",overflowX:"auto"}}>
      <div style={{maxWidth:800,margin:"0 auto",display:"flex",gap:0,minWidth:"max-content"}}>
        {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"14px 20px",border:"none",background:"transparent",color:tab===t.id?"#fff":"rgba(255,255,255,0.4)",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:ft,borderBottom:tab===t.id?"2px solid #7ac0a0":"2px solid transparent",transition:"all 0.2s",whiteSpace:"nowrap"}}>{t.label}</button>)}
      </div>
    </div>

    {/* HOME */}
    {tab==="home"&&<div style={{padding:"28px 0 0"}}><HomeTab loc={loc} setTab={setTab} setProfileModal={setPM} /></div>}

    {/* FACILITATORS */}
    {tab==="facilitators"&&<>
      <div style={{background:"linear-gradient(180deg,#1a3a4a 0%,#1a3a4a 55%,#f6f7f6 100%)",padding:"36px 24px 76px"}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <h1 style={{margin:"0 0 8px",fontSize:30,fontWeight:700,color:"#fff",fontFamily:sf}}>Find Your Facilitator</h1>
          <p style={{margin:"0 auto 28px",fontSize:14,color:"rgba(255,255,255,0.55)",maxWidth:460}}>13,000+ certified facilitators across 176 countries. Every one of them chose something different.</p>
          <SearchBar val={q} set={v=>{setQ(v);setShow(20)}} placeholder="Search by name, city, or country..." locSt={locSt} reqLoc={reqLoc} />
        </div>
      </div>
      <div style={{maxWidth:800,margin:"-32px auto 0",padding:"0 24px 60px"}}>
        <div style={{marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <button onClick={()=>setFilters(!filters)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:10,border:filters?"1.5px solid #1a3a4a":"1px solid #dde0de",background:filters?"#1a3a4a":"#fff",color:filters?"#fff":"#4a5a5a",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:ft}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M7 12h10M10 18h4"/></svg>Filters
              {af>0&&<span style={{background:filters?"#7ac0a0":"#1a3a4a",color:"#fff",width:18,height:18,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{af}</span>}
            </button>
            {region&&<Pill label={REGIONS.find(r=>r.id===region)?.name ?? region} active onClick={()=>setRegion(null)} />}
            {cert&&<Pill label={ca(cert)} active onClick={()=>setCert(null)} />}
            {lang&&<Pill label={lang} active onClick={()=>setLang(null)} />}
            {af>1&&<button onClick={()=>{setRegion(null);setCert(null);setLang(null)}} style={{fontSize:12,color:"#8a9a9a",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>Clear all</button>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,color:"#8a9a9a",fontFamily:mn,textTransform:"uppercase"}}>Sort</span>
            <select
              value={sort}
              onChange={e=>setSort(e.target.value as "relevance" | "distance" | "classes")}
              style={{padding:"6px 12px",borderRadius:8,border:"1px solid #dde0de",background:"#fff",fontSize:13,cursor:"pointer",fontFamily:ft}}
            >
              <option value="relevance">Relevance</option>
              {loc&&<option value="distance">Nearest</option>}
              <option value="classes">Most Active</option>
            </select>
          </div>
        </div>
        {filters&&<div style={{background:"#fff",borderRadius:16,padding:24,marginBottom:20,border:"1px solid #e8ebe9"}}>
          <div style={{marginBottom:20}}><div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:mn}}>Region</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{REGIONS.map(r=><Pill key={r.id} label={r.name} active={region===r.id} onClick={()=>{setRegion(region===r.id?null:r.id);setShow(20)}} count={F.filter(f=>f.region===r.id).length} />)}</div></div>
          <div style={{marginBottom:20}}><div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:mn}}>Certification</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{CERTS.map(c=><Pill key={c.id} label={c.abbr} active={cert===c.id} onClick={()=>{setCert(cert===c.id?null:c.id);setShow(20)}} count={F.filter(f=>f.certs.includes(c.id)).length} />)}</div></div>
          <div><div style={{fontSize:11,color:"#8a9a9a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:mn}}>Language</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{langs.map(l=><Pill key={l} label={l} active={lang===l} onClick={()=>{setLang(lang===l?null:l);setShow(20)}} count={F.filter(f=>f.languages.includes(l)).length} />)}</div></div>
        </div>}
        <div style={{marginBottom:16}}><span style={{fontSize:13,color:"#8a9a9a",fontFamily:mn}}>{fRes.length} facilitator{fRes.length!==1?"s":""}{q&&` matching "${q}"`}</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>{fRes.slice(0,show).map(f=><FCard key={f.id} f={f} loc={loc} onP={setPM} onB={setBM} />)}</div>
        {show<fRes.length&&<div style={{textAlign:"center",marginTop:24}}><button onClick={()=>setShow(v=>v+20)} style={{padding:"14px 32px",borderRadius:12,border:"1.5px solid #1a3a4a",background:"#fff",color:"#1a3a4a",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:ft}}>Show more</button></div>}
        {fRes.length===0&&<div style={{textAlign:"center",padding:"60px 20px"}}><div style={{fontSize:16,color:"#5a6a6a",fontFamily:sf}}>No matches yet — what if you expanded your search?</div><button onClick={()=>{setQ("");setRegion(null);setCert(null);setLang(null)}} style={{fontSize:13,color:"#1a3a4a",background:"none",border:"none",cursor:"pointer",textDecoration:"underline",marginTop:8}}>Clear filters</button></div>}
      </div>
    </>}

    {/* CLASSES */}
    {tab==="classes"&&<>
      <div style={{background:"linear-gradient(180deg,#1a3a4a 0%,#1a3a4a 55%,#f6f7f6 100%)",padding:"36px 24px 76px"}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <h1 style={{margin:"0 0 8px",fontSize:30,fontWeight:700,color:"#fff",fontFamily:sf}}>Find a Class</h1>
          <p style={{margin:"0 auto 28px",fontSize:14,color:"rgba(255,255,255,0.55)",maxWidth:460}}>Thousands of classes weekly across 176 countries. What would change everything for you?</p>
          <SearchBar val={cQ} set={setCQ} placeholder="Search by facilitator, city, country..." locSt={locSt} reqLoc={reqLoc} />
        </div>
      </div>
      <div style={{maxWidth:800,margin:"-32px auto 0",padding:"0 24px 60px"}}>
        <div style={{marginBottom:20,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          <Pill label="All" active={!cType&&!cFmt} onClick={()=>{setCType(null);setCFmt(null)}} />
          <span style={{color:"#dde0de"}}>|</span>
          <Pill label="In Person" active={cFmt==="person"} onClick={()=>setCFmt(cFmt==="person"?null:"person")} />
          <Pill label="Online" active={cFmt==="online"} onClick={()=>setCFmt(cFmt==="online"?null:"online")} />
          <span style={{color:"#dde0de"}}>|</span>
          {CLASS_TYPES.slice(0,6).map(ct=><Pill key={ct.id} label={ct.name} active={cType===ct.id} onClick={()=>setCType(cType===ct.id?null:ct.id)} />)}
        </div>
        <div style={{marginBottom:16}}><span style={{fontSize:13,color:"#8a9a9a",fontFamily:mn}}>{cRes.length} class{cRes.length!==1?"es":""}</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>{cRes.map(cl=><CCard key={cl.id} cl={cl} loc={loc} />)}</div>
        {cRes.length===0&&<div style={{textAlign:"center",padding:"60px 20px"}}><div style={{fontSize:16,color:"#5a6a6a",fontFamily:sf}}>No classes yet — what else is possible?</div><button onClick={()=>{setCQ("");setCType(null);setCFmt(null)}} style={{fontSize:13,color:"#1a3a4a",background:"none",border:"none",cursor:"pointer",textDecoration:"underline",marginTop:8}}>Clear filters</button></div>}
      </div>
    </>}

    {/* JOURNEY */}
    {tab==="journey"&&<div style={{padding:"28px 0 0"}}><JourneyTab /></div>}

    {/* DASHBOARD */}
    {tab==="dashboard"&&<div style={{padding:"28px 0 0"}}><DashTab /></div>}

    {/* RESOURCES */}
    {tab==="resources"&&<div style={{padding:"28px 0 0"}}><ResourcesTab /></div>}

    {/* Footer */}
    <div style={{maxWidth:800,margin:"0 auto",padding:"0 24px 40px"}}><div style={{padding:"32px 0",borderTop:"1px solid #e8ebe9",textAlign:"center"}}><div style={{fontSize:11,color:"#aababa",fontFamily:mn,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Prototype built by</div><div style={{fontSize:16,color:"#1a3a4a",fontWeight:700,fontFamily:sf,marginBottom:4}}>Astral Integration</div><div style={{fontSize:13,color:"#8a9a9a"}}>Custom infrastructure for organizations changing the world</div><div style={{fontSize:12,color:"#aababa",fontFamily:mn,marginTop:2}}>astralintegration.studio</div></div></div>

    {pM&&<ProfileModal f={pM} onClose={()=>setPM(null)} loc={loc} />}
    {bM&&<BookModal f={bM} onClose={()=>setBM(null)} />}
  </div>;
}

// ─── FRAMED PAGE ────────────────────────────────────────────────────────────
export default function AccessPage() {
  useDocumentMeta({
    title: 'Access Consciousness — Platform Prototype — Astral Integration',
    description: 'What else is possible when 13,000 facilitators share one platform? An unsolicited prototype for Access Consciousness — facilitator directory, class discovery, student journey, and facilitator dashboard. Built by Jordi Amat.',
    ogUrl: 'https://astralintegration.studio/access',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <Navigation />

      {/* Framing intro */}
      <section className="pt-40 pb-16 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4 reveal">
            <span className="w-8 h-px bg-accent" />
            Unsolicited Prototype
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px] reveal">
            What else is possible when<br />13,000 facilitators share <em className="italic gradient-text">one platform?</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose mb-6 reveal">
            Access Consciousness empowers people across 176 countries to know what they know — and the facilitators delivering that awareness deserve infrastructure that matches it. Right now, directories don't connect, booking varies by facilitator, and there's no single place for a student to perceive their whole journey.
          </p>
          <p className="text-body text-content-secondary max-w-prose mb-6 reveal">
            This is what it could look like built from question, not assumption — a unified facilitator directory, class discovery across formats and geographies, a student journey tracker, and a facilitator dashboard. One system. Every choice opening the next.
          </p>
          <p className="text-body-sm text-content-muted max-w-prose mb-4 reveal">
            Built by Jordi Amat — Bars Facilitator in training, Foundation ×2, and the kind of engineer who builds with you, not just for you. This isn't a pitch deck. It's a working prototype.
          </p>

          <div className="flex flex-wrap gap-3 mt-8 reveal">
            <span className="text-meta uppercase text-content-muted bg-dark-card border border-border rounded-full px-4 py-2">Facilitator Directory</span>
            <span className="text-meta uppercase text-content-muted bg-dark-card border border-border rounded-full px-4 py-2">Class Discovery</span>
            <span className="text-meta uppercase text-content-muted bg-dark-card border border-border rounded-full px-4 py-2">Student Journey</span>
            <span className="text-meta uppercase text-content-muted bg-dark-card border border-border rounded-full px-4 py-2">Facilitator Dashboard</span>
            <span className="text-meta uppercase text-content-muted bg-dark-card border border-border rounded-full px-4 py-2">52 Facilitators · 6 Tabs</span>
          </div>
        </div>
      </section>

      {/* Prototype embed */}
      <section className="pb-8 px-4 md:px-8">
        <div className="max-w-[880px] mx-auto rounded-2xl overflow-hidden border border-border shadow-2xl">
          <AccessPrototype />
        </div>
      </section>

      {/* CTA below prototype */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal">
          <h2 className="font-serif text-display-sm font-light mb-6">
            What would you like to <em className="italic gradient-text">create?</em>
          </h2>
          <p className="text-body text-content-secondary max-w-prose mx-auto mb-10">
            If your organization's awareness has outgrown its infrastructure, I'd like to hear about it. I build platforms like this as long-term contribution — not a project, a partnership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="inline-block px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow"
            >
              Start a Conversation
            </a>
            <a
              href="/work"
              className="inline-block px-10 py-4 bg-transparent text-content-secondary border border-border rounded-full text-body-sm font-medium hover:border-border-hover hover:text-content-primary transition-all"
            >
              See the Work
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}