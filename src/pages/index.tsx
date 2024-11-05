import { GetStaticProps } from "next";
import { fetchPrefectures } from "../lib/fetch_prefectures";
import { fetchPopulationCompositions } from "../lib/fetch_population_composition";
import {
	MainPage,
	MainPageProps,
	PopulationCompositionMap,
} from "../components/pages/main/main_page";

/**
 * メインページ
 */
export default function Main({ prefectures, populationCompositionMap }) {
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
	const populationCompositionMap: PopulationCompositionMap = {};
	for await (const { prefCode } of prefectures) {
		populationCompositionMap[prefCode] =
			await fetchPopulationCompositions(prefCode);

		//1秒あたり5リクエストまでの制限があるため待機
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(1);
			}, 200);
		});
	}

	return {
		props: {
			prefectures,
			populationCompositionMap,
		},
	};
}) satisfies GetStaticProps<MainPageProps>;
