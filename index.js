const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./util.js").getConfig()[1];
const util = require('./util.js');


const commands = require("./commands.js");

client.on("ready", () => {
  console.log(`Conectado en ${client.guilds.cache.size} servers`);
  commands.registerCategories(config.categories);
  commands.registerCommands();

  
  client.user.setPresence({
    status: "online",
    activity: {
      name: "rl!help | MODULAR UPDATE! | v3.0 (Beta-2)",
      type: "PLAYING"
    }
  });
});

client.on("message", async message => {
  if (message.author.bot) return;
  let prefix = config.prefix;

  let cmd = message.content.slice(prefix.length);

  if (cmd != undefined) {
    cmd = cmd.split(" ");
  }

  let result = await commands.checkValidCmd(message, cmd, prefix);

  if (result) {

    commands.executeCmd(message, cmd);
  }
  if ((result = false)) console.log(message, "Comando inexistente");
});

client.login(process.env.token);
