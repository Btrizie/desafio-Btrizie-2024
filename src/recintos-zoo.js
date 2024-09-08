class RecintosZoo {
    constructor() {
        //fazer um tipo de enum --> java para guardar os animais e recintos
        //ENUM de recintos (Lista com os recintos e suas caract.)
        this.recintos = [
            { num: 1, bioma: "savana", max: 10, qtd: 3 },
            { num: 2, bioma: "floresta", max: 5, qtd: 0 },
            { num: 3, bioma: "savana e rio", max: 7, qtd: 1 },
            { num: 4, bioma: "rio", max: 8, qtd: 0 },
            { num: 5, bioma: "savana", max: 9, qtd: 1 }
        ];

        //ENUM de tipos de animais (Lista com os animais e suas caract.)
        this.animais = {
            "LEAO": { tam: 3, biomas: ["savana"] },
            "LEOPARDO": { tam: 2, biomas: ["savana"] },
            "CROCODILO": { tam: 3, biomas: ["rio"] },
            "MACACO": { tam: 1, biomas: ["savana", "floresta"] },
            "GAZELA": { tam: 2, biomas: ["savana"] },
            "HIPOPOTAMO": { tam: 4, biomas: ["savana", "rio"] }
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

        const qtdAnimal = especie.tam * qtd;

        //recebe do metodo verifica apenas os biomas compatíveis
        const recintosCompativeis = this.recintos.filter(recinto => this.verifica(recinto, especie, qtdAnimal));


        if (recintosCompativeis.length > 0) {
             // Criação da lista de recintos viáveis
            const recintosViaveis = [];

            for (const recinto of recintosCompativeis) {
                const espacoLivre = recinto.max - recinto.qtd;
                //aqui ele recebe null
                const formatoRecinto = `Recinto ${recinto.num} (espaço livre: ${espacoLivre} total: ${recinto.max})`;
                recintosViaveis.push(formatoRecinto);
            }
            return { recintosViaveis };
        }

        //if (recintosCompativeis.length > 0) {
          //  const recintos = 
          //  return { recintosViáveil: recintosCompativeis.map(recinto => "Recinto ${recinto.numero} (espaço livre: ${recinto.qnt} 
          //               total: ${recinto.max})").join('\n')};

        
        else {
            return { erro: "Não há recinto viável"};
        }
    }

    //método para verificar a compatibilidade de um recinto
    verifica(recinto, especie, qtdAnimal) {
        const espacoNecessario = qtdAnimal;
        const espacoDisponivel = recinto.max - recinto.qtd;

        //for (const biomaE of especie.biomas) --> if (recinto.bioma.includes(biomaE)) --> biomaCompatível = true;
        const biomaCompativel = especie.biomas.some(biomaEsp => recinto.bioma.includes(biomaEsp));

        return espacoDisponivel >= espacoNecessario && biomaCompativel;
    }

}

export { RecintosZoo as RecintosZoo };
