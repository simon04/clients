import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

import { AvatarUpdateService } from "@bitwarden/common/abstractions/account/avatar-update.service";
type SizeTypes = "xlarge" | "large" | "default" | "small";
@Component({
  selector: "dynamic-avatar",
  template: `<span [title]="title">
    <bit-avatar
      appStopClick
      [text]="text"
      [size]="size"
      [color]="color"
      [border]="border"
      [id]="id"
      [icon]="icon"
      [title]="title"
    >
    </bit-avatar>
  </span>`,
})
export class DynamicAvatarComponent implements OnInit, OnDestroy {
  @Input() border = false;
  @Input() id: number;
  @Input() text: string;
  @Input() icon: string;
  @Input() title: string;
  @Input() size: SizeTypes = "default";
  color: string | null;
  private destroy$ = new Subject<void>();

  constructor(private accountUpdateService: AvatarUpdateService) {
    this.accountUpdateService.avatarUpdated$.pipe(takeUntil(this.destroy$)).subscribe((color) => {
      this.color = color;
    });
  }

  async ngOnInit() {
    const stateColor = await this.accountUpdateService.loadColorFromState();
    this.color = stateColor;
  }

  async ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
