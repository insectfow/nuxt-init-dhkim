import Vue from 'vue';
import FBS from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/analytics";
const { VUE_APP_MODE } = process.env.envData;
const config = {
    apiKey: "AIzaSyB57W5lU7tuITZULy4YMIOrIYiiGhESpv4",
    authDomain: "bigbird-live-commerce.firebaseapp.com",
    databaseURL: "https://bigbird-live-commerce.firebaseio.com",
    projectId: "bigbird-live-commerce",
    storageBucket: "bigbird-live-commerce.appspot.com",
    messagingSenderId: "548144834217",
    appId: "1:548144834217:web:c7eb0149eae12772406bb8",
    measurementId: "G-RDVQYWRL8Q"
}
// console.log(VUE_APP_MODE, VUE_APP_MODE === 'production' ? config.prod : config.dev);

const params = {
    setting: null,
    payload: null,
    environ: {
        isChatty: false,
        isBanned: false,
        isMuted: false
    }
}

const fb = {
    chat: null,
    dbms: null,
    auth: null
}

const db = {
    dealer: {
        users: null,
        messages: null
    },
    market: {
        users: null,
        messages: null
    }
}

function isLoggedIn(user_id) {
    return user_id ? true : false;
}

function checkUpValidation(instance) {
    console.assert(instance, 'Check Up Instance Valid');
}

function getTimestamp() {
    return FBS.firestore.FieldValue.serverTimestamp();
}

function getCurrentUser() {
    return fb.auth.currentUser;
}

function createUserProfile(uid, id) {
    checkUpValidation(params.payload.user);

    let user = null;
    if (params.payload.user.type != params.setting.chat.user.type.purchaser) {
        user = db.dealer.users.doc(id);
    }
    else {
        user = db.market.users.doc(id);
    }
    user.set({
        id: id,
        uid: uid,
        type: params.payload.user.type,
        name: params.payload.user.name,
        nickname: params.payload.user.nickname,
        phone: params.payload.user.phone,
        email: params.payload.user.email,
        muted: false,
        banned: false,
        chatty: false,
        logged_in: true,
        created_at: getTimestamp(),
        modified_at: getTimestamp(),
        stats: {
            muted: {
                count: 0,
            }
        }
    });
}

function updateUserStatus(id, status) {
    checkUpValidation(params.payload.user);

    let user = null;
    if (params.payload.user.type != params.setting.chat.user.type.purchaser) {
        user = db.dealer.users.doc(id);
    }
    else {
        user = db.market.users.doc(id);
    }
    user.update(status);
}

function updateUserProfile(user) {
    if (params.payload.user.id == user.displayName) {
        console.log(user.displayName, 'is already logged in.');
        return;
    }

    // TODO : check if user is banned
    // db.market.users.doc(user.displayName)

    // Check Payload & DB available!
    checkUpValidation(params.payload.user);
    if (params.payload.user.type != params.setting.chat.user.type.purchaser) {
        console.assert(db.dealer.messages && db.dealer.users,
            'DB Dealer has not been set');
    }
    console.assert(db.market.messages && db.market.users,
        'DB Market has not been set');

    user.updateProfile({
        /* Update Anonymous
         * User Profile
         */
        displayName: params.payload.user.id,
        phoneNumber: params.payload.user.phone,
        email: params.payload.user.email
    }).then(function () {
        let docRef = null;
        let doc_id = user.displayName;

        if (params.payload.user.type != params.setting.chat.user.type.purchaser) {
            docRef = db.dealer.users.doc(doc_id).get();
        }
        else {
            docRef = db.market.users.doc(doc_id).get();
        }
        docRef.then(function (doc) {
            if (!doc.exists) {
                createUserProfile(user.uid, doc_id);
            }
            else {
                let status = {
                    uid: user.uid,
                    modified_at: getTimestamp()
                };
                updateUserStatus(doc_id, status);
            }
        }).catch(function (error) {
            console.error('Error at updateProfile :', error);
        });
    }).catch(function (error) {
        console.error('Error at updateUserProfile : ', error);
    });
}

Vue.prototype.fb_chat_init = (setting, payload) => {
    console.log('fb_chat_init');
    if (FBS.apps.length === 0) {
        fb.chat = FBS.initializeApp(config);
        fb.dbms = FBS.firestore();
        fb.auth = FBS.auth();

        FBS.setLogLevel('info');
        FBS.performance();
        FBS.analytics();
    }


    console.assert(fb.chat, 'Firebase has not been initialized');
    console.assert(fb.dbms, 'Database has not been initialized');
    console.assert(fb.auth, 'Authentication has not been set');

    fb.auth.signInAnonymously().catch(function (error) {
        console.error('Error at Login : ', error);
    });

    params.setting = setting;
    params.payload = payload;

    /* FireStore DB Path Scheme
     * dealer home : chatting.<version>.campaign.<campaign-id>.shops.<shop-id>.rooms
     * market home : chatting.<version>.campaign.<campaign-id>.shops.<shop-id>.rooms
     */
    const db_path = params.setting.name + '/' + params.setting.version + '/' +
        params.setting.path.campaign + '/' + params.payload.campaign.id + '/' +
        params.setting.path.shops + '/' + params.payload.shop.id + '/' + params.payload.shop.type;
    const db_home = fb.dbms.collection(db_path);

    if (params.payload.user.type != params.setting.chat.user.type.purchaser) {
        db.dealer.messages = db_home.doc(params.setting.path.dealer).collection(params.setting.path.messages);
        db.dealer.users = db_home.doc(params.setting.path.dealer).collection(params.setting.path.users);
    }
    db.market.messages = db_home.doc(params.setting.path.market).collection(params.setting.path.messages);
    db.market.users = db_home.doc(params.setting.path.market).collection(params.setting.path.users);
}

// Vue.prototype.fb_chat_login = () => {
//     checkUpValidation(params.payload);

//     fb.auth.onAuthStateChanged(function (user) {
//         if (!user) {
//             console.error('Error at Login : Not Logged In');
//         }
//         else {
//             updateUserProfile(user);
//         }
//     });

// }
Vue.prototype.fb_chat_login = () => {
    console.log('fb_chat_login');
    checkUpValidation(params.payload);

    fb.auth.setPersistence(FBS.auth.Auth.Persistence.SESSION);
    fb.auth.signInAnonymously().catch(function (error) {
        console.error('Error at Login : ', error);
    }).finally(function () {
        fb.auth.onAuthStateChanged(function (user) {
            console.assert(user, 'Fail to Sign In');
            updateUserProfile(user);
        });
    })
}

Vue.prototype.fb_chat_logout = () => {
    const user = getCurrentUser();
    console.assert(user && user.displayName, 'No user exist');
    console.assert(params.payload.user.id == user.displayName);
    console.log(user.displayName, 'has been logged out');

    updateUserStatus(params.payload.user.id, {
        modified_at: getTimestamp(),
        logged_in: false
    });

    fb.auth.signOut();
}

Vue.prototype.fb_chat_send_message = (data, type) => {
    checkUpValidation(params.payload.user);
    let user = getCurrentUser();
    checkUpValidation(user);

    let message = {
        user: {
            type: params.payload.user.type,
            name: params.payload.user.name,
            id: user.displayName
        },
        data: data,
        hidden: false,        
        created_at: getTimestamp(),
        modified_at: getTimestamp(),
    };

    if (type == params.setting.chat.type.dealer) {
        console.assert(params.payload.user.type != params.setting.chat.user.type.purchaser,
            'Invalid user type :', params.payload.user.type);
        db.dealer.messages.add(message).catch(function (error) {
            console.error('Error at fb_chat_save_message :', error);
        });
    }
    else {
        if (params.environ.isBanned || params.environ.isMuted) {
            console.info(params.payload.user.id, 'is not permitted');
            return;
        }
        if (params.environ.isChatty == false) {
            params.environ.isChatty = !params.environ.isChatty;
            updateUserStatus(params.payload.user.id, {
                modified_at: getTimestamp(),
                chatty: true
            });
        }
        db.market.messages.add(message).catch(function (error) {
            console.error('Error at fb_chat_save_message :', error);
        });
    }
}

Vue.prototype.fb_chat_load_message = (func, type, limit) => {
    console.log('fb_chat_load_message');
    let messages = null;
    if (type == params.setting.chat.type.dealer) {
        checkUpValidation(db.dealer.messages);
        messages = db.dealer.messages
            .orderBy('created_at', 'asc');
    }
    else {
        checkUpValidation(db.market.messages);
        if (limit && limit > 0) {
            messages = db.market.messages
            .where('hidden', '==', false)
            .orderBy('created_at', 'desc')
            .limit(limit);

        }
        else {
            messages = db.market.messages
            .where('hidden', '==', false)
            .orderBy('created_at', 'asc');
        }

    }

    messages.onSnapshot(function (list) {
        list.docChanges().forEach(function (message) {
            // func(message.doc.data());
            if (message.type === 'added') {
                func(message.doc.data());
            }
        });
    });
}

Vue.prototype.fb_chat_load_userlist = (func, expr) => {
    checkUpValidation(db.market.users);

    switch (expr) {
        case 'muted':
            db.market.users
                .where('logged_in', '==', true)
                .where('muted', '==', true)
                .orderBy('modified_at', 'desc')
                .onSnapshot(function (users) {
                    users.docChanges().forEach(function (user) {
                        func(user.doc.data(), user.type);
                    });
                });
            break;
        case 'banned':
            db.market.users
                .where('logged_in', '==', true)
                .where('banned', '==', true)
                .orderBy('modified_at', 'desc')
                .onSnapshot(function (users) {
                    users.docChanges().forEach(function (user) {
                        func(user.doc.data(), user.type);
                    });
                });
            break;
        case 'all':
        default:
            // All
            db.market.users
                .orderBy('created_at', 'desc')
                .onSnapshot(function (users) {
                    users.docChanges().forEach(function (user) {
                        func(user.doc.data(), user.type);
                    });
                });
            break;
    }
}
Vue.prototype.fb_chat_load_userinfo = (func) => {
    console.assert(params.payload.user.type == params.setting.chat.user.type.purchaser,
        'Invalid user type :', params.payload.user.type);
    checkUpValidation(db.market.users);

    // db.market.users
    const users = db.market.users;
    users.where('id', '==', params.payload.user.id)
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                func(change.doc.data(), change.type);
                const userinfo = change.doc.data();
                params.environ.isMuted = userinfo.muted;
                params.environ.isBanned = userinfo.banned;

                if (params.environ.isMuted
                    && !params.environ.isBanned) {
                    const muted = userinfo.stats.muted;
                    const mute = params.setting.chat.user.mute;
                    const user = users.doc(params.payload.user.id);
                    if (++muted.count < mute.limit.count) {
                        setTimeout(() => {
                            params.environ.isMuted = false;                            
                            user.update({
                                muted: params.environ.isMuted,
                                modified_at: getTimestamp(),
                                stats: {
                                    muted: {
                                        count: muted.count
                                    }
                                }
                            });                            
                        }, mute.limit.timeout);
                    }
                    else {
                        params.environ.isBanned = true;
                        user.update({
                            banned: params.environ.isBanned,
                            modified_at: getTimestamp()
                        })
                    }
                }
            });
        });
}

Vue.prototype.fb_chat_user_state = (user_id, state, value, func) => {
    console.assert(params.payload.user.type != params.setting.chat.user.type.purchaser,
        'Invalid user type :', params.payload.user.type);
    checkUpValidation(db.market.users);

    const user = db.market.users.doc(user_id);
    user.get().then(function (doc) {
        if (! doc.exists) {
            console.error('Error at fb_chat_user_state : found no user :', user_id);
            return;
        }

        switch (state) {
            case 'banned':
                user.update({
                    banned: value,
                    modified_at: getTimestamp(),                    
                });
                break;
            case 'muted':
                user.update({
                    muted: value,
                    modified_at: getTimestamp(),                   
                });
                break;
            default:
                console.error('Error at fb_chat_user_state : Unknown state =>', state);
                break;
        }

        if (func) {
            func(user_id);
        }
    }).catch(function (error) {
        console.error('Error at fb_chat_user_state :', error);
    });
}

Vue.prototype.fb_chat_user_count = (func, expr) => {
    checkUpValidation(db.market.users);

    switch (expr) {
        case 'logged_in':
            db.market.users
                .where('logged_in', '==', true)
                .where('banned', '==', false)
                .get().then( (snapshot) => func(snapshot.docs.length,'logged_in') );
            break;
        case 'chatty':
            db.market.users
                .where('logged_in', '==', true)
                .where('chatty', '==', true)
                .where('banned', '==', false)
                .get().then( (snapshot) => func(snapshot.docs.length, 'chatty') );
            break;
        default:
            console.error('Error at fb_chat_user_count : unknown func or expr');
            break;
    }
}


