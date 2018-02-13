let templates = {
    questions: function (title = "", statement = "") {
        return "<section><header><h2>" + title + "</h2>Stelling: " + statement + "</header><button type='button' id='pro'>Eens</button><button type='button' id='ambivalent'>Geen van beiden</button><button type='button' id='contra'>Oneens</button><button type='button' id='noOpinion'>Geen mening</button>"
    }
};