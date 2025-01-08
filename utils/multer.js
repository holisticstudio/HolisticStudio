const { application } = require('express');
const multer  = require('multer');

const getPDF = ()=> {
const storage = multer.memoryStorage()
const fileFilter = (request, file, cb) => {
    if (file.mimetype === 'application/pdf' ){
        //respuesta 
        cb (null, true)
} else {
    request.fileValidationError = 'El archivo no es un pdf'
    cb (null, false, request.fileValidationError);
} 
}
const upload = multer({
    storage,
    fileFilter
})
return upload;

};

const uploadPDF = getPDF ()

module.exports = {uploadPDF};


