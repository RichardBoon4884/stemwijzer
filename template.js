let templates = {
    questions: function (title = "", statement = "") {
        return "<section><header><h2>" + title + "</h2>Stelling: " + statement + "</header><button type='button' id='back'>Terug</button><button type='button' id='pro'>Eens</button><button type='button' id='ambivalent'>Geen van beiden</button><button type='button' id='contra'>Oneens</button><button type='button' id='noOpinion'>Geen mening</button>"
    },
    result: function (result, totalSubjects) {
        let resultHtml = "";

        result.forEach((party) => {
            let size = (party.size !== undefined) ? " (Zetels: " + party.size + ")" : "";

            resultHtml += "<li>" + Math.ceil(party.count/totalSubjects*100) + "%: " + party.name + size + "</li>"
        });

        return "<section><header><h2>Resultaat</h2></header><button type='button' id='bigPartiesFilter'>Toon alleen grote partijen</button><ul>" + resultHtml + "</ul></section>"
    }
};