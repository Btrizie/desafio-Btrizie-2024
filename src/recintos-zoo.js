class RecintosZoo {
    constructor() {
        //fazer um tipo de enum --> java para guardar os animais e recintos
        //ENUM de recintos (Lista com os recintos e suas caract.)
        this.recintos = [
            { num: 1, bioma: "savana", max: 10, animais: ["MACACO"], quantidade: 3 },
            { num: 2, bioma: "floresta", max: 5, animais: [], quantidade: 0 },
            { num: 3, bioma: "savana e rio", max: 7, animais: ["GAZELA"], quantidade: 1 },
            { num: 4, bioma: "rio", max: 8, animais: [], quantidade: 0 },
            { num: 5, bioma: "savana", max: 9, animais: ["LEAO"], quantidade: 1 }
        ];

        //ENUM de tipos de animais (Lista com os animais e suas caract.) --> adicionado uma detecção para animais carnivoros
        this.animais = {
            "LEAO": { tam: 3, biomas: ["savana"], carnivoro: true },
            "LEOPARDO": { tam: 2, biomas: ["savana"], carnivoro: true },
            "CROCODILO": { tam: 3, biomas: ["rio"], carnivoro: true },
            "MACACO": { tam: 1, biomas: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tam: 2, biomas: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tam: 4, biomas: ["savana", "rio"], carnivoro: false }
        };
    }

    //método para retornar os recintos disponíveis
    analisaRecintos(animal, qtd) {

        //caso animal existir, especie armazenará as informacões do animal
        const especie = this.animais[animal];

        //caso o animal não exista, há o tratamento de erros
        if (!especie) {
            return { erro: "Animal inválido" };
        }
        //caso a quantidade seja inválida
        if (qtd <= 0){
            return { erro: "Quantidade inválida" };
        }

        const qtdAnimal = especie.tam * qtd;

        //recebe do metodo verifica apenas os biomas compatíveis
        const recintosCompativeis = this.recintos.filter(recinto => this.verifica(recinto, especie, qtdAnimal));


        if (recintosCompativeis.length > 0) {
             // Criação da lista de recintos viáveis
            const recintosViaveis = [];

            for (const recinto of recintosCompativeis) {
                recinto.quantidade += especie.tam * qtd;
                const espacoLivre = recinto.max - recinto.quantidade;
                //aqui ele recebe null
                const formatoRecinto = `Recinto ${recinto.num} (espaço livre: ${espacoLivre} total: ${recinto.max})`;
                recintosViaveis.push(formatoRecinto);
            }
            return { recintosViaveis };
        }

        else {
            return { erro: "Não há recinto viável"};
        }
    }

    //método para verificar a compatibilidade de um recinto
    verifica(recinto, especie, qtdAnimal) {
        const espacoNecessario = qtdAnimal;
        const espacoDisponivel = recinto.max - recinto.quantidade;

        //for (const biomaE of especie.biomas) --> if (recinto.bioma.includes(biomaE)) --> biomaCompatível = true;
        const biomaCompativel = especie.biomas.some(biomaEsp => recinto.bioma.includes(biomaEsp));

        return espacoDisponivel >= espacoNecessario && biomaCompativel;
    }

}

export { RecintosZoo as RecintosZoo };
