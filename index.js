const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
const ms = require('ms')


const firstMessage = require('./first-message')
const privateMessage = require('./private-message')
const roleClaim = require('./role-claim')
const poll = require('./poll')
const welcome = require('./welcome')
const memberCount = require('./member-count')
const sendMessage = require('./send-message')

client.on('ready', () => {
    console.log('READADYDYYYY')

    command(client, ['ok', '0K'], (message) => {
        message.channel.send('OK')
    })

    command(client ,'servers', message => {
        client.guilds.cache.forEach((guild) =>{
            message.channel.send(`
**${guild.name}**
            
**Members**
${guild.memberCount}`)
        })
    })

    command(client, ['cc','clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'status', message =>{
        const content = message.content.replace('!status ','');

        client.user.setPresence({
            activity: {
                name: content,
                type: 'LISTENING',
            },
        })
        message.channel.send('Status is changed!')

    })

    firstMessage(client, '855824599988043807', 'OKAY! ! ! !', ['🆗','🆚']) // 855824599988043807 = message

    privateMessage(client, 'lmao', 'What is so funny?? ')

    client.users.fetch('809888760698372116').then(user => {
        user.send('ok')
    })

    command(client, 'createtextchannel', (message) => {
        const name = message.content.replace('.createtextchannel ', '')

        message.guild.channels.create(name, {
            type: 'text',
        })
        .then((channel) => {
            const categoryId = '855824838140887100' // 809889609504784445 = create 
            channel.setParent(categoryId)
        })
    })

    command(client, 'createvoicechannel', (message)=> {
        const name = message.content.replace('.createvoicechannel ', '')

        message.guild.channels.create(name, {
            type: 'voice',
        })
        .then((channel) => {
            const categoryId = '855824838140887100' // 855824838140887100 = create
            channel.setParent(categoryId)
            channel.setUserLimit(10)
        })
    })

    command(client, 'embed', (message) => {
        // console.log(message.author)
        const logo = 'https://i.imgur.com/Iq3PpOD.png'
        const embed = new Discord.MessageEmbed()
            .setTitle('Ok')
            .setAuthor(message.author.username)
            .setFooter(message.author.username, logo)
            .setColor('#7388da')
            .addFields(
                {
                    name: 'Ok1', 
                    value: 'Joe ok??',
                    inline: true,
                },
                {
                    name: 'Ok2', 
                    value: 'Joe ok??',
                    inline: true,
                },
                {
                    name: 'Ok3', 
                    value: 'Joe ok??',
                    inline: true,
                }
            )

        message.channel.send(embed)
    })

    command(client, 'serverinfo', message => {
        const { guild}  = message
        // console.log(guild)
        const { name, region, memberCount, owner, afkTimeout } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .setColor('#7388da')
            .addFields(
                {
                    name: 'Region',
                    value: region,
                },
                {
                    name: 'Members',
                    value: memberCount,
                },
                {
                    name: 'Owner',
                    value: owner.user.tag,
                },
                {
                    name: 'AFK Timeout',
                    value: afkTimeout / 60,
                }
            )
            
        message.channel.send(embed)
    })

    command(client, 'help', message => {
        const { prefix } = config
        const logo = message.guild.iconURL()
        const embed = new Discord.MessageEmbed()
            .setTitle(`Help for "${message.guild.name}"`)
            .setFooter(message.author.username, logo)
            .setColor('#7388da')
            .addFields(
                {
                    name: `Prefix    :    ${prefix}`,
                    value: '-',
                    inline: false,
                },
                {
                    name: 'General Commands',
                    value: `
                    ${prefix}help    --    For the commands
                    ${prefix}serverinfo    --    Info of the server
                    ${prefix}ok    --    ok
                    `,
                    inline: false,
                },
                {
                    name: 'Fun',
                    value: `
                    ${prefix}poll    --    To make a message a poll
                    `,
                    inline: false,
                },
                {
                    name: 'Moderation Commands',
                    value: `
                    ${prefix}mute    --    Mute a member from the server
                    ${prefix}kick    --    Kick a member from the server
                    ${prefix}ban    --    Bans a member from the server
                    `,
                    inline: false,
                },
                {
                    name: 'Manager',
                    value:`
                    ${prefix}clearchannel/${prefix}cc    --    Delete the messages from a whole channel

                    `,
                    inline: false,
                }
            )
        
        client.user.setPresence({
            activity: {
                name: `${prefix}help for help`,
                type: 'LISTENING',
            }
        }) 
        message.channel.send(embed)
    })

    roleClaim(client)

    command(client, 'ban', message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`
    
        if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')){
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${tag}, that user is banned.`)
            } else {
                message.channel.send(`${tag}, please specify someone to ban.`)
            }
        } else {
            message.channel.send(`${tag} you don't have the permissions to use this command.`)
        }
    
    })

    command(client, 'kick', message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`
    
        if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')){
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${tag}, that user is kicked.`)
            } else {
                message.channel.send(`${tag}, please specify someone to kick.`)
            }
        } else {
            message.channel.send(`${tag} you don't have the permissions to use this command.`)
        }
    
    })


    poll(client)

    welcome(client)

    memberCount(client)

    const guild = client.guilds.cache.get('855540854797762630')
    const channel = guild.channels.cache.get('855825169627873340') // 855825169627873340 = ok-channel
    sendMessage(channel, 'okoaoka')

    command(client, 'mute', message => {

        const { member, mentions, split, channel, content } = message

        // const sp = content.split(" ")

        const args = message.content.slice(config.prefix.length).trim().split(' ')

        const tag = `<@${member.id}>`

        if (member.hasPermission('MANAGE_MESSAGES')){
            const target = message.guild.member(message.mentions.users.first())
            if (target) {
                const mainRole = message.guild.roles.cache.find(role => role.name === "main")
                const muteRole = message.guild.roles.cache.find(role => role.name === "mute")
                if(!muteRole){
                    message.channel.send(`${tag}, couldn't find the mute role.`)
                }

                const time = args[2]

                if(!time){
                    message.channel.send(`${tag}, specify a time!`)
                }

                target.roles.remove(mainRole.id)
                target.roles.add(muteRole.id)

                message.channel.send(`${tag}, <@${target.id}> is muted for ${ms(ms(time))}.`)

                setTimeout(function(){
                    target.roles.add(mainRole.id)
                    target.roles.remove(muteRole.id)
                    message.channel.send(`<@${target.id}>, you has been unmuted!`)
                }, ms(time))
            } else {
                message.channel.send(`${tag}, please specify someone to mute.`)
            }
        } else {
            message.channel.send(`${tag} you don't have the permissions to use this command.`)
        }
    })

    command(client, 'ticket', (message, args) => {
        const categoryId = '856524721910972427'
        var userName = message.author.username
        var userDiscriminator = message.author.discriminator
        var alreadyTicket = false
        message.guild.channels.cache.forEach(channel => {
            if(channel.name == userName.toLowerCase() + "-" + userDiscriminator){
                alreadyTicket = true
                return message.reply('You already have a ticket!')
            }
        })

        if (alreadyTicket) return;
        var embed = new Discord.MessageEmbed()
            .setTitle('Hello ' + message.author.username)
            .setFooter('You ticket will make!')

        message.channel.send(embed)

        message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
            (createdChannel) => {
                createdChannel.setParent(categoryId).then(
                    (settedParent) => {
                        settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false
                        })
                        settedParent.updateOverwrite(message.author.id,{
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            ATTACH_FILES: true,
                            ADD_REACTIONS: true,
                            CREATE_INSTANT_INVITE: true,
                            READ_MESSAGE_HISTORY: true
                        })

                        var embedParent = new Discord.MessageEmbed()
                            .setTitle(`Hello <@${message.author.id}>`)
                            .setDescription('We will repond!')

                        settedParent.send(embedParent)
                    }
                ).catch(err => {
                    message.channel.send('Something went wrong, please contact Ok.')
                })
            }
        ).catch(err => {
            message.channel.send('Something went wrong, please contact Ok.')
        })

    })
    
    command(client, 'close', (message, args)=>{
        const categoryId = '856855882326081550' // '856855882326081550' = tickets

        if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send((`${message.member.id}, you don't have the permissions to use this command.`))
        if(message.channel.parentID === categoryId){
            message.channel.delete()
        } else {
            message.channel.send('Gelieve dit command te doen in een ticket!')
        }

    })
})

client.login(process.env.token)