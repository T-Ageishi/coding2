import { PrefCode, Prefecture, PopulationComposition } from "../../../lib/resas/index.d";
import { MainTemplate } from "../../templates/main/main_template";
import { FC, useState } from "react";
import { useDropdown } from "../../molecules/dropdown/dropdown";
import { CheckboxProps, useCheckboxes } from "../../molecules/checkboxes/checkboxes";
import { ResasChart } from "../../molecules/resas_chart/resas_chart";
import {
	CHART_TYPE_ALL,
	getChartOptions,
	getCheckboxGroupSetting,
	getCheckboxGroupingSettings,
} from "../../../lib/resas";
import styles from "./main_page.module.css";
import { FAB } from "../../atoms/fab/fab";
import { Icon } from "../../atoms/icon/icon";
import { SideMenu } from "../../atoms/side_menu/side_menu";

/**
 * メインページ
 */
export const MainPage: FC<MainPageProps> = ({ prefectures, populationCompositionMap }) => {
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	const { RenderDropdown, value: chartType } = useDropdown(CHART_TYPE_ALL);
	const {
		RenderCheckboxes,
		RenderGroup,
		checkList: prefectureUseFlags,
	} = useCheckboxes(prefectures.length);

	const checkboxesPropsCollection = makeCheckboxesPropsCollection(prefectures);
	const checkboxesGroupingSetting = getCheckboxGroupSetting();
	let offset = 0;

	return (
		<MainTemplate>
			<SideMenu className={`${styles["sideMenu"]}`} isOpen={isSideMenuOpen}>
				<div className={styles["sideMenuContentWrapper"]}>
					<div className={styles["dropdownWrapper"]}>
						<RenderDropdown value={chartType} optionPropsCollection={getChartOptions()} />
					</div>
					<div className={styles["checkboxesWrapper"]}>
						{checkboxesPropsCollection.map((propsCollection, index) => {
							const groupLabel = checkboxesGroupingSetting[index];
							const curOffset = offset;
							offset += propsCollection.length;
							return (
								<RenderGroup key={groupLabel} label={groupLabel}>
									<RenderCheckboxes propsCollection={propsCollection} offset={curOffset} />
								</RenderGroup>
							);
						})}
					</div>
				</div>
			</SideMenu>
			<div className={styles["chartWrapper"]}>
				{prefectureUseFlags.filter((flag) => flag).length > 0 ? (
					<ResasChart
						chartType={chartType}
						prefectureUseFlags={prefectureUseFlags}
						prefectures={prefectures}
						populationCompositionMap={populationCompositionMap}
					/>
				) : (
					"都道府県を選択するとグラフを表示できます。"
				)}
			</div>
			<FAB className={styles["fab"]} onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
				<Icon icon={"tune"} />
			</FAB>
		</MainTemplate>
	);
};

/**
 * チェックボックスのpropsを作る
 */
function makeCheckboxesPropsCollection(
	prefectures: Array<Prefecture>
): Array<Array<CheckboxProps>> {
	const result: Array<Array<CheckboxProps>> = [];
	prefectures.forEach((p) => {
		const groupKey = getCheckboxGroupingSettings(p.prefCode);
		if (!result[groupKey]) {
			result[groupKey] = [];
		}
		result[groupKey].push({
			label: p.prefName,
			value: String(p.prefCode),
		});
	});
	return result;
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
