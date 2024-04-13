import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteLend, getBooks, getLends, getProfiles, insertLend } from "@/utils/supabase";
import icon_edit from '@/assets/icons/edit.svg'
import icon_remove from '@/assets/icons/remove.svg'
import BookEdit from "@/components/modals/BookEdit";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Stats() {
  const router = useRouter();

  const [lends, setLends] = useState([]);
  const [books, setBooks] = useState([]);
  const [profiles, setProfiles] = useState([]);

  // Function to fetch books from Supabase and update state
  const fetchBooks = async () => {
    const { data, error } = await getBooks();
    if (error) {
      console.error("Error fetching books:", error.message);
    } else {
      setBooks(data);
    }
  };

  // Function to fetch profiles from Supabase and update state
  const fetchProfiles = async () => {
    const { data, error } = await getProfiles();
    if (error) {
      console.error("Error fetching profiles:", error.message);
    } else {
      setProfiles(data);
    }
  };

  // Function to fetch lends from Supabase and update state
  const fetchLends = async () => {
    const { data, error } = await getLends();
    if (error) {
      console.error("Error fetching lends:", error.message);
    } else {
      setLends(data);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchProfiles();
    fetchLends();
  }, []);

  const [lendData, setLendData] = useState({
    book_id: '',
    profile_id: '',
    lend_date: new Date().toISOString().split('T')[0],
    return_date: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLendData({ ...lendData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lendData.book_id === '' || lendData.profile_id === '' || lendData.lend_date === '') {
      return;
    }
    const data = await insertLend(lendData)
      .then(response => {
        setLendData({
          book_id: '',
          profile_id: '',
          lend_date: new Date().toISOString().split('T')[0],
          return_date: null
        })
        fetchLends();
      })
  };

  const [currentLendData, setCurrentLendData] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const handleLendDelete = async (id) => {
    const data = await deleteLend(id)
      .then(response => {
        fetchLends();
      })
  }

  // Function to get the book name based on book_id
  const getBookName = (bookId) => {
    const book = books.find(book => book.id === bookId);
    return book ? book.book_name : 'Unknown';
  };

  // Function to get the number of times a book has been lent out
  const getLendCount = (bookId) => {
    return lends.filter(lend => lend.book_id === bookId).length;
  };

  return (
    <>
      <Head>
        <title>Библиотека</title>
        <meta name="description" content="Библиотека" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
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
          <div className={styles.list}>
            <h2>Выданные книги:</h2>
            <div className={styles.books}>
              <div className={styles.table_row} id={styles.table_head}>
                <p className={styles.bold}>Книга</p>
                <p className={styles.bold}>Количество выдач</p>
              </div>
              {books.map((book) => (
                <div key={book.id} className={styles.table_row}>
                  <p>{book.book_name}</p>
                  <p>{getLendCount(book.id)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
