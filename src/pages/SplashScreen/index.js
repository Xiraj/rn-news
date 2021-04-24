import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import news from '../../../assets/image/newspaper.png'

const SplashScreen = ({navigation}) => {
    setTimeout(() => {
        navigation.navigate('News')
    }, 3000)
    return (
        <View>
            <Image source={news} style={styles.img} />
            <Text style={styles.text}>MakNews</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        height: 100, 
        width: 100, 
        alignSelf: 'center', 
        marginTop: 260
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center', 
        marginTop: 20
    }
})
export default SplashScreen;