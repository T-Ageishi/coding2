import { useCheckboxes, CheckboxProps } from "../../molecules/checkboxes/checkboxes";
import { Prefecture, PrefCode } from "./../../../lib/resas/index.d";
import { FC } from "react";

/**
 * 都道府県チェックボックス
 */
export const usePrefectureCheckboxes = (prefectures) => {
	const { RenderCheckboxes, RenderGroup, checkList } = useCheckboxes(prefectures.length);

	/**
	 * チェックボックス
	 */
	const RenderPrefectureCheckboxes: FC = () => {
		let offset = 0;

		return (
			<>
				{makeCheckboxesPropsGroup(prefectures).map((propsCollection, index) => {
					const curOffset = offset;
					offset += propsCollection.length;
					return (
						<RenderGroup key={checkBoxGroupLabels[index]} label={checkBoxGroupLabels[index]}>
							<RenderCheckboxes propsCollection={propsCollection} offset={curOffset} />
						</RenderGroup>
					);
				})}
			</>
		);
	};

	return { RenderPrefectureCheckboxes, prefectureUseFlags: checkList };
};

/**
 * チェックボックスのpropsを作る
 */
function makeCheckboxesPropsGroup(prefectures: Array<Prefecture>): Array<Array<CheckboxProps>> {
	const result: Array<Array<CheckboxProps>> = [];
	prefectures.forEach((p) => {
		const groupKey = getCheckboxGroupingSettings(p.prefCode);
		if (!result[groupKey]) {
			result[groupKey] = [];
		}
		result[groupKey].push({
			label: p.prefName,
			value: String(p.prefCode),
		});
	});
	return result;
}

/**
 * チェックボックスをまとめるキー
 */
function getCheckboxGroupingSettings(prefCode: PrefCode) {
	if (1 <= prefCode && prefCode <= 7) {
		//北海道・東北
		return 0;
	}
	if (8 <= prefCode && prefCode <= 14) {
		//関東
		return 1;
	}
	if (15 <= prefCode && prefCode <= 20) {
		//北陸・甲信越
		return 2;
	}
	if (21 <= prefCode && prefCode <= 24) {
		//東海
		return 3;
	}
	if (25 <= prefCode && prefCode <= 30) {
		//関西
		return 4;
	}
	if (31 <= prefCode && prefCode <= 35) {
		//中国
		return 5;
	}
	if (36 <= prefCode && prefCode <= 39) {
		//四国
		return 6;
	}
	if (40 <= prefCode && prefCode <= 47) {
		//九州・沖縄
		return 7;
	}
}

/**
 * チェックボックスのグループのラベル
 */
const checkBoxGroupLabels = [
	"北海道・東北",
	"関東",
	"北陸・甲信越",
	"東海",
	"関西",
	"中国",
	"四国",
	"九州・沖縄",
];
