import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { PericiasService } from '../../services/pericias.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-viewpdf',
  templateUrl: './viewpdf.component.html',
  styleUrls: ['./viewpdf.component.css']
})
export class ViewpdfComponent implements OnInit {

  public pdfFile;
  public nameFile: string;
  public bytesFile;
  public isLoading: boolean;

  constructor(
    private router: Router,
    private periciaService: PericiasService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.isLoading = true;
    this.loadData();
    //this.pdfFile = '/assets/test.pdf';
    this.isLoading = false;
    this.spinner.hide();
  }

  returnPage(): void {
    this.periciaService.deleteDataSession();
    this.router.navigate(["pericias/load"]);
  }

  loadData(): void {
    let data = this.periciaService.getDateSession();
    let binary_string = window.atob(data.encodeBase64);
    let len = binary_string.length;
    this.bytesFile = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      this.bytesFile[i] = binary_string.charCodeAt(i);
    }
    this.pdfFile = this.bytesFile.buffer;
    this.nameFile = data.nombre;
  }

  downloadFile(): void {
    let blob = new Blob([this.bytesFile.buffer], { type: "application/pdf" });
    saveAs(blob, this.nameFile);
  }

  testPDF() {
    this.pdfFile = '/assets/test.pdf';
  }
}
