import { TouchableOpacity, Text } from "react-native";

const SingleTask = ({ task }) => (
    <TouchableOpacity className='w-full flex flex-col bg-zinc-800 border border-zinc-800 mt-5 p-4 border rounded-lg'>
        <Text className="text-neutral-100 text-4xl">{ task.title }</Text>
        <Text className='mt-2 text-2xl text-neutral-100'>{ task.time }</Text>
        <Text className='mt-2 text-2xl text-neutral-100'>{ task.frequency }</Text>
        {/* <TouchableOpacity className='w-16 flex flex-col bg-zinc-800 border border-zinc-700 mt-5 p-4 border rounded-lg'
        onPress={} ><TabBarIcon name='delete' /></TouchableOpacity> */}
    </TouchableOpacity>
);

export default SingleTask;
