import { defineStore } from "pinia";
import axios, { isAxiosError } from "axios";
import type { Launch } from "../types/Launch";
import { NotificationType, useNotifyStore } from "./notifyStore";

interface AsyncStatus {
  name: "fetchLaunches" | "getSavedLaunches" | "removeLaunch" | "saveLaunch";
  status: "loading" | "failed" | "success";
  message?: string;
}

export const useLaunchStore = defineStore("launch", {
  state: () => ({
    launches: [] as Launch[],
    savedLaunches: [] as Launch[],
  }),

  getters: {
    getLaunches: (state) => state.launches,
  },

  actions: {
    async fetchLaunches() {
      const notifyStore = useNotifyStore();
      try {
        const response = await axios.get(
          "https://api.spacexdata.com/v4/launches",
        );
        this.launches = response.data
          .sort(
            (a: Launch, b: Launch) =>
              new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime(),
          )
          .slice(0, 30);
      } catch (error) {
        console.error(error);
        notifyStore.notify(
          `Failed to fetch launche\nERROR: ${error}`,
          NotificationType.Error,
        );
      }
    },

    async saveLaunch(launch: Launch) {
      const notifyStore = useNotifyStore();
      try {
        const response = await axios.post("/api/launch", { launch });
        this.savedLaunches.push(response.data);
        notifyStore.notify(
          `Saved launch ${launch.flight_number}`,
          NotificationType.Success,
        );
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.data.error.code === 11000) {
            notifyStore.notify(
              `Already saved launch ${launch.flight_number}`,
              NotificationType.Warning,
            );
            return;
          }
        }
        notifyStore.notify(
          `Failed to save launch ${launch.flight_number}\nERROR: ${error}`,
          NotificationType.Error,
        );
        console.error(error);
      }
    },

    async removeLaunch(flight_number: number) {
      const notifyStore = useNotifyStore();
      try {
        await axios.delete("/api/launch?flight_number=" + flight_number);
        await this.getSavedLaunches();
        notifyStore.notify(
          `Removed launch ${flight_number}`,
          NotificationType.Success,
        );
      } catch (error) {
        console.error(error);
        notifyStore.notify(
          `Failed to remove launch ${flight_number}\nERROR: ${error}`,
          NotificationType.Error,
        );
      }
    },

    async getSavedLaunches() {
      const notifyStore = useNotifyStore();
      try {
        const response = await axios.get("/api/launch");
        this.savedLaunches = response.data;
        return this.savedLaunches;
      } catch (error) {
        console.error(error);
        notifyStore.notify(
          `Failed to get saved launches\nERROR: ${error}`,
          NotificationType.Error,
        );
      }
    },
  },
});
