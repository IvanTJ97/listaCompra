import { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View, StatusBar, FlatList } from "react-native";
import ColorPicker from '../components/ColorPicker';
import { addMainItem, deleteItem } from '../db';
import ItemView from '../components/itemView';
import * as SQLite from 'expo-sqlite';
const ListMaster = ({ navigation }) => {
  const [text, setText] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [color, setColor] = useState("#ff00cc");
  const [items, setItems] = useState([]);
  const db = SQLite.openDatabase("prueba.db");
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS lista_compra (id integer primary key not null, color text, value text);", []
      );
      tx.executeSql(
        "SELECT * FROM lista_compra;",
        [],
        (txObj, { rows: { _array } }) => setItems(_array)
      );
    });
  }, [toggle]);
  const addItem = () => {
    addMainItem(color, text);
    setText(null);
    setToggle(!toggle);
  };
  const removeItem = (id) => {
    deleteItem('lista_compra', id);
    setToggle(!toggle);
  };
  return <View className="flex-1 bg-white">
    <StatusBar />
    <Text className="text-center font-extrabold text-2xl pt-5">Lista de la compra</Text>
    <View className="flex-row items-center">
      <TextInput
        className="border rounded flex-1 h-[48px] m-[16px] mr-2 p-[8px]"
        onChangeText={(text) => setText(text)}
        placeholder="Nombre Lista"
        value={text}
      />
      <TouchableOpacity onPress={() => setModal(true)} className="mr-[16px] py-2 px-4" style={{ backgroundColor: color }}>
        <Text className="text-xl" style={{ color }}>+</Text>
      </TouchableOpacity>
    </View>
    <View className="flex-row">
      <TouchableOpacity onPress={addItem} className=" bg-black py-5 px-4 w-full">
        <Text className="text-white text-xl text-center">+</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={items}
      renderItem={({ item }) => <ItemView
        id={item.id}
        value={item.value}
        color={item.color}
        remove={() => removeItem(item.id)}
        nav={() => navigation.navigate('Child', { color: item.color, value: item.value })}
      />}
      keyExtractor={item => item.id}
    />
    <ColorPicker funClose={() => setModal(false)} modal={modal} funColor={color => setColor(color)} />
  </View>;
};
export default ListMaster;