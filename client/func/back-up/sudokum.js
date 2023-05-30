const DB_URL = "http://localhost:3000/usuario"; 


let numEscolhido = null; 
let pedacoEscolhido = null; 
let erros = 0; 
let vitorias = 0; 

/*
let grade = [
    "--6-----1",
    "-7--6--5-",
    "8--1-32--",
    "--5-4-8--",
    "-4-7-2-9-",
    "--8-1-7--",
    "--12-5--3",
    "-6--7--8-",
    "------4--"
]
*/

let grade = [
    "---827941",
    "172964358",
    "894153267",
    "715349826",
    "643782195",
    "928516734",
    "481295673",
    "369471582",
    "257638419"
]

let solucaoGrade = [
    "536827941",
    "172964358",
    "894153267",
    "715349826",
    "643782195",
    "928516734",
    "481295673",
    "369471582",
    "257638419"
]

let gradeOriginal = [...grade]; 

window.onload = function() {
    prepararTabuleiro(); 
    reiniciar(); 
}

window.addEventListener("load", reiniciar); 

function prepararTabuleiro() {
    for (let i = 1; i <= 9; i++){
        let num = document.createElement("div"); 
        num.id = i; 
        num.innerText = i; 
        num.addEventListener("click", selecionarNum); 
        num.classList.add("numero"); 
        document.getElementById("digitos").appendChild(num); 
    }

    for (let i = 0; i <= 9; i++){
        for (let j = 0; j < 9; j++){
            let pedaco = document.createElement("div"); 
            pedaco.id = i.toString() + "-" + j.toString(); 
            if(grade[i][j] != "-"){
                pedaco.innerText = grade[i][j]; 
                pedaco.classList.add("pedacos-sec"); 
            }
            if(i == 2 || i == 5){
                pedaco.classList.add("linhaH"); 
            }
            if(j == 2 || j ==  5){
                pedaco.classList.add("linhaY"); 
            } 
            pedaco.addEventListener("click", selecionarPedaco); 
            pedaco.classList.add("pedacos"); 
            document.getElementById("grade").append(pedaco); 
        }
    }
}

function gravarRecorde() {
    var formulario = document.getElementById("abrir-recorde");

    //Ligar-Desligar o formulário
    if (formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }

    const usuarioNome = document.getElementById("gravarUsuarioNome").value;

        axios.get(DB_URL)
        .then(resposta => {
            const usuariosData = resposta.data;
            const usuarioSelecionadoData = usuariosData.find(usuarioSelecionado => usuarioSelecionado.usuarioNome === usuarioNome);

            if (usuarioSelecionadoData){
                usuarioSelecionadoId = usuarioSelecionadoData._id; 

                axios.put(DB_URL + "/${usuarioSelecionadoId}/vitorias", { usuarioVitorias: vitorias})
                .then(resposta => {
                    console.log(resposta); 
                })
                .catch(err => {
                    console.log(err); 
                });
            }
        }); 

}

function verificarVitoria() {
    console.log("Chamada confirmada.");
    const gradeOG = grade.map(row => row.split("").map(Number));
  
    if (compararGrades(gradeOG, solucaoGrade)) {
      console.log("Teste efetuado com sucesso.");
      vitorias += 1; 
      reiniciarJogo(); 
    }

    console.log(vitorias); 
  }
  
function compararGrades(gra1, gra2) {
    if (gra1.length !== gra2.length) {
      return false;
    }
  
    for (let i = 0; i < gra1.length; i++) {
      if (gra1[i].length !== gra2[i].length) {
        return false;
      }
  
      for (let j = 0; j < gra1[i].length; j++) {
        const num1 = gra1[i][j];
        const num2 = Number(gra2[i][j]);

        if (num1 !== num2) {
          return false;
        }
      }
    }
  
    return true;
  }

function selecionarPedaco() {
    if(numEscolhido) {
        if(this.innerText != "") {
            return; 
        }

        let cord = this.id.split("-");
        let i = parseInt(cord[0]); 
        let j = parseInt(cord[1]); 

        if(solucaoGrade[i][j] == numEscolhido.id){
            this.innerText = numEscolhido.id;
            grade[i] = grade[i].substring(0, j) + numEscolhido.id + grade[i].substring(j + 1);
        }
        else{
            erros +=1; 
            document.getElementById("erros").innerText = erros; 
        }

        if(erros >= 3) {
            reiniciarJogo(); 
        }

        console.log(grade); 
        console.log(gradeOriginal); 
        console.log(solucaoGrade); 

        verificarVitoria(); 
    }
}

function reiniciar() {
    let reiniciarbtn = document.getElementById("reiniciar"); 
    reiniciarbtn.addEventListener("click", reiniciarJogo); 
} 

function reiniciarJogo(){
    numEscolhido = null; 
    pedacoEscolhido = null; 
    erros = 0; 
    document.getElementById("erros").innerText = erros; 

    grade = [...gradeOriginal]; 

    let pedacos = document.getElementsByClassName("pedacos"); 

    for (let i = 0; i < pedacos.length; i++){
        let cord = pedacos[i].id.split("-"); 
        let linha = parseInt(cord[0]); 
        let coluna = parseInt(cord[1]); 
        if (gradeOriginal[linha][coluna] != '-') {
            pedacos[i].innerText = gradeOriginal[linha][coluna]; 
        }
        else {
            pedacos[i].innerText = ""; 
        }
    }
}

function selecionarNum() {
    if (numEscolhido != null) {
        numEscolhido.classList.remove("numero-sec"); 
    }
    numEscolhido = this; 
    numEscolhido.classList.add("numero-sec"); 
}