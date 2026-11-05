import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';
import { assessmentEnabled } from '@/lib/release-config';
const unavailable = () => Promise.reject(new Error('Configure your own backend before using this feature.'));
/** @type {ReturnType<typeof createClient>} */
const disabled = /** @type {any} */ ({ integrations: { Core: { InvokeLLM: unavailable } } });
export const base44 = assessmentEnabled ? createClient({
  appId: appParams.appId,
  appBaseUrl: appParams.appBaseUrl,
  serverUrl: '',
  requiresAuth: false,
  analytics: { enabled: false },
}) : disabled;
