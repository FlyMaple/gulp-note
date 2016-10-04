# Gulp

1. 在安裝前建議先執行 `npm cache clean` 清除暫存
2. 執行 `npm init` 產生 package.json ，注意專案名稱不要取名為 gulp，會無法安裝 gulp 套件
3. 執行 `npm install gulp -g`
4. 執行 `npm install gulp --save-dev`
5. 執行 `gulp -v` 可以看到 global / local 的 gulp 版本

## Hello gulp
1. 在專案目錄下建立一個 gulpfile.js 的檔案
2. 寫入以下程式
``` js
var gulp = require('gulp');

function HelloGulpFunc() {
    console.log('Hello Gulp!!');
}

gulp.task('default', HelloGulpFunc);
```
3. 執行 `gulp` 或是 `gulp default`
```
C:\wamp\www\test\Gulp>gulp
[09:46:30] Using gulpfile C:\wamp\www\test\Gulp\gulpfile.js
[09:46:30] Starting 'default'...
Hello Gulp!!
[09:46:30] Finished 'default' after 105 μs

C:\wamp\www\test\Gulp>
```
`$ gulp [任務名稱]`，若沒輸入任務名稱，會自動執行 default 的任務

ps. `npm ls` 可以看到目前 project 下所裝的套件

## gulp-webserver
1. 執行 `npm install gulp-webserver --save-dev`
2. 在 gulpfile.js 繼續寫入相關程式
``` js
var gulp = require('gulp');
var webserver = require('gulp-webserver');

function WebServerFunc() {
    return gulp.src('./app/')
            .pipe(webserver({
                port: 4444,
                livereload: true,
                directoryListing: false,
                open: true,
                fallback: 'index.html'
            }));
}

gulp.task('webserver', WebServerFunc);
gulp.task('default', ['webserver']);
```

## 打包壓縮 CSS 與 JS
1. 執行 `npm install gulp-minify-css gulp-uglify gulp-concat gulp-rename --save-dev` <br>
    gulp-minify-css: css 壓縮 <br>
    gulp-uglify: 醜化(加密) <br>
    gulp-concat: 檔案合併 <br>
    gulp-rename: 改名 <br>
2. 更改一下 gulpfile.js 進行檔案合併
``` js
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

function ConcatFunc() {
    return gulp.src('./app/css/*.css')
            .pipe(concat('all.css'))
            .pipe(gulp.dist('./build/css/'));
}

gulp.task('concat', ConcatFunc);
gulp.task('default', ['concat']);
```
3. 將檔案壓縮並改名
``` js
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

function ConcatFunc() {
    return gulp.src('./app/css/*.css')
            .pipe(concat('all.css'))
            .pipe(gulp.dest('./build/css/'));
}

function MinifyCssFunc() {
    return gulp.src('./build/css/all.css')
            .pipe(minifyCSS())
            .pipe(rename(function (path) {
                //  path: { dirname: '.', basename: 'all', extname: '.css' } 
                path.basename += '.min'
            }))
            .pipe(gulp.dest('./build/css/'));
}

gulp.task('concat', ConcatFunc);
gulp.task('minify-css', ['concat'], MinifyCssFunc);
gulp.task('default', ['minify-css']);
```
4. 將 js 做壓縮並改名
``` js 
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

function ConcatFunc() {
    return gulp.src('./app/css/*.css')
            .pipe(concat('all.css'))
            .pipe(gulp.dest('./build/css/'));
}

function MinifyCssFunc() {
    return gulp.src('./build/css/all.css')
            .pipe(minifyCSS({
                keepBreaks: true
            }))
            .pipe(rename(function (path) {
                //  path: { dirname: '.', basename: 'all', extname: '.css' } 
                path.basename += '.min'
            }))
            .pipe(gulp.dest('./build/css/'));
}

function UglifyJsFunc() {
    return gulp.src('./app/js/*.js')
            .pipe(uglify())
            .pipe(rename(function (path) {
                path.basename += '.min';
            }))
            .pipe(gulp.dest('./build/js/'));
}

gulp.task('concat', ConcatFunc);
gulp.task('minify-css', ['concat'], MinifyCssFunc);
gulp.task('uglify-js', UglifyJsFunc);
gulp.task('default', ['minify-css', 'uglify-js']);
```

5. 打包壓縮 html <br/>
    執行 `npm install gulp-html-replace gulp-minify-html --save-dev` <br/>
    gulp-html-replace:  替換 html 本文 <br/>
    gulp-minify-html: html 壓縮 <br/>
``` js
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');
var minifyHTML = require('gulp-html-minify');

function ConcatFunc() {
    return gulp.src('./app/css/*.css')
            .pipe(concat('all.css'))
            .pipe(gulp.dest('./build/css/'));
}

function MinifyCssFunc() {
    return gulp.src('./build/css/all.css')
            .pipe(minifyCSS({
                keepBreaks: true
            }))
            .pipe(rename(function (path) {
                //  path: { dirname: '.', basename: 'all', extname: '.css' } 
                path.basename += '.min'
            }))
            .pipe(gulp.dest('./build/css/'));
}

function UglifyJsFunc() {
    return gulp.src('./app/js/*.js')
            .pipe(uglify())
            .pipe(rename(function (path) {
                path.basename += '.min';
            }))
            .pipe(gulp.dest('./build/js/'));
}

function HtmlReplaceFunc() {
    return gulp.src('./app/index.html')
            .pipe(htmlreplace({
                css: 'css/all.min.css',
                js: 'js/all.min.js'
            }))
            .pipe(minifyHTML())
            .pipe(gulp.dest('./build/'));
}

gulp.task('concat', ConcatFunc);
gulp.task('minify-css', ['concat'], MinifyCssFunc);
gulp.task('uglify-js', UglifyJsFunc);
gulp.task('html-replace', HtmlReplaceFunc);
gulp.task('default', ['minify-css', 'uglify-js', 'html-replace']);
```

6. 建立 SASS /SCSS 環境 <br/>
    執行 `npm install gulp-compass --save-dev` <br/>
    在專案下建立 style 資料夾，裡面包含 scss / css 資料夾，在 .scss 的檔案要引入 @charset "UTF-8";
``` js
var gulp = require('gulp');
var compass = require('gulp-compass');

function CompassFunc() {
    return gulp.src('./style/scss/*.scss')
            .pipe(compass({
                sourcemap: true,
                time: true,
                css: './style/css/',
                sass: './style/scss/',
                style: 'compact'    //nested, expanded, compact, compressed
            }))
            .pipe(gulp.dest('./style/css/'));
}

function WatchFunc() {
    gulp.watch('./style/scss/*.scss', ['compass']);
}

gulp.task('compass', CompassFunc);
gulp.task('watch', WatchFunc);
gulp.task('default', ['compass', 'watch']);
```    
