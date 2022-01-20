//   MY FILE ORGANIZED PROJECT!!!!!



let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };



const fs = require("fs")

const path = require("path")

let inputArr = process.argv.slice(2)

let command = inputArr[0]

switch ( command ){
  case "tree":
  console.log("Tree implemented");
  break;  

  case "organize":
  organizeFn( inputArr[1]);
  break;

  case "help":
  helpfn();
  break;

  default:
  console.log("Please Enter A Valid Command");
  break;
}


function helpfn() {
    console.log(`List of all the Commands-
                      1) Tree Command - node FO.js tree <dirname>
                      2) Organize Command- node FO.js organize <dirname>
                      3) Help Command - node FO.js help`);
}
function organizeFn( dirpath){
let destPath;
if( dirpath == undefined){
    console.log(" Please Enter A Valid Directory Path");
    return;
} else{
    let doesExist = fs.existsSync( dirpath);
   // console.log(" doesExist");

   if( doesExist == true){
       destPath = path.join( dirpath, "organize_files");

       if( fs.existsSync( destPath) == false){
           fs.mkdirSync( destPath);
       } else {
           console.log(" This Folder Already Exists");
       }
   } else {
       console.log(" Please Enter A Valid Path");
    }
}
organizeHelper( dirpath , destPath)

}


function organizeHelper( src , dest){
    let childNames = fs.readdirSync(src)
   //console.log( childNames);

   for( let i = 0;i<childNames.length;i++){
       let childAddress = path.join( src , childNames[i])
       let isFile = fs.lstatSync( childAddress).isFile();
      // console.log(childAddress + " " + isFile)
     if( isFile == true){
         let fileCategory = getCategory( childNames[i]);
         console.log( childNames[i] + " " + fileCategory)

         sendFiles( childAddress, dest , fileCategory)
     }

   }
}
   
function getCategory(name){
    let ext = path.extname(name)
    ext = ext.slice(1)   
    console.log(ext);

    for(let type in types){
        let cTypeArr = types[type]
        console.log(cTypeArr);

        for(let i=0 ; i<cTypeArr.length ;i++){
            if(ext == cTypeArr[i])
            
   
            return type
     }
    }
   
   
   return 'others'
   
    }

    function sendFiles(srcFilePath , dest , fileCategory){
        let catPath = path.join(dest, fileCategory)
      
      
        if(fs.existsSync(catPath)==false){ 
               fs.mkdirSync(catPath)
        }
      
      
        let fileName = path.basename(srcFilePath) 
        let destFilePath = path.join(catPath , fileName) 
      
      
        fs.copyFileSync(srcFilePath , destFilePath) 
      
        fs.unlinkSync(srcFilePath) 
      
      
        console.log(fileName + "is copied to" + fileCategory)

}
