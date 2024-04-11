import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { insertBook } from "@/utils/supabase";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [bookData, setBookData] = useState({
    book_name: '',
    author: '',
    genre: '',
    copies_given: 0
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
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/library_database/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <div>
            <h1>Add Book</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="book_name">Book Name:</label>
                <input
                  type="text"
                  id="book_name"
                  name="book_name"
                  value={bookData.book_name}
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
                <label htmlFor="copies_given">Copies Given:</label>
                <input
                  type="number"
                  id="copies_given"
                  name="copies_given"
                  value={bookData.copies_given}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Add Book</button>
            </form>
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
