import { Routes } from "@angular/router";
import { ServiceInstance } from "./service";

export default [{
    path: '',
    loadComponent: () => import('./service-comp'),
    providers: [ServiceInstance]
}] satisfies Routes