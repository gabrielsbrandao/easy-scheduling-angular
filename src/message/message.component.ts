import { Component, OnInit } from '@angular/core';
import { MessageService } from '../app/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MessageComponent implements OnInit {
  message: string = '';
  messageType: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.message$.subscribe(msg => {
      this.message = msg.message;
      this.messageType = msg.type;
    });
  }
}
