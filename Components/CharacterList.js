

import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ActivityIndicator,FlatList,Image } from 'react-native';
import axios from 'axios';
const characterList =() =>{

    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://thronesapi.com/api/v2/Characters')
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#FFF" />
        </View>
        );
    }

    return(
        <FlatList style={styles.flat}
    data={data}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
        <View style={styles.item}>
        <View><Image style={styles.image} source={{uri:item.imageUrl.toString()}}></Image></View>
        <View style={styles.dataSection}>
            
        <Text style={styles.dataName}>{item.fullName}</Text>
        <Text style={styles.data}>{item.title}</Text>
        <Text style={styles.data}>{item.family}</Text></View>
        
        </View>
    )}
    />
    )
};

const styles = StyleSheet.create({
    flat:{
        width:'100%',
        paddingStart:80,
        paddingEnd:80,
        maxWidth:"auto",
    },
    item: {
        width:'100%',
        backgroundColor:'#3d3d3d',
        flexDirection:'row',
      alignItems: 'center', 
      paddingEnd: 25,
      borderBottomColor: '#ccc',
      marginBottom:10,
      borderRadius:12
    },
    text: {
      color: '#FFF',
      fontSize: 18,
      textAlign: 'center',
      marginHorizontal: 20,
    },
    dataSection:{
        marginStart:20
    },
    data:{
        width:180,
        marginTop:5,
      color:'#FFF',
    },
    dataName:{
        fontSize:20,
        fontWeight:'700',
        flexDirection:'row',
      color:'#FFF',
      justifyContent:'flex-start'
    },
    dataLables:{
        fontWeight:'700',
        flexDirection:'row',
      color:'#FFF',
    },
    image:{
      height:120,
      width:120,
      resizeMode:'cover',
      borderEndStartRadius:12,
      borderStartStartRadius:12,
    }
  });

export default characterList;