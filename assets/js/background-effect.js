document.addEventListener('DOMContentLoaded', function() {
  const bgContainer = document.getElementById('background-animation');
  const squareCount = 100; // 增加方块数量
  const squares = [];
  
  if (!bgContainer) {
    console.error('Background animation container not found!');
    return;
  }
  
  // 确保背景动画容器继承正确的主题
  function updateBackgroundTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
  // 初始化主题
  updateBackgroundTheme();
  
  // 监听主题变化
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        updateBackgroundTheme();
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  
  // 创建方块函数
  function createSquare() {
    const square = document.createElement('div');
    square.className = 'bg-square';
    
    // 随机大小 (8-25px)
    const size = Math.floor(Math.random() * 18) + 8;
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
  
  // 创建方块
  for (let i = 0; i < squareCount; i++) {
    createSquare();
  }
  
  // 动画控制函数
  function startAnimation() {
    // 主要闪烁循环
    setInterval(() => {
      const index = Math.floor(Math.random() * squares.length);
      const square = squares[index];
      
      if (square && !square.classList.contains('active')) {
        // 激活方块
        square.classList.add('active');
        
        // 随机持续时间后关闭方块
        setTimeout(() => {
          square.classList.remove('active');
        }, Math.random() * 1200 + 300);
      }
    }, 150);
    
    // 额外的多方块闪烁循环
    setInterval(() => {
      const count = Math.floor(Math.random() * 4) + 2; // 同时激活2-5个方块
      
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * squares.length);
        const square = squares[index];
        
        if (square && !square.classList.contains('active')) {
          // 激活方块
          square.classList.add('active');
          
          // 随机持续时间后关闭方块
          setTimeout(() => {
            square.classList.remove('active');
          }, Math.random() * 800 + 200);
        }
      }
    }, 400);
  }
  
  // 启动动画
  startAnimation();
});