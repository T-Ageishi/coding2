import { PrefCode, Prefecture, PopulationComposition } from "../../../lib/resas/index.d";
import { MainTemplate } from "../../templates/main/main_template";
import { FC } from "react";
import { useDropdown } from "../../molecules/dropdown/dropdown";
import { CheckboxProps, useCheckboxes } from "../../molecules/checkboxes/checkboxes";
import { ChartData, LineProps, ResasChart } from "../../molecules/resas_chart/resas_chart";
import { getChartOptions } from "../../../lib/resas";
import styles from "./main_page.module.css";

/**
 * メインページ
 */
export const MainPage: FC<MainPageProps> = ({ prefectures, populationCompositionMap }) => {
	const { RenderDropdown, value } = useDropdown();
	const { RenderCheckboxes, checkList } = useCheckboxes(prefectures.length);

	//@@todo 処理を切り出す
	const linePropsCollection: Array<LineProps> = [];
	const chartDataCollection: Array<ChartData> = [];
	if (value !== undefined && checkList.filter((v) => v).length > 0) {
		checkList.forEach((isChecked, index) => {
			if (!isChecked) {
				return;
			}
			const prefCode = String(prefectures[index].prefCode);
			const prefName = prefectures[index].prefName;
			const rd = populationCompositionMap[prefCode][Number(value)];

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
			<div className={styles["dropdownWrapper"]}>
				<RenderDropdown value={value} optionPropsCollection={getChartOptions()} />
			</div>

			<div className={styles["checkboxesWrapper"]}>
				<RenderCheckboxes propsCollection={makeCheckboxesProps(prefectures)} />
			</div>

			<div className={styles["chartWrapper"]}>
				<ResasChart
					linePropsCollection={linePropsCollection}
					chartDataCollection={chartDataCollection}
				/>
			</div>
		</MainTemplate>
	);
};

/**
 * チェックボックスのpropsを作る
 */
function makeCheckboxesProps(prefectures: Array<Prefecture>): Array<CheckboxProps> {
	return prefectures.map((p) => ({
		label: p.prefName,
		value: String(p.prefCode),
	}));
}

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
