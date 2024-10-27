import { defineStore } from "pinia";
import axios from "axios";

interface Launch {
  flight_number: number;
  name: string;
  date_utc: string;
}

export const useLaunchStore = defineStore("launch", {
  state: () => ({
    launches: [] as Launch[],
    savedLaunches: [] as Launch[],
  }),

  actions: {
    async fetchLaunches() {
      const response = await axios.get(
        "https://api.spacexdata.com/v4/launches",
      );
      this.launches = response.data
        .sort(
          (a: Launch, b: Launch) =>
            new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime(),
        )
        .slice(0, 30);
    },

    async saveLaunch(launch: Launch) {
      await axios.post("/api/launch", { launch });
      this.savedLaunches.push(launch);
    },

    async removeLaunch(flight_number: number) {
      await axios.delete("/api/launch?flight_number=" + flight_number);
      this.savedLaunches = this.savedLaunches.filter(
        (launch) => launch.flight_number !== flight_number,
      );
    },

    async getSavedLaunches() {
      const response = await axios.get("/api/launch");
      this.savedLaunches = response.data?.launches;
      return this.savedLaunches;
    },
  },
});
