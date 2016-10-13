基于jQuery编程，实现简单版stickhero游戏

主要技术难点：1，如何确定新的柱子和消失的柱子如何处理
              2，做移动端的适配
              3，区分移动端和PC端

解决方法：1，布局是写好三个div，第三个div的宽度和位置随机（有一定范围）， 
              在火柴人移动结束后，三个div统一改变left值， 
              再进行DOM操作，$pierBox.append($pier.eq(0)) 将第一个柱子添加到最后面
          2，利用less预编译工具，动态设置元素宽高
          3，两种方式，navigator.userAgent和navigator.platform
