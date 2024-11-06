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
	//@@todo リファクタリング
	const linePropsCollection: Array<LineProps> = [];
	const chartDataCollection: Array<ChartData> = [];
	if (prefectureUseFlags.filter((v) => v).length > 0) {
		prefectureUseFlags.forEach((isChecked, index) => {
			if (!isChecked) {
				return;
			}
			const prefCode = String(prefectures[index].prefCode);
			const prefName = prefectures[index].prefName;
			const rd = populationCompositionMap[prefCode][Number(chartType)];

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
