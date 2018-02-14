let templates = {
    questions: function (title = "", statement = "") {
        return "<section><header><h2>" + title + "</h2>Stelling: " + statement + "</header><button type='button' id='pro'>Eens</button><button type='button' id='ambivalent'>Geen van beiden</button><button type='button' id='contra'>Oneens</button><button type='button' id='noOpinion'>Geen mening</button>"
    },
    result: function (result, totalSubjects) {
        let resultHtml;

        result.forEach((party) => {
            resultHtml += "<div>" + party.name + " (" + Math.ceil(party.count/totalSubjects*100) + "%)</div>"
        });

        return "<section><header><h2>Resultaat</h2></header>" + resultHtml + "</section>"
    }
};