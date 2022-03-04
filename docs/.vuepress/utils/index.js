const fs = require("fs");
const path = require("path");

// 项目根目录
const basePath = path.join(__dirname, "../../");
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(dirName, replaceName = "") {
  let filePath = path.resolve(basePath, dirName);
  let fileList = [];
  //根据文件路径读取文件，返回文件列表
  let files = fs.readdirSync(filePath);

  //遍历读取到的文件列表
  files.forEach(function(filename) {
    //获取当前文件的绝对路径
    let filedir = path.join(filePath, filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    let stats = fs.statSync(filedir);
    //递归，如果是文件夹，就继续遍历该文件夹下面的文件
    if (stats.isDirectory()) {
      fileList = fileList.concat(fileDisplay(filedir, replaceName));
    } else if (stats.isFile() && filename.endsWith(".md")) {
      fileList.push(
        filedir
          .replace(path.resolve(basePath, replaceName) + "/", "")
          .replace("README.md", "")
          .replace(".md", "")
      );
    }
  });

  return fileList.sort();
}

module.exports = {
  getMdByDir: fileDisplay
};