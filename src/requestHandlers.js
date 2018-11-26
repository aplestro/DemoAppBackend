const db = require('./dblow')
const aplestro = require('./aplestro')
const configs = require('./configs')
const { makeid } = require('./utils')

const createNewChannel = async function (req, resp){
	try{
		const channelID = makeid()

		const aplestroResp = await aplestro.createNewChannel({
			url: `${configs.thisURL}/channel/${channelID}`,
			title: req.body.channelName,
			avatar: req.body.channelAvatar,
			privacy:{
				type: req.body.isPrivate ? "PRIVATE" : null,
				allow: [req.body.userID]
			},			
			creatorToken:req.body.userID,
			intentions: req.body.channelIntentions 
				? req.body.channelIntentions.split(" ") 
				: null,
			conversations:[
				{
					id: "SIMPLE_CONVERSATION",
					phrases: ['start test']
				},{
					id: "LIST_OF_CONTENT",
					phrases: ['content']
				}
			]
		})
		
		console.log('aplestro response data:', aplestroResp.data)

		db.get('channels').push({ 
			id: channelID, 
			aplestroID: aplestroResp.data.publicID
		}).write()

		resp.send(aplestroResp.data)
	}catch(e){
		console.log(e)
		resp.send({error:true})
	}
}	

const editChannel = async function (req, resp){
	try{
		const channel = db.get('channels').find({ id: req.body.channelID }).value()

		await aplestro.updateChannel({
			publicID: channel.aplestroID,
			title: req.body.channelName,
			avatar: req.body.channelAvatar,
			privateType: req.body.isPrivate ? "PRIVATE" : "PUBLIC",
			users:[{
				userToken: req.body.userToken,
				title: req.body.channelNameForUser,
				intentions: req.body.userIntentions
					? req.body.userIntentions.split(" ") 
					: null,
			}],
			intentions: req.body.channelIntentions 
				? req.body.channelIntentions.split(" ") 
				: null,
		})

		resp.send()
	}catch(e){
		console.log(e)
		resp.send({error:true})
	}
}	

const MessageType = {
  TEXT: "TEXT",
  OPEN_GRAPH: "OPEN_GRAPH"
}

const createNewMessage = async function (req, resp){
	try{
		const channel = db.get('channels').find({ id: req.body.channelID }).value()
		const sendedMessage = {
			channelID: channel.aplestroID,
    		messageType:req.body.messageType
		}

		switch (req.body.messageType){
			case MessageType.TEXT:
				sendedMessage.text = req.body.text
				break;
			case MessageType.OPEN_GRAPH:
			    sendedMessage.title = req.body.title
				sendedMessage.image = req.body.image
				sendedMessage.url = req.body.url
				break;
		}

		const aplestroResp = await aplestro.createNewMessage(sendedMessage)
		console.log('aplestro response data:', aplestroResp.data)

		resp.send()
	}catch(e){
		console.log(e)
		resp.send({error:true})
	}
}	

const requestUserInfo = async function (req, resp){
	try{
		const aplestroResp = await aplestro.requestUserInfo({
		    "requestid": "any-string-for-your-controll",
		    "userID": req.body.userToken,
		    "permissions":[{
		    	"code": "USER_INFO",
		    	"userText": "the text where the app explain why it need an user info"
		    }]
		})

		console.log('aplestro response data:', aplestroResp.data)
	}catch(e){
		console.log(e)
		resp.send({error:true})
	}
}	 

const requestServerUserInfo = async function (req, resp){
	try{
		const user = db.get('users').find({ userID: req.body.userToken }).value()

		resp.send(user)
	}catch(e){
		console.log(e)
		resp.send({error:true})
	}
}	
 
const createNewResource = async function (req, resp){
	try{
		try{
			const channel = db.get('channels').find({ id: req.body.channelID }).value()
			const aplestroResp = await aplestro.createNewResource({
				channelID: channel.aplestroID,
				code: req.body.code,
				url: req.body.url
	    	});	
			console.log('aplestro response data:', aplestroResp.data)
		}catch(e){
			console.log(e)
		}
	}catch(e){
		console.log(e)
		resp.send({error:true})
	}
}	 

module.exports = {
	requestUserInfo,
	requestServerUserInfo,
	createNewChannel,
	editChannel,
	createNewMessage,
	createNewResource
}