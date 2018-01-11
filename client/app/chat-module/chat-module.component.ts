import { Component, OnInit, ViewEncapsulation } from '@angular/core';  
import { ChatService, Message } from '../services/chat.service';  
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/scan';  

@Component({
  selector: 'app-chat-module',
  templateUrl: './chat-module.component.html',
  styleUrls: ['./chat-module.component.css']
})
export class ChatModuleComponent implements OnInit {
  messages: Observable<Message[]>;  
  strMsg: string;  
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()  
    .scan((acc, val) => acc.concat(val)); 
  }
  sendMessage() {  
    this.chat.talk(this.strMsg);  
    this.strMsg = '';  
  }
}
