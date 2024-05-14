import React from "react";
import { Text, View } from "react-native";

function Count(inputNum) {
    var firstDigitNumber = Number(String(inputNum)[0]);
    var lastDigitNumber = Number(String(inputNum).slice(-1));
    return lastDigitNumber + firstDigitNumber;
}

export default function Output(result) {
    return (
        <View>
            <Text> The sum of first and last digit is {Count(result.number)}</Text>
        </View>
    );
}