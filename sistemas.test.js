const sistema = require('./sistema');
describe('1. Verificador de Palíndromo (ehPalindromo)', () => {
  test('deve retornar true para palavras palíndromas simples e com maiúsculas/espaços', () => {
    expect(sistema.ehPalindromo('radar')).toBe(true);
    expect(sistema.ehPalindromo('Arara')).toBe(true);
  });
  test('deve retornar false para palavras que não são palíndromos', () => {
    expect(sistema.ehPalindromo('javascript')).toBe(false);
  });
  test('deve retornar false para entradas vazias ou indefinidas', () => {
    expect(sistema.ehPalindromo('')).toBe(false);
    expect(sistema.ehPalindromo(null)).toBe(false);
  });
});
describe('2. Contador de Vogais (contarVogais)', () => {
  test('deve contar corretamente as vogais de uma palavra, incluindo acentuadas', () => {
    expect(sistema.contarVogais('escola')).toBe(3);
    expect(sistema.contarVogais('paralelepipedo')).toBe(7);
  });
  test('deve retornar 0 quando a string não possuir vogais', () => {
    expect(sistema.contarVogais('xyz')).toBe(0);
  });
});
describe('3. Calculadora de Fatorial (calcularFatorial)', () => {
  test('deve calcular o fatorial de números inteiros positivos (caminho feliz)', () => {
    expect(sistema.calcularFatorial(5)).toBe(120);
  });
  test('deve retornar 1 para fatorial de 0 e 1', () => {
    expect(sistema.calcularFatorial(0)).toBe(1);
    expect(sistema.calcularFatorial(1)).toBe(1);
  });
  test('deve lançar erro ao tentar calcular fatorial de número negativo', () => {
    expect(() => sistema.calcularFatorial(-2)).toThrow('Não existe fatorial de número negativo');
  });
});
describe('4. Removedor de Duplicatas (removerDuplicatas)', () => {
  test('deve remover elementos duplicados de um array', () => {
    expect(sistema.removerDuplicatas([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
  });
  test('deve retornar um array idêntico se não houver duplicatas', () => {
    expect(sistema.removerDuplicatas(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });
});
describe('5. Validador de Agendamento (agendarConsulta)', () => {
  test('deve agendar consulta com sucesso em dias úteis', () => {
    const quartaFeira = new Date('2026, 10, 14');
    expect(sistema.agendarConsulta(quartaFeira)).toBe('Consulta agendada com sucesso');
  });
  test('deve lançar erro ao tentar agendar no final de semana', () => {
    const sabado = new Date('2026, 10, 17');
    expect(() => sistema.agendarConsulta(sabado)).toThrow('Clínica fechada aos finais de semana');
  });
});
describe('6. Formatador de Moeda Brasileira (formatarMoeda)', () => {
  test('deve formatar valores numéricos inteiros e decimais para BRL', () => {
    expect(sistema.formatarMoeda(15.5)).toBe('R$ 15,50');
    expect(sistema.formatarMoeda(100)).toBe('R$ 100,00');
  });
  test('deve lançar erro quando o valor passado for inválido', () => {
    expect(() => sistema.formatarMoeda('abc')).toThrow('Valor inválido');
  });
});
describe('7. Validador de CPF Básico (validarCpfBasico)', () => {
  test('deve aceitar CPFs válidos com ou sem formatação', () => {
    expect(sistema.validarCpfBasico('123.456.789-01')).toBe(true);
    expect(sistema.validarCpfBasico('12345678901')).toBe(true);
  });
  test('deve rejeitar CPFs com tamanho diferente de 11 dígitos ou com números repetidos', () => {
    expect(sistema.validarCpfBasico('12345')).toBe(false);
    expect(sistema.validarCpfBasico('11111111111')).toBe(false);
  });
});
describe('8. Cálculo de Ingresso (calcularIngresso)', () => {
  test('deve cobrar preço cheio (R$ 40) quando não houver critérios de desconto', () => {
    expect(sistema.calcularIngresso(25, false, 1)).toBe(40); 
  });
  test('deve aplicar meia entrada (R$ 20) por idade, estudante ou dia da semana', () => {
    expect(sistema.calcularIngresso(65, false, 1)).toBe(20); // Idoso
    expect(sistema.calcularIngresso(20, true, 1)).toBe(20);  // Estudante
    expect(sistema.calcularIngresso(25, false, 3)).toBe(20); // Quarta-feira
  });
  test('não deve acumular descontos (máximo 50%)', () => {
    expect(sistema.calcularIngresso(65, true, 3)).toBe(20); // Idoso, estudante e na quarta-feira
  });
});
describe('9. Classe Conta Bancária (ContaBancaria)', () => {
  let ContaBancaria;
  beforeEach(() => {
    ContaBancaria = sistema.ContaBancaria;
  });
  test('deve iniciar com saldo zerado e realizar depósitos corretamente', () => {
    const conta = new ContaBancaria('Maria');
    expect(conta.obterSaldo()).toBe(0);
    conta.depositar(100);
    expect(conta.obterSaldo()).toBe(100);
  });
  test('deve permitir saques dentro do limite do saldo', () => {
    const conta = new ContaBancaria('Maria');
    conta.depositar(100);
    conta.sacar(40);
    expect(conta.obterSaldo()).toBe(60);
  });
  test('deve proibir depósitos negativos/nulos e saques acima do saldo disponível', () => {
    const conta = new ContaBancaria('Maria');
    expect(() => conta.depositar(0)).toThrow('Valor de depósito deve ser positivo');
    expect(() => conta.sacar(50)).toThrow('Saldo insuficiente');
  });
});
describe('10. Consulta de Clima (obterClima)', () => {
  test('deve retornar a mensagem com a temperatura em caso de sucesso', async () => {
    const servicoClimaMock = {
      buscar: jest.fn().mockResolvedValue({ temperatura: 28 })
    };
    const resultado = await sistema.obterClima('São Paulo', servicoClimaMock);
    expect(resultado).toBe('A temperatura em São Paulo é de 28°C');
    expect(servicoClimaMock.buscar).toHaveBeenCalledWith('São Paulo');
  });
  test('deve tratar a falha do serviço e lançar exceção', async () => {
    const servicoClimaMock = {
      buscar: jest.fn().mockRejectedValue(new Error('API Indisponível'))
    };
    await expect(sistema.obterClima('São Paulo', servicoClimaMock))
      .rejects
      .toThrow('Falha ao buscar dados climáticos');
  });
});