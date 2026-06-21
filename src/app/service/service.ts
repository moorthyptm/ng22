import { Injectable, OnDestroy, Service } from "@angular/core";
import { interval } from "rxjs";

@Service()
export class ServiceInstance implements OnDestroy {
    testObs = interval(1000);
    constructor() {
        console.log("Service instance created");
    }
    ngOnDestroy(): void {
        console.log("Service instance destroyed");
    }

}