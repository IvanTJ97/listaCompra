import { View, TouchableOpacity, Text } from 'react-native';
import contrastCalculator from './ContrastCalculator';
const ItemView = ({ value, color, remove, nav }) => <View
    className="flex-row border px-[8px] justify-between"
    style={{ backgroundColor: color }}
>
    <TouchableOpacity
        onPress={nav}
        className="flex-1 py-10"
    >
        <Text className="text-2xl" style={{ color: contrastCalculator(color) }}>{value}</Text>
    </TouchableOpacity>
    <TouchableOpacity className="py-10" onPress={remove}>
        <Text style={{ color: contrastCalculator(color) }}>Eliminar</Text>
    </TouchableOpacity>
</View>;
export default ItemView;