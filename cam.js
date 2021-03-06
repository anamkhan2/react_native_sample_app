import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera'
import { View, Text, TouchableOpacity } from 'react-native';import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const  CameraApp = () => {
    let [hasPermission, setPermission] = useState(null);
    let [type, setType]  = useState(Camera.Constants.Type.front);
    let cameraRef = useRef(null)
    
    useEffect(() => {
        getPermissionAsync()
    }); 

    getPermissionAsync = async () => {
        // Camera roll Permission 
        if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setPermission(status === 'granted');
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        }

    handleCameraType=()=>{
    
        setType(
          type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
        )
      }
    
    takePicture = async () => {
    if (cameraRef) {
        let photo = await cameraRef.takePictureAsync();
    }
    }

    if (hasPermission === null) {
    return <View />;
    } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    } else {
    return (
        <Camera style={{ flex: 1, width: 415 }} type={type} ref={cameraRef}>
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                <TouchableOpacity
                    style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',                  
                    }}
                    onPress={()=>this.pickImage()}
                    >
                    <Ionicons
                        name="ios-photos"
                        style={{ color: "#fff", fontSize: 40}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    }}
                    onPress={()=>this.takePicture()}
                    >
                    <FontAwesome
                        name="camera"
                        style={{ color: "#fff", fontSize: 40}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    }}
                    onPress={()=>this.handleCameraType()}
                    >
                    <MaterialCommunityIcons
                        name="camera-switch"
                        style={{ color: "#fff", fontSize: 40}}
                    />
                </TouchableOpacity>
            </View>
        </Camera>
    );       
    } 
}

export default Cam; 