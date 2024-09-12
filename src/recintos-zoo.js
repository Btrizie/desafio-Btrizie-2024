class RecintosZoo {
    constructor() {
        //Lista com os recintos e suas caract.
        this.recintos = [
            { num: 1, bioma: "savana", max: 10, animais: ["MACACO"], quantidade: 3 },
            { num: 2, bioma: "floresta", max: 5, animais: [], quantidade: 0 },
            { num: 3, bioma: "savana e rio", max: 7, animais: ["GAZELA"], quantidade: 1 },
            { num: 4, bioma: "rio", max: 8, animais: [], quantidade: 0 },
            { num: 5, bioma: "savana", max: 9, animais: ["LEAO"], quantidade: 1 }
        ];

        //Lista com os animais e suas caract. --> adicionado uma detecção para animais carnivoros
        this.animais = [
            { nome: "LEAO", tam: 3, biomas: ["savana"], carnivoro: true },
            { nome: "LEOPARDO", tam: 2, biomas: ["savana"], carnivoro: true },
            { nome: "CROCODILO", tam: 3, biomas: ["rio"], carnivoro: true },
            { nome: "MACACO", tam: 1, biomas: ["savana", "floresta"], carnivoro: false },
            { nome: "GAZELA", tam: 2, biomas: ["savana"], carnivoro: false },
            { nome: "HIPOPOTAMO", tam: 4, biomas: ["savana", "rio"], carnivoro: false }
        ];
    }

    //Método para retornar os recintos disponíveis
    analisaRecintos(animal, qtd) {
        let especie = null;
        for (const e of this.animais) {
            if(e.nome == animal){
                especie = e;
            }
        }

        if (especie == null) {
            return { erro: "Animal inválido" };
        }
        if (qtd <= 0){
            return { erro: "Quantidade inválida" };
        }

        const qtdAnimal = especie.tam * qtd;

        //Recebe do metodo verifica apenas os biomas compatíveis
        const recintosCompativeis = this.recintos.filter(recinto => this.verificaRecintos(recinto, especie, qtdAnimal));

        if (recintosCompativeis.length > 0) {
            const recintosViaveis = [];

            for (const recinto of recintosCompativeis) {
                recinto.quantidade += especie.tam * qtd;
                const espacoLivre = recinto.max - recinto.quantidade;
                const recintosV = `Recinto ${recinto.num} (espaço livre: ${espacoLivre} total: ${recinto.max})`;
                recintosViaveis.push(recintosV);
            }
            return { recintosViaveis };
        }
        else {
            return { erro: "Não há recinto viável"};
        }
    }

    //Método para verificar a compatibilidade de um recinto
    verificaRecintos(recinto, especie, qtdAnimal) {
        const espacoNecessario = qtdAnimal;

        //1) Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
        const biomaCompativel = especie.biomas.some(biomaEsp => recinto.bioma.includes(biomaEsp));

        let eExistente = null;
        for (const e of this.animais) {
            if(e.nome == recinto.animais){
                eExistente = e;
            }
        }
            
        //3) Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)
        if(eExistente !== null){
            recinto.quantidade = recinto.quantidade * eExistente.tam
            //6) Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
            for (const animaisR of recinto.animais) {
                if (animaisR !== especie.nome) {
                    recinto.quantidade++;
                }
            }
            
            //2) Animais carnívoros devem habitar somente com a própria espécie
            if ((especie.carnivoro || eExistente.carnivoro) && eExistente.nome !== especie.nome) {
                return false;
            }

            //4) Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
            if ((especie.nome === "HIPOPOTAMO" || eExistente.nome === "HIPOPOTAMO") && recinto.bioma !== "savana e rio" && eExistente.nome !== especie.nome) {
                return false;
            }

        }
        //5) Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
        else if(especie.nome === "MACACO" && recinto.quantidade === 0 && qtdAnimal == 1) {
                return false;
        }

        const espacoDisponivel = recinto.max - recinto.quantidade;

        //7) Não é possível separar os lotes de animais nem trocar os animais que já existem de recinto
        return espacoDisponivel >= espacoNecessario && biomaCompativel;
    }

}

export { RecintosZoo as RecintosZoo };

/*Testes extras para serem usados para teste, implementados em recintos-zoo.test.js

test('Deve encontrar recinto para 1 hipopotamo', () => {
    const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
    expect(resultado.recintosViaveis[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
    expect(resultado.recintosViaveis.length).toBe(2);
});

test('Deve encontrar recinto para 1 macaco', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 6 total: 10)');
    expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');
    expect(resultado.recintosViaveis.length).toBe(2);
});

test('Não deve encontrar recintos para 3 leopardos', () => {
    const resultado = new RecintosZoo().analisaRecintos('LEOPARDO', 3);
    expect(resultado.erro).toBe('Não há recinto viável');
});

test('Deve impedir leão de ser colocado com outra espécie', () => {
    const resultado = new RecintosZoo().analisaRecintos('LEAO', 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 3 total: 9)');
    expect(resultado.recintosViaveis.length).toBe(1); 
});*/