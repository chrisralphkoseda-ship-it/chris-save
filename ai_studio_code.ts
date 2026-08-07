import { z } from 'zod';

export const EvidenceTypeSchema = z.enum(['DIRECT', 'OBSERVED', 'INFERRED', 'PROJECTED']);
export type EvidenceType = z.infer<typeof EvidenceTypeSchema>;

export const SourceSurfaceSchema = z.enum([
  'STANDALONE_CHAT',
  'QUICK_LOG',
  'CHATGPT_MCP',
  'SCHEDULED_CHECKIN',
  'INTEGRATION'
]);
export type SourceSurface = z.infer<typeof SourceSurfaceSchema>;

export const LifeEventTypeSchema = z.enum([
  'SLEEP_INTERVAL', 'WAKE', 'MEAL', 'DRINK', 'HUNGER_REPORT', 'ENERGY_REPORT',
  'HYGIENE_ACTIVITY', 'BATHROOM_REPORT', 'EXERCISE', 'LEISURE_ACTIVITY',
  'SOCIAL_INTERACTION', 'WORK_ACTIVITY', 'STUDY_ACTIVITY', 'LOCATION_CHANGE',
  'TRAVEL', 'MOOD_SELF_REPORT', 'GOAL_CREATED', 'GOAL_UPDATED', 'PLAN_CREATED',
  'PLAN_UPDATED', 'PURCHASE', 'CAREER_EVENT', 'EDUCATION_EVENT',
  'RELATIONSHIP_EVENT', 'PREFERENCE_SIGNAL', 'BIOGRAPHICAL_FACT', 'CORRECTION'
]);
export type LifeEventType = z.infer<typeof LifeEventTypeSchema>;

export const CanonicalNeedKeySchema = z.enum([
  'bladder', 'hunger', 'energy', 'fun', 'social', 'hygiene'
]);
export type CanonicalNeedKey = z.infer<typeof CanonicalNeedKeySchema>;

export const CanonicalEmotionSchema = z.enum([
  'Fine', 'Happy', 'Inspired', 'Focused', 'Confident', 'Energized',
  'Playful', 'Flirty', 'Sad', 'Angry', 'Tense', 'Uncomfortable',
  'Embarrassed', 'Bored', 'Dazed', 'Scared'
]);
export type CanonicalEmotion = z.infer<typeof CanonicalEmotionSchema>;

export const NeedStateSchema = z.object({
  value: z.number().min(0).max(100),
  confidence: z.number().min(0).max(1),
  lastUpdated: z.coerce.date()
});
export type NeedState = z.infer<typeof NeedStateSchema>;

export const SimStateSnapshotSchema = z.object({
  rulesetVersion: z.string(),
  stateVersion: z.number().int().positive(),
  asOf: z.coerce.date(),
  dominantEmotion: CanonicalEmotionSchema,
  needs: z.record(CanonicalNeedKeySchema, NeedStateSchema),
  activeMoodlets: z.array(z.object({
    catalogueKey: z.string(),
    displayName: z.string(),
    emotion: CanonicalEmotionSchema,
    weight: z.number()
  })),
  skills: z.record(z.string(), z.object({
    level: z.number().min(1).max(10),
    progressPercentage: z.number().min(0).max(100)
  })),
  career: z.object({
    title: z.string(),
    companyOrTrack: z.string(),
    level: z.number().int()
  }).nullable(),
  aspirationProgress: z.object({
    aspirationKey: z.string(),
    currentMilestoneIndex: z.number().int(),
    completedMilestones: z.array(z.string())
  })
});
export type SimStateSnapshot = z.infer<typeof SimStateSnapshotSchema>;