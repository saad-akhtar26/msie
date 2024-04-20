
let web_origin = '';
let base_url = 'http://localhost:5000/api';
let companies;

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

if(window.location.protocol === 'file:'){
	web_origin = 'file:///home/saadakhtar/Desktop/msie/LandingSite'
}
else if(window.location.protocol === 'https:'){
	web_origin = 'https://saad-akhtar26.github.io/msie/LandingSite';
}

/*************************************************************************/
/***************************	Table Render	**************************/
/*************************************************************************/
const renderCompanies = () => {
	const tbody_companies = document.querySelector('#tbody-companies');

	if(tbody_companies){
		companies.forEach(company => {
			tbody_companies.innerHTML += `
				<tr>
					<td>
						<a class="text-primary" onClick="clickEditCompany('${company[0]}');" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#modal-edit-company">
							<i class="bi bi-pencil-square"></i>
						</a>
					</td>
					<td>${company[1]}</td>
					<td>${company[2]}</td>
					<td>${company[3]}</td>
					<td>${company[5]}</td>
					<td>${company[6]}</td>
					<td>${company[7]}</td>
					<td>${company[8]}</td>
				</tr>`;
		});
	}
}


/*************************************************************************/
/***********************	clickEditCompany	**************************/
/*************************************************************************/
const clickEditCompany = (id) => {
	const company_id = document.querySelector('#modal-company-id');
	const name = document.querySelector('#modal-company-name');
	const owner = document.querySelector('#modal-company-owner');
	const industry = document.querySelector('#modal-company-industry');
	const registration = document.querySelector('#modal-company-registration');
	const equipments = document.querySelector('#modal-company-equipments');
	const package = document.querySelector('#modal-company-package');
	const address = document.querySelector('#modal-company-address');
	const phone = document.querySelector('#modal-company-phone');
	const email = document.querySelector('#modal-company-email');
	
	const company = companies.find(comp => comp[0] === id);

	company_id.value = id;
	name.innerHTML = company[1];
	owner.innerHTML = company[2];
	industry.innerHTML = company[3];
	registration.innerHTML = company[4];
	equipments.innerHTML = company[5];
	package.value = company[6];
	address.innerHTML = company[7];
	phone.innerHTML = company[8];
	email.innerHTML = company[9];
}


/*************************************************************************/
/***************************	deleteCompany  ***************************/
/*************************************************************************/
const deleteCompany = async () => {
	const id = document.querySelector('#modal-company-id');

	const response = await sendDelRequest(getCookie('token'), id.value);
	const data = await response.json();
		
	if(response.status === 401 || response.status === 400){
		alert(data.message);
	}
	else if(response.status === 200){
		alert(data.message);
		location.reload()
	}
};


/*************************************************************************/
/***************************	updateCompany  ***************************/
/*************************************************************************/
const updateCompany = async () => {
	const user_id = document.querySelector('#modal-company-id');
	const package = document.querySelector('#modal-company-package');
	const limit = packages.find(pkg => pkg.name === package.value).limit;

	const response = await sendPkgRequest(getCookie('token'), user_id.value, package.value, limit);
	const data = await response.json();
	
	if(response.status === 400 || response.status === 401){
		alert(data.message);
	}
	else if(response.status === 200){
		alert(data.message);
		window.location.reload();
	}
};

const sendPkgRequest = async (token, user_id, package_name, limit) => {
	const response = await fetch(
		base_url+'/companies/?user_id='+user_id,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token,
			},
			body: JSON.stringify({
				package_name,
				limit
			}),
		}
	);

	return response;
}

/*************************************************************************/
/***************************	addCompany  ******************************/
/*************************************************************************/
const addCompany = async () => {
	const company_name = document.querySelector('#add-company-name');
	const owner_name = document.querySelector('#add-company-owner');
	const industry = document.querySelector('#add-company-industry');
	const reg_num = document.querySelector('#add-company-registration');
	const package = document.querySelector('#add-company-package');
	const address = document.querySelector('#add-company-address');
	const phone = document.querySelector('#add-company-phone');
	const email = document.querySelector('#add-company-email');
	const password = document.querySelector('#add-company-password');
	const limit = packages.find(pkg => pkg.name === package.value).limit;

	const response = await sendCompanyAddRequest(
		getCookie('token'), 
		company_name.value,
		owner_name.value,
		industry.value,
		reg_num.value,
		address.value,
		phone.value,
		email.value,
		password.value,
		package.value,
		limit,
	);
	const data = await response.json();
	
	if(response.status === 400 || response.status === 401){
		alert(data.message);
	}
	else if(response.status === 200 || response.status === 201){
		alert(data.message);
		window.location.reload();
	}
};

const sendCompanyAddRequest = async (token, company_name, owner_name, industry, reg_num, address, phone, email, password, package, limit) => {
	const response = await fetch(
		base_url+'/users/',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token,
			},
			body: JSON.stringify({
				company_name, 
				owner_name, 
				industry, 
				reg_num, 
				address, 
				phone, 
				email, 
				password, 
				package,
				limit
			}),
		}
	);

	return response;
}

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
/***********************	Loading Admin Data  ************************/
/*************************************************************************/
const loadingAdminDashboard = async () => {
	if(!getCookie('token') || getCookie('token') == ''){
		alert('Login again');
		logout();
	}
	else{
		// Run Fetch call to users/ endpoint
		const response = await sendDataRequest(getCookie('token'));
		const data = await response.json();
		
		if(response.status === 401){
			alert(data.message);
		}
		else{
			const format = data.map(item => {
				return [
					item._id, 
					item.companies[0].company_name, 
					item.name, 
					item.companies[0].industry,
					item.companies[0].reg_num,
					item.equipments.length,
					item.companies[0].package_name,
					item.companies[0].address,
					item.companies[0].phone,
					item.email,
				];
			});
			companies = format;
			renderCompanies();
		}
	}
};

const sendDataRequest = async (token) => {
	const response = await fetch(
		base_url+'/users/',
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

const sendDelRequest = async (token, id) => {
	const response = await fetch(
		base_url+'/companies/'+id+'/',
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token,
			},
		}
	);

	return response;
}

loadingAdminDashboard();

