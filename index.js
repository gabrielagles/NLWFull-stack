const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false, 
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input ({ message: "Digite a meta:" })

    if(meta.length == 0) {
        console.log('A meta não pode ser vazia.');
        return  
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Entar para finalizar a etapa",
        choices: [...metas],
        instructions: false,
    })
    
    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada!");        
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s)');  
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log("Não existem metas realizadas! :(");
        return
    }

    await select ({
        message: "Metas Realizadas" + realizadas.length,
        choices: [...realizadas]
    })

}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true //posso colocar o ! na frente do meta.checked
    })

    if (abertas.length == 0) {
        console.log("Não existem metas abertas! :)");
        return
    }

    await select ({
        message: "Metas Abertas" + abertas.length,
        choices: [...abertas]
    })
}

const start = async () => {

    while(true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "Listar"
                },
                {
                    name: "Metas realizadas",
                    value: "Realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Sair",
                    value: "Sair"
                }
            ]
        })

    switch(opcao){
        case "Cadastrar":
            await cadastrarMeta()
            console.log(metas);
            break //break você só usa se tiver algo abaixo, caso não tenha, apenas o return
        case "Listar":
            await listarMetas()
            break
        case "Realizadas":
            await metasRealizadas()
            break
        case "Abertas":
            await metasAbertas()
            break      
        case "Sair":
            console.log("Até a próxima!")
            return        
        }
    }
}

start()

