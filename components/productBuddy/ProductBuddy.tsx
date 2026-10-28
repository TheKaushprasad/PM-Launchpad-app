import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarCheck, Loader2, LogIn, Search, UserRound, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Panel } from './ui';
import { buddyApi } from './api';
import { ProfileForm } from './ProfileForm';
import { FindBuddy } from './FindBuddy';
import { RequestsTab } from './RequestsTab';
import { SessionsTab } from './SessionsTab';
import type { BuddyProfile } from '../../lib/productBuddy/types';

// Product Buddy: find a peer for a PM mock interview, send one request to up to 3 people, and the
// first to accept gets the session (call link + calendar invite by email). Local-only for now
// (lib/featureFlags.ts); the server owns every status change (server/productBuddy/routes.ts).

const TABS = ['find', 'requests', 'sessions', 'profile'] as const;
type Tab = (typeof TABS)[number];

const STEPS = [
  { icon: UserRound, title: 'Set up once', text: 'Your level, interview types and the weekly times you are free.' },
  { icon: Search, title: 'Pick a time', text: 'See who is free then and why they match. Ask up to 3 people.' },
  { icon: CalendarCheck, title: 'First yes wins', text: 'You both get a call link and a calendar invite by email.' },
];

const Header = () => (
  <header className="space-y-2">
    <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">Mock interviews · local preview</p>
    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2"><Users className="size-7 text-brand-600" /> Product Buddy</h1>
    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
      Find another PM candidate to practise mock interviews with. Swap turns, give each other honest feedback, and keep a steady weekly rhythm.
    </p>
  </header>
);

const HowItWorks = () => (
  <ol className="grid sm:grid-cols-3 gap-3">
    {STEPS.map(({ icon: Icon, title, text }, i) => (
      <li key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
        <Icon className="size-5 text-brand-600" />
        <p className="mt-2 font-black text-slate-900 text-sm">{i + 1}. {title}</p>
        <p className="text-xs text-slate-600 mt-1">{text}</p>
      </li>
    ))}
  </ol>
);

const ProductBuddy: React.FC = () => {
  const { user, userProfile, loading } = useAuth();
  const [params, setParams] = useSearchParams();
  const [authOpen, setAuthOpen] = useState(false);
  const [profile, setProfile] = useState<BuddyProfile | null | undefined>(undefined);
  const [error, setError] = useState('');
  const [pendingCount, setPendingCount] = useState(0);

  const tab: Tab = (TABS as readonly string[]).includes(params.get('tab') || '') ? (params.get('tab') as Tab) : params.get('request') ? 'requests' : 'find';
  const setTab = (t: string) => setParams(t === 'find' ? {} : { tab: t }, { replace: true });

  useEffect(() => {
    if (!user) return;
    setError('');
    buddyApi.getProfile().then((d) => setProfile(d.profile)).catch((err) => setError(err.message));
  }, [user?.uid]);

  useEffect(() => {
    if (profile) buddyApi.listRequests().then((d) => setPendingCount(d.received.filter((r) => r.status === 'pending' && r.recipients[profile.uid]?.response === 'waiting').length)).catch(() => {});
  }, [profile?.uid]);

  const defaults = {
    name: userProfile?.name || userProfile?.displayName || user?.displayName || '',
    organisation: userProfile?.companyName || userProfile?.collegeName || '',
    currentRole: userProfile?.designation || '',
    experienceYears: Number(userProfile?.experienceYears) || 0,
  };

  let body: React.ReactNode;
  if (!user) {
    body = (
      <>
        <HowItWorks />
        <Panel className="text-center space-y-3">
          <p className="text-sm text-slate-600">Sign in to create your buddy profile. Session invites go to your email.</p>
          <Button variant="brand" onClick={() => setAuthOpen(true)} disabled={loading}><LogIn className="size-4" /> Sign in to find a buddy</Button>
        </Panel>
      </>
    );
  } else if (error) {
    body = <Panel><p className="text-sm text-rose-700">{error}</p></Panel>;
  } else if (profile === undefined) {
    body = <div className="py-10 text-center"><Loader2 className="size-6 animate-spin mx-auto text-brand-600" /></div>;
  } else if (profile === null) {
    body = (
      <>
        <HowItWorks />
        <ProfileForm profile={null} defaults={defaults} onSaved={(p) => { setProfile(p); setTab('find'); }} />
      </>
    );
  } else {
    body = (
      <Tabs value={tab} onValueChange={setTab} className="gap-4">
        <TabsList className="w-full sm:w-fit overflow-x-auto justify-start">
          <TabsTrigger value="find">Find a buddy</TabsTrigger>
          <TabsTrigger value="requests">
            Requests
            {pendingCount > 0 && <span className="ml-1 rounded-full bg-amber-500 text-white text-[10px] font-black px-1.5">{pendingCount}</span>}
          </TabsTrigger>
          <TabsTrigger value="sessions">My sessions</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="find"><FindBuddy profile={profile} onSent={() => setTab('requests')} /></TabsContent>
        <TabsContent value="requests">
          <RequestsTab me={profile} highlightId={params.get('request') || undefined} onAccepted={() => setTab('sessions')} onCountChange={setPendingCount} />
        </TabsContent>
        <TabsContent value="sessions"><SessionsTab me={profile} /></TabsContent>
        <TabsContent value="profile"><ProfileForm profile={profile} defaults={defaults} onSaved={setProfile} /></TabsContent>
      </Tabs>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/buddy" onSuccess={() => setAuthOpen(false)} />
      <Header />
      {body}
    </div>
  );
};

export default ProductBuddy;
