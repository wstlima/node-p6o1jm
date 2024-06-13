export interface ZipDto {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  complete: boolean;
}

export class Zip {
  public id: string;
  public cep: string;
  public logradouro: string;
  public complemento: string;
  public bairro: string;
  public localidade: string;
  public uf: string;
  public ibge: string;
  public gia: string;
  public ddd: string;
  public siafi: string;
  public complete: boolean;

  constructor(
    { cep, logradouro, complete, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi }: ZipDto = {
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
    }
  ) {
    this.id = this.uuidv4();
    this.cep = cep;
    this.logradouro = logradouro;
    this.complemento = complemento;
    this.bairro = bairro;
    this.localidade = localidade;
    this.uf = uf;
    this.ibge = ibge;
    this.gia = gia;
    this.ddd = ddd;
    this.siafi = siafi;
    this.complete = complete;
  }

  uuidv4(): string {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c: number) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
  }
}
