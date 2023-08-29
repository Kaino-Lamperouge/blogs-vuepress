# 计时器

## 网页打开自动计时

```html
<body onload="time_fun()">
  <h1 id="mytime">00:00:00</h1>
</body>
```

```js
function two_char(n) {
  return n >= 10 ? n : "0" + n;
}
function time_fun() {
  var sec = 0;
  setInterval(function () {
    sec++;
    var date = new Date(0, 0);
    date.setSeconds(sec);
    var h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
    document.getElementById("mytime").innerText =
      two_char(h) + ":" + two_char(m) + ":" + two_char(s);
  }, 1000);
}
```

### 网页打开 开始执行的另一种方法

```html
<div>
  <span id="time"></span>
</div>
```

```js
var time = document.getElementById("time");
function getnewtime() {
  time.innerText = "halo";
}
window.onload = function () {
  setInterval("getnewtime()", 0);
};
```

## 点击操作控制

```html
<div id="wrap">
  <h1 id="content">00:00:00:00</h1>
  <div class="box">
    <button id="start">开始</button>
    <button id="division">分割</button>
    <button id="reset">重置</button>
  </div>
  <div id="out"></div>
</div>
```

```js
//定义变量保存时间
var before = 0;
//定义变量保存计时器时间
var time = 0;
//保存点击按钮暂停的时间
var suspendTime = 0;
//定义变量存储分割的时间
var cutting = 0;

//开始按钮
start.onclick = function () {
  if (start.innerHTML == "开始") {
    start.innerHTML = "暂停";

    //获取相对的时间
    before = new Date().getTime();

    timer = setInterval(() => {
      //实时时间
      var now = new Date().getTime();
      //计时器时间 = 实时时间 - 相对时间 + 点击暂停按钮时保存的时间
      time = now - before + suspendTime;
      //把处理过的时间显示到content标签中
      content.innerHTML = showTime(time);
    }, 1000 / 60);
  } else if (start.innerHTML == "暂停") {
    start.innerHTML = "开始";

    //停止计时器
    clearInterval(timer);

    //储存点击暂停的时间
    suspendTime = time;

    //创建h2标签
    var h2 = document.createElement("h2");
    h2.innerHTML = `<span>实时时间 :</span>${showTime(time)}`;
    out.appendChild(h2);

    return;
  }
};

//分割按钮
division.onclick = function () {
  //计算点击 分割按钮时  此时距离上一次点击过去了多久
  var present = time - cutting;
  //点击分割按钮的时候保存于此
  cutting = time;
  //创建h2标签
  var h2 = document.createElement("h2");
  h2.innerHTML = `<span>分割时间 : </span>${showTime(present)}`;
  out.appendChild(h2);
};

//重置按钮
reset.onclick = function () {
  //重置样式
  //清空out内容
  out.innerHTML = "";
  before = 0;
  time = 0;
  suspendTime = 0;
  cutting = 0;
  clearInterval(timer);
  content.innerHTML = showTime(time);
  timer = null;
};

//时间处理
function showTime(time) {
  //定义变量  小时  分钟 秒 毫秒
  var hour;
  var min;
  var second;
  var msecond;

  //分别  获取到小时 分钟 秒 毫秒
  hour = Math.floor(time / (3600 * 1000));
  min = Math.floor((time / 1000 / 60) % 60);
  second = Math.floor((time / 1000) % 60);
  msecond = time % 1000;

  //对时间进行处理
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  second = second < 10 ? "0" + second : second;
  msecond = msecond < 100 ? "0" + msecond : msecond;
  msecond = msecond < 10 ? "0" + msecond : msecond;

  return hour + ":" + min + ":" + second + ":" + msecond;
}
```
