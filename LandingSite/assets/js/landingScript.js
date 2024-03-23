
/*****************************************************************************/
/*******************************	Services	******************************/
/*****************************************************************************/
const services = [
	{
		id: 'company',
		heading: 'Manage Company Info <i class="bx bxl-dribbble"></i>',
		paragraph: 'Simplify the management of your company\'s essential data through our advanced capability: Company Info Management. Smoothly edit and categorize critical details including contact info, company profile, and operational data. Keep your industrial equipment management hassle-free, promoting smooth communication and efficient operations. Embrace the ease of streamlined administration with our Industry Equipment Maintenance System.',
		img_name: 'hero-bg.jpg'
	},
	{
		id: 'representative',
		heading: 'Manage Representative Info <i class="bx bx-file"></i>',
		paragraph: 'Simplify the management of your company\'s essential data through our advanced capability: Company Info Management. Smoothly edit and categorize critical details including contact info, company profile, and operational data. Keep your industrial equipment management hassle-free, promoting smooth communication and efficient operations. Embrace the ease of streamlined administration with our Industry Equipment Maintenance System.',
		img_name: 'hero-bg.jpg'
	},
	{
		id: 'industry',
		heading: 'Specify the Industry <i class="bx bx-tachometer"></i>',
		paragraph: 'Simplify the management of your company\'s essential data through our advanced capability: Company Info Management. Smoothly edit and categorize critical details including contact info, company profile, and operational data. Keep your industrial equipment management hassle-free, promoting smooth communication and efficient operations. Embrace the ease of streamlined administration with our Industry Equipment Maintenance System.',
		img_name: 'hero-bg.jpg'
	},
	{
		id: 'package',
		heading: 'Manage Packages <i class="bx bx-world"></i>',
		paragraph: 'Simplify the management of your company\'s essential data through our advanced capability: Company Info Management. Smoothly edit and categorize critical details including contact info, company profile, and operational data. Keep your industrial equipment management hassle-free, promoting smooth communication and efficient operations. Embrace the ease of streamlined administration with our Industry Equipment Maintenance System.',
		img_name: 'hero-bg.jpg'
	},
	{
		id: 'equipment',
		heading: 'Manage Equipments <i class="bx bx-slideshow"></i>',
		paragraph: 'Simplify the management of your company\'s essential data through our advanced capability: Company Info Management. Smoothly edit and categorize critical details including contact info, company profile, and operational data. Keep your industrial equipment management hassle-free, promoting smooth communication and efficient operations. Embrace the ease of streamlined administration with our Industry Equipment Maintenance System.',
		img_name: 'hero-bg.jpg'
	},
	{
		id: 'shedule',
		heading: 'Set Shedule <i class="bx bx-arch"></i>',
		paragraph: 'Simplify the management of your company\'s essential data through our advanced capability: Company Info Management. Smoothly edit and categorize critical details including contact info, company profile, and operational data. Keep your industrial equipment management hassle-free, promoting smooth communication and efficient operations. Embrace the ease of streamlined administration with our Industry Equipment Maintenance System.',
		img_name: 'hero-bg.jpg'
	},
	
];

/******************************************************************************/
/*******************************	openModal	  *****************************/
/******************************************************************************/
const openModal = (id) => {
	const heading = document.querySelector('#modal-landing-heading');
	const paragraph = document.querySelector('#modal-landing-paragraph');
	const img = document.querySelector('#modal-landing-img');
	const service = services.find(serv => serv.id === id);

	if(service){
		heading.innerHTML = service.heading;
		paragraph.innerHTML = service.paragraph;
		img.src = 'assets/img/' + service.img_name;
	}
}
