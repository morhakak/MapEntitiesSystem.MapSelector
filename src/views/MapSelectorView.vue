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
          @click="setCoordinates"
          src="https://cdn1.justfreeslide.com/2022/03/USA-Map-With-State-Names-ppt.jpeg"
          alt="usa map"
          class="w-full"
        />
        <LocationIcon
          v-if="mapWasClicked"
          class="absolute w-8 rounded-full shadow-xl fill-red-500"
          :style="{
            left: `${coordinates.lon}px`,
            top: `${coordinates.lat}px`,
            transform: 'translate(-50%, -50%)',
          }"
        />
        <div class="h-8 w-12">
          <Transition name="fade">
            <input
              v-if="mapWasClicked"
              v-model="coordinates.title"
              type="text"
              placeholder="Location"
              class="py-2 px-2 rounded-xl shadow-xl"
              :style="{
                position: 'absolute',
                left: `calc(${coordinates.lon}px + 12%)`,
                top: `${coordinates.lat}px`,
                transform: 'translate(-50%, -50%)',
              }"
            />
          </Transition>
          <Transition name="fade">
            <button
              v-if="coordinates.title.length && mapWasClicked"
              @click="publishEntityCoordinates"
              class="absolute bg-green-700 py-2 px-4 rounded-xl text-white"
              :style="{
                position: 'absolute',
                left: `calc(${coordinates.lon}px + 27%)`,
                top: `${coordinates.lat}px`,
                transform: 'translate(-50%, -50%)',
              }"
            >
              Send
            </button>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LocationIcon from '@/components/LocationIcon.vue'
import { useMapSelectorStore } from '@/stores/mapsSelectorStore'
import { ref } from 'vue'

const mapWasClicked = ref(false)

const mapSelectorStore = useMapSelectorStore()
const coordinates = ref({
  title: '',
  lon: 0,
  lat: 0,
})

function setCoordinates(e) {
  mapWasClicked.value = true
  ;(coordinates.value.lon = e.offsetX), (coordinates.value.lat = e.offsetY)
}

async function publishEntityCoordinates() {
  await mapSelectorStore.sendEntityCoordinates(coordinates.value)
  coordinates.value.title = ''
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
