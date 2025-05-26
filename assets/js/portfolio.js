document.addEventListener('DOMContentLoaded', function() {
  // 项目过滤功能
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 移除所有按钮的active类
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // 给当前按钮添加active类
      button.classList.add('active');
      
      // 获取过滤条件
      const filter = button.getAttribute('data-filter');
      
      // 显示或隐藏项目（带平滑过渡）
      projectItems.forEach(item => {
        // 先设置项目为隐藏状态（淡出）
        if (filter !== 'all' && item.getAttribute('data-category') !== filter) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          
          // 延迟后完全隐藏
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        } else {
          // 先设置为可见但透明
          item.style.display = 'block';
          
          // 强制重绘以确保过渡效果
          void item.offsetWidth;
          
          // 淡入效果
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        }
      });
    });
  });
  
  // 初始化时确保所有项目都可见
  projectItems.forEach(item => {
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
  });
});