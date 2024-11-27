import { synchronize } from '@nozbe/watermelondb/sync'
import database from '../index'

const BASE_URL_API = process.env.EXPO_PUBLIC_API_URL

export async function mySync() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
        JSON.stringify(migration),
      )}`
      const response = await fetch(`${BASE_URL_API}/sync?${urlParams}`)
      if (!response.ok) {
        throw new Error(await response.text())
      }

      const { changes, timestamp } = await response.json()
      console.log('sincronizando')
      return { changes, timestamp }
    },

    pushChanges: async ({ changes, lastPulledAt }) => {
      const response = await fetch(
        `${BASE_URL_API}/sync?last_pulled_at=${lastPulledAt}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(changes),
        },
      )
      if (!response.ok) {
        throw new Error(await response.text())
      }
    },
    migrationsEnabledAtVersion: 1,
  })
}
