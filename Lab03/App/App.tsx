import React, { useState } from "react";
import FlatListBasics from "./Src/ProductList";
import { View } from "react-native";
import Header from "./Header";
import AddProduct from "./Src/AddProduct";
import styles from "./Src/styles";
import { ActivityIndicator, Card, MD2Colors, IconButton, Text, BottomNavigation } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProducListWithCard from "./Src/Card";
import SearchProduct from "./Src/Search";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ProductList from "./Src/ProductList";
//Q1
export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <FlatListBasics/>
        </View>
    );
};

//Q2
// export default function App() {
//     return (
//             <AddProduct/>
//     );
// };

//Q3
// export default function App() {
//     return (
//             <SearchProduct/>
//     );
// };

//Q4
// export default function App() {
//     return (
//         <View style={{ flex: 1 }}>
//             <ProducListWithCard />
//         </View>
//     );
// };

// Q5

// export default App = () => {
//     const [index, setIndex] = useState(0);
//     const [routes] = useState([
//         { key: 'ProductList', title: 'Products', focusedIcon: 'folder' },
//         { key: 'Product_Add', title: 'Add', focusedIcon: 'folder' },
//         { key: 'ProductSearch', title: 'Search', focusedIcon: 'find' },
//         { key: 'Product_Detail', title: 'Detail', focusedIcon: 'calendar' },
//     ]);

//     const renderScene = BottomNavigation.SceneMap({
//         ProductList: ProductList,
//         Product_Add: AddProduct,
//         ProductSearch: SearchProduct,
//         Product_Detail: ProducListWithCard,
//     });

//     return (
//         <SafeAreaProvider>
//             <BottomNavigation
//                 navigationState={{ index, routes }}
//                 onIndexChange={setIndex}
//                 renderScene={renderScene}
//             />
//         </SafeAreaProvider>

//     );

// };