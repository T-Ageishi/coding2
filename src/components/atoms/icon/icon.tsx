import { FC } from "react";
import styles from "./icon.module.css";

/**
 * アイコン
 */
export const Icon: FC<IconProps> = ({ icon }) => {
	return <span className={`material-symbols-outlined ${styles["icon"]}`}>{icon}</span>;
};

// region 型
export type IconProps = {
	icon: string;
};
// endregion
