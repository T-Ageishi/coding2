import { MainTemplate } from "../components/templates/main/main_template";
import {
	OptionProps,
	useDropdown,
} from "../components/molecules/dropdown/dropdown";
import { GetStaticProps } from "next";
import { useCheckboxes } from "../components/molecules/checkboxes/checkboxes";
import { fetchPrefectures } from "../lib/fetch_prefectures";

/**
 * メインページ
 */
export default function MainPage({
	chartOptionPropsCollection,
	prefCheckboxesPropsCollection,
}) {
	const { RenderDropdown, value } = useDropdown();
	const { RenderCheckboxes } = useCheckboxes(
		prefCheckboxesPropsCollection.length
	);

	return (
		<MainTemplate>
			<div>
				<RenderDropdown
					value={value}
					optionPropsCollection={chartOptionPropsCollection}
				/>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "8px 16px",
					flexWrap: "wrap",
				}}
			>
				<RenderCheckboxes propsCollection={prefCheckboxesPropsCollection} />
			</div>

			<div>グラフ</div>
		</MainTemplate>
	);
}

export const getStaticProps = (async () => {
	//プルダウンの選択肢
	const chartOptionPropsCollection = [
		{ label: "総人口", value: "1" },
		{ label: "年少人口", value: "2" },
		{ label: "生産年齢人口", value: "3" },
		{ label: "老年人口", value: "4" },
	];

	//チェックボックスの選択肢
	const prefectures = await fetchPrefectures();
	const prefCheckboxesPropsCollection = prefectures.map((p) => {
		return {
			label: p.prefName,
			value: p.prefCode,
		};
	});

	return {
		props: {
			chartOptionPropsCollection,
			prefCheckboxesPropsCollection,
		},
	};
}) satisfies GetStaticProps<{
	chartOptionPropsCollection: Array<OptionProps>;
}>;
