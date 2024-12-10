import './App.scss';

import Neck from './components/Neck/Neck';

function App() {
  return (
    <div className="App">
      <Neck frets={22} strings={6} tunning={['E', 'A', 'D', 'G', 'B', 'E']} chordNote={'E'} chordMode={'m'} />
    </div>
  );
}

export default App;
