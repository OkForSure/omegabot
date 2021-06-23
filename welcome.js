module.exports = (client) => {
    const channelId = '855825048673714186' // welcome
    const targetChannelId = '855540854797762632' // general

    client.on('guildMemberAdd', member => {
        const message = `Welcome **<@${member.id}>** to **${member.guild.name}**! Make sure to check out ${member.guild.channels.cache.get(targetChannelId).toString()} for chatting! Please read the rules in <#856510416405790720>!` // 856510416405790720 = rules
        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
        member.roles.add('855838156783353886') // 855838156783353886 = main
    })
}