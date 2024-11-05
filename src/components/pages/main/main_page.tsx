import { PrefCode, Prefecture } from "../../../lib/resas/fetch_prefectures";
import { PopulationComposition } from "../../../lib/resas/fetch_population_composition";
import { MainTemplate } from "../../templates/main/main_template";
import { FC } from "react";
import { useDropdown } from "../../molecules/dropdown/dropdown";
import { useCheckboxes } from "../../molecules/checkboxes/checkboxes";
import {
	ChartData,
	LineProps,
	ResasChart,
} from "../../molecules/resas_chart/resas_chart";
import { getChartOptions } from "../../../lib/resas";

/**
 * メインページ
 * @@todo 実装
 */
export const MainPage: FC<MainPageProps> = ({
	prefectures,
	populationCompositionMap,
}) => {
	const { RenderDropdown, value } = useDropdown();
	const { RenderCheckboxes, checkList } = useCheckboxes(prefectures.length);

	const linePropsCollection: Array<LineProps> = [];
	const chartDataCollection: Array<ChartData> = [];
	if (value !== undefined && checkList.filter((v) => v).length > 0) {
		checkList.forEach((isChecked, index) => {
			if (!isChecked) {
				return;
			}
			const prefCode = String(prefectures[index].prefCode);
			const prefName = prefectures[index].prefName;
			const rd = populationCompositionMap[prefCode][Number(value) - 1];

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
			<div style={{ width: "100%" }}>
				<RenderDropdown
					value={value}
					optionPropsCollection={getChartOptions()}
				/>
			</div>

			<div
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					gap: "8px 16px",
					flexWrap: "wrap",
				}}
			>
				<RenderCheckboxes
					propsCollection={prefectures.map((p) => ({
						label: p.prefName,
						value: String(p.prefCode),
					}))}
				/>
			</div>

			<div
				style={{
					width: "100%",
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
};

/**
 * props
 */
export type MainPageProps = {
	prefectures: Array<Prefecture>;
	populationCompositionMap: PopulationCompositionMap;
};

/**
 * 都道府県ごとの人口構成データマップ
 */
export type PopulationCompositionMap = {
	[prefCode: PrefCode]: Array<PopulationComposition>;
};
