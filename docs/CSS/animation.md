# animation

将动画应用到指定的 `HTML` 元素

>animation：动画名称 动画时长 动画运动速度 延迟时间 执行次数 往返动画

```css
/* @keyframes duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name */
animation: 3s ease-in 1s 2 reverse both paused slidein;

/* @keyframes duration | easing-function | delay | name */
animation: 3s linear 1s slidein;

/* two animations */
animation:
  3s linear slidein,
  3s ease-out 5s slideout;
```

`animation` 属性用来指定一组或多组动画，每组之间用逗号相隔

- `animation-name`：设置需要绑定到元素的动画名称
- `animation-duration`：设置完成动画所需要花费的时间，单位为秒或毫秒，默认为 `0`
- `animation-timing-function`：设置动画的速度曲线，默认为 `ease`
- `animation-fill-mode`：设置当动画不播放时（动画播放完或延迟播放时）的状态
- `animation-delay`：设置动画开始之前的延迟时间，默认为 `0`
- `animation-iteration-count`：设置动画被播放的次数，默认为 `1`
- `animation-direction`：设置是否在下一周期逆向播放动画，默认为 `normal`
- `animation-play-state`：设置动画是正在运行还是暂停，默认是 `running`
- `animation`：所有动画属性的简写属性

## animation-name

`CSS` 属性指定一个或多个 `@keyframes` `at-rule` 的名称，这些 `at-rule` 描述了要应用于元素的动画

多个 `@keyframes` `at-rule` 以逗号分隔的名称列表的形式指定

如果指定的名称不匹配任何 `@keyframes` `at-rule`，则不会对任何属性进行动画处理

```css
/* 单个动画 */
animation-name: none;
animation-name: test_05;
animation-name: -specific;
animation-name: sliding-vertically;

/* 多个动画 */
animation-name: test1, animation4;
animation-name:
  none,
  -moz-specific,
  sliding;
```

## animation-duration

`CSS` 属性设置动画完成一个动画周期所需的时间

```css
/* 单个动画 */
animation-duration: 6s;
animation-duration: 120ms;

/* 多个动画 */
animation-duration: 1.64s, 15.22s;
animation-duration: 10s, 35s, 230ms;
```

## animation-timing-function

`CSS` 属性设置动画在每个周期的持续时间内如何进行
  
```css
/* 关键字值 */
animation-timing-function: ease;
animation-timing-function: ease-in;
animation-timing-function: ease-out;
animation-timing-function: ease-in-out;
animation-timing-function: linear;
animation-timing-function: step-start;
animation-timing-function: step-end;

/* 函数值 */
animation-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1);
animation-timing-function: steps(4, end);

/* Steps 函数关键字 */
animation-timing-function: steps(4, jump-start);
animation-timing-function: steps(10, jump-end);
animation-timing-function: steps(20, jump-none);
animation-timing-function: steps(5, jump-both);
animation-timing-function: steps(6, start);
animation-timing-function: steps(8, end);

/* 多个动画 */
animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1, 0.1);
```

`ease` 等同于 `cubic-bezier(0.25, 0.1, 0.25, 1.0)`，即默认值，表示动画在中间加速，在结束时减速

`linear` 等同于 `cubic-bezier(0.0, 0.0, 1.0, 1.0)`，表示动画以匀速运动

`ease-in` 等同于 `cubic-bezier(0.42, 0, 1.0, 1.0)`，表示动画一开始较慢，随着动画属性的变化逐渐加速，直至完成

`ease-out` 等同于 `cubic-bezier(0, 0, 0.58, 1.0)`，表示动画一开始较快，随着动画的进行逐渐减速

`ease-in-out` 等同于 `cubic-bezier(0.42, 0, 0.58, 1.0)`，表示动画属性一开始缓慢变化，随后加速变化，最后再次减速变化

`cubic-bezier(p1, p2, p3, p4)` 开发者自定义的三次贝塞尔曲线，其中 `p1` 和 `p3` 的值必须在 `0` 到 `1` 的范围内

`steps(n, <jumpterm>)` 按照 n 个定格在过渡中显示动画迭代，每个定格等长时间显示

- `jump-start` 表示一个左连续函数，因此第一个跳跃发生在动画开始时
- `jump-end` 表示一个右连续函数，因此最后一个跳跃发生在动画结束时
- `jump-none` 两端都没有跳跃。相反，在 `0%` 和 `100%` 标记处分别停留，每个停留点的持续时间为总动画时间的 `1/n`
- `jump-both` 在 `0%` 和 `100%` 标记处停留，有效地在动画迭代过程中添加一个步骤
- `start` 等同于 `jump-start`
- `end` 等同于 `jump-end`
- `step-start` 等同于 `steps(1, jump-start)`
- `step-end` 等同于 `steps(1, jump-end)`

## animation-fill-mode
  
设置 `CSS` 动画在执行之前和之后如何将样式应用于其目标
  
```css
/* Single animation */
animation-fill-mode: none;
animation-fill-mode: forwards;
animation-fill-mode: backwards;
animation-fill-mode: both;

/* Multiple animations */
animation-fill-mode: none, backwards;
animation-fill-mode: both, forwards, none;
```

`none` 当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 `CSS` 规则来显示该元素

`forwards` 目标将保留由执行期间遇到的最后一个关键帧计算值

`backwards` 动画将在应用于目标时立即应用第一个关键帧中定义的值，并在 `animation-delay` 期间保留此值

`both` 动画将遵循 `forwards` 和 `backwards` 的规则，从而在两个方向上扩展动画属性

## animation-delay

`CSS` 属性指定从应用动画到元素开始执行动画之前等待的时间量

动画可以稍后开始、立即从开头开始或立即开始并在动画中途播放
  
```css
/* 单个动画 */
animation-delay: 3s;
animation-delay: 0s;
animation-delay: -1500ms;

/* 多个动画 */
animation-delay: 2.1s, 480ms;
```

动画应该开始的时间偏移量，从应用动画到元素的时刻开始计算

正值表示动画应在指定的时间量过去后开始

负值会导致动画立即开始，但是从动画循环的某个时间点开始

## animation-iteration-count

`CSS` 属性设置动画序列在停止前应播放的次数

```css
/* 关键字值 */
animation-iteration-count: infinite;

/* 数字值 */
animation-iteration-count: 3;
animation-iteration-count: 2.4;

/* 多个值 */
animation-iteration-count: 2, 0, infinite;
```

`infinite` 无限循环播放动画

`number` 动画重复的次数 默认为 `1`
  
## animation-direction

`CSS` 属性设置动画是应正向播放、反向播放还是在正向和反向之间交替播放
  
```css
/* 单个动画 */
animation-direction: normal;
animation-direction: reverse;
animation-direction: alternate;
animation-direction: alternate-reverse;

/* 多个动画 */
animation-direction: normal, reverse;
animation-direction: alternate, reverse, normal;
```

`normal` 动画在每个循环中正向播放 每次动画循环时，动画将重置为起始状态并重新开始

`reverse` 动画在每个循环中反向播放 每次动画循环时，动画将重置为结束状态并重新开始 动画步骤将反向执行，并且时间函数也将被反转

`alternate` 动画在每个循环中正反交替播放，第一次迭代是正向播放

`alternate-reverse` 动画在每个循环中正反交替播放，第一次迭代是反向播放

## animation-play-state

`CSS` 属性设置动画是运行还是暂停

```css
/* 单个动画 */
animation-play-state: running;
animation-play-state: paused;

/* 多个动画 */
animation-play-state: paused, running, running;
```

`running` 当前动画正在运行

`paused` 当前动画已被停止
