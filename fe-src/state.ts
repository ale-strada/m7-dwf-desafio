// const API_BASE_URL = process.env.URL_BASE;

const state = {
	data: {
		ruta: "/",
		userId: "",
		fullName: "",
		email: "",
		token: "",
		currentGeoLoc: { lat: 0, lng: 0 },
		lostPetData: {
			petName: "",
			description: "",
			lat: "",
			lng: "",
			ubication: "",
			pictureURL: "",
			email: "",
		},
		reporte: {
			nombre: "",
			telefono: "",
			descripcion: "",
			email: "",
		},
		currentPetEditId: "",
		petsNear: [],
		myPets: [],
		error: false,
	},

	listeners: [],

	init() {
		const lastStorageState: any = localStorage.getItem("state");
		// console.log(API_BASE_URL);

		const cs = JSON.parse(lastStorageState);
		if (cs) {
			this.setState(cs);
		}
	},

	getState() {
		return this.data;
	},
	petsNear() {
		const cs = state.getState();
		fetch(
			// API_BASE_URL +
			"/pets/cerca-de?lat=" +
				cs.currentGeoLoc.lat +
				"&lng=" +
				cs.currentGeoLoc.lng,
			{
				headers: {
					"content-type": "application/json",
				},
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const petsList: any = [];
				data.map(function (e) {
					const pet = {
						id: e.objectID,
						petName: e.petName,
						description: e.description,
						lat: e._geoloc.lat,
						lng: e._geoloc.lng,
						ubication: e.ubication,
						pictureURL: e.pictureURL,
						email: e.email,
					};
					petsList.push(pet);
				});
				cs.petsNear = petsList;
				state.setState(cs);
			});
	},
	async sendEmail() {
		const cs = this.getState();
		const res = await fetch(
			// API_BASE_URL +
			"/send",
			{
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					to: cs.reporte.email,
					from: "buscador.de.mascotas.app@gmail.com",
					subject: cs.reporte.nombre,
					text:
						cs.reporte.descripcion + " mi telefono es:" + cs.reporte.telefono,
				}),
			}
		);
		const data = await res.json();
	},
	async createPet() {
		const cs = this.getState();
		if (cs.token) {
			const res = await fetch(
				// API_BASE_URL +
				"/pets",
				{
					method: "post",
					headers: {
						"content-type": "application/json",
						Authorization: cs.token,
					},
					body: JSON.stringify({
						petName: cs.lostPetData.petName,
						description: cs.lostPetData.description,
						lat: cs.lostPetData.lat,
						lng: cs.lostPetData.lng,
						ubication: cs.lostPetData.ubication,
						pictureURL: cs.lostPetData.pictureURL,
						email: cs.lostPetData.email,
					}),
				}
			);
			const data = await res.json();
		} else {
			console.error("usuario no registrado");
		}
	},
	async editPet(petData) {
		const cs = this.getState();
		if (cs.token) {
			const res = await fetch(
				// API_BASE_URL +
				"/pets/" + cs.currentPetEditId,
				{
					method: "put",
					headers: {
						"content-type": "application/json",
						Authorization: cs.token,
					},
					body: JSON.stringify({
						petName: petData.petName,
						description: petData.description,
						lat: petData.lat,
						lng: petData.lng,
						ubication: petData.ubication,
						pictureURL: petData.pictureURL,
					}),
				}
			);
			const data = await res.json();
		} else {
			console.error("usuario no registrado");
		}
	},
	async getPetById() {
		const cs = this.getState();
		const res = await fetch(
			// API_BASE_URL +
			"/pets/" + cs.currentPetEditId,
			{
				method: "get",
				headers: {
					"content-type": "application/json",
					Authorization: cs.token,
				},
			}
		);
		const data = await res.json();
		if (data) {
			cs.lostPetData = data;
			state.setState(cs);
		} else {
			console.log("vacio");
		}
	},
	async myPets() {
		const cs = this.getState();
		if (cs.token) {
			const res = await fetch(
				// API_BASE_URL +
				"/pets/me",
				{
					method: "get",
					headers: {
						"content-type": "application/json",
						Authorization: cs.token,
					},
				}
			);
			const data = await res.json();
			if (data) {
				cs.myPets = data;
				this.setState(cs);
			}
		} else {
			console.error("usuario no registrado");
		}
	},
	async deletePet() {
		const cs = this.getState();
		const res = await fetch(
			// API_BASE_URL +
			"/pets/" + cs.currentPetEditId,
			{
				method: "delete",
				headers: {
					"content-type": "application/json",
					Authorization: cs.token,
				},
			}
		);
		const data = await res.json();
		if (data) {
			console.log(data);
		} else {
			console.log("vacio");
		}
	},
	setState(newState) {
		this.data = newState;
		for (const cb of this.listeners) {
			cb();
		}
		localStorage.setItem("state", JSON.stringify(this.getState()));
		console.log("soy el state, he cambiado", this.getState());
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
		console.log(this.getState(), "SUSCRIBE");
	},
	signUp(password, callback?) {
		const cs = this.getState();
		if (cs.email) {
			fetch(
				// API_BASE_URL +
				"/auth",
				{
					method: "post",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						email: cs.email,
						fullName: cs.fullName,
						password: password,
					}),
				}
			)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					cs.userId = data[1].id;
					console.log(data);

					this.setState(cs);
					callback();
				});
		} else {
			console.error("No hay un email en el state");
			callback(true);
		}
	},
	async logIn(password, callback?) {
		const cs = this.getState();

		if (cs.email && password) {
			const res = await fetch(
				//
				"/auth/token",
				{
					method: "post",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						email: cs.email,
						password: password,
					}),
				}
			);
			const data = await res.json();
			if (data === "usuario no registrado") {
				alert("usuario no registrado");
			} else {
				try {
					cs.token = "bearer " + data;
					this.setState(cs);
					callback();
				} catch (error) {
					console.error(error);
				}
			}
		} else {
			console.error("No hay un email en el state o pass incorrecta");
		}
	},
	async me() {
		const cs = this.getState();
		const res = await fetch(
			// API_BASE_URL +
			"/me",
			{
				method: "get",
				headers: {
					"content-type": "application/json",
					Authorization: cs.token,
				},
			}
		);
		const data = await res.json();
		if (data) {
			cs.fullName = data.fullName;
			cs.userId = data.id;
			this.setState(cs);
		}
	},
	async meId() {
		const cs = this.getState();
		const res = await fetch(
			// API_BASE_URL +
			"/me/" + cs.email,
			{
				method: "get",
				headers: {
					"content-type": "application/json",
				},
			}
		);
		const data = await res.json();
		console.log(data, "LALALLA");

		if (data) {
			try {
				cs.userId = data.id;
				cs.fullName = data.fullName;
				cs.token = "sin password";
				state.setState(cs);
			} catch (error) {
				console.log(error);
			}
		}
	},

	async updateUser(password) {
		const cs = this.getState();
		const res = await fetch(
			// API_BASE_URL +
			"/me/update",
			{
				method: "post",
				headers: {
					"content-type": "application/json",
					Authorization: cs.token,
				},
				body: JSON.stringify({
					userId: cs.userId,
					email: cs.email,
					fullName: cs.fullName,
					password: password,
				}),
			}
		);
	},
};
export { state };
