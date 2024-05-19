import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  contacts = [
    { name: 'John', messages: [{ content: 'Hello', sentByUser: false }] },
    { name: 'Jane', messages: [{ content: 'Hi there!', sentByUser: false }] }
  ];
  selectedContact: any;
  newMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    // By default, select the first contact
    if (this.contacts.length > 0) {
      this.selectedContact = this.contacts[0];
    }
  }

  selectContact(contact: any) {
    this.selectedContact = contact;
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.selectedContact.messages.push({ content: this.newMessage, sentByUser: true });
      this.newMessage = '';
    }
  }
}
