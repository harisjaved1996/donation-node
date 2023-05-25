const Foundation = require("../../models/foundation");

exports.postAddFoundation=(req, res, next) => {
    const { name, website_link, owner_name } = req.body;
    Foundation.create({ name:name,website_link:website_link,owner_name:owner_name}).then(result=>{
      return res.status(201).json({ msg: `Foundation created sucessfully` });
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
  Foundation.findByPk(id).then(foundation=>{
    foundation.name=updatedName;
    foundation.website_link=updateWebsiteLink;
    foundation.owner_name=updatedOwnerName;
    return foundation.save();
  }).then(result=>{
    return res.status(200).json({msg:`Foundation updated Successfully`});
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