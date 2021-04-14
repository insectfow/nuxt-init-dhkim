import Vue from 'vue';
import JWT from 'jsonwebtoken';

const config = {
    version: '0.6.0',
    name: 'chatting',
    path: {
        campaign: 'campaign',
        dealer: 'dealer',
        market: 'market',
        shops: 'shops',
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
            },
            mute: {
                limit: {
                    count: 3,
                    timeout: 3 * 60 * 1000
                }
            }
        }
    },
    secret: 'BigBird'
}

Vue.prototype.getConfig = () => {
    console.log('config');
    return config;
}

Vue.prototype.jwt_decode = (token) => {
    console.log('decode');

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
