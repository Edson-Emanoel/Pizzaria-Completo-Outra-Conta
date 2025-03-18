import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn() {

  const { signIn, loadingAuth } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
  
    if (email === '' || password === ''){
      return
    }
    
    await signIn({ email, password })
  }


  return (
    <View style={styles.container}>

      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />

      <View style={styles.inputContainer}>

        <TextInput
         placeholder='Digite seu Email'
         style={styles.input}
         placeholderTextColor='#F0F0F0'
         value={email}
         onChangeText={setEmail}
        />

        <TextInput
         placeholder='Digite sua Senha'
         style={styles.input}
         placeholderTextColor='#F0F0F0'
         secureTextEntry={true}
         value={password}
         onChangeText={setPassword}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {/* Tinha dado erro Aq antes */}
          { loadingAuth
            ? (
              <ActivityIndicator size={25} color='#1D1D2E'/>
            )
            : (
              <Text style={styles.btnText}>Acessar</Text>
            )
          }
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D2E'
  },
  logo:{
    marginBottom: 18,
  },
  inputContainer:{
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  input:{
    width: '95%',
    height: 40,
    backgroundColor: '#101026',
    color: '#FFF',
    marginBottom: 12,
    borderRadius: 7,
    paddingHorizontal: 8,
  },
  button:{
    width: '95%',
    height: 40,
    backgroundColor: '#3FFFA3',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101020',
  },
})