// redis.client.js
const { createClient } = require('redis');

class RedisClient {
    constructor() {
        this.client = createClient();
        this.isConnected = false;
    }

    async connect() {
        if (!this.isConnected) {
            await this.client.connect();
            this.isConnected = true;
        }
    }

    async ping() {
        await this.connect();
        return await this.client.ping();
    }

    async get(key) {
        await this.connect();
        return await this.client.get(key);
    }

    async set(key, value) {
        await this.connect();
        await this.client.set(key, value);
    }

  // Agrega más métodos según tus necesidades
}

module.exports = RedisClient;