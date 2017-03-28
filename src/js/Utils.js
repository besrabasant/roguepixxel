import mobileDetect from 'mobile-detect';

export default class Utils {

    static isMobileDevice() {
        var md = new mobileDetect(window.navigator.userAgent);
        if (md.os() == 'WindowsPhoneOS' || md.os() == 'AndroidOS' || md.os() == 'iOS') {
            return true;
        } else {
            return false;
        }
    }

}