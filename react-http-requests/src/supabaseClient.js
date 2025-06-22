import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sknuuxngkxzuwdjrbjeq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrbnV1eG5na3h6dXdkanJiamVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDU5NjgyNSwiZXhwIjoyMDY2MTcyODI1fQ.x2fcK2pcNRyO-vn_Lsz717iwaKcsNsDHRYqMm6djR7A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);