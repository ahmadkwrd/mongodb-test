const { MessageEmbed } = require('discord.js')
const { Command } = require('discord.js-commando'),
        essentials = require("../../music_exports").modules,
        config = require('../../data/config.json')

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Pauses music.',
            guildOnly: true,
            examples: ['/pause']
        });
    }
    async run(msg) {
        const serverQueue = essentials.queue.get(msg.guild.id)
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) { 
          return msg.channel.send(":x: **Necesitas estar en un canal de voz para usar este comando!**")
          }
        if (!serverQueue) {
          return msg.channel.send(":x: **Nothing playing in this server**")
        } else {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        msg.channel.send(`**:notes: Paused.**`)
        }
     }
}