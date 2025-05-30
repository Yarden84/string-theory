import { useState, useEffect, useMemo } from 'react';
import { Scale, ChordType, ScaleType } from "tonal";
import Counter from './Counter/Counter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import './Form.scss';

export default function Form(props) {
    const formData = useMemo(() => ({ ...props.neckData }), [props.neckData]);

    const [strings, setStrings] = useState(formData.strings);
    const [frets, setFrets] = useState(formData.frets);
    const [note, setNote] = useState(formData.note);
    const [type, setType] = useState(formData.type);
    const [tunning, setTunning] = useState(formData.tunning);
    const [mode, setMode] = useState(formData.mode);
    
    const scale = Scale.get('C chromatic');
    const notes = scale.notes.map((note, index) => <option value={note} key={index}>{note}</option>);
    
    const types = mode === 'chords' ? ChordType.all().map(item => <option value={item.aliases[0]}>{item.aliases[0]}</option>) : ScaleType.all().map(item => <option value={item.name}>{item.name}</option>);
    console.log("ChordType", ChordType.all());
    console.log("ScaleType", ScaleType.all());
    

    

    useEffect(() => {
        const newTunning = [...tunning];
        if (strings > tunning.length) {
                newTunning.push('E');
        } else if (strings < tunning.length) {
            newTunning.splice(strings);
        }
        setTunning(newTunning);
        formData.tunning = newTunning;
    }, [strings]);

    const tuners = tunning.map((item, index) => {     
        return <Counter 
            key={index}
            data={[...scale.notes]} 
            startVal={scale.notes.indexOf(item)} 
            countChange={(tunningNote) => {
                let tunningLocal = [...tunning];
                tunningLocal[index] = tunningNote; 
                setTunning(tunningLocal);
                formData.tunning = [...tunningLocal];
            }} 
        />
    });

    useEffect(() => {
        formData.strings = strings;
    }, [strings, formData]);

    useEffect(() => {
        formData.frets = frets;
    }, [frets, formData]);

    useEffect(() => {
        formData.note = note;
    }, [note, formData]);

    useEffect(() => {
        formData.type = type;
    }, [type, formData]);

    useEffect(() => {
        formData.tunning = [...tunning];
    }, [tunning, formData]);

    useEffect(() => {
        formData.mode = mode;
    }, [mode, formData]);

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
                        <label htmlFor="mode">Mode</label>
                        <div className="mode-switcher">
                            <span className="mode-label">Chords</span>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={mode === 'scales'}
                                    onChange={(e) => setMode(e.target.checked ? 'scales' : 'chords')}
                                />
                                <span className="slider"></span>
                            </label>
                            <span className="mode-label">Scales</span>
                        </div>
                    </div>
                    <div className="form-item">
                        <label htmlFor="notes">Root Note</label>
                        <select id="notes" name="notes" onChange={(e) => {
                            setNote(e.target.value);
                        }}>
                            {notes}
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="type">{mode === 'chords' ? 'Chord Type' : 'Scale Type'}</label>
                        <select id="type" name="type" onChange={(e) => {
                            setType(e.target.value);
                        }}>
                            {types}
                        </select>
                    </div>
                </div>

                <input type="submit" value="Submit" className='submit-button' />
            </div>
        </form>
    );
}