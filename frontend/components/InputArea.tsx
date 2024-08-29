// automatically adjust keyboard height to remain visible while the virtual keyboard is displayed.
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback, View } from "react-native";


const InputArea = ( { placeholder = "", secureTextEntry = false, ...props } ) => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="my-2 w-full">
                <View className="flex flex-row justif-start items-center relative bg-neutral-100 rounded-full border border-neutral-100">
                    <TextInput 
                      className="rounded-full p-4 text-[15px] flex-1 text-left bg-red"
                      secureTextEntry = {secureTextEntry}
                      placeholder={placeholder}
                      placeholderTextColor="grey"
                      {...props}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
)

export default InputArea;
