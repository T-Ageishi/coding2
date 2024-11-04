import { readFile } from "node:fs/promises";

/**
 * 都道府県データを取得する
 */
export async function fetchPrefectures(): Promise<PrefectureResponse> {
	//@@todo 実装

	//開発用
	const data = JSON.parse(
		await readFile("./src/test/mock_data/prefectures.json", "utf8")
	);

	return data.result;
}

export type PrefectureResponse = Array<{
	prefCode: number;
	prefName: string;
}>;
