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

    saveLaunch(launch: Launch) {
      this.savedLaunches.push(launch);
      // Here, you would also send a request to your backend to save the launch
    },

    removeLaunch(flight_number: number) {
      this.savedLaunches = this.savedLaunches.filter(
        (launch) => launch.flight_number !== flight_number,
      );
      // Here, you would also send a request to your backend to remove the launch
    },
  },
});
