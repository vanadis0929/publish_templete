'use strict'
/**
 * Gulp 서버 실행
 */
import browserSync from 'browser-sync'

export function staticServer(cb) {
  browserSync.init({
    injectChanges: false,
    port: 9100,
    // files: [paths.pc.css.output],
    server: { baseDir: './' },
    startPath: './_dev/gate/gate_viewHtml/index.html',
    browser: ['chrome', 'google chrome'],
  })
  cb()
}
