
let web_origin = '';
let base_url = 'http://localhost:5000/api';
let target = '';

if(window.location.protocol === 'file:'){
	web_origin = "file:///D:\msie/WebApp";
}
else if(window.location.protocol === 'https:'){
	web_origin = 'https://saad-akhtar26.github.io/msie/WebApp';
}

const login = async () => {
	const email = document.querySelector('#yourUsername');
	const password = document.querySelector('#yourPassword');

	const response = await sendRequest(email.value, password.value);
	const data = await response.json();

	if(response.status === 400){
		alert(data.message);
	}
	else{
		if(data.is_admin === true){
			setCookie('token', data.token, 7);
			target = web_origin+'/companies.html';
		}
		else{
			setCookie('token', data.token, 7);
			target = web_origin+'/equipments.html';
		}
		window.location.assign(target);
	}

};

const sendRequest = async (email, password) => {
	const response = await fetch(
		base_url+'/users/login/',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password })
		}
	);

	return response;
}

const setCookie = function (cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

	const expires = 'expires=' + d.toUTCString();
	console.log("cookie: ", document.cookie);
	document.cookie = `${cname}=${cvalue};${expires};path=/`;
	console.log("cookie: ", document.cookie);
};

const getCookie = function (cname) {
	const ca = document.cookie.split(';');

	const token = ca.find((c) => {
		return c.replace(' ', '').split('=')[0] === cname;
	});

	if (!token) {
		return '';
	}

	return token.split('=')[1];
};
