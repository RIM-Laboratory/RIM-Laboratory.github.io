// Replace every publication abstract with a concise 2-3 sentence summary
// that says plainly what the paper does. Preserves all other fields.
import yaml from 'js-yaml';
import fs from 'node:fs';

const YAML_PATH = new URL('../src/data.yaml', import.meta.url);
const data = yaml.load(fs.readFileSync(YAML_PATH, 'utf8'));

const SHORT = {
  32: "A physics-consistent calibration framework for curved visuotactile sensors. It uses controllable near-field light sources and near-light photometric stereo to estimate contact geometry, so high-fidelity 3D reconstruction can be calibrated with just a few simple contacts using everyday objects.",
  31: "A framework that learns tactile-guided non-prehensile manipulation (pushing, rolling, reorienting) for multi-fingered dexterous hands. By grounding the policy in visuotactile feedback, the hand reasons about contact states and object dynamics, improving success over vision-only baselines on contact-rich tasks.",
  3: "Aligns tactile sensing with physical interaction forces in Vision-Language-Action (VLA) models for force-aware manipulation. It introduces a tactile-force adapter trained on over 10 million synchronized tactile–force samples, enabling robust contact-rich manipulation beyond vision-only VLA baselines.",
  2: "A fully autonomous, CAD-free tactile framework that reconstructs the 3D shape of a part for measurement. It uses a dual Gaussian-Process implicit-surface model for reconstruction and uncertainty, plus a hybrid exploration planner that adaptively samples the surface without any CAD prior.",
  1: "A hand exoskeleton that delivers multimodal haptic feedback—force, pressure, and thermal sensations—to the user. Integrated into a teleoperation system, it lets operators feel and manipulate remote deformable objects and distinguish their temperatures.",
  13: "A robotic system that picks up paper-like (thin, flat, deformable) objects using a tactile dexterous hand. It detects and controls slip in real time and generates grasp motions with a diffusion-based policy, achieving robust paper grasping where vision-based methods fail.",
  12: "Casts photorealistic style transfer as a diffusion process. By modeling the transfer as a denoising trajectory, it reconciles style and content to produce high-fidelity, artifact-free photorealistic stylization.",
  11: "A hydraulic multi-fingered gripper whose fingers are driven by hydraulic actuators. The hydraulic mechanism provides inherent compliance and high force, letting the gripper adapt to and grasp objects ranging from delicate to heavy.",
  10: "A framework that captures hand-object interaction dynamics and renders them realistically using tactile-informed sensing. Fusing visuotactile data with visual capture reconstructs dense contact and deformation that guide physically plausible rendering.",
  9: "A rounded, high-frequency, transferable monochrome vision-based tactile sensor for shape reconstruction. Its rounded form improves contact on curved surfaces and the monochrome design enables high frame rates, with a design that transfers across sensor housings.",
  8: "A wearable haptic sleeve that augments an operator's tactile perception during robotic teleoperation. It maps contact sensed at the remote robot's fingertips to matching locations on the human arm, improving awareness of remote contacts.",
  7: "A wide-range, highly sensitive tactile sensor paired with a real-to-sim digital twin model. The twin faithfully reproduces the sensor's response in simulation, enabling sim-to-real transfer of tactile-driven policies across contact conditions.",
  6: "A human-like fingertip multimodal visuo-tactile sensor that emulates the human fingertip. Combining vision-based geometry sensing with embedded force and vibration sensing gives richer, more discriminative contact perception than single-modality designs.",
  5: "A bi-level policy-learning framework that coordinates the fingers of dexterous robotic hands. It separates high-level synergy planning from low-level finger control, learning coordinated, efficient policies that generalize better than flat policies.",
  15: "Addresses synthesizing stable, collision-free bimanual grasps for dexterous robot hands. The method jointly optimizes the poses and contacts of both hands while respecting kinematic constraints, producing robust collaborative grasps across objects and hand configurations.",
  20: "Integrates tactile and chemical sensing with haptic feedback on a telepresence explosive-ordnance-disposal (EOD) robot. It measures contact forces, pressure, and chemical signatures at the remote site and renders them to the operator, improving awareness and safety in hazardous tasks.",
  25: "An active approach that explores and recognizes multiple objects via tactile whiskers. Arrays of whisker-like sensors are actively swept across a scene, and an active strategy chooses where to explore next to reduce the contacts needed for confident recognition.",
  24: "A nonmyopic informative path-planning method that minimizes global Kriging (Gaussian-process) variance. Rather than greedily maximizing local information, it plans paths that reduce integrated posterior variance over the whole field, lowering reconstruction error than myopic planners.",
  28: "A network architecture that improves robustness in 3D point-cloud learning. It represents local geometry with triangle-based features that are stable and invariant, making the model less sensitive to noise and sampling variations than pointwise features.",
  19: "An end-to-end deep reinforcement learning approach for flying a quadrotor through a narrow, irregular gap. It uses curriculum learning to stabilize training and sim-to-real transfer to deploy, enabling reliable gap traversal on a physical platform.",
};

let updated = 0;
for (const pub of data.publications) {
  const s = SHORT[pub.id];
  if (s) { pub.abstract = s; updated++; }
}
fs.writeFileSync(YAML_PATH, yaml.dump(data, { lineWidth: -1, noRefs: true, quotingType: '"' }));
console.log(`Shortened ${updated} abstracts.`);
