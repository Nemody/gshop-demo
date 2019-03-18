
window.addEventListener('DOMContentLoaded', function () {
  const footerItems = document.querySelectorAll('.footer-item');
  const footerList = document.querySelector('.footer-list');

  const sections = document.querySelectorAll('#main section');
  const starsList = document.querySelector('.starsList');
  const shopScores = document.querySelectorAll('.shop-score');
  const shopDetailMiddle = document.querySelectorAll('.shop-detail-middle');

  const loginAndRegisterList = document.querySelectorAll('.login-register');
  const loginAndRregisterPage = document.querySelector('.login-register-page');
  const goBack = document.querySelector('.goback');
  const takeoutPage = document.querySelector('.takeout-page');
  const  personInfoPage = document.querySelector('.person-info-page');

  const loginLiItems = document.querySelectorAll('.login-main li');
  const loginByMessage = document.querySelector('.login-by-message');
  const loginByPassword = document.querySelector('.login-by-password');
  //定义变量用于标识点击的是哪个登陆注册按钮 true为来自首页的登录点击  false为来自用户中心的登陆点击
  let flag;
  //动态获取商家列表的总数，同时获取到不同商家下的对应starItem
  let starItemsArr = [];
  Array.prototype.slice.call(shopDetailMiddle).map(function (item, index) {
    let starItems= `starItems${index}`;
    starItems = document.querySelectorAll(`.shop-detail-middle-${index + 1}  .star-item`);
    starItemsArr.push(starItems);
  });

  //点击底部选项实现页面切换显示
  footerItems.forEach(function (item, index) {
    item.addEventListener('touchend', function () {
      footerItems.forEach(function (item, index) {
        item.classList.remove('active')
        sections[index].classList.remove('show')
      })
      item.classList.add('active')
      sections[index].classList.add('show')
    }, false)
  });
  //轮播部分
  const  mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: {
      delay: 1000
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination'
    }
  });

  // 星级显示部分
  shopScores.forEach(function (item, index) {
    let score = shopScores[index].textContent
    const onStarCount = Math.floor(score)
    const halfStarCount = Math.round(score) - onStarCount
    starItemsArr[index].forEach(function (item, index) {
      if (index < onStarCount) {
        item.classList.add('on-star')
      } else if (index < onStarCount + halfStarCount) {
        item.classList.add('half-star')
      } else {
        item.classList.add('off-star')
      }
    })
  });

  //点击跳转登录注册页面  绑定事件监听
  loginAndRegisterList.forEach(function (item,index) {
    item.addEventListener('touchend',function (event) {
      if(index === 0){
        flag = true;
      } else {
        flag = false;
      }
      loginAndRregisterPage.classList.add('show');
      takeoutPage.classList.remove('show');
      personInfoPage.classList.remove('show');
      footerList.style.display = 'none';
    },false)
  });

  //点击短信登陆/密码登录切换页面显示
  loginLiItems.forEach(function (item) {
    item.addEventListener('touchend', function (event) {
      loginLiItems.forEach(function (item, index) {
        item.classList.remove('active');
        event.target.classList.add('active');
        if(event.target.textContent === '密码登录'){
          loginByMessage.classList.remove('show');
          loginByPassword.classList.add('show');
        } else {
          loginByMessage.classList.add('show');
          loginByPassword.classList.remove('show');
        }
      })
    },false)
  });

  //点击回退按钮返回上一级页面
  goBack.addEventListener('touchend', function () {
    loginAndRregisterPage.classList.remove('show');
    footerList.style.display = 'block';
      if(flag){
        takeoutPage.classList.add('show');
      } else {
        personInfoPage.classList.add('show');
      }
  })
}, false);
