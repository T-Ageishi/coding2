import { FC } from "react";

/**
 * アイコン
 */
export const Icon: FC<IconProps> = ({ icon }) => {
	return <span className={"material-symbols-outlined"}>{icon}</span>;
};

// region 型
export type IconProps = {
	icon: string;
};
// endregion
