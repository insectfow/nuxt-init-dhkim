import Vue from 'vue';
import JWT from 'jsonwebtoken';

const config = {
    version: '0.4.0',
    name: 'chatting',
    path: {
        campaign: 'campaign',
        dealer: 'dealer',
        market: 'market',
        shops: 'shops',
        rooms: 'rooms',
        users: 'users',
        messages: 'messages'
    },
    chat: {
        type: {
            dealer: 'dealer',
            market: 'market'
        },
        user: {
            type: {
                supervisor: 'supervisor',
                advertiser: 'advertiser',
                influencer: 'influencer',
                purchaser: 'purchaser'
            }
        }
    },
    secret: 'BigBird'
}

Vue.prototype.getConfig = () => {
    return config;
}

Vue.prototype.jwt_decode = (token) => {
    if (!token) {
        console.error('Invalid token');
        return;
    }

    return JWT.verify(token, config.secret);
}

Vue.prototype.jwt_encode = (payload) => {
    if (!payload) {
        console.error('Invalid payload');
        return;
    }

    return JWT.sign(payload, config.secret, {
        algorithm: 'HS256'
    });
}
