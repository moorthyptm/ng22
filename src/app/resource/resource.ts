import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  debounced,
  effect,
  inject,
  resource,
  signal,
} from '@angular/core';
import { debounce, form, required, FormField } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-resource',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<div class="container">
    <h1>Resource</h1>

    <div class="flex flex-row">
      <input
        type="text"
        [formField]="formTest.query"
        placeholder="Type to search..."
        [class.border-red-500]="formTest.query().value() && posts.value()?.length === 0"
        class="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <!-- <input
        type="text"
        [value]="query()"
        (input)="query.set($event.target.value)"
        placeholder="Type to search..."
        class="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> -->
    </div>
    <!-- results -->
    <div class="w-full mt-4">
      <!-- skeleton -->

      @if (posts.isLoading()) {
        <div class="animate-pulse">
          <div class="h-4 bg-gray-300 rounded w-1/4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
        </div>
      } @else if (posts.error()) {
        <div class="text-red-500">Error: {{ posts.error()?.message }}</div>
      } @else {
        <div>
          <ul>
            @for (post of posts.value(); track post.id) {
              <li class="p-2 bg-green-100 mb-2 rounded-md">
                {{ post.title }}
              </li>
            } @empty {
              <div class="p-2">No results found</div>
            }
          </ul>
        </div>
      }
    </div>
  </div> `,
  imports: [FormField],
})
export default class Resource {
  // protected query = signal('');
  // private debounceQurey = debounced(this.query, 1000);

  model = signal({
    query: '',
  });

  formTest = form(this.model, (schema) => {
    required(schema.query);
    debounce(schema.query, 1000);
  });

  // private http = inject(HttpClient);

  // posts = resource<Post[], string>({
  //   params: () => this.model().query || '',
  //   loader: ({ params }) =>
  //     firstValueFrom(
  //       this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?q=${params}`),
  //     ),
  // });

  posts = httpResource<Post[]>(
    () => `https://jsonplaceholder.typicode.com/posts?q=${this.model().query}`,
  );

  constructor() {
    effect(() => {
      // console.log('Query changed:', this.query());
    });
  }
}
