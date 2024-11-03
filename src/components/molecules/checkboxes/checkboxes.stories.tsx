import type { StoryObj } from "@storybook/react";
import { useCheckboxes } from "./checkboxes";
import { CSSProperties } from "react";

const meta = {};
export default meta;

type StoryWithHooks = StoryObj<typeof useCheckboxes>;
const CheckboxWithHooks = () => {
	const { Checkboxes } = useCheckboxes({
		propsCollection: [...Array(20)].map((_, i) => {
			return {
				label: `選択肢 ${i + 1}`,
				value: `${i + 1}`,
			};
		}),
	});

	return <>{Checkboxes}</>;
};

export const Default: StoryWithHooks = {
	render: () => {
		const style: CSSProperties = {
			display: "flex",
			alignItems: "center",
			flexWrap: "wrap",
			columnGap: "16px",
			rowGap: "8px",
		};

		return (
			<div style={style}>
				<CheckboxWithHooks />
			</div>
		);
	},
};
