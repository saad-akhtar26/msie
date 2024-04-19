
/*************************************************************************/
/*******************************	Logout  ******************************/
/*************************************************************************/
const logout = () => {
	setCookie('token', undefined, '-1');
	sessionStorage.clear();
	window.location.assign(web_origin+'/pages-login.html');
}

const changePass = () => {
	const oldPass = document.querySelector('#currentPassword');
	const newPass = document.querySelector('#newPassword');
	const confirmPass = document.querySelector('#renewPassword');

	if(newPass.value !== confirmPass.value){
		alert('Passwords do NOT match. Try Again !');
		return;
	}

	if(oldPass.value !== 'P@$$w0rd'){
		alert('Invalid current Password. Try Again !');
		return;
	}

	console.log('oldPass: ', oldPass.value);
	console.log('newPass: ', newPass.value);
	console.log('confirmPass: ', confirmPass.value);
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

/*************************************************************************/
/***********************	Load Company Data 	 *************************/
/*************************************************************************/
const renderData = () => {
	if(!getCookie('token') || getCookie('token') == ''){
		alert('Login again');
		logout();
	}
	else{
		const headerCompanyName = document.querySelector('#header-company-name');
		const mainCompanyName = document.querySelector('#main-company-name');
		const mainIndustry = document.querySelector('#main-industry');
		const mainTotalEquips = document.querySelector('#main-total-equips');
		const mainPhone = document.querySelector('#main-phone');
		const mainRegNum = document.querySelector('#main-reg-num');
		const mainEmail = document.querySelector('#main-email');
		const mainAddress = document.querySelector('#main-address');

		headerCompanyName.innerHTML = sessionStorage.getItem('company_name');
		mainCompanyName.innerHTML = sessionStorage.getItem('company_name');
		mainIndustry.innerHTML = sessionStorage.getItem('industry');
		mainTotalEquips.innerHTML = sessionStorage.getItem('total_equipments');
		mainPhone.innerHTML = sessionStorage.getItem('phone');
		mainRegNum.innerHTML = sessionStorage.getItem('reg_num');
		mainEmail.innerHTML = sessionStorage.getItem('email');
		mainAddress.innerHTML = sessionStorage.getItem('address');
	}
}

renderData();
