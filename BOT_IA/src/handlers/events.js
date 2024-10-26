const fs = require('fs');

module.exports = (client) => {
    const loadEvents = dirs => {
        const events = fs.readdirSync(`./src/events/${dirs}/`).filter(f => f.endsWith('js'));
        for (let file of events) {
            let eventName = file.split('.')[0];
            const event = require(`../events/${dirs}/${file}`);
            console.log(`🎧 O evento ${eventName} foi carregado com sucesso.`);
            client.on(eventName, event.bind(null, client));
        }
    };

    fs.readdirSync('./src/events/').forEach(x => loadEvents(x));
};