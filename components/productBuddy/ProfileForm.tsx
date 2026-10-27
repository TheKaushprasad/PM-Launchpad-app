import React, { useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Chips, Panel } from './ui';
import { buddyApi } from './api';
import {
  DAYS, DOMAINS, INTERVIEW_TYPES, PARTICIPATION_LABELS, PROFESSIONS,
  type AvailabilityWindow, type BuddyProfile, type Day, type ParticipationMode,
} from '../../lib/productBuddy/types';

const browserTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  } catch {
    return 'Asia/Kolkata';
  }
};

const PRESETS: { label: string; windows: AvailabilityWindow[] }[] = [
  { label: 'Weekday evenings 7–10 pm', windows: (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as Day[]).map((day) => ({ day, start: '19:00', end: '22:00' })) },
  { label: 'Weekend mornings 10 am–1 pm', windows: (['Sat', 'Sun'] as Day[]).map((day) => ({ day, start: '10:00', end: '13:00' })) },
];

export const ProfileForm: React.FC<{
  profile: BuddyProfile | null;
  defaults: { name: string; organisation?: string; currentRole?: string; experienceYears?: number };
  onSaved: (p: BuddyProfile) => void;
}> = ({ profile, defaults, onSaved }) => {
  const [name, setName] = useState(profile?.name || defaults.name);
  const [profession, setProfession] = useState(profile?.profession || '');
  const [organisation, setOrganisation] = useState(profile?.organisation || defaults.organisation || '');
  const [currentRole, setCurrentRole] = useState(profile?.currentRole || defaults.currentRole || '');
  const [experienceYears, setExperienceYears] = useState(String(profile?.experienceYears ?? defaults.experienceYears ?? 0));
  const [domains, setDomains] = useState<string[]>(profile?.domains || []);
  const [interviewTypes, setInterviewTypes] = useState<string[]>(profile?.interviewTypes || []);
  const [participation, setParticipation] = useState<ParticipationMode>(profile?.participation || 'both');
  const [availability, setAvailability] = useState<AvailabilityWindow[]>(profile?.availability || []);
  const [timezone, setTimezone] = useState(profile?.timezone || browserTimezone());
  const [about, setAbout] = useState(profile?.about || '');
  const [discoverable, setDiscoverable] = useState(profile?.discoverable ?? true);
  const [saving, setSaving] = useState(false);

  const setWindow = (i: number, patch: Partial<AvailabilityWindow>) => setAvailability((a) => a.map((w, j) => (j === i ? { ...w, ...patch } : w)));
  const addPreset = (windows: AvailabilityWindow[]) =>
    setAvailability((a) => [...a, ...windows.filter((w) => !a.some((x) => x.day === w.day && x.start === w.start && x.end === w.end))]);

  const save = async () => {
    setSaving(true);
    try {
      const { profile: saved } = await buddyApi.saveProfile({
        name, profession, organisation, currentRole, experienceYears: Number(experienceYears) || 0,
        domains, interviewTypes, participation, availability, timezone, about, discoverable,
      });
      toast.success(profile ? 'Profile saved' : 'Profile created. Now find a buddy!');
      onSaved(saved);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Panel className="space-y-6">
      {!profile && (
        <div>
          <h2 className="text-lg font-black text-slate-900">Create your Product Buddy profile</h2>
          <p className="text-sm text-slate-600">Takes about a minute. Others see your name, role and practice preferences. Your email stays private until a session is confirmed.</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pb-name" className="font-bold">Name</Label>
          <Input id="pb-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
        </div>
        <div className="space-y-2">
          <Label className="font-bold">Profession</Label>
          <Select value={profession} onValueChange={setProfession}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Pick one" /></SelectTrigger>
            <SelectContent>{PROFESSIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pb-role" className="font-bold">Current role</Label>
          <Input id="pb-role" value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} placeholder="e.g. MBA student, Business Analyst, APM" maxLength={80} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pb-org" className="font-bold">College or company <span className="text-slate-400 font-medium">(optional)</span></Label>
          <Input id="pb-org" value={organisation} onChange={(e) => setOrganisation(e.target.value)} maxLength={120} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pb-exp" className="font-bold">Years of work experience</Label>
          <Input id="pb-exp" type="number" min={0} max={40} value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pb-tz" className="font-bold">Timezone</Label>
          <Input id="pb-tz" value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder="Asia/Kolkata" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-bold">How do you want to practise?</Label>
        <Chips options={['both', 'candidate', 'interviewer'] as const} value={[participation]} onChange={(v) => setParticipation(v[0])} multiple={false} labels={PARTICIPATION_LABELS} />
        <p className="text-xs text-slate-500">"Both" gets you the most matches: most sessions are swaps where you take turns.</p>
      </div>

      <div className="space-y-2">
        <Label className="font-bold">Interview types you want to practise</Label>
        <Chips options={INTERVIEW_TYPES} value={interviewTypes as any} onChange={setInterviewTypes} />
      </div>

      <div className="space-y-2">
        <Label className="font-bold">Domains you know or like</Label>
        <Chips options={DOMAINS} value={domains as any} onChange={setDomains} />
      </div>

      <div className="space-y-3">
        <div>
          <Label className="font-bold">When are you usually free?</Label>
          <p className="text-xs text-slate-500">Weekly times in your timezone. People can only request you inside these windows.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <Button key={p.label} type="button" variant="outline" size="sm" onClick={() => addPreset(p.windows)}><Plus className="size-4" /> {p.label}</Button>
          ))}
          <Button type="button" variant="ghost" size="sm" onClick={() => setAvailability((a) => [...a, { day: 'Sat', start: '18:00', end: '20:00' }])}><Plus className="size-4" /> Custom time</Button>
        </div>
        {availability.length > 0 && (
          <ul className="space-y-2">
            {availability.map((w, i) => (
              <li key={i} className="flex flex-wrap items-center gap-2">
                <Select value={w.day} onValueChange={(day) => setWindow(i, { day: day as Day })}>
                  <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>{DAYS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
                <Input type="time" className="w-32" value={w.start} onChange={(e) => setWindow(i, { start: e.target.value })} aria-label="From" />
                <span className="text-sm text-slate-500">to</span>
                <Input type="time" className="w-32" value={w.end} onChange={(e) => setWindow(i, { end: e.target.value })} aria-label="Until" />
                <Button type="button" variant="ghost" size="icon-sm" onClick={() => setAvailability((a) => a.filter((_, j) => j !== i))} aria-label="Remove time"><Trash2 className="size-4" /></Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pb-about" className="font-bold">A line about you <span className="text-slate-400 font-medium">(optional)</span></Label>
        <Textarea id="pb-about" value={about} onChange={(e) => setAbout(e.target.value)} rows={2} maxLength={300} placeholder="e.g. Preparing for APM roles at consumer startups; strongest at metrics." />
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer">
        <input type="checkbox" className="mt-1 size-4 accent-brand-600" checked={discoverable} onChange={(e) => setDiscoverable(e.target.checked)} />
        <span className="text-sm">
          <span className="font-bold text-slate-900">Show me in matches</span>
          <span className="block text-slate-600">Untick to pause new requests, for example during exams or travel.</span>
        </span>
      </label>

      <Button variant="brand" onClick={save} disabled={saving}>
        {saving && <Loader2 className="size-4 animate-spin" />} {profile ? 'Save profile' : 'Create profile'}
      </Button>
    </Panel>
  );
};
