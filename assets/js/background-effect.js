document.addEventListener('DOMContentLoaded', function() {
  const bgContainer = document.getElementById('background-animation');
  const squareCount = 150; // 方块数量增加到3倍（原来是50）
  const squares = [];
  
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
  
  // 动画控制函数 - 加快闪烁速度
  function startAnimation() {
    // 每100毫秒激活一个方块（原来是300毫秒）
    setInterval(() => {
      // 随机选择一个方块
      const index = Math.floor(Math.random() * squares.length);
      const square = squares[index];
      
      // 激活方块
      square.classList.add('active');
      
      // 一段时间后关闭方块 - 缩短持续时间
      setTimeout(() => {
        square.classList.remove('active');
      }, Math.random() * 800 + 200); // 更短的持续时间（原来是1500+500）
    }, 100);
    
    // 增加额外的随机闪烁循环以增强效果
    setInterval(() => {
      // 同时激活多个方块
      const count = Math.floor(Math.random() * 5) + 3; // 同时激活3-7个方块
      
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * squares.length);
        const square = squares[index];
        
        // 激活方块
        square.classList.add('active');
        
        // 一段时间后关闭方块
        setTimeout(() => {
          square.classList.remove('active');
        }, Math.random() * 600 + 100); // 更短的持续时间
      }
    }, 300);
  }
});