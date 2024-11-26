import { withObservables } from '@nozbe/watermelondb/react'
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Task from "../database/models/Task";
import { useCallback } from 'react';
import database from '../database';
const noData = require('../../assets/no-item.png')

interface ListTaskProps {
  data: Task[];
  setData: (data: Task[]) => void
  onUpdateData: (id: string, value: boolean) => void;
  onDelete: (id: string) => void;
}

function ListHeader({data} : {data: Task[]}) {

  const concluidos = data.filter((item) => item.isCompleted).length;

  return (
    <View className="flex flex-row justify-between pb-8" >
      <View className="flex flex-row gap-2">
        <Text className="text-blue-400 font-semibold">Creados</Text>
        <Text className="text-gray-200 bg-gray-700 px-2 text-sm font-semibold rounded-full">
          {data.length}
        </Text>
      </View>

      <View className="flex flex-row gap-2">
        <Text className="text-indigo-400 font-semibold">Concluidos</Text>
        <Text className="text-gray-200 bg-gray-700 px-2 text-sm font-semibold rounded-full">
          {concluidos}
        </Text>
      </View>
    </View>
  );
}

const enhanceheader = withObservables([], () => ({
  data: database.collections.get<Task>("tasks").query().observeWithColumns(["content", "is_completed"]),
}));

export const EnhancedHeader = enhanceheader(ListHeader);



function ListItem ({ task, onUpdateData,  onDelete }: {
  task: Task;
  onUpdateData: (id: string, value: boolean) => void;
  onDelete: (id: string) => void;

}) {
  return (
    <View className="flex flex-row items-center h-16 bg-[#333333] rounded-xl border border-gray-500 justify-between w-full px-4 mb-2">
      <Pressable
        onPress={() => onUpdateData(task.id, !task.isCompleted)}
        className={`${
          task.isCompleted
            ? 'bg-indigo-600 border-indigo-600 border-2'
            : 'border-cyan-500'
        } text-white flex flex-row justify-center items-center rounded-full border-2 w-5 h-5`}
      >
        {task.isCompleted && <AntDesign name="check" size={11} color="white" />}
      </Pressable>

      <Text
        className={`${
          task.isCompleted ? 'text-gray-500 line-through' : ''
        } text-gray-100 w-64`}
      >
        {task.content}
      </Text>

      <TouchableOpacity activeOpacity={0.8} onPress={() => onDelete(task.id)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={20}
          color="#808080"
        />
      </TouchableOpacity>
    </View>
  )
}

const enhance = withObservables(['tasks'], ({ tasks }) => ({
  task: tasks
}))
const EnhancedTaskItem = enhance(ListItem)


export function ListTask({ data, onUpdateData, onDelete }: ListTaskProps) {

  const renderItem = useCallback(({ item }: { item: Task }) => {
    return <EnhancedTaskItem tasks={item} onUpdateData={onUpdateData} onDelete={onDelete} />
  }, [onUpdateData, onDelete])

  return (
    <FlatList<Task>
      data={data}
      keyExtractor={(item) => item.id}
      className="h-full mt-11 px-7"
      ListHeaderComponent={<EnhancedHeader />}
      renderItem={renderItem}      
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

const enhanceList = withObservables([], () => ({
  data: database.collections.get<Task>("tasks").query().observe(),
}));

export const EnhancedTaskList = enhanceList(ListTask);