export class worksPageAnimation {
    constructor() {
        return false;
    }

    static init() {
        var prevWorksBtn = document.getElementById('previous_work');
        var nextWorksBtn = document.getElementById('next_work');

        prevWorksBtn.addEventListener('click', worksPageAnimation.previousWorks, false);
        nextWorksBtn.addEventListener('click', worksPageAnimation.nextWorks, false);
    }

    static previousWorks() {
        console.log('prev');
    }

    static nextWorks() {
        console.log('next');
    }

}