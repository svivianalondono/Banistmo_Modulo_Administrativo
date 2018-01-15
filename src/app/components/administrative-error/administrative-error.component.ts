import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-administrative-error',
  templateUrl: './administrative-error.component.html',
  styleUrls: ['./administrative-error.component.scss']
})
export class AdministrativeErrorComponent implements OnInit {

  @Input() errorMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
