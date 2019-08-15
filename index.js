const Discord = require("discord.js");
//vThis is so that the console is more readable for end-user hosting
const colors = require("colors");
const fs = require("fs");
const bot = new Discord.Client();
const commandPrefix = ">"
bot.commands = new Discord.Collection();
var cmds = "./commands/"


if (!fs.existsSync(cmds))
{
    fs.mkdirSync(cmds);
    console.log("Couldn't find commands. creating folder");
}
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err.red);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find any commands.".red)
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
    });
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`.green);
});


//check if message is a command
function checkMessageForCommand(msg, isEdit) {
  console.log(`User ${msg.author.tag} has used the command ${msg}`)
    if(msg.author.id != bot.user.id && (msg.content.startsWith({commandPrefix}))){
        console.log("\"treating " + msg.content +"\" from " + msg.author + " as command");
        var cmdTxt = msg.content.split(" ")[0].substring(botconfig.commandPrefix.length);
        // var suffix = msg.content.substring(cmdTxt.length+botconfig.commandPrefix.length+1);//add one for the ! and one for the space
        if(msg.isMentioned(bot.user)){
            return;
            }
        }
    }

bot.on("message", async message => {
  if(!message.content.startsWith(commandPrefix))
  {
      return;
  }
  
  if(!checkMessageForCommand(message, false))
  {
      if(message.author.bot) 
      {
          return;
      }
      if(message.channel.type == "dm")
      {
          return;   
      } 
      let messageArray = message.content.split(" ");
      let cmd = messageArray[0];
      let args = messageArray.slice(1);
      let commandfile = bot.commands.get(cmd.slice(commandPrefix.length));
      if(commandfile) commandfile.run(bot,message,args);

  }

});

bot.login('token');
