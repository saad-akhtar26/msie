
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
