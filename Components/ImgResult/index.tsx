import { useState, useEffect } from "react";
import * as FileSystem from 'expo-file-system';

import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    Image,
    ScrollView
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Result({ route }) {
    const { text } = route.params
    const imageUrl = { uri: `${text}` }

    const handleDownload = async () => {
        let date = moment().format('YYYYMMDDhhmmss')
        let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
        try {
            const res = await FileSystem.downloadAsync(imageUrl.uri, fileUri)
            saveFile(res.uri)
        } catch (err) {
            console.log("FS Err: ", err)
        }
    }
    
    const saveFile = async (fileUri) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            try {
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                const album = await MediaLibrary.getAlbumAsync('Download');
                if (album == null) {
                    await MediaLibrary.createAlbumAsync('Download', asset, false);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }
            } catch (err) {
                console.log("Save err: ", err)
            }
        } else if (status === "denied") {
            alert("please allow permissions to download")
        }
    }
    


    return (
        <View style={styles.container}>
            <ScrollView >

                <Text style={styles.heading}>Result</Text>
                <View style={{ marginTop: 20,height:400,width:400 }}>
                    <Image style={styles.image}
                        source={{
                            uri: `${text}`,
                        }} />
                </View>


            </ScrollView>
            <View style={styles.download}>
            <FontAwesome5 name="download" size={24} color="black" onPress={handleDownload}/>
          
            </View>
            
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        padding: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

    heading: {
        fontSize: 16,
        fontWeight: "bold"
    },
    image: {
        height: 400,
        width: 400,
    },
    download:{
        marginTop:-50
    }
});
