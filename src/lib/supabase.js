import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://sdfhlqvzoypbsanaouke.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZmhscXZ6b3lwYnNhbmFvdWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NzUyODMsImV4cCI6MjA2NzA1MTI4M30.WxwgncwdMOyaoSlCsrj_UBxf0v9mdNGn4uz1_At9BaY'

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables')
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})