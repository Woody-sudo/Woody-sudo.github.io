document.addEventListener('DOMContentLoaded', function() {
  const bgContainer = document.getElementById('background-animation');
  const particleCount = 20; // 减少粒子数量以降低密度
  const particles = [];

  if (!bgContainer) {
    console.error('Background animation container not found!');
    return;
  }

  // 创建粒子函数
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle'; // 使用 .particle 类

    // 随机大小 (5-15px)
    const size = Math.floor(Math.random() * 10) + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // 随机水平位置
    particle.style.left = `${Math.random() * 100}%`;

    // 随机动画延迟和持续时间，使粒子效果更自然
    const animationDuration = Math.random() * 5 + 5; // 5-10秒
    const animationDelay = Math.random() * 5; // 0-5秒延迟

    particle.style.animation = `riseAndFade ${animationDuration}s linear ${animationDelay}s infinite`;

    bgContainer.appendChild(particle);
    particles.push(particle);
  }

  // 创建初始粒子
  for (let i = 0; i < particleCount; i++) {
    createParticle();
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
        // 主题变化时，重新创建粒子以应用新的颜色
        // 首先移除旧粒子
        particles.forEach(p => p.remove());
        particles.length = 0; // 清空数组
        // 然后创建新粒子
        for (let i = 0; i < particleCount; i++) {
          createParticle();
        }
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

});