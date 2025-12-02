import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bfiggqebipockufkrxlf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oa_LyQcfTYfL5mJmfRVtiA_oNb6Nt81';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
