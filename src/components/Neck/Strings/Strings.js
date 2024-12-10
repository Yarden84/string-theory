import React from 'react';
import './Strings.scss';
import String from './String/String';

// import { Chord, Scale } from "tonal";

export default function Strings(props) {
    const stringsNum = props.num;


    return (
        <div className='strings-container'>
            {[...Array(stringsNum)].map(() => <String />)}
        </div>
    );
}