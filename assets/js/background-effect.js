document.addEventListener('DOMContentLoaded', function() {
  const bgContainer = document.getElementById('background-animation');
  const squareCount = 50; // 方块数量
  const squares = [];
  
  // 创建方块
  for (let i = 0; i < squareCount; i++) {
    createSquare();
  }
  
  // 启动动画
  startAnimation();
  
  // 创建方块函数
  function createSquare() {
    const square = document.createElement('div');
    square.className = 'bg-square';
    
    // 随机大小 (10-40px)
    const size = Math.floor(Math.random() * 30) + 10;
    square.style.width = `${size}px`;
    square.style.height = `${size}px`;
    
    // 随机位置
    const posX = Math.floor(Math.random() * 100);
    const posY = Math.floor(Math.random() * 100);
    square.style.left = `${posX}%`;
    square.style.top = `${posY}%`;
    
    bgContainer.appendChild(square);
    squares.push(square);
  }
  
  // 动画控制函数
  function startAnimation() {
    setInterval(() => {
      // 随机选择一个方块
      const index = Math.floor(Math.random() * squares.length);
      const square = squares[index];
      
      // 激活方块
      square.classList.add('active');
      
      // 一段时间后关闭方块
      setTimeout(() => {
        square.classList.remove('active');
      }, Math.random() * 1500 + 500);
    }, 300);
  }
});