import { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import { SideMenu } from "../../molecules/side_menu/side_menu";

/**
 * メインのテンプレート
 */
export const MainTemplate: FC<MainTemplateProps> = ({ sideMenuContent, children }) => {
	return (
		<div className={styles["main"]}>
			<SideMenu className={`${styles["sideMenu"]}`}>{sideMenuContent}</SideMenu>
			{children}
		</div>
	);
};

type MainTemplateProps = {
	sideMenuContent: ReactNode;
	children: ReactNode;
};
