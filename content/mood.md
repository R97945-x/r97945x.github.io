+++
title = "心情记录"
date = "2024-01-01"
+++

## 记录今日心情

<div class="mood-form">
    <form id="mood-form">
        <div class="emoji-picker">
            <span class="emoji-label">选择心情：</span>
            <button type="button" class="emoji-btn" data-emoji="😊">😊</button>
            <button type="button" class="emoji-btn" data-emoji="😄">😄</button>
            <button type="button" class="emoji-btn" data-emoji="🥰">🥰</button>
            <button type="button" class="emoji-btn" data-emoji="😎">😎</button>
            <button type="button" class="emoji-btn" data-emoji="🤔">🤔</button>
            <button type="button" class="emoji-btn" data-emoji="😢">😢</button>
            <button type="button" class="emoji-btn" data-emoji="😤">😤</button>
            <button type="button" class="emoji-btn" data-emoji="🤪">🤪</button>
            <button type="button" class="emoji-btn" data-emoji="💪">💪</button>
            <button type="button" class="emoji-btn" data-emoji="☕">☕</button>
            <button type="button" class="emoji-btn" data-emoji="💻">💻</button>
            <button type="button" class="emoji-btn" data-emoji="🎓">🎓</button>
        </div>
        <input type="hidden" id="selected-emoji" name="emoji" value="😊">
        <textarea id="mood-content" placeholder="写下今天的心情..." required></textarea>
        <button type="submit">记录心情</button>
    </form>
</div>

## 心情日记

<div id="mood-entries">
    <div class="mood-entry">
        <span class="mood-emoji">😊</span>
        <span class="mood-date">2026-01-15</span>
        <p>今天完成了毕业设计的初稿，感觉很有成就感！</p>
    </div>

    <div class="mood-entry">
        <span class="mood-emoji">☕</span>
        <span class="mood-date">2025-04-14</span>
        <p>在图书馆学习了一天，效率很高。晚上和室友一起吃了火锅。</p>
    </div>

    <div class="mood-entry">
        <span class="mood-emoji">💻</span>
        <span class="mood-date">2023-11-13</span>
        <p>调试了一整天的代码，终于解决了一个棘手的bug。</p>
    </div>

    <div class="mood-entry">
        <span class="mood-emoji">🎓</span>
        <span class="mood-date">2023-09-01</span>
        <p>参加了学院的学术讲座，收获满满。</p>
    </div>

    <div class="mood-entry">
        <span class="mood-emoji">🌧️</span>
        <span class="mood-date">2023-09-21</span>
        <p>下雨天适合宅在宿舍看书，今天读了一本很有意思的技术书籍。</p>
    </div>
</div>