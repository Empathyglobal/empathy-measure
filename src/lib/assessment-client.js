import { requireObjectResponse } from '@/lib/validate-response';
import { base44 } from '@/api/base44Client';
import { assessmentEnabled } from '@/lib/release-config';

export async function invokeAssessmentLLM(options) {
  if (!assessmentEnabled) throw new Error('Assessment inference is disabled in this community preview.');
  return requireObjectResponse(await base44.integrations.Core.InvokeLLM(options));
}
