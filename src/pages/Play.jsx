import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";

const Play = () => {
    const { id } = useParams();

    useEffect(() => {
        const getItem = async () => {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `item/${id}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        getItem();
    }, [id]); // 확인 필요

    return (
        <main>
            <section id="play-word-list">
                <ul className="play-word-list-box">
                    <li>banana</li>
                    <li>banana</li>
                    <li>banana</li>
                    <li>banana</li>
                    <li>banana</li>
                </ul>
            </section>
            <section id="play-word-content">
                <div></div>
            </section>
            <section id="play-word-rank">
                <div></div>
            </section>
        </main>
    );
};

export default Play;
