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
      this.savedLaunches.push(launch);
      const response = await axios.post("/api/saveLaunch", { launch });
      console.log({ response });
      // Here, you would also send a request to your backend to save the launch
    },

    async removeLaunch(flight_number: number) {
      this.savedLaunches = this.savedLaunches.filter(
        (launch) => launch.flight_number !== flight_number,
      );
      const response = await axios.delete(
        "/api/removeLaunch?flight_number=" + flight_number,
      );
      console.log(response);
      // Here, you would also send a request to your backend to remove the launch
    },
  },
});
