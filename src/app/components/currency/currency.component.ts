import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule,NgModel } from '@angular/forms';

export interface Query {
  apikey: string;
  base_currency: string;
  timestamp: number;
}

export interface Data {
  TRY: number;
  USD: number;
  GBP: number;
  EUR: number;
}

export interface Currency {
  query: Query;
  data: Data;
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  usd: number = 13.3871;
  eur: number = 15.0692;
  gbp: number = 18.1096;

  tlUsd: number = 0;
  tlEur: number = 0;
  tlGbp: number = 0;

  usdTl: number = this.tlUsd * this.usd;
  eurTl: number = this.tlEur * this.eur;
  gbpTl: number = this.tlGbp * this.gbp;

  getUsdTl(){
    this.usdTl = this.tlUsd / this.usd;
  }

  getTlUsd(){
    this.tlUsd = this.usdTl * this.usd;
  }

  getEurTl(){
    this.eurTl = this.tlEur / this.eur;
  }

  getTlEur(){
    this.tlEur = this.eurTl * this.eur;
  }

  getGbpTl(){
    this.gbpTl = this.tlGbp / this.gbp;
  }

  getTlGbp(){
    this.tlGbp = this.gbpTl * this.gbp;
  }

  currency!: Currency;

  ngOnInit(): void {
      this.getUsd();
      this.getEur();
      this.getGbp();
  }

  constructor(private httpClient: HttpClient) {

  }

  getUsd(){
    this.httpClient.get<any>('https://freecurrencyapi.net/api/v2/latest?apikey=36815c00-528f-11ec-97f4-11dcea6b7ca8&base_currency=USD')
    .subscribe(
      response => {
        this.currency = response;
        this.usd = this.currency.data.TRY;
        console.log(this.currency?.data.TRY);
      }
    )
  }

  getEur(){
    this.httpClient.get<any>('https://freecurrencyapi.net/api/v2/latest?apikey=36815c00-528f-11ec-97f4-11dcea6b7ca8&base_currency=EUR')
    .subscribe(
      response => {
        this.currency = response;
        this.eur = this.currency.data.TRY;
        console.log(this.currency?.data.TRY);
      }
    )
  }

  getGbp(){
    this.httpClient.get<any>('https://freecurrencyapi.net/api/v2/latest?apikey=36815c00-528f-11ec-97f4-11dcea6b7ca8&base_currency=GBP')
    .subscribe(
      response => {
        this.currency = response;
        this.gbp = this.currency.data.TRY;
        console.log(this.currency?.data.TRY);
      }
    )
  }
}
