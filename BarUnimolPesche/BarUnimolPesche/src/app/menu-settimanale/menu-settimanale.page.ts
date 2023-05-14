import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu-settimanale',
  templateUrl: './menu-settimanale.page.html',
  styleUrls: ['./menu-settimanale.page.scss'],
})

export class MenuSettimanalePage implements OnInit {

  constructor(private http: HttpClient,
    public navCtrl: NavController) { }

  ngOnInit() { }

  // Oggetto contenente il menù di tutti i giorni della settimana; questo oggetto verrà passato alla schermata per stampare i singoli menù
  menuGiornaliero = {
    lunedi: {
      primo1: "",
      primo2: "",
      secondo1: "",
      secondo2: "",
      contorno1: "",
      contorno2: "",
    },
    martedi: {
      primo1: "",
      primo2: "",
      secondo1: "",
      secondo2: "",
      contorno1: "",
      contorno2: "",
    },
    mercoledi: {
      primo1: "",
      primo2: "",
      secondo1: "",
      secondo2: "",
      contorno1: "",
      contorno2: "",
    },
    giovedi: {
      primo1: "",
      primo2: "",
      secondo1: "",
      secondo2: "",
      contorno1: "",
      contorno2: "",
    },
    venerdi: {
      primo1: "",
      primo2: "",
      secondo1: "",
      secondo2: "",
      contorno1: "",
      contorno2: "",
    }
  }

  // All'entrata nella pagina, facciamo delle query al database per ottenere il menù per ogni giorno della settimana
  ionViewWillEnter() {
    this.getLunedi();
    this.getMartedi();
    this.getMercoledi();
    this.getGiovedi();
    this.getVenerdi();
  }

  public async getLunedi() {
    await fetch(`http://10.64.195.226:3000/menu/test/lunedi`)
      .then(response => response.json())
      .then(data => this.save(this.menuGiornaliero.lunedi, data))
      .catch(error => console.error(error)
      )
  }

  public async getMartedi() {
    await fetch(`http://10.64.195.226:3000/menu/test/martedi`)
      .then(response => response.json())
      .then(data => this.save(this.menuGiornaliero.martedi, data))
      .catch(error => console.error(error)
      )
  }

  public async getMercoledi() {
    await fetch(`http://10.64.195.226:3000/menu/test/mercoledi`)
      .then(response => response.json())
      .then(data => this.save(this.menuGiornaliero.mercoledi, data))
      .catch(error => console.error(error)
      )
  }

  public async getGiovedi() {
    await fetch(`http://10.64.195.226:3000/menu/test/giovedi`)
      .then(response => response.json())
      .then(data => this.save(this.menuGiornaliero.giovedi, data))
      .catch(error => console.error(error)
      )
  }

  public async getVenerdi() {
    await fetch(`http://10.64.195.226:3000/menu/test/venerdi`)
      .then(response => response.json())
      .then(data => this.save(this.menuGiornaliero.venerdi, data))
      .catch(error => console.error(error)
      )
  }

  // Salva nell'oggetto "menuGiornaliero" il menù relativo ad uno specifico giorno
  private save(giorno: any, data: any) {
    if (data.length !== 0) {
      giorno.primo1 = data[0].primo1;
      giorno.primo2 = data[0].primo2;
      giorno.secondo1 = data[0].secondo1;
      giorno.secondo2 = data[0].secondo2;
      giorno.contorno1 = data[0].contorno1;
      giorno.contorno2 = data[0].contorno2;
    }
  }
}
