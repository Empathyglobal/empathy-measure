import { requireObjectResponse } from '../src/lib/validate-response.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  clampScore, SCORE_MIN, SCORE_MAX, SKILLS, CHILD_SKILLS, SAMPLE_REPORTS,
  saveLocalResult, getLocalResult, listLocalResults, deleteLocalResult,
  LOCAL_MAX_RESULTS, saveSession, loadSession, clearSession,
} from '../src/components/cookie/cookie.js';
const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('score helper stays inside documented experimental boundaries', () => {
  for (const x of [-200,0,1,10,44.5,99,100,1000,NaN,undefined,'bad']) {
    assert.ok(clampScore(x) >= SCORE_MIN && clampScore(x) <= SCORE_MAX);
  }
  assert.equal(clampScore(44.5),45);
  assert.equal(SKILLS.length,7);
  assert.equal(CHILD_SKILLS.length,7);
});

test('fictional sample reports are present, with a visible disclaimer', () => {
  assert.ok(SAMPLE_REPORTS.length > 0);
  assert.match(read('src/pages/Samples.jsx'), /not real people|fictional/i);
});

test('local storage round trip and deletion use synthetic records only', () => {
  const values = new Map();
  globalThis.window = {localStorage: {getItem:k=>values.get(k)??null, setItem:(k,v)=>values.set(k,v), removeItem:k=>values.delete(k)}};
  const state={name:'Example',band:'25to34',history:[{n:1,question:'Example?',answer:'Synthetic answer'}]};
  const id=saveLocalResult(state,{composite:44,scores:[]});
  assert.equal(getLocalResult(id).name,'Example');
  assert.equal(getLocalResult(id).history[0].answer,'Synthetic answer');
  assert.equal(deleteLocalResult(id),true);
  assert.equal(getLocalResult(id),null);
  for(let i=0;i<20;i++)saveLocalResult(state,{composite:44});
  assert.equal(listLocalResults().length,LOCAL_MAX_RESULTS);
  saveSession(state,{action:'question',text:'Example?',question_number:1},1);
  assert.equal(loadSession().name,'Example');
  clearSession();assert.equal(loadSession(),null);
  delete globalThis.window;
});

test('storage denial is handled without crashing', () => {
  globalThis.window={localStorage:{getItem(){throw new Error('blocked')},setItem(){throw new Error('blocked')},removeItem(){throw new Error('blocked')}}};
  assert.equal(saveLocalResult({band:'25to34'},{}),null);
  assert.deepEqual(listLocalResults(),[]);
  delete globalThis.window;
});

test('preview mode has no configured service and requires explicit inference opt-in', () => {
  const env=read('.env.example');
  assert.match(env,/VITE_BASE44_APP_ID=\s*\n/);
  assert.match(env,/VITE_ENABLE_ASSESSMENT=false/);
  const config=read('src/lib/release-config.js');
  assert.match(config,/backendConfigured && import\.meta\.env\.VITE_ENABLE_ASSESSMENT === 'true'/);
  const client=read('src/api/base44Client.js');
  assert.match(client,/assessmentEnabled \? createClient/);
  assert.match(client,/analytics: \{ enabled: false \}/);
  assert.match(read('src/lib/assessment-client.js'),/if \(!assessmentEnabled\) throw/);
  assert.doesNotMatch(read('src/App.jsx'), /AuthProvider|useAuth/);
});

test('community scope has no server record-storage or messaging implementation', () => {
  assert.equal(fs.existsSync(new URL('../base44/functions/',import.meta.url)),false);
  assert.equal(fs.existsSync(new URL('../base44/entities/',import.meta.url)),false);
  const walk = path => fs.readdirSync(path,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(new URL(e.name+'/',path)):[new URL(e.name,path)]);
  for(const path of walk(new URL('../src/',import.meta.url))) {
    assert.doesNotMatch(fs.readFileSync(path,'utf8'), /\.entities\.|\.functions\.invoke/);
  }
});

test('app identity comes only from operator build configuration', () => {
  const params=read('src/lib/app-params.js');
  assert.doesNotMatch(params,/appId:\s*getAppParamValue|appBaseUrl:\s*getAppParamValue/);
  assert.match(params,/appId: import\.meta\.env\.VITE_BASE44_APP_ID/);
  assert.match(params,/appBaseUrl: import\.meta\.env\.VITE_BASE44_APP_BASE_URL/);
});

test('preview configuration disables instrumentation and uses local font/image alternatives', () => {
  const config=read('vite.config.js');
  for(const name of ['analyticsTracker','visualEditAgent','navigationNotifier','hmrNotifier']) assert.match(config,new RegExp(name+': false'));
  assert.doesNotMatch(read('src/index.css'),/fonts\.googleapis\.com/);
  assert.doesNotMatch(read('src/components/ui/image.jsx'),/https:\/\/static\.wixstatic\.com/);
});

test('provider output must be an object before UI consumption', () => {
  for (const value of [null, undefined, 'text', 12, true, []]) assert.throws(() => requireObjectResponse(value));
  const response = {action:'question',text:'Synthetic prompt'};
  assert.equal(requireObjectResponse(response),response);
});
