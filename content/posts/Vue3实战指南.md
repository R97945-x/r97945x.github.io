+++
date = '2026-05-08T09:00:00+08:00'
draft = false
title = 'Vue 3 实战指南：Composition API 深度解析'
image = 'https://picsum.photos/800/600?random=5'
+++

## 引言

Vue 3 引入了全新的 Composition API，相比 Options API，它提供了更好的代码组织和逻辑复用能力。在这篇文章中，我将分享我在项目中使用 Composition API 的经验和心得。

<!--more-->

## Composition API vs Options API

### Options API 的问题

传统的 Options API 存在一些痛点：

1. **代码分散**：相关逻辑分散在不同的选项中
2. **复用困难**：难以提取可复用的逻辑
3. **类型推断**：TypeScript 支持不够好

### Composition API 的优势

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const count = ref(0)
const name = ref('梁强欢')

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log('组件挂载完成')
})
</script>
```

## 核心响应式 API

### ref 和 reactive

```javascript
import { ref, reactive } from 'vue'

// ref 用于基本类型
const count = ref(0)
console.log(count.value) // 0

// reactive 用于对象
const state = reactive({
  name: '张三',
  age: 20
})
console.log(state.name) // '张三'
```

### computed 计算属性

```javascript
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

const fullName = computed(() => {
  return `${firstName.value}${lastName.value}`
})

// 可写的计算属性
const fullName2 = computed({
  get: () => `${firstName.value}${lastName.value}`,
  set: (newValue) => {
    const [first, last] = newValue.split('')
    firstName.value = first
    lastName.value = last
  }
})
```

### watch 和 watchEffect

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)

// watch 监听特定数据源
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})

// 监听多个数据源
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('count 或 name 变化了')
})

// watchEffect 自动追踪依赖
watchEffect(() => {
  console.log(`当前 count 值: ${count.value}`)
})
```

## 组合式函数 (Composables)

### 创建可复用的组合式函数

```javascript
// useMousePosition.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function updatePosition(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', updatePosition)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updatePosition)
  })

  return { x, y }
}
```

### 使用组合式函数

```vue
<script setup>
import { useMousePosition } from './useMousePosition'

const { x, y } = useMousePosition()
</script>

<template>
  <div>鼠标位置: {{ x }}, {{ y }}</div>
</template>
```

## 实战案例：用户登录状态管理

```javascript
// useAuth.js
import { ref, computed } from 'vue'

const isLoggedIn = ref(false)
const user = ref(null)

export function useAuth() {
  const login = (userData) => {
    user.value = userData
    isLoggedIn.value = true
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
      isLoggedIn.value = true
    }
  }

  return {
    isLoggedIn,
    user,
    login,
    logout,
    initAuth
  }
}
```

## 性能优化技巧

### shallowRef 和 triggerRef

```javascript
import { shallowRef, triggerRef } from 'vue'

// shallowRef 只监听引用变化
const state = shallowRef({ count: 0 })

// 修改内部属性不会触发更新
state.value.count++

// 需要手动触发更新
triggerRef(state)
```

### markRaw

```javascript
import { markRaw, ref } from 'vue'

// 标记不需要响应式处理的对象
const logo = markRaw(new Image())

const image = ref(logo)
```

## 总结

Composition API 为 Vue 3 带来了更灵活的代码组织方式，通过组合式函数可以实现逻辑的高度复用。掌握这些核心 API，可以让我们写出更清晰、更易于维护的代码。

> 学习是一个持续的过程，保持好奇心，不断探索！

---

*本文首发于我的博客，转载请注明出处。*