(function() {
    "use strict";


    // GLOBAL VARIABLES
    let numberOfCards = 6;
    let colors = [];
    let pickedColor;
    let numberOfMoves = 0;
    let isModalActive = false;


    // DOM POINTERS
    const cards = document.querySelectorAll(".card");
    const modeButtons = document.querySelectorAll(".mode");
    const body = document.querySelector("body");
    const overlay = document.querySelector(".overlay");
    const preloader = document.getElementById("preloader");
    const colorDisplay = document.getElementById("colorDisplay");
    const resetBtn = document.getElementById("reset");
    const scoreModal = document.getElementById("scoreModal");


    function init() {
        defineModeButtons();
        defineCardListeners();
        reset();
    }

    function toggleOverlay() {
        isModalActive ? overlay.style.display = "block" : overlay.style.display = "none";
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
                numberOfMoves++;
                const clickedColor = this.style.backgroundColor;
                // Compare clickedColor to pickedColor
                if (clickedColor === pickedColor) {
                    changeColors(pickedColor);
                    body.style.backgroundColor = pickedColor;
                    unhideCards();
                    resetBtn.textContent = "Play again?";
                    setTimeout(function() {
                        showVictoryAlert();
                    }, 500);

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


    function alertify(message) {        
        scoreModal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h4 class="modal-header-title">${message.title}</h4>
                </div>
                <div class="modal-body">
                    <p>${message.description}</p>
                    <div class="modal-body-result">
                        <p>Color:</p>
                        <span>${pickedColor}</span>
                    </div>
                    <div class="modal-body-result">
                        <p>Moves:</p>
                        <span>${numberOfMoves}</span>
                    </div>
                </div>
                <hr>
                <div class="modal-action">
                    <button id="modal-action-reset" type="button" class="btn-cta ripple">Play again</button>
                </div>
            </div>
        `;

        document.getElementById("modal-action-reset").addEventListener("click", function() {
            closeVictoryAlert();
            reset();
            toggleOverlay();
        });
    }


    function closeVictoryAlert() {
        scoreModal.style.display = "none";
        isModalActive = false;
    }


    function showVictoryAlert() {
        alertify({
            title: "Good job!",
            description: "Your guess is correct."
        });
        scoreModal.style.display = "block";
        isModalActive = true;
        toggleOverlay();
    }


    function reset() {
        unhideCards();
        colors = generateRandomColors(numberOfCards);
        pickedColor = pickRandomColor();
        colorDisplay.textContent = pickedColor;
        body.style.backgroundColor = "white";
        resetBtn.textContent = "New colors";
        numberOfMoves = 0;

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