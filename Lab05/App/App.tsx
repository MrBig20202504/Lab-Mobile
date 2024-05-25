import React, { useState } from "react";
import { View } from "react-native";
import HomeScreen from "./src/Home";
import LoginScreen from "./src/Login";

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            {/* <LoginScreen /> */}
            <HomeScreen/>
        </View>
    );
};
