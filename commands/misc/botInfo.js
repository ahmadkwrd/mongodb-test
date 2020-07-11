const { Command } = require('discord.js-commando'),
      { MessageEmbed } = require('discord.js'),
      config = require('../../data/config');

module.exports = class BotInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name:"botinfo",
            group: 'misc',
            memberName: 'botinfo',
            description: 'Returns bot information.',
        })
    }
        async run(msg) {
            if (await msg.guild.settings.get('delete-cmd', false))
                await msg.delete()
            let createdTime = new Date(this.client.user.createdTimestamp).toUTCString();
            let embed = new MessageEmbed()
                .setColor(config.defaultColor)
                .setThumbnail(this.client.user.avatarURL({size: 2048}).replace('.webp', '.png'))
                .addField("🤖 General", `• Creado el: ${createdTime}\n• Prefijo: /`)
                .addField("📄 Support", `• Creador del Bot: WordsonAlts#0850\n• Servidor Oficial: https://discord.gg/rApKP2J`)
                .setFooter(`${msg.author.username}`, msg.author.avatarURL() .replace('.webp', '.png'))
                .setTimestamp(Date.now());
            msg.embed(embed)
        }
}
