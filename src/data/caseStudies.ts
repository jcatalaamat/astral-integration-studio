export type CaseStudyCategory = 'Retreats' | 'Practitioners' | 'Schools' | 'Communities' | 'Organizations' | 'Musicians' | 'Makers';

export interface CaseStudy {
  slug: string;
  type: string;
  category: CaseStudyCategory;
  url: string | null;
  challenge: string;
  gradient: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'gurmukh',
    type: 'Legacy Yoga Teacher — Editorial Landing & Unified Booking',
    category: 'Schools',
    url: 'https://gurmukh.xyz',
    challenge: 'A legendary teacher with 50+ years of practice across 5 continents. Digital infrastructure was a decade-old WordPress site, classes scattered across 3 platforms giving away revenue, 7 different booking sites for 9 events. We built a warm editorial landing with timeline schedule, photo-driven storytelling, and unified inquiry flow replacing all 7 booking platforms.',
    gradient: 'from-rose-900/25 via-rose-900/5 to-transparent',
  },
  {
    slug: 'deva-premal-miten',
    type: 'Sacred Music Artists — Discography, Tours & Community',
    category: 'Musicians',
    url: 'https://devapremalmiten.xyz',
    challenge: 'Touring sacred music artists with a massive following, extensive discography, and a devoted online community — all on disconnected infrastructure. WordPress plus a separate store domain. Tour tickets through third-party platforms taking fees. We built a dark immersive experience with horizontal-scrolling discography, concert-style tour listings, and unified community section.',
    gradient: 'from-orange-900/25 via-orange-900/5 to-transparent',
  },
  {
    slug: 'skylar-acamesis',
    type: 'Medical Intuitive — Premium Healing Practice',
    category: 'Practitioners',
    url: 'https://skylaracamesis.xyz',
    challenge: 'A premium healing practitioner at high price points — running across 7 duct-taped platforms. WordPress, Kajabi, Podia, ThriveCart, Acuity, Mailchimp. We replaced all of it with a single premium platform — offering hierarchy, membership community, and professional directory.',
    gradient: 'from-violet-900/25 via-violet-900/5 to-transparent',
  },
  {
    slug: 'sadhana-works',
    type: 'Yoga Studio + Personal Brand + Movement — Multi-Brand',
    category: 'Schools',
    url: 'https://marianaharpreet.xyz',
    challenge: 'A practitioner running a yoga studio, personal brand, and women\'s movement — all on separate Wix and ClickFunnels sites. Now rebranding one brand while keeping the others alive. We built four interconnected sites across four custom domains with unified design language but distinct visual identities.',
    gradient: 'from-pink-900/25 via-pink-900/5 to-transparent',
  },
  {
    slug: 'sacred-counsel',
    type: 'Retreat Center — Multi-Stream Revenue Platform',
    category: 'Retreats',
    url: 'https://sacredcounsel.space',
    challenge: 'A ceremony center with 20+ years of experience running retreats, integration therapy, private homestays, and a metabolic detox — each with its own intake process, pricing, and client journey. Five distinct revenue streams needing different booking logic, preparation materials, and follow-up sequences. One platform, offering-specific flows underneath.',
    gradient: 'from-amber-900/25 via-amber-900/5 to-transparent',
  },
  {
    slug: 'shivenergetics',
    type: 'Reiki Academy — Student Progression & AI Assistant',
    category: 'Schools',
    url: 'https://shivenergetics.xyz',
    challenge: 'A teaching academy with hundreds of students across multiple certification levels running on five disconnected platforms — Teachable, Calendly, Stripe, WhatsApp, Google Sheets. No single place for student progression. We built prerequisite-gated course delivery, practice hour logging, automatic practitioner directory, and an AI assistant trained on the methodology.',
    gradient: 'from-sky-900/25 via-sky-900/5 to-transparent',
  },
  {
    slug: 'mazunte-today',
    type: 'Community Platform — Bilingual Directory & Events',
    category: 'Communities',
    url: 'https://mazunte.today',
    challenge: 'A coastal town with dozens of practitioners, venues, and events — and no central place to find any of it. Visitors relied on word of mouth, locals posted on scattered WhatsApp groups. We built a bilingual community platform with daily event listings, practitioner directory, classifieds, and weekly digest.',
    gradient: 'from-rose-900/25 via-rose-900/5 to-transparent',
  },
  {
    slug: 'amakura',
    type: 'Regenerative Center — Unified Multi-Offering Platform',
    category: 'Organizations',
    url: 'https://amakura.xyz',
    challenge: 'A regenerative living center running a school, restaurant, natural pool, workshops, and community events — all under one roof but with no unified digital layer. Each offering promoted separately through social media. We brought everything into a single digital home with cross-discovery between all offerings.',
    gradient: 'from-emerald-900/25 via-emerald-900/5 to-transparent',
  },
  {
    slug: 'inner-ascend',
    type: 'Healing Practice — Membership, Curriculum & Facilitator Pipeline',
    category: 'Practitioners',
    url: 'https://inner-ascend.com',
    challenge: 'A trauma-informed healing practice with a loyal following but no way to stay with people between sessions. 97 distinct practices, no structured path for facilitator training. We built progression-based (not sequential) curriculum delivery, a personalized AI healing assistant, and a pipeline from member to certified facilitator.',
    gradient: 'from-lime-900/25 via-lime-900/5 to-transparent',
  },
  {
    slug: 'proyecto-salvaje',
    type: 'Regenerative Land Community — Vision & Lot Availability',
    category: 'Communities',
    url: 'https://proyectosalvaje.com',
    challenge: 'A regenerative land project offering household lots with natural building requirements and community governance. The platform needed to filter before it attracted — presenting requirements clearly so inquiries are self-selected. Land story, values, practical requirements, and transparent lot availability.',
    gradient: 'from-teal-900/25 via-teal-900/5 to-transparent',
  },
  {
    slug: 'el-arte-de-renacer',
    type: 'Breathwork School — Rebrand & Teacher Training',
    category: 'Schools',
    url: 'https://artederenacer.com',
    challenge: 'A practitioner rebranding from a women\'s movement to a broader breathwork school. Large existing community needed to transition without losing momentum. We built the new brand identity and platform with teacher training enrollment, retreat bookings, and community transition. Spanish-first.',
    gradient: 'from-teal-900/25 via-teal-900/5 to-transparent',
  },
  {
    slug: 'mend-a-mano',
    type: 'Textile Artisan — Bespoke Robes & Goods',
    category: 'Makers',
    url: 'https://mendamano.xyz',
    challenge: 'A textile artisan crafting bespoke robes from linen and wool — no digital presence beyond word of mouth. The site needed to feel as intentional as the garments. Linen texture overlay, earthy palette, product showcase, and custom ordering through direct conversation. No e-commerce template.',
    gradient: 'from-amber-900/25 via-amber-900/5 to-transparent',
  },
  {
    slug: 'portal-poem',
    type: 'Writer & Poet — Editorial Home for Long-Form Work',
    category: 'Makers',
    url: 'https://portalpoem.com',
    challenge: 'A writer publishing essays, poems, and long-form work with no editorial home — pieces scattered across Substack, Medium, and Instagram. The site needed to feel like a paper journal, not a blog. Slow typography, generous whitespace, intentional rhythm. Reading first, sharing second.',
    gradient: 'from-stone-900/25 via-stone-900/5 to-transparent',
  },
  {
    slug: 'kura-terra',
    type: 'Plant-Dyed Slow Fashion — Wearable Art',
    category: 'Makers',
    url: 'https://kuraterra.xyz',
    challenge: 'A plant-dyed slow fashion brand creating wearable art from natural pigments. Each piece is unique. The site needed to honor the slowness — earth tones, natural textures, generous whitespace. Collection presented as art, not inventory. Process and story before price.',
    gradient: 'from-emerald-900/25 via-emerald-900/5 to-transparent',
  },
];
