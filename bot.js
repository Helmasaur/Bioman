const Discord = require('discord.js');
const configuration = require('./configuration.json');
const bot = new Discord.Client();

bot.on('ready', () => {
	console.log('I am ready!');
});

bot.on('presenceUpdate', (oldMember, newMember) => {
	let guild = newMember.guild;

	if (newMember.presence.status === 'online') {
		guild.defaultChannel.sendMessage('**' + newMember.user + ' s\'est connecté(e).**');
	}
	else if (newMember.presence.status === 'offline') {
		guild.defaultChannel.sendMessage('**' + newMember.user + ' s\'est déconnecté(e).**');
	}
});

bot.on('message', message => {
	if (message.author.bot || !message.content.startsWith(configuration.prefix)) {
		return;
	}
	else {
		let command = message.content.split(' ')[0];
		command = command.slice(configuration.prefix.length);
		let arguments = message.content.split(' ').slice(1);

		if (arguments.length === 1) {
			if(command === 'ttb') {
				if (arguments[0] === 'charlotte') {
					message.channel.sendMessage('Char ! Char ! Charlotte !');
				}
				else if (arguments[0] === 'choucroute') {
					message.channel.sendMessage('Le saviez-vous ? Choucroute est mignonne ! Maintenant, oui.');
				}
				else if (arguments[0] === 'helmasaur') {
					message.channel.sendMessage('Helma ! Helma ! Helmasaur !');
				}
				else if (arguments[0] === 'horsengel') {
					message.channel.sendMessage('Horsengel sera *kick*.');
				}
				else if (arguments[0] === 'neru') {
					message.channel.sendMessage(':regional_indicator_f: :regional_indicator_a: :regional_indicator_u: :regional_indicator_t: :regional_indicator_a: :regional_indicator_n: :regional_indicator_e: :regional_indicator_r: :regional_indicator_u:');
				}
				else if (arguments[0] === 'orange') {
					message.channel.sendMessage('Ne s\'agit-il pas du patriarche ?');
				}
				else if (arguments[0] === 'thouka') {
					message.channel.sendMessage('Touh ! Touh ! Touhka !');
				}

				else if (arguments[0] === 'h+c') {
					message.channel.sendMessage(':evergreen_tree: :spy: :candy: :girl: :underage: :articulated_lorry: :upside_down: :girl: :heart: :spy: :ring: :wedding: :stars:');
				}
			}
		}
		else if (command === 'bouh') {
			message.channel.sendMessage('Bouh toi-même !');
		}
		else if (command === 'lune') {
			message.channel.sendMessage(':full_moon: :waning_gibbous_moon: :last_quarter_moon: :waning_crescent_moon: :new_moon: :waxing_crescent_moon: :first_quarter_moon: :waxing_gibbous_moon: :full_moon:')
		}
		else {
			message.channel.sendMessage('Je suis Bioman.');
		}
	}
});

bot.login(configuration.token);
