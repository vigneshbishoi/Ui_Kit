import {check, request,PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

const PLATFROM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
}

const PLATFROM_GALLERY_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    andriod: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
}

const REQUEST_PERMISSION_TYPE = {
    camera :PLATFROM_CAMERA_PERMISSIONS,
    photo : PLATFROM_GALLERY_PERMISSIONS
}

const PERMISSIONS_TYPE = {
    camera: 'camera',
    photo: 'photo'
} 

class AppPermission {

    checkPermissoin = async (type): Promise<boolean> => {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        if(!permissions){
            return true
        }
        try{
            const result = await check(permissions)
            if(result === RESULTS.GRANTED)  return true 
            return this.requestPermission(permissions)
        }catch(error){
             return false
        }
    }

    requestPermission = async (permissions):  Promise<boolean> => {
        try{
            const result = await request(permissions)
            return result === RESULTS.GRANTED
        }catch(error){
            return false
        }
    }
}

const Permission = new AppPermission()
export {Permission, PERMISSIONS_TYPE}