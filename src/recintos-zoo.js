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
        this.animais = {
            "LEAO": { tam: 3, biomas: ["savana"], carnivoro: true },
            "LEOPARDO": { tam: 2, biomas: ["savana"], carnivoro: true },
            "CROCODILO": { tam: 3, biomas: ["rio"], carnivoro: true },
            "MACACO": { tam: 1, biomas: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tam: 2, biomas: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tam: 4, biomas: ["savana", "rio"], carnivoro: false }
        };
    }

    //Método para retornar os recintos disponíveis
    analisaRecintos(animal, qtd) {
        const especie = this.animais[animal];
        if (!especie) {
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
                //6) Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
                for (const animaisR of recinto.animais) {
                    if (animaisR !== animal) {
                        recinto.quantidade++;
                        if(recinto.animais.length == 1){ recinto.quantidade++; }
                    }
                }

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
        const espacoDisponivel = recinto.max - recinto.quantidade;

        //1) Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
        const biomaCompativel = especie.biomas.some(biomaEsp => recinto.bioma.includes(biomaEsp));

        const eExistente = this.animais[recinto.animais];
            
        //2) Animais carnívoros devem habitar somente com a própria espécie
        if(eExistente){
            if (especie.carnivoro && eExistente !== especie || eExistente.carnivoro && eExistente !== especie) {
                return false;
            }
        }

        //7) Não é possível separar os lotes de animais nem trocar os animais que já existem de recinto
        return espacoDisponivel >= espacoNecessario && biomaCompativel;
    }

}

export { RecintosZoo as RecintosZoo };
