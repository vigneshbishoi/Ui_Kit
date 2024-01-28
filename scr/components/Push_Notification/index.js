import { notifications } from 'react-native-firebase';
import { msgNotification } from './LocalNotification'

var PushNotification = require("react-native-push-notification");


const LocalNotification = (value, navigation) => {
    PushNotification.configure({

        onRegister: function (token) {
            console.log("TOKEN:", token);
            //   alert(JSON.stringify(token))
        },

        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            //   alert(JSON.stringify(notification.data))
            //   if(notification.data == {"screen":"list"}){
            //         alert("Done")
            //   }
            {
                value == true ?
                msgNotification(notification)
                : null
            }
            {
                value != true ?
                navigation.navigate('Profile1')
                : null
            }
            onclick = false;
            // navigation.navigate('Profile1')
            const clicked = notification.userInteraction
            if (clicked) {
                alert('Hello')
            } else {
                // PushNotification.localNotification({
                //     message: notification.message
                // })
            }

        },

        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            alert('hiii')
        },


        onRegistrationError: function (err) {
            console.error(err.message, err);
        },

        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },


        popInitialNotification: true,

        requestPermissions: true,

    });
}

export default LocalNotification;
