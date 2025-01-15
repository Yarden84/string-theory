import { useState, useEffect } from 'react';
import { Scale, ChordType } from "tonal";
import Counter from './Counter/Counter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import './Form.scss';



export default function Form(props) {
    let formData = {
        ...props.neckData
    }

    const scale = Scale.get('C chromatic');

    const notes = scale.notes.map(note => <option value={note}>{note}</option>)

    const chordTypes = ChordType.all().map(item => <option value={item.name}>{item.aliases[0]}</option>);

    const [strings, setStrings] = useState(formData.strings);
    const [frets, setFrets] = useState(formData.frets);
    const [note, setNote] = useState(formData.chordNote);
    const [chordType, setChordType] = useState(formData.chordMode);
    const [tunning, setTunning] = useState(formData.tunning);

    const tuners = tunning.map((item, i) => {
        const j = scale.notes.indexOf(item);
        console.log('j: ', j);
        console.log('item: ', item);
        console.log('scale.notes: ', scale.notes);
        console.log('scale.notes[j]: ', scale.notes[j]);
        return <Counter data={[...scale.notes]} startVal={j} countChange={(tunningNote) => {
            let tunningLocal = [...tunning];
            tunningLocal[i] = tunningNote; 
            setTunning(tunningLocal)
        }} />
    })

    useEffect(() => {
        formData.strings = strings;
    }, [strings]);

    useEffect(() => {
        formData.frets = frets;
    }, [frets]);

    useEffect(() => {
        formData.chordNote = note;
    }, [note]);

    useEffect(() => {
        formData.chordMode = chordType
    }, [chordType]);

    useEffect(() => {
        formData.tunning = [...tunning]
    }, [tunning]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        props.onFormSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="tuner-container">
                    {tuners}
                </div>

                <div className="form-item">
                    <Counter data={Array.from(Array(80).keys())} startVal={strings} countChange={(stringsNum) => {
                        setStrings(stringsNum)
                    }} />
                </div>
                <div className="form-item">
                    <Counter data={Array.from(Array(100).keys())} startVal={frets} countChange={(fretsNum) => {
                        setFrets(fretsNum)
                    }} />
                </div>

                <select name="notes" onChange={(e) => {
                    setNote(e.target.value);
                }} className="form-item">
                    {notes}
                </select>

                <select name="chordType" onChange={(e) => {
                    setChordType(e.target.value);
                }} className="form-item">
                    {chordTypes}
                </select>

                <input type="submit" value="Submit" className='submit-btn' />
            </div>
        </form>
    );
}