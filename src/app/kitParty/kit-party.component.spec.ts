import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitPartyComponent } from './kit-party.component';

describe('KitPartyComponent', () => {
  let component: KitPartyComponent;
  let fixture: ComponentFixture<KitPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
