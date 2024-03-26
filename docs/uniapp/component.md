# 组件

## 局部注册

组件安装在项目的 `components` 目录下，并符合 `components/组件名称/组件名称.vue` 目录结构。就可以不用引用、注册，直接在页面中使用。

`easycom` 是自动开启的，不需要手动开启，有需求时可以在 `pages.json` 的 `easycom` 节点进行个性化设置

不管 `components` 目录下安装了多少组件，`easycom` 打包后会自动剔除没有使用的组件，对组件库的使用尤为友好

## props

`props` 可以是数组或对象，用于接收来自父组件的数据

| 选项      |                                                                  类型                                                                   |                                                                      说明                                                                      |
| --------- | :-------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: |
| type      | `String` 、 `Number` 、 `Boolean` 、 `Array` 、 `Object` 、 `Date` 、 `Function` 、 `Symbol` ，任何自定义构造函数、或上述内容组成的数组 |                                                会检查一个 `prop` 是否是给定的类型，否则抛出警告                                                |
| default   |                                                                   any                                                                   |                为该 `prop` 指定一个默认值。如果该 `prop` 没有被传入，则换做用这个值。对象或数组的默认值必须从一个工厂函数返回。                |
| required  |                                                                 Boolean                                                                 |                                                           定义该 `prop` 是否是必填项                                                           |
| validator |                                                                Function                                                                 | 自定义验证函数会将该 `prop` 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 `false` 的值 (也就是验证失败)，一个控制台警告将会被抛出 |

```html
<template>
  <view>
    <!-- 我是子组件componentA -->
    <view>{{age}}</view>
  </view>
</template>
<script>
  export default {
    props: {
      // 检测类型 + 其他验证
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: function (value) {
          return value >= 0;
        },
      },
    },
  };
</script>
```

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>
```

## ref

被用来给元素或子组件注册引用信息，引用信息将会注册在父组件的 `$refs` 对象上。

如果在普通的 `DOM` 元素上使用，引用指向的就是 `DOM` 元素；如果用在子组件上，引用就指向组件实例

通过 `this.$refs.XXX` 来获取到组件对象

```html
<base-input ref="usernameInput"></base-input>
```

使用 `this.$refs.usernameInput` 来访问这个 `<base-input>` 实例

```html
<!-- base-input子组件页面 -->
<template>
  <view>
    <input :focus="isFocus" type="text" placeholder="请输入内容" />
  </view>
</template>
<script>
  export default {
    name: "base-input",
    data() {
      return {
        isFocus: false,
      };
    },
    methods: {
      focus() {
        this.isFocus = true;
      },
    },
  };
</script>
```

```html
<!-- index 父组件页面 -->
<template>
  <view>
    <base-input ref="usernameInput"></base-input>
    <button type="default" @click="getFocus">获取焦点</button>
  </view>
</template>
<script>
  export default {
    methods: {
      getFocus() {
        //通过组件定义的ref调用focus方法
        this.$refs.usernameInput.focus();
      },
    },
  };
</script>
```

## sync 修饰符

当一个子组件改变了一个 `prop` 的值时，这个变化也会同步到父组件中所绑定

`.sync` 它会被扩展为一个自动更新父组件属性的 `v-on` 监听器

```js
<syncA :title.sync="title"></syncA>
```

```js
<view @click="changeTitle">{{title}}</view>
changeTitle(){
  //触发一个更新事件
  this.$emit('update:title',"uni-app")
}
```

## 插槽

```html
<template>
  <view class="container">
    <header>
      <!-- 我们希望把页头放这里 -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 我们希望把主要内容放这里 -->
      <slot></slot>
    </main>
    <footer>
      <!-- 我们希望把页脚放这里 -->
      <slot name="footer"></slot>
    </footer>
  </view>
</template>
```

```html
<template>
  <view>
    <!-- 父组件使用子组件`<base-layout>`，节点上使用slot特性： -->
    <base-layout>
      <template v-slot:header>
        <view>…</view>
      </template>
      <template v-slot:default>
        <view>…</view>
      </template>
      <template v-slot:footer>
        <view>…</view>
      </template>
    </base-layout>
  </view>
</template>
```

`v-slot:` 可以被重写为 `#`
