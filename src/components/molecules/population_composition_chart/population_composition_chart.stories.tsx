import type { Meta, StoryObj } from "@storybook/react";
import { PopulationCompositionChart } from "./population_composition_chart";
import { CHART_TYPE_ALL } from "../../../lib/resas/index";
import { Prefecture } from "../../../lib/resas/index.d";

const meta: Meta<typeof PopulationCompositionChart> = {
	component: PopulationCompositionChart,
};

export default meta;
type Story = StoryObj<typeof PopulationCompositionChart>;

export const Default: Story = {
	decorators: [
		(Story) => {
			return (
				<div
					style={{
						height: `${document.documentElement.offsetWidth / 1.618}px`,
					}}
				>
					<Story />
				</div>
			);
		},
	],
	args: {
		chartType: CHART_TYPE_ALL,
		prefectureUseFlags: makePrefectureUseFlags(),
		prefectures: makePrefectures(),
		populationCompositionMap: makePopulationCompositionMap(),
	},
};

/**
 * グラフ描画用のサンプルデータ
 */
function makePrefectureUseFlags() {
	return [true];
}

function makePopulationCompositionMap() {
	return {
		"1": [
			{
				label: "総人口",
				data: [
					{
						year: 2000,
						value: 1000,
					},
					{
						year: 2001,
						value: 3000,
					},
					{
						year: 2002,
						value: 1500,
					},
				],
			},
		],
	};
}

function makePrefectures(): Array<Prefecture> {
	return [{ prefCode: 1, prefName: "北海道" }];
}
