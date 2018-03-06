// GAME OBJECT
const TZARU_CG = {};

(function() {
	"use strict";

	// DOM POINTERS
	TZARU_CG.board = document.getElementById("board");


	// MODEL
	TZARU_CG.colors = [
		"rgb(255, 0, 0)",
		"rgb(255, 255, 0)",
		"rgb(0, 255, 0)",
		"rgb(0, 255, 255)",
		"rgb(0, 0, 255)",
		"rgb(255, 0, 255)"
	];


	// CONTROLLER
	TZARU_CG.applyColors = function () {
		const cards = document.querySelectorAll(".card");
		for (let i = 0; i < cards.length; i++) {
			cards[i].style.backgroundColor = this.colors[i];
		}
	};

	TZARU_CG.generateCards = function (num) {
		const fragment = document.createDocumentFragment();
		for (let i = 1; i <= num; i++) {
			let div = document.createElement("div");
			div.classList.add("card");
			fragment.appendChild(div);
		}
		this.board.appendChild(fragment);
	};


	// VIEW
	const cards = TZARU_CG.generateCards(6);
	TZARU_CG.applyColors();

})();

