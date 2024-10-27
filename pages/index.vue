<script setup lang="ts">
import { defineComponent } from "vue";
import { useLaunchStore } from "../store/launchStore.ts";

const launchStore = useLaunchStore();
</script>

<template>
  <div>
    <h1>SpaceX Launches</h1>
    <button @click="launchStore.fetchLaunches">Load Launches</button>
    <table>
      <tr v-for="launch in launchStore.launches" :key="launch.flight_number">
        <td>{{ launch.flight_number }}</td>
        <td>{{ launch.name }}</td>
        <td>{{ new Date(launch.date_utc).toLocaleDateString() }}</td>
        <td><button @click="launchStore.saveLaunch(launch)">Save</button></td>
      </tr>
    </table>
  </div>
</template>
