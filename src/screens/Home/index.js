import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Modal, Alert, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTodo, removeTodo, setTodos, editTask } from '../../redux/todoSlice';
import TodoItem from '../../component/TodoItem';
import store from '../../redux/Store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditListModal from '../../component/EditListModal';
import { windowHeight, windowWidth } from '../../component/common';
import moment from 'moment';
import Toast from '../../component/Toast';

export default Home = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerTime, setShowPickerTime] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [showPickerTimeModal, setShowPickerTimeModal] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState('')
  const [newData, setNewData] = useState('')
  const [time, setTime] = useState(new Date());
  const [timeModal, setTimeModal] = useState(new Date());
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('')
  const dispatch = useDispatch();

  const todos = useSelector(state => state.todos.items);

  useEffect(() => {
    loadTodos();
  }, [dispatch]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        dispatch(setTodos(JSON.parse(storedTodos)));
        return JSON.parse(storedTodos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = () => {
    Keyboard.dismiss()
    if (title.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        title,
        date,
        isCompleted: false,
        isDone: false
      };
      console.log("id handleAddTask", newTodo);
      dispatch(addTodo(newTodo));
      saveTodos([...todos, newTodo]);
      setTitle('');
      setDate(new Date());
      setToastMessage('Task Added')
      setToastVisible(true)
    } else {
      Alert.alert("Please fill the details.")
    }
  };

  const handleComplete = (item) => {
    Alert.alert(
      "Note",
      "Are sure want to complete this task ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            const updatedTodos = todos.filter(todo => todo.id !== item.id);
            dispatch(removeTodo(item.id));
            saveTodos(updatedTodos);
            setToastMessage('Task deleted')
            setToastVisible(true)
          }
        }
      ],
      { cancelable: false }
    );

  }

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    dispatch(removeTodo(id));
    saveTodos(updatedTodos);
    setToastMessage('Task deleted')
    setToastVisible(true)
  };

  const handleDone = (item) => {
    console.log("data ---->", item.id);
    const newTodo = {
      id: item.id,
      title: item.title,
      date: item.date,
      isCompleted: item.isCompleted,
      isDone: !item.isDone
    };
    console.log("id handeledit", newTodo);
    dispatch(editTask(newTodo));
    upadteTodos(item.id, newTodo)
    setEditPopup(false)
  }

  const hideToast = () => {
    setToastVisible(false);
  };

  const upadteTodos = async (id, newItemData) => {
    try {
      const todos = await loadTodos();
      // console.log("data ---->", todos, id, newItemData);
      if (todos) {
        const index = todos.findIndex(item => item.id === id);
        if (index !== -1) {
          todos[index] = { ...todos[index], ...newItemData };
          await AsyncStorage.setItem('todos', JSON.stringify(todos));
        } else {
          console.warn(`Item with id ${id} not found`);
        }
      } else {
        console.warn('No data found');
      }
      loadTodos();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (item) => {
    const newTodo = {
      id: item.id,
      title: newData,
      date: date,
      isCompleted: item.isCompleted,
      isDone: item.isDone
    };
    console.log("id handeledit", newTodo, item.id);
    dispatch(editTask(newTodo));
    upadteTodos(item.id, newTodo)
    setEditPopup(false)
  }
  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleDateChangeTime = (event, selectedDate) => {
    setShowPickerTime(false)
    if (selectedDate) {
      setTime(selectedDate)
    }
  }

  const handleDateChangeModal = (event, selectedDate) => {
    setShowPickerModal(false)
    if (selectedDate) {
      setDate(selectedDate);
    }
  }

  const handleDateChangeTimeModal = (event, selectedDate) => {
    setShowPickerTimeModal(false)
    if (selectedDate) {
      setDate(selectedDate);
    }
  }
  return (
    <View style={styles.container}>
      <View style={{
        backgroundColor: '#698aff', width: windowWidth,
        alignItems: 'center',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
      }}>
        <Text style={[styles.header, { color: '#fff',   marginTop: 25 }]}>Hello User</Text>
        <Text style={[styles.header, { color: '#fff' ,  marginTop: 10  , marginBottom: 20, }]}>What are you going to do ?</Text>

        <TextInput
          style={[styles.input, { color: '#fff' }]}
          placeholder="Task Title"
          placeholderTextColor={'#fff'}
          value={title}
          onChangeText={setTitle}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => {
            title ? setShowPicker(true) : Alert.alert("Note", 'Please enter the title first')
          }} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{title ? date ? moment(date).format('DD/MM/YYYY') : 'Select Date' : 'Select Date'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { title ? setShowPickerTime(true) : Alert.alert("Note", 'Please enter the title first') }} style={[styles.dateButton, { marginLeft: 10 }]}>
            <Text style={styles.dateButtonText}>{title ? time ? moment(time).format('HH:MM A') : 'Select Time' : 'Select Time'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: windowWidth, alignItems: 'center', marginBottom: 25 }}>
          <TouchableOpacity onPress={handleAddTask} style={styles.newAdded} activeOpacity={0.9}>
            <Text style={{ padding: 5, color: '#000', fontSize: 17, paddingVertical: 10 , fontWeight :'bold' }}>
              Add To-Do
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showPickerTime && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleDateChangeTime}
        />
      )}

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={handleDelete}
            onEdit={() => {
              setSelectedItem(item)
              setEditPopup(true)
            }}
            onDone={() => handleDone(item)}
            onComplete={() => handleComplete(item)}
          />
        )}
        keyExtractor={item => item.id}
        style={{ marginTop: 15 }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={editPopup}
        onRequestClose={() => {
          onRequestClose()
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{selectedItem.title}</Text>
            <TextInput
              value={newData}
              style={styles.inputTextStyle}
              placeholder='Edit task title here'
              placeholderTextColor={'#000'}
              onChangeText={(title) => {
                setNewData(title)
              }}
            />
            {showPickerModal && (
              <DateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={handleDateChangeModal}
              />
            )}
            {showPickerTimeModal && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={handleDateChangeTimeModal}
              />
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => setShowPickerModal(true)} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>{date ? moment(date).format('DD/MM/YYYY') : 'Select Date'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPickerTimeModal(true)} style={[styles.dateButton, { marginLeft: 10 }]}>
                <Text style={styles.dateButtonText}>{date ? moment(date).format('HH:MM A') : 'Select Time'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => {
              if (newData) {
                handleEdit(selectedItem)
                setNewData('')
              }
              else {
                Alert.alert('Note', 'Please enter the title')
              }
            }} style={[styles.deleteButton, { backgroundColor: 'green' }]}>
              <Text style={styles.deleteText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setEditPopup(false)
              setNewData('')
            }} style={[styles.deleteButton, { marginTop: 10, backgroundColor: '#ff4d4d', }]}>
              <Text style={styles.deleteText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Toast
        message={toastMessage}
        visible={toastVisible}
        onHide={hideToast}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: windowWidth,
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 20,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: windowWidth * 0.8,
    color: '#000'
  },
  dateButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: windowWidth * 0.33
  },
  dateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15
  },
  deleteButton: {
    // backgroundColor: '#ff4d4d',
    padding: 7,
    borderRadius: 5,
    width: windowWidth * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth * 0.9
  },
  inputTextStyle: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#000',
    width: windowWidth * 0.7
  },
  newAdded: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: windowWidth * 0.4,
    alignItems: 'center',
    borderRadius: 10
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600'
  }
});

