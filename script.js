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

// Compare if the count of party A is bigger then B
function compare(a,b) {
    if (a.count > b.count)
        return -1;
    if (a.count < b.count)
        return 1;
    return 0;
}

// Filter for big parties
function filter(a) {
    return a.size >= 15;
}

function ask(subjects, i = 0) {
    let main = document.getElementsByTagName('main')[0];

    if (subjects.length === i) {
        main.innerHTML = "";
        compareParties();
		return subjects;
	}

	let subject = subjects[i];

	main.innerHTML = templates.questions(subject.title, subject.statement);
	if (i === 0) {document.getElementById("back").disabled = true}
    document.getElementById("back").onclick = () => {
        ask(subjects, --i)
    };
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

function compareParties() {
	let matchedParties = [];
    let main = document.getElementsByTagName('main')[0];

    subjects.forEach((subject) => {
        subject.parties.forEach(function(party) {
			if (subject.anwser === party.position) {
                matchedParties.push(party.name);
			}
        });
    });

    parties.forEach((party) => {party.count = 0});

    matchedParties.forEach((matchedParty) => {
        let partyMatch = parties.find(party => party.name === matchedParty);
        if (partyMatch === undefined) {
            parties.push({name: matchedParty, count: 1});

        } else {
            partyMatch.count++
        }
    });

    parties.sort(compare);
    render(false);
}

function render(bigPartiesOnly) {
    let main = document.getElementsByTagName('main')[0];

    if (bigPartiesOnly === true) {
        main.innerHTML = templates.result(parties.filter(filter), subjects.length);
        document.getElementById("bigPartiesFilter").innerHTML = "Toon alle partijen";
    } else {
        main.innerHTML = templates.result(parties, subjects.length)
    }

    document.getElementById("bigPartiesFilter").onclick = () => {
        render((!bigPartiesOnly));
    };
}

window.onload = () => {
    let main = document.getElementsByTagName('main')[0];

	ask(subjects);
};