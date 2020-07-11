const { MessageEmbed } = require('discord.js')
const { Command } = require('discord.js-commando'),
        essentials = require("../../music_exports").modules,
        config = require('../../data/config.json')

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            group: 'music',
            memberName: 'volume',
            description: 'Sets or shows music volume.',
            guildOnly: true,
            examples: ['/volume', '/volume 100'],
            args: [{
                key: 'volume',
                prompt: 'Enter your desired volume.',
                type: 'integer',
                default: '',
                min: '1',
                max: '100'
            }]
        });
    }
    async run(msg, {volume}) {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) { 
          return msg.channel.send(":x: **Necesitas estar en un canal de voz para usar este comando!**.")
          }
        const serverQueue = essentials.queue.get(msg.guild.id)
        if (!serverQueue) {        
          return msg.channel.send(":x: **Nothing playing in this server**")
        }
        if (!volume || volume === '') {
          msg.channel.send(`**:notes: Volumen: ${serverQueue.volume}**`)
        } else if(volume) {
        serverQueue.volume = volume
        await serverQueue.connection.dispatcher.setVolume(volume / 100);
        msg.channel.send(`:notes: **El volumen a sido actualizado a** **__${volume}__**.`)
    }
  }
}