import { useState } from 'react';
import './Counter.scss';

export default function Counter(props) {
    const [currentIndex, setCurrentIndex] = useState(props.startVal);

    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + props.data.length) % props.data.length;
        setCurrentIndex(newIndex);
        props.countChange(props.data[newIndex]);
    };

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % props.data.length;
        setCurrentIndex(newIndex);
        props.countChange(props.data[newIndex]);
    };

    return (
        <div className="note-counter-container">
            <button className="counter-btn" onClick={handlePrev}>-</button>
            <div className="counter-value">{props.data[currentIndex]}</div>
            <button className="counter-btn" onClick={handleNext}>+</button>
        </div>
    );
}