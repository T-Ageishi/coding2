import { ComponentPropsWithoutRef, useState, ChangeEvent } from "react";
import Label from "../../atoms/label/label";
import styles from "./styles.module.css";

/**
 * Render hooks
 */
export default function useCheckboxes({ propsCollection }: CheckboxesProps) {
	const [checkList, setCheckList] = useState<CheckList>(
		makeInitialState({ propsCollection })
	);

	const checkboxes = (
		<Checkboxes
			propsCollection={propsCollection.map((checkboxProps) => {
				return {
					...checkboxProps,
					onChange: (event: ChangeEvent<HTMLInputElement>) => {
						checkboxProps.onChange?.(event);
						//チェック状況を更新
						setCheckList({
							...checkList,
							[event.currentTarget.value]: event.target.checked,
						});
					},
				};
			})}
		/>
	);

	return { Checkboxes: checkboxes, checkList };
}

// region コンポーネント
/**
 * コンポーネント
 * チェックボックス 複数
 */
function Checkboxes({ propsCollection }: CheckboxesProps) {
	return (
		<>
			{propsCollection.map((props) => (
				<Label key={props.value} label={props.label}>
					<Checkbox {...props} />
				</Label>
			))}
		</>
	);
}

/**
 * コンポーネント
 * チェックボックス 単一
 */
function Checkbox(props: CheckboxProps) {
	return <input type="checkbox" className={styles["input"]} {...props} />;
}

// endregion

// region 関数
function makeInitialState({ propsCollection }: CheckboxesProps) {
	const result: CheckList = {};
	propsCollection.forEach((props) => {
		result[props.value] = props.checked ?? false;
	});
	return result;
}

// endregion

// region 型定義
/**
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
export type CheckList = {
	[key: string]: boolean;
};
// endregion
