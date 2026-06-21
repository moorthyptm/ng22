import { Component, DestroyRef, inject, injectAsync, OnDestroy, onIdle } from "@angular/core";
import { ServiceInstance } from "./service";

@Component({
    selector: 'app-service',
    template: `
        <h2>Service Component</h2>
        <p>Testing new feature</p>

        <button  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" (click)="loadService()">Load async service</button>
    `
})
export default class ServiceComp implements OnDestroy {
    service = inject(ServiceInstance);

    lazyImportService = injectAsync(() => import('./async-Service').then(s => s.AsyncService),

        // { prefetch: onIdle }
    )

    desRef = inject(DestroyRef);
    constructor() {
        const sub = this.service.testObs.subscribe(console.log);
        this.desRef.onDestroy(() => {
            sub.unsubscribe();
        })
    }

    ngOnDestroy(): void {
        console.log("Destroyed");


    }

    async loadService() {
        console.log("Loading service");
        const lazyService = await this.lazyImportService();
        const testSubsc = lazyService.testObs.subscribe(console.log)
        this.desRef.onDestroy(() => {
            console.log("Destroyed lazy service");
            testSubsc.unsubscribe();
        })

    }
}