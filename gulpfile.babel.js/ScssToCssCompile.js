'use strict'
/**
 * Scss => CSS Compile 실행
 */
import { src, dest, lastRun } from 'gulp'
import { paths } from '../pub-paths.json'
import browserSync from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
// import { newer } from 'gulp-newer' // html

const autoprefixer = require('gulp-autoprefixer')
const sass = gulpSass(dartSass)
const log = require('fancy-log')
const sassGlob = require('gulp-sass-glob')
const ifElse = require('gulp-if-else')
const cached = require('gulp-cached')

const pkgPaths = paths

// 마크업리스트 빌드에도 사용
export const scssToCssCompileEngine_markup = (path, bool, cb) => {
  return (
    src(path.markupSrc + '**/*.scss', { sourcemaps: bool, since: lastRun(scssToCssCompileEngine_markup) })
      .pipe(sassGlob())
      .pipe(
        ifElse(
          process.env.NODE_ENV === 'development',
          function () {
            return sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError)
          },
          function () {
            return sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError)
          }
        )
      )
      .pipe(autoprefixer())
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
      // .on('finish', function(){
      // 	log('cssCompileComponent : complete 😤 ');
      // })
      .pipe(browserSync.stream())
  )
  cb()
}

// gulp 실행시 컴파일
export const cssCompiles_markup = (cb) => {
  if (process.env.NODE_ENV === 'development') {
    scssToCssCompileEngine_markup(pkgPaths.pc.css, true)
  } else {
    scssToCssCompileEngine_markup(pkgPaths.pc.css, false)
  }
  cb()
}

// watch에서 사용
export const watchOnChangeCompilesCss_markup = () => {
  if (process.env.NODE_ENV === 'development') {
    scssToCssCompileEngine_markup(pkgPaths.pc.css, true)
  } else {
    scssToCssCompileEngine_markup(pkgPaths.pc.css, false)
  }
}

// 빌드에도 사용(pc 빌드)
export const scssToCssCompileEngine_pc = (path, bool, cb) => {
  return (
    src(path.src + '**/*.scss', { sourcemaps: bool, since: lastRun(scssToCssCompileEngine_pc) })
      // .pipe(cached('linting'))
      .pipe(sassGlob())
      .pipe(
        ifElse(
          process.env.NODE_ENV === 'development',
          function () {
            return sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError)
          },
          function () {
            return sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError)
          }
        )
      )
      .pipe(autoprefixer())
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
      // .on('finish', function(){
      // 	log('cssCompileComponent : complete 😤 ');
      // })
      .pipe(browserSync.stream())
  )
  cb()
}

// gulp 실행시 컴파일(PC)
export const cssCompiles_pc = (cb) => {
  if (process.env.NODE_ENV === 'development') {
    scssToCssCompileEngine_pc(pkgPaths.pc.css, true)
  } else {
    scssToCssCompileEngine_pc(pkgPaths.pc.css, false)
  }
  cb()
}

// watch에서 사용(pc)
export const watchOnChangeCompilesCss_pc = () => {
  if (process.env.NODE_ENV === 'development') {
    scssToCssCompileEngine_pc(pkgPaths.pc.css, true)
  } else {
    scssToCssCompileEngine_pc(pkgPaths.pc.css, false)
  }
}
