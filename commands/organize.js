let fs = require("fs");
let path = require("path");

function orgF(dirPath) {
    // console.log("Organize command implementd")
    // 1. input -> directory path given
    let destPath;
    if (dirPath == undefined) {
        destPath = process.cwd();
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            // 2. create -> organized_files -> directory
            destPath = path.join(dirPath, "organized_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);

            }
        } else {
            console.log("Kindly enter the correct path");
            return;
        }
    }
    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
    // 3. indentify categories of all files present in that input directory -> 
    let childName = fs.readdirSync(src);
    // console.log(childName);
    for (let i = 0; i < childName.length; i++) {
        let childAd = path.join(src, childName[i]);
        let isFilee = fs.lstatSync(childAd).isFile();
        if (isFilee) {
            console.log(childName[i]);
            // 4. copy / cut files to that organized directory inside of any of category folder
            let category = getCategory(childName[i])
                // console.log(childName[i],"belongs to --> ",category);
            sendFiles(childAd, dest, category);
        }
    }
}

function getCategory(name) {
    let types = {
        media: ["mp4", "mkv"],
        archive: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
        documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
        app: ['exe', 'dng', 'pkg', 'deb']
    }
    let exc = path.extname(name);
    exc = exc.slice(1);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (exc == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";

}

function sendFiles(src, dest, category) {
    //
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(src);
    let destFP = path.join(categoryPath, fileName);
    fs.copyFileSync(src, destFP);
     fs.unlinkSync(src);
    console.log(fileName, "organized to ", category);
}
module.exports = {
    orgK: orgF
}