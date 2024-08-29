import { StyleSheet, Image, Platform, View, Text } from 'react-native';

import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context';
import InputArea from '@/components/InputArea';
import { SetStateAction, useState } from 'react';
import MyButton from '@/components/MyButton';

export default function TabTwoScreen() {
  const [user_name, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [account_status, setAccountStatus] = useState("Welcome, Guest")

  const sign_up_form = () => {
    let new_account = {
      username: user_name,
      email: email,
      pword: password
    }

    axios.post('http://localhost:3000/signup', new_account)
    .then((res) => {
      setAccountStatus(res.data.status_message)
    })
    .catch((e) => {
      console.log(e)
    })
  }

  const sign_in_form = () => {
    let sign_in_account = {
      username: user_name,
      email: email,
      pword: password
    }

    axios.post('http://localhost:3000/signin', sign_in_account)
    .then((res) => {
      setAccountStatus(res.data.status_message)
    })
    .catch((e) => {
      console.log(e)
    })
  }

  const get_account_status = () => {
    axios.get('http://localhost:3000/get_account_status')
    .then(( res ) => {
      if (!res.data.status) setAccountStatus("Welcome, Guest");
      else setAccountStatus(res.data.status_message);
    })
    .catch((e) => {
      console.log(e)
    })
  }
  
  return (
    <SafeAreaView>
      <View className='justify-center items-center'>
        <Text className='text-neutral-50 justify-center items-center flex flex-row text-5xl top-40'>
          {account_status}
        </Text>
      </View>

      <View className='mt-80'>
        <InputArea 
          placeholder="Enter Username"
          onChangeText= {(value: SetStateAction<string>) => {
            setUserName(value)
          }}
        />
        <InputArea 
          placeholder="Enter Email"
          onChangeText= {(value: SetStateAction<string>) => {
            setEmail(value)
          }}
        />
        <InputArea 
          placeholder="Enter Password"
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
