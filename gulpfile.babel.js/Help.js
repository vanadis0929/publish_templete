'use strict'
/**
 * Gulp 실행 명령어
 */
let helpList = [
  {
    Comment: 'Gulp 도움말',
    Command: 'gulp',
  },
  {
    Comment: 'Gulp PC실행',
    Command: 'gulp pc',
  },
  {
    Comment: 'Gulp PC HTML Clean',
    Command: 'gulp pcHtmlClean',
  },
  {
    Comment: 'Gulp PC CSS Clean',
    Command: 'gulp pcCssClean',
  },
  {
    Comment: 'Gulp PC Deploy Clean',
    Command: 'gulp pcDeployClean',
  },
  {
    Comment: 'Gulp PC Build',
    Command: 'gulp pc_build',
  },
]

export function help(cb) {
  console.log('👻     H . E . L . P    👻');
  console.table(helpList);
  cb();
};
