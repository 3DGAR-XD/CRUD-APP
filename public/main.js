$("#signup").off()
	.click((e) => {
		e.preventDefault();
		const SignUpName = document.getElementById("name-su");
		const labelName = document.querySelector("#"+ SignUpName.id + "~.label-error");
		const SignUpEmail = document.getElementById("email-su");
		const labelEmail = document.querySelector("#"+ SignUpEmail.id + "~.label-error");
		const SignUpPassword = document.getElementById("password-su");
		const labelPassword = document.querySelector("#"+ SignUpPassword.id + "~.label-error");
		if(!validate(SignUpName, labelName)) return false;
		if(!validate(SignUpEmail, labelEmail)) return false;
		if (!validate(SignUpPassword, labelPassword)) return false;

		const formSignUp = {
			name: SignUpName.value.trim(),
			email: SignUpEmail.value.trim(),
			password: SignUpPassword.value.trim()
		}
		petition("signup.php", formSignUp);
		localStorage.setItem("user", "ok");
	});
$("#signin").off()
	.click((e) => {
		e.preventDefault();
		const SignInEmail = document.getElementById("email-si");
		const labelEmail = document.querySelector("#"+ SignInEmail.id + "~.label-error");
		const SignInPassword = document.getElementById("password-si");
		const labelPassword = document.querySelector("#"+ SignInPassword.id + "~.label-error");
		if (!validate(SignInEmail, labelEmail)) return false;
		if (!validate(SignInPassword, labelPassword)) return false;

		const formSignIn = {
			email: SignInEmail.value.trim(),
			password: SignInPassword.value.trim()
		}
		petition("signin.php", formSignIn);
		localStorage.setItem("user", "ok");
	});
$("#add-film-button").off()
	.click((e) => {
		e.preventDefault();
		const name = document.getElementById("name-add");
		const labelName = document.querySelector("#"+ name.id + "~.label-error");
		const year = document.getElementById("year-add");
		const labelYear = document.querySelector("#"+ year.id + "~.label-error");
		const duration = document.getElementById("duration-add");
		const rating = document.getElementById("rating-add");
		const labelRating = document.querySelector("#"+ rating.id + "~.label-error");
		if (!validate(name, labelName)) return false;
		if (!validate(year, labelYear)) return false;
		if (!validate(duration, labelRating)) return false;
		if (!validate(rating, labelRating)) return false;

		const formAdd = {
			name: name.value.trim(),
			year: year.value.trim(),
			duration: duration.value.trim(),
			rating: rating.value.trim()
		}
		add(formAdd);
	});
$("#edit-film-button").off()
	.click((e) => {
		e.preventDefault();
		const name = document.getElementById("name-edit");
		const labelName = document.querySelector("#"+ name.id + "~.label-error");
		const year = document.getElementById("year-edit");
		const labelYear = document.querySelector("#"+ year.id + "~.label-error");
		const duration = document.getElementById("duration-edit");
		const rating = document.getElementById("rating-edit");
		const labelRating = document.querySelector("#"+ rating.id + "~.label-error");
		if (!validate(name, labelName)) return false;
		if (!validate(year, labelYear)) return false;
		if (!validate(duration, labelRating)) return false;
		if (!validate(rating, labelRating)) return false;

		const formEdit = {
			name: name.value.trim(),
			year: year.value.trim(),
			duration: duration.value.trim(),
			rating: rating.value.trim()
		}
		edit(formEdit, document.querySelector("tr td").innerHTML);
	});

const petition = (url, data) => {
	$.post("http://localhost/CRUD-APP/server/" + url, data,
		(response) => {
			if(response !== "fail"){
				const obj = JSON.parse(response);
				document.getElementById("index").classList.add("d-none");
				document.getElementById("crud").classList.remove("d-none");
				document.body.classList.remove("modal-open");
				document.body.style = "";
				document.querySelector(".modal-backdrop").classList.add("d-none");
				document.querySelector("h3").innerHTML += obj.name;
			}
			else{
				new swal("Error", "You don´t have access to this app", "error");
			}
		}
	);
}
const validate = (field, label) => {
		const valid = field.validity.valid;
		if (valid) {
			field.classList.remove("invalid");
			label.classList.add("d-none");
			return true;
		} else {
			field.classList.add("invalid");
			label.classList.remove("d-none");
			return false;
		}
}
const add = (data) => {
	$.post("http://localhost/CRUD-APP/server/addFilm.php", data,
		(response) => {
			if(response !== "fail"){
				console.log(response);
				const obj = JSON.parse(response);

				const tr = document.createElement("tr");
				tr.dataset.id = obj.id;
				tr.innerHTML = `<td class="id-edit">${obj.id}</td>
								<td class="name-edit">${obj.name}</td>
								<td class="duration-edit">${obj.duration}</td>
								<td class="rating-edit">${obj.rating}</td>
								<td class="year-edit">${obj.year}</td>
								<td>
									<button class="btn btn-primary w-25" data-bs-toggle="modal" data-bs-target="#modaledit">Edit</button>
									<button class="btn btn-danger w-50" onclick="del(${obj.id})">Delete</button>
								</td>`;
				document.querySelector("tbody").appendChild(tr);
				new swal("Success", "Film added", "success");
			}
		}
	);
}
const edit = (data, id) => {
		$.post("http://localhost/CRUD-APP/server/editFilm.php", data,	
			(response) => {
				if(response !== "fail"){
					console.log(response);
					const obj = JSON.parse(response);
					const tr = document.querySelector("tr[data-id='"+ id +"']");
					tr.querySelector(".id-edit").innerHTML = obj.id;
					tr.querySelector(".name-edit").innerHTML = obj.name;
					tr.querySelector(".duration-edit").innerHTML = obj.duration;
					tr.querySelector(".rating-edit").innerHTML = obj.rating;
					tr.querySelector(".year-edit").innerHTML = obj.year;
					new swal("Success", "Film edited", "success");
				}
			}
		)
}
const del = (id) => {
	$.post("http://localhost/CRUD-APP/server/removeFilm.php", {id},
		(response) => {
			if(response !== "fail"){
				const tr = document.querySelector(`tr[data-id="${id}"]`);
				tr.remove();
				new swal("Success", "Film deleted", "success");
			}
		}
	);
}
if (localStorage.getItem("user").length > 0 ) {
	document.getElementById("index").classList.add("d-none");
	document.getElementById("crud").classList.remove("d-none");
	(()=>{
		// traer los datos de la base de datos
		$.get("http://localhost/CRUD-APP/server/getFilms.php",
			(response) => {
				if(response !== "fail"){
					const obj = JSON.parse(response);
					const tr = document.createElement("tr");
					tr.dataset.id = obj.id;
					tr.innerHTML = `<td class="id-edit">${obj.id}</td>
									<td class="name-edit">${obj.name}</td>
									<td class="duration-edit">${obj.duration}</td>
									<td class="rating-edit">${obj.rating}</td>
									<td class="year-edit">${obj.year}</td>
									<td>
										<button class="btn btn-primary w-25" data-bs-toggle="modal" data-bs-target="#modaledit" onclick="edit(${obj.id})">Edit</button>
										<button class="btn btn-danger w-50" onclick="del(${obj.id})">Delete</button>
									</td>`;
					document.querySelector("tbody").appendChild(tr);
				}
			}
		)
	})();
}