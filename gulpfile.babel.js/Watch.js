'use strict'

import { paths } from '../pub-paths.json'
import { watchOnChangeCompilesCss_pc, watchOnChangeCompilesCss_markup } from './ScssToCssCompile.js'
import { watch } from 'gulp'
import { html_newer_pc, html_newer_markup } from './HtmlCompile'
import browserSync from 'browser-sync'

const pkgPaths = paths

export const watchComponent = (cb) => {
  // markup
  watch(pkgPaths.pc.css.markupSrc).on('change', watchOnChangeCompilesCss_markup)
  watch(pkgPaths.pc.html.markupSrc, html_newer_markup)
  watch(pkgPaths.pc.html.markupOutput).on('change', browserSync.reload)

  // dev
  watch(pkgPaths.pc.css.src).on('change', watchOnChangeCompilesCss_pc)
  watch(pkgPaths.pc.html.src, html_newer_pc)
  watch(pkgPaths.pc.html.output).on('change', browserSync.reload)
  watch(pkgPaths.pc.js.src).on('change', browserSync.reload)
  cb()
}
