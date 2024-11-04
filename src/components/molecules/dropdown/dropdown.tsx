import {
	ComponentPropsWithoutRef,
	Dispatch,
	FC,
	MouseEventHandler,
	SetStateAction,
	useRef,
	useState,
} from "react";
import { useMenu } from "../../atoms/menu/menu";
import { createPortal } from "react-dom";
import styles from "./dropdown.module.css";

export const useDropdown = () => {
	const [value, setValue] = useState<string | undefined>(undefined);

	const RenderDropdown: FC<Omit<DropdownProps, "setValue">> = (props) => {
		return <Dropdown {...props} value={value} setValue={setValue} />;
	};

	return { RenderDropdown, value };
};

//region コンポーネント
const Dropdown: FC<DropdownProps> = ({
	value = undefined,
	setValue,
	optionPropsCollection,
}) => {
	const ref = useRef<HTMLDivElement>();
	const { RenderMenu, isOpen, setIsOpen } = useMenu();

	const onClickDropdown: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		setIsOpen(true);
	};
	const onClickOption: MouseEventHandler<HTMLDivElement> = (e) => {
		setValue(e.currentTarget.dataset.value);
	};

	return (
		<>
			<div
				ref={ref}
				onClick={onClickDropdown}
				className={`${styles["container"]} ${isOpen ? styles["open"] : ""}`}
			>
				<div className={styles["labelWrapper"]}>
					<span className={styles["label"]}>
						{optionPropsCollection.find((p) => p.value === value)?.label ??
							"選択してください"}
					</span>
				</div>
				<div className={styles["iconWrapper"]}>
					<div className={`${styles["icon"]}`}>▼</div>
				</div>
			</div>

			{
				//選択肢部分（document is not definedエラー回避）
				typeof window !== "undefined"
					? createPortal(
							<RenderMenu anchorElement={ref.current}>
								{optionPropsCollection.map((p) => (
									<Option
										key={p.value}
										{...p}
										onClick={onClickOption}
										className={value === p.value ? styles["active"] : ""}
									/>
								))}
							</RenderMenu>,
							document.body
						)
					: null
			}
		</>
	);
};

/**
 * 選択肢
 */
const Option: FC<OptionProps> = ({ label, value, className, onClick }) => {
	return (
		<div
			className={`${styles["optionContainer"]} ${className}`}
			data-value={value}
			onClick={onClick}
		>
			<div className={styles["optionLabelWrapper"]}>
				<span className={styles["optionLabel"]}>{label}</span>
			</div>
		</div>
	);
};
//endregion

//region 型定義
/**
 * props
 * ドロップダウン
 */
export type DropdownProps = ComponentPropsWithoutRef<"div"> & {
	value: string | undefined;
	setValue: Dispatch<SetStateAction<string>>;
	optionPropsCollection: Array<OptionProps>;
};

/**
 * props
 * 選択肢
 */
export type OptionProps = ComponentPropsWithoutRef<"div"> & {
	label: string;
	value: string;
};
//endregion
