# 铣削数字孪生教学资源 / Machining Digital Twin Teaching Resources

中文：页面采用蓝白配色和橙色操作按钮的教学门户布局，包含项目简介视频、八个教学资源入口、四个实验模块入口，以及服务团队、网络要求和项目架构说明。登录页与教学内页共用 `assets/css/portal.css`；两个教学视频、三维实验功能与30步原始说明保留。

English: The academic portal follows the user-selected WHUT reference: a university crest header, blue introduction area, eight colored resource tiles, two-column experiment images, and a teacher team section. The login and teaching pages share `assets/css/portal.css`. Both videos, the interactive 3D lab and all 30 original step descriptions are retained.

中文：首页结构与风格依据用户指定的[武汉理工大学虚拟仿真实验教学页面](https://xnfz.whut.edu.cn/cms/index_sn.html)，补充官方校徽及庄可佳、翁剑、高忠梅老师的公开教学照片；实验项目图片来自本平台实际三维场景。素材来源见 [ASSETS.md](ASSETS.md)。

English: The user-selected [WHUT virtual experiment page](https://xnfz.whut.edu.cn/cms/index_sn.html) defines the homepage structure and styling. The university crest and publicly available teaching portraits of Zhuang Kejia, Weng Jian and Gao Zhongmei are included. Experiment images show actual scenes from this platform. See [ASSETS.md](ASSETS.md) for provenance.

中文：本网站包含教学视频和依据申报书整理的30步实验指导。当前入口使用浏览器端加密登录页，账号由项目团队提供；密码不以明文存放在公开代码中。登录仅在当前标签页会话中保持，可通过“退出登录”清除。

English: This website contains teaching videos and a 30-step experiment guide. The entry uses a browser-side encrypted login gate. Credentials are supplied by the project team; the plaintext password is not stored in public code. The current tab session can be cleared using the logout button.

## 访问边界 / Access limitations

中文：这是静态页面访问门槛，不是服务器端身份认证。视频、封面、三维模型与运行代码仍是公开资源，先前已公开的页面和仓库历史也不会因此变为私密内容。请勿将此页面用于存放敏感信息。完整实验仍在本地Unity软件与配套环境中运行。

English: This is a static-page access gate, not server-side authentication. Video, poster, 3D model and runtime code files remain public, and previously published pages and repository history do not become private. Do not store sensitive information here. The full experiment runs in local Unity software and the associated environment.

## 维护与部署 / Maintenance and deployment

中文：页面精修使用 Impeccable 4.8.0，安装范围、Codex 钩子与手动检查方式见 [IMPECCABLE.md](IMPECCABLE.md)。该工具仅用于开发维护，不是网页运行依赖。

English: Interface refinement uses Impeccable 4.8.0. See [IMPECCABLE.md](IMPECCABLE.md) for installation scope, Codex hooks and manual checks. It is a development tool, not a website runtime dependency.

中文：教学内容修改后，需要从非公开工作副本重新生成加密入口。不要将明文内容、账号密码或私密源文件提交到此仓库。原始步骤数据保存在非公开工作目录，不再以单独的公开JSON发布。

English: Content updates require regenerating the encrypted entry from a non-public working copy. Do not commit plaintext content, credentials or private source files. Source step data is retained in the non-public working directory and is no longer published as separate JSON.

GitHub Pages: Settings → Pages → Deploy from a branch → main → / (root).

本地预览 / Local preview: python -m http.server 8767 --bind 127.0.0.1. Web Crypto requires HTTPS or a localhost origin.

## 三维教学交互 / Interactive 3D teaching lab

中文：登录后可进入30步三维教学交互。支持机床开关机、安全门、换刀、刀长测量、工件装夹、传感器安装与接线、工件坐标设定、点动、切削、工况比较、阈值预警、拆卸与清理。每步原始目标、详细操作、合理用时和赋分标准均保留。可暂停、停止、重播动作，选择观察视角及动画倍速，并导出本次网页演练记录。

English: After login, visitors can use all 30 guided 3D teaching steps, including power, doors, tool changes, measurement, workholding, sensors and wiring, work coordinates, jogging, cutting, comparison, warning thresholds, disassembly and cleanup. Original goals, detailed instructions, suggested time and scoring criteria remain available. Animation controls, camera views, playback speed and local practice-record export are included.

- 三维几何来自原Unity工程的机床、刀具、夹具和工件网格，经过轻量化后导出为约12MB的自包含GLB。单位为米，Y向上。门体和夹具运动幅度属于教学示意，未作工程标定。
- Geometry comes from the original Unity machine, tool, fixture and workpiece meshes, optimized into a self-contained GLB of approximately 12 MB. Units are metres, Y-up. Door and fixture motion are illustrative and not engineering-calibrated.
- 信号、振动、变形和预警由教学规则生成，不是实测数据、CAE结果或真实AI判读。网页不连接真实机床，演练完成状态不等于正式实验成绩。
- Signals, vibration, deformation and warnings are rule-based teaching simulations, not measurements, CAE results or live AI inference. No real machine is connected, and local completion is not an official grade.
- Runtime: Three.js 0.180.0 (MIT), bundled locally in assets/js/lab-3d.js; attribution in assets/js/THREE-LICENSE.txt. No external CDN is required.
- assets/models/assembly-metadata.json documents source geometry, hierarchy, bounds and animation limitations.
