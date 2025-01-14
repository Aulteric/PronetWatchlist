import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar.component';
import { By } from '@angular/platform-browser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand name with correct routerLink', () => {
    const brandElement = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(brandElement.nativeElement.textContent).toContain('PronetWatchlist');
    expect(brandElement.attributes['routerLink']).toBe('/');
  });

  it('should render navigation links with correct routerLinks', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('.nav-item.nav-link'));
    const links = navLinks.map((link) => ({
      text: link.nativeElement.textContent.trim(),
      routerLink: link.attributes['routerLink'],
    }));

    expect(links).toEqual([
      { text: 'Movies', routerLink: '/movies' },
      { text: 'Tv Shows', routerLink: '/series' },
      { text: 'Favorites', routerLink: '/favorites' },
    ]);
  });
});
