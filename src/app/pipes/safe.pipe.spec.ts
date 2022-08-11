import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';


describe('SafePipe', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
  });

  let sanitizer: DomSanitizer;
  it('create an instance', () => {
    const domSanitizer = TestBed.inject(DomSanitizer)
    const pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
