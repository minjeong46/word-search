import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const db = getDatabase();
        const itemRef = ref(db, "items");

        const onMount = onValue(itemRef, (snapshot) => { // onValue 만 있으면 계속 실행되면서 메모리 낭비 , 등록되면
            const data = snapshot.val();
            if (data) {
                // console.log(typeof Object.values(data));
                setItems(Object.values(data));
            }
        });

        return () => onMount(); // 리스너 제거되도록

        // 컴포넌트 언마운트 할 때 onMount 를 하면서 등록된 onMount 리스너를 해제하도록 해준다.
    }, []);

    const handleItemMove = (path) => {
        console.log(path);
        navigate(`/item/${path}`);
    }

    return (
        <main>
            <h1>Puzzle Game List</h1>
            <ul>
                {items.map((item, idx) => {
                    return <li key={`item ${idx}`} onClick={() =>  handleItemMove(item.id)}>🧩 {item.title}</li>;
                })}
            </ul>
        </main>
    );
};

export default Main;
