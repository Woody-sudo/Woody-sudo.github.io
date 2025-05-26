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
      
      // 显示或隐藏项目
      projectItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});