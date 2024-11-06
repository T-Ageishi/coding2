import { PrefCode, Prefecture, PopulationComposition } from "../../../lib/resas/index.d";
import { MainTemplate } from "../../templates/main/main_template";
import { FC } from "react";
import { useDropdown } from "../../molecules/dropdown/dropdown";
import { CheckboxProps, useCheckboxes } from "../../molecules/checkboxes/checkboxes";
import { ResasChart } from "../../molecules/resas_chart/resas_chart";
import { CHART_TYPE_ALL, getChartOptions } from "../../../lib/resas";
import styles from "./main_page.module.css";

/**
 * メインページ
 */
export const MainPage: FC<MainPageProps> = ({ prefectures, populationCompositionMap }) => {
	const { RenderDropdown, value: chartType } = useDropdown(CHART_TYPE_ALL);
	const { RenderCheckboxes, checkList: prefectureUseFlags } = useCheckboxes(prefectures.length);

	return (
		<MainTemplate>
			<div className={styles["dropdownWrapper"]}>
				<RenderDropdown value={chartType} optionPropsCollection={getChartOptions()} />
			</div>

			<div className={styles["checkboxesWrapper"]}>
				<RenderCheckboxes propsCollection={makeCheckboxesProps(prefectures)} />
			</div>

			<div className={styles["chartWrapper"]}>
				<ResasChart
					chartType={chartType}
					prefectureUseFlags={prefectureUseFlags}
					prefectures={prefectures}
					populationCompositionMap={populationCompositionMap}
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
