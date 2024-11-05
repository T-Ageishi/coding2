import { GetStaticProps } from "next";
import { fetchPrefectures } from "../lib/resas";
import { fetchPopulationCompositions } from "../lib/resas";
import {
	MainPage,
	MainPageProps,
	PopulationCompositionMap,
} from "../components/pages/main/main_page";
import { wait } from "../lib/wait";

/**
 * メインページ
 */
export default function Main({
	prefectures,
	populationCompositionMap,
}: MainPageProps) {
	return (
		<MainPage
			prefectures={prefectures}
			populationCompositionMap={populationCompositionMap}
		/>
	);
}

export const getStaticProps = (async () => {
	//都道府県データ
	const prefectures = await fetchPrefectures();

	//人口構成データ
	const pCM: PopulationCompositionMap = {};
	for await (const { prefCode } of prefectures) {
		pCM[prefCode] = await fetchPopulationCompositions(prefCode);

		//1秒あたり5リクエストまでの制限があるため待機
		await wait(200);
	}

	return {
		props: {
			prefectures,
			populationCompositionMap: pCM,
		},
	};
}) satisfies GetStaticProps<MainPageProps>;
