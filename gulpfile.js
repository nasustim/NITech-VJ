const fs = require("fs");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const ejs = require("gulp-ejs");
const scss = require("gulp-scss");
const babel = require("gulp-babel");

gulp.task("go", function(callback){
    var json_index = JSON.parse(fs.readFileSync("./src/json/objects.json"));


    gulp.src("./src/js/common.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("./docs/"));


    gulp.src("./src/scss/common.scss")
        .pipe(scss())
        .pipe(gulp.dest("./docs/"));


    for(var i in json_index) {
        gulp.src("./src/scss/"+ i +".scss")
            .pipe(scss())
            .pipe(gulp.dest("./docs/"+ i + "/"));

        gulp.src("./src/ejs/index.ejs")
            .pipe(plumber())
            .pipe(ejs(json_index[i]))
            .pipe(rename("index.html"))
            .pipe(gulp.dest("./docs/"+ i +"/"));


        gulp.src("./src/js/"+ i +".js")
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest("./docs/"+ i + "/"));
    }
});
