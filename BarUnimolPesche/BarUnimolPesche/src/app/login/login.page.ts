import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { AlertController } from '@ionic/angular';
import { IonRouterOutlet, Platform } from '@ionic/angular';

// Variabile globale utilizzata per permettere alle altre schermate di sapere chi sia l'utente attualmente loggato
export var nU: string = ""

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  // Variabili utilizzate per ricevere gli input dagli ion-input
  userName: string = "";
  password: string = "";

  // Variabile utilizzata per la disattivazione del backButton dell'hardware
  private backButtonSubscription: any;

  constructor(private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private routerOutlet: IonRouterOutlet,
    private platform: Platform) { }

  ngOnInit() { }

  ionViewCanLeave(): boolean {
    return false;
  }

  // All'entrata nella pagina disattiviamo il backButton dell'hardware (Android) e lo swipe (iOS)
  ionViewDidEnter() {
    this.routerOutlet.swipeGesture = false;
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(100, () => { });
  }

  // All'uscita dalla pagina ripristiniamo il backButton dell'hardware (Android) e lo swipe (iOS)
  ionViewDidLeave() {
    this.routerOutlet.swipeGesture = true;
    this.backButtonSubscription.unsubscribe();
  }

  // Funzione attivata dal pulsante "accedi" della schermata; fa una richiesta al backend per controllare l'esistenza dell'utente e la correttezza della password
  public async accedi() {
    await fetch(`http://10.64.195.226:3000/users/test2/byname?nome_utente=${this.userName}&password=${this.password}`)
      .then(response => response.json())
      .then(data => this.verify(data))
      .catch(error => console.error(error))
  }

  // Se la query al backend ritorna un utente, lo salviamo nella variabile globale "nU" e navighiamo al menu principale, altrimenti segnala l'errore
  public verify(data: any): void {
    if (data.length === 1) {
      nU = this.userName;
      this.router.navigate(['/main-menu']);
    } else {
      this.presentAlert();
    }
  }

  // Segnala l'inesistenza dell'utente o l'incorrettezza della password inseriti
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Nome utente o password errati!',
      buttons: ['OK'],
    });

    await alert.present();
  }

}

