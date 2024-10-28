<script setup lang="ts">
import { defineComponent } from "vue";
import { useLaunchStore } from "../store/launchStore.ts";

const launchStore = useLaunchStore();
if (!launchStore.getLaunches.length) launchStore.fetchLaunches();
</script>

<template>
  <div class="p-4">
    <span
      class="loading loading-bars loading-lg self-center"
      v-if="
        launchStore.getAsyncStatus.find((it) => it.name === 'fetchLaunches')
          ?.status === 'loading'
      "
    />

    <table
      v-if="
        launchStore.getAsyncStatus.find((it) => it.name === 'fetchLaunches')
          ?.status === 'success'
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
  </div>
</template>
