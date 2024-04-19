
let web_origin = '';
let base_url = 'http://localhost:5000/api';
let companies;

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
const deleteCompany = () => {
	const id = document.querySelector('#modal-company-id');
	console.log('Delete Company ID: ', id.value);
};


/*************************************************************************/
/***************************	updateCompany  ***************************/
/*************************************************************************/
const updateCompany = () => {
	const id = document.querySelector('#modal-company-id');
	const package = document.querySelector('#modal-company-package');

	console.log('Update Company id: ', id.value);
	console.log('Update Company package: ', package.value);
};


/*************************************************************************/
/***************************	addCompany  ******************************/
/*************************************************************************/
const addCompany = () => {
	const name = document.querySelector('#add-company-name');
	const owner = document.querySelector('#add-company-owner');
	const industry = document.querySelector('#add-company-industry');
	const registration = document.querySelector('#add-company-registration');
	const package = document.querySelector('#add-company-package');
	const address = document.querySelector('#add-company-address');
	const phone = document.querySelector('#add-company-phone');
	const email = document.querySelector('#add-company-email');

	console.log('name: ', name.value);
	console.log('owner: ', owner.value);
	console.log('industry: ', industry.value);
	console.log('registration: ', registration.value);
	console.log('package: ', package.value);
	console.log('address: ', address.value);
	console.log('phone: ', phone.value);
	console.log('email: ', email.value);
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
/***********************	Loading Admin Data  ************************/
/*************************************************************************/
const loadingAdminDashboard = async () => {
	if(!getCookie('token') || getCookie('token') == ''){
		alert('Login again');
		logout();
	}
	else{
		// Run Fetch call to users/ endpoint
		const response = await sendRequest(getCookie('token'));
		const data = await response.json();
		
		if(response.status === 401){
			alert(data.message);
		}
		else{
			const format = data.map(item => {
				return [
					item.companies[0]._id, 
					item.companies[0].company_name, 
					item.name, 
					item.companies[0].industry,
					item.companies[0].reg_num,
					item.companies[0].total_equipments,
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

const sendRequest = async (token) => {
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

loadingAdminDashboard();

