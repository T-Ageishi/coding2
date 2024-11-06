import { OptionProps } from "../../components/molecules/dropdown/dropdown";
import {
	CHART_TYPE_ALL,
	CHART_TYPE_ELDERLY,
	CHART_TYPE_WORKING_AGE,
	CHART_TYPE_YOUNG,
} from "./const";

/**
 * グラフの選択肢
 */
export const getChartOptions: () => Array<OptionProps> = () => {
	return [
		{ label: "総人口", value: CHART_TYPE_ALL },
		{ label: "年少人口", value: CHART_TYPE_YOUNG },
		{ label: "生産年齢人口", value: CHART_TYPE_WORKING_AGE },
		{ label: "老年人口", value: CHART_TYPE_ELDERLY },
	];
};
