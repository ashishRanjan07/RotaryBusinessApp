import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { responsiveFontSize, responsivePadding } from './Responsive';
import Colors from '../Theme/Colors';
const CustomAlert = ({ visible, onClose, onYes }) => {
    return (
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <LottieView
              source={require('../Assets/Animation/Animation - 1713844963044.json')}
              autoPlay
              loop
              style={styles.animation}
            />
            <Text style={styles.title}>Business added successfully</Text>
            <Text style={styles.title}>Add Product</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onYes}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button,{backgroundColor:"#ffffff",borderWidth:1,borderColor:Colors.text_grey}]} onPress={onClose}>
                <Text style={[styles.buttonText,{color:Colors.black}]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  

export default CustomAlert

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      width:'90%'
    },
    animation: {
      width: 150,
      height: 150,
    },
    title: {
      fontSize: responsiveFontSize(18),
      color:Colors.black,
      fontWeight: '600',
      marginTop: responsivePadding(10),
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: responsivePadding(20),
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#F7A81B',
      width:'40%',
      alignItems:'center'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });