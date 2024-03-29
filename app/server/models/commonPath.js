var os = require('os');
var fs = require('fs');

var commonPath = '';

var commomFolderName = 'bvbcommon';
var discName = 'BVB-JOURNAL';

switch(os.platform()) {

    case "win32":

        if(fs.existsSync("N:\\" + commomFolderName)) commonPath = "N:\\" + commomFolderName;
        if(fs.existsSync("M:\\" + commomFolderName)) commonPath = "M:\\" + commomFolderName;
        if(fs.existsSync("L:\\" + commomFolderName)) commonPath = "L:\\" + commomFolderName;
        if(fs.existsSync("K:\\" + commomFolderName)) commonPath = "K:\\" + commomFolderName;
    	if(fs.existsSync("J:\\" + commomFolderName)) commonPath = "J:\\" + commomFolderName;
    	if(fs.existsSync("I:\\" + commomFolderName)) commonPath = "I:\\" + commomFolderName;
    	if(fs.existsSync("H:\\" + commomFolderName)) commonPath = "H:\\" + commomFolderName;
    	if(fs.existsSync("G:\\" + commomFolderName)) commonPath = "G:\\" + commomFolderName;
    	if(fs.existsSync("F:\\" + commomFolderName)) commonPath = "F:\\" + commomFolderName;
    	if(fs.existsSync("E:\\" + commomFolderName)) commonPath = "E:\\" + commomFolderName;
    	if(fs.existsSync("D:\\" + commomFolderName)) commonPath = "D:\\" + commomFolderName;
    	if(fs.existsSync("C:\\" + commomFolderName)) commonPath = "C:\\" + commomFolderName;
        break;

    case "linux":

		commonPath = '/media/' + os.userInfo().username + '/' + discName + '/' + commomFolderName;
        break;

    case "darwin":

		commonPath = '/Volumes/' + discName + '/' + commomFolderName;
        break;
}

console.log(commonPath);
module.exports = commonPath;