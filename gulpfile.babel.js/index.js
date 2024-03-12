'use strict'
/**
 * Gulp App 실행
 */
import { series, parallel } from 'gulp'
import { log } from 'fancy-log'
// import { browser-sync } from 'browser-sync';

/**
 * Module Import
 */
import { staticServer } from './StaticServer.js'
import { help } from './Help.js'
import { componentBuildCompile_pc } from './BuildCompile.js'
import { watchComponent } from './Watch.js'
import { cleanPcDeploy, cleanPcHtml, cleanPcCss } from './Clean.js'
import { cssCompiles_markup, cssCompiles_pc } from './ScssToCssCompile.js'
import { html_pc, html_markup } from './HtmlCompile.js'
import { filecopy_pc_images, filecopy_pc_js, filecopy_pc_font } from './Copy.js'
import { markupListJsCopy, markupListImgCopy } from './BuildMarkuplist.js'

/**
 * Gulp 실행시 개발모드 OR 배포모드 변경 선택(node 환경변수 사용)
 * setDevEnv : 개발할 때 사용
 * setProEnv : 배포할 때 사용
 * // process.env.NODE_ENV = 'development'; // default development mode
 */

// Development Mode
let setDevEnv = (cb) => {
  process.env.NODE_ENV = 'development'
  cb()
}

// Production Mode
let setProEnv = (cb) => {
  process.env.NODE_ENV = 'production'
  cb()
}

/**
 * Module 실행
 */
const pc = series(setDevEnv, parallel(cssCompiles_markup, cssCompiles_pc, html_pc, html_markup), staticServer, watchComponent)

// Clean PC HTML
const pcHtmlClean = series(cleanPcHtml)

// Clean PC CSS
const pcCssClean = series(cleanPcCss)

// Clean PC Deploy
const pcDeployClean = series(cleanPcDeploy)

// PC Build
const pc_build = series(setProEnv, parallel(componentBuildCompile_pc, html_pc, html_markup), filecopy_pc_images, filecopy_pc_js, filecopy_pc_font, cssCompiles_markup, parallel(markupListJsCopy, markupListImgCopy))

export default help
export { pc, pc_build, pcDeployClean, pcHtmlClean, pcCssClean }
