import { FC, ReactNode } from "react";
import styles from "./styles.module.css";

/**
 * メインのテンプレート
 */
export const MainTemplate: FC<MainTemplateProps> = ({ children }) => {
	return <div className={styles["main"]}>{children}</div>;
};

type MainTemplateProps = {
	children: ReactNode;
};
