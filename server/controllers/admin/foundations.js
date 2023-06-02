const Foundation = require("../../models/foundation");
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");
exports.postAddFoundation=(req, res, next) => {
    const { name, website_link, owner_name } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors = errors.errors.map((err) => err.msg);
      return res.status(422).json({error:errors});
    }
    // adding validation if foundation name or website_link already exist then dont add
    Foundation.findOne({
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
          errors.push("Foundation with this name already exist");
        }
        if(matchedResult.website_link === website_link){
          errors.push("Foundation with this website link already exist");
        }
        return res.status(422).json({error:errors});
      }
      // creating the foundation
      Foundation.create({ name:name,website_link:website_link,owner_name:owner_name}).then(result=>{
        return res.status(201).json({ msg: `Foundation created sucessfully` });
      }).catch(error=>{
        return res.status(500).json({ error: `Error in creating Foundation ${error}` });
      });
    }).catch(error=>{
      return res.status(500).json({ error: `Error in creating Foundation ${error}` });
    });
};

exports.getFoundations=(req, res, next) => {
    Foundation.findAll().then(result=>{
      return res.status(200).json({foundations:result});
    }).catch(error=>{
      return res.status(500).json({ error: `Error fetching Foundation ${error}` });
    });
};

exports.getFoundation=(req, res, next) => {
    const { id } = req.body;
    Foundation.findByPk(id).then(result=>{
      if(!result){
        return res.status(404).json({msg:"Foundation does not exist"});
      }
      return res.status(200).json({Foundation:result});
    }).catch(error=>{
      return res.status(500).json({ error: `Error fetching Foundation ${error}` });
    });
};


exports.updateFoundation=(req, res, next) => {
  const { name:updatedName, website_link:updateWebsiteLink, owner_name:updatedOwnerName, id } = req.body;
  // Adding Field Required Validation
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.errors.map((err) => err.msg);
    return res.status(422).json({error:errors});
  }
  let foundationData
  // Getting Data using primary key
  Foundation.findByPk(id).then(foundation=>{
    foundationData = foundation;
    // checking either the foundationName or website_link which is adding by user is already in database or not except current id. if exist then not updating the data 
    Foundation.findOne({
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
      // if the result is exisiting
      if(result){
        let matchedResult = result.dataValues;
        errors = [];
        if (matchedResult.name === updatedName){
          errors.push("Foundation with this name already exist");
        }
        if (matchedResult.website_link === updateWebsiteLink){
          errors.push("Foundation with this webiste link already exist");
        }
        return res.status(422).json({error:errors});
      }

      // if not existing then updating the data
      foundationData.name=updatedName;
      foundationData.website_link=updateWebsiteLink;
      foundationData.owner_name=updatedOwnerName;
      foundationData.save().then(result=>{
      return res.status(200).json({msg:`Foundation updated Successfully`});
      }).catch(error=>{
        return res.status(500).json({error:`error in updating the Foundation data ${error}`});
      })
    }).catch(error=>{
      return res.status(500).json({error:`error in updating the Foundation Data ${error}`});
    })

  }).catch(error=>{
    return res.status(500).json({error:`error in updating the Foundation ${error}`});
  })
};

exports.deleteFoundation=(req, res, next) => {
    const { id } = req.body;
    Foundation.findByPk(id).then(Foundation=>{
      return Foundation.destroy();
    }).then(result=>{
      return res.status(200).json({msg:`Foundation deleted Successfully`});
    }).catch(error=>{
      return res.status(500).json({error:`error in deleting the Foundation ${error}`});
    })
};