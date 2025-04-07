---
title: Team
nav:
  order: 2
  tooltip: About our team
---

## Team

{% include section.html %}

### Principal Investigator
{% include list.html data="members" component="portrait" filters="role: pi" %}

{% include section.html %}

### Students
{% include list.html data="members" component="portrait" filters="role: student, status: active" %}

{% include section.html %}



<style>
.photo-carousel {
    overflow: hidden;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
}
.carousel-track {
    display: flex;
    animation: scroll 40s linear infinite;
    gap: 20px;
    padding: 20px 0;
}
@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
.carousel-nav {
    text-align: center;
    padding: 10px;
}
.dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ccc;
    margin: 0 5px;
    cursor: pointer;
}
.dot.active {
    background: #666;
}
</style>

<div class="photo-carousel">
    <div class="carousel-track">
        <!-- 2024 照片 -->
        <img src="../images/lab-photo-2024.jpg" style="height: 300px; width: auto;">
        <img src="../images/lab-photo2024.png" style="height: 300px; width: auto;">
        <img src="../images/lab-photo2024-2.png" style="height: 300px; width: auto;">
        <img src="../images/lab-photo-2024-3.png" style="height: 300px; width: auto;">
        
        <!-- 2023 照片 -->
        <img src="../images/lab-photo-2023.PNG" style="height: 300px; width: auto;">
        
        <!-- 复制图片实现无缝循环 -->
        <img src="../images/lab-photo-2024.jpg" style="height: 300px; width: auto;">
        <img src="../images/lab-photo2024.png" style="height: 300px; width: auto;">
        <img src="../images/lab-photo2024-2.png" style="height: 300px; width: auto;">
        <img src="../images/lab-photo-2024-3.png" style="height: 300px; width: auto;">
        <img src="../images/lab-photo-2023.PNG" style="height: 300px; width: auto;">
    </div>
    
</div>

#### Alumni

{% include list.html data="members" component="portrait" filters="status: alumni" %}

{% capture content %}

{% endcapture %}

{% include grid.html style="square" content=content %}
