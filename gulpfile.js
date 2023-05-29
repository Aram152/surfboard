const { src, dest, task, series, watch, parallel } = require('gulp')
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');

const babel = require('gulp-babel');
const { reload } = require('browser-sync');

sass.compiler = require('node-sass');



task( 'clean', () => {
    return src( 'dist/**/*', { read: false })
        .pipe( rm() )
})


task( 'copy',  () => {
    return src('src/**/*.scss').pipe(dest('dist'))
});


const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/style/main.scss'
]


task( 'copy:html',  () => {
    return src('src/*.html').pipe(dest('dist'))
});


task( 'styles',  () => {
    return src(styles)
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(concat('result.min.scss'))
        .pipe(sass().on('error', sass.logError))
        // .pipe(px2rem())
        .pipe(autoprefixer({cascade: false}))
        .pipe(gcmq())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(reload({stream: true}));
});


const libs = [
    'node_modules/jquery/dist/jquery.js',
    'src/js-files/*.js'
]


task('js-files', () => {
    return src(libs)
        .pipe(sourcemaps.init())
        .pipe(concat('result.min.js', {newLine: ';'}))
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(reload({stream: true}));
})

task('icons', () => {
    return src('src/img/ddown/*svg')
    .pipe(svgo({
        plugins: [
            {
                removeAttrs: {attrs: '(fill|stroke|style|width|height|data.*)'}
            }
        ]
    }))
    .pipe(dest('dist/img/ddown'));
})


task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

task('watch', () => {
    watch('./src/style/**/*.scss', series('styles'));
})

task('default', 
    series(
        'clean', 
        parallel('copy:html', 'styles', 'icons', 'js-files'),
        parallel('watch', 'browser-sync')
    )
);