const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json')

class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick', 'k'],
			category: 'moderation',
			args: [
				{
					id: 'kickedMember',
					type: 'member'
				},
				{
					id: 'reason',
					match: 'rest',
					default: () => i18n.t('commandsUtil:moderation.noReason')
				}
			],
			channelRestriction: 'guild'
		});
	}

	async exec(msg, args) {
		const bot = msg.guild.me;
		const author = msg.member;
		const kickedMember = args.kickedMember;
		const reason = args.reason;

		if (!bot.hasPermission('KICK_MEMBERS')) {
			return msg.reply(i18n.t('kick.noPermission.bot.members'));
		}
		
		if (kickedMember.id === author.id ) {
			if (author.id === msg.guild.ownerID) {
				return msg.reply(i18n.t('kick.noPermission.owner'));
			} else {
				author.kick();
				return msg.channel.send(i18n.t('kick.kicked.author', { member: author, interpolation: { escapeValue: false } }));
			}
		}
		
		if (!author.hasPermission('KICK_MEMBERS')) {
			return msg.reply(i18n.t('kick.noPermission.author.members'));
		}
		
		if (!(author.highestRole.position > kickedMember.highestRole.position)) {
			return msg.reply(i18n.t('kick.noPermission.author.role', { member: kickedMember, interpolation: { escapeValue: false } }));
		}

		if (kickedMember.id === bot.id) {
			return msg.reply(i18n.t('kick.noPermission.author.bot'));
		}

		if (!kickedMember.kickable) {
			return msg.reply(i18n.t('kick.noPermission.bot.role', { member: kickedMember, interpolation: { escapeValue: false } }));
		}

		await msg.channel.send({embed: this.embed(author.user, kickedMember.user, reason)});
		await kickedMember.send(i18n.t('kick.kicked.pm', { author: author, reason : reason, interpolation: { escapeValue: false }}));
		const invite = await msg.guild.defaultChannel.createInvite({maxAge: 0, maxUses: 1});
		await kickedMember.send(invite.url);
		return kickedMember.kick(reason);
	}

	embed(author, kickedMember, reason) {
		return new Discord.RichEmbed()
			.setTitle(i18n.t('commandsUtil:moderation.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			//.setImage('https://img1.closermag.fr/var/closermag/storage/images/media/images-des-contenus/article/2016-08-04-corbier-l-ancien-complice-de-dorothee-je-deviens-ce-que-les-medias-ont-fait-de-moi-c-est-a-dire-rien/archive-corbier-1989/5405200-2-fre-FR/Archive-Corbier-1989_exact1024x768_l.jpg')
			.setThumbnail(kickedMember.displayAvatarURL)
			.addField(i18n.t('commandsUtil:moderation.embed.action'), i18n.t('kick.embed.action'), true)
			.addField(i18n.t('commandsUtil:moderation.embed.reason'), reason, true)
			.addBlankField(true)
			.addField(i18n.t('commandsUtil:moderation.embed.member'), kickedMember, true)
			.addField(i18n.t('commandsUtil:moderation.embed.memberID'), kickedMember.id, true);
	}
	
}

module.exports = KickCommand;