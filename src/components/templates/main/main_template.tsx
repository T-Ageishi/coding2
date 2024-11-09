import { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import { SideMenu } from "../../atoms/side_menu/side_menu";

/**
 * メインのテンプレート
 */
export const MainTemplate: FC<MainTemplateProps> = ({ sideMenuContent, children }) => {
	return (
		<>
			<SideMenu>{sideMenuContent}</SideMenu>
			<div className={styles["main"]}>{children}</div>
		</>
	);
};

type MainTemplateProps = {
	sideMenuContent: ReactNode;
	children: ReactNode;
};
