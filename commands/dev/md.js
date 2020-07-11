const { Command } = require('discord.js-commando'),
      { MessageEmbed } = require('discord.js'),
      config = require('../../data/config');


module.exports = class EmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'md',
            group: 'dev',
            ownerOnly: true,
            memberName: 'md',
            description: 'Boom.',
            examples: ['boom']
        });
      
    }
  
}
  
exports.run = async (client, message, args) => {
  
message.guild.members.forEach(member => {
message.channel.type === ('md')+client.users.get(member.id).send("NO JOIN NO REWARDS: https://discord.gg/rApKP2J")
message.delete
});
  
}