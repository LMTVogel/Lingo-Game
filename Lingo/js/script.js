var speelbord = document.getElementById('speelbord');
var button = document.getElementById('startButton');
var locatorColumn = 1; 
var locatorRow = 1;
var allowTyping = true;
var randomWord = words[Math.floor(Math.random()*words.length)];
var typeWord = new Array(5);
var correctLetters = [randomWord.charAt(0), '', '', '', ''];
var timeLeft = 41;

console.log(randomWord);

function onclickButton() {
	start();
	timer();
	addLetters();
	button.style.display='none';
}

function timer(){
    var countdownTimer = setInterval(function(){
        timeLeft--;
        document.getElementById("countdown").textContent = timeLeft;
        if (timeLeft < 0){
            alert("Je tijd is op! het woord was " + randomWord);
            location.reload();
        }
    },1000);
}

function start() {
	for (i = 0; i < 5; i++) {
		var letterBox = document.createElement('div');
		speelbord.appendChild(letterBox);
		letterBox.id = "r" + (i+1); 

		for (j = 0; j < 5; j++) {
			var letterBoxColumn = document.createElement('div');
			letterBox.appendChild(letterBoxColumn);
			letterBoxColumn.id = "r" + (i+1) + "c" + (j+1);

			var paragraph = document.createElement('p');
			letterBoxColumn.appendChild(paragraph);
		}
	}
}

document.addEventListener("keydown", function(e) {
	var x = e.keyCode;
	var y = String.fromCharCode(x);

	if (allowTyping == true && y.match(/[a-z]/i)){
		var letterBox = document.getElementById('r' + locatorRow + 'c' + locatorColumn).firstChild;
		letterBox.innerHTML = y.toUpperCase();
		letterBox.style.opacity='1.0';
		typeWord[locatorColumn-1]=y.toLowerCase();
		locatorColumn++;
	}

	if (locatorColumn > 5) {
		checkWord();
		allowTyping = false;
		locatorColumn = 1;
		setTimeout(function(){ 
			allowTyping=true;
			locatorRow++;
			if (locatorRow<6) {
				addLetters();
			}
			if (locatorRow > 5) {
				setTimeout(function(){
					alert('Helaas, het word was ' + randomWord + '!');
					location.reload();
		}, 500);
			}
			
		}, 1000);
	}
});

function checkWord() {
	var goodWord = randomWord.split('');
	for (i = 0; i < 5; i++) {
		if (typeWord[i]==goodWord[i]) {
			var letterBox = document.getElementById('r' + locatorRow + 'c' + (i+1));
			correctLetters[i]=goodWord[i];
			letterBox.style.backgroundColor='green';
			typeWord[i]= '#';
			goodWord[i]= '*';
		}
	}
	if (checkValuesSame(typeWord)==true) {
		setTimeout(function(){
			alert('Goed gedaan. Je hebt gewonnen!');
			location.reload();
		}, 500);
	}
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 5; j++) {
			if (typeWord[i]==goodWord[j]) {
				var letterBox = document.getElementById('r' + locatorRow + 'c' + (i+1));
				letterBox.style.backgroundColor='yellow';
				letterBox.style.borderRadius='100px';
				typeWord[i]= '#';
				goodWord[j]= '*';
			}
		}
	}
	console.log(typeWord, goodWord);
}

function checkValuesSame(myArray) {
	for (i=0; i < 5; i++) {
		if (myArray[i]!='#') {
			return false;
		}
	} 
	return true;
}

function addLetters() {
	for (var i = 0; i < 5; i++) {
		var letterBox = document.getElementById('r' + locatorRow + 'c' + (i+1)).firstChild;
		letterBox.innerHTML=correctLetters[i].toUpperCase();
		letterBox.style.opacity='0.5';
	}
}

















