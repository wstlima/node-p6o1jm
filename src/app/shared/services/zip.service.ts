import { Zip, ZipDto } from "../models/zip.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipService {
  public zip: ZipDto;

  constructor(private http: HttpClient) {
    this.zip = new Zip({
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
      ibge: '',
      gia: '',
      ddd: '',
      siafi: '',
      complete: false
    })
  }

  public request() {
    return this.http.get(`https://viacep.com.br/ws/30160907/json/`)
      .subscribe(resultado => {
        localStorage.setItem("zip", JSON.stringify(resultado))
        console.log(resultado)
      });
  }

  public zipCodeMask(value: string) {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    return value
  }

  public zipComplementMask(value: string) {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{1})(\d)/, '$1.$2')
    return value
  }

  public validarCEP(cep: string) {
    cep = cep.replace(/\s+|-/g, "");
    if (cep.length !== 8) {
      return false;
    }
    return cep.split("").every((char: any) => !isNaN(char));
  }

  public checkValidate(value: any) {
    const { cep, logradouro, complemento, ddd, bairro, localidade, uf, ibge, gia, siafi } = value;
    let forIsValid = true;

    if (cep.length !== 9) {
      forIsValid = false;
    } else if (logradouro.length === 0 && forIsValid) {
      forIsValid = false;
    } else if (complemento.length === 0 && forIsValid) {
      forIsValid = false;
    } else if (bairro.length === 0 && forIsValid) {
      forIsValid = false;
    } else if (localidade.length === 0 && forIsValid) {
      forIsValid = false;
    } else if (uf.length !== 2 && forIsValid) {
      forIsValid = false;
    } else if (ibge.length === 0 && forIsValid) {
      forIsValid = false;
    } else if (gia.length === 0 && forIsValid) {
      forIsValid = false;
    } else if (ddd.length !== 2 && forIsValid) {
      forIsValid = false;
    } else if (siafi.length === 0 && forIsValid) {
      forIsValid = false;
    }

    return forIsValid;
  }

  public modelChangeFn(e: any, modelName: string, value: any) {
    return this.checkValidate(value)
  }

  public retrieve() {
    let zip = localStorage.getItem("zip")
    if (zip) {
      return zip;
    } else {
      return '{"cep":"","logradouro":"","complemento":"","bairro":"","localidade":"","uf":"","ibge":"","gia":"","ddd":"","siafi":""}'
    }
  }

  _commit(zip: Zip) {
    localStorage.setItem("zip", JSON.stringify(zip));
  }

  add(zip: Zip) {
    this._commit(new Zip(zip));
  }

}
