import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [],
  imports: [],
  exports: [
    RouterModule, MatToolbarModule, MatIconModule, MatMenuModule, MatSidenavModule, MatDividerModule,
    CommonModule, MatListModule,
  ]
})
export class LayoutModule { }
