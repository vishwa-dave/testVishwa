// CustomToast.js
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { windowHeight, windowWidth } from '../../component/common';

const Details = ({ route, navigation }) => {
  const { result } = route.params;
  const [episodeData, setEpisodeData] = useState([])
  // console.log("result episode each-------->", result);

  useEffect(() => {
    getEpisode()
  }, []);

  const getEpisode = async () => {
    let url = result?.episode
    let arr = []
    console.log("result episode before-------->", result);

    url.map(async (item) => {
      try {
        const response = await fetch(item);
        const result = await response.json();
        console.log("result episode each-------->", result);
        arr.push(result)
        setEpisodeData(arr)
      } catch (error) {
        console.error(error);
      } finally {
      }
    })
  }

  const renderItem = ({ item }) => {
    console.log("result characters", item);
    return (
      <View>
        <View style={{ padding: 10 }}>
          <Text>
            {item.name} : {item.air_date}
          </Text>
          <Text>
            {item.episode}
          </Text>
        </View>
      </View>
    )
  }
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={{ padding : 20  , fontWeight : 'bold' , fontSize :20}}>
          Back
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerItem} >
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: result.image }}
            style={{ width: windowWidth * 0.2, height: windowHeight * 0.15, resizeMode: 'contain', borderRadius: 15 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title}>{result.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.deadAliveContainer, {
                backgroundColor: result.status == 'Alive' ? 'green' : 'red'
              }]}>
              </View>
              <Text style={{ marginLeft: 10 }}>{result.status}</Text>
              <Text style={{}}> - {result.species}</Text>
            </View>
            <Text style={{ marginTop: 10 }}>
              Last known location:
            </Text>
            <Text style={{ color: '#000' }}>
              {result?.location?.name}
            </Text>

          </View>
        </View>
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 15 }}>Episodes</Text>
      <FlatList
        data={episodeData}
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
    marginLeft: 15,
    marginTop: 15
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

export default Details;
