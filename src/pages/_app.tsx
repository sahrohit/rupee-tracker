import * as gtag from "@/lib/gtag";
import "@/styles/globals.css";
import DarkModeSwitch from "@/utils/DarkModeSwitch";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import defaultSEOConfig from "../../next-seo.config";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider enableSystem={true} attribute="data-theme">
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
				/>
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#ffffff" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="icons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="icons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="icons/favicon-16x16.png"
				/>
			</Head>
			<DefaultSeo {...defaultSEOConfig} />
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				id="gtag-init"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
				}}
			/>
			<Component {...pageProps} />
			<div className="fixed bottom-4 right-4">
				<DarkModeSwitch />
			</div>
			<Toaster />
		</ThemeProvider>
	);
}

export { reportWebVitals } from "next-axiom";
