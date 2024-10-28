import { defineStore } from "pinia";
import axios, { isAxiosError } from "axios";
import { type Launch, AsyncFunc } from "../types";
import { NotificationType, useNotifyStore } from "./notifyStore";

export const useLaunchStore = defineStore("launch", {
  state: () => ({
    launches: [] as Launch[],
    savedLaunches: [] as Launch[],
    pendingAsyncCalls: [] as AsyncFunc[], // To decide whether or not we want to display progress loaders
  }),

  getters: {
    getLaunches: (state) => state.launches,
    getSavedLaunches: (state) => state.savedLaunches,
    getPendingAsyncCalls: (state) => state.pendingAsyncCalls,
  },

  actions: {
    async fetchLaunches() {
      const notifyStore = useNotifyStore();
      this._addPendingAsyncCall(AsyncFunc.FetchLaunches);
      try {
        const response: Launch[] = await $fetch(
          "https://api.spacexdata.com/v4/launches",
          { method: "GET" },
        );
        this.launches = response
          .sort(
            (a: Launch, b: Launch) =>
              new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime(),
          )
          .slice(0, 30);
      } catch (error) {
        console.error(error);
        notifyStore.notify(
          `Failed to fetch launches\nERROR: ${error}`,
          NotificationType.Error,
        );
      }
      this._removePendingAsyncCall(AsyncFunc.FetchLaunches);
    },

    async saveLaunch(launch: Launch) {
      const notifyStore = useNotifyStore();
      try {
        // Using axios here for better error handling
        await axios.post("/api/launch", { ...launch });
        await this.fetchSavedLaunches();
        notifyStore.notify(
          `Saved launch ${launch.flight_number}`,
          NotificationType.Success,
        );
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 409) {
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
        await $fetch("/api/launch?flight_number=" + flight_number, {
          method: "DELETE",
        });
        await this.fetchSavedLaunches();
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

    async fetchSavedLaunches() {
      const notifyStore = useNotifyStore();
      this._addPendingAsyncCall(AsyncFunc.FetchSavedLaunches);
      try {
        const response: Launch[] = await $fetch("/api/launch", {
          method: "GET",
        });
        this.savedLaunches = response;
      } catch (error) {
        console.error(error);
        notifyStore.notify(
          `Failed to get saved launches\nERROR: ${error}`,
          NotificationType.Error,
        );
      }
      this._removePendingAsyncCall(AsyncFunc.FetchSavedLaunches);
    },

    _addPendingAsyncCall(asyncFunc: AsyncFunc) {
      this.pendingAsyncCalls.push(asyncFunc);
    },

    _removePendingAsyncCall(asyncFunc: AsyncFunc) {
      this.pendingAsyncCalls = this.pendingAsyncCalls.filter(
        (it) => it != asyncFunc,
      );
    },
  },
});
