
import { useState, useEffect } from "react";
import React from 'react';
import ImgResult from '../ImgResult';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    Pressable,
    SafeAreaView,
    ActivityIndicator,
    Alert
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Spinner from 'react-native-loading-spinner-overlay';
export default function Home() {
    const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(false);




    const navigation = useNavigation<any>();


    const handleSubmit = async () => {

        setLoading(true)
        const info = {
            
            prompt: `${text}`,
           

        }


        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },

            body: JSON.stringify(info)
        }
        )
        const data = await response.json();
        console.log(data)
        const result = data.data[0].url;
        console.log(result)
        setLoading(false)

        navigation.navigate('ImgResult', { text: result })
    }




    if (isLoading) {
        setTimeout(function () {
            if (isLoading) {
                setLoading(false);
                Alert.alert("Oops we ran into a problem");
            }
        }, 30000);
    }


    return (

        <View style={styles.container}>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={isLoading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.heading}>
                        {`Enter the description of Image you want.\nFor now we only provide one Image of resolution 1024x1024 in result to keep API Tokens in limit.`}
                    </Text>
                </View>

                <View style={{ padding: 10, }}>
                    <TextInput

                        multiline={true}
                        style={{ height: 200, backgroundColor: "#e6e6e6", fontSize: 16, textAlignVertical: 'top', color: "black" }}
                        placeholder="Enter Description of Image"
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                        placeholderTextColor="black"

                    />
                </View>
                <View style={{ padding: 10 }}>
                    <Button
                        title="Generate"
                        color="black"
                        onPress={handleSubmit}
                    />

                </View>

            </ScrollView>
            <View style={{ flex: 0.1 }}><Text style={styles.footer}>{`Developed By Harshit Singh\nharshit25102000@gmail.com`}</Text></View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        alignItems: 'stretch',
    },
    heading: {
        fontSize: 16
    },
    footer: {
        position: "absolute",
        left: 98,
        right: 0,
        bottom: 0,
        fontSize: 11,
        zIndex: -1

    },
    spinnerTextStyle: {
        color: "black",
    }
});