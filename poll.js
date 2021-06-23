module.exports = (client) => {
    const channelsIds = ['855825500784820255'] // 855825500784820255 = poll

    const addReactions = (message) => {
        message.react('👍')

        setTimeout(() => {
            message.react('👎')
        }, 750)
        setTimeout(() => {
            message.react('🆗')
        }, 750)
    }

    client.on('message', async (message) => {
        if (channelsIds.includes(message.channel.id)) {
            addReactions(message)
        } else if (message.content.toLowerCase() === `${config.prefix}poll`) {
            await message.delete()

            const fetched = await message.channel.messages.fetch({ limit: 1 })
            if (fetched && fetched.first()) {
                addReactions(fetched.first())
            }
        }
    })
    
}