import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to insert a new book
export const insertBook = async (bookData) => {
  const { data, error } = await supabase
    .from('books')
    .insert(bookData);

  if (error) {
    console.error('Error inserting book:', error.message);
    return null;
  }

  return data;
}

export const getBooks = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*');

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    return { error };
  }
}

export const updateBook = async (bookId, updatedBookData) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .update(updatedBookData)
      .match({ id: bookId }); // Assuming 'id' is the primary key of your 'books' table

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error('Error updating book:', error.message);
    return { error };
  }
};

export const deleteBook = async (bookId) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .delete()
      .match({ id: bookId }); // Assuming 'id' is the primary key of your 'books' table

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error('Error deleting book:', error.message);
    return { error };
  }
};
