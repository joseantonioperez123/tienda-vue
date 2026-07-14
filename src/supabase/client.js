import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ujdoswbzuiyxqpibqzsg.supabase.co'
const supabaseKey = 'sb_publishable_0kR-RI3UHFgeo339iDNSCg_UlqoymPi'

const supabase = createClient(
  supabaseUrl,
  supabaseKey
)

export default supabase