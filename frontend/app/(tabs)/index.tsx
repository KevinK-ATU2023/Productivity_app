import { Image, StyleSheet, Platform, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayTasks from '@/components/DisplayTasks';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function HomeScreen() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/get_tasks')
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
        <TouchableOpacity className='w-full flex flex-col bg-zinc-800 border border-zinc-800 mt-5 p-4 border rounded-lg'>
          <Text className="text-neutral-100 text-4xl">Read a book</Text>
          <Text className='mt-2 text-2xl text-neutral-100'>14:00</Text>
          <Text className='mt-2 text-2xl text-neutral-100'>Everyday</Text>
          {/* <TouchableOpacity className='w-16 flex flex-col bg-zinc-800 border border-zinc-700 mt-5 p-4 border rounded-lg'
          onPress={} ><TabBarIcon name='delete' /></TouchableOpacity> */}
        </TouchableOpacity> 
        {/* <DisplayTasks tasks={tasks} /> */}
      </View>

    </SafeAreaView>
  );
}
