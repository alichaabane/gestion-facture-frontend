import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFactureComponent } from './generate-facture.component';

describe('GenerateFactureComponent', () => {
  let component: GenerateFactureComponent;
  let fixture: ComponentFixture<GenerateFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateFactureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
