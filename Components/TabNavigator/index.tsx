import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../Home";
import Page2 from "../Page2";
import ImgPage from"../ImgPage";
import Result from "../Result";
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      
        screenOptions={({ route }) => ({
          
          tabBarIcon: () => {
            let iconName = "keyboard";
            if (route.name === "Search") {
              iconName = "keyboard";
            } else if (route.name === "About") {
              iconName = "info-circle";
            }
            else if (route.name === "Generate Image"){
              iconName="image";
            }
            return <FontAwesome5 name={iconName} size={24} color="black" />;
          },
        })}

        
      >
        <Tab.Screen name="AssistAI" component={Home} options={{tabBarHideOnKeyboard: true}}/>
        <Tab.Screen name="Generate Image" component={ImgPage} options={{tabBarHideOnKeyboard: true}}/>
        <Tab.Screen name="About" component={Page2} options={{tabBarHideOnKeyboard: true}}/>
      </Tab.Navigator>
  );
}
