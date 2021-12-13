let fs= require("fs");
let path=require("path");
function treeF(dirPath) {
    console.log("Tree command implementd")
    // let destPath;
    if (dirPath == undefined) {
        treeHelper(process.cwd(),"");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHelper(dirPath, "");

        } else {
            console.log("Kindly enter the correct path");
            return;
        }
    }
}
function treeHelper(dirPath, indent) {
    //is file or folder
    let isFilee = fs.lstatSync(dirPath).isFile();
    if (isFilee == true) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├───" + fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++){
            let childP = path.join(dirPath,childrens[i])
            treeHelper(childP,indent+"\t")
        }
    }
}
module.exports={
    treeK : treeF
}