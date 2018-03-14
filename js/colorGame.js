(function() {
    "use strict";


    // GLOBAL VARIABLES
    let numberOfCards = 6;
    let colors = [];
    let pickedColor;
    let numberOfMoves = 0;
    let isModalActive = false;
    let achievement = "";


    // DOM POINTERS
    const cards = document.querySelectorAll(".card");
    const modeButtons = document.querySelectorAll(".mode");
    const body = document.querySelector("body");
    const overlay = document.querySelector(".overlay");
    const colorDisplay = document.getElementById("colorDisplay");
    const resetBtn = document.getElementById("reset");
    const scoreModal = document.getElementById("scoreModal");


    function init() {
        defineModeButtons();
        defineCardListeners();
        reset();
    }


    function toggleScroll() {
        isModalActive ? body.style.overflow = "hidden" : body.style.overflow = "scroll";
    }


    function setAchievement() {
        if (numberOfMoves <= 2) {
            achievement = "Shake It Baby";
        } else if (numberOfMoves <= 5) {
            achievement = "Squeal Like a Chicken";
        } else {
            achievement = "Gum On My Shoe";
        }
        return achievement;
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
                    setAchievement();
                    unhideCards();
                    setTimeout(function() {
                        showVictoryAlert();
                    }, 200);

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
                    <h4 class="modal-header-title"><i class="far fa-thumbs-up"></i> ${message.title}</h4>
                    <a href="javascript:void(0)" class="btn-close" type="button"><i class="far fa-times-circle"></i></a>
                </div>
                <div class="modal-body">
                    <p>${message.description}</p>
                    <div class="modal-body-result">
                        <p>Color:</p>
                        <span>${pickedColor}</span>
                        <span id="pickedColor-square"></span>
                    </div>
                    <div class="modal-body-result">
                        <p>Moves:</p>
                        <span>${numberOfMoves}</span>
                    </div>
                    <div class="modal-body-result">
                        <p>Achievement:</p>
                        <span>${achievement}</span>
                    </div>
                </div>
                <div class="modal-action">
                    <button id="modal-action-reset" type="button" class="btn-cta ripple">Play again</button>
                </div>
            </div>
        `;

        document.getElementById("pickedColor-square").style.backgroundColor = pickedColor;

        document.getElementById("modal-action-reset").addEventListener("click", function() {
            closeVictoryAlert();
            reset();
        });

        document.querySelector(".btn-close").addEventListener("click", function() {
            closeVictoryAlert();
            reset();
        });
    }


    function closeVictoryAlert() {
        scoreModal.style.display = "none";
        isModalActive = false;
        toggleOverlay();
        toggleScroll();
    }


    function showVictoryAlert() {
        alertify({
            title: "Good job!",
            description: "Your guess is correct."
        });
        scoreModal.style.display = "block";
        isModalActive = true;
        toggleOverlay();
        toggleScroll();
    }


    function reset() {
        unhideCards();
        colors = generateRandomColors(numberOfCards);
        pickedColor = pickRandomColor();
        colorDisplay.textContent = pickedColor;
        body.style.backgroundColor = "white";
        numberOfMoves = 0;
        achievement = "";

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
    document.onreadystatechange = function() {
        if (document.readyState === "complete") {
            init();
        }
    };


})();