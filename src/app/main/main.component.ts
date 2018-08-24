import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	constructor(
		private router: Router
	) { }

	ngOnInit() {
		//setTimeout(this.goBack.bind(this), 2000)
	}

	goBack() {
		this.router.navigate(['/login']);
	}


}
