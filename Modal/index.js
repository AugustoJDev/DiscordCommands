client.on("interactionCreate", async interaction => {
    // Retorna caso a interação não for um formulário.
    if (!interaction.isModalSubmit()) return;

    var response = []; // Criamos uma array para separar as respostas do formulário e organizá-las facilmente.

    // Pegamos todas as respostas dos formulários e colocamos ela dentro da array `response`, assim reduzindo o uso de linhas para obter os valores.
    for(let key in interaction.fields.components) {
        for(let i in interaction.fields.components[key].components) {
            response.push(interaction.fields.components[key].components[i].value);
        };
    };

    // Embed criado com todas as informações das respostas, separandos na forma inline.
    const formEmbed = new MessageEmbed()
        .setTitle(`Formulário de Staff`)
        .addFields({
            name: `Nome:`,
            value: `\`\`\`${interaction.user.tag}\`\`\``,
            inline: true
        },
        {
            name: `ID:`,
            value: `\`\`\`${interaction.user.id}\`\`\``,
            inline: true
        },
        {
            name: `Idade:`,
            value: `\`\`\`${response[0]}\`\`\``,
            inline: true
        },
        {
            name: `Indicado por:`,
            value: `\`\`\`${response[1]}\`\`\``,
            inline: true
        },
        {
            name: `Horário disponível:`,
            value: `\`\`\`${response[2]}\`\`\``,
            inline: true
        },
        {
            name: `Para cargo:`,
            value: `\`\`\`${response[3]}\`\`\``,
            inline: true
        },
        {
            name: `Motivo de requisição:`,
            value: `\`\`\`${response[4]}\`\`\``
        })

    // Fornecemos o ID do canal de logs para puxar o canal.
    const formsLog = interaction.guild.channels.cache.get("873959321376018462")

    // Enviamos o formulário com todos os dados para o canal.
    formsLog.send({
        embeds: [formEmbed]
    })

    // Resposta dada ao usuário após o envio bem sucedido do formulário.
    interaction.reply({
        content: "Obrigado por seu contato, iremos responder em breve.",
        ephemeral: true
    })
})
