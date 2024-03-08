/*******************************************************************************************************************************/
/*******************************************************	Equipments	********************************************************/
/*******************************************************************************************************************************/
const tbody_equipments = document.querySelector('#tbody-equipments');

const equipments = [
	[1, 'Unity Pugh', 9958, 'Daily', '2005-11-02', '2005-11-02'],
	[2, 'Theodore Duran', 8971, 'Weekly', '1999-07-04', '1999-07-04'],
	[3, 'Kylie Bishop', 3147, 'Fortnightly', '2005-08-09', '2005-08-09'],
	[4, 'Lorem ipsum', 9958, 'Monthly', '2005-11-02', '2005-11-02'],
	[5, 'dolor sit amet', 8971, 'Quarterly', '1999-07-04', '1999-07-04'],
	[6, 'consectetur adipisicing', 3147, 'Bi-Annually', '2005-08-09', '2005-08-09'],
	[7, 'Officiis, reiciendis!', 3147, 'Annually', '2005-08-09', '2005-08-09'],
];

if(tbody_equipments){
	equipments.forEach(equipment => {
		tbody_equipments.innerHTML += `
			<tr>
				<td>
					<a class="text-primary" onClick="handleClick('equipment', ${equipment[0]});" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#modal-equipment">
						${equipment[1]}
					</a>
				</td>
				<td>${equipment[2]}</td>
				<td>${equipment[3]}</td>
				<td>${equipment[4]}</td>
				<td>${equipment[5]}</td>
			</tr>`;
	});
}

const populateEquipmentModal = (id) => {
	const name = document.querySelector('#modal-equipment-name');
	const form_code = document.querySelector('#modal-equipment-code');
	const type = document.querySelector('#modal-equipment-type');
	const start = document.querySelector('#modal-equipment-start');
	const equip = equipments.find(equip => equip[0] === id);

	name.value = equip[1];
	form_code.value = equip[2];
	type.value = equip[3];
	start.value = equip[4];
};


/*******************************************************************************************************************************/
/*******************************************************	Companies	********************************************************/
/*******************************************************************************************************************************/
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
					<a class="text-primary" onClick="handleClick('company', ${company[0]});" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#modal-company">
						${company[1]}
					</a>
				</td>
				<td>${company[2]}</td>
				<td>${company[3]}</td>
				<td>${company[4]}</td>
				<td>${company[5]}</td>
				<td>${company[6]}</td>
				<td>${company[7]}</td>
				<td>${company[8]}</td>
				<td>${company[9]}</td>
			</tr>`;
	});
}

const populateCompanyModal = (id) => {
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

	name.innerHTML = company[1];
	owner.innerHTML = company[2];
	industry.innerHTML = company[3];
	registration.innerHTML = company[4];
	equipments.innerHTML = company[5];
	package.value = company[6];
	address.innerHTML = company[7];
	phone.innerHTML = company[8];
	email.innerHTML = company[9];
};

/*******************************************************************************************************************************/
/*******************************************************	handleClick	  ********************************************************/
/*******************************************************************************************************************************/

const handleClick = (entity, id) => {
	if(entity === 'equipment'){
		populateEquipmentModal(id);
	}
	else if(entity === 'company'){
		populateCompanyModal(id);
	}
}
