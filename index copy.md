---
---
Welcome to the Robot Interaction and Manipulation Lab! 
<!-- We strive to advance the field of Embodied AI by developing cutting-edge tactile sensing technologies and pioneering new human-robot interaction paradigms. Our goal is to empower robots to perform complex manipulation tasks in unstructured real-world environments. -->

欢迎来到上海科技大学机器人交互与操作实验室！

研究主题：视触觉结合感知、灵巧手操作、触觉传感器、具身数据采集与合成、遥操作
## 🚀 Research

<style>
.photo-vertical {
    max-width: 1200px;
    margin: 0 auto;
    padding: 8px 12px;
}
.vertical-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
}
.paper-card {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    border: 1px solid #eee;
    padding: 12px;
    border-radius: 8px;
    background: #fff;
}
.paper-card img {
    height: 150px;
    width: auto;
    border-radius: 6px;
    object-fit: cover;
}
.paper-meta {
    display: flex;
    flex-direction: column;
}
.paper-title {
    font-weight: 700;
    margin-bottom: 6px;
    font-size: 16px;
}
.paper-authors {
    color: #333;
    margin-bottom: 8px;
}
.paper-links a {
    color: #0a66c2;
    text-decoration: none;
    margin-right: 12px;
}
.paper-links a:hover { text-decoration: underline; }

/* Small screens: keep single column (vertical) */
@media (max-width: 600px) {
    .paper-card { flex-direction: row; }
    .paper-card img { height: 120px; }
}

/* Optional: a two-column grid on wide screens (unobtrusive) */
@media (min-width: 1100px) {
    .vertical-list { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
}
</style>

<div class="photo-vertical">
    <div class="vertical-list">
        <!-- Paper / image card 1 -->
        <article class="paper-card">
            <img src="../images/bimanual.jpg" alt="Bimanual platform">
            <div class="paper-meta">
                <div class="paper-title">双手机器人协同操作平台</div>
                <div class="paper-authors">Author: Xiao et al.</div>
                <div class="paper-links">
                    <a href="https://arxiv.org/abs/XXXX.XXXXX" target="_blank" rel="noopener">arXiv</a>
                    <a href="/projects/bimanual" >Project</a>
                </div>
            </div>
        </article>

        <!-- Paper / image card 2 -->
        <article class="paper-card">
            <img src="../images/biotac.jpg" alt="Biotac array">
            <div class="paper-meta">
                <div class="paper-title">仿生触觉传感器阵列</div>
                <div class="paper-authors">Author: Zhang, Li, Xiao</div>
                <div class="paper-links">
                    <a href="https://arxiv.org/abs/YYYY.YYYYY" target="_blank" rel="noopener">arXiv</a>
                    <a href="/projects/biotac" >Project</a>
                </div>
            </div>
        </article>

        <!-- Paper / image card 3 -->
        <article class="paper-card">
            <img src="../images/tactileperception.jpg" alt="Tactile perception scene">
            <div class="paper-meta">
                <div class="paper-title">触觉感知实验场景</div>
                <div class="paper-authors">Author: Wang, Chen, Xiao</div>
                <div class="paper-links">
                    <a href="https://arxiv.org/abs/ZZZZ.ZZZZZ" target="_blank" rel="noopener">arXiv</a>
                    <a href="/projects/tactile" >Project</a>
                </div>
            </div>
        </article>

        <!-- Add more cards by copying a single <article class="paper-card"> block and updating the image/title/authors/links -->
    </div>
</div>
        <img src="../images/biotac.jpg" alt="仿生触觉传感器阵列">
        <div class="photo-details">
            <p class="title">仿生触觉传感器阵列</p>
            <p class="author">作者：王五, 赵六</p>
            <p class="arxiv-link">
                <a href="https://arxiv.org/abs/yyyy.yyyy" target="_blank">arXiv: yyyy.yyyy</a>
            </p>
        </div>
    </div>

    <div class="photo-item">
        <img src="../images/tactileperception.jpg" alt="触觉感知实验场景">
        <div class="photo-details">
            <p class="title">触觉感知实验场景</p>
            <p class="author">作者：钱七, 孙八</p>
            <p class="arxiv-link">
                <a href="https://arxiv.org/abs/zzzz.zzzz" target="_blank">arXiv: zzzz.zzzz</a>
            </p>
        </div>
    </div>

    <div class="photo-item">
        <img src="../images/another_image.jpg" alt="另一个项目的图片">
        <div class="photo-details">
            <p class="title">另一个研究项目的标题</p>
            <p class="author">作者：周九, 吴十</p>
            <p class="arxiv-link">
                <a href="https://arxiv.org/abs/aaaa.aaaa" target="_blank">arXiv: aaaa.aaaa</a>
            </p>
        </div>
    </div>
</div>

<div class="photo-carousel">
    <div class="carousel-track">
        <!-- 2024 照片 -->
        <figure>
            <img src="../images/bimanual.jpg" style="height: 300px; width: auto;">
            <figcaption>双手机器人协同操作平台</figcaption>
        </figure>
        <figure>
            <img src="../images/biotac.jpg" style="height: 300px; width: auto;">
            <figcaption>仿生触觉传感器阵列</figcaption>
        </figure>
        <figure>
            <img src="../images/tactileperception.jpg" style="height: 300px; width: auto;">
            <figcaption>触觉感知实验场景</figcaption>
        </figure>
        
        <!-- 复制图片实现无缝循环 -->
        <figure>
            <img src="../images/bimanual.jpg" style="height: 300px; width: auto;">
            <figcaption>双手机器人协同操作平台</figcaption>
        </figure>
        <figure>
            <img src="../images/biotac.jpg" style="height: 300px; width: auto;">
            <figcaption>仿生触觉传感器阵列</figcaption>
        </figure>
        <figure>
            <img src="../images/tactileperception.jpg" style="height: 300px; width: auto;">
            <figcaption>触觉感知实验场景</figcaption>
        </figure>
    </div>
</div>

{% include section.html %}

## ☎️ Contact Details
📧 Email: [xiaochx[at]shanghaitech.edu.cn] ｜
📍 Address: SIST 1D-303, ShanghaiTech University, 393 Middle Huaxia Road


