+++
title = "留言板"
date = "2024-01-01"
+++

## 留言板

欢迎留下你的足迹！

<form id="guestbook-form" class="guestbook-form">
    <input type="text" id="name" placeholder="你的名字" required>
    <input type="email" id="email" placeholder="你的邮箱" required>
    <textarea id="message" placeholder="写下你想说的话..." required></textarea>
    <button type="submit">提交留言</button>
</form>

## 留言列表

<div id="guestbook-entries"></div>