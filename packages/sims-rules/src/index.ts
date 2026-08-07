import { CanonicalEmotion, CanonicalNeedKey, NeedState, SimStateSnapshot } from '@chris-save/domain';

export const RULESET_VERSION = '2026.1.0';

export const CANONICAL_NEEDS = new Set<CanonicalNeedKey>([
  'bladder', 'hunger', 'energy', 'fun', 'social', 'hygiene'
]);

export const CANONICAL_EMOTIONS = new Set<CanonicalEmotion>([
  'Fine', 'Happy', 'Inspired', 'Focused', 'Confident', 'Energized',
  'Playful', 'Flirty', 'Sad', 'Angry', 'Tense', 'Uncomfortable',
  'Embarrassed', 'Bored', 'Dazed', 'Scared'
]);

export const CANONICAL_SKILLS = new Set([
  'Logic', 'Research & Debate', 'Programming', 'Fitness',
  'Writing', 'Charisma', 'Cooking', 'Guitar', 'Handiness'
]);

export function validateSimDelta(proposed: any) {
  const rejectedReasons: string[] = [];
  const acceptedDelta: any = {};

  if (proposed.needsDelta) {
    acceptedDelta.needsDelta = {};
    for (const [key, val] of Object.entries(proposed.needsDelta)) {
      if (CANONICAL_NEEDS.has(key as CanonicalNeedKey)) {
        acceptedDelta.needsDelta[key] = val;
      } else {
        rejectedReasons.push(`Rejected non-canonical Need: '${key}'`);
      }
    }
  }

  if (proposed.emotionProposal) {
    if (CANONICAL_EMOTIONS.has(proposed.emotionProposal as CanonicalEmotion)) {
      acceptedDelta.emotionProposal = proposed.emotionProposal;
    } else {
      rejectedReasons.push(`Rejected non-canonical Emotion: '${proposed.emotionProposal}'`);
    }
  }

  return { valid: rejectedReasons.length === 0, acceptedDelta, rejectedReasons };
}

export function projectStateOverTime(snapshot: SimStateSnapshot, now: Date): SimStateSnapshot {
  const DECAY_RATES: Record<CanonicalNeedKey, number> = {
    hunger: 4.5, energy: 3.5, bladder: 5.0, hygiene: 2.5, fun: 3.0, social: 2.0
  };

  const updatedNeeds = { ...snapshot.needs };
  for (const key of CANONICAL_NEEDS) {
    const current = updatedNeeds[key] || { value: 50, confidence: 0.1, lastUpdated: snapshot.asOf };
    const hoursElapsed = Math.max(0, (now.getTime() - new Date(current.lastUpdated).getTime()) / (1000 * 60 * 60));
    if (hoursElapsed > 0) {
      const newValue = Math.max(0, Math.min(100, current.value - (hoursElapsed * DECAY_RATES[key])));
      const newConfidence = Math.max(0.05, current.confidence - (hoursElapsed * 0.05));
      updatedNeeds[key] = { value: Math.round(newValue), confidence: Math.round(newConfidence * 100) / 100, lastUpdated: now };
    }
  }

  return { ...snapshot, asOf: now, needs: updatedNeeds };
}
