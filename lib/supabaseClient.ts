import { createClient } from '@supabase/supabase-js';

// The API Key provided
const SUPABASE_ANON_KEY = 'sb_publishable_wUTyzMqNvyod1O9xA05EHw_F0GE7eEU';

const SUPABASE_URL = 'https://jpmcnucswvttgqodbfrh.supabase.co';

// Create the client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);