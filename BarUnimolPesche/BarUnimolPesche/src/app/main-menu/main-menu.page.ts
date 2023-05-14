import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { nU } from '../login/login.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})

export class MainMenuPage implements OnInit {
  // Variabili utilizzate per stabilire il giorno della settimana e per verificare l'esistenza di una prenotazione già associata all'utente
  today;
  weekDay;
  settimana = ['domenica', 'lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato'];
  hours; // this.hours < 11 da aggiungere nelle funzioni dei 3 pulsanti
  esiste = false;

  constructor(private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    this.today = new Date();
    this.weekDay = this.today.getDay();
    this.hours = this.today.getHours();
  }

  ngOnInit() {
  }

  // Controllo presenza menù per il giorno corrente
  ionViewDidEnter() {
    fetch(`http://10.64.195.226:3000/menu/test/${this.settimana[this.weekDay]}`)
      .then(response => response.json())
      .then(data => this.esisteMenu(data))
      .catch(error => console.error(error)
      )
  }

  // Se esiste il menù per il giorno corrente, rende vera la variabile usata per l'accesso alla "schermata prenotazione"
  private esisteMenu(data: any) {
    if (data.length === 0) {
      this.esiste = false;
    } else {
      this.esiste = true;
    }
  }

  // Naviga nella pagina che mostra il menù di tutti i giorni della settimana
  public visualizzaMenuSettimanale(): void {
    this.router.navigate(['/menu-settimanale']);
  }


  // PRENOTA PRANZO

  // Funzione invocata dal pulsante "Prenota Pranzo"; cerca una prenotazione eventualmente già associata all'utente, se esite il menù del giorno
  public async getPrenotazioneUtente() {
    if (this.esiste) {
      await fetch(`http://10.64.195.226:3000/prenotazioni/test3/utente?nome_utente=${nU}`)
        .then(response => response.json())
        .then(data => this.verificaPrenotazione(data))
        .catch(error => console.error(error)
        )
    } else {
      this.presentToastNoMenu('bottom');
    }
  }

  // In caso di prenotazione già associata all'utente, lo segnala, altrimenti naviga nella pagina di prenotazione
  private verificaPrenotazione(data: any) {
    if (data.length === 1) {
      this.presentToast('bottom', data[0]);
    } else {
      this.router.navigate(['/prenota-pranzo-page']);
    }
  }

  async presentToast(position: 'bottom', data: any) {
    const toast = await this.toastController.create({
      message: `Prenotazione già effettuata! ID: ${data.num_pren}`,
      duration: 3000,
      position: position
    });

    await toast.present();
  }

  async presentToastNoMenu(position: 'bottom') {
    const toast = await this.toastController.create({
      message: `Impossibile prenotare: mensa non disponibile o fuori orario! `,
      duration: 3000,
      position: position
    });

    await toast.present();
  }


  // RIMUOVI PRENOTAZIONE

  // Funzione invocata dal bottone "Rimuovi Prenotazione"; cerca la prenotazione eventualmente associata all'utente
  public async rimuoviPrenotazione() {
    await fetch(`http://10.64.195.226:3000/prenotazioni/test3/utente?nome_utente=${nU}`)
      .then(response => response.json())
      .then(data => this.esistePrenotazione(data))
      .catch(error => console.error(error)
      )
  }

  // Se non esiste prenotazione associata all'utente, lo segnala, altrimenti mostra messaggio di conferma
  private esistePrenotazione(data: any) {
    if (data.length === 0) {
      this.presentToast2('bottom');
    } else {
      this.presentAlert();
    }
  }

  private async presentToast2(position: 'bottom') {
    const toast = await this.toastController.create({
      message: `Non è presente alcuna prenotazione!`,
      duration: 3000,
      position: position
    });

    await toast.present();
  }

  // Presenta il messaggio di conferma rimozione della prenotazione
  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Rimuovere la prenotazione?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.delete();
          }
        },
      ],
    });

    await alert.present();
  }

  // Elimina dal database la prenotazione associata al nome utente attualmente loggato
  private async delete() {
    await fetch(`http://10.64.195.226:3000/prenotazioni/test3/rimuoviPrenotazione?nome_utente=${nU}`, {
      method: 'PUT'
    })
      .catch(error => console.error(error))
    await this.presentToast3('bottom');
  }

  private async presentToast3(position: 'bottom') {
    const toast = await this.toastController.create({
      message: `Prenotazione rimossa!`,
      duration: 3000,
      position: position
    });

    await toast.present();
  }


  // MODIFICA PRENOTAZIONE

  // Funzione invocata dal bottone "Modifica Prenotazione"; cerca la prenotazione eventualmente associata all'utente
  public async modificaPrenotazione() {
    await fetch(`http://10.64.195.226:3000/prenotazioni/test3/utente?nome_utente=${nU}`)
      .then(response => response.json())
      .then(data => this.esistePrenotazione2(data))
      .catch(error => console.error(error)
      )
  }

  // Se esiste la prenotazione per l'utente loggato, naviga nella pagina prenotazione per consentire la modifica, altrimenti mostra messaggio di errore
  private esistePrenotazione2(data: any) {
    if (data.length === 0) {
      this.presentToast2('bottom');
    } else {
      this.router.navigate(['/prenota-pranzo-page']);
    }
  }
}

