import React, { useEffect, useState, useRef } from 'react';
import './Neck.scss';

import { Chord, Scale } from "tonal";

export default function Neck(props) {
    const neckEle = useRef(null);
    let fretsNum = props.neckData.frets;
    let stringsNum = props.neckData.strings;
    let tunning = props.neckData.tunning;
    let chordNote = props.neckData.chordNote;
    let chordMode = props.neckData.chordMode;
    let fretsWidthsArr = [];
    const [fretsWidths, setFretsWidths] = useState('');
    let notesLocal = [];
    const [notes, setNotes] = useState([]);
    let stringsLocal = [];
    const [strings, setStrings] = useState([]);

    let notesMatrix = {};

    const chordData = Chord.get(chordNote + chordMode);

    function setup() {
        fretsWidthsArr = [];
        notesLocal = [];
        stringsLocal = [];

        for (let i = 0; i < stringsNum; i++) {
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
            }

            stringsLocal.push(<div className='string' key={i}></div>)
        }
    }

    function setNeck() {
        for (let i = 0; i < fretsNum; i++) {
            const neckWidth = neckEle.current.offsetWidth;

            fretsWidthsArr[i] = neckWidth / Math.pow(2, (i / 12)) - neckWidth / Math.pow(2, ((i + 1) / 12));
        }

        setFretsWidths(fretsWidthsArr.join('fr ') + 'fr');
        setNotes(notesLocal);
        setStrings(stringsLocal);
    }

    useEffect(() => {
        setup();
        setNeck();
    }, [props.neckData]);

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