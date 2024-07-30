// components/TodoItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { windowWidth, windowHeight } from './common';
import moment from 'moment';

const TodoItem = ({ item, onDelete, onEdit, onDone ,onComplete }) => {
  const truncateText = (str, length) => {
    if (str.length > length) {
      return str.substring(0, length) + '...';
    }
    return str;
  };

  return (
    <View style={{ width: windowWidth, alignItems: 'center', flexDirection: 'row' }}>
    
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.9}>
      <TouchableOpacity onPress={() => onDone(item.id)} style={[styles.deleteButton , { }]}>
        {item.isDone == true ?
          <Image source={require('../../assets/doneImg.png')} style={{ width:20, height: windowHeight * 0.034, resizeMode: 'contain' }} />
          :
          <View style={{ width : 20 , height : 20 , borderRadius : 10 , borderWidth : 1 , borderColor : '#000' }} />
        }
      </TouchableOpacity>
        <View style={{ width: windowWidth * 0.5}}>
          <Text style={styles.title}>{truncateText(item.title, 15)}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.date}>{moment(item.date).format('MMMM Do YYYY')}</Text>
            <Text style={[styles.date, { marginLeft: 15 }]}>{moment(item.date).format('HH:MM A')}</Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={() => onComplete(item.id)} style={styles.deleteButton}>
          <Image source={require('../../assets/completedtask.png')} style={{ width: windowWidth * 0.045, height: windowHeight * 0.034, resizeMode: 'contain' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(item.id)} style={styles.deleteButton}>
          <Image source={require('../../assets/edit.png')} style={{ width: windowWidth * 0.045, height: windowHeight * 0.034, resizeMode: 'contain' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Image source={require('../../assets/delete.png')} style={{ width: windowWidth * 0.05, height: windowHeight * 0.034, resizeMode: 'contain' }} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: windowHeight * 0.08,
    marginLeft: 15
    // height : windowHeight
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold'
  },
  date: {
    color: '#555',
  },
  deleteButton: {
    // backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
  },
});

export default TodoItem;
