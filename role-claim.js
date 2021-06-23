const { ReactionUserManager } = require('discord.js')
const firstMessage = require('./first-message')

module.exports = client =>{
    const channelId = '855825985621196850' // 855825985621196850 = role-claim

    const getEmoji = emojiName => client.emojis.cache.find((emoji) => emoji.name === emojiName)

    const emojis = {
        verysmart: 'verysmart',
        veryfunny: 'veryfunny'
    }

    const reactions = []

    let emojiText = 'Add a reaction to claim a role\n\n'
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }

    firstMessage(client, channelId, emojiText, reactions)

    const handleReaction = (reaction, user, add) => {
        if (user.id === '855824012809732107') { // 855824012809732107 = user: Omega Bot
            return
        }

        const emoji = reaction._emoji.name

        const { guild } = reaction.message

        const roleName = emojis[emoji]
        if (!roleName) {
            return
        }
        const role = guild.roles.cache.find((role) => role.name === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)

        if (add) {
            member.roles.add(role)
        } else{
            member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId){
            handleReaction(reaction, user, true)
        }
    })
    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, false)
        }
        
    })
}