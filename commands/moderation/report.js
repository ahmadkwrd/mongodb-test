const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../data/config');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'report',
            group: 'moderation',
            memberName: 'report',
            description: 'Report a user.',
            examples: ['report @User'],
            args: [
                {
                    key: 'member',
                    prompt: 'Please mention who you want to report.',
                    error: "That is not a valid user, please try again (ex:@User).",
                    type: 'member'
                },
                {
                    key: "reason",
                    prompt: "Please provide a reason.",
                    type: "string"
                }
            ]  
        });
    }

    async run(msg, {member, reason}) {
      const channel = member.guild.settings.get("reportChannel");
      const reportChannel = member.guild.channels.get(channel);
      if(!channel || !reportChannel) {
        msg.react("👍")
        let embed = new MessageEmbed()
        .setTitle(`${config.error} El canal de Reportes no a sido establecido!`)
        .setDescription(`Un administrador debe establecerlo con **/reportchannel <channel>**`)
        .setColor(config.errorColor)
        return msg.embed(embed);
      } else {
      let embed = new MessageEmbed()
      .setTitle("Nuevo Reporte")
      .addField(`Usuario Reportado`, `${member} | ID: ${member.id}`)
      .addField(`Reportado por`, `${msg.author} | ID: ${msg.author.id}`)
      .addField(`Razón`, `${reason}\n\n[Ir al mensage](${msg.url})`)
      .setThumbnail(member.user.displayAvatarURL().replace('.webp', '.png'))
      .setColor(config.defaultColor)
      await reportChannel.send(embed).then(async() => {
        await msg.client.reports.submitReport(msg.guild, msg.author, member, reason)
        let successEmbed = new MessageEmbed()
        .setTitle(`${config.success} Reporte enviado!`)
        .setColor(config.successColor)
        await msg.channel.send(successEmbed);
      }).catch(err => msg.channel.send(`I have encountered an error while trying to send the report to the reports channel. \`${err}\``))
    }
  }
}