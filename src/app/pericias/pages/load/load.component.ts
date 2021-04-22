import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { Pericia } from '../../models';
import { PericiasService } from '../../services/pericias.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  public aFormGroup: FormGroup;
  public disableBtn: boolean;
  public key: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private periciasService: PericiasService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.key = environment.keyCaptcha;
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      codeDocument: ['', Validators.required]
    });
    let disableBtn = false;
    this.aFormGroup.valueChanges
      .subscribe((changedObj: any) => {
        this.disableBtn = this.aFormGroup.valid;
      });
  }

  get getControl() { return this.aFormGroup.controls; }

  resolved(captchaResponse: string) { console.log(`Resolved response token: ${captchaResponse}`); }

  onSubmit() {
    //this.router.navigate(["pericias/show"]);
    
    this.spinner.show();
    this.periciasService.getDocument(this.aFormGroup.controls['codeDocument'].value).subscribe((resp: Pericia) => {
      if (resp.archivo) {
        if (this.periciasService.saveDataSession(resp.archivo)) {
          this.spinner.hide();
          this.alertService.success('Código Correcto.');
          this.router.navigate(["pericias/show"]);
        } else {
          this.spinner.hide();
          this.alertService.danger('Navegador Incompatible.');
        }
      } else {
        this.spinner.hide();
        this.alertService.warning('No existe Documento.');
      }
    }, (error: any) => {
      console.log(error);
      this.spinner.hide();
      this.alertService.danger('Error en el Servicio.');
    });
  }
}
