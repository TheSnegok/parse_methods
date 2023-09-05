const axios = require('axios');
const fs = require('fs');

const fileName = 'content.html';
const pathFile = `${__dirname}/${fileName}`;

const regExpTag = /<h1>&nbsp;(.*?)<\/h1>/g;

const getData = async (url) => {
	console.log('Getted data!');
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (e) {
		console.log(e);
	}
};

const downloadHtmlFile = async (url) => {
	const data = await getData(url);
	try {
		fs.writeFileSync(pathFile, data);
		console.log('I download HTML!');
		return true;
	} catch (error) {
		console.error('Error in create file: ' + error);
		return false;
	}
};

const readFile = (path) => {
	try {
		const data = fs.readFileSync(path, 'utf8');
		return data;
	} catch (err) {
		console.error(err);
	}
	console.log('I read file!');
};

const searchTag = (fileName, regExp) => {
	const file = readFile(__dirname + '/' + fileName);
	const match = file.match(regExp);
	return match;
};

const writeFile = (data) => {
	try {
		fs.writeFile(fileName, data, 'utf-8', (err) => (err ? console.log(err) : console.log('Remove file!')));
		return true;
	} catch (error) {
		console.log('Dont write data: ' + error);
		return false;
	}
};

const removeFile = (path) => {
	try {
		fs.unlink(path, (err) => (err ? console.log(err) : console.log('Remove file!')));
		return true;
	} catch (error) {
		console.log('Cannot remove file: ' + error);
		return false;
	}
};

const getMeData = async () => {
	if (!fs.existsSync(pathFile)) await downloadHtmlFile('https://freetp.org/');
	const matchText = searchTag(fileName, regExpTag);
	removeFile(pathFile);
	console.table({ matchText });
};

getMeData();
