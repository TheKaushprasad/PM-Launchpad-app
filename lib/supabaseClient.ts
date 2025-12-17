import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbaxqjiwvwsxwxpmojvk.supabase.co';
const supabaseKey = 'sb_publishable_yl7PQ9Yg7J_H5rmYG8kElA_TdOdn2zm';

export const supabase = createClient(supabaseUrl, supabaseKey);