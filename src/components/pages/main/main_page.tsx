import { PrefCode, Prefecture } from "../../../lib/fetch_prefectures";
import { PopulationComposition } from "../../../lib/fetch_population_composition";
import { MainTemplate } from "../../templates/main/main_template";
import { FC } from "react";

/**
 * メインページ
 * @@todo 実装
 */
export const MainPage: FC<MainPageProps> = ({
	prefectures,
	populationCompositionMap,
}) => {
	return (
		<MainTemplate>
			<div></div>
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
export type PopulationCompositionMap = Map<
	PrefCode,
	Array<PopulationComposition>
>;
