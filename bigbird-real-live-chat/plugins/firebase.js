import Vue from 'vue';
import FBS from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/analytics";
const { VUE_APP_MODE } = process.env.envData;
const config = {
    prod: {
        apiKey: "AIzaSyDsICwMNaMAPwWw-uEj3m_hBfG5BrVb3JA",
        authDomain: "bb-ops-group-live-commerce.firebaseapp.com",
        databaseURL: "https://bb-ops-group-live-commerce.firebaseio.com",
        projectId: "bb-ops-group-live-commerce",
        storageBucket: "bb-ops-group-live-commerce.appspot.com",
        messagingSenderId: "868931684582",
        appId: "1:868931684582:web:8f6837633e6960a3b01327",
        measurementId: "G-PP4593QM86"
    },
    dev: {
        apiKey: "AIzaSyDqPCKr7uYm1gSsV5HIZKbTeHpD6FK-ei4",
        authDomain: "bb-dev-group-live-commerce.firebaseapp.com",
        databaseURL: "https://bb-dev-group-live-commerce.firebaseio.com",
        projectId: "bb-dev-group-live-commerce",
        storageBucket: "bb-dev-group-live-commerce.appspot.com",
        messagingSenderId: "69251196568",
        appId: "1:69251196568:web:4027481deda6054b6652ed",
        measurementId: "G-0QZTXYZZ89"
    }
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

function createUserProfile(user, id) {
    checkUpValidation(params.payload.user);

    let docRef = null;
    if (params.payload.user.type != params.setting.chat.user.type.purchaser) {
        docRef = db.dealer.users.doc(id);
    }
    else {
        docRef = db.market.users.doc(id);
    }
    docRef.set({
        id: id,
        uid: user.uid,
        name: params.payload.user.name,
        type: params.payload.user.type,
        phone: params.payload.user.phone,
        email: params.payload.user.email,
        nickName: params.payload.user.nickname,
        muted: false,
        banned: false,
        chatty: false,
        logged_in: true,
        created_at: getTimestamp(),
        modified_at: getTimestamp()
    });
}

function updateUserStatus(id, data) {
    checkUpValidation(params.payload.user);

    let docRef = null;
    if (params.payload.user.type != params.setting.chat.user.type.purchaser) {
        docRef = db.dealer.users.doc(id);
    }
    else {
        docRef = db.market.users.doc(id);
    }
    docRef.update(data);
}

function updateUserProfile(user) {
    // if (isLoggedIn(user.displayName)) {
    //     console.log(user.displayName, 'is already logged in.');
    //     return;
    // }

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
                createUserProfile(user, doc_id);
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
    if (FBS.apps.length === 0) {
        fb.chat = FBS.initializeApp(VUE_APP_MODE === 'production' ? config.prod : config.dev);
        fb.dbms = FBS.firestore();
        fb.auth = FBS.auth();

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
        params.setting.path.shops + '/' + params.payload.shop.id + '/' +
        params.setting.path.rooms;
    const db_home = fb.dbms.collection(db_path);

    if (params.payload.user.type != params.setting.chat.user.type.purchaser) {
        db.dealer.messages = db_home.doc(params.setting.path.dealer).collection(params.setting.path.messages);
        db.dealer.users = db_home.doc(params.setting.path.dealer).collection(params.setting.path.users);
    }
    db.market.messages = db_home.doc(params.setting.path.market).collection(params.setting.path.messages);
    db.market.users = db_home.doc(params.setting.path.market).collection(params.setting.path.users);


}

Vue.prototype.fb_chat_login = () => {
    checkUpValidation(params.payload);

    fb.auth.onAuthStateChanged(function (user) {
        if (!user) {
            console.error('Error at Login : Not Logged In');
        }
        else {
            updateUserProfile(user);
        }
    });

}

Vue.prototype.fb_chat_logout = () => {
    let user = getCurrentUser();
    console.assert(user && user.displayName, 'No user exist');

    updateUserStatus(user.displayName, {
        modified_at: getTimestamp(),
        logged_in: false
    });

    fb.auth.signOut();
}

Vue.prototype.fb_chat_load_userlist = (func) => {
    checkUpValidation(db.market.users);
    db.market.users
        .orderBy('created_at', 'desc')
        .onSnapshot(function (list) {
            list.docChanges().forEach(function (user) {
                if (user.type === 'added') {
                    func(user.doc.data());
                }
            });
        });
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
        moderator: {
            filtered: false
        },
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
        if (params.environ.isChatty == false) {
            params.environ.isChatty = !params.environ.isChatty;
            updateUserStatus(user.displayName, {
                modified_at: getTimestamp(),
                chatty: true
            });
        }
        db.market.messages.add(message).catch(function (error) {
            console.error('Error at fb_chat_save_message :', error);
        });
    }
}

Vue.prototype.fb_chat_load_message = (func, type) => {
    let messages = null;
    if (type == params.setting.chat.type.dealer) {
        checkUpValidation(db.dealer.messages);
        messages = db.dealer.messages
            .orderBy('created_at', 'asc');
    }
    else {
        checkUpValidation(db.market.messages);
        messages = db.market.messages
            .where('hidden', '==', false)
            .where('moderator.filtered', '==', false)
            .orderBy('created_at', 'desc')
            .limit(10);

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

Vue.prototype.fb_chat_user_count = (func, expr) => {

    switch (expr) {
        case 'logged_in':
            checkUpValidation(db.market.users);
            db.market.users
                .where('logged_in', '==', true)
                .where('banned', '==', false)
                .get().then((snapshot) => func(snapshot.docs.length));
            break;
        case 'chatty':
            checkUpValidation(db.market.users);
            db.market.users
                .where('logged_in', '==', true)
                .where('chatty', '==', true)
                .where('banned', '==', false)
                .get().then((snapshot) => func(snapshot.docs.length));
            break;
        default:
            console.error('Error at fb_chat_user_count : unknown func or expr');
            break;
    }

}
