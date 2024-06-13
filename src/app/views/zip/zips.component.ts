import { Component, OnInit } from '@angular/core';
import { ZipService } from '../../shared/services/zip.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'zips',
  standalone: true,
  templateUrl: './zips.component.html',
  styleUrls: ['./zips.component.css'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class ZipsComponent implements OnInit {
  public zips: any;
  public zip: any;
  public zipForm: FormGroup;
  public isValid: boolean = false;

  constructor(
    private zipService: ZipService,
    private formBuilder: FormBuilder,
  ) {

    this.zipForm = this.formBuilder.group({
      cep: new FormControl(''),
      logradouro: '',
      complemento: 0,
      bairro: '',
      localidade: '',
      uf: '',
      ibge: '',
      gia: '',
      ddd: 0,
      siafi: 0,
    });
  }

  cepMask(e: any) {
    const value = e.target.value;
    this.zipForm.setValue({
      ...this.zipForm.value,
      cep: this.zipService.zipCodeMask(value),
    })
    this.isValid = this.zipService.modelChangeFn(value, 'cep', this.zipForm.value);
  }

  complementMask(e: any) {
    const value = e.target.value;
    this.zipForm.setValue({
      ...this.zipForm.value,
      complemento: this.zipService.zipComplementMask(value),
    })
    this.isValid = this.zipService.modelChangeFn(value, 'complemento', this.zipForm.value);
  }

  modelChange(e: any, modelName: string) {
    this.isValid = this.zipService.modelChangeFn(e, modelName, this.zipForm.value);
  }

  ngOnInit() {
    this.zipService.request();
    setTimeout(() => {
      const zip: any = this.zipService.retrieve();
      this.zip = JSON.parse(zip);
      this.zipForm = this.formBuilder.group({
        ...this.zip,
        cep: this.zipService.zipCodeMask(this.zip.cep),
        complemento: this.zipService.zipComplementMask(this.zip.complemento),
      });
    }, 1000);
  }

  add(zipForm: any) {
    console.log('zipForm ', zipForm);
    this.zipService.add(zipForm);
  }

}
