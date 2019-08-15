const Discord = require("discord.js");

module.exports.help = {
    name:"purge",
    category:"Moderation",
    description:"Deletes messages. Can only reach 100 messages, and nothing past two weeks.",
    usage:".purge [1-100]"
}


module.exports.run = async (bot, message, args) => {    
    //let adminRole = message.member.roles.find(role => role.name === "Badmin");
    let mAdmin = "133053674996891649";
    //let mAdmin = "144480072819015681";
    try{
        message.delete()
    }catch(err)
    {
        console.error(error);
        //message.channel.send("Sorry, I don't have the permission needed for that.");
    }
    //Add check if creator or admin
    
    if(message.author.id != mAdmin) {
        // This tells the user in chat that they need the role.
        message.channel.send(`You need the Badmin role to use this command.`); 
        return;
    }
    if (isNaN(args[0])) {
        message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>');
        return;
    }
    if (args[0] > 100){
        message.channel.send('Cannot delete more than 100 messages.')
    }
    const fetched = await message.channel.fetchMessages({limit: args[0]});
    console.log(fetched.size + ' messages found, deleting...');
    message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`Error: ${error}`.red));

}