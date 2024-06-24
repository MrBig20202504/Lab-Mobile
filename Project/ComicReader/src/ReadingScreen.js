import React, { useEffect, useRef, useState } from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReadingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { chapter, chapters } = route.params;

    const [chapterId, setChapterId] = useState(chapter.chapterId);
    const [currentChapter, setCurrentChapter] = useState(chapter);
    const flatListRef = useRef(null);
    const [size, setSize] = useState(550);
    const [imageSize, setImageSize] = useState(100);

    const styles = StyleSheet.create({
        listContainer: {
            flex: 1,
            backgroundColor: '#171717',
            padding: 10,
        },
        pageContainer: {
            marginBottom: 10,
            backgroundColor: "white",
            borderRadius: 10,
            overflow: 'hidden',
        },
        pageImage: {
            width: imageSize + '%',
            height: size,
            resizeMode: 'stretch',
        },
        navigationContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        navigationButton: {
            backgroundColor: '#262626',
            padding: 10,
            borderRadius: 5,
        },
        navigationButtonText: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });

    useEffect(() => {
        fetchChapterData();
    }, [chapterId]);

    const fetchChapterData = () => {
        console.log('Fetching chapter data for chapterId:', chapterId);
        setTimeout(() => {
            const foundChapter = chapters.find(chap => chap.chapterId === chapterId);
            if (foundChapter) {
                setCurrentChapter(foundChapter);
            }
        }, 500);
    };

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
    };

    const changeNewChapter = () => {
        const currentIndex = chapters.findIndex(chap => chap.chapterId === chapterId);
        const nextIndex = currentIndex + 1;
        if (nextIndex < chapters.length) {
            const nextChapterId = chapters[nextIndex].chapterId;
            setChapterId(nextChapterId);
            scrollToTop();
        } else {
            navigation.goBack();
        }
    };
    const decreaseSize = () => {
        if (size >= 550)
            setSize(size - 20)
        if (imageSize > 20)
            setImageSize(imageSize - 10)
        console.log(size)
    }

    const increaseSize = () => {
        if (size < 1050)
            setSize(size + 20)
        if (imageSize < 100)
            setImageSize(imageSize + 10)
        console.log(size)
    }

    const changeOldChapter = () => {
        const currentIndex = chapters.findIndex(chap => chap.chapterId === chapterId);
        const nextIndex = currentIndex - 1;
        if (nextIndex >= 0) {
            const nextChapterId = chapters[nextIndex].chapterId;
            setChapterId(nextChapterId);
            scrollToTop();
        } else {
            navigation.goBack();
        }
    };

    const goHome = () => {
        navigation.goBack();
    };

    const renderPage = ({ item }) => (
        <View style={styles.pageContainer}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.pageImage}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.listContainer}>
            <View style={styles.navigationContainer}>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: '#262626',
                    padding: 10,
                    borderRadius: 5,
                }} onPress={changeOldChapter}>
                    <Text style={styles.navigationButtonText}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: '#262626',
                    flex: 0.5,
                    padding: 10,
                    borderRadius: 5,
                    marginHorizontal: 10,
                }} onPress={decreaseSize}>
                    <Text style={styles.navigationButtonText}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 0.8,
                    backgroundColor: '#262626',
                    padding: 10,
                    borderRadius: 5,
                }} onPress={goHome}>
                    <Text style={styles.navigationButtonText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 0.5,
                    backgroundColor: '#262626',
                    padding: 10,
                    borderRadius: 5,
                    marginHorizontal: 10,
                }} onPress={increaseSize}>
                    <Text style={styles.navigationButtonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: '#262626',
                    padding: 10,
                    borderRadius: 5,
                }} onPress={changeNewChapter}>
                    <Text style={styles.navigationButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                ref={flatListRef}
                data={currentChapter.pages} // Render pages from currentChapter
                renderItem={renderPage}
                keyExtractor={(item) => item.pageId.toString()}
            />
        </SafeAreaView>
    );
};



export default ReadingScreen;
