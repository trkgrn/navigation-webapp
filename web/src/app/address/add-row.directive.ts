import { Directive, Input, HostListener } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[pAddRow]'
})
export class AddRowDirective {
  @Input() table!: Table;
  @Input() newRow: any;

  @HostListener('click', ['$event'])
  onClick(event: Event) {

    // Insert a new row
    this.table.value.push(this.newRow);

    event.preventDefault();
  }
}
