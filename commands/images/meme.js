const { Command } = require('discord.js-commando'),
      { MessageEmbed } = require('discord.js'),
      config = require('../../data/config'),
      snekfetch = require('snekfetch');

module.exports = class MemeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'meme',
      group: 'images',
      memberName: 'meme',
      description: 'Ver un meme Random.',
    });
  }

    async run( msg ) {
      if (await msg.guild.settings.get('delete-cmd', false))
                await msg.delete()
      try {
        let embed = new MessageEmbed()
            .setTitle(`${config.loading} Buscando...`)
            .setDescription("Buscando un meme chido ;).")
            .setColor("#48beec")
        msg.embed(embed).then(async msg => {
            const { body } = await snekfetch
              .get('https://www.reddit.com/r/SpanishMeme.json?sort=top&t=week')
              .query({ limit: 800 });
            
            const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return msg.channel.send('It seems we are out of fresh memes!, Try again later.');
            const randomnumber = Math.floor(Math.random() * allowed.length)

            let foundMeme = new MessageEmbed()
                .setColor(config.defaultColor)
                .setTitle(allowed[randomnumber].data.title)
                .setImage(allowed[randomnumber].data.url)
                .setFooter(`${msg.author.username}`, msg.author.avatarURL() .replace('.webp', '.png'))
                .setTimestamp(Date.now());
            msg.edit("", foundMeme);
        })
      } catch (err) {
        let embed = new MessageEmbed()
            .setDescription(`${msg.author}, I have encountered an error: \`${err.message}\``)
            .setColor(config.errorColor)
            .setTimestamp(Date.now());
        msg.embed(embed)};
  }
}