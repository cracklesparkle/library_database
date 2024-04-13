import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteBook, deleteProfile, getBooks, getProfiles, insertBook, insertProfile } from "@/utils/supabase";
import icon_edit from '@/assets/icons/edit.svg'
import icon_remove from '@/assets/icons/remove.svg'
import BookEdit from "@/components/modals/BookEdit";
import Link from "next/link";
import ProfileEdit from "@/components/modals/ProfileEdit";

const inter = Inter({ subsets: ["latin"] });

const AddProfile = () => {
    const router = useRouter();

    const [profiles, setProfiles] = useState([]);

    // Function to fetch books from Supabase and update state
    const fetchProfiles = async () => {
        const { data, error } = await getProfiles(); // Assuming you have a function to fetch books from Supabase
        if (error) {
            console.error("Error fetching books:", error.message);
        } else {
            setProfiles(data);
        }
    };

    useEffect(() => {
        fetchProfiles(); // Fetch books when component mounts
    }, [])

    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        birthdate: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (profileData.first_name == '' || profileData.last_name == '') {
            return
        }
        const data = await insertProfile(profileData)
            .then(response => {
                setProfileData({
                    first_name: '',
                    last_name: '',
                    birthdate: null
                })
                fetchProfiles()
            })
    };

    const [currentProfileData, setCurrentProfileData] = useState(null)

    const [editModal, setEditModal] = useState(false)

    const handleProfileDelete = async (id) => {
        const data = await deleteProfile(id)
            .then(response => {
                fetchProfiles()
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
                    <ProfileEdit active={editModal} setActive={setEditModal} profileData={currentProfileData} />
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
                        <h2>Добавить пользователя</h2>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.row}>
                                <label htmlFor="first_name">Имя:</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={profileData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.row}>
                                <label htmlFor="last_name">Фамилия:</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={profileData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.row}>
                                <label htmlFor="birthdate">Дата рождения:</label>
                                <input
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    value={profileData.birthdate}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className={styles.button}>Добавить</button>
                        </form>
                    </div>
                    <div className={styles.list}>
                        <h2>Пользователи:</h2>
                        <div className={styles.books}>
                            <div className={styles.table_row} id={styles.table_head}>
                                <p className={styles.bold}>Имя</p>
                                <p className={styles.bold}>Фамилия</p>
                                <p className={styles.bold}>Дата рождения</p>
                            </div>
                            {profiles.map((profile) => (
                                <div key={profile.id} className={styles.table_row}>
                                    <p>{profile.first_name}</p>
                                    <p>{profile.last_name}</p>
                                    <p>{profile.birthdate}</p>
                                    <div className={styles.icon} onClick={() => {
                                        setCurrentProfileData(profile)
                                        setEditModal(true)
                                    }}>
                                        <Image width={16} height={16} src={icon_edit} />
                                    </div>
                                    <div className={styles.icon} onClick={() => {
                                        handleProfileDelete(profile.id)
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

export default AddProfile