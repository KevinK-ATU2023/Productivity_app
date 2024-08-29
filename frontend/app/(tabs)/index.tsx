import { Image, StyleSheet, Platform, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayTasks from '@/components/DisplayTasks';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function HomeScreen() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('http://192.168.0.79:3000/get_tasks')
    .then((res) => {
      setTasks(res.data.tasks);
    })
    .catch((e) => {
      console.log(e)
    })
  })

  return (
    <SafeAreaView>
      <Text className='text-neutral-50 text-5xl mt-20'>Your Tasks</Text>
      
      <View> 
        <DisplayTasks tasks={tasks} />
      </View>

    </SafeAreaView>
  );
}
