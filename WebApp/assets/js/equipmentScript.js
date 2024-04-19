
let web_origin = '';
let base_url = 'http://localhost:5000/api';
const CURRENT_PACKAGE = 'Gold';

if(window.location.protocol === 'file:'){
	web_origin = 'file:///home/saadakhtar/Desktop/msie/LandingSite'
}
else if(window.location.protocol === 'https:'){
	web_origin = 'https://saad-akhtar26.github.io/msie/LandingSite';
}

const packages = [
	{
		name: 'Basic',
		limit: 1
	},
	{
		name: 'Silver',
		limit: 3
	},
	{
		name: 'Gold',
		limit: 7
	},
	{
		name: 'Unlimited',
		limit: 50000
	},
	
];

let equipments;

/*****************************************************************************/
/*******************************	Equipments	******************************/
/*****************************************************************************/
const renderEquipments = () => {
	const tbody_equipments = document.querySelector('#tbody-equipments');
	
	if(tbody_equipments){
		equipments.forEach(equipment => {
			tbody_equipments.innerHTML += `
				<tr>
					<td>
						<a class="text-primary" onClick="clickEditEquipment('${equipment[0]}');" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#modal-edit-equipment">
							<i class="bi bi-pencil-square"></i>
						</a>
					</td>
					<td>${equipment[1]}</td>
					<td>${equipment[2]}</td>
					<td>${equipment[3]}</td>
					<td>${equipment[4]}</td>
					<td>${equipment[5]}</td>
				</tr>`;
		});
	}
}


/******************************************************************************/
/***************************	clickEditEquipment	  *************************/
/******************************************************************************/
const clickEditEquipment = (id) => {
	const equipment_id = document.querySelector('#modal-equipment-id');
	const name = document.querySelector('#modal-equipment-name');
	const form_code = document.querySelector('#modal-equipment-code');
	const type = document.querySelector('#modal-equipment-type');
	const start = document.querySelector('#modal-equipment-start');
	const equip = equipments.find(equip => equip[0] === id);

	equipment_id.value = id;
	name.value = equip[1];
	form_code.value = equip[2];
	type.value = equip[3];
	start.value = equip[4];
}


/******************************************************************************/
/***************************	deleteEquipment		***************************/
/******************************************************************************/
const deleteEquipment = () => {
	const id = document.querySelector('#modal-equipment-id');
	console.log('Delete Equipment ID: ', id.value);
};


/******************************************************************************/
/***************************	updateEquipment 	***************************/
/******************************************************************************/
const updateEquipment = () => {
	const id = document.querySelector('#modal-equipment-id');
	const name = document.querySelector('#modal-equipment-name');
	const form_code = document.querySelector('#modal-equipment-code');
	const type = document.querySelector('#modal-equipment-type');
	const start = document.querySelector('#modal-equipment-start');

	console.log('Update Company id: ', id.value);
	console.log('Update Company name: ', name.value);
	console.log('Update Company code: ', form_code.value);
	console.log('Update Company type: ', type.value);
	console.log('Update Company start: ', start.value);
};


/******************************************************************************/
/***************************	addEquipment 	*******************************/
/******************************************************************************/
const addEquipment = () => {
	const name = document.querySelector('#add-equipment-name');
	const form_code = document.querySelector('#add-equipment-code');
	const type = document.querySelector('#add-equipment-type');
	const start = document.querySelector('#add-equipment-start');

	console.log('Update Company name: ', name.value);
	console.log('Update Company code: ', form_code.value);
	console.log('Update Company type: ', type.value);
	console.log('Update Company start: ', start.value);
};


/******************************************************************************/
/***********************	checkEquipmentLimit 	***************************/
/******************************************************************************/
const checkEquipmentLimit = () => {
	const CURRENT_LIMIT = packages.find(pkg => pkg.name === CURRENT_PACKAGE).limit;
	console.log('current limit: ', CURRENT_LIMIT);

	if (equipments.length === CURRENT_LIMIT){
		alert('You have reached limit of your Package. Contact Admin to increase package !');
		
		const modal = document.querySelector('#modal-add-equipment');
		const backdrop = document.querySelector('.modal-backdrop');
		modal.hidden = true;
		backdrop.hidden = true;
	}
};

/*************************************************************************/
/*******************************	Logout  ******************************/
/*************************************************************************/
const logout = () => {
	setCookie('token', undefined, '-1');
	sessionStorage.clear();
	window.location.assign(web_origin+'/pages-login.html');
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

/*************************************************************************/
/***********************	Loading Company Data  ************************/
/*************************************************************************/
const loadingCompanyDashboard = async () => {
	if(!getCookie('token') || getCookie('token') == ''){
		alert('Login again');
		logout();
	}
	else{
		// Run Fetch call to /me endpoint
		const response = await sendRequest(getCookie('token'));
		const data = await response.json();
		
		if(response.status === 401){
			alert(data.message);
		}
		else{
			const format = data.equipments.map(item => {
				return [
					item._id, 
					item.name, 
					item.item_id, 
					item.type, 
					item.added_on.slice(0, 10), 
					item.next_date.slice(0, 10)
				];
			})
			equipments = format;
			renderEquipments();
			renderData(data);
		}
	}
};

const renderData = (data) => {
	const spanCompanyName = document.querySelector('#header-company-name');
	const mainCompanyName = document.querySelector('#main-company-name');
	const mainIndustry = document.querySelector('#main-industry');
	const mainTotalEquips = document.querySelector('#main-total-equipments');
	const mainPhone = document.querySelector('#main-phone');
	const mainRegNum = document.querySelector('#main-reg-num');
	const mainEmail = document.querySelector('#main-email');
	const mainAddress = document.querySelector('#main-address');

	sessionStorage.setItem('company_name', data.companies[0].company_name);
	sessionStorage.setItem('industry', data.companies[0].industry);
	sessionStorage.setItem('total_equipments', data.companies[0].total_equipments);
	sessionStorage.setItem('phone', data.companies[0].phone);
	sessionStorage.setItem('reg_num', data.companies[0].reg_num);
	sessionStorage.setItem('phone', data.companies[0].phone);
	sessionStorage.setItem('email', data.email);
	sessionStorage.setItem('address', data.companies[0].address);
	sessionStorage.setItem('owner', data.name);
	sessionStorage.setItem('package_name', data.companies[0].package_name);
	sessionStorage.setItem('limit', data.companies[0].limit);

	spanCompanyName.innerHTML = data.companies[0].company_name;
	mainCompanyName.innerHTML = data.companies[0].company_name;
	mainIndustry.innerHTML = data.companies[0].industry;
	mainTotalEquips.innerHTML = data.companies[0].total_equipments;
	mainPhone.innerHTML = data.companies[0].phone;
	mainRegNum.innerHTML = data.companies[0].reg_num;
	mainEmail.innerHTML = data.email;
	mainAddress.innerHTML = data.companies[0].address;
};

const sendRequest = async (token) => {
	const response = await fetch(
		base_url+'/users/me/',
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

loadingCompanyDashboard();
