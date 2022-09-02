var KEY_ACCESS_TOKEN = "accessToken";

function updateAPIToken(token){
	localStorage.setItem(KEY_ACCESS_TOKEN,"Bearer "+ token);
}

function getAPIToken(){
	return 	localStorage.getItem(KEY_ACCESS_TOKEN);
}
