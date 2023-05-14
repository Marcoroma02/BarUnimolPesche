import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrenotaPranzoPagePage } from './prenota-pranzo-page.page';

describe('PrenotaPranzoPagePage', () => {
  let component: PrenotaPranzoPagePage;
  let fixture: ComponentFixture<PrenotaPranzoPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotaPranzoPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrenotaPranzoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
