import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export const insertProfile = async (profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData);

  if (error) {
    console.error('Error inserting book:', error.message);
    return null;
  }

  return data;
}

export const updateProfile = async (profileId, updatedProfileData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updatedProfileData)
      .match({ id: profileId }); // Assuming 'id' is the primary key of your 'books' table

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error('Error updating book:', error.message);
    return { error };
  }
};

export const deleteProfile = async (profileId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .delete()
      .match({ id: profileId }); // Assuming 'id' is the primary key of your 'books' table

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error('Error deleting book:', error.message);
    return { error };
  }
};

export const getProfiles = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    return { error };
  }
}

// Function to insert a new book
export const insertLend = async (lendData) => {
  const { data, error } = await supabase
    .from('lend')
    .insert(lendData);

  if (error) {
    console.error('Error inserting book:', error.message);
    return null;
  }

  return data;
}

export const getLends = async () => {
  try {
    const { data, error } = await supabase
      .from('lend')
      .select('*');

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    return { error };
  }
}

export const updateLend = async (lendId, updatedLendData) => {
  try {
    const { data, error } = await supabase
      .from('lend')
      .update(updatedLendData)
      .match({ id: lendId }); // Assuming 'id' is the primary key of your 'books' table

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error('Error updating book:', error.message);
    return { error };
  }
};

export const deleteLend = async (lendId) => {
  try {
    const { data, error } = await supabase
      .from('lend')
      .delete()
      .match({ id: lendId }); // Assuming 'id' is the primary key of your 'books' table

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error('Error deleting book:', error.message);
    return { error };
  }
};

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
