import { IMessage } from './../shared/models/message.model';
import { client } from './../dialog-flow-client/dialog-flow.client';
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
  conversation: IMessage[] = [];

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()  
    .scan((acc, val) => acc.concat(val));
  }
  sendMessage() {  
    this.chat.talk(this.strMsg); 
    this.strMsg = '';
  }

  addMessageFromUser(message) {
    this.conversation.push({
      avatar: 'perm_identity',
      from: 'Me',
      content: message.value
    });

    client.textRequest(message.value).then((response) => {
      this.conversation.push({
        avatar: 'android',
        from: 'Bot',
        content: response.result.fulfillment['speech'] || 'I can\'t seem to figure that out!'
      });
      message.value = '';
    });
  }


}
