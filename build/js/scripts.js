"use strict";
//DAMN this thing loads faaasst, i'll have to use addEventListener more often
document.addEventListener("DOMContentLoaded", random_phrase, false)

function random_phrase(){
    const catchphrases = [
        "Where code meets boredom",
        "The master pasta chef himself",
        "Building things worth sharing",
        "Welcome back!",
        "My little corner on the internet"
    ];
    let leng = catchphrases.length;

    document.getElementById("catchphrase").textContent = catchphrases[Math.floor(Math.random() * leng)];
}