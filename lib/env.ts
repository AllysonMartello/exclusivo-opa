import { z } from "zod";

const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const serverSchema = z.object({
  RESEND_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  LEAD_TO_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.preprocess(
    emptyToUndefined,
    z.string().url().default("http://localhost:3000")
  ),
  NEXT_PUBLIC_GTM_ID: z.preprocess(emptyToUndefined, z.string().default("GTM-5XNTPNB9")),
  NEXT_PUBLIC_CLARITY_ID: z.preprocess(emptyToUndefined, z.string().default("wqp7zvhddc")),
});

export const serverEnv = serverSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LEAD_TO_EMAIL: process.env.LEAD_TO_EMAIL,
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
});
