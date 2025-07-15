import { useState } from "react";
import "../styles/maker.css";
import { ref, push } from "firebase/database";
import { database } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const Maker = () => {
    const navigate = useNavigate();

    const [words, setWords] = useState(Array(30).fill(""));
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        // words: words,
    });

    const handleListInputChange = (idx, value) => {
        const inputValues = [...words];
        inputValues[idx] = value;
        setWords(inputValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const filterWords = words.filter((data)=>data.trim() !== ""); // 공백과 입력되지 않은 값 제거 (trim 공백 제거)

        if (filterWords.length >= 10) {
            wordGameMaker(formData.title, formData.description, words);
            navigate("/");
        }else {
            alert("단어를 10개 이상 입력해주세요");
        }
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData);
    };

    function wordGameMaker(title, description, words) {
        push(ref(database, "items"), {
           title,
           description,
           words,
           createdAt: new Date().getTime() // key
        });
        alert("완료"); // 임시
    }

    return (
        <main>
            <form id="maker-form" onSubmit={handleSubmit}>
                <div className="maker-input-box">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={onChange}
                    />
                </div>
                <div className="maker-input-box">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        onChange={onChange}
                        className="des-textarea"
                    />
                </div>
                <div className="maker-input-box">
                    <label for="list">Word List</label>
                    <p>Between 10 and 30 words. Puzzles are randomly generated using a selection of your words at play time.</p>
                    {words.map((value, idx) => {
                        return (
                            <input
                                className="list-input"
                                key={idx}
                                value={value}
                                type="text"
                                onChange={(e) =>
                                    handleListInputChange(idx, e.target.value)
                                }
                            ></input>
                        );
                    })}
                </div>
                <button type="submit" className="form-submit-btn">Submit</button>
            </form>
        </main>
    );
};
export default Maker;
