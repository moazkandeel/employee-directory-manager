import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee-directory-manager';
  notificationMessage = '';

  constructor(
    private notificationService: NotificationService
  ) {

    this.notificationService.message$
      .subscribe(message => {
        this.notificationMessage = message;
      });

  }
}
