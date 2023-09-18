const path = require("path");
const fs = require("fs");

class InstallDocs {
  readmeFrom = [];
  readmeTo = [];
  libraryPath = path.join(__dirname, "@awesome-cordova-library");
  documentationPath = path.join(__dirname, "docs/plugins");
  compressorPath = path.join(__dirname, "@canvas-compressor-image");
  compressorDoc = path.join(__dirname, "docs/canvas-compressor-image");

  linkCompressorImage() {
    return new Promise((resolve, reject) => {
      try {
        fs.accessSync(
          path.join(this.compressorDoc, "README.md"),
          fs.constants.R_OK | fs.constants.W_OK
        );
        resolve();
      } catch (e) {
        fs.mkdir(this.compressorDoc, (err) => {
          if (err) {
            reject(err);
            return;
          }

          fs.link(
            path.join(this.compressorPath, "README.md"),
            path.join(this.compressorDoc, "README.md"),
            (err) => {
              if (err) {
                reject(err);
                return;
              }
              console.log(`canvas-compressor-image installed!`);
            }
          );
        });
        resolve();
      }
    });
  }

  linkPluginsDocumentation() {
    return new Promise((resolve, reject) => {
      fs.link(
        path.join(this.libraryPath, "README.md"),
        path.join(this.documentationPath, "README.md"),
        (err) => {
          resolve();
        }
      );
    });
  }

  checkReadMeFromLibrary() {
    return new Promise((resolve, reject) => {
      try {
        const files = fs.readdirSync(this.libraryPath, {});
        files.forEach((file) => {
          const fullPath = path.join(this.libraryPath, file);
          const stats = fs.statSync(fullPath);
          if (
            stats.isDirectory() &&
            !file.startsWith(".") &&
            file !== "pattern plugin"
          ) {
            const readMeFile = path.join(fullPath, "README.md");
            fs.accessSync(readMeFile, fs.constants.R_OK | fs.constants.W_OK);
            this.readmeFrom.push(path.join(file, "README.md"));
          }
        });
        resolve(this.readmeFrom);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  checkReadMeToDocumentation(libraries) {
    return new Promise((resolve, reject) => {
      libraries.forEach((library) => {
        const fullPath = path.join(
          this.documentationPath,
          library.replace("README.md", "")
        );
        fs.access(fullPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
          if (err) {
            // console.log("mkdir", fullPath);
            fs.mkdir(fullPath, (err) => {
              if (err) {
                reject(err);
                return;
              }
              // console.log("ln", path.join(this.libraryPath, library), fullPath);
              fs.link(
                path.join(this.libraryPath, library),
                path.join(this.documentationPath, library),
                (err) => {
                  if (err) {
                    reject(err);
                    return;
                  }
                  console.log(`${library} installed!`);
                }
              );
            });

            return;
          }
          resolve();
        });
      });
      return;
    });
  }

  exec() {
    if (!fs.existsSync(this.libraryPath)) {
      console.error(
        `${this.libraryPath} dosn't exist clone him to https://github.com/joazco/awesome-cordova-library.git`
      );
      return;
    }

    this.linkCompressorImage()
      .then(() => this.linkPluginsDocumentation())
      .then(() => this.checkReadMeFromLibrary())
      .then((data) => this.checkReadMeToDocumentation(data))
      .catch((err) => console.error(err));
  }
}

new InstallDocs().exec();
