import type { Meta, StoryObj } from "@storybook/react";

import { ResasChart } from "./resas_chart";

const meta: Meta<typeof ResasChart> = {
	component: ResasChart,
};

export default meta;
type Story = StoryObj<typeof ResasChart>;

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
		chartDataCollection: makeChartDataCollection(),
		linePropsCollection: makeLinePropsCollection(),
	},
};

/**
 * グラフ描画用のサンプルデータ
 */
function makeChartDataCollection() {
	return [
		{
			year: 2000,
			1: 4000,
			47: 2400,
		},
		{
			year: 2001,
			1: 3000,
			47: 1398,
		},
		{
			year: 2002,
			1: 2000,
			47: 9800,
		},
	];
}

function makeLinePropsCollection() {
	return [
		{ dataKey: "1", name: "北海道" },
		{ dataKey: "47", name: "沖縄" },
	];
}
