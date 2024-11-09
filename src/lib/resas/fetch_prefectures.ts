import { Prefecture } from "./index.d";

/**
 * 都道府県データを取得する
 */
export async function fetchPrefectures(): Promise<Array<Prefecture>> {
	const response = await fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
		method: "GET",
		headers: [["X-API-KEY", process.env.RESAS_KEY ?? ""]],
	});

	const json = await response.json();

	return json.result;
}
