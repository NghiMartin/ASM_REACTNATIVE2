var express = require("express");
const modelUser = require("../models/users");
const upload = require('../config/common/upload');
const bcrypt = require( "bcryptjs" );
const joi = require("joi"); // 导
var router = express.Router(); 

// REGISTER USER
router.post("/register",
upload.single("avatar"),
async (req, res) => {
  try {
    const { file } = req;
    console.log(req);
    const model = new modelUser(req.body);
    if(file) {
      const urlAvatar = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
      model.avatar = urlAvatar;
    };

    const existingUser = await modelUser.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại trong hệ thống" });
    }
    // endcode password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    model.password = encryptedPassword;
    const result = await model.save(); //thêm vào database
    if (result) {
      res.json({
        status: 200,
        message: "Thêm thành công",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "Thêm thất bại",
        data: [],
      });
    }
    // res.send(result)
  } catch (error) {
    console.log("Error:" + error);
  }
});
// get All user
router.get("/list", async (req, res) => {
  const result = await modelUser.find({});
  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
// get User by Id
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelUser.findById(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.json({
        status: 404,
        message: "Không tìm thấy ID",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});
// change Info
router.patch("/edit/:id", async (req, res) => {
  try {
    const result = await modelUser.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
      await result.save();
      res.send(result);
    } else {
      res.json({
        status: 404,
        message: "Không tìm thấy ID",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});
// change password
router.patch("/editpass/:id", async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    console.log(password, newPassword);
    const user = await modelUser.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng với ID đã cho" });
    }

    // So sánh mật khẩu hiện tại với mật khẩu đã lưu trữ trong cơ sở dữ liệu
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không chính xác" });
    }

    // Mật khẩu hiện tại đúng, thực hiện cập nhật mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    const updatedUser = await user.save();

    res.status(200).json({ message: "Cập nhật mật khẩu thành công", user: updatedUser });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).send("Invalid ID format");
    } else {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await modelUser.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({
        status: 200,
        message: "xóa thành công",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "xóa thất bại",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const JWT = require("jsonwebtoken");
const validateDto = require("../middlewares/validation");
const SECRETKEY = "Key_Secretkey";
router.post("/login", async (req, res) => {

  try {
    const { username, password } = req.body;
    const user = await modelUser.findOne({ username : username });
    if (user) {
      if(await bcrypt.compare(password, user.password)){ // decode
        
      const token = JWT.sign({ id: user._id }, SECRETKEY, { expiresIn: "1h" }); // endcode
      const refreshToken = JWT.sign({ id: user._id }, SECRETKEY, {
        expiresIn: "1d",
      });
      //expiresIn thời gian token
      res.json({
        status: 200,
        messenger: "Đăng nhâp thành công",
        data: user,
        token: token,
        refreshToken: refreshToken,
      });
      }
    } else {
      // Nếu thêm không thành công result null, thông báo không thành công
      res.json({
        status: 400,
        messenger: "Lỗi, đăng nhập không thành công",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// get USER DATA
router.post("/verifyToken", async (req, res) => {
    const { token } = req.body;

    try {
      // decode
      const user = JWT.verify(token, SECRETKEY);
      const userId = user.id;

      const data = await modelUser.findOne({_id : userId});
      if(data){
        res.json({
          status: 200,
          messenger: "GetUserdata thành công",
          data: data,
        });
      }
   
    } catch (error) {
    console.log(error); 
    }
    
});

module.exports = router;
