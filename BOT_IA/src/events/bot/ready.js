module.exports = async (client) => {
    const status = [
        'https://github.com/Carloss0101', 	
];
	client.user.setActivity(status[0]);
	client.user.setStatus('online');
	console.log('✅ ' + client.user.username + ' está online!');
};
