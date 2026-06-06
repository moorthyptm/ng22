import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-forms',
  imports: [FormField, FormRoot, JsonPipe],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export default class Forms {
  formModel = signal<ContactForm>({
    name: '',
    email: '',
    message: '',
  });

  testForm = form(
    this.formModel,

    (p) => {
      required(p.name);
      required(p.email);
      required(p.message);
    },
    {
      submission: {
        action: async (formData) => {
          console.log('Form submitted:', formData().controlValue());
          formData().reset();
        },
      },
    },
  );

  constructor() {}
}
