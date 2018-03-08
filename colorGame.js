// GLOBAL VARIABLES
let numberOfCards = 6; 
let colors = [];
let pickedColor;



// DOM POINTERS
const cards 	     = document.querySelectorAll(".card");
const modeButtons    = document.querySelectorAll(".mode");
const bodyColor      = document.querySelector("body");
const colorDisplay   = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("messageDisplay");
const resetBtn       = document.getElementById("reset");
const mainTitle      = document.getElementsByClassName("main-title")[0];


init();

function init() {
	defineModeButtons();
	defineCardListeners();
	reset();
}


// CONTROLLER
function changeColors(color) {
	cards.forEach(function(card) {
		card.style.backgroundColor = color;
	});
}

function defineModeButtons() {

	for (let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numberOfCards = 3;
			} else if (this.textContent === "Normal") {
				numberOfCards = 6;
			} else {
				numberOfCards = 9;
			}
			reset();
		});
	}
}

function defineCardListeners() {
	for (let i = 0; i < cards.length; i++) {

		cards[i].addEventListener("click", function () {
			const clickedColor = this.style.backgroundColor;

			// Compare clickedColor to pickedColor
			if (clickedColor === pickedColor) {
				changeColors(pickedColor);
				mainTitle.style.backgroundColor = pickedColor;
				bodyColor.style.backgroundColor = pickedColor;
				unhideCards();
				messageDisplay.textContent = "Correct! :)";
				resetBtn.textContent = "Play again?"
			} else {
				messageDisplay.textContent = "Not quite, try again.";
				this.classList.add("hide");
			}
		});
	}
}

function unhideCards() {
	cards.forEach(function(card) {
		card.classList.remove("hide");
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


function reset() {
	colors = generateRandomColors(numberOfCards);
	pickedColor = pickRandomColor();
	colorDisplay.textContent = pickedColor;
	mainTitle.style.backgroundColor = "steelblue";
	bodyColor.style.backgroundColor = "#006064";
	messageDisplay.textContent = "";
	resetBtn.textContent = "New colors";

	for (let i = 0; i < cards.length; i++) {
		if (colors[i]) {
			cards[i].style.display = "block";
			cards[i].style.backgroundColor = colors[i];
		} else {
			cards[i].style.display = "none";
		}
	}
}


// EVENT LISTENERS
resetBtn.addEventListener("click", reset);





