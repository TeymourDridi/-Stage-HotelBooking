const multer = require('multer');

//configuration for uploading a file (storage location and filename)

const storage = multer.diskStorage({

    destination:function (req,file,cb){

        cb(null,'public/userprofile');
    },
    filename:function(req,file,cb){
        cb(null, req.body.username +req.body.email +file.originalname);
    }
});

//filter to specify which files can be accepted
const fileFilter = (req,file,cb)=>{

    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg')
    {
        cb(null,true)
    }
    else{
        cb(null,false)
    }
};

//function to use to trigger the upload (this architecture allows it's use directly in the url)

const upload = multer({

    storage: storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});

module.exports = upload
