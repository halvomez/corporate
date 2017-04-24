// подулючение модулей
var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber"); //не останавливает скрипт, если найдена ошибка
var postcss = require("gulp-postcss"); //включаем доп. свойства, например автопрефиксер
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");

gulp.task("style", function () { //таск автоматизации
    gulp.src("sass/style.scss") //получаем исходный текст сас файла
        .pipe(plumber())
        .pipe(sass()) //прогоняем через компилятор саса
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 1 version",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Opera versions",
                    "last 2 Edge versions",
                ]
            })
        ]))
        .pipe(gulp.dest("css"))
        .pipe(server.reload({
            stream: true
        })); //перезагрузка браузера
});

gulp.task("serve", ["style"], function () { //сначала выполняем gulp.task-style, потом запускаем gulp.task-serve
    server.init({
        server: "."
    });

    gulp.watch("sass/**/*.scss", ["style"]); //монитор изменений файлов html  и css в любой вложенности папок
    gulp.watch("*.html")
        .on("change", server.reload);
});