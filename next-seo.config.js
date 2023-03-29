/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Rupee Tracker",
  titleTemplate: "%s | Rupee Tracker",
  defaultTitle: "Rupee Tracker",
  description: "Follow your Rupee in their Track",
  canonical: "https://rupee-tracker.vercel.app/",
  openGraph: {
    url: "https://rupee-tracker.vercel.app/",
    title: "Rupee Tracker",
    description: "Follow your Rupee in their Track",
    images: [
      {
        url: "https://images.unsplash.com/photo-1492584328860-c0c7bb599679?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        alt: "OG Image for Rupee Tracker",
      },
    ],
    site_name: "Rupee Tracker",
  },
  twitter: {
    handle: "@rupee_tracker",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
