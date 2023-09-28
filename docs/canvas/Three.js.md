# Three.js

`Three.js` 是一款基于原生 `WebGL` 封装通用 `Web 3D` 引擎

`Three.js` 是一个基于 `WebGL` 的 `JavaScript` 库，它封装了 `WebGL` 的底层细节，提供了更高级的 `API` 和功能，使开发者能够更轻松地创建和展示 `3D` 场景。

`Three.js` 提供了一系列的类和方法，用于创建和操作 `3D` 对象、光照、材质、相机等，简化了 `WebGL` 的开发过程。

**透视相机（PerspectiveCamera）：**

```js
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
scene.add( camera );
```

`PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )`

- `fov` : 摄像机视锥体垂直视野角度。

- `aspect` : 摄像机视锥体长宽比。

- `near` : 摄像机视锥体近端面。

- `far` : 摄像机视锥体远端面。

定义了摄像机的 `viewing frustum`（视锥体）

---

**相机动画(.position和.lookAt())：**

通过相机对象 `Camera` 的 `.position` 属性和 `.lookAt()` 方法，实现一段相机动画。

*相机运动动画*
连续改变相机的位置 `.position` ，就可以获得一个动画效果。

*相机圆周运动*
在渲染循环中，改变相机位置，在XOZ平面上绕着y轴圆周运动。

**执行 `lookAt()` 计算相机视线方向：**

改变 `.position` 属性后，如果不执行 `.lookAt()` 方法，相机的观察方向默认不变。

如果你希望相机圆周运动的同时，改变相机视线方向，保持相机镜头始终指向坐标原点或其它位置，需要每次改变 `.position` 属性后，重新执行一遍 `.lookAt()` 方法

---

`updateProjectionMatrix()` 方法更新相机的投影矩阵

`updateMatrixWorld(true)` 方法更新相机的世界矩阵

**不执行 `.updateMatrixWorld()` ， `.render()` 之后查看矩阵：**

当你改变 `.position` 、 `.scale` 等属性，不执行 `.updateMatrixWorld()` 更新矩阵矩阵，在 `.render` 之后查看本地矩阵和世界矩阵的值，你会发现发生了变化。

这说明 `three.js` 默认情况下，在执行 `.render()` 的时候，会自动获取 `.position` 、 `.scale` 等属性的值，更新模型的本地矩阵、世界矩阵属性

---

**处理片元像素值：**

顶点着色器代码用来计算顶点的坐标，片元着色器代码用来设置片元像素值。

可以用四维向量四个分量表示像素的 `RGBA` 四个分量，比如 `vec4<f32>(1.0, 0.0, 0.0, 1.0)` 表示把片元的元素像素值设置为红色，透明度为1.0。

`vec4(position, 0.0, 1.0)` 是一个向量构造函数，用于创建一个四维向量。(四维向量常用于表示顶点的位置、颜色、纹理坐标)

将 `position` 向量的 `x` 和 `y` 分量作为前两个参数，然后将 `0.0` 和 `1.0` 作为后两个参数。

这样构造出的四维向量表示了一个顶点的位置信息，其中 `x` 和 `y` 分量来自 `position`，而 `z` 和 `w` 分量分别被设置为 `0.0` 和 `1.0`。

---

`attribute vec2 position` 是一个顶点着色器中的属性声明。

它定义了一个名为 `position` 的属性，类型为 `vec2`，表示该属性是一个二维向量，用于表示顶点的位置信息。

在顶点着色器中，我们可以使用这个属性来操作顶点的位置。
