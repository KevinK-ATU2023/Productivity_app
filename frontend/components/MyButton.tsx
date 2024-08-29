import { TouchableOpacity, Text } from "react-native";

const MyButton = ( { onPress = () => {}, title = "" } ) => (

    <TouchableOpacity onPress={onPress} className={`w-full rounded-full flex flex-row justify-center items-center bg-neutral-100 border border-neutral-100 mt-10 p-4`}>
        <Text>{title}</Text>
    </TouchableOpacity>

);

export default MyButton