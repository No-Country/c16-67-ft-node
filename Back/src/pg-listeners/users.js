const client = require('./index');

const usersListener = async() => {
    try {
        console.log('Connected to PostgreSQL');
        await client.query('LISTEN user_changes');
    
        client.on('notification', (msg) => {
        if (msg.channel === 'user_changes') {
            const change = JSON.parse(msg.payload);
            console.log('Change in user:', change);
            // Aquí puedes agregar la lógica para actualizar la caché de Redis u otras acciones que necesites realizar
        }
        });
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
    }

}

module.exports = usersListener;