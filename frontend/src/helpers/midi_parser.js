import * as MIDI from '@tonejs/midi';
import * as Tone from "tone";

// Use a Map to track playback state for both tasks and habits
const playbackStates = new Map();

const midiFiles = {
    novice: [
        'Twinkle_Twinkle.mid',
        'Minuet_in_G.mid',
        'Ode_to_Joy.mid',
        'Jingle_Bells.mid',
        'London_Bridge.mid',
        'brahms-lullaby.mid'
    ],
    practictioner: [
        'Fur_Elise.mid',
        'Nocturne_Op9_No2.mid',
        'River_Flows_in_You.mid',
        'Prelude_in_C.mid',
    ],
    artist: [
        'Clair_de_Lune.mid',
        'Moonlight_Sonata_3rd.mid',
        'Hungarian_Rhapsody_No2.mid',
        'Liebestraum_No3.mid',
    ],
    master: [
        'Flight_of_the_Bumblebee.mid',
        'La_Campanella.mid',
        'Fantasie_Impromptu.mid',
        'Winter_Wind.mid'
    ]
};

export async function loadMidiFile({ level, taskId }) {
    try {
        const files = midiFiles[level];
        if (!files || files.length === 0) {
            console.error(`No MIDI files found for level: ${level}`);
            return;
        }

        const randomIndex = Math.floor(Math.random() * files.length);
        const fileName = files[randomIndex];

        const response = await fetch(`/songs/${fileName}`);
        const arrayBuffer = await response.arrayBuffer();

        const midi = new MIDI.Midi(arrayBuffer);
        console.log('MIDI name:', midi.name);

        // Stop any existing playback for this task/habit
        if (playbackStates.has(taskId)) {
            const existingState = playbackStates.get(taskId);
            if (existingState.transport) {
                existingState.transport.stop();
                existingState.transport.cancel();
            }
        }

        // Create new playback state
        const transport = Tone.Transport;
        const synths = [];

        midi.tracks.forEach((track) => {
            console.log('Instrument:', track.instrument.name);
            const synth = new Tone.PolySynth(Tone.Synth).toDestination();
            synths.push(synth);
            
            track.notes.forEach((note) => {
                console.log(`Note ${note.name} at ${note.time}s for ${note.duration}s`);
                transport.scheduleOnce((time) => {
                    synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
                }, note.time);
            });
        });

        // Store the playback state
        playbackStates.set(taskId, {
            transport,
            synths,
            isPlaying: true
        });

        await Tone.start();
        console.log('Audio context started');

        // Set the BPM if available from the MIDI file
        transport.bpm.value = midi.header.tempos[0]?.bpm || 120;

        // Start playback
        transport.start();
    } catch (error) {
        console.error('Error loading MIDI file:', error);
    }
}

export function pausePlayback({ taskId }) {
    const state = playbackStates.get(taskId);
    if (state && state.transport) {
        state.transport.pause();
        state.isPlaying = false;
        console.log("Playback paused");
    }
}

export function resumePlayback({ taskId }) {
    const state = playbackStates.get(taskId);
    if (state && state.transport) {
        state.transport.start();
        state.isPlaying = true;
        console.log("Playback resumed");
    }
}




