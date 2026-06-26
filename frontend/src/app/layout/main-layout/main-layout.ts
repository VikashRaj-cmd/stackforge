import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Sidebar, MatSidenavModule, CommonModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
}