import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, StyleSheet} from 'react-native'; // import { AuthContext } from '../../contexts/AuthContext';   const { signOut } = useContext(AuthContext); { useContext }

import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackPramsList } from '../../routes/app.routes';

import { api } from '../../services/api';

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()

  const [number, setNumber] = useState('')


  async function openOrder() {
    if (number === '') {
      return
    }

    const response = await api.post('/order', {
      table: Number(number)
    })
    
    navigation.navigate('Order', { number: number, order_id: response.data.id })

    setNumber('')

  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput 
        placeholder='Numero da mesa'
        placeholderTextColor="#F0F0F0"
        style={styles.input}
        keyboardType='number-pad'
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir Mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#1D1D2E',
  },
  title:{
    fontSize: 30,
    color: '#F0F0F0',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input:{
    width: '95%',
    height: 60,
    backgroundColor: '#101020',
    color: '#F0F0F0',
    borderRadius: 7,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
  },
  button:{
    width: '95%',
    height: 40,
    backgroundColor: '#3FFFA3',
    borderRadius: 7,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 22,
    color: '#101020'
  },
})