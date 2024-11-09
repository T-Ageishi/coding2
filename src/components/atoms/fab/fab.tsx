import { ComponentPropsWithoutRef, FC } from "react";
import styles from "./fab.module.css";

/**
 * Floating Action Button
 */
export const FAB: FC<FABProps> = ({ onClick, children }) => {
	return (
		<button className={styles["container"]} onClick={onClick}>
			{children}
		</button>
	);
};

// region 型
/**
 * props
 */
export type FABProps = ComponentPropsWithoutRef<"button">;
// endregion
