const Brand = require("../../models/brand");

exports.postAddBrand=(req, res, next) => {
    const { name, website_link, owner_name } = req.body;
    Brand.create({ name:name,website_link:website_link,owner_name:owner_name}).then(result=>{
      return res.status(201).json({ msg: `brand created sucessfully` });
    }).catch(error=>{
      return res.status(500).json({ error: `Error creating brand ${error}` });
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
  Brand.findByPk(id).then(brand=>{
    brand.name=updatedName;
    brand.website_link=updateWebsiteLink;
    brand.owner_name=updatedOwnerName;
    return brand.save();
  }).then(result=>{
    return res.status(200).json({msg:`Brand updated Successfully`});
  }).catch(error=>{
    return res.status(500).json({error:`error in updating the brand ${error}`});
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