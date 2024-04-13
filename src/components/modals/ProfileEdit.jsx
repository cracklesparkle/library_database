import React, { useState } from 'react'
import styles from '@/styles/BookEdit.module.css'
import { insertBook, updateBook, updateProfile } from '@/utils/supabase';
import icon_cross from '@/assets/icons/cross.svg'
import Image from 'next/image';

const ProfileEdit = ({ active, setActive, profileData }) => {
    const [newProfileData, setNewProfileData] = useState(profileData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProfileData({ ...newProfileData, [name]: value });
    };

    const handleSubmit = async (e) => {
        if (newProfileData.first_name == '' || newProfileData.last_name == '') {
            return
        }
        const data = await updateProfile(profileData.id, newProfileData);
    };

    return (
        <div className={styles.bookEdit}>
            <div className={styles.edit_container}>
                <div className={styles.header}>
                    <h2>Редактирование</h2>
                    <div className={styles.icon} onClick={() => setActive(false)}>
                        <Image src={icon_cross} width={16} height={16} />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <label htmlFor="first_name">Имя:</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={newProfileData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="last_name">Фамилия:</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={newProfileData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="birthdate">Дата рождения:</label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={newProfileData.birthdate}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Сохранить</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileEdit 