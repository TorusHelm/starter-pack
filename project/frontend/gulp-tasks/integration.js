import gulp from "gulp";
import tap from "gulp-tap";
import { paths } from "../gulpfile.babel";
import sass from "gulp-sass";
import mincss from "gulp-clean-css";
import groupmedia from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import babel from "gulp-babel";

gulp.task("integration", () => {
    return gulp.src(paths.integration.src)
        .pipe(tap( file => {
            gulp.src(paths.integration.dist)
                .pipe(tap( backFile => {
                    if ( file.basename !== backFile.basename ) {
                        return;
                    }

                    gulp.src(`${file.path}/*.js`)
                        .pipe(babel({
                            presets: ["@babel/env"]
                        }))
                        .pipe(gulp.dest(backFile.path));

                    gulp.src(`${file.path}/**/*.scss`)
                        .pipe(sass())
                        .pipe(groupmedia())
                        .pipe(autoprefixer({
                            cascade: false,
                            grid: true
                        }))
                        .pipe(mincss({
                            compatibility: "ie8", level: {
                                1: {
                                    specialComments: 0,
                                    removeEmpty: true,
                                    removeWhitespace: true
                                },
                                2: {
                                    mergeMedia: true,
                                    removeEmpty: true,
                                    removeDuplicateFontRules: true,
                                    removeDuplicateMediaBlocks: true,
                                    removeDuplicateRules: true,
                                    removeUnusedAtRules: false
                                }
                            }
                        }))
                        .pipe(gulp.dest(backFile.path));
                }));
        }));
});