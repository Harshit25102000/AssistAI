import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  ScrollView
} from "react-native";

export default function Result({route}) {
    const{text}=route.params

    
  return (
    <View style={styles.container}>
         <ScrollView >

<Text style={styles.heading}>Result</Text>
<Text style={styles.result}>{text}</Text>
</ScrollView>
    </View>
   
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 25,
        flex: 1,
        alignItems: 'stretch',
        
  },

  heading:{
    fontSize: 16,
    fontWeight:"bold"
  },
  result:{
    fontSize:15
  }
});
