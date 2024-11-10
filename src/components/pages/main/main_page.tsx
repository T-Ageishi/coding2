import { PrefCode, Prefecture, PopulationComposition } from "../../../lib/resas/index.d";
import { MainTemplate } from "../../templates/main/main_template";
import { FC, useState } from "react";
import { useDropdown } from "../../molecules/dropdown/dropdown";
import { CheckboxProps, useCheckboxes } from "../../molecules/checkboxes/checkboxes";
import { ResasChart } from "../../molecules/resas_chart/resas_chart";
import { CHART_TYPE_ALL, getChartOptions } from "../../../lib/resas";
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

	return (
		<MainTemplate>
			<SideMenu className={`${styles["sideMenu"]}`} isOpen={isSideMenuOpen}>
				<div className={styles["sideMenuContentWrapper"]}>
					<div className={styles["dropdownWrapper"]}>
						<RenderDropdown value={chartType} optionPropsCollection={getChartOptions()} />
					</div>
					<div className={styles["checkboxesWrapper"]}>
						{checkboxesPropsCollection.map((propsCollection, index) => (
							<RenderGroup
								key={checkboxesGroupingSetting[index]}
								label={checkboxesGroupingSetting[index]}
							>
								<RenderCheckboxes propsCollection={propsCollection} />
							</RenderGroup>
						))}
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
		const groupKey = getGroupKey(p.prefCode);
		if (!result[groupKey]) {
			result[groupKey] = [];
		}
		result[getGroupKey(p.prefCode)].push({
			label: p.prefName,
			value: String(p.prefCode),
		});
	});
	return result;
}

/**
 * チェックボックスのまとまりの設定
 */
function getCheckboxGroupSetting() {
	return ["北海道・東北", "関東", "北陸・甲信越", "東海", "関西", "中国", "四国", "九州・沖縄"];
}

/**
 * チェックボックスをまとめるキー
 */
function getGroupKey(prefCode: PrefCode) {
	if (1 <= prefCode && prefCode <= 7) {
		//北海道・東北
		return 0;
	}
	if (8 <= prefCode && prefCode <= 14) {
		//関東
		return 1;
	}
	if (15 <= prefCode && prefCode <= 20) {
		//北陸・甲信越
		return 2;
	}
	if (21 <= prefCode && prefCode <= 24) {
		//東海
		return 3;
	}
	if (25 <= prefCode && prefCode <= 30) {
		//関西
		return 4;
	}
	if (31 <= prefCode && prefCode <= 35) {
		//中国
		return 5;
	}
	if (36 <= prefCode && prefCode <= 39) {
		//四国
		return 6;
	}
	if (40 <= prefCode && prefCode <= 47) {
		//九州・沖縄
		return 7;
	}
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
