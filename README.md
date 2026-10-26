# 铣削数字孪生教学资源 / Machining Digital Twin Teaching Resources

中文：本网站包含教学视频和依据申报书整理的30步实验指导。当前入口使用浏览器端加密登录页，账号由项目团队提供；密码不以明文存放在公开代码中。登录仅在当前标签页会话中保持，可通过“退出登录”清除。

English: This website contains teaching videos and a 30-step experiment guide. The entry uses a browser-side encrypted login gate. Credentials are supplied by the project team; the plaintext password is not stored in public code. The current tab session can be cleared using the logout button.

## 访问边界 / Access limitations

中文：这是静态页面访问门槛，不是服务器端身份认证。视频与封面文件仍是公开资源，先前已公开的页面和仓库历史也不会因此变为私密内容。请勿将此页面用于存放敏感信息。完整实验仍在本地Unity软件与配套环境中运行。

English: This is a static-page access gate, not server-side authentication. Video and poster files remain public, and previously published pages and repository history do not become private. Do not store sensitive information here. The full experiment runs in local Unity software and the associated environment.

## 维护与部署 / Maintenance and deployment

中文：教学内容修改后，需要从非公开工作副本重新生成加密入口。不要将明文内容、账号密码或私密源文件提交到此仓库。原始步骤数据保存在非公开工作目录，不再以单独的公开JSON发布。

English: Content updates require regenerating the encrypted entry from a non-public working copy. Do not commit plaintext content, credentials or private source files. Source step data is retained in the non-public working directory and is no longer published as separate JSON.

GitHub Pages: Settings → Pages → Deploy from a branch → main → / (root).

本地预览 / Local preview: python -m http.server 8767 --bind 127.0.0.1. Web Crypto requires HTTPS or a localhost origin.
