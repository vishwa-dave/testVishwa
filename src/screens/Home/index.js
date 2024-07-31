import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Modal, Alert, Keyboard, Image } from 'react-native';
import { windowHeight, windowWidth } from '../../component/common';


export default Home = ({navigation}) => {
  const [charData, setCharData] = useState('')
  const [url, setUrl] = useState('')
  useEffect(() => {
    getMoviesFromApi()
  }, [])

  const getMoviesFromApi = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api');
      const result = await response.json();
      secondApiCall(result?.characters)
      setUrl(result?.characters)
      // console.log("result ", result);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const secondApiCall = async (characters) => {
    try {
      const response = await fetch(characters);
      const result = await response.json();
      setCharData(result)
    } catch (error) {
      console.error(error);
    } finally {
    }
  }
  const eachApiCall = async (id) => {
    let charUrl = url + '/' + id
    try {
      const response = await fetch(charUrl);
      const result = await response.json();
       navigation. navigate('Details' , { result : result})
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  const renderItem = ({ item }) => {
    // console.log("result characters", item);
    return (
      <TouchableOpacity style={styles.containerItem} onPress={() => eachApiCall(item.id)}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: windowWidth * 0.2, height: windowHeight * 0.15, resizeMode: 'contain', borderRadius: 15 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.deadAliveContainer, {
                backgroundColor: item.status == 'Alive' ? 'green' : 'red'
              }]}>

              </View>
              <Text style={{ marginLeft: 10 }}>{item.status}</Text>
              <Text style={{}}> - {item.species}</Text>

            </View>
            <Text style={{ marginTop: 10 }}>
              Last known location:
            </Text>
            <Text style={{ color: '#000' }}>
              {item?.location?.name}
            </Text>

          </View>
        </View>

      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={charData?.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    padding: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 5,
    marginBottom: 13,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
    width: windowWidth * 0.9,
    // height: windowHeight * 0.08,
    marginLeft: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  deadAliveContainer: {
    width: 10,
    height: 10,
    borderRadius: 20,

  }
});

