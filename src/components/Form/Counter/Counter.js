import { useState, useEffect, useRef } from 'react';
import './Counter.scss'

export default function Counter(props) {
  const data = props.data;
  const [index, setIndex] = useState(props.startVal);

  
  let changeCount = useRef(null); 

  const changeIndex = (num, interval) => {
    console.log("changeIndex");
    const allowChange = num > 0 ? index < data.length - 1 : index > 0
    
    if (interval) {
      changeCount.current = setInterval(() => {
        if (allowChange) setIndex(prevIndex => prevIndex + num);
      }, interval);
    } else {
      if (changeCount.current) clearInterval(changeCount.current);
      if (allowChange) setIndex(index + num)
    }
  }

  useEffect(() => {
    props.countChange(data[index]);
  }, [index]);

  return (
    <div className="note-counter-container">
      <div className="note-counter-arrow left" onMouseDown={() => {
        if (index < data.length - 1) changeIndex(-1, 500)
      }} onMouseUp={() => changeIndex(-1, 0)}></div>
      <input type='text' value={data[index]} className="note-counter-input" onChange={(e) => {
        setIndex(e.target.value)
      }} />
      <div className="note-counter-arrow" onMouseDown={() => {
        if (index < data.length - 1) changeIndex(1, 500)
      }} onMouseUp={() => changeIndex(1, 0)}></div>
    </div>
  )
}