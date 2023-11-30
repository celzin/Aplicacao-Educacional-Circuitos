let selectedImage = 1;

function selectImage(imageNumber) {
    selectedImage = imageNumber;
    console.log(imageNumber);
}

function validateAndSimulate() {
    var resistenciaInput = document.getElementById("resistanceInput");
    var capacitanciaInput = document.getElementById("capacitanceInput");
    var condicaoInicialInput = document.getElementById("voltageInput");

    var isValid = true;

    if (resistenciaInput.value === "" || resistenciaInput.value === null) {
        resistenciaInput.classList.add("invalid");
        isValid = false;
    } else {
        resistenciaInput.classList.remove("invalid");
    }

    if (capacitanciaInput.value === "" || resistenciaInput.value === null) {
        capacitanciaInput.classList.add("invalid");
        isValid = false;
    } else {
        capacitanciaInput.classList.remove("invalid");
    }

    if (condicaoInicialInput.value === "" || resistenciaInput.value === null) {
        condicaoInicialInput.classList.add("invalid");
        isValid = false;
    } else {
        condicaoInicialInput.classList.remove("invalid");
    }

    if (isValid) {
        simulate();
    } else {
        alert("Preencha todos os campos!");
        document.documentElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

function simulate() {
    const resistencia = parseFloat(
        document.getElementById("resistanceInput").value
    );
    const capacitancia = parseFloat(
        document.getElementById("capacitanceInput").value
    );
    const voltagem = parseFloat(document.getElementById("voltageInput").value);

    switch (parseInt(selectedImage)) {
        case 1:
            calculateTransferFunction(resistencia, capacitancia);
            plotStepResponse(
                resistencia,
                capacitancia,
                voltagem,
                "stepResponseCanvas"
            );
            calculateBodeData(resistencia, capacitancia);
            plotBodeDiagram(
                resistencia,
                capacitancia,
                "bodeMagnitudeCanvas",
                "bodePhaseCanvas"
            );
            plotRootLocus(resistencia, capacitancia, "rootLocusCanvas");
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        default:
    }
}
