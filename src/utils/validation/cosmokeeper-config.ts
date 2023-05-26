import { z } from "zod";

export const cosmokeeper_config_schema = z.object({
  lint: z.object({
    eslint: z.boolean(),
    prettier: z.boolean(),
    matches: z.string()
  }),
  patterns: z.object({
    branch: z.string()
  })
});
