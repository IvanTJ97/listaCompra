import { ColorPicker } from 'react-native-color-picker';
import { View, Modal } from 'react-native';
const ColorPick = ({ modal, funColor, funClose }) => <Modal
    animationType="slide"
    transparent={false}
    visible={modal}
    onRequestClose={() => funClose()}
    className="flex-1"
>
    <View className='flex-1 bg-black/75'>
        <ColorPicker
            onColorSelected={color => {
                funColor(color);
                funClose();
            }}
            style={{ flex: 1 }}
            hideSliders={true}
        />
    </View>
</Modal>;
export default ColorPick;