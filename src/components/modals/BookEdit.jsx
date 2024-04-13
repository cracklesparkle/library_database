import React, { useState } from 'react'
import styles from '@/styles/BookEdit.module.css'
import { insertBook, updateBook } from '@/utils/supabase';
import icon_cross from '@/assets/icons/cross.svg'
import Image from 'next/image';

const BookEdit = ({ active, setActive, bookData }) => {
    const [newBookData, setNewBookData] = useState(bookData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBookData({ ...newBookData, [name]: value });
    };

    const handleSubmit = async (e) => {
        if (newBookData.book_name == '' || newBookData.author == '' || newBookData.genre == '') {
            return
        }
        const data = await updateBook(bookData.id, newBookData);
    };

    return (
        <div className={styles.bookEdit}>
            <div className={styles.edit_container}>
                <div className={styles.header}>
                    <h2>Редактирование</h2>
                    <div className={styles.icon} onClick={()=>setActive(false)}>
                        <Image src={icon_cross} width={16} height={16} />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <label htmlFor="book_name">Название книги:</label>
                        <input
                            type="text"
                            id="book_name"
                            name="book_name"
                            value={newBookData.book_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="author">Автор:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={newBookData.author}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="genre">Жанр:</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            value={newBookData.genre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="lend_date">Дата выдачи:</label>
                        <input
                            type="date"
                            id="lend_date"
                            name="lend_date"
                            value={newBookData.lend_date}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Сохранить</button>
                </form>
            </div>
        </div>
    )
}

export default BookEdit 