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
    asyncStatus: [] as AsyncStatus[],
  }),

  getters: {
    getAsyncStatus: (state) => state.asyncStatus,
    getLaunches: (state) => state.launches,
  },

  actions: {
    async fetchLaunches() {
      try {
        this._updateAsyncStatus({ name: "fetchLaunches", status: "loading" });
        const response = await axios.get(
          "https://api.spacexdata.com/v4/launches",
        );
        this.launches = response.data
          .sort(
            (a: Launch, b: Launch) =>
              new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime(),
          )
          .slice(0, 30);
        this._updateAsyncStatus({ name: "fetchLaunches", status: "success" });
      } catch (error) {
        console.error(error);
        this._updateAsyncStatus({ name: "fetchLaunches", status: "failed" });
      }
    },

    async saveLaunch(launch: Launch) {
      const notifyStore = useNotifyStore();
      try {
        notifyStore.notify(
          `Saving launch ${launch.flight_number}`,
          NotificationType.Info,
        );
        const response = await axios.post("/api/launch", { launch });
        this.savedLaunches.push(response.data);
        notifyStore.notify(`Saved!`, NotificationType.Success);
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.data.error.code === 11000) {
            this._updateAsyncStatus({
              name: "saveLaunch",
              status: "failed",
              message: "Already saved this launch",
            });
          }
        }
        notifyStore.notify(`ERROR: ${error}`, NotificationType.Error);
        console.error(error);
        this._updateAsyncStatus({ name: "saveLaunch", status: "failed" });
      }
    },

    async removeLaunch(flight_number: number) {
      try {
        this._updateAsyncStatus({ name: "removeLaunch", status: "loading" });
        await axios.delete("/api/launch?flight_number=" + flight_number);
        await this.getSavedLaunches();
        this._updateAsyncStatus({ name: "removeLaunch", status: "success" });
      } catch (error) {
        console.error(error);
        this._updateAsyncStatus({ name: "removeLaunch", status: "failed" });
      }
    },

    async getSavedLaunches() {
      try {
        this._updateAsyncStatus({
          name: "getSavedLaunches",
          status: "loading",
        });
        const response = await axios.get("/api/launch");
        this.savedLaunches = response.data;
        this._updateAsyncStatus({
          name: "getSavedLaunches",
          status: "success",
        });
        return this.savedLaunches;
      } catch (error) {
        console.error(error);
        this._updateAsyncStatus({ name: "getSavedLaunches", status: "failed" });
      }
    },

    _updateAsyncStatus(asyncStatus: AsyncStatus) {
      const statusIndex = this.asyncStatus.findIndex(
        (it) => it.name === asyncStatus.name,
      );
      if (statusIndex > -1) {
        this.asyncStatus[statusIndex] = asyncStatus;
      } else {
        this.asyncStatus.push(asyncStatus);
      }
    },
  },
});
