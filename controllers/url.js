const shortid = require('shortid');
const URL = require('../models/url');

async function GenerateShortURL(request, response){
    const body = request.body;
    if(!body.url){
        response.status(400).json({msg : "Please enter the url"});
    }
    const shortID = shortid();
    await URL.create({
        shortId:shortID,
        redirectURL: body.url,
        visithistory: [],
        createdBy: request.user._id,
    })
    return response.render("home",{
        id:shortID
    })

}

async function GetAnalytics(request, response){
 const shortId = request.params.shortId;
 const result = await URL.findOne({
    shortId,
  })
  response.json({ totalClicks : result.visithistory.length, analytics: result.visithistory});
}



module.exports = {
    GenerateShortURL,
    GetAnalytics
}