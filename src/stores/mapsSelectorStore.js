import axios from 'axios'
import { defineStore } from 'pinia'

export const useMapSelectorStore = defineStore('mapSelectorStore', () => {
  async function sendEntityCoordinates({ title, lon, lat }) {
    console.log(title)
    console.log(lon)
    console.log(lat)

    try {
      const response = await axios.post('https://localhost:7269/api/mapentity', {
        title,
        lon,
        lat,
      })

      if (response.data.isSuccess) {
        console.log('Point was published')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    sendEntityCoordinates,
  }
})
