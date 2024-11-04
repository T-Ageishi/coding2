import { MainTemplate } from "../components/templates/main/main_template";
import {
	OptionProps,
	useDropdown,
} from "../components/molecules/dropdown/dropdown";
import { GetStaticProps } from "next";

/**
 * メインページ
 */
export default function MainPage({ chartOptionPropsCollection }) {
	const { RenderDropdown, value } = useDropdown();

	return (
		<MainTemplate>
			<div>
				<RenderDropdown
					value={value}
					optionPropsCollection={chartOptionPropsCollection}
				/>
			</div>

			<div>チェックボックス</div>
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

	return {
		props: {
			chartOptionPropsCollection,
		},
	};
}) satisfies GetStaticProps<{
	chartOptionPropsCollection: Array<OptionProps>;
}>;
