const { join } = require("path");
const fse = require('fs-extra');

const srcDir = join(__dirname, "src");
const contractsSrcDir = join(__dirname, "build", "contracts")
const destDir = join(__dirname, "dist");

try {
    const operation = fse.copySync(srcDir, destDir, { overwrite: true, recursive: true });
    const operation2 = fse.copySync(contractsSrcDir, destDir, { overwrite: true, recursive: true });
    console.log({ message: "Success", details: "Files copied to dist/ forlder" });
} catch (error) {
    console.log({ message: "Something went wrong", details: error });
}
