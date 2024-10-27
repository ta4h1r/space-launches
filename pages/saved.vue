<script setup lang="ts">
import { defineComponent } from "vue";
import { useLaunchStore } from "~/store/launchStore";
const launchStore = useLaunchStore();
</script>

<template>
  <div>
    <h1>Saved Launches</h1>
    <div
      v-for="launch in launchStore.savedLaunches"
      :key="launch.flight_number"
      class="card"
    >
      <h2>{{ launch.name }}</h2>
      <p>Flight Number: {{ launch.flight_number }}</p>
      <button @click="launchStore.removeLaunch(launch.flight_number)">
        Remove
      </button>
    </div>
  </div>
</template>
