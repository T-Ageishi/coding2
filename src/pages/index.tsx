import { MainTemplate } from "../components/templates/main/main_template";
import {
	OptionProps,
	useDropdown,
} from "../components/molecules/dropdown/dropdown";
import { GetStaticProps } from "next";
import { useCheckboxes } from "../components/molecules/checkboxes/checkboxes";
import { fetchPrefectures } from "../lib/fetch_prefectures";
import { fetchPopulationComposition } from "../lib/fetch_population_composition";
import {
	ChartData,
	LineProps,
	ResasChart,
} from "../components/molecules/resas_chart/resas_chart";

// @@todo リファクタリング

/**
 * メインページ
 */
export default function MainPage({
	chartOptionPropsCollection,
	prefData,
	populationComposition,
}) {
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
					optionPropsCollection={chartOptionPropsCollection}
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
	//プルダウンの選択肢
	const chartOptionPropsCollection = [
		{ label: "総人口", value: "1" },
		{ label: "年少人口", value: "2" },
		{ label: "生産年齢人口", value: "3" },
		{ label: "老年人口", value: "4" },
	];

	//チェックボックスの選択肢
	const prefectures = await fetchPrefectures();
	const prefData = prefectures.map((p) => {
		return {
			label: p.prefName,
			value: p.prefCode,
		};
	});

	//グラフ用の全データ
	const populationComposition = [];
	for await (const { prefCode } of prefectures) {
		const chartData = await fetchPopulationComposition(prefCode);
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(1);
			}, 200);
		});
		populationComposition[prefCode] = chartData;
	}

	return {
		props: {
			chartOptionPropsCollection,
			prefData,
			populationComposition,
		},
	};
}) satisfies GetStaticProps<{
	chartOptionPropsCollection: Array<OptionProps>;
}>;
