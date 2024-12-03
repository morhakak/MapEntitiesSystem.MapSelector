<template>
  <div class="flex px-8 py-8 gap-8">
    <div class="rounded-xl shadow-lg py-4 px-8">
      <h2 class="text-xl font-semibold">Please Select a Map</h2>
      <div class="flex flex-col items-start mt-4">
        <button>Map 1</button>
        <button>map 2</button>
        <button>map 3</button>
      </div>
    </div>
    <div class="rounded-xl shadow-lg py-4 px-8">
      <div class="relative">
        <img
          @click="publishEntityCoordinates"
          src="https://cdn1.justfreeslide.com/2022/03/USA-Map-With-State-Names-ppt.jpeg"
          alt="usa map"
          class="w-full"
        />
        <div
          class="absolute size-4 rounded-full bg-red-500"
          :class="`top-[${coordinates.lat}px] left-[${coordinates.lon}px]`"
          :style="{
            left: `${coordinates.lon}px`,
            top: `${coordinates.lat}px`,
            transform: 'translate(-50%, -50%)',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMapSelectorStore } from '@/stores/mapsSelectorStore'
import { ref } from 'vue'

const mapSelectorStore = useMapSelectorStore()
const coordinates = ref({
  title: '',
  lon: 0,
  lat: 0,
})
async function publishEntityCoordinates(e) {
  ;(coordinates.value.lon = e.offsetX), (coordinates.value.lat = e.offsetY)
  coordinates.value.title = 'test'
  console.log(coordinates.value)

  await mapSelectorStore.sendEntityCoordinates(coordinates.value)
}
</script>
