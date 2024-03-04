// Entrada de Dados

// Formulário
var nome = document.getElementById('employeeName');
var idade = document.getElementById('employeeAge');
var cargo = document.getElementsByName('cargo');
var departamento = document.getElementById('departament');
var lingProg = document.getElementsByName('progLang')

// Organograma da Empresa
var quadroGer = document.getElementById('quadroGer');
var quadroProg = document.getElementById('quadroProg');
var quadroFunc = document.getElementById('quadroFunc');

// Classes de funcionários
class funcionario {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    };

    seApresentar() {
        console.log(`Olá! Me chamo ${this.nome}, tenho ${this.idade} anos.`);
    };

    trabalhar() {
        console.log(`\n${this.nome} está realizando seus afazeres.`);
    };

};

class gerente extends funcionario {
    constructor(nome, idade, departamento) {
        super(nome, idade);
        this.departamento = departamento;
    };

    gerenciar() {
        console.log(`\n${this.nome} do departamento de ${this.departamento}, está gerenciando sua equipe.`);
    };

};

class desenvolvedor extends funcionario {
    constructor(nome, idade, linguagem) {
        super(nome, idade);
        this.linguagem = linguagem;
    };

    programar() {
        console.log(`\n${this.nome} ${this.linguagem}, está programando.`);
    };

};

// Array de instâncias de funcionarios
var bancoDeFunc = new Array();

// -----------------------------------------
// Processamento de Dados

function toggleInput() {
    var managerStatus = document.getElementById('manager');
    var programmerStatus = document.getElementById('programmer');
    var dLabel = document.getElementsByClassName('departamentLabel');
    var pLabel = document.getElementById('programmingLang');

    if (managerStatus.checked) {
        dLabel[0].style.display = 'block';
        dLabel[1].style.display = 'block';
        pLabel.style.display = 'none';
    } else if (programmerStatus.checked) {
        dLabel[0].style.display = 'none';
        dLabel[1].style.display = 'none';
        pLabel.style.display = 'block';
    } else {
        dLabel[0].style.display = 'none';
        dLabel[1].style.display = 'none';
        pLabel.style.display = 'none';
    }

}

// Identifica valor marcado
function getValueChecked(any) {
    let checkedValue = null;

    any.forEach((item) => {
        if (item.checked) {
            checkedValue = item.value;
        };
    });

    return checkedValue;
};

// Cria cards na página
function makeCard(quadro) {
    let numReg = parseInt(Math.random() * 10000);

    let cardModel = `
        <div id="${numReg}" class="card shadow" style="width: 15rem; height: fit-content;">
            <div class="card-header">
                <h6 id="departName${numReg}" class="card-text text-center text-body-secondary" style="font-size: small;"></h6>
                <h5 id="nameAndAge${numReg}" class="card-title">---, --- anos</h5>
                <h6 id="positionType${numReg}" class="card-subtitle mb-2 text-body-secondary">---</h6>
            </div>
            <div class="card-body">
                <div class="card-group d-inline-flex flex-wrap gap-1  justify-content-around ">
                    <button type="button" id="introYou" onclick="" class="btn btn-warning">Se Apresentar</button>
                    <button type="button" id="workYou" onclick="" class="btn btn-warning">Trabalhar</button>
                    <button type="button" id="manageYou${numReg}" onclick="" class="btn btn-warning">Gerenciar</button>
                    <button type="button" id="codeYou${numReg}" onclick="" class="btn btn-info">Programar</button>
                </div>
            </div>
            <div class="card-footer bg-dark">
                <p id="actionNow" class="card-text text-center text-light">...</p>
            </div>
        </div>`;

    quadro.innerHTML += cardModel;

    return numReg;
}

// Cria uma instancia da classe funcionario
function createFunc() {

    let fulano = new funcionario(nome.value, idade.value);

    let idCard = makeCard(quadroFunc);

    fulano.idCard = idCard;

    bancoDeFunc.push(JSON.parse(JSON.stringify(fulano)));

    let lastFulano = bancoDeFunc.length - 1;

    document.getElementById(`positionType${idCard}`).textContent = `Funcionário`;
    document.getElementById(`nameAndAge${idCard}`).textContent = `${bancoDeFunc[lastFulano].nome}, ${bancoDeFunc[lastFulano].idade} anos`;
    document.getElementById(`manageYou${idCard}`).style.display = `none`;
    document.getElementById(`codeYou${idCard}`).style.display = `none`;
}

function createGer() {

    let fulano = new gerente(nome.value, idade.value, departamento.value);

    let idCard = makeCard(quadroGer);

    fulano.idCard = idCard;

    bancoDeFunc.push(JSON.parse(JSON.stringify(fulano)));

    let lastFulano = bancoDeFunc.length - 1;

    document.getElementById(`departName${idCard}`).textContent = `${bancoDeFunc[lastFulano].departamento}`;
    document.getElementById(`nameAndAge${idCard}`).textContent = `${bancoDeFunc[lastFulano].nome}, ${bancoDeFunc[lastFulano].idade} anos`;
    document.getElementById(`positionType${idCard}`).textContent = `Gerente`;
    document.getElementById(`manageYou${idCard}`).style.display = `block`;
    document.getElementById(`codeYou${idCard}`).style.display = `none`;

}

function createProg() {

    let fulano = new desenvolvedor(nome.value, idade.value, getValueChecked(lingProg));

    let idCard = makeCard(quadroProg);

    fulano.idCard = idCard;

    bancoDeFunc.push(JSON.parse(JSON.stringify(fulano)));

    let lastFulano = bancoDeFunc.length - 1;

    document.getElementById(`departName${idCard}`).textContent = `${bancoDeFunc[lastFulano].linguagem}`;
    document.getElementById(`nameAndAge${idCard}`).textContent = `${bancoDeFunc[lastFulano].nome}, ${bancoDeFunc[lastFulano].idade} anos`;
    document.getElementById(`positionType${idCard}`).textContent = `Programador`;

}

// Cadastra funcionario de acordo com a classe
function registerEmployee() {
    var whichFunc = getValueChecked(cargo);

    switch (whichFunc) {
        case 'Gerente':
            createGer();
            console.log(bancoDeFunc)
            break;

        case 'Programador':
            createProg();
            console.log(bancoDeFunc)
            break;

        default:
            createFunc();
            console.log(bancoDeFunc)
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('registerButton').addEventListener('click', function (event) {
        // Evita o comportamento padrão de envio do formulário
        event.preventDefault();

        // Chama a função para cadastrar o funcionário
        registerEmployee();

    });
});

// -----------------------------------------
// Saída de Dados


/* setTimeout(() => {
    console.log(nome.value);
    console.log(idade.value);
    getValueChecked(cargo);
    console.log(departamento.value);
    getValueChecked(lingProg);

    makeCard(quadroProg)
    makeCard(quadroFunc)
    makeCard(quadroGer)


}, 3000
)
 */