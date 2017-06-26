import { TweenMax, TimelineMax } from "gsap";
import * as WHS from 'whs';
import { revealer } from "../pages";
import works from "../worksScene";
var $ = require("jquery");

const worksRevealer = new TimelineMax({ paused: true });

// const worksComponent = {
//     nav: document.getElementById('works_nav'),
//     viewer: document.getElementById('works_viewer'),
//     detail: document.getElementById('works_detail')
// };

// worksComponent.detail.children[works.current].style.display = 'block';


export class worksPageAnimation {
    constructor() {

        return false;
    }

    static init() {
        // var prevWorksBtn = document.getElementById('previous_work');
        // var nextWorksBtn = document.getElementById('next_work');

        // prevWorksBtn.addEventListener('click', worksPageAnimation.previousWorks, false);
        // nextWorksBtn.addEventListener('click', worksPageAnimation.nextWorks, false);

        $('.filter-button').click(function(e){
            e.preventDefault();
            $(this).parent().addClass('active').siblings().removeClass('active');
            var value = $(this).attr('data-filter');

            if(value == "all")
            {
                //$('.filter').removeClass('hidden');
                $('.filter').show('1000');
                $( ".filter:nth-child(n+9)" ).hide('1000');
            }
            else
            {
                $( ".filter:nth-child(n+9)" ).show('3000');
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
                $(".filter").not('.'+value).hide('3000');
                $('.filter').filter('.'+value).show('3000');

            }
        });

    }


    // static previousWorks(e) {
    //     e.preventDefault();
    //
    //     worksRevealer
    //         .to(worksComponent.nav, 0.1, {
    //             onStart: () => {
    //                 revealer.animateRevealRight();
    //             }
    //         })
    //         .to([worksComponent.nav, worksComponent.detail], 0.1, {
    //             delay: 1,
    //             left: '13%',
    //             onComplete: () => {
    //                 works.prev();
    //                 worksPageAnimation.showWorksDetails();
    //
    //                 works.planes.forEach((plane, index) => {
    //                     TweenMax.fromTo(plane.position, 0.6, { x: '120' }, { x: '0', ease: Power2.easeOut });
    //                 });
    //
    //             }
    //         })
    //         .to([worksComponent.nav, worksComponent.detail], 0.5, { left: "3%", ease: Power2.easeOut }, '+=0.1');
    //
    //
    //     worksRevealer.play();
    // }

    // static nextWorks(e) {
    //     e.preventDefault();
    //
    //     worksRevealer
    //         .to(worksComponent.nav, 0.1, {
    //             onStart: () => {
    //                 revealer.animateRevealLeft();
    //             }
    //         })
    //         .to([worksComponent.nav, worksComponent.detail], 0.1, {
    //             delay: 0.85,
    //             left: '-7%',
    //             onComplete: () => {
    //                 works.next();
    //                 worksPageAnimation.showWorksDetails();
    //
    //                 works.planes.forEach((plane, index) => {
    //                     TweenMax.fromTo(plane.position, 0.6, { x: '-120' }, { x: '0', ease: Power2.easeOut });
    //                 });
    //             }
    //         })
    //         .to([worksComponent.nav, worksComponent.detail], 0.5, { left: "3%", ease: Power2.easeOut }, '+=0.1');
    //     worksRevealer.play();
    // }

    // static showWorksDetails() {
    //     for (var i = 0; i < worksComponent.detail.children.length; i++) {
    //         worksComponent.detail.children[i].style.display = 'none';
    //     }
    //     worksComponent.detail.children[works.current].style.display = 'block';
    // }

}