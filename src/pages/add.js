import { useState } from 'react';
import { useRouter } from 'next/router';
import { insertBook } from '../utils/supabase'; // Assuming you have a file with Supabase functions

export default function AddBook() {
  const router = useRouter();
  const [bookData, setBookData] = useState({
    bookName: '',
    author: '',
    genre: '',
    copiesGiven: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await insertBook(bookData);
    if (data) {
      router.push('/'); // Redirect to homepage after successful submission
    } else {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bookName">Book Name:</label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={bookData.bookName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="copiesGiven">Copies Given:</label>
          <input
            type="number"
            id="copiesGiven"
            name="copiesGiven"
            value={bookData.copiesGiven}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
