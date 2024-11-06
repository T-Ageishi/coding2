import { OptionProps } from "../../components/molecules/dropdown/dropdown";

/**
 * グラフの選択肢
 */
export const getChartOptions: () => Array<OptionProps> = () => {
	return [
		{ label: "総人口", value: "0" },
		{ label: "年少人口", value: "1" },
		{ label: "生産年齢人口", value: "2" },
		{ label: "老年人口", value: "3" },
	];
};
