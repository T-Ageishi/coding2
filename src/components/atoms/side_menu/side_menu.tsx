import { ComponentPropsWithoutRef, FC } from "react";
import styles from "./side_menu.module.css";

/**
 * サイドメニュー
 */
export const SideMenu: FC<SideMenuProps> = ({ children }) => {
	return <aside className={styles["container"]}>{children}</aside>;
};

// region 型
export type SideMenuProps = ComponentPropsWithoutRef<"aside">;
// endregion
