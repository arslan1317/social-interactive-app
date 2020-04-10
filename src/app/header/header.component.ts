import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUserAuthenticated = false;
  private authListener: Subscription;

  constructor(private authSerivce: AuthService) { }

  ngOnInit() {
    this.isUserAuthenticated = this.authSerivce.getIsAuth();
    this.authListener = this.authSerivce
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authSerivce.logout();
  }

  ngOnDestroy(): void {
    this.authListener.unsubscribe();
  }

}
