// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vrubcinlvifcxssxdanq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydWJjaW5sdmlmY3hzc3hkYW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjExMDAsImV4cCI6MjA1ODIzNzEwMH0.eC58OVKmLhD-G_skrnQJTh7EmFWfKkhkTCHGxH6FkMg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);