
// 1. Verificador de Palíndromo
// Verifica se uma palavra é lida da mesma forma de trás para frente.
function ehPalindromo(palavra) {
  if (!palavra) return false;
  const formatada = palavra.toLowerCase().trim();
  const invertida = formatada.split('').reverse().join('');
  return formatada === invertida;
}

// 2. Contador de Vogais
// Retorna a quantidade de vogais presentes em uma string.
function contarVogais(texto) {
  const correspondencias = texto.match(/[aeiouáéíóúâêôãõ]/gi);
  return correspondencias ? correspondencias.length : 0;
}

// 3. Calculadora de Fatorial
// Calcula o fatorial de um número inteiro positivo (ex: 5! = 120).
function calcularFatorial(n) {
  if (n < 0) throw new Error('Não existe fatorial de número negativo');
  if (n === 0 || n === 1) return 1;
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

// 4. Removedor de Duplicatas
// Recebe um array e retorna um novo array sem itens repetidos.
function removerDuplicatas(array) {
  return [...new Set(array)];
}

// 5. Validador de Agendamento (Dias Úteis)
// Não permite agendar consultas aos finais de semana (sábado = 6, domingo = 0).
function agendarConsulta(dataDaConsulta) {
  const diaSemana = dataDaConsulta.getDay();
  if (diaSemana === 0 || diaSemana === 6) {
    throw new Error('Clínica fechada aos finais de semana');
  }
  return 'Consulta agendada com sucesso';
}

// 6. Formatador de Moeda Brasileira Simplificado
function formatarMoeda(valor) {
  if (isNaN(valor)) throw new Error('Valor inválido');
  return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
}

// 7. Validador de CPF Básico (Tamanho e Repetição)
// Verifica se tem 11 dígitos numéricos e não é uma sequência de números iguais.
function validarCpfBasico(cpf) {
  const apenasNumeros = cpf.replace(/\D/g, '');
  if (apenasNumeros.length !== 11) return false;
 
  const todosIguais = apenasNumeros.split('').every(c => c === apenasNumeros[0]);
  if (todosIguais) return false;

  return true;
}

// 8. Cálculo de Ingresso com Regras
// Ingresso base R$ 40. Quarta-feira (dia 3) = meia entrada. Estudante ou Idoso (>= 60) = meia entrada.
// Descontos não são cumulativos (máximo de 50%).
function calcularIngresso(idade, ehEstudante, diaDaSemana) {
  const precoBase = 40;
  const temDesconto = diaDaSemana === 3 || ehEstudante || idade >= 60;
 
  return temDesconto ? precoBase / 2 : precoBase;
}

// 9. Classe de Conta Bancária (Orientação a Objetos)
class ContaBancaria {
  constructor(titular) {
    this.titular = titular;
    this.saldo = 0;
  }

  depositar(valor) {
    if (valor <= 0) throw new Error('Valor de depósito deve ser positivo');
    this.saldo += valor;
  }

  sacar(valor) {
    if (valor > this.saldo) throw new Error('Saldo insuficiente');
    this.saldo -= valor;
  }

  obterSaldo() {
    return this.saldo;
  }
}

// 10. Consulta de Clima (Assíncrono com Mock)
// Simula a busca de clima em uma API externa.
async function obterClima(cidade, servicoClima) {
  try {
    const resposta = await servicoClima.buscar(cidade);
    return `A temperatura em ${cidade} é de ${resposta.temperatura}°C`;
  } catch (erro) {
    throw new Error('Falha ao buscar dados climáticos');
  }
}

GPUShaderModule.exports = {

    ehPalindromo,
    contarVogais,
    calcularFatorial,
    removerDuplicatas,
    agendarConsulta,
    formatarMoeda,
    validarCpfBasico,
    calcularIngresso,
    ContaBancaria,
    obterClima
}