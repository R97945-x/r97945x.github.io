document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    searchBtn.addEventListener('click', function() {
        searchModal.style.display = 'flex';
        searchInput.focus();
    });
    
    closeSearch.addEventListener('click', function() {
        searchModal.style.display = 'none';
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
    
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        if (!query.trim()) {
            searchResults.innerHTML = '';
            return;
        }
        
        fetch('/index.json')
            .then(response => response.json())
            .then(data => {
                const results = data.filter(item => 
                    item.title.toLowerCase().includes(query) ||
                    item.summary.toLowerCase().includes(query)
                );
                
                if (results.length === 0) {
                    searchResults.innerHTML = '<p style="text-align: center; color: #888;">未找到相关内容</p>';
                    return;
                }
                
                searchResults.innerHTML = results.map(item => `
                    <a href="${item.url}">
                        <h4>${item.title}</h4>
                        <p>${item.summary.substring(0, 100)}...</p>
                    </a>
                `).join('');
            })
            .catch(err => {
                console.error('搜索失败:', err);
            });
    });

    // 留言板功能
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookEntries = document.getElementById('guestbook-entries');
    
    // 默认留言
    const defaultGuestbookEntries = [
        { name: '张三', message: '博客做得很棒！继续加油！', date: '2024-01-15' },
        { name: '李四', message: '学习了很多，感谢分享！', date: '2024-01-14' },
        { name: '王五', message: '水墨风格很有特色，点赞！', date: '2024-01-13' }
    ];
    
    // 加载留言
    function loadGuestbookEntries() {
        let entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
        
        // 如果没有保存的留言，使用默认留言
        if (entries.length === 0) {
            entries = defaultGuestbookEntries;
        }
        
        if (guestbookEntries) {
            guestbookEntries.innerHTML = entries.map(entry => `
                <div class="guestbook-entry">
                    <strong>${entry.name}</strong> - ${entry.date}
                    <p style="margin-left: 10px; font-style: italic;">${entry.message}</p>
                </div>
            `).join('');
        }
    }
    
    // 保存留言
    function saveGuestbookEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
        entries.unshift(entry);
        localStorage.setItem('guestbookEntries', JSON.stringify(entries));
    }
    
    // 处理留言表单提交
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            const entry = {
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleDateString('zh-CN')
            };
            
            saveGuestbookEntry(entry);
            loadGuestbookEntries();
            
            // 清空表单
            guestbookForm.reset();
            
            // 显示成功提示
            alert('留言提交成功！');
        });
        
        // 页面加载时显示留言
        loadGuestbookEntries();
    }

    // 心情记录功能
    const moodForm = document.getElementById('mood-form');
    const moodEntries = document.getElementById('mood-entries');
    const emojiBtns = document.querySelectorAll('.emoji-btn');
    const selectedEmoji = document.getElementById('selected-emoji');
    
    // 默认心情记录
    const defaultMoodEntries = [
        { emoji: '😊', content: '今天完成了毕业设计的初稿，感觉很有成就感！', date: '2026-01-15' },
        { emoji: '☕', content: '在图书馆学习了一天，效率很高。晚上和室友一起吃了火锅。', date: '2025-04-14' },
        { emoji: '💻', content: '调试了一整天的代码，终于解决了一个棘手的bug。', date: '2023-11-13' },
        { emoji: '🎓', content: '参加了学院的学术讲座，收获满满。', date: '2023-09-01' },
        { emoji: '🌧️', content: '下雨天适合宅在宿舍看书，今天读了一本很有意思的技术书籍。', date: '2023-09-21' }
    ];
    
    // 选择表情按钮
    emojiBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            emojiBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedEmoji.value = this.dataset.emoji;
        });
    });
    
    // 加载心情记录
    function loadMoodEntries() {
        let entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
        
        // 如果没有保存的心情记录，使用默认记录
        if (entries.length === 0) {
            entries = defaultMoodEntries;
        }
        
        if (moodEntries) {
            moodEntries.innerHTML = entries.map(entry => `
                <div class="mood-entry">
                    <span class="mood-emoji">${entry.emoji}</span>
                    <span class="mood-date">${entry.date}</span>
                    <p>${entry.content}</p>
                </div>
            `).join('');
        }
    }
    
    // 保存心情记录
    function saveMoodEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
        entries.unshift(entry);
        localStorage.setItem('moodEntries', JSON.stringify(entries));
    }
    
    // 处理心情表单提交
    if (moodForm) {
        moodForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emoji = selectedEmoji.value;
            const content = document.getElementById('mood-content').value;
            
            const entry = {
                emoji: emoji,
                content: content,
                date: new Date().toLocaleDateString('zh-CN')
            };
            
            saveMoodEntry(entry);
            loadMoodEntries();
            
            // 清空表单
            moodForm.reset();
            selectedEmoji.value = '😊';
            emojiBtns.forEach(b => b.classList.remove('selected'));
            
            // 显示成功提示
            alert('心情记录成功！');
        });
        
        // 页面加载时显示心情记录
        loadMoodEntries();
    }

    // 图片懒加载功能
    function initLazyLoad() {
        const lazyImages = document.querySelectorAll('img.lazy');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove('lazy');
                        observer.unobserve(image);
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.1
            });
            
            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // 降级方案：不支持 IntersectionObserver 时直接加载所有图片
            lazyImages.forEach(image => {
                image.src = image.dataset.src;
                image.classList.remove('lazy');
            });
        }
    }
    
    initLazyLoad();
});