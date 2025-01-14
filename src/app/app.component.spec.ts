import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template: '<nav>Mock NavBar</nav>',
})
class MockNavBarComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockNavBarComponent],
      imports: [RouterTestingModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the nav bar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-nav-bar')).toBeTruthy();
  });

  it('should include the router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
