<script setup lang="ts">
import { defineComponent } from "vue";
import { useLaunchStore } from "~/store/launchStore";
const launchStore = useLaunchStore();
launchStore.fetchSavedLaunches();
</script>

<template>
  <div class="p-4">
    <div
      class="flex flex-col justify-center"
      v-if="
        !launchStore.getSavedLaunches.length &&
        launchStore.getPendingAsyncCalls.includes('FetchSavedLaunches')
      "
    >
      <span class="loading loading-bars loading-lg self-center" />
    </div>

    <div
      v-else-if="
        launchStore.getSavedLaunches.length &&
        !launchStore.getPendingAsyncCalls.includes('FetchSavedLaunches')
      "
      class="flex flex-wrap justify-center align-top content-between"
    >
      <div
        v-for="launch in launchStore.getSavedLaunches"
        :key="launch.flight_number"
        class="card bg-neutral text-neutral-content w-72 m-4"
      >
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ launch.name }}</h2>
          <p>Flight Number: {{ launch.flight_number }}</p>
          <div class="self-center">
            <img :src="launch.links.patch.small" alt="No image" class="h-32" />
          </div>
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

    <div v-else class="flex flex-col justify-center text-center">
      <span> You have not saved any launches. </span>
      <span>
        Go back to
        <NuxtLink class="link" to="/">all launches</NuxtLink>
      </span>
    </div>
  </div>
</template>
