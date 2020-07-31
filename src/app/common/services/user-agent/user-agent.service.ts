import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserAgentService {
    public isAndroid(): boolean {
        return /Android/.test(navigator.userAgent);
    }

    public isEdge(): boolean {
        return /Edge/.test(navigator.userAgent);
    }

    public isFirefox(): boolean {
        return /Firefox/.test(navigator.userAgent);
    }

    public isChrome(): boolean {
        return /Google Inc/.test(navigator.vendor);
    }

    public isChromeIOS(): boolean {
        return /CriOS/.test(navigator.userAgent);
    }

    public isIOS(): boolean {
        return /(iPhone|iPad|iPod)/.test(navigator.platform);
    }

    public isSafari(): boolean {
        return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    }

    public isIE(): boolean {
        return /Trident/.test(navigator.userAgent);
    }
}
