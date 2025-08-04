import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import "../styles/play.css";

const Play = () => {
    const { id } = useParams();
    const [item, setItem] = useState();
    const [gridWord, setGridWord] = useState([]);

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

    const words = item?.words;

    // console.log(words);

    const puzzle = () => {
        // 2차원 배열, length 는 길이, 나머지는 "" 으로 12*14 배열 생성
        const grid = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => "")
        );
        words?.forEach((word) => {
            const row = Math.floor(Math.random() * rows);
            const maxCol = cols - word.length;
            const col = Math.floor(Math.random() * (maxCol + 1)); // 실수로 나와서 +1 ex, 6이면 0~5.99 이므로 소수점 버리면 0~5 이므로 +1

            for (let i = 0; i < word.length; i++) {
                grid[row][col + i] = word[i]; // 단어 나열을 위해 +i 로 해서 증가시키면서 단어 넣도록
            }
        });

        const letter = "abcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                console.log(grid[i][j]);
                if (grid[i][j] === "") {
                    let rel = letter.charAt(
                        Math.floor(Math.random() * letter.length)
                    );

                    grid[i][j] = rel;
                }
            }
        }
        return grid;
    };

    useEffect(() => {
        if (item && item.words) {
            setGridWord(puzzle());
        }
    }, [item]);

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
                        {gridWord.map((row, rowIndex) =>
                            row.map((item, colIndex) => {
                                return (
                                    <div
                                        key={`${rowIndex},${colIndex}`}
                                        className="play-word-content__box"
                                    >
                                        {item}
                                    </div>
                                );
                            })
                        )}
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
