'use strict'
/**
 * clean 작업
 */
import { paths } from '../pub-paths.json'
import { src } from 'gulp'
var clean = require('gulp-clean')

// pc html clean
export const cleanPcHtml = (cb) => {
  let url = paths.pc.html.output
  return src(url, { read: false }).pipe(clean())
  cb()
}

// pc css clean
export const cleanPcCss = (cb) => {
  let url = paths.pc.css.output
  return src(url, { read: false }).pipe(clean())
  cb()
}

// pc deploy clean
export const cleanPcDeploy = (cb) => {
  let url = './deploy'
  return src(url, { read: false }).pipe(clean())
  cb()
}

// export const cleans = () => {
//   console.log('clean')
// }

// html파일 삭제
// function html_pc_clean(done) {
// 	var url;
// 	if (process.env.NODE_ENV === "development") {
// 		url = paths.pc.html.output+'*'
// 	} else {
// 		url = paths.pc.html.dest+'*'
// 	}
// 	console.log(process.env.NODE_ENV, url);

// 	return src(url, {read: false})
// 		.pipe(clean());

// 	done();
// };
