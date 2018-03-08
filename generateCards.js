// DOM POINTERS
TZARU_CG.board = document.getElementById("board");



// VIEW
TZARU_CG.generateCards = function (num) {
	const fragment = document.createDocumentFragment();
	for (let i = 1; i <= num; i++) {
		let div = document.createElement("div");
		div.classList.add("card");
		fragment.appendChild(div);
	}
	this.board.appendChild(fragment);
};


TZARU_CG.generateCards(6);