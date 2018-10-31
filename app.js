'use strict';

let
  rad = 0,
  rotation = 0,
  angle = 0,
  flag = false;

class Draggable{
  constructor(ev){
    this.ev = ev;
    this.target = document.getElementById('rotate');
    this.mouse = {
      x: ev.touches[0] === undefined ? 0 : ev.touches[0].clientX,
      y: ev.touches[0] === undefined ? 0 : ev.touches[0].clientY
    };
    this.center = {
      x: (this.target.getBoundingClientRect().left + this.target.getBoundingClientRect().right) / 2,
      y: (this.target.getBoundingClientRect().top + this.target.getBoundingClientRect().bottom) / 2,
    };
    this.r2d = 180 / Math.PI;
  }

  start(){
    rad = this.r2d * Math.atan2(this.mouse.x - this.center.x, this.mouse.y - this.center.y);
    flag = true;
  }

  rotate(){
    const _rad = this.r2d * Math.atan2(this.mouse.x - this.center.x, this.mouse.y - this.center.y);
    rotation = rad - _rad;
    if (flag) {
      this.target.style.transform = 'rotate(' + (angle + rotation) + 'deg)';
    }
  }

  end(){
    angle += rotation;
    flag = false;
  }
}

document.getElementById('rotate').addEventListener('touchstart', ev => {
//  ev.preventDefault();
  const draggable = new Draggable(ev);
  draggable.start();
});
document.getElementById('rotate').addEventListener('touchmove', ev => {
//  ev.preventDefault();
  const draggable = new Draggable(ev);
  draggable.rotate();
});
document.getElementById('rotate').addEventListener('touchend', ev => {
//  ev.preventDefault();
  const draggable = new Draggable(ev);
  draggable.end();
});
