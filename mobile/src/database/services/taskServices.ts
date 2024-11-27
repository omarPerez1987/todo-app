import { Q } from '@nozbe/watermelondb'
import database from '..'
import Task from '../models/Task'
import { mySync } from '../synchronize/synchronize'
import { addEventListener } from '@react-native-community/netinfo'

async function handleSync() {
  const unsubscribe = addEventListener(async (state) => {
    if (state.isConnected) {
      await mySync()
    }
    unsubscribe()
  })
}

export async function getTasks() {
  return await database.write(async () => {
    const tasksCollection = database.collections.get<Task>('tasks')
    const tasks = await tasksCollection
      .query(Q.where('status', Q.notIn(['archived', 'deleted'])))
      .fetch()

    return tasks
  })
}

export async function createTask(data: { content: string }) {
  return await database.write(async () => {
    const tasksCollection = database.collections.get<Task>('tasks')
    await tasksCollection.create((task) => {
      task.content = data.content
      task.isCompleted = false
    })

    await handleSync()
  })
}

export async function updateTask(id: string, newContent: boolean) {
  return await database.write(async () => {
    const tasksCollection = database.collections.get<Task>('tasks')
    const task = await tasksCollection.find(id)

    await task.update((task) => {
      task.isCompleted = newContent
    })
    await handleSync()
  })
}

export async function deleteTask(id: string) {
  await database.write(async () => {
    const tasksCollection = database.collections.get<Task>('tasks')
    const task = await tasksCollection.find(id)

    await task.markAsDeleted()
    await handleSync()
  })
}
