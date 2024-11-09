import { ComponentPropsWithoutRef, FC } from "react";
import styles from "./side_menu.module.css";

/**
 * サイドメニュー
 */
export const SideMenu: FC<SideMenuProps> = ({ isOpen = true, className, children }) => {
	return (
		<aside
			className={`${styles["container"]} ${isOpen ? styles["open"] : styles["closed"]} ${className}`}
		>
			{children}
		</aside>
	);
};

// region 型
export type SideMenuProps = ComponentPropsWithoutRef<"aside"> & {
	isOpen: boolean;
};
// endregion
