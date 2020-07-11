exports.guildDelete = async function guildDelete(guild, client){
  client.user.setPresence({activity: {name: `${client.guilds.size} servidores | ${client.commandPrefix}help`, type: "WATCHING"},status: "dnd"});
}