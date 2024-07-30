// CustomToast.js
import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';

const Toast = ({ message, visible, onHide }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(onHide);
        }, 2000); 
      });
    }
  }, [visible, fadeAnim, onHide]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 50,
    left: '10%',
    right: '10%',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});

export default Toast;
