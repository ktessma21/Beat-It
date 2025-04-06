import * as MIDI from '@tonejs/midi';
import * as Tone from "tone";

let currentTransportPlaying = false;

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

let isPaused = false;

export async function loadMidiFile({ level, taskId }) {
    
    const files = midiFiles[level];
    const randomIndex = Math.floor(Math.random() * files.length);
    const fileName = files[randomIndex];

    const response = await fetch(`/songs/${fileName}`);
    const arrayBuffer = await response.arrayBuffer();

    const midi = new MIDI.Midi(arrayBuffer);
    console.log('MIDI name:', midi.name);

    if (currentTransportPlaying[taskId]) {
        Tone.Transport.stop();
        Tone.Transport.cancel();
    }
    

    midi.tracks.forEach((track) => {
        console.log('Instrument:', track.instrument.name);
        const synth = new Tone.PolySynth(Tone.Synth).toDestination()
        track.notes.forEach((note) => {
            console.log(`Note ${note.name} at ${note.time}s for ${note.duration}s`);
            Tone.Transport.scheduleOnce((time) => {
                synth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
            }, note.time)

        })

    });
    await Tone.start()
    console.log('Audio context started')

    

    // Step 7: Set the BPM if available from the MIDI file
    Tone.Transport.bpm.value = midi.header.tempos[0]?.bpm || 120

    // Step 8: Start playback
    Tone.Transport.start()
}

export function pausePlayback({taskId}) {
    Tone.Transport.pause(); // Pauses the Tone.js Transport
    console.log("Playback paused");
}

export function resumePlayback({taskId}) {
    Tone.Transport.start(); // Resumes the Tone.js Transport
    console.log("Playback resumed");
}




