<script lang="ts">
import { defineComponent } from "vue";
import { useLaunchStore } from "~/store/launchStore";
export default defineComponent({
  setup() {
    const launchStore = useLaunchStore();
    return { ...launchStore };
  },
});
</script>

<template>
  <div>
    <h1>Saved Launches</h1>
    <div
      v-for="launch in savedLaunches"
      :key="launch.flight_number"
      class="card"
    >
      <h2>{{ launch.name }}</h2>
      <p>Flight Number: {{ launch.flight_number }}</p>
      <button @click="removeLaunch(launch.flight_number)">Remove</button>
    </div>
  </div>
</template>
