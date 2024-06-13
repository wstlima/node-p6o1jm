import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZipService } from './shared/services/zip.service';
import { ZipsComponent } from './views/zip/zips.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, ZipsComponent, HttpClientModule],
  providers: [ZipService],
})
export class AppModule { }
