import { MainTemplate } from "../components/templates/main/main_template";
import { useDropdown } from "../components/molecules/dropdown/dropdown";
import { GetStaticProps } from "next";
import { useCheckboxes } from "../components/molecules/checkboxes/checkboxes";
import { fetchPrefectures } from "../lib/fetch_prefectures";
import { fetchPopulationCompositions } from "../lib/fetch_population_composition";
import {
	ChartData,
	LineProps,
	ResasChart,
} from "../components/molecules/resas_chart/resas_chart";
import { getChartOptions } from "../lib/get_chart_options";
import {
	MainPageProps,
	PopulationCompositionMap,
} from "../components/pages/main/main_page";

/**
 * メインページ
 * @@todo リファクタリング
 */
export default function MainPage({ prefData, populationComposition }) {
	const { RenderDropdown, value } = useDropdown();
	const { RenderCheckboxes, checkList } = useCheckboxes(prefData.length);

	const linePropsCollection: Array<LineProps> = [];
	const chartDataCollection: Array<ChartData> = [];
	if (value !== undefined && checkList.filter((v) => v).length > 0) {
		checkList.forEach((isChecked, index) => {
			if (!isChecked) {
				return;
			}
			const prefCode = String(prefData[index].value);
			const prefName = prefData[index].label;
			const rd = populationComposition[prefCode][Number(value) - 1];

			linePropsCollection.push({ dataKey: prefCode, name: prefName });
			rd.data.forEach((d) => {
				const { year, value } = d;

				let ok = false;
				chartDataCollection.forEach((chartData) => {
					if (chartData.year != year) {
						return;
					}
					ok = true;
					chartData[prefCode] = value;
				});

				if (!ok) {
					chartDataCollection.push({
						year: year,
						[prefCode]: value,
					});
				}
			});
		});
	}

	return (
		<MainTemplate>
			<div>
				<RenderDropdown
					value={value}
					optionPropsCollection={getChartOptions()}
				/>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "8px 16px",
					flexWrap: "wrap",
				}}
			>
				<RenderCheckboxes propsCollection={prefData} />
			</div>

			<div
				style={{
					height: "300px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ResasChart
					linePropsCollection={linePropsCollection}
					chartDataCollection={chartDataCollection}
				/>
			</div>
		</MainTemplate>
	);
}

export const getStaticProps = (async () => {
	//都道府県データ
	const prefectures = await fetchPrefectures();

	//人口構成データ
	const populationCompositionMap: PopulationCompositionMap = new Map();
	for await (const { prefCode } of prefectures) {
		const populationCompositions = await fetchPopulationCompositions(prefCode);
		populationCompositionMap.set(prefCode, populationCompositions);

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
