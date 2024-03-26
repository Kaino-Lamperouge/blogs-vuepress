# Css 预处理器

`CSS` 预处理器是一种基于 `CSS` 的另一种语言，通过预处理器编写的代码会被编译成普通的 `CSS` 文件。预处理器在 `CSS` 的基础上添加了许多新特性和功能，有助于提升 `CSS` 文件的组织结构和代码可维护性。

## 功能

1. 嵌套：允许在样式规则中嵌套其他样式规则，反映层级与约束关系。
2. 变量和计算：引入变量，可用于存储颜色、尺寸等信息，同时支持数学运算，减少代码重复。
3. `Extend` 和 `Mixin`：代码片段的复用，`Extend` 用于共享样式规则，`Mixin` 用于在样式表中进行样式复用并可进行传参操作。
4. 循环：支持在样式表中使用循环结构，适用于生成复杂但有规律的样式。
5. `Import`：模块化，允许在样式表中导入其他样式文件，有助于提高可维护性和代码复用。

## Less

1. 安装：通过 npm 安装 Less 编译器。

   ```shell
   npm install less -g
   ```

2. 支持嵌套书写，提高样式层级的可读性。

   ```less
   // Less中嵌套样式的示例代码
   .navbar {
     background-color: #f5f5f5;
     padding: 10px;

     // 嵌套规则应用于锚点标签
     a {
       color: #007bff;
       margin-right: 10px;

       &:hover {
         text-decoration: underline;
       }
     }
   }
   ```

3. &符号表示父选择器，用于指定嵌套规则。

   ```less
   // Less中使用&符号的示例代码
   .button {
     border: 1px solid #007bff;
     background-color: white;
     color: #007bff;

     // 当按钮处于active状态时应用的样式
     &:active {
       background-color: #007bff;
       color: white;
     }
   }
   ```

4. 变量定义：使用@符号定义变量，如@fontSize。

   ```less
   // Less中的变量定义示例代码
   @primaryColor: #007bff;
   @fontSize: 16px;

   .header {
     color: @primaryColor;
     font-size: @fontSize;
   }
   ```

5. 变量运算：支持颜色、像素等单位的运算，方便定义主题等样式。

   ```less
   // Less中的变量运算示例代码
   @baseFontSize: 16px;
   @headerFontSize: @baseFontSize * 1.5;

   .header {
     font-size: @headerFontSize;
   }
   ```

6. Mixin：使用@mixin 定义一段样式，在需要时进行引用并传递参数，实现样式复用。

   ```less
   // Less中使用Mixin的示例代码
   // Mixin定义
   .rounded-corners(@radius) {
     border-radius: @radius;
   }

   // 使用Mixin
   .button {
     background-color: #007bff;
     color: white;
     padding: 10px;
     .rounded-corners(5px);
   }

   .card {
     background-color: #f5f5f5;
     padding: 20px;
     .rounded-corners(10px);
   }
   ```

7. Extend：使用@extend 共享相同的样式规则，不复制样式。

   ```less
   // Less中使用Extend的示例代码
   // 公共样式规则
   .button-common-style {
     background-color: #007bff;
     color: white;
     padding: 10px;
   }

   // 特定按钮样式
   .primary-button {
     &:extend(.button-common-style);
     border: 1px solid #007bff;
   }

   .secondary-button {
     &:extend(.button-common-style);
     border: 1px solid gray;
   }
   ```

8. Loop：没有直接的循环结构，但可以通过递归调用 Mixin 来实现循环效果。

   ```less
   // Less中使用递归Mixin实现类似循环的示例代码
   .looping-mixin(@n) when (@n > 0) {
     .element-@{n} {
       width: 10px * @n;
       height: 10px;
       background-color: red;
       margin: 5px;
     }
     .looping-mixin(@n - 1);
   }
   .looping-mixin(5);
   ```

9. Import：通过@import 导入其他 Less 文件，实现模块化。

   ```less
   // Less中使用@import的示例代码
   // main.less
   @import "variables.less";
   @import "typography.less";
   @import "layout.less";
   ```

## Sass

1. 安装：通过 npm 安装 node-sass。

   ```shell
   npm install node-sass -g
   ```

2. 具有不同的格式选项，保留嵌套格式等。

   ```scss
   // Sass中不同格式选项的示例代码
   // 使用紧凑格式输出CSS
   // 在命令行中设置此选项：node-sass input.scss output.css --output-style compact

   .navbar {
     background-color: #f5f5f5;
     padding: 10px;
     a {
       color: #007bff;
       margin-right: 10px;
       &:hover {
         text-decoration: underline;
       }
     }
   }
   ```

3. 命令行可以指定不同的输出样式。

   ```scss
   // Sass中不同输出样式的示例代码
   // 在命令行中运行以下命令：
   // 1. node-sass input.scss output.css --output-style nested
   // 2. node-sass input.scss output.css --output-style expanded
   // 3. node-sass input.scss output.css --output-style compact
   // 4. node-sass input.scss output.css --output-style compressed

   .navbar {
     background-color: #f5f5f5;
     padding: 10px;
     a {
       color: #007bff;
       margin-right: 10px;
       &:hover {
         text-decoration: underline;
       }
     }
   }
   ```

4. 变量定义：使用$符号定义变量，如$fontSize。

   ```scss
   // Sass中的变量定义示例代码
   $primaryColor: #007bff;
   $fontSize: 16px;

   .header {
     color: $primaryColor;
     font-size: $fontSize;
   }
   ```

5. 其他功能与 Less 类似，包括 Mixin、Extend 和循环（支持 for 循环）。

   ```scss
   // Sass中使用mixin、extend和loop的示例代码
   // 定义Mixin
   @mixin rounded-corners($radius) {
     border-radius: $radius;
   }

   // 使用Mixin
   .button {
     background-color: #007bff;
     color: white;
     padding: 10px;
     @include rounded-corners(5px);
   }

   .card {
     background-color: #f5f5f5;
     padding: 20px;
     @include rounded-corners(10px);
   }

   // Extend
   .button-common-style {
     background-color: #007bff;
     color: white;
     padding: 10px;
   }

   .primary-button {
     @extend .button-common-style;
     border: 1px solid #007bff;
   }

   .secondary-button {
     @extend .button-common-style;
     border: 1px solid gray;
   }

   // Loop (使用for循环)
   @for $i from 1 through 5 {
     .element-#{$i} {
       width: 10px * $i;
       height: 10px;
       background-color: red;
       margin: 5px;
     }
   }
   ```

## CSS预处理器框架

1. `CSS` 预处理器框架是一组按需使用的、别人编写好的 `CSS` 预处理器代码。
2. `sass-compass`、`less-lesshat`、`less-est` 等都是提供现成的 `Mixin` 和样式规则，类似于 `JavaScript` 类库的封装。

## 面试

1. 常见CSS预处理器是 `Less`（基于 `Node.js` ）和 `Sass`（ `Ruby` 有 `Node` 版本）。
2. 预处理器的作用包括：组织 `CSS` 代码、提高代码复用率、提高可维护性。
3. 预处理器的能力包括：嵌套、变量与计算、`Extend` 与 `Mixin`、循环、导入实现 `CSS` 文件模块化。
4. 预处理器的优点是提高代码复用率和可维护性，缺点是需要引入编译过程，有一定的学习成本。
5. 目前预处理器不是唯一的解决方案，可能有其他技术手段可以达到类似的效果，但预处理器仍然是一种有效的 `CSS` 开发工具。
