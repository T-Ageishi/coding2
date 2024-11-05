import { FC } from "react";
import * as Recharts from "recharts";

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
 * グラフの種類
 * 1: 総人口
 * 2: 年少人口
 * 3: 生産年齢人口
 * 4: 老年人口
 */
export type ChartType = "1" | "2" | "3" | "4";

/**
 * 都道府県コード
 * @@todo 型を作る
 * https://zenn.dev/pokotyan/articles/fd47f277ed80c0
 */
// const codes = [...Array(47)].map((_, i) => String(i + 1));
export type PrefCode = string;

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
