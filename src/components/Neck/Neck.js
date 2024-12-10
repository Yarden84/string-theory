import React, { useEffect, useState, useRef } from 'react';
import './Neck.scss';
import Strings from './Strings/Strings';

import { Chord, Scale } from "tonal";

export default function Neck(props) {
    const neckEle = useRef(null);
    const fretsNum = props.frets;
    const stringsNum = props.strings;
    const tunning = props.tunning;
    const chordNote = props.chordNote;
    const chordMode = props.chordMode;
    let notesMatrix = {};

    const chordData = Chord.get(chordNote + chordMode);

    console.log("chordData: ", chordData);

    const fretsLocal = [];
    const fretsWidths = [];
    const fretLocation = [];
    const [frets, setFrets] = useState([]);
    // const strings = [];

    useEffect(() => {
        for (let i = 0; i < fretsNum; i++) {
            const neckWidth = neckEle.current.offsetWidth;
            fretLocation[i] = fretsWidths.reduce((a, b) => a + b, 0);
            fretsWidths[i] = neckWidth / Math.pow(2, (i / 12)) - neckWidth / Math.pow(2, ((i + 1) / 12));
            fretLocation[i] += fretsWidths[i] / 2;

            console.log('fretLocation[i]: ', fretLocation[i]);

            fretsLocal.push(<div className='fret' style={{ width: fretsWidths[i] + 'px' }}></div>);
        }

        setFrets([...fretsLocal]);
    }, [neckEle.current]);


    for (let i = 0; i < stringsNum; i++) {
        let scale = Scale.get(tunning[i] + ' chromatic');

        let division = Math.floor(fretsNum / scale.notes.length);
        let remainder = fretsNum % scale.notes.length;

        notesMatrix[i] = [];

        for (let j = 0; j < division; j++) {
            notesMatrix[i] = [...notesMatrix[i], ...scale.notes];
        }

        notesMatrix[i] = [...notesMatrix[i], ...scale.notes.slice(0, remainder)];

        console.log('scale: ', scale);

        // strings.push(<div className='string'></div>);
    }

    console.log('notesMatrix: ', notesMatrix);

    setChord(chordData.notes);

    function setChord(chord) {
        for (let i = 0; i < chord.length; i++) {
            placeNote(chord[i]);
            console.log('chord[i]: ', chord[i]);
        }
    }

    function placeNote(note) {
        for (const prop in notesMatrix) {
            for (let i = 0; i < notesMatrix[prop].length; i++) {
                console.log('notesMatrix[prop][i]: ', notesMatrix[prop][i]);
                if (notesMatrix[prop][i] === note) {
                    console.log('match2: ', note);
                }
            }
        }
    }

    return (
        <div className='neck-container' ref={neckEle}>
            <div className="neck">
                <div className="frets-container">
                    {frets}
                </div>
                <Strings num={stringsNum} />
            </div>
        </div>
    );
}