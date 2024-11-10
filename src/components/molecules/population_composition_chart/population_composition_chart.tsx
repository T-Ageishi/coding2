import { FC } from "react";
import * as Recharts from "recharts";
import { PrefCode, Prefecture } from "../../../lib/resas/index.d";
import { PopulationCompositionMap } from "../../pages/main/main_page";
import { CheckList } from "../checkboxes/checkboxes";
import { getChartOptions } from "../../../lib/resas/get_chart_options";
import styles from "./population_composition_chart.module.css";

// region コンポーネント
/**
 * 人口構成グラフ
 */
export const PopulationCompositionChart: FC<PopulationCompositionChartProps> = ({
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
		<PopulationCompositionChartPresentation
			chartTitle={getChartTitle({ chartType })}
			linePropsCollection={linePropsCollection}
			chartDataCollection={chartDataCollection}
		/>
	);
};

/**
 * 人口構成グラフ（見た目）
 */
export const PopulationCompositionChartPresentation: FC<
	PopulationCompositionChartPresentationProps
> = ({ chartTitle, chartDataCollection, linePropsCollection }) => {
	return (
		<>
			{chartDataCollection.length === 0 ? (
				<p>都道府県を選択するとグラフを表示できます。</p>
			) : (
				<div className={styles["chartWrapper"]}>
					<h2>{chartTitle}</h2>
					<Recharts.ResponsiveContainer>
						<Recharts.LineChart data={chartDataCollection} margin={{ left: 16 }}>
							<Recharts.CartesianGrid />
							<Recharts.XAxis
								dataKey={"year"}
								tick={{ fill: "var(--md-sys-color-on-surface-variant)" }}
							/>
							<Recharts.YAxis tick={{ fill: "var(--md-sys-color-on-surface-variant)" }} />
							<Recharts.Tooltip
								contentStyle={{ backgroundColor: "var(--md-sys-color-surface-container-high)" }}
							/>
							<Recharts.Legend />
							{linePropsCollection.map((p) => (
								<Recharts.Line
									key={p.name}
									stroke={lineColors[p.dataKey % lineColors.length]}
									{...p}
								/>
							))}
						</Recharts.LineChart>
					</Recharts.ResponsiveContainer>
				</div>
			)}
		</>
	);
};
// endregion

// region 関数・定数
/**
 * 線の色
 */
const lineColors = ["#FF4B00", "#005AFF", "#03AF7A", "#4DC4FF", "#F6AA00", "#FFF100"];

/**
 * グラフタイトルを取得
 */
function getChartTitle({ chartType }: Pick<PopulationCompositionChartProps, "chartType">) {
	const chartOption = getChartOptions();
	return chartOption[Number(chartType)]["label"];
}

// endregion

// region 型定義
/**
 * props
 */
type PopulationCompositionChartProps = {
	chartType: string;
	prefectureUseFlags: CheckList;
	prefectures: Array<Prefecture>;
	populationCompositionMap: PopulationCompositionMap;
};

/**
 * props
 */
type PopulationCompositionChartPresentationProps = {
	chartTitle: string;
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
