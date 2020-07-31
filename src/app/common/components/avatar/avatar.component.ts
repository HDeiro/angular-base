import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnChanges {

  @Input() name: string;

  public parsedName: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name) {
      this.parsedName = changes.name.currentValue
        .split(' ')
        .slice(0, 2)
        .map(name => name[0].toUpperCase())
        .join('');
    }
  }

}
