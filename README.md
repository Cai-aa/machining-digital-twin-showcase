# 铣削数字孪生项目展示 / Machining Digital Twin Showcase

中文：面向外部访问者的静态项目介绍页，包含实验内容、学习路径和访问说明。完整实验目前在本地 Unity 软件中运行，本网站不提供在线实验、实时机床连接、登录或成绩服务。机床图为结构示意，非软件运行截图。

English: A public static introduction to the machining digital twin project, including experiment modules, the learning journey and access information. The full experiment currently runs in local Unity software. This website does not provide an online experiment, live machine connectivity, authentication or grading. The machine illustration is schematic, not a software screenshot.

## 本地预览 / Local preview

在此目录启动静态 HTTP 服务器，例如：

Start a static HTTP server in this directory, for example:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

然后访问 / Then visit: `http://127.0.0.1:8765/`.

## 部署 / Deployment

GitHub Pages：Settings → Pages → Deploy from a branch → main → / (root)。

GitHub Pages: Settings → Pages → Deploy from a branch → main → / (root).

网站无需依赖安装或构建步骤。/ No dependency installation or build step is required.

## 教学资源 / Teaching resources

中文：页面新增项目团队提供的两段教学视频（1080p H.264/AAC 网页播放版本）、申报书第 3-6 节的 30 步完整实验指导与评分标准、4 学时安排和教学目标。网页上的搜索、筛选和展开操作仅用于浏览。此仓库不包含完整申报书或团队成员联系方式。

English: The page includes two team-supplied teaching videos (1080p H.264/AAC web versions), all 30 experiment steps and scoring criteria from section 3-6 of the application, the four-hour teaching plan and objectives. Search, filtering and expansion support browsing only. The full application and team contact details are not included.

- Video source files remain unchanged; the web versions preserve full duration.
- `experiment-steps.json` contains the structured step content used to verify the HTML.
- Videos use native playback controls, inline playback, metadata preloading and fast-start MP4.
