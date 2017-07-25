function print(str) { console.log(str); }
function getBox() { return document.getElementById("box"); }
function createDiv() { return document.createElement("div"); }
var numOfWeeksInAYear = parseInt(365 / 7);
var lifespan = 65;
var birthday = new Date();

window.onload = function() {
	var storedBirthday = localStorage.getItem("birthday");
	if (storedBirthday === null) {
		askBirthday();		
	} else {
		birthday = new Date(storedBirthday);
	}
	var storedLifespan = localStorage.getItem("lifespan");
	if (storedLifespan === null) {
		askLifeSpan();		
	} else {
		lifespan = parseInt(storedLifespan);
	}
	appendElements();
	// loadStorage();
	updateCurrentPoint();
}

function onClickMenu() {
	clearStorage();
	location.reload();
}

// -------------------------------

function askBirthday() {
	var userBirthdayString = window.prompt("When is your birthday?", "1992-02-01");
	var userBirthday = new Date(userBirthdayString);
	if ((userBirthday.toString() === "Invalid Date") || (userBirthdayString == null)) {
		askBirthday();
		return;
	}
	birthday = userBirthday;
	localStorage.setItem("birthday", userBirthdayString);
}

function askLifeSpan() {
	var userLifeSpan = parseInt(window.prompt("How long will you live?", "65"));
	if (!((userLifeSpan != NaN) && (userLifeSpan > 0) && (userLifeSpan < 300))) {
		askLifeSpan();
		return;
	}
	lifespan = userLifeSpan;
	localStorage.setItem("lifespan", lifespan);
}

function clearStorage() {
	localStorage.clear()
}


// Update calender from birthday
function updateCurrentPoint() {
	// apped class .passed
	var floatAge = getFloatAge();
	var intAge = Math.floor(floatAge);
	var decimalValue = parseFloat("0."+(String(floatAge)).split(".")[1]);
	var dayCount = parseInt(decimalValue * 365);
	var weekCount = parseInt(dayCount / 7);
	// passed years
	for (var y = 0; y < intAge; y++) {
		let weekDivs = document.querySelectorAll(".year_" + y + " .week:not(.yearGuideWeek)")
		for (var weekDiv of weekDivs) {
			weekDiv.classList.add("passedWeek");
		}
	}
	// current year
	for (var w = 1; w < weekCount; w++) {
		let weekDiv = document.querySelector(".year_" + intAge + " .week_" + w);
		weekDiv.classList.add("passedWeek");
	}
	// current Week
	let currentWeekDiv = document.querySelector(".year_" + intAge + " .week_" + weekCount);
	currentWeekDiv.classList.add("currentWeek");
}

// calc age from birthday
function getFloatAge() {
	var now = new Date();
	var diff = now - birthday; // This is the difference in milliseconds
	var age = diff /31557600000; // Divide by 1000*60*60*24*365.25
	return age
}

function appendElements() {
	var box = getBox();

	// append years (Index of -1 is the guide.)
	for (var y = -1; y <= lifespan; y++) {
		var yearDiv = createDiv();

		var className = "year " + "year_" + (y);
		if (y == -1) {
			className += " weekGuideRow"
		}
		yearDiv.setAttribute("class", className);

		// append weeks (Index of zero is the guide.)
		for (var w = 0; w <= numOfWeeksInAYear; w++) {
			var weekDiv = createDiv();
			var wClassName = "week " + "week_" + (w);
			if (w == 0) {
				wClassName += " yearGuideWeek guideWeek";
			}
			if (y == -1) {
				wClassName += " weekGuideWeek guideWeek";
			}
			weekDiv.setAttribute("class", wClassName);
			// week guide
			if (y == -1) {
				if (((w != 0) && (w % 5 == 0)) || w == 1) {
					var weekGuideDiv = createDiv();
					weekGuideDiv.setAttribute("class", "weekGuide");
					weekGuideDiv.innerHTML = w;
					weekDiv.appendChild(weekGuideDiv);
				}
			}
			// year guide
			if (w == 0) {
				if ((y % 5) == 0) {
					var yearGuideDiv = createDiv();
					yearGuideDiv.setAttribute("class", "yearGuide");
					yearGuideDiv.innerHTML = y;
					weekDiv.appendChild(yearGuideDiv);
				}
			}

			yearDiv.appendChild(weekDiv);
		}
		box.appendChild(yearDiv);
	}
}