import { Meta, StoryObj } from "@storybook/react";
import { SideMenu } from "./side_menu";

const meta: Meta = {
	component: SideMenu,
};
export default meta;

type Story = StoryObj<typeof SideMenu>;
export const Default: Story = {
	args: {
		children: "",
	},
};
