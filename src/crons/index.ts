import { removedOldTokens } from "./remove-old-tokens.cron";

export const cronRunner = () => {
  removedOldTokens.start();
};
