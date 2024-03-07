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
        console.log(`${this.nome} está realizando seus afazeres.`);
    };

};

class gerente extends funcionario {
    constructor(nome, idade, departamento) {
        super(nome, idade);
        this.departamento = departamento;
    };

    gerenciar() {
        console.log(`${this.nome} do departamento de ${this.departamento}, está gerenciando sua equipe.`);
    };

};

class desenvolvedor extends funcionario {
    constructor(nome, idade, linguagem) {
        super(nome, idade);
        this.linguagem = linguagem;
    };

    programar() {
        console.log(`${this.nome}, desenvolvedor(a) em ${this.linguagem}, está programando.`);
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
        pLabel.style.display = 'flex';
        pLabel.classList.add("justify-content-around");
        /* pLabel.style.display = 'block'; */
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
        <div id="${numReg}" class="cartao card shadow position-relative" style="width: fit-content; height: fit-content;">
            <button type="button" class="btn-close position-absolute end-0 top-0" style="transform: scale(0.5)" aria-label="Close" onclick="deleteYou(this)"></button>
            <div class="card-header">
                <h6 id="departName${numReg}" class="card-text text-center text-body-secondary" style="font-size: small;"></h6>
                <h5 id="nameAndAge${numReg}" class="card-title" style="font-size:0.7rem">---, --- anos</h5>
                <h6 id="positionType${numReg}" class="card-subtitle mb-2 text-body-secondary" style="font-size:0.7rem">---</h6>
            </div>
            <div class="card-body d-flex flex-column gap-1">
                <div class="card-group d-flex flex-fill flex-wrap gap-1  justify-content-around" style="height: fit-content; font-size: 3px">
                    <button type="button" id="introYou${numReg}" onclick="introYou(this)" class="btn btn-warning" style="font-size: 0.4rem;">Se Apresentar</button>
                    <button type="button" id="workYou${numReg}" onclick="workYou(this)" class="btn btn-warning" style="font-size: 0.4rem;">Trabalhar</button>
                </div>
                <div class="card-group d-flex flex-fill flex-wrap gap-1  justify-content-around" style="height: fit-content; font-size: 3px">
                    <button type="button" id="manageYou${numReg}" onclick="manageYou(this)" class="btn btn-success" style="font-size: 0.4rem;">Gerenciar</button>
                    <button type="button" id="codeYou${numReg}" onclick="codeYou(this)" class="btn btn-info" style="font-size: 0.4rem;">Programar</button>
                </div>
            </div>
            <div class="card-footer bg-dark">
                <p id="actionNow${numReg}" class="card-text text-center text-light" style="font-size:0.5rem;">...</p>
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

    bancoDeFunc.push(fulano);

    let lastFulano = bancoDeFunc.length - 1;

    document.getElementById(`positionType${idCard}`).textContent = `Funcionário`;
    document.getElementById(`nameAndAge${idCard}`).textContent = `${bancoDeFunc[lastFulano].nome}, ${bancoDeFunc[lastFulano].idade} anos`;
    document.getElementById(`manageYou${idCard}`).style.display = `none`;
    document.getElementById(`codeYou${idCard}`).style.display = `none`;

}

// Cria uma instancia da classe gerente
function createGer() {

    let fulano = new gerente(nome.value, idade.value, departamento.value);

    let idCard = makeCard(quadroGer);

    fulano.idCard = idCard;

    bancoDeFunc.push(fulano);

    let lastFulano = bancoDeFunc.length - 1;

    document.getElementById(`departName${idCard}`).textContent = `${bancoDeFunc[lastFulano].departamento}`;
    document.getElementById(`nameAndAge${idCard}`).textContent = `${bancoDeFunc[lastFulano].nome}, ${bancoDeFunc[lastFulano].idade} anos`;
    document.getElementById(`positionType${idCard}`).textContent = `Gerente`;
    document.getElementById(`manageYou${idCard}`).style.display = `block`;
    document.getElementById(`codeYou${idCard}`).style.display = `none`;

}

// Cria uma instancia da classe desenvolvedor
function createProg() {

    let fulano = new desenvolvedor(nome.value, idade.value, getValueChecked(lingProg));

    let idCard = makeCard(quadroProg);

    fulano.idCard = idCard;

    bancoDeFunc.push(fulano);

    let lastFulano = bancoDeFunc.length - 1;

    document.getElementById(`departName${idCard}`).textContent = `${bancoDeFunc[lastFulano].linguagem}`;
    document.getElementById(`nameAndAge${idCard}`).textContent = `${bancoDeFunc[lastFulano].nome}, ${bancoDeFunc[lastFulano].idade} anos`;
    document.getElementById(`positionType${idCard}`).textContent = `Programador`;
    document.getElementById(`manageYou${idCard}`).style.display = `none`;

}

// -----------------------------------------
// Saída de Dados

// Ação dos funcionários
function introYou(elemento) {
    let idElem = elemento.parentNode.parentNode.parentNode.id;
    let fulanoAction = bancoDeFunc.findIndex((item) => item.idCard == idElem);

    bancoDeFunc[fulanoAction].seApresentar();

    document.getElementById(`actionNow${idElem}`).textContent = `Olá! Me chamo ${bancoDeFunc[fulanoAction].nome}, tenho ${bancoDeFunc[fulanoAction].idade} anos.`;

    setTimeout(() => {
        document.getElementById(`actionNow${idElem}`).textContent = `...`
    }, 4000);

}

function workYou(elemento) {
    let idElem = elemento.parentNode.parentNode.parentNode.id;
    let fulanoAction = bancoDeFunc.findIndex((item) => item.idCard == idElem);

    bancoDeFunc[fulanoAction].trabalhar();

    document.getElementById(`actionNow${idElem}`).textContent = `${bancoDeFunc[fulanoAction].nome} está realizando seus afazeres.`;

    setTimeout(() => {
        document.getElementById(`actionNow${idElem}`).textContent = `...`
    }, 4000);
}

function manageYou(elemento) {
    let idElem = elemento.parentNode.parentNode.parentNode.id;
    let fulanoAction = bancoDeFunc.findIndex((item) => item.idCard == idElem);

    bancoDeFunc[fulanoAction].gerenciar();

    document.getElementById(`actionNow${idElem}`).textContent = `${bancoDeFunc[fulanoAction].nome} do departamento de ${bancoDeFunc[fulanoAction].departamento},\n está gerenciando sua equipe.`;

    setTimeout(() => {
        document.getElementById(`actionNow${idElem}`).textContent = `...`
    }, 4000);
}

function codeYou(elemento) {
    let idElem = elemento.parentNode.parentNode.parentNode.id;
    let fulanoAction = bancoDeFunc.findIndex((item) => item.idCard == idElem);

    bancoDeFunc[fulanoAction].programar();

    document.getElementById(`actionNow${idElem}`).textContent = `${bancoDeFunc[fulanoAction].nome}, desenvolvedor(a) em ${bancoDeFunc[fulanoAction].linguagem},\n está programando.`;

    setTimeout(() => {
        document.getElementById(`actionNow${idElem}`).textContent = `...`
    }, 4000);
}

// Deletar funcionário
function deleteYou(elemento) {
    let idElem = elemento.parentNode;
    let fulanoAction = bancoDeFunc.findIndex((item) => item.idCard == idElem.id);

    let deletarFunc = confirm(`Deseja excluir ${bancoDeFunc[fulanoAction].nome} do banco de dados?`)
    
    if(deletarFunc === true) {
        bancoDeFunc.splice(fulanoAction, 1);
        idElem.remove();
        console.log(bancoDeFunc);
    }

}

function dataValidation() {

    let regex = /^[a-zA-Z]+$/;

    if(nome.value === '') {
        alert('Campo nome está vazio.')
        throw new Error('Campo nome está vazio.')
    }else if(nome.value.length < 4) {
        alert('Nome de funcionário pequeno demais')
        throw new Error('Nome com nº de caracteres inferior a 4.')
    }else if(!regex.test(nome.value)) {
        alert('Nome de funcionário não deve conter números e/ou caracteres especiais.')
        throw new Error('Nome contém números e/ou caracteres especiais.')
    }else if(idade.value <= 18 && idade.value >= 90 && idade.value == '') {
        alert('Forneça uma idade válida entre 18 e 90 anos.')
        throw new Error('Idade do funcionário fornecida não é válida.')
    }else if(getValueChecked(cargo) === 'Gerente') {
        if(departamento.value === '') {
            alert('Campo Departamento está vazio.')
            throw new Error('Campo departamento está vazio.')
        }
    }else if(getValueChecked(cargo) === 'Programador') {
        if(getValueChecked(lingProg) === null) {
            alert('Selecione a Linguagem de Programação.')
            throw new Error('Não foi indicada a Linguagem de Programação.')
        }
    }

}

// Cadastra funcionario de acordo com a classe
function registerEmployee() {

    try {
        dataValidation()

        var whichFunc = getValueChecked(cargo);

        switch (whichFunc) {
            case 'Gerente':
                createGer();
                break;
    
            case 'Programador':
                createProg();
                break;
    
            default:
                createFunc();
                break;
        }
    
        console.log(bancoDeFunc)
        nome.value = null;
        idade.value = null;
        departamento.value = null;
        lingProg.forEach((input) => input.checked = false);

    } catch (error) {
        console.log('Ocorreu um erro: ', error.message);
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