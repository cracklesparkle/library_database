import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

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
