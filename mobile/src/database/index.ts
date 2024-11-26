import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Platform } from "react-native";

import schema from "./schema";
import migrations from "./migrations"; 
import Task from "./models/Task";
import { Database } from "@nozbe/watermelondb";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: Platform.OS === 'ios',
  onSetUpError: error => {
    console.error('Error:', error)
  }
});

const database = new Database({
  adapter,
  modelClasses: [Task],
});

export default database;
