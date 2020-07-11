const { MessageEmbed } = require('discord.js')
const { Command } = require('discord.js-commando'),
        essentials = require("../../music_exports").modules,
        config = require('../../data/config.json')

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            aliases: ['fuckoff'],
            description: 'Leaves voice channel.',
            guildOnly: true,
            examples: ['/leave']
        });
    }
    async run(msg) {
        const serverQueue = essentials.queue.get(msg.guild.id)
        if(serverQueue) essentials.queue.delete(msg.guild.id);
        const voiceChannel = msg.member.voice.channel;
         if (!voiceChannel) { 
          return msg.channel.send(":x: **Necesitas estar en un canal de voz para usar este comando!**")
          }
        voiceChannel.leave();
        msg.channel.send('**:mailbox_with_no_mail: Me he desconectado correctamente **')
    }
}