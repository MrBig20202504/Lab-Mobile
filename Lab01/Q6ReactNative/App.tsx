import React from "react";
import { Button, View } from "react-native";
import Employee from "./employee";
import Output from "./sumFirstAndLastDigit";
import OutputMin from "./findMinNum";
import HalstoneSequence from "./hailstoneSequence";

export default function App() {

    return (
        //Question 1
        /*
        <View>
            <Employee
                name="Huynh Nhat Nam"
                age="22"
                occupation="Engineer"
            />
        </View>
        */


        //Question 2 
        /*
        <View>
            <Output number={1234567891011}></Output>
        </View>
        */


        //Question 3
        /*
        <View>
            <OutputMin a={1} b={2} c={3} />
        </View>
        */

        //Question 4
        <View>
            <HalstoneSequence number={10} />
        </View>
    );
}