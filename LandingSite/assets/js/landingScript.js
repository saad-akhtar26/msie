
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
		paragraph: 'Empower your tenant clients with our cutting-edge \'Manage Representative Info\' feature! Seamlessly store and access vital information about your company\'s representatives, ensuring efficient communication and streamlined management. Say goodbye to scattered data and hello to organized simplicity. With just a few clicks, maintain a comprehensive database of your representatives, putting you in control like never before. Elevate your industry equipment maintenance experience with ease and precision.',
		img_name: 'team/team-3.jpg'
	},
	{
		id: 'industry',
		heading: 'Specify the Industry <i class="bx bx-tachometer"></i>',
		paragraph: 'Explore our cutting-edge \'Industry Equipment Maintenance System\'! Among our standout features is \'Industry Specification,\' crafted to meet the unique demands of our esteemed clients. This tool enables companies to effortlessly designate their industry type, guaranteeing bespoke solutions perfectly tailored to their needs. Whether it\'s manufacturing, healthcare, or hospitality, our platform empowers firms to customize their maintenance processes seamlessly. Discover the simplicity of personalized industry specification and revolutionize your equipment management today!',
		img_name: 'testimonials-bg.jpg'
	},
	{
		id: 'package',
		heading: 'Manage Packages <i class="bx bx-world"></i>',
		paragraph: 'Elevate your equipment maintenance experience with our innovative offering: Package Management. Crafted for businesses of every scale, our subscription system presents a spectrum of choices - spanning from Basic to Unlimited - each meticulously crafted to cater to your precise requirements. Featuring adaptable selections based on equipment quantity and scheduling, our user-friendly interface enables effortless subscription management, guaranteeing efficiency and cost-efficiency. Discover a seamless maintenance management solution with our Industry Equipment Maintenance System.',
		img_name: 'options.png'
	},
	{
		id: 'equipment',
		heading: 'Manage Equipments <i class="bx bx-slideshow"></i>',
		paragraph: 'Welcome to the heart of efficiency and organization - our \'Manage Equipment\' feature in the Maintenance System for Industry Equipment. Seamlessly oversee your industrial assets with precision and ease. From adding and editing equipment details to scheduling maintenance tasks, empower your team to optimize operations effortlessly. With intuitive controls and comprehensive functionalities, stay ahead of maintenance schedules and enhance productivity like never before. Unlock the power of streamlined equipment management with our user-friendly solution.',
		img_name: 'portfolio/portfolio-5.jpg'
	},
	{
		id: 'schedule',
		heading: 'Set Schedule <i class="bx bx-arch"></i>',
		paragraph: 'Discover the potential of proactive maintenance using our advanced functionality: Set Schedule. Effortlessly plan maintenance routines for your equipment, guaranteeing peak performance and reducing operational disruptions. Revolutionize your maintenance processes with user-friendly scheduling features, empowering you to manage tasks efficiently. Stay proactive, maintain efficiency - all with Set Schedule.',
		img_name: 'portfolio/portfolio-9.jpg'
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

		if(id === 'package'){
			img.style.width = '37%';
			img.style.marginLeft = '28%';
		}
		else{
			img.style.width = '100%';
			img.style.marginLeft = '0%';
		}
	}
}
