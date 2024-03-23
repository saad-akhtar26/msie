
/*************************************************************************/
/***************************	Table Render	**************************/
/*************************************************************************/
const tbody_companies = document.querySelector('#tbody-companies');

const companies = [
	[1, 'Lorem ipsum', 'dolor sit', 'Automotive', 'IWDW873H8U-23F', 12, 'Unlimited', 'consectetur adipisicing.', '03381735144', 'abc123@gmail.com'],
	[2, 'Tempore impedit', 'natus similique', 'Fireworks', 'NSYE153H8D-93B', 4, 'Gold', 'aperiam quos magni.', '03312968109', 'xyz456@hotmail.com'],
];

if(tbody_companies){
	companies.forEach(company => {
		tbody_companies.innerHTML += `
			<tr>
				<td>
					<a class="text-primary" onClick="clickEditCompany(${company[0]});" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#modal-edit-company">
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
