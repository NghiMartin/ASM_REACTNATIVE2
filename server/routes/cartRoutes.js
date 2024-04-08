var express = require("express");
const modelCart = require("../models/cart");
const modelProduct = require('../models/product');

var router = express.Router(); 

  // INCREASE CART
router.post("/add", async (req, res) => {
    try {
      const { idUser, idProduct, size, price } = req.body;
  
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
      const existingCartItem = await modelCart.findOne({ idUser, idProduct });
  
      if (existingCartItem) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng sản phẩm lên thêm 1
        existingCartItem.quantity += 1;
      const result =  await existingCartItem.save();
        res.json({ status: "200",
        message: "Thêm thành công",
                data: result,
    });
      } else {
        // Nếu sản phẩm không tồn tại, thêm sản phẩm mới vào giỏ hàng với số lượng là 1
        const newCartItem = new modelCart({ idUser, idProduct, size, quantity: 1, price });
        const result =  await newCartItem.save();
        res.json({ status: "200",
        message: "Thêm thành công",
                data: result,
    });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ status: "500", error: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu" });
    }
  });
  // DECREASE CART
  router.post("/delete", async (req, res) => {
    try {
      const { idUser, idProduct } = req.body;

      // Tìm kiếm sản phẩm trong giỏ hàng
      const existingCartItem = await modelCart.findOne({ idUser, idProduct });

      if (existingCartItem) {
        // Nếu số lượng sản phẩm lớn hơn 1, giảm số lượng đi 1
        if (existingCartItem.quantity > 1) {
          existingCartItem.quantity -= 1;
          const result = await existingCartItem.save();
          res.json({ status: "200", message: "Giảm số lượng thành công", data: result });
        } else {
          // Nếu số lượng sản phẩm chỉ còn 1, xoá sản phẩm ra khỏi giỏ hàng
          await modelCart.deleteOne({ idUser, idProduct });
          res.json({ status: "200", message: "Xoá sản phẩm ra khỏi giỏ hàng thành công" });
        }
      } else {
        // Nếu sản phẩm không tồn tại trong giỏ hàng
        res.status(404).json({ status: "404", error: "Không tìm thấy sản phẩm trong giỏ hàng" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ status: "500", error: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu" });
    }
  });

  // GET DATA CART
  router.get("/list", async (req, res) => {
    try {
        // const { idUser}  = req.body;
        const  idUser = req.query.idUser;

        console.log('idUser', idUser);

        // Lấy danh sách cart
        const cartItems = await modelCart.find({ idUser });

        // Duyệt qua từng mục trong danh sách giỏ hàng và kết hợp thông tin sản phẩm vào mỗi mục
        const populatedCartItems = await Promise.all(cartItems.map(async (cartItem) => {
            // Lấy thông tin sản phẩm tương ứng với idProduct của mỗi mục trong giỏ hàng
            const product = await modelProduct.findById(cartItem.idProduct);

            // Tạo một đối tượng mới chứa thông tin của cả mục giỏ hàng và sản phẩm
            return {
                _id: cartItem._id,
                idUser: cartItem.idUser,
                idProduct: cartItem.idProduct,
                quantity: cartItem.quantity,
                price: cartItem.price,
                createdAt: cartItem.createdAt,
                updatedAt: cartItem.updatedAt,
                __v: cartItem.__v,
                product // Thêm thông tin sản phẩm vào đối tượng giỏ hàng
            };
        }));

        // Trả về danh sách giỏ hàng đã được kết hợp với thông tin sản phẩm
        res.json({ status: "200", message: "Lấy dữ liệu giỏ hàng thành công", data: populatedCartItems });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "500", error: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu" });
    }
});

module.exports = router;
