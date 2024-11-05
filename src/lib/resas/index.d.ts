/**
 * 都道府県コード
 * @@todo 型定義を調整する
 */
export type PrefCode = number | string;

/**
 * 都道府県データ
 */
export type Prefecture = {
	prefCode: PrefCode;
	prefName: string;
};

/**
 * 各年のデータ
 */
type AnnualData = {
	year: number;
	value: number;
};

/**
 * 人口構成データ1種類
 */
export type PopulationComposition = {
	label: string;
	data: Array<AnnualData>;
};