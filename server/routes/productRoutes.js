var express = require("express");
const modelProduct = require("../models/product");
const upload = require('../config/common/upload');

var router = express.Router(); 

router.post("/add",
upload.array('image', 5),
async (req, res) => {
  try {
    const { files } = req;
    const model = new modelProduct(req.body);

    console.log(req);
    if(files){
      const urlImage = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
      model.image = urlImage;
    }

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
// get list plant
router.get("/list-plant", async (req, res) => {
  const result = await modelProduct.find({productType: "CÂY TRỒNG"});
  try {
    if (result) {
        res.json({
          status: 200,
          message: "Get Plant thành công",
          data: result,
        });
      } else {
        res.json({
          status: 400,
          message: "Get Plantthất bại",
          data: [],
        });
      }
  } catch (error) {
    console.log(error);
  }
});
// get list potplant
router.get("/list-potplant", async (req, res) => {
    const result = await modelProduct.find({productType: "CHẬU CÂY TRỒNG"});
    try {
      if (result) {
          res.json({
            status: 200,
            message: "Get PotPlant thành công",
            data: result,
          });
        } else {
          res.json({
            status: 400,
            message: "Get PotPlant thất bại",
            data: [],
          });
        }
    } catch (error) {
      console.log(error);
    }
  });

// get list caretools
router.get("/list-caretools", async (req, res) => {
    const result = await modelProduct.find({productType: "PHỤ KIỆN CHĂM SÓC"});
    try {
      if (result) {
          res.json({
            status: 200,
            message: "Get CareTool thành công",
            data: result,
          });
        } else {
          res.json({
            status: 400,
            message: "Get CareTool thất bại",
            data: [],
          });
        }
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/search-product',async(req,res)=>{
    try {
        const key = req.query.key;
        console.log(req.query);
        console.log({key});

        const data = await modelProduct.find({name:{'$regex':key,"$options":"i"}}).sort({createdAt:-1});
        if(data.length>0){
            res.json({
                status:200,
                messenger:"Thành công",
                data:data
            })
        }
        else{
            res.json({
                status:400,
                messenger:"Thất bại",
                data:[]
            })
        }
    } catch (error) {
        res.json({
            status:404,
            messenger:"Thất bại",
        })
        console.log(error);

    }
})

module.exports = router;
