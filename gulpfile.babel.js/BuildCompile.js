'use strict'
/**
 * Gulp Compile 및 Build 실행 통합
 * production 또는 development에 따라 다르게 출력
 */
import { paths } from '../pub-paths.json'
import { scssToCssCompileEngine_pc } from './ScssToCssCompile.js'
const pkgPaths = paths

// componentBuildCompile
/**
 * css 빌드용 변환 스타일 옵션
 * nested     : 계층 구조 기본값 들여쓰기
 * expanded   : 계층 구조 들여쓰기 없음
 * compact    : 선인이 여러개 있어도 줄바꿈 없음
 * compressed : 공백없이 한줄
 */
export function componentBuildCompile_pc(cb) {
  if (process.env.NODE_ENV === 'production') {
    scssToCssCompileEngine_pc(pkgPaths.pc.css, 'compressed', false)
    cb()
    // console.log('production')
  } else if (process.env.NODE_ENV === 'development') {
    scssToCssCompileEngine_pc(pkgPaths.pc.css, 'expanded', false)
    cb()
    // console.log('deveßlopment')
  } else {
    throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
  }
}
