
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://geiclnouctlctqyembna.supabase.co';
//console.log(supabaseUrl,"sdjfkhsjkdhgfh");
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaWNsbm91Y3RsY3RxeWVtYm5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3ODU3NTgsImV4cCI6MjAyOTM2MTc1OH0.cgf5bGIxWxCUjiTLH38wKdDOtNFZERr4ecRyTXxP8Z0';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;