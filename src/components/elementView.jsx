import { Text, TouchableOpacity, View } from 'react-native';
const ElementView = ({ edit, done, value, func, remove }) => {
    return <View className="mx-[16px] mb-1">
        <View className={`${done ? "bg-[#1c9963]" : "bg-white"} flex-row border p-[8px] justify-between`}>
            <TouchableOpacity
                onPress={func}
                className="flex-1"
            >
                <Text className={done ? "text-white text-lg" : "text-black text-lg"}>{value}</Text>
            </TouchableOpacity>
            <TouchableOpacity className={edit ? "bg-black p-1" : "hidden"} onPress={remove}>
                <Text className="text-white">Eliminar</Text>
            </TouchableOpacity>
        </View>
    </View>;
};
export default ElementView;