---
title: Research
nav:
  order: 1
  tooltip: Software, datasets, and more
---

## Research


Our research interests include but are not limited to:

🖐️ **Tactile Sensing and Multimodal Perception**.   
We design novel **tactile sensors** and **multimodal sensing systems** (e.g., vision-tactile fusion) to equip robotic hands with human-like touch capabilities. Research spans sensor hardware development, signal processing algorithms, and applications in deformable object manipulation.

🧠 **Embodied Intelligence and Skill Learning**.   
We explore **reinforcement learning**, **imitation learning**, and **tactile-guided policy optimization** to enable robots to adaptively grasp, manipulate, and collaborate with humans in unstructured environments.

🤖 **Robotic Systems and Advanced End-effector Design**.  
From soft robotics to dexterous manipulators, we build **integrated robotic systems** with an emphasis on real-world applicability. Projects include dynamic control architectures, sensorimotor coordination, and hardware-software co-design for robust robotic operations.

🌐 **Human-robot Interaction**.   
We investigate **teleoperation interfaces**, **shared autonomy frameworks**, and **intuitive communication protocols** to bridge human intent with robotic execution. Applications range from industrial cobots to assistive robotics for healthcare scenarios.


{% include tags.html tags="publication, resource, website" %}

{% include search-info.html %}

{% include section.html %}

### Equipments


🛠️ **Computational & Hardware Infrastructure**
- Robotics Platforms:

  - Dexterous manipulators (e.g., LeapHand, Star Hand).

  - Tactile sensor preparation equipment (such as visual touch, air pressure, etc.).

  - VR/AR systems for human-robot interaction studies.
<div style="text-align: center; margin: 20px 0;">
    <img src="../images/equipment.jpg" alt="实验室设备" style="width: 80%; max-width: 1000px; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
</div>
- Compute Power:

  - 10× NVIDIA RTX 4090-tier GPUs for rapid prototyping.

  - SIST have clusters for large-scale training (LLMs, physics-based simulation, multi-modal foundation models).



### Featured

<div class="project-grid">
{% include list.html component="card" data="projects" filters="group: featured" %}
</div>

<style>
.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}

.project-card img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
}
</style>

{% include section.html %}

### Teaching

{% include list.html component="card" data="projects" filters="group: " style="small" %}
