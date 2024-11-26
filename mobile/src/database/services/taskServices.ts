import { Q } from "@nozbe/watermelondb";
import database from "..";
import Task from "../models/Task";
import { mySync } from "../synchronize/synchronize";
import { fetch } from "@react-native-community/netinfo";

async function  handleSync () {
  fetch().then(async state => {
    if (state.isConnected) {
      try {
        await mySync();
      } catch (error) {
        console.error("Error during synchronization:", error);
      }
    }
  });
}

export async function getTasks() {
  return await database.write(async () => {
    const tasksCollection = database.collections.get<Task>("tasks");
    const tasks = await tasksCollection.query(
      Q.where('status', Q.notIn(['archived', 'deleted']))
    ).fetch()

    handleSync()
    return tasks
  })
}

export async function createTask(data: { content: string }) {
  return await database.write( async () => {
    const tasksCollection = database.collections.get<Task>("tasks");
     await tasksCollection.create(task => {
      task.content = data.content;
      task.isCompleted = false;
    });

    handleSync()
  });

}



  export async function updateTask(id: string, newContent: boolean) {
    return await database.write( async () => {
    const tasksCollection = database.collections.get<Task>("tasks");
    const task = await tasksCollection.find(id)
  
      await task.update(task => {
        task.isCompleted = newContent
      });
      handleSync()
  })
  }

  export async function deleteTask(id: string) {          
    await database.write(async () => {
      const tasksCollection = database.collections.get<Task>("tasks");
      const task = await tasksCollection.find(id)

      await task.markAsDeleted()
      handleSync()
    });
  }