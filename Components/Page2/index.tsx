import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    Pressable,
    Linking,
    ScrollView
} from "react-native";
export default function Page2() {
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.about}>
                <Text>{`AssistAI is using the immense power of GPTAI API of open AI for completion and editing text purposes.\nThis app is built with the objective of bringing the power of AI to each individual and make them experience it.AssistAI is a beta version built as a practise project,there are still many features under development to roll out,since the app doesn't use any dedicated backend on server still, it's possible for us to keep it running.\nIncase of any complaints or feedback please contact me. `}</Text>
            </View>
            <View style={{ padding: 10, marginTop: 50 }}>
                <Button
                    title="harshit25102000@gmail.com"
                    color="black"
                    onPress={() => Linking.openURL('mailto:harshit25102000@gmail.com')}

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
    about: {
        padding: 10,
        backgroundColor: "white",
        marginTop: 90,
        height: 220,
        justifyContent: "center",
        textAlignVertical: "top",
    },
    footer: {
        position: "absolute",
        left: 98,
        right: 0,
        bottom: 0,
        fontSize: 11,
        zIndex: -1

    },
});