import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jympweqncrcgyvoqfqxp.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bXB3ZXFuY3JjZ3l2b3FmcXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTM5NTMsImV4cCI6MjA4OTkyOTk1M30.vTAPOhqTAUOpa4VbGREmqONHHsKOD0pEKY7SJ6TXbB4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
