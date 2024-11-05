import { readFile } from "node:fs/promises";

/**
 * 都道府県データを取得する
 */
export async function fetchPrefectures(): Promise<Array<Prefecture>> {
	//@@todo 実装

	//開発用
	const data = JSON.parse(
		await readFile("./src/test/mock_data/prefectures.json", "utf8")
	);

	return data.result;
}

/**
 * 都道府県データ
 * @@todo 定義箇所を調整する
 */
export type Prefecture = {
	prefCode: PrefCode;
	prefName: string;
};

/**
 * 都道府県コード
 * @@todo 型を調整する
 * @@todo 定義箇所を調整する
 */
export type PrefCode = number | string;
