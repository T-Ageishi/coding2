import { FC } from "react";
import * as Recharts from "recharts";
import { PrefCode } from "../../../lib/resas/index.d";

// region コンポーネント
/**
 * Resasのデータを使用したチャート
 */
export const ResasChart: FC<ResasChartProps> = ({
	chartDataCollection,
	linePropsCollection,
}) => {
	return (
		<Recharts.ResponsiveContainer>
			<Recharts.LineChart data={chartDataCollection}>
				<Recharts.CartesianGrid />
				<Recharts.XAxis dataKey={"year"} />
				<Recharts.YAxis />
				<Recharts.Tooltip />
				<Recharts.Legend />
				{linePropsCollection.map((p) => (
					<Recharts.Line key={p.name} {...p} />
				))}
			</Recharts.LineChart>
		</Recharts.ResponsiveContainer>
	);
};
// endregion

// region 型定義
/**
 * props
 */
export type ResasChartProps = {
	linePropsCollection: Array<LineProps>;
	chartDataCollection: Array<ChartData>;
};

/**
 * Line Chartのprops
 */
export type LineProps = {
	dataKey: PrefCode;
	name: string;
};

/**
 * グラフ用のデータ
 */
export type ChartData = {
	year: number;
	[dataKey: number]: number;
};
// endregion
