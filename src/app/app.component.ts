import { Component, VERSION } from '@angular/core';
import { NgTinyUrlService } from 'ng-tiny-url';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title="Link-Shortner-Website"
  model = {
    inputUrl: '',
  };
  isFormSubmitted = false;
  shortUrl = '';
  isTextCopied = false;
  isLoading = false;
  constructor(private tinyUrlService: NgTinyUrlService) {}

  onSubmitUrlForm(urlForm) {
    if (urlForm.valid) {
      this.isLoading = true;
      this.tinyUrlService.shorten(this.model.inputUrl).subscribe(
        (data) => {
          this.shortUrl = data;
          this.isFormSubmitted = true;
          this.isLoading = false;
        },
        (error) => {
          alert('Something Went Wrong. Please check your url and try again');
          this.isLoading = false;
        }
      );
    }
  }

  copyUrl(shortUrlElementRef) {
    let inputElement = document.createElement('input');

    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('value', shortUrlElementRef.innerHTML);

    inputElement.select();
    inputElement.setSelectionRange(0, 999999); // For Mobile Selection
    try {
      navigator.clipboard.writeText(inputElement.value);

      this.isTextCopied = true;

      setTimeout(() => {
        this.isTextCopied = false;
      }, 2000);
    } catch (e) {
      console.log('error while copying..', e.toString());
    }
  }

  reset() {
    this.model.inputUrl = '';
    this.isFormSubmitted = false;
    this.isTextCopied = false;
  }
}
