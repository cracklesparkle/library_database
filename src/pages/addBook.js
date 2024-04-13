import React from 'react'
import styles from '@/styles/Home.module.css'
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteBook, getBooks, insertBook } from "@/utils/supabase";
import icon_edit from '@/assets/icons/edit.svg'
import icon_remove from '@/assets/icons/remove.svg'
import BookEdit from "@/components/modals/BookEdit";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

const AddBook = () => {
  const router = useRouter();

  const [books, setBooks] = useState([]);

  // Function to fetch books from Supabase and update state
  const fetchBooks = async () => {
    const { data, error } = await getBooks(); // Assuming you have a function to fetch books from Supabase
    if (error) {
      console.error("Error fetching books:", error.message);
    } else {
      setBooks(data);
    }
  };

  useEffect(() => {
    fetchBooks(); // Fetch books when component mounts
  }, [])

  const [bookData, setBookData] = useState({
    book_name: '',
    author: '',
    genre: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bookData.book_name == '' || bookData.author == '' || bookData.genre == '') {
      return
    }
    const data = await insertBook(bookData)
      .then(response => {
        setBookData({
          book_name: '',
          author: '',
          genre: ''
        })
        fetchBooks()
      })
  };

  const [currentBookData, setCurrentBookData] = useState(null)

  const [editModal, setEditModal] = useState(false)

  const handleBookDelete = async (id) => {
    const data = await deleteBook(id)
      .then(response => {
        fetchBooks()
      })
  }

  return (
    <>
      <Head>
        <title>Библиотека</title>
        <meta name="description" content="Библиотека" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {editModal &&
          <BookEdit active={editModal} setActive={setEditModal} bookData={currentBookData} />
        }

        <div className={styles.description}>
          <p>
            <Link href={'/'}>Выдача</Link>
          </p>
          <p>
            <Link href={'/addBook'}>Книги</Link>
          </p>
          <p>
            <Link href={'/addProfile'}>Пользователи</Link>
          </p>
          <p>
            <Link href={'/stats'}>Статистика</Link>
          </p>
        </div>

        <div className={styles.center}>
          <div className={styles.add}>
            <h2>Добавить книгу</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <label htmlFor="book_name">Название книги:</label>
                <input
                  type="text"
                  id="book_name"
                  name="book_name"
                  value={bookData.book_name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="author">Автор:</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="genre">Жанр:</label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={bookData.genre}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className={styles.button}>Добавить</button>
            </form>
          </div>
          <div className={styles.list}>
            <h2>Книги:</h2>
            <div className={styles.books}>
              <div className={styles.table_row + ' ' + styles.book_head} id={styles.table_head}>
                <p className={styles.bold}>Название</p>
                <p className={styles.bold}>Автор</p>
                <p className={styles.bold}>Жанр</p>
              </div>
              {books.map((book) => (
                <div key={book.id} className={styles.table_row} id={styles.book_table_row}>
                  <p>{book.book_name}</p>
                  <p>{book.author}</p>
                  <p>{book.genre}</p>
                  <div className={styles.icon} onClick={() => {
                    setCurrentBookData(book)
                    setEditModal(true)
                  }}>
                    <Image width={16} height={16} src={icon_edit} />
                  </div>
                  <div className={styles.icon} onClick={() => {
                    handleBookDelete(book.id)
                  }}>
                    <Image width={16} height={16} src={icon_remove} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
        </div>
      </main>
    </>
  );
}

export default AddBook