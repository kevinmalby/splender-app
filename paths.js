var appRoot = 'public/';
var outputRoot = 'public/dist/';

module.exports = {
  root: appRoot,
  source: appRoot + 'src/**/*.js',
  html: appRoot + 'src/**/*.html',
  fonts: appRoot + 'src/fonts/**/*.*',
  style: appRoot + 'styles/**/*.sass',
  materialize: appRoot + 'styles/materialize/**/*.scss',
  output: outputRoot,
  outputFonts: outputRoot + 'fonts/'
};
