const express = require("express");


const router = express.Router();
const db = require("../model/model");
const Photo = db.photo;

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept, Authorization"
    );
    console.log(req.params)
    next();
});
// router.post(
//     "/upload",
//     fileUploads({tempFileDir: true}),
//     (req, res) => {
//         console.log(req.files.file)
//         if(!req.files.file){
//             res.send({success: false});
//             return;
//         }
//
//         const fileId=uuid()+ ".jpg";
//
//         const filePath = path.join(
//             __dirname,
//             "..",
//             "/static",
//             fileId
//         );
//         req.files.file.mv(filePath);
//
//         const mimetype = req.files.file.mimetype;
//         User.create({
//             fileId: fileId,
//             type: mimetype,
//             filePath: filePath
//
//         })
//             .then(user => {
//
//                 res.status(200).send({
//                     status:200,
//                     fileId: fileId
//
//                 });
//             })
//             .catch(err => {
//                 res.status(500).send({
//                     message: err.message
//                 });
//             });
//
//
//
//
//         res.send({success: true, fileId})
//     }
//
// );

router.get("/:fileId", (req,res) =>{
    const fileId = req.params.fileId;
    console.log(fileId)
    Photo.findOne({
        where: {
            id: fileId
        }
    })
        .then(photo => {

            console.log(photo.dataValues.type, photo.dataValues.photoPath )
            res.setHeader("Content-Type", photo.dataValues.type)
            res.sendFile(photo.dataValues.photoPath);
        })
        .catch(err => {
            message:
                console.log(err.message)
            res.status(500).send({
                message: err.message
            });
        })

})

module.exports = router;
