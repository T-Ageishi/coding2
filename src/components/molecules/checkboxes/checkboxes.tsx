import { ComponentPropsWithoutRef, useState, FC } from "react";
import Label from "../../atoms/label/label";
import styles from "./checkboxes.module.css";

/**
 * Render hooks
 */
export const useCheckboxes = (numberOfCheckboxes: number) => {
	const [checkList, setCheckList] = useState<CheckList>([...Array(numberOfCheckboxes)].fill(false));

	//@@todo リファクタリング
	const RenderCheckboxes: FC<CheckboxesProps> = ({ propsCollection, groups }) => {
		const checkboxCollection = {};
		propsCollection.forEach((props, index) => {
			if (!checkboxCollection[props.groupKey]) {
				checkboxCollection[props.groupKey] = [];
			}
			checkboxCollection[props.groupKey].push(
				<Label key={props.value} label={props.label}>
					<Checkbox
						label={props.label}
						value={props.value}
						checked={checkList[index] ?? false}
						onChange={(e) => {
							const newCheckList = [...checkList];
							newCheckList[index] = e.currentTarget.checked;
							setCheckList(newCheckList);
						}}
					/>
				</Label>
			);
		});

		return (
			<>
				{Object.keys(checkboxCollection).map((groupKey) => (
					<div key={groupKey}>
						<p className={styles["groupLabel"]}>{groups[groupKey]}</p>
						<div className={styles["checkboxes"]}>{checkboxCollection[groupKey]}</div>
					</div>
				))}
			</>
		);
	};

	return { RenderCheckboxes, checkList };
};

// region コンポーネント
/**
 * コンポーネント
 * チェックボックス 単一
 */
const Checkbox: FC<CheckboxProps> = (props) => {
	return <input type="checkbox" className={styles["input"]} {...props} />;
};

// endregion

// region 型定義
/**
 * props
 * チェックボックス 複数
 */
export type CheckboxesProps = {
	propsCollection: Array<CheckboxProps & { groupKey: string }>;
	groups: {
		[groupKey: string]: string;
	};
};

/**
 * props
 * チェックボックス 単一
 */
export type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
	label: string;
	value: string;
};

/**
 * チェック状況
 */
export type CheckList = Array<boolean>;
// endregion
