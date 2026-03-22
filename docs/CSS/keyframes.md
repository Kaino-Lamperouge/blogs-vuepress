# keyframes

## 介绍

`@keyframes` `动画是循环的，transform` 只执行一遍

`from` 和 "`to` 等价于 `0%` 和 `100%`

`0%` 是动画的开始时间 `100%` 动画的结束时间

>百分比是指动画完成一遍的时间长度的的百分比
百分比后面的花括号写：在动画执行过程中的某时间点要完成的变化。

```css
@keyframes animationname {keyframes-selector {css-styles;}}
```

`animationname` 定义动画的名称

`keyframes-selector` 定义动画在每个阶段的样式 : `0-100%` `from` `to`

`css-styles` 一个或多个合法的 `css` 样式属性

## 示例

```css
@keyframes xxx
{
    0%   {top:0px; background:red; width:100px;}
    100% {top:200px; background:yellow; width:300px;}
}
```

如果一个关键帧中没有出现其他关键帧中的属性，那么这个属性将使用插值(估计在已知数据点之间的函数值)

如果某一个关键帧出现了重复的定义，且重复的关键帧中的 `CSS` 属性值不同，则以最后一次定义的属性为准

关键帧中出现的 `!important` 将会被忽略
