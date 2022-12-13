import { Injectable } from '@angular/core';
import * as fs from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatFireService {

  constructor(private fireStore: Firestore) {}

  async createRoom(service: any) {
    return fs.setDoc(fs.doc(this.fireStore, `services/${service._id}`), {
      customer: service.user,
      company: service.company
    });
  }

  async sendMessage(data: any, service) {
    data.createdAt = fs.Timestamp.fromMillis(new Date().getTime());
    const document = fs.collection(this.fireStore, `services/${service}/chat`);
    return fs.addDoc(document, data);
  }

  getMessages(service: string) {
    const query = fs.query(
      fs.collection(this.fireStore, `services/${service}/chat`),
      fs.orderBy('createdAt')
    );
    return fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;
  }

  unReadMessages(type_user: number, service: string) {
    const query = fs.query(
      fs.collection(this.fireStore, `services/${service}/chat`),
      fs.where('view_message', '==', false),
      fs.where('type_user', '==', type_user)
    );
    const data$ = fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;
    return data$.pipe(map((res: any) => res.length));
  }

  readMessages(service: string) {
    const query = fs.query(
      fs.collection(this.fireStore, `services/${service}/chat`),
      fs.where('view_message', '==', false),
      fs.where('type_user', '==', 0)
    );
    const data$ = fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;
    return data$.pipe(
      switchMap(async (res: any) => {
        return this.updateReadMessage(service, res);
      })
    );
  };

  private async updateReadMessage(service: string, res: any) {
    res.forEach(({ id }: any) => {
      const doc: any = fs.doc(this.fireStore,`services/${service}/chat/${id}`);
      fs.updateDoc(doc, { view_message: true });
    });
  }
  // * Aqui comienza Soporte

  async createSoporteRoom(company: any) {
    return fs.setDoc(fs.doc(this.fireStore, `soporte/${company._id}`), company);
  }

  getSoporteRoom(id: string) {
    console.log(id);
    const query = fs.query(
      fs.collection(this.fireStore, `soporte`),
      fs.where('id', '==', id)
    );
    return fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;
  }

  async sendSoporteMessage(data: any, id: string) {
    data.createdAt = fs.Timestamp.fromMillis(new Date().getTime());
    const document = fs.collection(this.fireStore, `soporte/${id}/chat`);
    return fs.addDoc(document, data);
  }

  getSoporteMessages(id: string) {
    const query = fs.query(
      fs.collection(this.fireStore, `soporte/${id}/chat`),
      fs.orderBy('createdAt')
    );
    return fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;
  }

  unReadSoporteMessages(type_user: number, id: string) {
    const query = fs.query(
      fs.collection(this.fireStore, `soporte/${id}/chat`),
      fs.where('view_message', '==', false),
      fs.where('type_user', '==', type_user)
    );
    const data$ = fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;
    return data$.pipe(map((res: any) => res.length));
  }

  readSoporteMessages(id: string) {
    const query = fs.query(
      fs.collection(this.fireStore, `soporte/${id}/chat`),
      fs.where('view_message', '==', false),
      fs.where('type_user', '==', 2)
    );
    const data$ = fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;
    return data$.pipe(
      switchMap(async (res: any) => {
        return this.updateSoporteReadMessage(id, res);
      })
    );
  };

  private async updateSoporteReadMessage(userId: string, res: any) {
    res.forEach(({ id }: any) => {
      const doc: any = fs.doc(this.fireStore,`soporte/${userId}/chat/${id}`);
      fs.updateDoc(doc, { view_message: true });
    });
  }
}
