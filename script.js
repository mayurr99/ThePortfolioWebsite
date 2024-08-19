function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function cursorAnimation() {
  Shery.mouseFollower({
    skew: true,
    // ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  Shery.makeMagnet(".nav-links>li,.logo img");

}
function chatgpt() {

  const languages = [".Hello", ".Hola", ".Bonjour", ".नमस्कार", ".Ciao", ".नमस्ते"];
  const timeline = gsap.timeline({ repeat: 0 });

  // Loading animation with language changes
  languages.forEach((word, index) => {
    timeline.to("#loading-text", {
      duration: 0.2,
      opacity: 1,
    
      display: "initial",
      text: word,
      // ease: "bounce.out",
    });
    timeline.to("#loading-text", {
      duration: 0.2,
      display: "none",
      opacity: 0,
      delay: 0.2,
      // ease: "bounce.out",

    });
  });

  // Upward animation on completion
  timeline.to("#loading-container", {
    duration: 0.2,
    y: "-100%",
    ease: "bounce.out",
    onComplete: () => {
      document.getElementById('page1').style.display = 'flex';
    }
  });

  // Page transition
  timeline.to("#loading-container", {
    duration: 0.4,
    opacity: 0,
    onComplete: () => document.getElementById('loading-container').style.display = 'none'
  });
  timeline.to("#loader", {
    duration: 0.2,
    opacity: 0,
    display: "none",
    onComplete: () => document.getElementById('loader').style.display = 'none'
  });
}
gsap.registerPlugin(TextPlugin);


window.addEventListener("wheel",function(dets){
  if(dets.deltaY > 0){
   gsap.to(".elem",{
     transform:"translateX(-200%)",
     repeat:-1,
     duration:5,
     ease:"none"
   })
  }
  else{
   gsap.to(".elem",{
     transform:"translateX(0%)",
     repeat:-1,
     duration:5,
     ease:"none"
   })
  }
})

document.querySelectorAll(".strip").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
     
      gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
      });
  });
    
  elem.addEventListener("mousemove", function (dets) {
      var diff = (dets.clientY - elem.getBoundingClientRect().top)
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      
      gsap.to(elem.querySelector("img"), {
          opacity: 1,
          ease: Power3,
          top:diff,
          left:dets.clientX,
          rotate:gsap.utils.clamp(-20,20,diffrot*0.5),
          duration:0.3
      })
  });
});

 cursorAnimation()
 chatgpt()
 locomotiveAnimation()