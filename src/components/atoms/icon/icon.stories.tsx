import { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./icon";

const meta: Meta = {
	component: Icon,
};
export default meta;

type Story = StoryObj<typeof Icon>;
export const Default: Story = {
	args: {
		icon: "tune",
	},
};
