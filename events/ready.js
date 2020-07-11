exports.ready = async function ready(client) {
  client.user.setPresence({activity: {name: `${client.guilds.size} servidores | ${client.commandPrefix}help`, type: "WATCHING"},status: "dnd"});
  console.log(`[Worex] Logged on as ${client.user.tag}`);    
};
