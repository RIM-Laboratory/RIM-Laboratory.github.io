---
title: Team
nav:
  order: 3
  tooltip: About our team
---

## Team

{% include section.html %}

{% include list.html data="members" component="portrait" filters="role: pi" %}

{% include list.html data="members" component="portrait" filters="status: active" %}

{% include section.html %}


## 2024
<p align="center">
  <img src="../images/lab-photo-2024.jpg" style="max-width:768px; height:auto;">
</p>

## 2023
<p align="center">
  <img src="../images/lab-photo-2023.PNG" style="max-width:768px; height:auto;">
</p>


#### Alumni

{% include list.html data="members" component="portrait" filters="status: alumni" %}

{% capture content %}

{% endcapture %}

{% include grid.html style="square" content=content %}
