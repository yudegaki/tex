'use strict';

// モジュールのエイリアスを作成
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events,
    Mouse = Matter.Mouse;

// エンジンの作成
let engine = Engine.create();

//縦方向の重力を0に
engine.world.gravity.y = 0;

// レンダラーの作成
let render = Render.create({
    element: document.getElementById('matter'),
    engine: engine,
    options: {
        width: 700,  //ステージの横幅
        height: 700,  //ステージの高さ
        background: '#FFFFFF',  //ステージの背景色
        wireframes: false // ワイヤーフレーム
    }
});


// ボディの作成
let ball = Bodies.rectangle(300, 50, 80, 80,{
    restitution:1,
    collisionFilter:{
        group:114514
    }
});
let box = Bodies.rectangle(300, 400, 80, 80,{
    restitution:0,
    collisionFilter:{
        group:114514
    }
});

ball.force.y = 0.1;
box.force.y = 0.0;

Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;

    // change object colours to show those starting a collision
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if(pair.bodyA.id == 1){
            setImmediate(()=>pair.bodyA.force.y = -0.1);
            console.log(pair.bodyA);
        }
        console.log(pair);
    }
});
function callHoge(obj){
    obj.force.y = 0.1;
    console.log(obj);
}




let ground = Bodies.rectangle(350, 600, 700, 10, { isStatic: true });




// すべてのボディをワールドに追加
World.add(engine.world, [box, ball,ground]);

// エンジンの実行
Engine.run(engine);

// レンダラーの実行
Render.run(render);


