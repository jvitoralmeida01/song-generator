import fs from 'fs';
import path from 'path';

import dataset from "../data/dataset.js";

const root = "/Users/jvitor/Documents/Projects/tcc/code/model/data/parsed";

function getSong (index) {

    const year = dataset.year[index];
    const name = dataset.midi_filename[index];

    const filename = `${path.parse(name).name}.json`;

    const filePath = path.join(root, `${year}/${filename}`);

    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    
    return {
        year,
        name,
        data,
    }
}

function timed (func, name) {
    console.time(name || "timed: ");
    func();
    console.timeEnd(name || "timed: ");
}

function flatten(data) {
    // flatten tonejs json data into a 1d array
    //
    // data: tonejs json data
    //
    // returns: 1d array
    let flat = [];
    for (let i = 0; i < data.tracks.length; i++) {
        for (let j = 0; j < data.tracks[i].notes.length; j++) {
            flat.push(data.tracks[i].notes[j].midi);
        }
    }
    console.log(flat);
}

export default {
    getSong,
    timed,
    midi: {
        flatten,
    },
}
