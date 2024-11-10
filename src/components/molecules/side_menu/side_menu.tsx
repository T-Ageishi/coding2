import { ComponentPropsWithoutRef, FC, useState } from "react";
import styles from "./side_menu.module.css";
import { Icon } from "../../atoms/icon/icon";
import { FAB } from "../../atoms/fab/fab";

/**
 * サイドメニュー
 */
export const SideMenu: FC<SideMenuProps> = ({ className, children }) => {
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

	return (
		<>
			<aside
				className={[
					styles["container"],
					isSideMenuOpen ? styles["open"] : styles["closed"],
					className ?? "",
				].join(" ")}
			>
				{children}
			</aside>
			<FAB className={styles["fab"]} onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
				<Icon icon={"tune"} />
			</FAB>
		</>
	);
};

// region 型
export type SideMenuProps = ComponentPropsWithoutRef<"aside">;
// endregion
