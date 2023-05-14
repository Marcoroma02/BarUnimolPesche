import { Component, OnInit } from '@angular/core';
import { nU } from '../login/login.page';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-prenota-pranzo-page',
  templateUrl: './prenota-pranzo-page.page.html',
  styleUrls: ['./prenota-pranzo-page.page.scss'],
})

export class PrenotaPranzoPagePage implements OnInit {
  esiste = false;

  today;
  weekDay;  // Returns the week day (0-6)
  settimana = ['domenica', 'lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato'];
  primo: string = "";
  secondo: string = "";
  contorno: string = "";
  fascia: number = 0;
  numPren: number = 0;
  nomeCognome: string = "";


  constructor(private router: Router, private toastController: ToastController) {
    this.today = new Date();
    this.weekDay = this.today.getDay();
  }

  // All'apertura richiediamo al database il menù del giorno corrente
  ngOnInit() {
    this.getMenu();
  }

  // Oggetto che andrà a contenere il menù del giorno corrente
  giorno = {
    primo1: "",
    primo2: "",
    secondo1: "",
    secondo2: "",
    contorno1: "",
    contorno2: "",
  }

  // Oggetto che conterrà la prenotazione da salvare sul database
  prenotazione = {
    numPren: 0,
    nomeUtente: "",
    nomeCognome: "",
    fascia: 0,
    primo: "",
    secondo: "",
    contorno: ""
  }

  // Effettua una query per ottenere il menù del giorno corrente
  private getMenu() {
    fetch(`http://10.64.195.226:3000/menu/test/${this.settimana[this.weekDay]}`)
      .then(response => response.json())
      .then(data => this.save(this.giorno, data[0]))
      .catch(error => console.error(error)
      )
  }

  // Richiede al database nome e cognome associati al nome utente attualmente loggato
  private async getNomeCognome() {
    await fetch(`http://10.64.195.226:3000/users/test2/byname/nomeUtente?nome_utente=${this.prenotazione.nomeUtente}`)
      .then(response => response.json())
      .then(data => this.salvaNomeCognome(data[0]))
      .catch(error => console.error(error)
      )
  }

  // Dopo aver salvato la prenotazione sul database, questa funzione richiede il numero ordinale associato a quella prenotazione
  private async getNumPren() {
    await fetch(`http://10.64.195.226:3000/prenotazioni/test3/numPren?nome_utente=${this.prenotazione.nomeUtente}`)
      .then(response => response.json())
      .then(data => this.salvaNumPren(data[0]))
      .catch(error => console.error(error)
      )
  }

  // Salva nell'oggetto "giorno" i dati ritornati dalla query del menù giornaliero
  private save(giorno: any, data: any) {
    giorno.primo1 = data.primo1;
    giorno.primo2 = data.primo2;
    giorno.secondo1 = data.secondo1;
    giorno.secondo2 = data.secondo2;
    giorno.contorno1 = data.contorno1;
    giorno.contorno2 = data.contorno2;
  }

  private salvaNumPren(data: any) {
    this.numPren = data.num_pren;
  }

  private salvaNomeCognome(data: any) {
    this.nomeCognome = data.nome_cognome;
  }

  // Funzione associata al bottone ”Prenota"; se non c'è già una prenotazione per l'utente, la salva nel database, altrimenti modifica la prenotazione già associata all'utente
  public async prenota() {

    // Salviamo nell'oggetto "prenotazione" tutti i dati necessari, con qualche aggiustamento per consentire il corretto funzionamento delle query in SQL
    this.prenotazione.nomeUtente = nU;
    this.prenotazione.fascia = this.fascia;
    this.prenotazione.primo = this.primo.replace("\'", "\\'");
    this.prenotazione.secondo = this.secondo.replace("\'", "\\'");
    this.prenotazione.contorno = this.contorno.replace("\'", "\\'");

    // Funzione che controlla se c'è già una prenotazione per l'utente loggato
    await this.giaPrenotato();

    // Se l'utente possiede già una prenotazione, la modifichiamo e torniamo al menù principale
    if (this.esiste) {
      await fetch(`http://10.64.195.226:3000/prenotazioni/test3/idPrenotazione?nome_utente=${this.prenotazione.nomeUtente}`)
        .then(response => response.json())
        .then(data => this.salvaNumPren(data[0]))
        .catch(error => console.error(error)
        )

      this.prenotazione.numPren = this.numPren;


      fetch('http://10.64.195.226:3000/prenotazioni/test3/modificaPrenotazione', {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(this.prenotazione)
      })
        .then((response) => response.json())
        .catch((error) => console.error(error))

      this.router.navigate(['/main-menu']);

      this.presentToast2('bottom');

      // Se l'utente non ha prenotazioni associate, salviamo la prenotazione corrente nel database e torniamo al menù principale
    } else {

      await this.getNomeCognome();
      this.prenotazione.nomeCognome = this.nomeCognome.replace("\'", "\\'");


      await fetch('http://10.64.195.226:3000/prenotazioni/test3/', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(this.prenotazione)
      })
        .then((response) => response.json())
        .catch((error) => console.error(error))

      await this.getNumPren();
      this.prenotazione.numPren = this.numPren;

      this.router.navigate(['/main-menu']);

      this.presentToast('bottom');
    }
  }

  async presentToast(position: 'bottom') {
    const toast = await this.toastController.create({
      message: `Prenotazione effettuata con successo! ID: ${this.prenotazione.numPren}`,
      duration: 3000,
      position: position
    });

    await toast.present();
  }

  // Controlla se esiste già una prenotazione per l'utente loggato
  private async giaPrenotato() {
    this.esiste = false;

    await fetch(`http://10.64.195.226:3000/prenotazioni/test3/utente?nome_utente=${this.prenotazione.nomeUtente}`)
      .then(response => response.json())
      .then(data => this.esistePrenotazione(data))
      .catch(error => console.error(error)
      )
  }

  private esistePrenotazione(data: any) {
    if (data.length === 1) {
      this.esiste = true;
    }
  }

  async presentToast2(position: 'bottom') {
    const toast = await this.toastController.create({
      message: `Prenotazione modificata con successo! ID: ${this.prenotazione.numPren}`,
      duration: 3000,
      position: position
    });
    await toast.present();
  }
}
