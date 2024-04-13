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

export default function Home() {
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
          <div className={styles.add}>
            <h2>Выдача книги</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <label htmlFor="book_id">Название книги:</label>
                <select
                  id="book_id"
                  name="book_id"
                  value={lendData.book_id}
                  onChange={handleChange}
                >
                  <option value="">Выберите книгу</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>{book.book_name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.row}>
                <label htmlFor="profile_id">Пользователь:</label>
                <select
                  id="profile_id"
                  name="profile_id"
                  value={lendData.profile_id}
                  onChange={handleChange}
                >
                  <option value="">Выберите пользователя</option>
                  {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>{profile.first_name} {profile.last_name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.row}>
                <label htmlFor="lend_date">Дата выдачи:</label>
                <input
                  type="date"
                  id="lend_date"
                  name="lend_date"
                  value={lendData.lend_date}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className={styles.button}>Добавить</button>
            </form>
          </div>
          <div className={styles.list}>
            <h2>Выданные книги:</h2>
            <div className={styles.books}>
              <div className={styles.table_row + ' ' + styles.lend_head} id={styles.table_head}>
                <p className={styles.bold}>Книга</p>
                <p className={styles.bold}>Пользователь</p>
                <p className={styles.bold}>Дата выдачи</p>
                <p className={styles.bold}>Дата возврата</p>
              </div>
              {lends.map((lend) => (
                <div key={lend.id} className={styles.table_row} id={styles.lend_table_row}>
                  <p>{getBookName(lend.book_id)}</p>
                  <p>{lend.profile_id}</p>
                  <p>{lend.lend_date}</p>
                  <p>{lend.return_date}</p>
                  <div className={styles.icon} onClick={() => {
                    handleLendDelete(lend.id)
                  }}>
                    <Image width={16} height={16} src={icon_remove} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
