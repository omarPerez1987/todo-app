import { StatusBar, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Header } from './src/components/Header'
import AntDesign from '@expo/vector-icons/AntDesign'
import './global.css'
import { useState } from 'react'
import { EnhancedTaskList } from './src/components/ListTask'
import {
  createTask,
  deleteTask,
  updateTask,
} from './src/database/services/taskServices'

export default function App() {
  const insets = useSafeAreaInsets()
  const [inputValue, setInputValue] = useState('')

  const handleAddItem = async () => {
    if (inputValue.trim() !== '') {
      const newData = {
        content: inputValue,
      }

      await createTask(newData)

      setInputValue('')
    }
  }

  const onUpdateData = async (id: string, newValue: boolean) => {
    await updateTask(id, newValue)
  }

  const onDelete = async (id: string) => {
    await deleteTask(id)
  }

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
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

        <EnhancedTaskList onUpdateData={onUpdateData} onDelete={onDelete} />
      </View>
    </View>
  )
}
