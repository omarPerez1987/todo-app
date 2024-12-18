import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'content', type: 'string' },
        { name: 'is_completed', type: 'boolean' },
      ],
    }),
  ],
})
