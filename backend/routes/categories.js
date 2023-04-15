const Category = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();
    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(categoryList);
})

router.get(`/:categoryId`, async (req, res) => {

  const id = req.params.categoryId;
  const category = await Category.findById(id);
  if (!category) {
    res
      .status(500)
      .json({
        success: false,
        message: "category with the given id not found",
      });
  }
  res.status(200).send(category);
});

router.post("/", async (req, res) => {
   
    const newCategory = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color 
    }); 

   const newCat = await newCategory.save()
   if(!newCat)
    return res.status(404).send("the category cannot be created");
   res.status(201).json({
     sucess: true,
     category: newCat
   }); 
});


router.put('/:categoryid', async (req,res, next) => {

  const id = req.params.categoryid;

  const category = await Category.findByIdAndUpdate(id, {
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  }, {new: true});

  if (!category) {
    return res.status(404).json({
      success: true,
      message: "category not found",
    });
  }
  
  res.status(201).json({
    sucess: true,
    category: category,
  }); 

})

router.delete("/:categoryId", (req, res) => {
  const id = req.params.categoryId;
  Category.findByIdAndRemove(id)
    .then(category => {
        if(category) {
             return res.status(200).json({
                 success: true,
                 message: "category is deleted successfully"
             })
        }
        return res.status(404).json({
             success: false,
             message: "category not found"
        })
    })
    .catch(err => {
         return res.status(500).json({
           success: false,
           message: err,
         });
    })
});

module.exports =router;