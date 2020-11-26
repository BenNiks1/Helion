const projectFolder = "dist";
const sourceFolder = "src";
const fs = require("fs");

const path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    fonts: projectFolder + "/fonts/",
    slick: projectFolder + "/slick/",
  },
  src: {
    pug: sourceFolder + "/*.pug",
    css: sourceFolder + "/scss/main.scss",
    js: sourceFolder + "/js/script.js",
    img: sourceFolder + "/img/**/**",
    fonts: sourceFolder + "/fonts/*.ttf",
    slick: sourceFolder + "/slick/**",
  },
  watch: {
    pug: sourceFolder + "/**/*.pug",
    css: sourceFolder + "/scss/**/*.scss",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/**",
  },
  clean: "./" + projectFolder + "/",
};

const { src, dest } = require("gulp"),
  gulp = require("gulp");
const scss = require("gulp-sass");
const fileInclude = require("gulp-file-include");
const del = require("del");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const groupMedia = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2");
const pug = require("gulp-pug");

function sync() {
  browserSync.init({
    server: {
      baseDir: "./" + projectFolder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function slick() {
  return src(path.src.slick)
    .pipe(dest(path.build.slick))
}

function html() {
  return src(path.src.pug)
    .pipe(pug())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(groupMedia())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

function fonts() {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));

  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

function images() {
  return (
    src(path.src.img)
      // .pipe(
      //   imagemin({
      //     progressive: true,
      //     svgoPlugings: [{ removeViewBox: false }],
      //     interlaced: true,
      //     optimizationLevel: 3, // 0 to 7
      //   })
      // )
      .pipe(dest(path.build.img))
      .pipe(browserSync.stream())
  );
}
function fontsStyle() {
  let file_content = fs.readFileSync(sourceFolder + "/scss/fonts.scss");
  if (file_content == "") {
    fs.writeFile(sourceFolder + "/scss/fonts.scss", "", cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split(".");
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(
              sourceFolder + "/scss/fonts.scss",
              '@include font("' +
                fontname +
                '", "' +
                fontname +
                '", "400", "normal");\r\n',
              cb
            );
          }
          c_fontname = fontname;
        }
      }
    });
  }
}

function cb() {}

function watchFiles() {
  gulp.watch([path.watch.pug], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  return del(path.clean);
}

const build = gulp.series(
  clean,
  gulp.parallel(js, css, html, images, fonts,slick),
  fontsStyle
);
const watch = gulp.parallel(build, watchFiles, sync);

exports.slick = slick
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
