"use strict";

import gulp from "gulp";
const smartgrid = require("smart-grid");

gulp.task("smart-grid", (cb) => {
    smartgrid("./src/styles/vendor/import/", {
        outputStyle: "scss",
        filename: "_smart-grid",
        columns: 12, // number of grid columns
        offset: "1.875rem", // gutter width - 30px
        mobileFirst: true,
        mixinNames: {
            container: "container"
        },
        container: {
            fields: "0.9375rem" // side fields - 15px
        },
        breakPoints: {
            xs: {
                width: "19.98rem" // 320px
            },
            sm: {
                width: "35.98rem" // 576px
            },
            md: {
                width: "47.98rem" // 768px
            },
            lg: {
                width: "61.98rem" // 992px
            },
            xl: {
                width: "74.98rem" // 1200px
            }
        }
    });
    cb();
});
