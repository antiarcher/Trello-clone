const Label = {
	setCarriage(node){
	if (node.textContent.length > 0){
		const range = document.createRange()
		const sel = window.getSelection()
		range.setStart(node.childNodes[0], node.textContent.length)
		range.collapse(true)
		sel.removeAllRanges()
		sel.addRange(range)
		}
	}
}