import { PrefCode, Prefecture, PopulationComposition } from "../../../lib/resas/index.d";
import { MainTemplate } from "../../templates/main/main_template";
import { FC, useState } from "react";
import { useDropdown } from "../../molecules/dropdown/dropdown";
import { PopulationCompositionChart } from "../../molecules/population_composition_chart/population_composition_chart";
import { CHART_TYPE_ALL, getChartOptions } from "../../../lib/resas";
import styles from "./main_page.module.css";
import { FAB } from "../../atoms/fab/fab";
import { Icon } from "../../atoms/icon/icon";
import { SideMenu } from "../../atoms/side_menu/side_menu";
import { usePrefectureCheckboxes } from "../../organisms/prefecture_checkboxes/prefecture_checkboxes";

/**
 * メインページ
 */
export const MainPage: FC<MainPageProps> = ({ prefectures, populationCompositionMap }) => {
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	const { RenderDropdown, value: chartType } = useDropdown(CHART_TYPE_ALL);
	const { RenderPrefectureCheckboxes, prefectureUseFlags } = usePrefectureCheckboxes(prefectures);

	return (
		<MainTemplate>
			<SideMenu className={`${styles["sideMenu"]}`} isOpen={isSideMenuOpen}>
				<div className={styles["sideMenuContentWrapper"]}>
					<div className={styles["dropdownWrapper"]}>
						<RenderDropdown value={chartType} optionPropsCollection={getChartOptions()} />
					</div>
					<div className={styles["checkboxesWrapper"]}>
						<RenderPrefectureCheckboxes />
					</div>
				</div>
			</SideMenu>
			<div className={styles["chartWrapper"]}>
				<PopulationCompositionChart
					chartType={chartType}
					prefectureUseFlags={prefectureUseFlags}
					prefectures={prefectures}
					populationCompositionMap={populationCompositionMap}
				/>
			</div>
			<FAB className={styles["fab"]} onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
				<Icon icon={"tune"} />
			</FAB>
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
