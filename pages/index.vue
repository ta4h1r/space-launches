<script setup lang="ts">
import { defineComponent } from "vue";
import { useLaunchStore } from "../store/launchStore.ts";

const launchStore = useLaunchStore();
launchStore.fetchLaunches();
</script>

<template>
  <div>
    <table class="table table-xs table-pin-rows">
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
