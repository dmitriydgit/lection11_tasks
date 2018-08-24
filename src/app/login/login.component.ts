import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],

})


export class LoginComponent {
	userForm = new FormGroup({
		userName: new FormControl(
			'',
			[
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(25),
				Validators.pattern("^\s*([0-9a-zA-Z]+)\s*$")
			]
		),
		userSecondName: new FormControl(
			"",
			[
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(25),
				Validators.pattern("^\s*([0-9a-zA-Z]+)\s*$")
			]
		),
		userPhone: new FormControl(
			"",
			[
				Validators.required,
				//Validators.pattern("^\+\d{2}\(\d{3}\)\d{7}$")
			]
		),
		userAdress: new FormControl(
			"",
			[
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(200),
				Validators.pattern("^\s*([0-9a-zA-Z]+)\s*$")
			]
		),
		userEmail: new FormControl(
			'', [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(25),
				Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
			]
		),
	})


	credentials = { username: '', password: '' };
	errorMessage = '';

	constructor(
		//private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
	) { }

	formErrors = {
		"userName": "",
		"userSecondName": "",
		"userPhone": "",
		"userAdress": "",
		"userEmail": "",

	}
	validationMessages = {
		"userName": {
			"required": "Поле не может быть пустым",
			"minlength": "Не соответствует длинна",
			"maxlength": "Не соответствует длинна",
			"pattern": "Неверный формат"
		},
		"userSecondName": {
			"required": "Поле не может быть пустым",
			"minlength": "Не соответствует длинна",
			"maxlength": "Не соответствует длинна",
			"pattern": "Неверный формат"
		},
		"userPhone": {
			"required": "Поле не может быть пустым",
			"pattern": "Неверный формат"
		},
		"userAdress": {
			"required": "Поле не может быть пустым",
			"minlength": "Не соответствует длинна",
			"maxlength": "Не соответствует длинна",
			"pattern": "Неверный формат"
		},
		"userEmail": {
			"required": "Обязательное поле.",
			"pattern": "Неверный формат"

		}
	}

	ngOnInit() {
		//this.buildForm();
		const isLogin = this.authService.isLoggedIn();
		if (isLogin) {
			this.router.navigate(['/main']);
		}
		this.userForm.valueChanges.subscribe(data => this.onValueChange());
	}

	// buildForm() {
	// 	this.userForm = this.fb.group({
	// 		userName: ['', [
	// 			Validators.required,
	// 			Validators.minLength(5),
	// 			Validators.maxLength(25),
	// 			Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")
	// 		]],
	// 		userEmail: ['', [
	// 			Validators.required,
	// 			Validators.minLength(5),
	// 			Validators.maxLength(25),
	// 			Validators.pattern("^(?=.*[A-Z])(?=.*\d).*$")
	// 		]]
	// 	});
	// 	this.userForm.valueChanges.subscribe(data => this.onValueChange());
	// }


	onValueChange() {
		if (!this.userForm) return;

		for (let item in this.formErrors) {
			this.formErrors[item] = "";
			let control = this.userForm.get(item);

			if (control && control.dirty && !control.valid) {
				let message = this.validationMessages[item];
				for (let key in control.errors) {
					this.formErrors[item] += message[key] + " ";
				}
			}
		}
	}

	onSubmit() {
		console.log("submitted");
		console.log(this.userForm.value);
		this.credentials.username = this.userForm.value.userName;
		this.credentials.password = this.userForm.value.userEmail;
		this.login();

	}

	login() {
		this.errorMessage = '';

		this.authService.login(this.credentials.username, this.credentials.password)
			.subscribe(
				() => {
					setTimeout(() => {
						this.router.navigate(['/main']);
					}, 2000);
				},
		);
	}


	makeClear() {
		this.userForm.reset();
	}

}

// export class LoginComponent implements OnInit {
// 	credentials = { username: '', password: '' };
// 	errorMessage = '';

// 	constructor(
// 		private authService: AuthService,
// 		private router: Router,
// 		//private msgService: MessagesService
// 	) {
// 	}

// 	ngOnInit() {
// 		const isLogin = this.authService.isLoggedIn();
// 		if (isLogin) {
// 			this.router.navigate(['/main']);
// 		}
// 	}

// 	login() {
// 		this.errorMessage = '';

// 		this.authService.login(this.credentials.username, this.credentials.password)
// 			.subscribe(
// 				() => {
// 					// this.msgService.setMessage({
// 					//   type: 'success',
// 					//   body: `${this.credentials.username}, Вы успешно вошли в систему. Добро пожаловать!`
// 					// });
// 					setTimeout(() => {
// 						this.router.navigate(['/main']);
// 					}, 2000);
// 				},
// 			// err => {
// 			//   this.errorMessage = err.error.error;
// 			//   this.msgService.setMessage({
// 			//     type: 'danger',
// 			//     body: err.error.error
// 			//   });
// 			// }
// 		);
// 	}

// 	goToRegistration() {
// 		this.router.navigate(['registration']);
// 	}

// }
