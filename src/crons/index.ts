import { removedOldTokens } from "./remove-old-tokens.cron";
import { sendNotificationToOldVisitor } from "./send-notification-to-old-visitors.cron";

export const cronRunner = () => {
  removedOldTokens.start();
  sendNotificationToOldVisitor.start();
};
