import { FC } from "react";
import * as Recharts from "recharts";
import { PrefCode, Prefecture } from "../../../lib/resas/index.d";
import { PopulationCompositionMap } from "../../pages/main/main_page";
import { CheckList } from "../checkboxes/checkboxes";

// region コンポーネント
/**
 * Resasのデータを使用したチャート
 */
export const ResasChart: FC<ResasChartProps> = ({
	chartType,
	prefectureUseFlags,
	prefectures,
	populationCompositionMap,
}) => {
	const linePropsCollection: Array<LineProps> = [];
	const chartDataCollection: Array<ChartData> = [];
	prefectureUseFlags.forEach((isChecked, index) => {
		if (!isChecked) {
			return;
		}

		//一つ目の都道府県か
		const isFirst = chartDataCollection.length === 0;
		const prefCode = prefectures[index].prefCode;
		const prefName = prefectures[index].prefName;
		const populationComposition = populationCompositionMap[prefCode][Number(chartType)]["data"];

		linePropsCollection.push({ dataKey: prefCode, name: prefName });

		populationComposition.forEach((annualData) => {
			const { year, value } = annualData;

			if (isFirst) {
				chartDataCollection.push({ year, [prefCode]: value });
				return;
			}

			const chartDataIndex = chartDataCollection.findIndex((chartData) => chartData.year === year);
			if (chartDataIndex !== -1) {
				chartDataCollection[chartDataIndex][prefCode] = value;
			}
		});
	});

	return (
		<ResasChartPresentation
			linePropsCollection={linePropsCollection}
			chartDataCollection={chartDataCollection}
		/>
	);
};

/**
 * Resasのデータを使用したチャート
 */
export const ResasChartPresentation: FC<ResasChartPresentationProps> = ({
	chartDataCollection,
	linePropsCollection,
}) => {
	return (
		<Recharts.ResponsiveContainer>
			<Recharts.LineChart data={chartDataCollection}>
				<Recharts.CartesianGrid />
				<Recharts.XAxis dataKey={"year"} />
				<Recharts.YAxis />
				<Recharts.Tooltip />
				<Recharts.Legend />
				{linePropsCollection.map((p) => (
					<Recharts.Line key={p.name} {...p} />
				))}
			</Recharts.LineChart>
		</Recharts.ResponsiveContainer>
	);
};
// endregion

// region 型定義
/**
 * props
 */
type ResasChartProps = {
	chartType: string;
	prefectureUseFlags: CheckList;
	prefectures: Array<Prefecture>;
	populationCompositionMap: PopulationCompositionMap;
};

/**
 * props
 */
type ResasChartPresentationProps = {
	linePropsCollection: Array<LineProps>;
	chartDataCollection: Array<ChartData>;
};

/**
 * Line Chartのprops
 */
export type LineProps = {
	dataKey: PrefCode;
	name: string;
};

/**
 * グラフ用のデータ
 */
export type ChartData = {
	year: number;
	[dataKey: number]: number;
};
// endregion
