import "../styles/global.css";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
	return (
		<main className={notoSansJP.className}>
			<Component {...pageProps} />
		</main>
	);
}
