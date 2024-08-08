var admin = require("firebase-admin");

var serviceAccount = require("../../cohar-e2d38-firebase-adminsdk-d9bu7-9bc13b9bb2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendNotifications = async (token, title, body) => {
    const message = {
        tokens: token,
        notification: {
            title: title,
            body: body
        }
    }
    try {
        const response = await admin.messaging().sendMulticast(message);
        console.log(response);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = sendNotifications;