import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text } from 'react-native';

import axios from 'axios'

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputArea from '@/components/InputArea';
import { SetStateAction, useState } from 'react';
import MyButton from '@/components/MyButton';

export default function TabTwoScreen() {
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [user_name, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [account_status, setAccountStatus] = useState("")

  const sign_up_form = () => {
    axios.post('http://localhost:3000/get_account_status')
    .then(( res ) => {
      if (!res.data.status) setAccountStatus("Welcome, Guest");
    })
  }

  const sign_in_form = () => {
    
  }

  const get_account_status = () => {
    
  }
  
  return (
    <SafeAreaView>
      <View>
        <Text className='text-neutral-50 justify-center items-center flex flex-row text-5xl top-40 left-40'>
          Hello
        </Text>
      </View>

      <View className='mt-80'>
        <InputArea 
          placeholder="Enter Username:"
          onChangeText= {(value: SetStateAction<string>) => {
            setUserName(value)
          }}
        />
        <InputArea 
          placeholder="Enter Email:"
          onChangeText= {(value: SetStateAction<string>) => {
            setEmail(value)
          }}
        />
        <InputArea 
          placeholder="Enter Password:"
          onChangeText= {(value: SetStateAction<string>) => {
            setPassword(value)
          }}
          secureTextEntry={true}
        />
      </View>

      <MyButton
        title='Sign Up'
        onPress={sign_up_form}
       />

      <MyButton
        title='Sign In'
        onPress={sign_up_form}
       />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
