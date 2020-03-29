import { Injectable } from '@angular/core';


@Injectable()

/*
* Use for constants access globally
*/
export class Constants {

   /*
    * Api Url
    */

   // live api url
   // public static API_URL = 'http://167.99.144.19/api';
   // public static URL = 'http://167.99.144.19:8080/';

   // live dev api url
   // public static API_URL = 'http://167.99.144.19:8081/api';
   // public static URL = 'http://167.99.144.19:8081/';

   // local api url
    public static API_URL = 'http://localhost:4200/api';
    public static URL = 'http://localhost:4200';
}
