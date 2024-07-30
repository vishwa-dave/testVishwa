
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { windowWidth } from './common';
import DateTimePicker from '@react-native-community/datetimepicker';

export default EditListModal = ({ modalVisible, onRequestClose, selectedItem, onChangeText, onSaveItem }) => {
    console.log("selectedItem ", selectedItem)
    const [newData, setNewData] = useState('')
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    onRequestClose()
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>{selectedItem.title}</Text>
                        <TextInput
                            value={newData}
                            style={styles.input}
                            placeholder='Edit task title here'
                            placeholderTextColor={'#000'}
                            onChangeText={(title) => {
                                setNewData(title)
                            }}
                        />
                        {showPicker && (
                            <DateTimePicker
                                value={date}
                                mode="datetime"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
                            <Text style={styles.dateButtonText}>{date ? date.toLocaleString() : 'Select Date/Time'}</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { onSaveItem() }} style={styles.deleteButton}>
                                <Text style={styles.deleteText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { onRequestClose() }} style={[styles.deleteButton, { marginLeft: 10 }]}>
                                <Text style={styles.deleteText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 7,
        borderRadius: 5,
        width: windowWidth * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: '#000'
    },
    dateButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    dateButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
