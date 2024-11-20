import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { DataProps } from "../../App";
const noData = require('../../assets/no-item.png')

interface ListTaskProps {
  data: DataProps[];
  onUpdateData: (id: string, value: boolean) => void;
  onDelete: (id: string) => void;
}

export function ListTask({ data, onUpdateData, onDelete }: ListTaskProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      className="h-full mt-11 px-7"
      renderItem={({ item }) => (
        <View
          className="flex flex-row items-center h-16 bg-[#333333] rounded-xl border border-gray-500 justify-between w-full px-4 mb-2"
        >
          <Pressable
            onPress={() => onUpdateData(item.id, !item.check)}
            className={`${
              item.check
                ? 'bg-indigo-600 border-indigo-600 border-2'
                : 'border-cyan-500'
            } text-white flex flex-row justify-center items-center rounded-full border-2 w-5 h-5`}
          >
            {item.check && <AntDesign name="check" size={11} color="white" />}
          </Pressable>

          <Text
            className={`${
              item.check ? 'text-gray-500 line-through' : ''
            } text-gray-100 w-64`}
          >
            {item.content}
          </Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => onDelete(item.id)}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={20}
              color="#808080"
            />
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={() => (
        <View className="h-[208px] flex flex-col justify-center items-center">
        <Image source={noData} className="w-14 h-14" />
        <Text className="text-center mt-6 text-gray-400">Aún no tienes tareas registradas</Text>
        <Text className="text-center text-gray-500">Crea tareas y organiza tus tareas pendientes</Text>
      </View>
      )}
    />
  );
}
