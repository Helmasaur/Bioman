const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json')

class UnbanCommand extends Command {
	constructor() {
		super('unban', {
			aliases: ['unban', 'ub'],
			category: 'mod',
			args: [
				{
					id: 'unbannedMember',
					type: 'member'
				},
				{
					id: 'reason',
					match: 'rest',
					default: () => i18n.t('unban.noReason')
				}
			],
			channelRestriction: 'guild'
		});
	}

	async exec(msg, args) {
		const bot = guild.me;
		const author = msg.member;
		const unbannedMember = args.unbannedMember;
		const reason = args.reason;

		if (!bot.hasPermission('BAN_MEMBERS')) {
			return msg.reply(i18n.t('unban.noPermission.bot'));
		}

		if (!author.hasPermission('BAN_MEMBERS')) {
			return msg.reply(i18n.t('unban.noPermission.author'));
		}

		await msg.channel.send({embed: this.embed(author.user, unbannedMember.user, reason)});
		unbannedMember.send(i18n.t('unban.pm', { author: author.user, reason : reason, interpolation: { escapeValue: false } }));
		return guild.unban(member.id, {reason: reason});
	}

	embed(author, unbannedMember, reason) {
		return new Discord.RichEmbed()
			.setTitle(i18n.t('commandsUtil:moderation.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(unbannedMember.displayAvatarURL)
			.addField(i18n.t('commandsUtil:moderation.embed.action'), i18n.t('unban.embed.action'), true)
			.addField(i18n.t('commandsUtil:moderation.embed.reason'), reason, true)
			.addBlankField(true)
			.addField(i18n.t('commandsUtil:moderation.embed.member'), unbannedMember, true)
			.addField(i18n.t('commandsUtil:moderation.embed.memberID'), unbannedMember.id, true);
	}
}

module.exports = UnbanCommand;