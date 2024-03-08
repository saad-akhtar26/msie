/*****************************************************************************/
/*******************************	Equipments	******************************/
/*****************************************************************************/
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
					<a class="text-primary" onClick="clickEditEquipment(${equipment[0]});" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#modal-edit-equipment">
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
