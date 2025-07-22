import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import "../styles/play.css";

const Play = () => {
    const { id } = useParams();
    const [item, setItem] = useState();

    useEffect(() => {
        const getItem = async () => {
            const db = getDatabase();

            onValue(ref(db, "/items/" + id), (snapshot) => {
                const data = snapshot.val();
                // console.log(data);
                if (data.id === id) {
                    setItem(data);
                    // console.log(item);
                }
            });
        };

        getItem();
    }, [id]); // 확인 필요

    const rows = 12;
    const cols = 14;
    const total = rows * cols;

    return (
        item && ( // 필요, 없으면 오류
            <main>
                <h1>{item.title}</h1>
                <div className="play-word-container">
                    <section id="play-word-list">
                        <ul className="play-word-list-box">
                            {item.words.map((word, index) => {
                                return <li key={index}>{word}</li>;
                            })}
                        </ul>
                    </section>
                    <section id="play-word-content">
                        {Array.from({ length: total }).map(() => {
                            return (
                                <div className="play-word-content__box">{}</div>
                            );
                        })}
                    </section>
                    <section id="play-word-rank">
                        <div></div>
                    </section>
                </div>
            </main>
        )
    );
};

export default Play;
