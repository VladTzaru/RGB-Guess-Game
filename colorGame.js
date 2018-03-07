// DOM POINTERS
const cards 	     = document.querySelectorAll(".card");
const colorDisplay   = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("messageDisplay");

// GLOBAL VARIABLES
const colors = [
	"rgb(255, 0, 0)",
	"rgb(255, 255, 0)",
	"rgb(0, 255, 0)",
	"rgb(0, 255, 255)",
	"rgb(0, 0, 255)",
	"rgb(255, 0, 255)"
];


// VIEW
const pickedColor = colors[3];

colorDisplay.textContent = pickedColor;


for (let i = 0; i < cards.length; i++) {
	// Apply colors
	cards[i].style.backgroundColor = colors[i];

	cards[i].addEventListener("click", function () {
		const clickedColor = this.style.backgroundColor;

		// Compare clickedColor to pickedColor
		if (clickedColor === pickedColor) {
			changeColors(pickedColor);
			unhideCards();
			messageDisplay.textContent = "Correct! :)";
		} else {
			messageDisplay.textContent = "Wrong. :(";
			this.classList.add("hide");
		}
	});
}


// CONTROLLER
function changeColors(color) {
	cards.forEach(function(card) {
		card.style.backgroundColor = color;
	});
}

function unhideCards() {
	cards.forEach(function(card) {
		card.style.opacity = 1;
	});
}




