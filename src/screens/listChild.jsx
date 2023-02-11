import { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View, StatusBar, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";
import { Ionicons } from '@expo/vector-icons';
import { addItem, setItemsUndone, setItemDone, deleteItem, deleteAllItems } from '../db';
import ElementView from '../components/elementView';
const ListChild = ({ navigation, route }) => {
  const [text, setText] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [items, setItems] = useState([]);
  const { color, value } = route.params;
  const db = SQLite.openDatabase("prueba.db");
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${value} (id integer primary key not null, done int, value text);`, []
      );
      tx.executeSql(
        `SELECT * FROM ${value};`,
        [],
        (txObj, { rows: { _array } }) => setItems(_array)
      );
    });
  }, [toggle]);
  const add = () => {
    addItem(value, text);
    setText(null);
    setToggle(!toggle);
  };
  const reset = () => {
    setItemsUndone(value);
    setToggle(!toggle);
  };
  const setItemD = (id, setDone) => {
    setItemDone(value, id, setDone);
    setToggle(!toggle);
  };
  const removeItem = (id) => {
    deleteItem(value, id);
    setToggle(!toggle);
  };
  const removeAllItems = () => {
    deleteAllItems(value);
    setToggle(!toggle);
  };
  return <View className="flex-1 bg-white">
    <StatusBar />
    <TouchableOpacity className="pt-5 flex-row" onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={31} color={color} />
      <Text className="text-center font-extrabold text-2xl" style={{ color }}>{value}</Text>
    </TouchableOpacity>
    <View className="flex-row items-center">
      <TextInput
        className="border border-indigo-700 rounded flex-1 h-[48px] m-[16px] mr-2 p-[8px]"
        onChangeText={(text) => setText(text)}
        placeholder="Nuevo Item"
        value={text}
      />
      <TouchableOpacity onPress={add} className="mr-[16px] bg-slate-900 py-2 px-4">
        <Text className="text-white text-xl">+</Text>
      </TouchableOpacity>
    </View>
    <View className="flex-row justify-around mb-[10px]">
      <TouchableOpacity className="bg-slate-900 py-2 px-3" onPress={() => setEdit(!edit)}>
        <Text className="text-white text-lg">
          Editar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className={edit ? "bg-slate-900 py-2 px-3" : "hidden"} onPress={removeAllItems}>
        <Text className="text-white text-lg">
          Eliminar todo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className={edit ? "hidden" : "bg-slate-900 py-2 px-3"} onPress={reset}>
        <Text className="text-white text-lg">
          Limpiar
        </Text>
      </TouchableOpacity>
    </View>
    <View className='flex-1'>
      <View className='h-1/2'>
        <Text className='text-2xl ml-4 mb-2 mt-3'>To do</Text>
        <FlatList
          data={items.filter(el => el.done === 0)}
          renderItem={({ item }) => <ElementView
            done={false}
            value={item.value}
            edit={edit}
            func={() => setItemD(item.id, 1)}
            remove={() => removeItem(item.id)}
          />}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => <Text className='text-center text-2xl'>No more items</Text>}
        />
      </View>
      <View className='h-1/2'>
        <Text className='text-2xl ml-4 mb-2 mt-3'>Done</Text>
        <FlatList
          data={items.filter(el => el.done === 1)}
          renderItem={({ item }) => <ElementView
            done={true}
            value={item.value}
            edit={edit}
            func={() => setItemD(item.id, 0)}
            remove={() => removeItem(item.id)}
          />}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => <Text className='text-center text-2xl'>No item picked</Text>}
        />
      </View>
    </View>
  </View>;
};
export default ListChild;