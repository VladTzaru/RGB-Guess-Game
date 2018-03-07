// DOM POINTERS
const cards 	     = document.querySelectorAll(".card");
const colorDisplay   = document.getElementById("colorDisplay");
const mainTitle      = document.getElementsByClassName("main-title")[0];
const messageDisplay = document.getElementById("messageDisplay");


// GLOBAL VARIABLES
const colors = generateRandomColors(12);


// VIEW
const pickedColor = pickRandomColor();


colorDisplay.textContent = pickedColor;


for (let i = 0; i < cards.length; i++) {
	// Apply colors
	cards[i].style.backgroundColor = colors[i];

	cards[i].addEventListener("click", function () {
		const clickedColor = this.style.backgroundColor;

		// Compare clickedColor to pickedColor
		if (clickedColor === pickedColor) {
			changeColors(pickedColor);
			mainTitle.style.backgroundColor = pickedColor;
			unhideCards();
			messageDisplay.textContent = "Correct! :)";
		} else {
			messageDisplay.textContent = "Not quite, try again.";
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

function pickRandomColor() {
	const randomColor = Math.floor(Math.random() * colors.length);
	return colors[randomColor];
}

function randomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors(num) {
	// Create array
	const arr = [];
	// Add num colors to array
	for (let i = 0; i < num; i++) {
		// Generate random colors and push them to array
		arr.push(randomColor());
	}
	return arr;
}

function applyColors() {
	cards.forEach(function(card) {
		card.style.backgroundColor = generateRandomColors();
	});
}



