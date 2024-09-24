/**
 * 字串在有限寬度下換行的列數
 * @param text 字串
 * @param width 限制寬度
 * @returns 換行共幾列
 */
export const getLineCount = (text: string, width: number | string): number => {
	const sentences = text.split('\\n');
	let lines = 0;
	for (const sentence of sentences) {
		// 創建虛擬容器
		const container = document.createElement('div');
		container.style.width = `${width}px`;
		container.style.visibility = 'hidden';
		container.style.position = 'absolute';
		container.style.whiteSpace = 'normal';
		container.innerText = sentence;
		document.body.appendChild(container);

		// 列高
		const lineHeight = parseInt(window.getComputedStyle(container).lineHeight, 10);
		// 容器高度
		const totalHeight = container.clientHeight;
		lines += Math.ceil(totalHeight / lineHeight);

		// 移除虛擬容器
		document.body.removeChild(container);
	}
	return lines;
};
