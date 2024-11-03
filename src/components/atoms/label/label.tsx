import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import styles from "./style.module.css";

/**
 * コンポーネント
 * label
 */
export default function Label({ label, children }: LabelProps) {
	return (
		<label className={styles["container"]}>
			{label}
			{children ?? null}
		</label>
	);
}

/**
 * props型定義
 */
export type LabelProps = PropsWithChildren<
	ComponentPropsWithoutRef<"label">
> & {
	label: string;
};
