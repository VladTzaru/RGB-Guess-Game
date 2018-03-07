"use strict";
// DOM POINTERS
const cards 	     = document.querySelectorAll(".card");
const bodyColor      = document.querySelector("body");
const colorDisplay   = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("messageDisplay");
const resetBtn       = document.getElementById("reset");
const easyBtn		 = document.getElementById("easyBtn");
const hardBtn        = document.getElementById("hardBtn");
const insaneBtn      = document.getElementById("insaneBtn")
const mainTitle      = document.getElementsByClassName("main-title")[0];


// GLOBAL VARIABLES
let colors = generateRandomColors(12);
let mode = "hard";


// VIEW
let pickedColor = pickRandomColor();


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


// CONTROLLER
function changeColors(color) {
	cards.forEach(function(card) {
		card.style.backgroundColor = color;
	});
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
	unhideCards();
	colors = generateRandomColors(12);
	pickedColor = pickRandomColor();
	colorDisplay.textContent = pickedColor;
	mainTitle.style.backgroundColor = "steelblue";
	bodyColor.style.backgroundColor = "#006064";
	messageDisplay.textContent = "";
	resetBtn.textContent = "New colors";

	for (let i = 0; i < cards.length; i++) {
		cards[i].style.backgroundColor = colors[i];
	}
}


// EVENT LISTENERS
resetBtn.addEventListener("click", reset);

easyBtn.addEventListener("click", function() {
	this.classList.add("selected");
	hardBtn.classList.remove("selected");
    insaneBtn.classList.remove("selected");
    colors = generateRandomColors(6);
    pickedColor = pickRandomColor();
    for (let i = 0; i < cards.length; i++) {
    	colors[i] ? cards[i].style.backgroundColor = colors[i] : cards[i].style.display = "none";
    }
});

hardBtn.addEventListener("click", function() {
	this.classList.add("selected");
	easyBtn.classList.remove("selected");
    insaneBtn.classList.remove("selected");
    colors = generateRandomColors(9);
    pickedColor = pickRandomColor();
    for (let i = 0; i < cards.length; i++) {
    	cards[i].style.backgroundColor = colors[i];
    	cards[i].style.display = "block";
    }
});

insaneBtn.addEventListener("click", function() {
	this.classList.add("selected");
	easyBtn.classList.remove("selected");
    hardBtn.classList.remove("selected");
    colors = generateRandomColors(12);
    pickedColor = pickRandomColor();
    for (let i = 0; i < cards.length; i++) {
    	colors[i] ? cards[i].style.backgroundColor = colors[i] : cards[i].style.display = "none";
    }
});



