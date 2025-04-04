document.addEventListener('DOMContentLoaded', function(){
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const theme = themeToggle.checked ? 'dark' : 'light';
    //默认主题
    root.classList.add(theme);
    //切换事件
    themeToggle.onclick = function (){

        if (themeToggle.checked) {
            root.classList.remove('light');
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.classList.add(savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }

    //显示当前日期 星期 时间
    function updateTime() {
        //获取元素
        const currentDateElement = document.getElementById('current-date');
        const currentTimeElement = document.getElementById('current-time');
        const now = new Date();
        //获取格式
        const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const weekOptions = {
            weekday: 'long'
        };
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        //改为字符串
        const dateString = now.toLocaleDateString('zh-CN', dateOptions);
        const weekString = now.toLocaleDateString('zh-CN', weekOptions);
        const timeString = now.toLocaleTimeString('zh-CN', timeOptions);
        //在网页上显示元素
        currentDateElement.innerHTML = dateString +'<br/>'+weekString;
        currentTimeElement.textContent = timeString;
    }
    //初始立即调用时间
    updateTime();
    //每秒更新
    setInterval(updateTime, 1000);
    
    //一言
    function fetchHitokoto() {
        fetch('https://v1.hitokoto.cn')
            .then(response => response.json())
            .then(data => {
                document.getElementById('hitokoto_text').innerHTML = data.hitokoto;
                document.getElementById('from_text').innerHTML = data.from;
            })
            .catch(console.error);
    }
    //初始立即调用一言
    fetchHitokoto(); 
    //点击事件
    let times = 0;
    document.getElementById('hitokoto').addEventListener('click', function() {
        if (times === 0) {
            times = 1;
            let index = setInterval(function() {
                times--;
                if (times === 0) {
                    clearInterval(index);
                }
            }, 1000);
            fetchHitokoto();
        } else {
            document.querySelector('.iziToast-wrapper-topCenter').style.display = 'block';
            setTimeout(function() {
                document.querySelector('.iziToast-wrapper-topCenter').style.display = 'none';
            },1000);
        }
    });
});