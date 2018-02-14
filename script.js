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

let partiesResult = [];

function ask(subjects, i = 0) {
    let main = document.getElementsByTagName('main')[0];

    if (subjects.length === i) {
        main.innerHTML = "";
		compare();
		return subjects;
	}

	let subject = subjects[i];

	main.innerHTML = templates.questions(subject.title, subject.statement);
	document.getElementById("pro").onclick = () => {
		subject.anwser="pro";
        ask(subjects, ++i)
	};
	document.getElementById("ambivalent").onclick = () => {
        subject.anwser="ambivalent";
        ask(subjects, ++i)
	};
	document.getElementById("contra").onclick = () => {
        subject.anwser="contra";
        ask(subjects, ++i)
	};
	document.getElementById("noOpinion").onclick = () => {
        subject.anwser=null;
        ask(subjects, ++i)
    };
}

function compare() {
	let matchedParties = [];

    subjects.forEach((subject) => {
        subject.parties.forEach(function(party) {
			if (subject.anwser === party.position) {
                matchedParties.push(party.name);
			}
        });
    });

    matchedParties.forEach((matchedParty) => {
        let partyMatch = partiesResult.find(party => party.name === matchedParty);
        if (partyMatch === undefined) {
            partiesResult.push({name: matchedParty, count: 1});
        } else {
            partyMatch.count++
        }
    });
}

window.onload = () => {
    let main = document.getElementsByTagName('main')[0];

	ask(subjects);
};