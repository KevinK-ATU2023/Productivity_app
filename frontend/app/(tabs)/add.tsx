import { View, Text } from 'react-native';

import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context';
import InputArea from '@/components/InputArea';
import { SetStateAction, useState } from 'react';
import MyButton from '@/components/MyButton';
import { router } from 'expo-router';

const add_task = () => {

    const [title_screen, setScreenTitle] = useState("Add Task")
    const [task_title, setTaskTitle] = useState("")
    const [task_time, setTaskTime] = useState("")
    const [task_frequency, setTaskFrequency] = useState("")

    let new_task = {
        title: task_title,
        time: task_time,
        frequency: task_frequency,
    }

    const add_task_form = () => {
        axios.post('http://192.168.0.79:3000/add_task', new_task)
        .then((res) => {
            if(res.data.success) {
                router.replace('/(tabs)/')
            }
            else {
                setScreenTitle("Something Went Wrong")
            }
        })
        .catch((e) => {
            console.log(e)
        })
    }

    return(
        <SafeAreaView>
            <View className='justify-center items-center'>
                <Text className='text-neutral-50 justify-center items-center flex flex-row text-5xl top-40'>
                {title_screen}
                </Text>
            </View>

            <View className='mt-80'>
                <InputArea 
                placeholder="Enter Task Title"
                onChangeText= {(value: SetStateAction<string>) => {
                    setTaskTitle(value)
                }}
                />
                <InputArea 
                placeholder="Enter Time"
                onChangeText= {(value: SetStateAction<string>) => {
                    setTaskTime(value)
                }}
                />
                <InputArea 
                placeholder="Enter Frequency"
                onChangeText= {(value: SetStateAction<string>) => {
                    setTaskFrequency(value)
                }}
                />
            </View>

            <MyButton
                title='Add Task'
                onPress={add_task_form}
            />

            </SafeAreaView>
    )

}

export default add_task;