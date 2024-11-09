import type { StoryObj } from "@storybook/react";
import { OptionProps, useDropdown } from "./dropdown";

const meta = {};
export default meta;

type StoryWithHooks = StoryObj<typeof useDropdown>;
const DropdownWithHooks = () => {
	const { RenderDropdown, value } = useDropdown();

	const optionPropsCollection: Array<OptionProps> = [
		{
			label: "総人口",
			value: "1",
		},
		{
			label: "年少人口",
			value: "2",
		},
		{
			label: "生産年齢人口",
			value: "3",
		},
		{
			label: "老年人口",
			value: "4",
		},
	];

	return <RenderDropdown optionPropsCollection={optionPropsCollection} value={value} />;
};

export const Default: StoryWithHooks = {
	render: () => {
		return <DropdownWithHooks />;
	},
};
