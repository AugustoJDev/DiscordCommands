const { SlashCommandBuilder } = require('@discordjs/builders');
const { 
    MessageActionRow, 
    MessageEmbed,
    Modal,
    TextInputComponent 
} = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('form')
		.setDescription('Envia um formulário com as informações para a staff.'),
	async execute(interaction) {

        // Vamos criar um modal com as informações do título e ID para iniciar.
        const modal = new Modal()
			    .setCustomId('staff-modal') // ID do formulário. ( Podem ser alterados, porém não mudarão em nada no código. )
			    .setTitle('Formulário de Staff') // Título que aparecerá no formulário.

        // Todas as opções que serão enviadas para o evento `interactionCreate` do nosso formulário.
        /* 
         <nome> ( idade, friend, time, cargo, motivo ) // Podem ser alterados, porém não mudarão em nada no código. 
         .setCustomId() // Podem ser alterados, porém não mudarão em nada no código. 
         .setLabel() // O que aparecerá acima da caixinha para escrever.
         .setStyle() // O estilo de texto da caixinha que receberá os textos. Possui os métodos `SHORT` e `PARAGRAPH` até o momento, sendo o primeiro um texto curto e o segundo um texto grande.
        */
        const options = {
            idade: new TextInputComponent()
			          .setCustomId('ageInput')
			          .setLabel("Qual sua idade")
			          .setStyle('SHORT'),
            friend: new TextInputComponent()
                .setCustomId('idInput')
                .setLabel("Por quem nos conheceu?")
                .setStyle('SHORT'),
            time: new TextInputComponent()
                .setCustomId('timeInput')
                .setLabel("Qual seu horário disponível")
                .setStyle('SHORT'),
            cargo: new TextInputComponent()
                .setCustomId('roleInput')
                .setLabel("Qual a área da staff quer participar")
                .setStyle('SHORT'),
            motivo: new TextInputComponent()
                .setCustomId('reasonInput')
                .setLabel("Qual o motivo para se candidatar")
                .setStyle('PARAGRAPH')
        }

        // Vai pegar todas as opções que foram fornecidas acima e adicionar as mesmas a contante modal como componentes.
        for(let key in options) {
            await modal.addComponents(
                new MessageActionRow()
                    .addComponents(options[key])
                )
        }

      // Mostra o formulário na tela do usuário
		  await interaction.showModal(modal);
  },
}
