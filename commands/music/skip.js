const { MessageEmbed } = require('discord.js')
const { Command } = require('discord.js-commando'),
        essentials = require("../../music_exports").modules,
        config = require('../../data/config.json')

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            aliases: ['s'],
            memberName: 'skip',
            description: 'Skips currently playing song in voice channel.',
            guildOnly: true,
            examples: ['/skip']
        });
    }
    async run(msg) {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) { 
          return msg.channel.send(":x: **Necesitas estar en un canal de voz para usar este comando!**")
        }
        const serverQueue = essentials.queue.get(msg.guild.id)
        if (!serverQueue) {        
        return msg.channel.send(":x: **Nothing playing in this server**")
        }
        if(serverQueue && voiceChannel) {
        serverQueue.connection.dispatcher.end('El comando para cambiar de canción a sido ejecutado!');
        msg.channel.send(":fast_forward: ***Canción cambiada*** :thumbsup:");
      }
    }
}