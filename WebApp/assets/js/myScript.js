const tbody = document.querySelector('#insert-tbody');

const equipments = [
	[1, 'Unity Pugh', 9958, 'Daily', '2005-11-02', '2005-11-02'],
	[2, 'Theodore Duran', 8971, 'Weekly', '1999-07-04', '1999-07-04'],
	[3, 'Kylie Bishop', 3147, 'Fortnightly', '2005-08-09', '2005-08-09'],
	[4, 'Lorem ipsum', 9958, 'Monthly', '2005-11-02', '2005-11-02'],
	[5, 'dolor sit amet', 8971, 'Quarterly', '1999-07-04', '1999-07-04'],
	[6, 'consectetur adipisicing', 3147, 'Bi-Annually', '2005-08-09', '2005-08-09'],
	[7, 'Officiis, reiciendis!', 3147, 'Annually', '2005-08-09', '2005-08-09'],
];


equipments.forEach(equipment => {
	tbody.innerHTML += `
		<tr>
			<td>
				<a class="text-primary" onClick="handleClick(${equipment[0]});" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#modalDialogScrollable">
					${equipment[1]}
				</a>
			</td>
			<td>${equipment[2]}</td>
			<td>${equipment[3]}</td>
			<td>${equipment[4]}</td>
			<td>${equipment[5]}</td>
		</tr>`;
});

const handleClick = (id) => {
	const name = document.querySelector('#modal-name');
	const form_code = document.querySelector('#modal-code');
	const type = document.querySelector('#modal-type');
	const start = document.querySelector('#modal-start');
	equip = equipments.find(equip => equip[0] === id);
	
	name.value = equip[1];
	form_code.value = equip[2];
	type.value = equip[3];
	start.value = equip[4];
}

