/**
 * 人口構成データを取得
 */
export async function fetchPopulationComposition(prefCode: string | number) {
	try {
		//@@todo エラーハンドリング
		const data = await fetch(
			`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
			{
				method: "GET",
				headers: [["X-API-KEY", process.env.RESAS_KEY ?? ""]],
			}
		);
		const json = await data.json();
		return json.result.data;
	} catch (e) {
		throw new Error("データ取得中のエラー");
	}
}
