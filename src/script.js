let selectedImage = null;

function selectImage(imageNumber) {
    selectedImage = imageNumber;
    // Aqui você pode adicionar a lógica para mostrar a imagem selecionada
}

function simulate() {
    const resistencia = document.getElementById('resistencia').value;
    const capacitancia = document.getElementById('capacitancia').value;
    const condicaoInicial = document.getElementById('condicaoInicial').value;

    // Aqui você pode adicionar a lógica para calcular os valores de acordo com a imagem selecionada

    // Por agora, estou apenas exibindo valores fictícios
    document.getElementById('chart').innerText = `Gráfico do Circuito ${selectedImage}`;
    document.getElementById('outputValue').innerText = "Valor de Saída (V): 5V";
}
