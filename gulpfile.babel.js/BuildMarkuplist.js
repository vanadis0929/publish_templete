"use strict";
/**
 * resource copy
 */
import { paths } from "../pub-paths.json";
import { src, dest } from "gulp";
const clean = require("gulp-clean");
const pretty = require("gulp-pretty-html");
const pkgPaths = paths;

// pc
// const html_compile_markList = (path, done) => {
//   return src(path.markupSrc + '**/*.html')
//     .pipe(
//       pretty({
//         indent_size: 1,
//         indent_char: '	',
//         end_with_newlines: true,
//       })
//     )
//     .pipe(dest(path.markupDest))
//   done()
// }

// // Gulp Build 실행시
// export const htmlMarkupListBuild = (done) => {
//   html_compile_markList(pkgPaths.pc.html)
//   done()
// }

/**
 * markupList copy
 */
const markupListJsBuild = (url, cb) => {
  return src(url.markupDest + "*", { read: false })
    .pipe(clean())
    .pipe(src(url.markupOutput + "**/*"))
    .pipe(dest(url.markupDest));
  cb();
};

export const markupListJsCopy = (cb) => {
  markupListJsBuild(pkgPaths.pc.js);
  cb();
};

export const markupListImgCopy = (cb) => {
  markupListJsBuild(pkgPaths.pc.images);
  cb();
};
