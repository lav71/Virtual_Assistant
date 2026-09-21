import multer from "multer"

const storage = multer.diskStorage({
    destination:(req, flie, cb) => {
        cb(null, "./public")
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uplaod = multer({storage})

export default uplaod;