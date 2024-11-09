import { ComponentPropsWithoutRef, useState, FC } from "react";
import Label from "../../atoms/label/label";
import styles from "./checkboxes.module.css";

/**
 * Render hooks
 */
export const useCheckboxes = (numberOfCheckboxes: number) => {
	const [checkList, setCheckList] = useState<CheckList>([...Array(numberOfCheckboxes)].fill(false));

	const RenderCheckboxes: FC<CheckboxesProps> = ({ propsCollection }) => {
		return (
			<>
				{propsCollection.map((props, index) => (
					<Label key={props.value} label={props.label}>
						<Checkbox
							{...props}
							checked={checkList[index] ?? false}
							onChange={(e) => {
								const newCheckList = [...checkList];
								newCheckList[index] = e.currentTarget.checked;
								setCheckList(newCheckList);
							}}
						/>
					</Label>
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
	propsCollection: Array<CheckboxProps>;
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
