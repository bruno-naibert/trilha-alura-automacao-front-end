var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var csslint = require('gulp-csslint');
var cssmin = require('gulp-cssmin');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');

gulp.task('default', ['copiar'], tarefaPadrao);
gulp.task('excluir', excluir);
gulp.task('copiar', ['excluir'], copiar);
gulp.task('minificar-arquivos', minificarArquivos);
gulp.task('minificar-imagens', minificarImagens);
gulp.task('servidor', servidor);

/**
 * Cria uma cópia do projeto para distribuição.
 */
function copiar()
{
    return gulp.src('src/**/*')
               .pipe(gulp.dest('dist'));
}

/**
 * Exclui todos os arquivos da pasta dist.
 */
function excluir()
{
    return gulp.src('dist')
        .pipe(clean());
}

/**
 * Minifica as imagens do projeto.
 */
function minificarImagens()
{
    gulp
        .src('dist/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
}

/**
 * Minifica, concatena e ofusca códigos CSS e JS.
 */
function minificarArquivos()
{
    gulp
        .src('dist/**/*.html')
        .pipe(usemin({
            minJS: [uglify],
            minCSS: [cssmin]
        }))
        .pipe(gulp.dest('dist'));
}

/**
 * Tarefa executada como padrão.
 */
function tarefaPadrao()
{
    gulp.start('minificar-imagens', 'minificar-arquivos');
}

/**
 * Mini servidor local para executar o projeto e efetuar o recarregamento automático.
 * Inclui a verificação automática de erros no JS e CSS.
 */
function servidor()
{
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    /**
     * JSHint
     */
    gulp.watch('src/js/**/*.js')
        .on('change', function (evento)
        {
            console.log('Linting: ' + evento.path);
            gulp.src(evento.path)
                .pipe(jshint())
                .pipe(jshint.reporter(jshintStylish));

        });

    /**
     * CSSLint
     */
    gulp.watch('src/css/**/*.css')
        .on('change', function (evento)
        {
            console.log('Linting: ' + evento.path);
            gulp.src(evento.path)
                .pipe(csslint())
                .pipe(csslint.reporter());

        });

    gulp.watch('src/**/*')
        .on('change', browserSync.reload);
}
