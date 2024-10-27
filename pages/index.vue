<script lang="ts">
import { defineComponent } from "vue";
import { useLaunchStore } from "../store/launchStore.ts";

export default defineComponent({
  setup() {
    const launchStore = useLaunchStore();
    launchStore.fetchLaunches();
    return { ...launchStore };
  },
});
</script>

<template>
  <div>
    <h1>SpaceX Launches</h1>
  </div>
</template>
