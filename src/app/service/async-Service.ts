import { Service } from "@angular/core";
import { interval } from "rxjs";

@Service()
export class AsyncService {
    testObs = interval(1000)

}
