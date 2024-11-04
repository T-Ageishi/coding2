import { FC, ReactNode } from "react";
import styles from "./styles.module.css";

/**
 * メインのテンプレート
 */
export const MainTemplate: FC<MainTemplateProps> = ({ children }) => {
	return <main className={styles["main"]}>{children}</main>;
};

type MainTemplateProps = {
	children: ReactNode;
};
