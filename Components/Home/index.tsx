
import { useState, useEffect } from "react";
import React from 'react';
import Result from '../Result';
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

    
    const [instruction, setInstruction] = useState('');

    const navigation = useNavigation<any>();
    const handleSubmit=()=>{
        if (instruction===''){
            handlecompletion();
        }
        else{
            handleedit();
        }
    }

    const handlecompletion = async() => {
        setLoading(true)
        const info={model: "text-davinci-003",
        prompt:`${text}`,
        max_tokens: 2048,
        temperature: 0,

        }
        

        const response=await fetch('https://api.openai.com/v1/completions',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
            
        body:JSON.stringify(info)
    }
        )
        const data= await response.json();
        console.log(data)
        const result=data.choices[0].text
        setLoading(false)
       
        navigation.navigate('Result', { text: result })
    }


    const handleedit = async() => {
        setLoading(true)
        const info={model: "text-davinci-edit-001",
        input:`${text}`,
        instruction:`${instruction}`

        }
        

        const response=await fetch('https://api.openai.com/v1/edits',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
            
        body:JSON.stringify(info)
    }
        )
        const data= await response.json();
        
        const result=data.choices[0].text
        setLoading(false)
       
        navigation.navigate('Result', { text: result })
    }

    if(isLoading){
    setTimeout(function() {
        if (isLoading) {
            setLoading(false);
            Alert.alert("Oops we ran into a problem");
        }
    }, 30000);}


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
                        {`Instructions can be "Translate into Spanish" , "Summarize this email" , "fix the spelling mistakes".\nPrompt is the text on which you want to apply your instruction.If you want to generate a textbleave instruction empty.\nFor Eg- Prompt will be "Write an essay on Democracy" and leave Instruction empty. \n`}
                    </Text>
                </View>
                <View style={{ padding: 10, }}>
                    <TextInput

                        multiline={true}
                        style={{ height: 40, backgroundColor: "#e6e6e6", fontSize: 15, textAlignVertical: 'top', color: "black" }}
                        placeholder="Enter Instructions"
                        onChangeText={newInstruction => setInstruction(newInstruction)}
                        defaultValue={instruction}
                        placeholderTextColor="black"


                    />
                </View>
                <View style={{ padding: 10, }}>
                    <TextInput

                        multiline={true}
                        style={{ height: 200, backgroundColor: "#e6e6e6", fontSize: 16, textAlignVertical: 'top', color: "black" }}
                        placeholder="Enter Prompt"
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                        placeholderTextColor="black"

                    />
                </View>
                <View style={{ padding: 10 }}>
                    <Button
                        title="Submit"
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
    spinnerTextStyle:{
        color:"black",
    }
});