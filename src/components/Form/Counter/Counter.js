import { useState, useEffect } from 'react';
import './Counter.scss'

export default function Counter(props) {
  const data = props.data;
  const [index, setIndex] = useState(props.startVal);

  useEffect(() => {
    props.countChange(data[index]);
  }, [index]);

  return (
    <div className="note-counter-container">
      <div className="note-counter-arrow left" tabIndex="0" onMouseDown={(e) => {
        console.log('e: ', e);
        if (index > 0) setIndex(index - 1)
      }}></div>
      <input type='text' value={data[index]} className="note-counter-input" onChange={(e) => {
        setIndex(e.target.value)
      }} />
      <div className="note-counter-arrow" onClick={() => {
        if (index < data.length - 1) setIndex(index + 1)
      }}></div>
    </div>
  )
}