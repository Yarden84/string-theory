import React, { useState } from 'react';
import './App.scss';

import Neck from './components/Neck/Neck.jsx';
import Form from './components/Form/Form';

function App() {
  const [neckData, setNeckData] = useState({
    strings: 6,
    frets: 22,
    tunning: ['E', 'A', 'D', 'G', 'B', 'E'],
    note: 'C',
    type: 'major',
    mode: 'chords'
  });

  const handleFormSubmit = (data) => {
    setNeckData({ ...data });
  }

  return (
    <div className="App">
      <div className="app-content">
        <Form neckData={neckData} onFormSubmit={handleFormSubmit} />
        <Neck neckData={neckData} />
      </div>
    </div>
  );
}

export default App;
