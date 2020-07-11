const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../data/config.json')

module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'misc',
			memberName: 'invite',
			description: 'Sends a bot invite link.',
		});
	}

	async run(msg, args) {
    if (await msg.guild.settings.get('delete-cmd', false))
                await msg.delete()
    let embed = new MessageEmbed()
    .setColor(config.defaultColor)
    .setDescription('https://discordapp.com/api/oauth2/authorize?client_id=668110250011918374&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FrApKP2J&response_type=code&scope=bot%20identify');
    msg.embed(embed);
  }
}