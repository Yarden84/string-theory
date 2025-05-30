import React, { useEffect, useState, useRef } from 'react';
import './Neck.scss';

import { Chord, Scale } from "tonal";

export default function Neck(props) {
    const neckEle = useRef(null);
    let fretsNum = props.neckData.frets;
    let stringsNum = props.neckData.strings;
    let tunning = props.neckData.tunning;
    let note = props.neckData.note;
    let type = props.neckData.type;
    let mode = props.neckData.mode;
    let fretsWidthsArr = [];
    const [fretsWidths, setFretsWidths] = useState('');
    let notesLocal = [];
    const [notes, setNotes] = useState([]);
    let stringsLocal = [];
    const [strings, setStrings] = useState([]);

    let notesMatrix = {};
    const fretboardNotes = mode === 'chords' ? Chord.get(note + type) : Scale.get(note + " " + type);
    console.log("note", note);
    console.log("type", type);
    console.log("mode", mode);
    
    console.log("fretboardNotes", fretboardNotes);
    console.log("Scale", Scale);
    
    const markerPositions = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubleMarkerPosition = 12;

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
     
                const isMarker = i === Math.floor(stringsNum / 2) && markerPositions.includes(k + 1);

                const isDoubleMarker = i === Math.floor(stringsNum / 2) - 1 && k + 1 === doubleMarkerPosition;
                const isSecondDoubleMarker = i === Math.floor(stringsNum / 2) + 1 && k + 1 === doubleMarkerPosition;
                

                const classes = [
                    'note',
                    fretboardNotes.notes.indexOf(notesMatrix[i][k + 1]) !== -1 ? 'dot' : '',
                    isMarker ? 'fret-marker' : '',
                    isDoubleMarker ? 'fret-marker-12 top' : '',
                    isSecondDoubleMarker ? 'fret-marker-12 bottom' : ''
                ].filter(Boolean).join(' ');

                notesLocal.push(
                    <div 
                        className={classes}
                        key={i + '-' + k} 
                        data-note={notesMatrix[i][k + 1]}
                    ></div>
                );
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