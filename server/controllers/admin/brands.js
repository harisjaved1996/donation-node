const Brand = require("../../models/brand");
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");

exports.postAddBrand=(req, res, next) => {
    const { name, website_link, owner_name } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors = errors.errors.map((err) => err.msg);
      return res.status(422).json({error:errors});
    }
    // adding validation if Brand name or website_link already exist then dont add
    Brand.findOne({
      where:{
        [Op.or]: [
          { name: name },
          { website_link: website_link }
        ]
      }
    }).then(result=>{ 
      if(result){
        let matchedResult = result.dataValues;
        errors=[];
        if(matchedResult.name === name){
          errors.push("Brand with this name already exist");
        }
        if(matchedResult.website_link === website_link){
          errors.push("Brand with this website link already exist");
        }
        return res.status(422).json({error:errors});
      }
      // creating the Brand
      Brand.create({ name:name,website_link:website_link,owner_name:owner_name}).then(result=>{
        return res.status(201).json({ msg: `Brand created sucessfully` });
      }).catch(error=>{
        return res.status(500).json({ error: `Error in creating Brand ${error}` });
      });
    }).catch(error=>{
      return res.status(500).json({ error: `Error in creating Brand ${error}` });
    });
};

exports.getBrands=(req, res, next) => {
    Brand.findAll().then(result=>{
      return res.status(200).json({brands:result});
    }).catch(error=>{
      return res.status(500).json({ error: `Error fetching brands ${error}` });
    });
};

exports.getBrand=(req, res, next) => {
    const { id } = req.body;
    
    Brand.findByPk(id).then(result=>{
      return res.status(200).json({brand:result});
    }).catch(error=>{
      return res.status(500).json({ error: `Error fetching brand ${error}` });
    });
};


exports.updateBrand=(req, res, next) => {
  const { name:updatedName, website_link:updateWebsiteLink, owner_name:updatedOwnerName, id } = req.body;
  // Adding Field Required Validation
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.errors.map((err) => err.msg);
    return res.status(422).json({error:errors});
  }
  let brandData
  // Getting Data using primary key
  Brand.findByPk(id).then(brand=>{
    brandData = brand;
    // checking either the brandName or website_link which is adding by user is already in database or not except current id. if exist then not updating the data 
    Brand.findOne({
      where:{
        [Op.or]: [
          { name: updatedName },
          { website_link: updateWebsiteLink,}
        ],
        [Op.not]:[
          {
            id:id
          }
        ]
      }
    }).then(result=>{
      console.log("========result========",result);
      // if the result is exisiting
      if(result){
        let matchedResult = result.dataValues;
        console.log("matchedResult",matchedResult);
        errors = [];
        if (matchedResult.name.toLowerCase() === updatedName.toLowerCase()){
          errors.push("Brand with this name already exist");
        }
        if (matchedResult.website_link.toLowerCase() === updateWebsiteLink.toLowerCase()){
          errors.push("Brand with this webiste link already exist");
        }
        return res.status(422).json({error:errors});
      }

      // if not existing then updating the data
      brandData.name=updatedName;
      brandData.website_link=updateWebsiteLink;
      brandData.owner_name=updatedOwnerName;
      brandData.save().then(result=>{
      return res.status(200).json({msg:`Brand updated Successfully`});
      }).catch(error=>{
        return res.status(500).json({error:`error in updating the Brand data ${error}`});
      })
    }).catch(error=>{
      return res.status(500).json({error:`error in updating the Brand Data ${error}`});
    })

  }).catch(error=>{
    return res.status(500).json({error:`error in updating the Brand ${error}`});
  })
};

exports.deleteBrand=(req, res, next) => {
    const { id:brandId } = req.body;
    Brand.findByPk(brandId).then(brand=>{
      return brand.destroy();
    }).then(result=>{
      return res.status(200).json({msg:`Brand deleted Successfully`});
    }).catch(error=>{
      return res.status(500).json({error:`error in deleting the brand ${error}`});
    })
};