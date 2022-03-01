import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DeviceExpanded } from 'src/app/interfaces/warehouse';
import { faPen, faTrash, faPlus, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  @Input() Devices: DeviceExpanded[] = [];
  @Output() delete = new EventEmitter<number>();

  faPen = faPen;
  faTrash = faTrash;
  faCircleExclamation = faCircleExclamation;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
