module.exports = (oldChannel, newChannel) => {
	let guild = newChannel.guild;

	// Channel's name updated
	if (newChannel.name !== oldChannel.name) {
		console.log(`The channel ${oldChannel.name} is now called ${newChannel.name}.`);
		newChannel.sendMessage(`*The channel **#${oldChannel.name}** is now called ${newChannel}.*`);
	}

	// Channel's topic updated
	if (newChannel.topic !== oldChannel.topic) {
		if(isEmpty(newChannel.topic)) {
			console.log(`The channel ${newChannel.name}'s topic has been deleted.`);
			newChannel.sendMessage(`*The channel ${newChannel}'s topic has been deleted.*`);
		} else {
			console.log(`The channel ${newChannel.name}'s topic has been updated: ${newChannel.topic}`);
			newChannel.sendMessage(`The channel *${newChannel}'s topic has been updated:\n\`\`\`${newChannel.topic}\`\`\`*`);
		}
	}
}