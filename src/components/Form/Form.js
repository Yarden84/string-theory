// import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Scale, ChordType } from "tonal";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import './Form.scss';



export default function Form(props) {

    const scale = Scale.get('C chromatic');

    const notes = scale.notes.map(note => <MenuItem value={note}>{note}</MenuItem>)

    const chordTypes = ChordType.all().map(item => <MenuItem value={item.aliases[0]}>{item.aliases[0]}</MenuItem>);

    console.log('scale: ', scale);

    console.log('chordTypes: ', chordTypes);

    let formData = {
        // strings: 6,
        // frets: 22,
        // tunning: ['E', 'A', 'D', 'G', 'B', 'E'],
        // chordNote: 'C',
        // chordMode: 'major'
        ...props.neckData
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        props.onFormSubmit(formData);
        console.log("44444");
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box className="form-container">
                <TextField
                    className='form-item'
                    label="Strings"
                    type="number"
                    variant="standard"
                    defaultValue={formData.strings}
                    onChange={(e) => {
                        formData.strings = e.target.value;
                    }}
                />

                <TextField
                    className='form-item'
                    label="Frets"
                    type="number"
                    variant="standard"
                    defaultValue={formData.frets}
                    onChange={(e) => {
                        formData.frets = Number(e.target.value);
                    }}
                />

                <FormControl fullWidth className='form-item'>
                    <InputLabel>Notes</InputLabel>
                    <Select
                        value={formData.chordNote}
                        onChange={(e) => {
                            formData.chordNote = e.target.value;
                        }}
                    >
                        {notes}
                    </Select>
                </FormControl>

                <FormControl fullWidth className='form-item'>
                    <InputLabel>Types</InputLabel>
                    <Select
                        label=""
                        value={formData.chordMode}
                        onChange={(e) => {
                            formData.chordMode = e.target.value;
                        }}
                    >
                        {chordTypes}
                    </Select>
                </FormControl>

                <Button variant="outlined" type="submit">Submit</Button>
            </Box>
        </form>
    );
}