import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(private httpClient: HttpClient, private locationStrategy: LocationStrategy){
        super()
    }

    override handleError(error: any): void {

        var errorEvent = {
            path: this.locationStrategy.path(), //Get the location where the error occured
            message: error.message?? error.toString(),
            handler: 'GlobalErrorHandler',
            user: 'the-id-of-the-current-user',
            time: new Date(),
            stack: error.stack //stack trace
        }


        this.httpClient.post('http://localhost:3002/errors',
            errorEvent).subscribe(() => {})
    }
}