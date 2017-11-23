import axios from 'axios'

var stored = localStorage.getItem('login');
var token = null
if(stored != token){
	token = JSON.parse(stored).login.token;
	localStorage.removeItem('login')
}

export const instance = axios.create({
baseURL: 'http://localhost/',
headers: {'Authorization': 'auth ' + token}		
});