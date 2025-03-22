import { authConfig } from "../amplifyConfig";
import { createServerRunner } from "@aws-amplify/adapter-nextjs"

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});
