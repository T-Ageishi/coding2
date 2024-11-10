import { PrefCode } from "./index.d";

/**
 * チェックボックスをまとめるキー
 */
export function getCheckboxGroupingSettings(prefCode: PrefCode) {
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
 * チェックボックスのまとまりの設定
 */
export function getCheckboxGroupSetting() {
	return ["北海道・東北", "関東", "北陸・甲信越", "東海", "関西", "中国", "四国", "九州・沖縄"];
}
