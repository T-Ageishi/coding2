import type { Meta, StoryObj } from "@storybook/react";
import { useMenu } from "./menu";
import { useRef } from "react";
import { createPortal } from "react-dom";

const meta: Meta = {};

export default meta;
type Story = StoryObj<typeof useMenu>;

export const Default: Story = {
	render: () => {
		const { RenderMenu, setIsOpen } = useMenu();
		const ref = useRef<HTMLButtonElement>(null);

		return (
			<>
				<div>
					<button
						ref={ref}
						style={{
							height: "40px",
							width: "120px",
							backgroundColor: "#eeeeee",
						}}
						onClick={(e) => {
							e.stopPropagation();
							setIsOpen(true);
						}}
					>
						メニューを開く
					</button>
				</div>
				{createPortal(
					<RenderMenu anchorElement={ref.current}>
						<>
							<div>選択肢 1</div>
							<div>選択肢 2</div>
						</>
					</RenderMenu>,
					document.body
				)}
			</>
		);
	},
};
