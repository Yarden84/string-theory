import { useState, useEffect, useMemo } from 'react';
import { Scale, ChordType } from "tonal";
import Counter from './Counter/Counter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import './Form.scss';

export default function Form(props) {
    const formData = useMemo(() => ({ ...props.neckData }), [props.neckData]);

    const scale = Scale.get('C chromatic');
    const notes = scale.notes.map((note, index) => <option value={note} key={index}>{note}</option>);
    const chordTypes = ChordType.all().map(item => <option value={item.name}>{item.aliases[0]}</option>);

    const [strings, setStrings] = useState(formData.strings);
    const [frets, setFrets] = useState(formData.frets);
    const [note, setNote] = useState(formData.chordNote);
    const [chordType, setChordType] = useState(formData.chordMode);
    const [tunning, setTunning] = useState(formData.tunning);

    const tuners = tunning.map((item, index) => {     
        return <Counter data={[...scale.notes]} startVal={scale.notes.indexOf(item)} countChange={(tunningNote) => {
            let tunningLocal = [...tunning];
            tunningLocal[index] = tunningNote; 
            setTunning(tunningLocal);
            formData.tunning = [...tunningLocal];
        }} />
    });

    useEffect(() => {
        formData.strings = strings;
    }, [strings, formData]);

    useEffect(() => {
        formData.frets = frets;
    }, [frets, formData]);

    useEffect(() => {
        formData.chordNote = note;
    }, [note, formData]);

    useEffect(() => {
        formData.chordMode = chordType;
    }, [chordType, formData]);

    useEffect(() => {
        formData.tunning = [...tunning];
    }, [tunning, formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onFormSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="tuner-container">
                    {tuners}
                </div>

                <div className="left-group">
                    <div className="form-item">
                        <label htmlFor="strings">Strings</label>
                        <Counter data={Array.from(Array(80).keys())} startVal={strings} countChange={(stringsNum) => {
                            setStrings(stringsNum);
                        }} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="frets">Frets</label>
                        <Counter data={Array.from(Array(100).keys())} startVal={frets} countChange={(fretsNum) => {
                            setFrets(fretsNum);
                        }} />
                    </div>
                </div>

                <div className="center-group">
                    <div className="form-item">
                        <label htmlFor="notes">Root Note</label>
                        <select id="notes" name="notes" onChange={(e) => {
                            setNote(e.target.value);
                        }}>
                            {notes}
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="chordType">Chord Type</label>
                        <select id="chordType" name="chordType" onChange={(e) => {
                            setChordType(e.target.value);
                        }}>
                            {chordTypes}
                        </select>
                    </div>
                </div>

                <input type="submit" value="Submit" className='submit-button' />
            </div>
        </form>
    );
}