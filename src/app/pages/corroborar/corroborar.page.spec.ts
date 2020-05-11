import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CorroborarPage } from './corroborar.page';

describe('CorroborarPage', () => {
  let component: CorroborarPage;
  let fixture: ComponentFixture<CorroborarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorroborarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorroborarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
