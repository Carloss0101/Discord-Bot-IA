const Discord = require('discord.js')
require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { ApexChat } = require("apexify.js");


const client = new Discord.Client({ 
  intents: [ 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
       ]
    });

['events'].forEach(f => require(`./src/handlers/${f}`)(client));

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignora mensagens de outros bots.
  
  // Verifica se a mensagem foi enviada em um canal específico
  if (message.channel.id === '') { //Adicione o ID do canal do discord, lembrando que o bot deve ter permissão no canal.
      const response = await ApexChat("v3-32k", `Responda apenas à pergunta: ${message.content}`, {//"v3-32" é o modelo da IA.
          userId: message.author.id,
          memory: true,
          instruction: `Sua função principal é auxiliar os clientes da lanchonete do joaozinho no atendimento virtual, oferecendo um serviço rápido, preciso e amigável.`, //Coloque a instrução da IA. 
          limit: 12, //Limite do histórico.
        });
        let embed = new Discord.EmbedBuilder() 
          .setDescription(`**${response}**`)
          .setColor('ffaa00')//Cor da embed da resposta.
          //Para adicionar mais componentes na embed: https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor
        
          await message.channel.send({embeds: [embed]}) //Envia a resposta da IA no canal adicionado.
          
          console.log(`Pergunta: ${message.content}`) //Envia a pergunta do usúario no console.
          console.log(`Resposta IA: ${response}`)//Envia a resposta da IA no console.
  }
});

client.login(process.env.TOKEN);