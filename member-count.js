module.exports = (client) => {
    const channelId = '855825325895188500' // Member Count

    const updateMembers = (guild) => {
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
    }
    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))

    const guild = client.guilds.cache.get('855540854797762630')
    updateMembers(guild)
}