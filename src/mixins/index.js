export const animate = {
  methods: {
    animateLevel(animate) {
      // let animate  = {
      //   parentDom : parentDom,
      //   childDom : childDom
      // }
      let bbsW = animate.parentDom.offsetWidth;
      console.log(bbsW)
      if (animate.childDom.offsetWidth > bbsW) {
        let differ = animate.childDom.offsetWidth - bbsW;
        let speed = differ / (bbsW * animate.speed);
        clearInterval(timer);
        var timer = setInterval(function () {
          animate.childDom.style.left = animate.childDom.offsetLeft - animate.parentDom.offsetLeft - speed + 'px';
          if (animate.childDom.offsetLeft - animate.parentDom.offsetLeft + differ < 0 || animate.childDom.offsetLeft - animate.parentDom.offsetLeft > 0) {
            speed = -speed;
          }
        }, 50)
      }
    }
  }
}
