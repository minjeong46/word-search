import React from 'react';
import '../styles/modal.css'

const Modal = () => {
    return (
        <div id='Modal-container'>
            <div className='modal-box'>
                <p>게임이 생성되었습니다.</p>
                <p>링크</p>
                <button>확인</button>
            </div>
        </div>
    );
};

export default Modal;