export function clickOutside(node: HTMLElement, onClickOutside: () => void) {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as Node)) {
			onClickOutside();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
