import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
}