const axios = require('axios');
const { APLESTRO_SECRET_ID, APLESTRO_API_URL } = require('./configs')

const getURL = (event) => `${APLESTRO_API_URL}/${event}`;

const createNewChannel = async (params) => (await axios({
	url: getURL('channel/create'),
	method: 'post',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Application-Authorization': APLESTRO_SECRET_ID
	},
	data: params
}));

const updateChannel = async (params) => (await axios({
	url: getURL('channel/update'),
	method: 'post',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Application-Authorization': APLESTRO_SECRET_ID
	},
	data: params
}));

const createNewMessage = async (params) => (await axios({
	url: getURL('message/create'),
	method: 'post',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Application-Authorization': APLESTRO_SECRET_ID
	},
	data: params
}));

const createNewResource = async (params) => (await axios({
	url: getURL('resource/add'),
	method: 'post',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Application-Authorization': APLESTRO_SECRET_ID
	},
	data: params
}));

module.exports = {
	createNewChannel,
	updateChannel,
	createNewMessage,
	createNewResource
}