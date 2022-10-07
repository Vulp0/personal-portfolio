const {src, dest, watch, parallel} = require("gulp");

//you add these require() as you need them, if you add them before you actually install them then gulp gets a stroke
//sass
const sass = require("gulp-sass")(require("sass"));

//turn images into webp (for better performance)
const webp = require('gulp-webp');

//rename
const rename = require('gulp-rename');

//htmlmin (to minify HTML files)
const htmlmin = require('gulp-htmlmin');

//uglify (for Javascript files)
const uglify = require('gulp-uglify');
//concatenate
const concatenate = require('gulp-concat');


function defaultTask(cb) {
    // place code for your default task here
    console.log("Gulp works!");
    cb();
}

//this one works
function compileHTML(done) {
    console.log(">Compiling and compressing HTML");
    src(["./src/html/*.html", "!./src/html/home.html"]) //select all html files except home.html
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest("./build/html"));

    src("./src/html/home.html") //select home.html, to then rename it to index.html
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename("index.html"))
        .pipe(dest("./build/html"));
    done();
}
//this one works too
function compileCSS(done) {
    console.log(">Compiling SCSS to CSS");
    src("./src/sass/*.scss")
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(dest("./build/css"));
    done();
}
//this one works too as well
function compileJS(done) {
    console.log(">Compiling and compressing JavaScript");
    src("./src/js/*.js")
        .pipe(concatenate("scripts.js"))
        .pipe(uglify())
        .pipe(dest("./build/js"));
    done();
}

function convertToWEBP(done) {
    console.log(">Converting images to WEBP format...");

    const options = {
        quality: 50
    };

    src("./src/media/img/*.{png, jpg}")
        .pipe(webp(options))
        .pipe(dest("./build/media/img"));
    done();
}

exports.default = defaultTask
exports.compileHTML = compileHTML;
exports.compileCSS = compileCSS;
exports.compileJS = compileJS;
exports.buildProject = parallel(compileHTML, compileCSS, compileJS);
exports.convertToWEBP = convertToWEBP;