import dataset from "../data/dataset.js";
import * as tf from '@tensorflow/tfjs-node'; // or '@tensorflow/tfjs' if you are in the browser

import utils from "./utils.js";
const { getSong, midi } = utils;


// LOADING SONGS -----------------------------------------------------------
console.time("Loading took");

const length = 100//1275;
let songs = []
for (let i = 0; i < length; i++) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0)
    process.stdout.write(`\rLoading ${i+1} / ${length} songs`);
    
    songs.push(getSong(i))
}
process.stdout.write("\n");

console.log(midi.flatten(songs[0].data));
console.timeEnd("Loading took");
// LOADING SONGS -----------------------------------------------------------


// CREATING THE DISCRIMINATOR -----------------------------------------------------------
// Assuming each song in your dataset has a 'data' attribute that is a flattened version of your MIDI JSON
const trainingData = tf.tensor2d(songs.map(song => flatten(song.data)));

const model = tf.sequential();

model.add(tf.layers.dense({units: 128, activation: 'relu', inputShape: [YOUR_FLATTENED_MIDI_DATA_SIZE]}));
model.add(tf.layers.dropout(0.2));
model.add(tf.layers.dense({units: 64, activation: 'relu'}));
model.add(tf.layers.dropout(0.2));
model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

// CREATING THE DISCRIMINATOR -----------------------------------------------------------

