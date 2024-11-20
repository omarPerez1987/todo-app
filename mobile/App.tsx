import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "./src/components/Header";
import AntDesign from '@expo/vector-icons/AntDesign';
import "./global.css";
import { useState } from "react";
import { ListTask } from "./src/components/ListTask";
import uuid from 'react-native-uuid';

export interface DataProps {
    id: string,
    content: string
    check: boolean,
}

export default function App() {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<Array<DataProps>>([]);
  const [inputValue, setInputValue] = useState('');

  const concluidos = data.filter(item => item.check === true).length

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {  

      const newData = {
        id:uuid.v4(),
        content: inputValue,
        check: false,
      }
      setData([...data, newData]);
      setInputValue("");
    }
  };

  const onUpdateData = (id: string, newValue: boolean) => {
    const updatedData = data.map(item =>
      item.id === id ? { ...item, check: newValue } : item
    );
    setData(updatedData);
  };

  const onDelete = (id: string) => {
    const deleteTask = data.filter(item => 
      item.id !== id
    )
    setData(deleteTask)
  }

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <Header />
      <StatusBar />

    <View className="bg-[#262626]">
      <View className="-mt-7 w-full px-14 flex flex-row justify-center h-14 z-30 gap-1">
        <TextInput
          className="h-full w-full border bg-[#333333] relative rounded-lg text-gray-100 placeholder:text-gray-400 px-4"
          placeholder="Añade una nueva tarea..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAddItem}
          className="bg-[#1E6F9F] rounded-lg"
        >
          <View className="w-14 h-full flex flex-row border rounded-lg justify-center items-center">
            <AntDesign name="pluscircleo" size={14} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row justify-between px-7 pt-8">
        <View className="flex flex-row gap-2">
          <Text className="text-blue-400 font-semibold">Creados</Text>
          <Text className="text-gray-200 bg-gray-700 px-2 text-sm font-semibold rounded-full">{data.length}</Text>
        </View>

        <View className="flex flex-row gap-2">
          <Text className="text-indigo-400 font-semibold">Concluidos</Text>
          <Text className="text-gray-200 bg-gray-700 px-2 text-sm font-semibold rounded-full">{concluidos}</Text>
        </View>
      </View>

        <ListTask data={data} onUpdateData={onUpdateData} onDelete={onDelete}/>
    </View>

    </View>
  );
}
