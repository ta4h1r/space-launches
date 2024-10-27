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
      class="card bg-neutral text-neutral-content w-96 h-48 m-4"
    >
      <div class="card-body items-center text-center">
        <h2 class="card-title">{{ launch.name }}</h2>
        <p>Flight Number: {{ launch.flight_number }}</p>
        <div class="card-actions justify-end">
          <button
            class="btn btn-primary"
            @click="launchStore.removeLaunch(launch.flight_number)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
