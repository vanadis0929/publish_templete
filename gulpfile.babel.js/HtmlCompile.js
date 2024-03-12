'use strict'
/**
 * HTML Compile 실행
 */
import { src, dest, lastRun } from 'gulp'
import { paths } from '../pub-paths.json'

const newer = require('gulp-newer')
const fileinclude = require('gulp-file-include')
const taginclude = require('gulp-html-tag-include')
const pretty = require('gulp-pretty-html')
const ifElse = require('gulp-if-else')
const pkgPaths = paths

// markup
const html_compile_markup = (path, done) => {
  return (
    src(path.markupSrc + '*.html', { since: lastRun(html_compile_markup) })
      .pipe(
        taginclude({
          prefixVar: '@#',
        })
      )
      .pipe(
        fileinclude({
          prefix: '@@',
          basepath: '@file',
          context: {
            arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          },
        })
      )
      .pipe(
        pretty({
          indent_size: 1,
          indent_char: '	',
          end_with_newlines: true,
        })
      )
      // .pipe(removeEmptyLines())
      .pipe(
        ifElse(
          process.env.NODE_ENV === 'development',
          function () {
            return dest(path.markupOutput, { sourcemaps: true })
          },
          function () {
            return dest(path.markupDest, { sourcemaps: false })
          }
        )
      )
  )

  done()
}
export const html_newer_compile_markup = (path, done) => {
  return (
    src(path.markupSrc + '*.html', { since: lastRun(html_compile_markup) })
      .pipe(newer(path.output))
      .pipe(
        taginclude({
          prefixVar: '@#',
        })
      )
      .pipe(
        fileinclude({
          prefix: '@@',
          basepath: '@file',
          context: {
            arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          },
        })
      )
      .pipe(
        pretty({
          indent_size: 1,
          indent_char: '	',
          end_with_newlines: true,
        })
      )
      // .pipe(removeEmptyLines())
      .pipe(dest(path.markupOutput))
  )

  done()
}
// Gulp 실행시 html 컴파일
export const html_markup = (done) => {
  html_compile_markup(pkgPaths.pc.html)
  done()
}

// Watch에서 관리(수정시 반영)
export const html_newer_markup = (done) => {
  html_newer_compile_markup(pkgPaths.pc.html)
  done()
}

// pc
const html_compile_pc = (path, done) => {
  return (
    src(path.src + '**/*.html', { since: lastRun(html_compile_pc) })
      .pipe(
        taginclude({
          prefixVar: '@#',
        })
      )
      .pipe(
        fileinclude({
          prefix: '@@',
          basepath: '@file',
          context: {
            arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          },
        })
      )
      .pipe(
        pretty({
          indent_size: 1,
          indent_char: '	',
          end_with_newlines: true,
        })
      )
      // .pipe(removeEmptyLines())
      .pipe(
        ifElse(
          process.env.NODE_ENV === 'development',
          function () {
            return dest(path.output, { sourcemaps: true })
          },
          function () {
            return dest(path.dest, { sourcemaps: false })
          }
        )
      )
  )

  done()
}
export const html_newer_compile_pc = (path, done) => {
  return (
    src(path.src + '**/*.html', { since: lastRun(html_compile_pc) })
      .pipe(newer(path.output))
      .pipe(
        taginclude({
          prefixVar: '@#',
        })
      )
      .pipe(
        fileinclude({
          prefix: '@@',
          basepath: '@file',
          context: {
            arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          },
        })
      )
      .pipe(
        pretty({
          indent_size: 1,
          indent_char: '	',
          end_with_newlines: true,
        })
      )
      // .pipe(removeEmptyLines())
      .pipe(dest(path.output))
  )

  done()
}
// Gulp 실행시 html 컴파일
export const html_pc = (done) => {
  html_compile_pc(pkgPaths.pc.html)
  done()
}

// Watch에서 관리(수정시 반영)
export const html_newer_pc = (done) => {
  html_newer_compile_pc(pkgPaths.pc.html)
  done()
}
