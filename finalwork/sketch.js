// 最終課題を制作しよう
let x, y;
let vx, vy;
const g = 1;
let stones = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height * 0.8; //初期位置を地面の上に
  vx = 0;
  vy = 0;
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  vx = 0; // 毎フレームリセットしてキー入力で決める
  let speed = 5; // 基本速度
  if (keyIsDown(SHIFT)) { // Shiftで加速
    speed = 10;
  }
  if (keyIsDown(LEFT_ARROW)) {
    vx = -speed;
  }
  vy += g; // 重力を加える// 地面に着いたら止める
  if (y + size/2 >= groundY) {
    y = groundY - size/2; // 地面の上に位置を固定
    vy = 0;
    // スペースキーでジャンプ（空中ジャンプ不可）
    if (keyIsDown(32)) { // 32 = スペースキー
      vy = -20; // 上方向に速度を与える
    }
  }

  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  x += vx;
  y += vy;
  if (x < 0){
    x = width;
  }

  // キャラクターを描く
  fill(0);
  const carWidth = size * 1.5;   // 車体の横幅
  const carHeight = size * 0.6;  // 車体の高さ
  //車体
  rect(x - carWidth/2, y - carHeight/2, carWidth, carHeight);
  rect(x - carWidth/4, y - carHeight, carWidth/2, carHeight/2);
  fill(100); // タイヤ
  ellipse(x - carWidth/3, y+ carHeight/2, size*0.4, size*0.4); // 左タイヤ
  ellipse(x + carWidth/3, y+ carHeight/2, size*0.4, size*0.4); // 右タイヤ
  //信号機
  const signalWidth = 40;   // 幅
  const signalHeight = 120; // 高さ
  const signalX = 5;       // 左端からの位置
  const signalY = height / 5;

  fill(50); //信号機の枠
  rect(signalX, signalY, signalWidth, signalHeight, 5);

  if(keyIsDown(LEFT_ARROW)){
    fill(0,255,0);  // 緑信号
    ellipse(signalX + signalWidth/2, signalY + 100, 20, 20);
    fill(100,0,0);
    ellipse(signalX + signalWidth/2, signalY + 20, 20, 20);
  }else{
    fill(0,100,0);
    ellipse(signalX + signalWidth/2, signalY + 100, 20, 20);
    fill(255,0,0);
    ellipse(signalX + signalWidth/2, signalY + 20, 20, 20);
  }
  
  fill(255,255,200); // 黄信号
  ellipse(signalX + signalWidth/2, signalY + 60, 20, 20);

  //石
  fill(150);
  for(let i=0;i<stones.length;i++){
    let s=stones[i];
    ellipse(s.x,s.y,s.size,s.size);
  }
}
function mousePressed(){
  const y = height * 0.8;
  const stone = {
    x: mouseX,
    y: y - 10, 
    size: 20
  };
  stones.push(stone);
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

