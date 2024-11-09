import { PopulationComposition } from "./index.d";

/**
 * 人口構成データを取得する
 */
export async function fetchPopulationCompositions(
	prefCode: string | number
): Promise<Array<PopulationComposition>> {
	try {
		const response = await fetch(
			`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
			{
				method: "GET",
				headers: [["X-API-KEY", process.env.RESAS_KEY ?? ""]],
			}
		);

		const json = await response.json();

		return json.result.data;
	} catch (e) {
		console.error(e);
	}
}
