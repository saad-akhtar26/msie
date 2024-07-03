
let base_url = 'http://localhost:5000/api';
let web_origin = '';

if(window.location.protocol === 'file:'){
	web_origin = 'file:///home/saadakhtar/Documents/msie/LandingSite';
}
else if(window.location.protocol === 'https:'){
	web_origin = 'https://saad-akhtar26.github.io/msie/LandingSite';
}

/*************************************************************************/
/*******************************	Logout  ******************************/
/*************************************************************************/
const logout = () => {
	setCookie('token', undefined, '-1');
	sessionStorage.clear();
	window.location.assign(web_origin+'/pages-login.html');
}

const changePass = async () => {
	const oldPass = document.querySelector('#currentPassword');
	const newPass = document.querySelector('#newPassword');
	const confirmPass = document.querySelector('#renewPassword');

	if(newPass.value !== confirmPass.value){
		alert('Passwords do NOT match. Try Again !');
	}
	else{
		// Run Fetch call to /me endpoint
		const response = await sendRequest(getCookie('token'), oldPass.value, newPass.value);
		const data = await response.json();
		
		if(response.status === 400){
			alert(data.message);
		}
		else if(response.status === 200){
			window.location.reload();
		}
	}

	oldPass.value = '';
	newPass.value = '';
	confirmPass.value = '';
};

const sendRequest = async (token, oldPass, newPass) => {
	const response = await fetch(
		base_url+'/users/changepass/',
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token,
			},
			body: JSON.stringify({
				oldPass,
				newPass
			})
		}
	);

	return response;
}

const setCookie = function (cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

	const expires = 'expires=' + d.toUTCString();
	document.cookie = `${cname}=${cvalue};${expires};path=/`;
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

const requestGetNotifications = async (token) => {
	const response = await fetch(
		base_url+'/notifications',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token,
			},
		}
	);

	return response;
}

const renderNotifications = async () => {
	const notifCountOut = document.querySelector('#equips-notif-count-out');
	const equipsNotifsList = document.querySelector('#equips-notifs-list');
	
	const response = await requestGetNotifications(getCookie('token'));
	const data = await response.json();

	notifCountOut.innerHTML = data.length;

	data.forEach(notif => equipsNotifsList.innerHTML += 
		`<li><hr class="dropdown-divider"></li>
		<li class="notification-item">
			<div>
				<h4>${notif.text}</h4>
			</div>
		</li>`
	);

	equipsNotifsList.innerHTML +=`
		<li>
			<hr class="dropdown-divider">
		</li>`;
		/* `<li class="dropdown-footer">
			<a href="#">Show all notifications</a>
		</li>`; */

}

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

		renderNotifications();
	}
}

renderData();
