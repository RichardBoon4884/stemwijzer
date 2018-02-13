(function() {
	let head = document.getElementsByTagName('head')[0];
	let headScript = document.getElementsByTagName('script')[0];

	let scriptData = document.createElement('script');
    scriptData.type = "text/javascript";
    scriptData.src = "data.js";
	headScript.insertBefore(scriptData, headScript.childNodes[3]);
	headScript.parentNode.insertBefore(scriptData, headScript.nextSibling);

    let scriptTemplate = document.createElement('script');
    scriptTemplate.type = "text/javascript";
    scriptTemplate.src = "template.js";
    headScript.insertBefore(scriptTemplate, headScript.childNodes[3]);
    headScript.parentNode.insertBefore(scriptTemplate, headScript.nextSibling);
})(); // Initializing



function ask(subjects, i = 0) {
    let main = document.getElementsByTagName('main')[0];

    if (subjects.length === i) {
        main.innerHTML = "";
		compare();
		return;
	}

	let subject = subjects[i];

	main.innerHTML = templates.questions(subject.title, subject.statement);
	document.getElementById("pro").onclick = function () {
		subject.anwser="pro";
        ask(subjects, ++i)
	};
	document.getElementById("ambivalent").onclick = function () {
        subject.anwser="ambivalent";
        ask(subjects, ++i)
	};
	document.getElementById("contra").onclick = function () {
        subject.anwser="contra";
        ask(subjects, ++i)
	};document.getElementById("noOpinion").onclick = function () {
        subject.anwser=null;
        ask(subjects, ++i)
    };
}

function compare() {
	let matchedParties = [];
	let parties = [];

    subjects.forEach(function(subject) {
        subject.parties.forEach(function(party) {
			if (subject.anwser === party.position) {
                matchedParties.push(party.id);
			}
        });
    });

    console.log(matchedParties);

    
}

window.onload = function() {
    let main = document.getElementsByTagName('main')[0];

	console.log(subjects);
	ask(subjects);
};