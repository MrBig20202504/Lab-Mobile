import { ScrollView, View, Text, Button, Alert, StyleSheet } from "react-native";
import style from "./style";
import Square from "./Square";
import data from "./data";

export default function App() {
  return(
    <ScrollView style = {style.container}>
      {data.map((item, index) => (
        <Square key={item} text={`Square ${index + 1}`} />
      ))}
    </ScrollView>
  );
};