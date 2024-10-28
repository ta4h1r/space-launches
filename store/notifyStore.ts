import { defineStore } from "pinia";

export interface Notification {
  message: string;
  type: NotificationType;
  notifyTime: number;
}

export enum NotificationType {
  Info = "alert alert-info bg-blue-100",
  Success = "alert alert-success bg-green-100",
  Warning = "alert alert-warning bg-yellow-100",
  Error = "alert alert-error bg-red-100",
}

interface State {
  notifications: Notification[];
  notificationsArchive: Notification[];
}

export const useNotifyStore = defineStore("notify", {
  state: (): State => {
    return {
      notifications: [],
      notificationsArchive: [],
    };
  },
  actions: {
    notify(messageOrError: unknown, type: NotificationType) {
      let message: string = "";
      if (messageOrError instanceof Error) message = messageOrError.message;
      if (typeof messageOrError === "string") message = messageOrError;
      const notification: Notification = {
        message,
        type,
        notifyTime: Date.now(),
      };
      this.notifications.push(notification);
      setTimeout(this.removeNotification.bind(this), 3000, notification);
    },
    removeNotification(notification: Notification) {
      this.notifications = this.notifications.filter(
        (n) => n.notifyTime != notification.notifyTime,
      );
    },
  },
});
