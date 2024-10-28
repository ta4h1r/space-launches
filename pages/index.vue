<script setup lang="ts">
import { defineComponent } from "vue";
import { useLaunchStore } from "../store/launchStore.ts";
import { AsyncFunc } from "../types/";

const launchStore = useLaunchStore();
if (!launchStore.getLaunches.length) launchStore.fetchLaunches();
</script>

<template>
  <div class="p-4">
    <div
      class="flex flex-col justify-center"
      v-if="
        !launchStore.getLaunches.length &&
        launchStore.getPendingAsyncCalls.includes('FetchLaunches')
      "
    >
      <span class="loading loading-bars loading-lg self-center" />
    </div>

    <table
      v-else-if="
        launchStore.getLaunches.length &&
        !launchStore.getPendingAsyncCalls.includes('FetchLaunches')
      "
      class="table table-xs table-pin-rows"
    >
      <thead>
        <tr>
          <th>Flight No.</th>
          <td>Name</td>
          <td>Date</td>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="launch in launchStore.launches" :key="launch.flight_number">
          <th>{{ launch.flight_number }}</th>
          <td>{{ launch.name }}</td>
          <td>{{ new Date(launch.date_utc).toLocaleDateString() }}</td>
          <td>
            <button
              class="btn btn-sm btn-neutral"
              @click="launchStore.saveLaunch(launch)"
            >
              Save
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="flex flex-col justify-center text-center">
      <span>
        Failed to load launch data. This could be a problem with your
      </span>
      <span>
        internet connection, or a problem with the SpaceX API server.
      </span>
      <br />
      <span> Refresh the page, or try again later. </span>
    </div>
  </div>
</template>
