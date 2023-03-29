import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import DarkModeSwitch from "@/utils/DarkModeSwitch";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import defaultSEOConfig from "../../next-seo.config";
import Script from "next/script";
import * as gtag from "@/lib/gtag";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider enableSystem={true} attribute="data-theme">
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
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
