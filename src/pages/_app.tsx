import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import DarkModeSwitch from "@/utils/DarkModeSwitch";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider enableSystem={true} attribute="data-theme">
			<Toaster />
			<Component {...pageProps} />
			<div className="fixed bottom-4 right-4">
				<DarkModeSwitch />
			</div>
		</ThemeProvider>
	);
}
