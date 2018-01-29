import React from 'react';

import {Body,Composite,Constraint,Engine,Render,World,Bodies,Runner,Events} from 'matter-js'

import Sprite from './Sprite'

var speedx=200
var speedmaxx=200
var distance = 30;
var scrollmaxspeed = 8;

var timer  = 0;
var maxpaodaox = 0;

let GS_INIT = -1;
let GS_COUNTDOWN = 0;
let GS_RUNNING = 1;
let GS_RUN_ENDING = 2;
let GS_SHOW_TOP = 3;
let GS_RUN_END = 4;
    var runningFinal = false
    var gameStatus = GS_INIT;//0

var StartTime = new Date();
var torder = "2470569183"
    var cars = new Array()
class AppComponent extends React.Component {


  //static propTypes = {
  //  onLayoutChange: React.PropTypes.func.isRequired
  //};
  static defaultProps = {
    className: "layout",
    rowHeight: '460px',
    margin: [20,20],
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    dimensions: {
      width: -1,
      height: -1
    }
  };


  state = {
      color: 'green'

  }
  
  constructor(props) {
    super(props);

  }
  handleClick = ()  => {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    }

  handleStart = (o) =>{
    StartTime = new Date();
    gameStatus = GS_COUNTDOWN;
    runningFinal = false;
    // distance = dist
    torder = o
    torder.split('').forEach(function(id,idx){
        // console.log("id="+parseInt(id)+",idx="+idx)
      cars[parseInt(id)].finalid = idx+1;//;i;
      console.log("car.id="+cars[parseInt(id)].carid+"=finalid=>"+cars[parseInt(id)].finalid+"-=?"+idx);
    })
    

  }
  componentDidMount() {

  //   this.tick();
  //   this.timerID = setInterval(
  //     () => this.tick(),
  //     10000
  //   );


    var engine = Engine.create();

    // create a renderer
    var cheight = 600;//Math.min(document.documentElement.clientHeight, 600);
    var cwidth = 980;//Math.min(document.documentElement.clientWidth, 980);
    var render = Render.create({
        element: document.getElementById("_gamec"),
        engine: engine,
        options: {
            width: cwidth,
            height: cheight,
            background: '#0f0f13',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    // create two boxes and a ground
    var offsetx = 0;
    var offsety = 0;

    var imgwh=[980,100];
    // console.log("scal=="+scale);
    
    var top = Sprite.create(0, 0,imgwh[0],imgwh[1],"top_bg",".jpg");

    var winBG = Sprite.create(0, imgwh[1],imgwh[0],450,"mid_bg",".jpg")
    var winCar = new Array()
    var imgwincar = [252,276];
    var imgrank = [149,79];
    for(var i=1;i<=10;i++){
        var sp=Sprite.create(-1000, -10000,imgwincar[0],imgwincar[1],"car_rank"+i,".png")
        sp.render.visible = true;
        winCar.push(sp);
    }
    for(var i=1;i<=3;i++){
        var sp=Sprite.create(-1000, -10000,imgrank[0],imgrank[1],"rank"+i,".png")
        sp.render.visible = true;
        winCar.push(sp);

    }
    winBG.render.visible = false;


    var imgbgcounter=[557,76];
    var sp_bgCounter = Sprite.create((imgwh[0]-imgbgcounter[0])/2, 280,imgbgcounter[0],imgbgcounter[1],"bgNumber",".png");

    var  sp_counter = new Array();
    imgbgcounter = [60,60];

    for(var i=10;i>=1;i--){
        var sp=Sprite.create((imgwh[0]-imgbgcounter[0])/2, 285,imgbgcounter[0],imgbgcounter[1],"s"+i,".png")
        sp.render.visible = false;
        sp_counter.push(sp);
    }

    offsety+=imgwh[1];

    imgwh=[4500,450];
    offsetx = -imgwh[0]+cwidth;

    var paodao = new Array();

    paodao.push(Sprite.create(offsetx, offsety,imgwh[0],imgwh[1],"paodao",".jpg"));

    var  minimgwh=[800,450];
    offsetx = -cwidth;
    for(var i=0;i<distance;i++){
        paodao.push(Sprite.create(offsetx, offsety,minimgwh[0],minimgwh[1],"paodaomin",".png"));
        offsetx -= minimgwh[0];
    }
    paodao.push(Sprite.create(offsetx, offsety,imgwh[0],imgwh[1],"paodao",".jpg"));

    maxpaodaox = -imgwh[0]/2+cwidth/2;

    imgwh = [100,28]

    offsetx = cwidth - imgwh[0]-170;
    offsety += 93;
    

    console.log("car.offsetx="+offsetx+",offsety="+offsety);
    

    var vels = new Array ()
    var toplist = new Array();
    var sp_timers = new Array()

    var savecarposx = new Array();

    for(var i=1;i<=10;i++){

        var group = Body.nextGroup(true);


        var topc = Sprite.create(offsetx, offsety,imgwh[0],imgwh[1],"s"+i,".png");

        var car = Composite.create({ label: 'Car'+i });

        car.carid = i-1;
        car.finalid = i;

        var body = Sprite.create(offsetx, offsety,imgwh[0],imgwh[1],"car"+i,".png");
    
        var wheelAoffset = [offsetx+22,offsety+20];

        var wheelA = Bodies.circle(wheelAoffset[0], wheelAoffset[1], 16, { 
            isStatic:true,
            render: {
              sprite: {
                          texture: './images/carlong.png'

                      }
                  }
              }
          );
         var wheelB = Bodies.circle(wheelAoffset[0]+63, wheelAoffset[1], 16, { 
            isStatic:true,
            render: {
              sprite: {
                          texture: './images/carlong.png'
                      }
                  }
              }
          );

        var fireoff = [offsetx+90,offsety+18];

        var fire = Sprite.create(fireoff[0],fireoff[1],33,7,"40001",".png");
                
        var winoff = [offsetx-6,offsety-5];

        var win = Sprite.create(winoff[0],winoff[1],102,30,"20001",".png");

        fire.render.visible = false;
        win.render.visible = false;

        Composite.addBody(car, fire);

        Composite.addBody(car, body);
        Composite.addBody(car, wheelA);
        Composite.addBody(car, wheelB);
        Composite.addBody(car, win);

        // Composite.addConstraint(car, axelA);


        cars.push(car);
       var  carpos = new Array();
        car.bodies.forEach(function(body){carpos.push(body.position.x)});

        savecarposx.push(carpos);
        // cars.push(wheelA);
        offsetx += 15;
        offsety += 33;
        vels.push([0.5+Math.random(),speedx+Math.random()*speedmaxx,-1,0]);
    }

  

    offsetx = 160;
    offsety = 40;
    for(var i=1;i<=10;i++){
        var topc = Sprite.create(offsetx, offsety,24,24,"s"+i,".png");
        offsetx += 65;
        toplist.push(topc);
    }

    engine.world.gravity.gravityScale = 0.0;
    engine.world.gravity.x = 0.0;
    engine.world.gravity.y = 0.0;
    // add all of the bodies to the world
    World.add(engine.world, [top].concat(paodao).concat(cars).concat(toplist).concat([sp_bgCounter,winBG])
      .concat(sp_counter).concat(winCar));



    // create runner
    var runner = Runner.create({
      delta: 1000 / 100,
      isFixed: true,
      enabled: true
    });
    Runner.run(runner, engine);
    

    Events.on(runner,"tick", function(){
      if(timer<-100)return;

      if(gameStatus==GS_COUNTDOWN){
        runningFinal = false
        var timepast = (new Date().getTime()-StartTime.getTime())/1000;
        if(timepast>=4.5){
          var counter = 10-Math.min(11,timepast-5)
          var counti=parseInt(counter+0.5);
          sp_counter.forEach(function(v){
                v.render.visible=false
            });
          if(counti>0&&counti<=10){

             cars.forEach(function(carb,index) {//shaking cars
              var car = carb.bodies[1];
              if(vels[index][3]<=1)
              {
                vels[index][3]=car.position.y;
              }
              if((new Date().getTime()-StartTime.getTime())%2==0)
                car.position.y += Math.random()*0.3;
              else{
                car.position.y -= Math.random()*0.3;
              }
              if(car.position.y-vels[index][3]<-2){
                car.position.y += Math.random()*0.3;
              }
              if(car.position.y-vels[index][3]>2){
                car.position.y -= Math.random()*0.3;
              }
              
            })

            // console.log(timepast+"::counter="+counti);
            sp_counter[10-counti].render.visible = true;            
            sp_counter[10-counti].render.sprite.xScale = 
            sp_counter[10-counti].render.sprite.yScale = Math.max(0.6,1.0+(counter-counti)*(counter-counti))
            
          }else{
            sp_counter.forEach(function(v){v.render.visible=false});
            sp_bgCounter.render.visible=false;
            gameStatus = GS_RUNNING 
            timer = 99;
            cars.forEach(function(carb,index) {
              carb.bodies[1].position.y = vels[index][3];
            })
          }
          // 
           
        }
       
        //
        return
      }
      if(gameStatus==GS_RUNNING){
        timer++;
          // console.log("tick::x="+wheelA.position.x+",y="+wheelA.position.y)
        if(timer>100){
          if(paodao[paodao.length-1].position.x<maxpaodaox+600){
              paodao.forEach(function(v) {
                v.position.x = v.position.x + Math.min(scrollmaxspeed,(timer-100)*(timer-100)*0.0002);
              })

              if(timer%30==0)
              {  

               Array.from(cars).sort((x,y)=>x.bodies[1].position.x-y.bodies[1].position.x).forEach(
                  function(sortc,id){
                      toplist[sortc.carid].position.x = 160+65*id
                  }
                )
              }

             runningFinal= Sprite.carNormalRun(cars,vels,speedmaxx,paodao,maxpaodaox,scrollmaxspeed,timer,cwidth,speedx,runningFinal)
               
            }
            else{//finalrun

              if(paodao[paodao.length-1].position.x<100){
                 paodao.forEach(function(v) {
                v.position.x = v.position.x + scrollmaxspeed*4/5;
              })
                 // console.log(paodao[paodao.length-1].position.x)
               }
              else
              {
                timer = -99999999;
                gameStatus = GS_RUN_ENDING
                winBG.render.visible = true;

                cars.forEach(function(carb,index) {                
                    var space = 35;
                    offsety = 100+(450+imgwincar[1])/2-60;
                    if(carb.finalid<=3){
                      if(carb.finalid == 1){//first
                        offsetx = cwidth/3+imgwincar[0]/2+space;
                        winCar[10].position.x = offsetx - (imgrank[0])+(imgwincar[0])/2
                        winCar[10].position.y = 180
                        winCar[10].visible = true;
                      }else                       
                      if(carb.finalid == 2){//2nd
                          offsetx = space+imgwincar[0]/2;

                        winCar[11].position.x = offsetx - (imgrank[0])+(imgwincar[0])/2
                        winCar[11].position.y = 160
                        winCar[11].visible = true;
                      }else{
                        offsetx = cwidth*2/3+imgwincar[0]/2+space;
                        winCar[12].position.x = offsetx - (imgrank[0])+(imgwincar[0])/2
                        winCar[12].position.y = 150
                        winCar[12].visible = true;
                      }
                      winCar[carb.carid].position.x = offsetx
                      winCar[carb.carid].position.y = offsety
                      winCar[carb.carid].visible = true;

                      // console.log("setpos:finalid="+carb.finalid+",posx="+offsetx+",posty="+offsety)
                      timer = 0;
                    }
                })
                // engine.world.bodies = [];
                return;
              }
              Sprite.goRunFinal(cars,vels,speedmaxx)
              cars.forEach(function(carb,index) {                
                  var car = carb.bodies[1];
                  var whell=carb.bodies[2];
                  var whellb=carb.bodies[3];
                  whell.angle = whell.angle - Math.max(0.8,0.8*Math.abs(vels[index][0]+0.2))
                  whellb.angle = whellb.angle - Math.max(0.8,0.8*Math.abs(vels[index][0]+0.2))
                  carb.bodies.forEach(function(body,ii){
                    body.position.x -= scrollmaxspeed*4/5;
                  })
              })

            }      
          }//finalrun

        }//running
        else if(gameStatus == GS_RUN_ENDING){

            timer ++;
            cars.forEach(function(carb,index) {                
                var space = 20;
                var deltascale = 0.008
                var deltaY = 1.6
                offsety = 100+(450+imgwincar[1])/2-60;
                if(carb.finalid<=3){
                  if(carb.finalid == 1){//firs
                      if(timer<43){                  
                        winCar[carb.carid].position.y += deltaY;
                        winCar[carb.carid].render.sprite.xScale += deltascale
                        winCar[carb.carid].render.sprite.yScale += deltascale

                        winCar[10].position.y += deltaY/2
                        winCar[10].render.sprite.xScale += deltascale
                        winCar[10].render.sprite.YScale += deltascale

                      }
                  }else                       
                  if(carb.finalid == 2){//2nd
                      if(timer>=40&&timer<70){                  
                        winCar[carb.carid].position.y += deltaY;
                        winCar[carb.carid].render.sprite.xScale += deltascale
                        winCar[carb.carid].render.sprite.yScale += deltascale
                        winCar[11].position.y += deltaY
                        winCar[11].render.sprite.xScale += deltascale
                        winCar[11].render.sprite.YScale += deltascale

                      }
                  }else{
                      if(timer>=40&&timer<60){                  
                        winCar[carb.carid].position.y += deltaY;
                        winCar[carb.carid].render.sprite.xScale += deltascale
                        winCar[carb.carid].render.sprite.yScale += deltascale
                        winCar[12].position.y += deltaY
                        winCar[12].render.sprite.xScale += deltascale
                        winCar[12].render.sprite.YScale += deltascale

                      }
                  }
                }
            })
            if(timer>100){
              gameStatus = GS_RUN_END; 
              StartTime = new Date();
            }
        }//end of GS_RUN_ENDING
        else if(gameStatus == GS_RUN_END){
          var timepast = (new Date().getTime()-StartTime.getTime())/1000;
          if(timepast>2){//reset.....
              console.log("reset::time:"+timepast)
              winCar.forEach(function(v){v.visible = false;v.position.x = -10000;v.render.sprite.xScale = v.render.sprite.yScale = 1.0});
              winBG.render.visible = false;
              gameStatus=-1
              //reset paodao
              imgwh=[4500,450];
              offsetx = -imgwh[0]+cwidth;
              paodao[0].position.x = offsetx/2+cwidth/2;

              offsetx = -cwidth;
              for(var i=1;i<=distance+1;i++){
                  paodao[i].position.x = offsetx;
                  offsetx -= minimgwh[0];
              }
              gameStatus = GS_COUNTDOWN;
              StartTime = new Date();
              timer = 0;
              sp_bgCounter.render.visible=true;

              cars.forEach(function(car,carid){
                carpos = savecarposx[carid];
                  car.bodies.forEach(function(body,ii){
                    body.position.x = carpos[ii];                    
                  })
                  vels[carid]=[0.5+Math.random(),speedx+Math.random()*speedmaxx,-1,0];
              })

          }
        }

        //console.log("tick::"+paodao.position.x);
        //
    })//end event.tick

    // run the renderer
    Render.run(render);

    this.handleStart("0916873524");
  }

  tick() {
   
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  


  render() {
    var ratio = document.documentElement.clientWidth/980;
    var offsetx = -document.documentElement.clientWidth*ratio;
    var offsety = -document.documentElement.clientWidth*ratio;

    return (
          <div id="_gamec" width="980" height="600" style={{transform:"scale("+ratio+","+ratio+")",transformOrigin:"left top"}}></div>
    );

  }
}

AppComponent.defaultProps = {};

export default AppComponent;
