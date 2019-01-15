const db = require('./dblow')

const testList = [{
	id: 1,
	phrases: ['first'],
	content: {
		title: 'first content',
		image: 'https://placekitten.com/600/300'
	}
},{
	id: 2,
	phrases: ['second'],
	content: {
		title: 'second content',
		image: 'https://placekitten.com/640/360'
	}
}]

module.exports = (req, res) => {
	try{
		console.log ('aplestro push action:',req.body.actionType)
		console.log ('aplestro push data:',req.body.actionData)

		const action = req.body.actionType
		if (action === 'USER_INFO'){
			const params = req.body.actionData
			
			db.get('users').push({ 
				userID: params.userID, 
				username: params.username,
				userimg: params.userimg
			}).write()
		}

		if (action === 'REJECT_PERMISSION'){			
			console.log ('aplestro push params:',req.body.actionData)
		}

		if (action === 'CONVERSATION'){
			const conversationData = req.body.actionData
			const params = JSON.parse(conversationData.params)

			console.log(conversationData.params)

			const query = {}

			if (params.id === "SIMPLE_CONVERSATION") {
				query.id = "RECEIVE_SPEECH"
				query.action = "SPEECH"
			}

			if (params.id === "RECEIVE_SPEECH") {
				query.id = ""
				query.action = "DONE"
			}

			if (params.id === "LIST_OF_CONTENT") {
				query.id = "RECEIVE_LIST"
				query.action = "SELECT"
				query.list = testList
			}

			if (params.id === "RECEIVE_LIST") {
				const item = testList.find((itemList)=>(itemList.id == params.select))

				query.id = ""
				query.action = "INTENTION"
				query.intention = [{
					preview: {
						type: "OPEN_GRAPH",
						title:item.content.title,
						image:item.content.image
					},
					intentions: [{
						code: "SHARE_OPEN_GRAPH",
						data: JSON.stringify({
							url:item.content.image,
							title:item.content.title,
							image:item.content.image
						})
					}]
				}]	
			}

			res.send(JSON.stringify(query))
		}
	}catch(e){
		console.log(e)
	}	
}