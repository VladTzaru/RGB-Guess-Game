(function() {
    "use strict";


    // GLOBAL VARIABLES
    let numberOfCards = 6;
    let colors = [];
    let pickedColor;


    // DOM POINTERS
    const cards = document.querySelectorAll(".card");
    const modeButtons = document.querySelectorAll(".mode");
    const bodyColor = document.querySelector("body");
    const preloader = document.getElementById("preloader");
    const colorDisplay = document.getElementById("colorDisplay");
    const resetBtn = document.getElementById("reset");


    function init() {
        defineModeButtons();
        defineCardListeners();
        reset();
    }


    function changeColors(color) {
        cards.forEach(function(card) {
            card.style.backgroundColor = color;
        });
    }


    function removeSelectedClass() {
        modeButtons.forEach(function(btn) {
            btn.classList.remove("selected");
        });
    }


    function defineModeButtons() {
        for (let i = 0; i < modeButtons.length; i++) {
            modeButtons[i].addEventListener("click", function() {
                removeSelectedClass();
                this.classList.add("selected");
                if (this.textContent === "Easy") {
                    numberOfCards = 3;
                } else if (this.textContent === "Normal") {
                    numberOfCards = 6;
                } else {
                    numberOfCards = 12;
                }
                reset();
            });
        }
    }


    function defineCardListeners() {
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", function() {
                const clickedColor = this.style.backgroundColor;
                // Compare clickedColor to pickedColor
                if (clickedColor === pickedColor) {
                    changeColors(pickedColor);
                    bodyColor.style.backgroundColor = pickedColor;
                    unhideCards();
                    resetBtn.textContent = "Play again?";
                } else {
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
        unhideCards();
        colors = generateRandomColors(numberOfCards);
        pickedColor = pickRandomColor();
        colorDisplay.textContent = pickedColor;
        bodyColor.style.backgroundColor = "white";
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


    // INVOCATIONS
    document.onreadystatechange = function () {
    	if (document.readyState === "complete") {
    		init();
    	}
    }


})();