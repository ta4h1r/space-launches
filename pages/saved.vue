<script setup lang="ts">
import { defineComponent } from "vue";
import { useLaunchStore } from "~/store/launchStore";
const launchStore = useLaunchStore();
launchStore.fetchSavedLaunches();
</script>

<template>
  <div>
    <div v-if="!launchStore.getSavedLaunches.length">
      <span>No saved launches</span>
    </div>
    <div
      v-else
      v-for="launch in launchStore.getSavedLaunches"
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
