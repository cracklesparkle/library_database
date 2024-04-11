import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to insert a new book
export const insertBook = async (bookData) => {
  const { data, error } = await supabase
    .from('books')
    .insert([bookData]);
  
  if (error) {
    console.error('Error inserting book:', error.message);
    return null;
  }
  
  return data;
};
