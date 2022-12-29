'use strict';

/** Como o usuario interagi com o formulario?
 * 
        * 1- Primeiro o usuario clica no input para digitar o cep;
        * 2- Criando uma function searchPostCode e usando evento 'focusout' que e quando o usuario sai do input post code;
        * 3- Criando variavel post code, para acessar o input post code, para pegar o valor digitado;
        * 4- Criando variavel url para acessar o post code digitado;
        * 5- Acessando o retorno da API post code com fetch;
        * 6- Na variavel searchPostCode, poe nome da funcao de async;
        * 7- Criando variavel datas, que e o retorno da API;
        * 8- Pegando apenas o json que vai retornar;
        * 9- Criando variavel/function preencherFormulario e passando parametro address;
        * 10- Acessando o id='address' para ter acesso ao valor do logradouro:
        * 11- Tratando erro da API, caso o usuario digite um numero errado;
        * 12- Fazendo uma validacao para que o usuario nao digite letras nos inputs de numeros;
        * 13- Criando uma variavel/function postCodeValido e fazendo validacao caso usuario digite letras;
        * 14- Criando uma variavel/function isNumber para ser digitado apenas numeros no input post code;
        * 15- Criar uma variavel/function limparFormulario;
*/

// 15- Criando uma variavel/function limparFormulario:
const limparFormulario = (address) => {
    document.getElementById('address').value = '';
    document.getElementById('district').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
}

// 9- Criando variavel/function preencherFormulario e passando parametros address:
const preencherFormulario = (address) => {

    // 10- Acessando o id='address' para ter acesso ao value digitado e ter acesso ao logradouro do endereco:
    document.getElementById('address').value = address.logradouro;
    document.getElementById('district').value = address.bairro;
    document.getElementById('city').value = address.localidade;
    document.getElementById('state').value = address.uf;
}
// 14- Criando uma variavel/function isNumber para ser digitado apenas numeros no input post code:
const isNumber = (number) => /^[0-9]+$/.test(number);

// 13- Criando uma variavel/function postCodeValido e fazendo validacao caso usuario digite alguma letra:
const postCodeValido = (postCode) => postCode.length == 8 && isNumber(postCode);


// 2- Criando uma function searchPostCode:
    // 6- Colocando async:
const searchPostCode = async() => {
    
    //15- Criando uma variavel/function limparFormulario:
    limparFormulario();
    
    // 3- Criando variavel post code pegando o valor digitado:
    const postCode = document.getElementById('post_code').value;
    // 4- Criando variavel url para acessar o post code digitado:
    const url = `http://viacep.com.br/ws/${postCode}/json/`;

    // 12- Fazendo uma validacao para que o usuario nao digite letras nos inputs de numeros:
    if(postCodeValido(postCode)) {

        // 5- Acessando post code com fetch/then, o retorno da API que e uma promise :
        //fetch(url).then(response => response.json()).then(console.log);
    
        // 7- Criando variavel datas(dados do post code), que vai aguardar(await) o retorno dos dados da API apos o envio dos dados:
        const datas = await fetch(url);
        // 8- Pegando apenas os dados(json) que vai retornar:
        const address = await datas.json();
    
        // 11- Fazendo uma verificacao de erro da API(json), caso o usuario digite um numero errado e retorne um erro:
        if(address.hasOwnProperty('erro')) {
            //document.getElementById('address').value = 'Post Code nao encontrado!';
            alert('CEP nao encontrado!');
        } else {
            // 9- Passando a function preencherFormulario para pegar o address:
            preencherFormulario(address);
        }
    }else {
        alert('Post Code incorrect!');
    }
}

// 1- Acessando o input com id='post_code', adicionando um evento(focusout) e passando parametro para pesquisar o post code:
document.getElementById('post_code').addEventListener('focusout', searchPostCode);
