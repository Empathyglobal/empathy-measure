// The community edition makes no backend connection until its operator opts in.
export const backendConfigured = Boolean(import.meta.env.VITE_BASE44_APP_ID);
export const assessmentEnabled = backendConfigured && import.meta.env.VITE_ENABLE_ASSESSMENT === 'true';
