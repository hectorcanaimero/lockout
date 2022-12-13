import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, docData, setDoc,
  orderBy, query, collectionData, where, updateDoc, Timestamp, QuerySnapshot, getDocs } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { tap, filter, map, take, switchMap, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { RouterLinkWithHref } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  id = 0;
  company: any;

  constructor(
    private fs: Firestore,
    private store: Store<AppState>,
  ) {
    this.setCompany();
  }

  createMessageId = (user: any) => {
    delete user.access;
    delete user.refresh;
    const soporteRef = doc(this.fs, `soporte/${user.email}`);
    setDoc(soporteRef, user);
    const messageRef = collection(this.fs, `soporte/${user.email}/message`);
    return addDoc(messageRef, {
      type: 'AD', status: 'SENT', name: 'Administrator',
      message: `Hola ${user.fist_name}, me indica en que puedo ayudar`,
      createdAt: Timestamp.fromMillis(new Date().getTime())
    });
  };

  getMessages(id = 'cliente01@gmail.com'): Observable<any[]> {
    return collectionData(
      query(collection(this.fs, `soporte/${id}/message`), orderBy('createdAt')),
      { idField: 'id' }
    ) as Observable<any[]>;
  }

  getChatId = (id: string) => docData(doc(this.fs, `soporte/${id}`), { idField: 'id'}) as Observable<any>;

  sendMessage = (id: string, message: string) => {
    this.id = this.id + 1;
    const data = {
      message, type: 'USER', status: 'SENT',
      createdAt: Timestamp.fromMillis(new Date().getTime())
    };
    const messageRef = collection(this.fs, `soporte/${id}/message`);
    return addDoc(messageRef, data);
  };

  readMessage(id = 'cliente01@gmail.com') {
    return collectionData(
      query(
        collection(this.fs, `soporte/${id}/message`),
        where('status', '==', 'SENT'),
        where('type', '==', 'ADMIN')
      ),
      { idField: 'id' }
    ).pipe(
      tap((res: any) => {
        res.forEach(el => this.changeStatusMessage(id, el.id));
      })
    ) as Observable<any[]>;
  };

  changeStatusMessage(id: string, uid: string) {
    const msgDocRef = doc(this.fs, `soporte/${id}/message/${uid}`);
    return updateDoc(msgDocRef, { status: 'READ' });
  }

  // CHAT
  createRoomUserChat = (company: any) => setDoc(doc(this.fs, `chats/${company.id}`), company);

  statusOffOnLineUser = (companyId: number, status: string) => updateDoc(
    doc(this.fs,`chats/${companyId}`), { status });


  createRoomServiceChat = (service: any, companyId: any) =>
    setDoc(doc(this.fs, `chats/${companyId}/services/${service.code}`), { code: service.code });

  unReadMessageServiceChat = (companyId: number, item: any) => {
    const items = [];
    item.forEach((el:any)=> {
      const data = this.getMessage(companyId, el);
      items.push(data);
    });
    return items;
  };

  getMessage = (company: number, code: any) => {
    collectionData(
      query(
        collection(this.fs, `chats/${company}/services/${code.code}/messages`),
        where('status', '==', 'SENT'), where('type', '==', 'USER')
      )
    ).subscribe((res) => {
      code.message = res || [];
      code.unread = res.length || 0;
    });
    return code;
  }

  readMessageServiceChat = (company: number, code: number) => {
    const doc$ = collectionData(query(
      collection(this.fs, `chats/${company}/services/${code}/messages`),
      where('status', '==', 'SENT'), where('type', '==', 'USER')
    ), { idField: 'id' }) as Observable<any[]>;
      doc$.subscribe(async (res: any) => {
        res.forEach(async (el: any) => {
          await updateDoc(doc(this.fs, `chats/${company}/services/${code}/messages/${el.id}`), { status: 'READ' });
      });
    });
    return of(true);
  };


  sendMessageServiceChat = (serviceCode: string, companyId: any, message: any, input = 'TEXT', name = '') => {
    const data = { message, type: 'LT', status: 'SENT',
      input, name, createdAt: Timestamp.fromMillis(new Date().getTime())};
    return addDoc(collection(this.fs, `chats/${companyId}/services/${serviceCode}/messages`), data);
  };

  getMessagesServiceChat = (companyId: any, serviceCode: any) => collectionData(
    query( collection(this.fs, `chats/${companyId}/services/${serviceCode}/messages`), orderBy('createdAt') ),
    { idField: 'id' } ) as Observable<any[]>;


  // ROOM
  createRoom = (uid: any, company: any) => {
    console.log(company);
    setDoc(doc(this.fs, `rooms/chat/${uid}/${company.id}`), company);
    // updateDoc(doc(this.fs, 'rooms', `rooms/${uid}`, `${company.id}`), company);
  };

  getRoomMessages(uid: string, company: number): Observable<any[]> {
    console.info(uid);
    console.info(company);
    return collectionData(
      query( collection(this.fs, `rooms/chat/${uid}/${company}/messages`), orderBy('createdAt') ),
      { idField: 'id' } ) as Observable<any[]>;
  }

  sendRoomMessage = (uid: string, company: number, message: any, input = 'TEXT', name = '') => {
    const data = {
      message, type: 'LT', status: 'SENT', input, name,
      createdAt: Timestamp.fromMillis(new Date().getTime())
    };
    return addDoc(
      collection(this.fs, `rooms/chat/${uid}/${company}/messages`)
      , data);
  };

  unReadMessage = (uid: number, company: number) => {
    const data$ = collectionData(
      query(
        collection(this.fs, `rooms/chat/${uid}/${54}/messages`),
        where('status', '==', 'SENT'), where('type', '==', 'USER')
      ), { idField: 'id' }) as Observable<any[]>;
    return data$.pipe(map((res: any) => res.length));
  };

  setCompany() {
    this.store.select('company').pipe(
      filter(row => !row.loading),
      map(res => res.company)
    )
      .subscribe((res) => {
        this.company = res
        if(res) {
        }
      });
  }

  getMember = (email: string) => docData(doc(this.fs, `membership/${email}`), { idField: 'id' })
}
