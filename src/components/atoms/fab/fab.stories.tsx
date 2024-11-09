import type { Meta, StoryObj } from "@storybook/react";
import { FAB } from "./fab";
import { Icon } from "../icon/icon";

const meta: Meta = {
	component: FAB,
};
export default meta;

type Story = StoryObj<typeof FAB>;
export const Default: Story = {
	args: {
		children: <Icon icon={"tune"} />,
	},
};
