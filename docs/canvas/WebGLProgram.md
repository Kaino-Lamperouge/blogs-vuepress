# WebGLProgram

**WebGLProgram** 是 `WebGL API` 的一部分，它由两个 `WebGLShaders`（`webgl` 着色器）组成

分别为顶点着色器和片元着色器（两种着色器都是采用 `GLSL` 语言编写的）

```html
  // 顶点着色器
  <script id="vertexShader" type="x-shader/x-vertex"></script>
  // 片元着色器
  <script id="fragmentShader" type="x-shader/x-fragment"></script>
```

这两个着色器对象用于处理图形的不同阶段。

创建一个 **WebGLProgram** 需要调用 `GL` 上下文的 `createProgram()` 方法，调用 `attachShader()` 方法附加上着色器，将它们连接到一个可用的程序

```js
var program = gl.createProgram();

// 添加预先存在的着色器
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  var info = gl.getProgramInfoLog(program);
  throw "WebGL program 不能编译。\n\n" + info;
}
```

---
`WebGLRenderingContext.createProgram()` 用于创建和初始化一个 **WebGLProgram** 对象

---

`WebGLRenderingContext.attachShader(program, shader)` 负责往 **WebGLProgram** 添加一个片段或者顶点着色器

- `program` : 一个 **WebGLProgram** 对象
- `shader` : 一个类型为片段或者顶点的 `WebGLShader`（ `webgl` 着色器）

---

`WebGLRenderingContext.linkProgram(program)` 链接给定的 **WebGLProgram**，从而完成为程序的片元和顶点着色器准备 `GPU` 代码的过程

`WebGLRenderingContext.getProgramParameter(program, pname)` 返回 **WebGLProgram** 的信息

- `pname`: 指定要查询的信息的 `Glenum (en-US)`
  - `gl.LINK_STATUS` 返回一个 `GLboolean (en-US)` ，指示上次链接操作是否成功。
  - `gl.DELETE_STATUS` 返回一个 `GLboolean (en-US)` ，指示程序是否被标记为要删除。
  - `gl.VALIDATE_STATUS` 返回一个 `GLboolean (en-US)` ，指示上次验证操作是否成功。
  - `gl.ATTACHED_SHADERS` 返回一个 `GLboolean (en-US)` ，指示程序所附着着色器的数量。
  - `gl.ACTIVE_ATTRIBUTES` 返回一个 `GLboolean (en-US)` ，指示程序活动属性变量的数目。
  - `gl.ACTIVE_UNIFORMS` 返回一个 `GLboolean (en-US)` ，指示程序中活动的统一变量的数量。
  
  (当使用 WebGL 2 context)
  - `gl.TRANSFORM_FEEDBACK_BUFFER_MODE` 返回一个 `GLboolean (en-US)` ，表示转换反馈激活时的缓冲区模式。
  - `gl.TRANSFORM_FEEDBACK_VARYINGS` 返回一个 `GLboolean (en-US)` ，指示在转换反馈模式中要捕获的可变变量的数量。
  - `gl.ACTIVE_UNIFORM_BLOCKS` 返回一个 `GLboolean (en-US)` ，指示包含活动制服的统一块的数量。

---

`WebGLRenderingContext.getProgramInfoLog(program)` 返回参数中指定的 **WebGLProgram** `object` 的信息。这些信息包括在 `linking` 过程中的错误以及 **WebGLProgram** `objects` 合法性检查的错误

---

`WebGLRenderingContext.createBuffer()` 创建并初始化一个用于储存顶点数据或着色数据的 **WebGLBuffer** 对象

---

`WebGLRenderingContext.bindBuffer(target, buffer)` 将给定的 **WebGLBuffer** 绑定到目标

- `target` : `GLenum (en-US)` 指定绑定点 `(target)`
  - `gl.ARRAY_BUFFER` : 包含顶点属性的 `Buffer` ，如顶点坐标，纹理坐标数据或顶点颜色数据。
  - `gl.ELEMENT_ARRAY_BUFFER` : 用于元素索引的 `Buffer` 。
  
  (当使用 WebGL 2 context)
  - `gl.COPY_READ_BUFFER` : 从一个 `Buffer` 对象复制到另一个 `Buffer` 对象。
  - `gl.COPY_WRITE_BUFFER` : 从一个 `Buffer` 对象复制到另一个 `Buffer` 对象。
  - `gl.TRANSFORM_FEEDBACK_BUFFER` : 用于转换反馈操作的缓冲区。
  - `gl.UNIFORM_BUFFER` : 用于存储统一块的 `Buffer` 。
  - `gl.PIXEL_PACK_BUFFER` : 用于像素传输操作的 `Buffer` 。
  - `gl.PIXEL_UNPACK_BUFFER` : 用于像素传输操作的 `Buffer` 。
  
- `buffer` : 要绑定的 **WebGLBuffer** 。

---

`WebGLRenderingContext.bufferData(target, size, usage)` 创建并初始化了 `Buffer` 对象的数据存储区

- `size` : `GLsizeiptr (en-US)` 设定 `Buffer` 对象的数据存储区大小。

- `srcData` (可选) : 一个`ArrayBuffer`，`SharedArrayBuffer` 或者 `ArrayBufferView` 类型的数组对象，将被复制到 `Buffer` 的数据存储区。如果为 `null` ，数据存储区仍会被创建，但是不会进行初始化和定义。

- `usage` : `GLenum (en-US)` 指定数据存储区的使用方法。

  - `gl.STATIC_DRAW` : 缓冲区的内容可能经常使用，而不会经常更改。内容被写入缓冲区，但不被读取。
（数据被写入缓冲区，但不会被直接读取。当数据被写入缓冲区时，它被保存在内存中，以备将来使用。这意味着数据可以被其他部分的程序读取和处理，而不必再次从源获取数据。而不被读取的意思是，程序当前不需要读取缓冲区中的数据，但可以在以后的某个时候读取。）
  - `gl.DYNAMIC_DRAW` : 缓冲区的内容可能经常被使用，并且经常更改。内容被写入缓冲区，但不被读取。
  - `gl.STREAM_DRAW` : 缓冲区的内容可能不会经常使用。内容被写入缓冲区，但不被读取。
  
  (当使用 WebGL 2 context)
  - `gl.STATIC_READ` : 缓冲区的内容可能经常使用，而不会经常更改。内容从缓冲区读取，但不写入。
  - `gl.DYNAMIC_READ` : 缓冲区的内容可能经常使用，并且经常更改。内容从缓冲区读取，但不写入。
  - `gl.STREAM_READ` : 缓冲区的内容可能不会经常使用。内容从缓冲区读取，但不写入。
  - `gl.STATIC_COPY` : 缓冲区的内容可能经常使用，而不会经常更改。用户不会从缓冲区读取内容，也不写入。
  - `gl.DYNAMIC_COPY` : 缓冲区的内容可能经常使用，并且经常更改。用户不会从缓冲区读取内容，也不写入。
  - `gl.STREAM_COPY` : 缓冲区的内容可能不会经常使用。用户不会从缓冲区读取内容，也不写入。

- `srcOffset` : `GLuint (en-US)` 指定读取缓冲时的初始元素索引偏移量。

- `length` (可选) : `GLuint (en-US)` 默认为 `0`

---

`WebGLRenderingContext.vertexAttribPointer(index, size, type, normalized, stride, offset)` 绑定当前缓冲区范围到 `gl.ARRAY_BUFFER` ，成为当前顶点缓冲区对象的通用顶点属性并指定它的布局 (缓冲区对象中的偏移量)

告诉显卡从当前绑定的缓冲区（bindBuffer() 指定的缓冲区）中读取顶点数据

- `index` : 指定要修改的顶点属性的索引。

- `size` : 指定每个顶点属性的组成数量，必须是 1，2，3 或 4。

- `type` : 指定数组中每个元素的数据类型

  - `gl.BYTE` : 有符号的 8 位整数，范围 [-128, 127]
  - `gl.SHORT` : 有符号的 16 位整数，范围 [-32768, 32767]
  - `gl.UNSIGNED_BYTE`: 无符号的 8 位整数，范围 [0, 255]
  - `gl.UNSIGNED_SHORT` : 无符号的 16 位整数，范围 [0, 65535]
  - `gl.FLOAT` : 32 位 IEEE 标准的浮点数

  (当使用 WebGL 2 context)
  - `gl.HALF_FLOAT` : 16 位 IEEE 标准的浮点数

- `normalized` : 当转换为浮点数时是否应该将整数数值归一化到特定的范围。

  - 对于类型 `gl.BYTE` 和 `gl.SHORT` ，如果是 true 则将值归一化为 [-1, 1]
  - 对于类型 `gl.UNSIGNED_BYTE` 和 `gl.UNSIGNED_SHORT` ，如果是 true 则将值归一化为 [0, 1]
  - 对于类型 `gl.FLOAT` 和 `gl.HALF_FLOAT` ，此参数无效

`stride` : 一个 `GLsizei (en-US)` ，以字节为单位指定连续顶点属性开始之间的偏移量 (即数组中一行长度)。不能大于 255。如果 `stride` 为 0，则假定该属性是紧密打包的，即不交错属性，每个属性在一个单独的块中，下一个顶点的属性紧跟当前顶点之后。

`offset` : `GLintptr (en-US)` 指定顶点属性数组中第一部分的字节偏移量。必须是类型的字节长度的倍数。

---

`WebGLRenderingContext.enableVertexAttribArray(index)` 打开属性数组列表中指定索引处的通用顶点属性数组

- `index` : 类型为 `GLuint (en-US)` 的索引，指向要激活的顶点属性。如果您只知道属性的名称，不知道索引，可以使用以下方法来获取索引 `getAttribLocation()`

`WebGL` 使用 `attributes` 来存储作用于顶点的数据。这些数据包含在 `JavaScript` 代码中，并且只能在 `JavaScript` 代码和顶点着色器中使用。当我们想要在顶点着色器中使用这些数据时，我们需要将其存储在 `attributes` 中。

每个 `attribute` 都有一个索引号，这个索引号用来引用在 `GPU` 中维护的属性列表中的相应数据。在不同的平台或 `GPU` 上，某些顶点属性索引可能具有预定义的值。这意味着在不同的硬件或平台上，使用相同的索引号来引用属性可能会导致不同的结果。

当我们创建一个 `attribute` 时， `WebGL` 层会为其分配一个属性索引号，以便我们可以使用它来引用属性数据。这个索引号是动态分配的，可以在运行时更改。

无论怎样，都需要你使用 `enableVertexAttribArray()` 方法，来激活每一个属性以便使用，不被激活的属性是不会被使用的。

一旦激活，以下其他方法就可以获取到属性的值了，包括 `vertexAttribPointer()` 、`vertexAttrib*()` 和 `getVertexAttrib() (en-US)` 。

---

`WebGLRenderingContext.vertexAttrib[1234]f[v]()` 为顶点 `attibute` 变量赋值

```js
void gl.vertexAttrib1f(index, v0);
void gl.vertexAttrib2f(index, v0, v1);
void gl.vertexAttrib3f(index, v0, v1, v2);
void gl.vertexAttrib4f(index, v0, v1, v2, v3);

void gl.vertexAttrib1fv(index, value);
void gl.vertexAttrib2fv(index, value);
void gl.vertexAttrib3fv(index, value);
void gl.vertexAttrib4fv(index, value);
```

- `index` : `GLuint (en-US)` 类型，指定了待修改顶点 `attribute` 变量的存储位置。

- `v0, v1, v2, v3` : 浮点数类型 `Number` ，用于设置顶点 `attibute` 变量的各分量值。

- `value` : `Float32Array` 类型，用于设置顶点 `attibute` 变量的向量值。

---

`WebGLRenderingContext.getVertexAttrib(index, pname)` 在给定位置返回关于顶点属性的信息

- `index` : 指定顶点属性索引的 `GLuint` 类型

- `pname` : 指定要查询的信息的 `GLenum`

  - `gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING` : 返回当前绑定的 **WebGLBuffer**

  - `gl.VERTEX_ATTRIB_ARRAY_ENABLED` : 如果在此索引处启用了顶点属性，则返回一个为 `true` 的 `GLboolean` 。否则错误。

  - `gl.VERTEX_ATTRIB_ARRAY_SIZE` : 返回一个指示顶点数组中元素大小的 `GLint` 。

  - `gl.VERTEX_ATTRIB_ARRAY_STRIDE` : 返回一个 `GLint` ，指示数组中连续元素之间的字节数。 `0` 表示元素是连续的。

  - `gl.VERTEX_ATTRIB_ARRAY_TYPE` : 返回一个表示数组类型的 `GLenum` 。
    - `gl.BYTE`
    - `gl.UNSIGNED_BYTE`
    - `gl.SHORT`
    - `gl.UNSIGNED_SHORT`
    - `gl.FLOAT`
  - `gl.VERTEX_ATTRIB_ARRAY_NORMALIZED` : 如果定点数据类型为给定索引处的顶点属性数组规范化，则返回一个为 `true` 的 `GLboolean` 。

  - `gl.CURRENT_VERTEX_ATTRIB` : 返回一个 `Float32Array` (包含4个元素)，表示给定索引处顶点属性的当前值。

  (当使用 WebGL 2 context)

  - `gl.VERTEX_ATTRIB_ARRAY_INTEGER` : 返回一个 `GLboolean` ，指示给定索引处的顶点属性数组中是否存在整数数据类型。

  - `gl.VERTEX_ATTRIB_ARRAY_DIVISOR` : 返回一个描述用于实例渲染的频率除数的 `GLint` 。

  当使用 `ANGLE_instanced_arrays` 扩展时:

  - `ext.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE` : 返回一个描述用于实例渲染的频率除数的 `GLint` 。

---

`WebGLRenderingContext.enable(cap)` 对该上下文开启某种特性

- `cap` : 让 WebGL 开启某种特性

  - `gl.BLEND` : 激活片元的颜色融合计算。参见 WebGLRenderingContext.blendFunc().
  - `gl.CULL_FACE` : 激活多边形正反面剔除。参见WebGLRenderingContext.cullFace().
  - `gl.DEPTH_TEST` : 激活深度比较，并且更新深度缓冲区。参见WebGLRenderingContext.depthFunc().
  - `gl.DITHER` : 激活在写入颜色缓冲区之前，抖动颜色成分。
  - `gl.POLYGON_OFFSET_FILL` : 激活添加多边形片段的深度值偏移。参见WebGLRenderingContext.polygonOffset().
  - `gl.SAMPLE_ALPHA_TO_COVERAGE` : 激活通过 alpha 值决定的临时覆盖值计算。（抗锯齿）
  - `gl.SAMPLE_COVERAGE` : 激活使用临时覆盖值，位和运算片段的覆盖值。参见 WebGLRenderingContext.sampleCoverage() (en-US).
  - `gl.SCISSOR_TEST` : 激活剪裁测试，即丢弃在剪裁矩形范围外的片段。WebGLRenderingContext.scissor().
  - `gl.STENCIL_TEST` : 激活模板测试并且更新模板缓冲区。参见WebGLRenderingContext.stencilFunc() (en-US).

  (当使用 WebGL 2 context)
  - `gl.RASTERIZER_DISCARD` : 图元光栅化阶段之前，但在任意的 `transform` 反馈之后，就立刻被丢弃。`gl.clear()` 命令被忽略。

---

`WebGLRenderingContext.viewport(x, y, width, height)` 用来设置视口，即指定从标准设备到窗口坐标的 x、y 仿射变换

- `x` : 用来设定视口的左下角水平坐标 默认值：`0`

- `y` : 用来设定视口的左下角垂直坐标 默认值：`0`
  
- `width` : 非负数，用来设定视口的宽度。默认值：`canvas` 的宽度
  
- `height` : 非负数，用来设定视口的高度。默认值：`canvas` 的高度
  
---

`WebGLRenderingContext.uniform[1234][fi][v]()` 指定 `uniform` 变量的值

所有在 `ShaderProgram` 对象中定义的，且激活的 `uniform` 变量在 `ShaderProgram` 执行 `link` 成功后被初始化为 `0`

它们将保留通过调用此方法分配给它们的值，直到再次将其初始化为 `0` 时，也就是 `ShaderProgram` 对象上发生下一次成功的 `link` 操作为止

```js
void gl.uniform1f(location, v0);
void gl.uniform1fv(location, value);
void gl.uniform1i(location, v0);
void gl.uniform1iv(location, value);

void gl.uniform2f(location, v0, v1);
void gl.uniform2fv(location, value);
void gl.uniform2i(location, v0, v1);
void gl.uniform2iv(location, value);

void gl.uniform3f(location, v0, v1, v2);
void gl.uniform3fv(location, value);
void gl.uniform3i(location, v0, v1, v2);
void gl.uniform3iv(location, value);

void gl.uniform4f(location, v0, v1, v2, v3);
void gl.uniform4fv(location, value);
void gl.uniform4i(location, v0, v1, v2, v3);
void gl.uniform4iv(location, value);
```

- `location` : `WebGLUniformLocation` 对象包含了将要修改的 `uniform` 属性位置

- `value, v0, v1, v2, v3` : 新的值将被用于 `uniform` 变量
  
  - 浮点值 `Number` (方法名跟" `f` ")
  - 浮点数组 (例如 `Float32Array` 或 `Array` 的数组) 用于浮点型向量方法 (方法名跟 " `fv` ")
  - 整型值 `Number` (方法名跟" `i` ")
  - 整型数组 `Int32Array` 用于整型向量方法 (方法名跟 " `iv` ")

---

`WebGLRenderingContext.createShader(type)` 创建一个 `WebGLShader` 着色器对象，该对象可以使用 `WebGLRenderingContext.shaderSource()` 和 `WebGLRenderingContext.compileShader()` 方法配置着色器代码

- `type` : 参数为 `gl.VERTEX_SHADER` 或 `gl.FRAGMENT_SHADER` 两者中的一个

---

`WebGLRenderingContext.shaderSource(shader, source)` 设置 `WebGLShader` 着色器（顶点着色器及片元着色器）的 `GLSL` 程序代码

- `shader` : 用于设置程序代码的 `WebGLShader`（着色器对象）
  
- `source` : 包含 `GLSL` 程序代码的字符串

---

`WebGLRenderingContext.compileShader(shader)` 用于编译一个 `GLSL` 着色器，使其成为为二进制数据，然后就可以被 `WebGLProgram` 对象所使用

- `shader` : 一个片元或顶点着色器（ `WebGLShader` ）
  
```js
var shader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(shader, shaderSource);
gl.compileShader(shader);
```

---

`WebGLRenderingContext.getShaderParameter(shader, pname)` 返回给定的着色器信息

- `shader` : 需要获取信息的着色器对象

- `pname` : 指定要查询的信息属性名称
  - `gl.DELETE_STATUS` : 标示着色器是否被删除，删除（ `GL_TRUE` ）未删除（ `GL_FALSE` ）
  - `gl.COMPILE_STATUS` : 标示着色器是否编译成功，是（`GL_TRUE` ）不是（ `GL_FALSE` ）
  - `gl.SHADER_TYPE` : 标示着色器类型，是顶点着色器 ( `gl.VERTEX_SHADER` ) 还是片段着色器 ( `gl.FRAGMENT_SHADER` )

---

`WebGLRenderingContext.getShaderInfoLog(shader, maxLength, *length, *infoLog)` 返回着色器对象的信息日志

- `shader` : 指定要查询其信息日志的着色器对象
  
- `maxLength` : 指定用于存储返回信息日志的字符缓冲区的大小
  
- `shader` : 返回 `infoLog` 中返回的字符串的长度(不包括空终止符)
  
- `shader` : 指定用于返回信息日志的字符数组
  
---

`WebGLRenderingContext.getAttribLocation(program, name)` 返回了给定 `WebGLProgram` 对象中某属性的下标指向位置

- `program` : 一个包含了属性参数的 `WebGLProgram` 对象

- `name` : 需要获取下标指向位置的 `DOMString` 属性参数名
  
返回值 : 表明属性位置的下标 `GLint` 数字，如果找不到该属性则返回 `-1`

---

`WebGLRenderingContext.getUniformLocation(program, name)` 返回统一变量的位置

- `program` : 指定要查询的程序对象

- `name` : 指向一个以空结尾的字符串，该字符串包含要查询其位置的统一变量的名称

---

`WebGLRenderingContext.useProgram(program)` 将定义好的 `WebGLProgram` 对象添加到当前的渲染状态中

- `program` : 需要添加的 `WebGLProgram` 对象

---

`WebGLRenderingContext.drawArrays(mode, first, count)` 从向量数组中绘制图元

- `mode` : `GLenum (en-US)` 类型，指定绘制图元的方式
  
  - `gl.POINTS` : 绘制一系列点
  - `gl.LINE_STRIP` : 绘制一个线条。即，绘制一系列线段，上一点连接下一点
  - `gl.LINE_LOOP` : 绘制一个线圈。即，绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连
  - `gl.LINES` : 绘制一系列单独线段。每两个点作为端点，线段之间不连接
  - `gl.TRIANGLE_STRIP` : 绘制一个三角带
  - `gl.TRIANGLE_FAN` : 绘制一个三角扇
  - `gl.TRIANGLES` : 绘制一系列三角形。每三个点作为顶点
  
- `first` : `GLenum (en-US)` 类型，指定从哪个点开始绘制
  
- `count` : `GLenum (en-US)` 类型，指定绘制需要使用到多少个点
