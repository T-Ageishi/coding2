import { ComponentPropsWithRef, FC, useEffect, useRef, useState } from "react";
import styles from "./menu.module.css";

/**
 * Render hooks
 */
export const useMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const RenderMenu: FC<Omit<MenuProps, "isOpen" | "setIsOpen">> = ({
		anchorElement = document.body,
		children,
	}) => {
		return (
			<Menu anchorElement={anchorElement} isOpen={isOpen} setIsOpen={setIsOpen}>
				{children}
			</Menu>
		);
	};

	return { RenderMenu, isOpen, setIsOpen };
};

// region コンポーネント
/**
 * メニュー
 */
const Menu: FC<MenuProps> = ({ anchorElement, isOpen, setIsOpen, children }) => {
	const ref = useRef<HTMLDivElement>(null);

	//表示位置を調整
	useEffect(() => {
		if (!ref.current || !anchorElement) {
			return;
		}
		const offsetY = 4;
		const { bottom, left, width } = anchorElement.getBoundingClientRect();
		const { scrollY, scrollX } = window;
		ref.current.style.top = `${bottom + scrollY + offsetY}px`;
		ref.current.style.left = `${left + scrollX}px`;
		ref.current.style.width = `${width}px`;
	}, [anchorElement]);

	//背景クリックで閉じるようにする
	const onClickDocument = (e: MouseEvent) => {
		if (e.target instanceof Node && ref.current?.contains(e.target)) {
			return;
		}
		setIsOpen(false);
		document.removeEventListener("click", onClickDocument);
	};
	useEffect(() => {
		document.addEventListener("click", onClickDocument);
	}, []);

	return (
		<div ref={ref} className={`${styles["container"]} ${isOpen ? styles["open"] : ""}`}>
			{children}
		</div>
	);
};
// endregion

// region 型定義
/**
 * props
 * メニュー
 */
export type MenuProps = ComponentPropsWithRef<"div"> & {
	anchorElement: HTMLElement; //表示位置の調整に使用する要素
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};
// endregion
