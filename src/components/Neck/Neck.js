import React, { useEffect, useState, useRef } from 'react';
import './Neck.scss';

import { Chord, Scale } from "tonal";

export default function Neck(props) {
    const neckEle = useRef(null);
    const fretsNum = props.frets;
    const stringsNum = props.strings;
    const tunning = props.tunning;
    const chordNote = props.chordNote;
    const chordMode = props.chordMode;
    const fretsWidthsArr = [];
    const [fretsWidths, setFretsWidths] = useState('');
    const notesLocal = [];
    const [notes, setNotes] = useState([]);
    const stringsLocal = [];
    const [strings, setStrings] = useState([]);

    let notesMatrix = {};

    const chordData = Chord.get(chordNote + chordMode);

    console.log("chordData: ", chordData);




    for (let i = 0; i < stringsNum; i++) {
        console.log('tunning: ', tunning);
        console.log('stringsNum - 1 - i: ', stringsNum - 1 - i);
        // let fretBoardNote = Note.transpose(tunning[stringsNum - 1 - i], "2m");
        // console.log('tunning[stringsNum - 1 - i]: ', tunning[stringsNum - 1 - i]);
        // console.log('fretBoardNote: ', fretBoardNote);
        let scale = Scale.get(tunning[stringsNum - 1 - i] + ' chromatic');
        let division = Math.floor(fretsNum / scale.notes.length);
        let remainder = fretsNum % scale.notes.length;

        notesMatrix[i] = [];

        for (let j = 0; j < division; j++) {
            notesMatrix[i] = [...notesMatrix[i], ...scale.notes];
        }

        notesMatrix[i] = [...notesMatrix[i], ...scale.notes.slice(0, remainder)];

        for (let k = 0; k < fretsNum; k++) {
            notesLocal.push(<div className={'note ' + (chordData.notes.indexOf(notesMatrix[i][k + 1]) !== -1 ? 'dot' : '')} key={i + '-' + k} data-note={notesMatrix[i][k + 1]}></div>);
            // console.log('notesMatrix[i][k]: ', notesMatrix[i][k]);
            // console.log('chordData.notes.indexOf(notesMatrix[i][k]: ', chordData.notes.indexOf(notesMatrix[i][k]));
        }

        stringsLocal.push(<div className='string' key={i}></div>)
    }


    useEffect(() => {
        for (let i = 0; i < fretsNum; i++) {
            const neckWidth = neckEle.current.offsetWidth;

            fretsWidthsArr[i] = neckWidth / Math.pow(2, (i / 12)) - neckWidth / Math.pow(2, ((i + 1) / 12));
        }

        setFretsWidths(fretsWidthsArr.join('fr ') + 'fr');

        setNotes([...notes, ...notesLocal])
        setStrings([...strings, ...stringsLocal]);
    }, []);


    return (
        <div className='neck-container' ref={neckEle}>
            <div className="neck" style={{ gridTemplateColumns: fretsWidths }}>
                <div className="strings-container">
                    {strings}
                </div>
                {notes}
            </div>
        </div>
    );
}