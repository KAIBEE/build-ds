const path = require("path");
const fs = require("fs");
const PNG = require("pngjs").PNG;
const pixelmatch = require("pixelmatch");

const expectedPath = path.join(__dirname, "out/screenshots/expected");
const actualPath = path.join(__dirname, "out/screenshots/actual");
const reportDate = Date.now();
const reportPath = path.join(__dirname, "out/reports/" + reportDate + "/");
let files = fs.readdirSync(expectedPath);

let matches = [];
files.forEach(function (file) {
    const img1 = PNG.sync.read(fs.readFileSync(path.join(actualPath, file)));
    const img2 = PNG.sync.read(fs.readFileSync(path.join(expectedPath, file)));
    const { width, height } = img2;
    const diff = new PNG({ width, height });
    let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

    if (numDiffPixels > 0) {
        if(!fs.existsSync(reportPath)) {
            fs.mkdirSync(reportPath, {recursive: true});
        }
        matches.push({ file: file, diff: numDiffPixels });
        fs.writeFileSync(path.join(reportPath, file), PNG.sync.write(diff));
    }
});

if (matches.length > 0) {
    console.log("Visual regressions have been detected in : ");
    matches.forEach(function(match) {
        console.log(reportPath + match.file);
    })
} else {
    console.log("No regression detected");
}
return matches.length > 0;
