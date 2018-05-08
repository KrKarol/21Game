const scores = document.querySelectorAll(".score"),
    score = [...scores],
	points = document.querySelector(".points"),
    info = document.querySelector(".information"),
    addBtn = document.querySelector(".addPt"),
    start = document.querySelector(".start"),
    reset = document.querySelector(".reset"),
    moveSkip = [...document.querySelectorAll(".stopMove")],
    maxScore = 21;
    let p1 = new Array,
    p2 = [];

// function to adding all points 
function addPoint(x, y) {
    score[x].textContent = y.reduce((a, b) => a + b);
}
//function to changing text at x element
function textChange(x, y) {
    x.textContent = y
}

function skipMove(){
	if(p1.length <= 3 && this.dataset.player ==="p1"){
		p1.push(0,0,0);

		this.style.opacity = "0";
		
		textChange(info, "kolej gracza numer 2");
		textChange(addBtn, "Dodaj punkt");
		
	} else if(p2.length <= 3 && this.dataset.player ==="p2"){
		p2.push(0,0,0);
		
		this.style.opacity = "0";
		
		textChange(addBtn, "Sprawdź wynik");
		check(score[0].textContent, score[1].textContent);
		
		moveSkip.forEach(btn => btn.style.opacity = 0);
	}
}

//function to checking a scores and showing result of game
function check(x, y) {

	addBtn.style.display ="none";
	reset.classList.remove("hidden");
    if (Number(x.textContent) > maxScore || Number(y.textContent) > maxScore) {
        if (Number(x.textContent) > maxScore && Number(y.textContent) > maxScore) {
            textChange(info, "Obaj gracze przekroczyli dopuszczalną ilość punktów. Spróbujcie jeszcze raz :)");
            info.classList.remove("won");
            info.classList.add("draw");

        } else if (Number(x.textContent) > maxScore) {

            textChange(info, "Wygrał gracz numer 2");
            console.log("wygrał gracz numer 2 ");

        } else if (Number(y.textContent) > maxScore) {
        	console.log("wygrał gracz numer 1 ");
            textChange(info, "Wygrał gracz numer 1");
        }
    } else {
    	let restult = parseInt(score[0].textContent) > parseInt(score[1].textContent) ? "Wygrał gracz numer 1" : "Wygrał gracz numer 2";
    	console.log(score[0].textContent, score[1].textContent);
    	console.log("pipka")
    	textChange(info, restult);
    };
}
// Function to start the game
function startGame() {
    this.style.display = "none";
    addBtn.removeAttribute("style");
    textChange(info, "Kolejka gracza numer 1");
    moveSkip.forEach(btn => btn.classList.remove("hidden"));
}
// Main function
function playGame() {

    let point = Math.round(Math.random() * 11 + 1),
        p1f = parseInt(score[0].textContent),
        p2f = parseInt(score[1].textContent);

    points.textContent = `${point}pkt`;

    if (p1.length < 3) {

        if (p1.length == 2) {
            textChange(info, "Kolejka gracza numer 2");
            textChange(addBtn, "Kolejka gracza numer 2")
        }
        p1.push(point);
        addPoint(0, p1);

    } 	else if (p2.length < 3) {
	        if (p2.length === 2) {
	            textChange(addBtn, "Sprawdź wynik")
	            p2.push(point);
	            addPoint(1, p2)
	        } else {
	            p2.push(point);
	            addPoint(1, p2);
	        }
		} 
		else if (p1.length >= 3 && p2.length >= 3) {

        if (score[0].textContent === score[1].textContent) {
        	console.log("kurwa")
            info.classList.add("draw")
			addBtn.style.display ="none";
			reset.classList.remove("hidden");
            textChange(info, "Remis!")
        } 
        else{
	    textChange(points, " ")
        addBtn.removeEventListener("click", playGame)
        addBtn.addEventListener("click", check(score[0], score[1]));
        } 
    }
}


start.addEventListener("click", startGame)
addBtn.addEventListener("click", playGame)
moveSkip.forEach(skip => skip.addEventListener("click", skipMove));
reset.addEventListener("click", () => location.reload());