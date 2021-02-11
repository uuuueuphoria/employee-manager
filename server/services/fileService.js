/* 
       Read and Write File Utility
*/

const fs = require('fs')
const path = require('path')


const getFileContents = (filePath)=>{
   let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)))
   return fileContents
     
}

const writeFileContents = (filePath, data) =>{
    let fileContents = getFileContents(filePath)
    fileContents.push(data)
    fileContents = JSON.stringify(fileContents)
    fs.writeFileSync(path.join(__dirname, filePath), fileContents)
}


 