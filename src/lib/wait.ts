/**
 * 一定時間後に解決するプロミスを返す
 */
export async function wait(timeout: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}
