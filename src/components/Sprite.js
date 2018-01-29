import React from 'react';

import {Bodies} from 'matter-js'


var Sprite = {

    create:function (x,y,wid,hig,imgName,imgext=".png",imgPath="images/") {
      console.log("create img-="+imgPath + imgName + imgext)    
      return Bodies.rectangle(x+wid/2, y+hig/2, wid, hig, {
            isStatic: true,
            render: {
                strokeStyle: '#ffffff',
                sprite: {
                        texture: imgPath + imgName + imgext
                    }
                }

        })

    },//end create
    goRunFinal:function (cars,vels,speedmaxx,runningFinal) {
      cars.forEach(function(car,id){
      var finalx = 100+car.finalid*80+Math.random()*40;
      if(!runningFinal){
        car.finalx = finalx;
        vels[id][1] = 100+Math.random()*100;
      }
      if(Math.abs(car.bodies[1].position.x-car.finalx)<30){
        if(vels[id][1]--<0)
        {
          vels[id][1] = 200+Math.random()*200;
          vels[id][0] = (car.finalx-finalx)/vels[id][1];
        }
      }else{
        vels[id][0] = (car.bodies[1].position.x-car.finalx)/(1500/speedmaxx)/4
      }

      // 
      var fire = car.bodies[0];
      var win = car.bodies[4];
       if(vels[car.carid][0]>0.6){
              fire.render.visible = true;
              win.render.visible = true;
            fire.render.sprite.xScale=1+Math.random()*3;
            win.render.sprite.yScale=1*(0.5+Math.random());

          }else{
              fire.render.visible = false;
              win.render.visible = false;

          }
    })
  }//end goRunFinal
  ,carNormalRun:function(cars,vels,speedmaxx,paodao,maxpaodaox,scrollmaxspeed,timer,cwidth,speedx,runningFinal){

      if(paodao[paodao.length-1].position.x>maxpaodaox-1000)
       {//final speed
          
          Sprite.goRunFinal(cars,vels,speedmaxx,runningFinal)
          console.log("runningFinal:"+runningFinal)
          runningFinal = true;
       }

      cars.forEach(function(carb,index) {
        // console.log(carb.carid)
          // if(car.position.x>200)
          var fire = carb.bodies[0];
          var car = carb.bodies[1];
          var whell=carb.bodies[2];
          var whellb=carb.bodies[3];
          
          var win = carb.bodies[4];

          carb.bodies.forEach(function(body,ii){
            body.position.x -= vels[index][0];
          })

          if(fire.render.visible&&vels[index][0]>0.5||runningFinal){
            fire.render.sprite.xScale=1+Math.random()*2;
            win.render.sprite.yScale=1*(0.5+Math.random());
            whell.angle = whell.angle - Math.max(0.8,1*Math.abs(vels[index][0])*Math.min(scrollmaxspeed,(timer-100)*(timer-100)*0.001)/scrollmaxspeed);
            whellb.angle = whellb.angle - Math.max(0.8,1*Math.abs(vels[index][0])*Math.min(scrollmaxspeed,(timer-100)*(timer-100)*0.001)/scrollmaxspeed);
          }else{
              whell.angle = whell.angle - 0.5*(0.2+Math.abs(vels[index][0]))*Math.min(scrollmaxspeed,(timer-100)*(timer-100)*0.001)/scrollmaxspeed-0.1;
              whellb.angle = whellb.angle - 0.5*(0.2+Math.abs(vels[index][0]))*Math.min(scrollmaxspeed,(timer-100)*(timer-100)*0.001)/scrollmaxspeed-0.1;
              fire.render.visible = false;
              win.render.visible = false;
          }

          if(!runningFinal)
          {
            if(vels[index][1]--<0||car.position.x<cwidth/5||car.position.x>cwidth*7/8){
              var sign = 1;
              if(car.position.x<cwidth/3){
                sign = -1
              }else
              if(car.position.x>cwidth*3/5)
              {
                sign = 1
              }else{
                if(Math.random()*100>50)
                  sign = -1
                else{
                  sign = 1
                }
              }
              var oldv = vels[index][0]
              vels[index] = [sign*(0.9+Math.random()),speedx+Math.random()*speedmaxx]


              if(vels[index][0]>oldv){
                  fire.render.visible = true;
                  win.render.visible = true;
              }else{
                  fire.render.visible = false;
                  win.render.visible = false;

              }
            }                  
          }
          return runningFinal;

      })
  }//end CarNormalRun

}


module.exports = Sprite;
