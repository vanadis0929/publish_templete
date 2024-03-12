'use strict'
/**
 * resource copy
 */
import { paths } from '../pub-paths.json'
import { src, dest } from 'gulp'
const clean = require('gulp-clean')
const pkgPaths = paths

const filecopy = (url, cb) => {
  return src(url.dest + '*', { read: false })
    .pipe(clean())
    .pipe(src(url.src + '**/*'))
    .pipe(dest(url.dest))
  cb()
}

export const filecopy_pc_images = (cb) => {
  filecopy(pkgPaths.pc.images)
  cb()
}

export const filecopy_pc_js = (cb) => {
  filecopy(pkgPaths.pc.js)
  cb()
}
export const filecopy_pc_font = (cb) => {
  filecopy(pkgPaths.pc.font)
  cb()
}
