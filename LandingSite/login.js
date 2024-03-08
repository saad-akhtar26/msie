
const login = () => {
	const userName = document.querySelector('#yourUsername');
	const password = document.querySelector('#yourPassword');
	let base = '';
	let target = '';

	if(window.location.protocol === 'file:'){
		base = 'file:///home/saadakhtar/Desktop/msie/WebApp/'
	}
	else if(window.location.protocol === 'https:'){
		base = 'https://saad-akhtar26.github.io/msie/WebApp/';
	}

	if(userName.value === 'admin'){
		target = base+'companies.html';
	}
	else{
		target = base+'equipments.html';
	}

	console.log('taget: ', target);
	window.location.assign(target);
};
