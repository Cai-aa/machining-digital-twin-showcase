# 网络共享统计 / Network-sharing statistics

首页及团队页展示全站累计浏览次数、实验使用人次和近7日趋势。统计从功能上线后开始，不回填历史数字。

The homepage and team page show shared page-view totals, experiment-use sessions and a seven-day trend. Collection begins when the feature is released; historical traffic is not invented.

## 口径 / Definitions

- 浏览次数：成功登录并打开一个教学页面，记录1次。仅刷新统计图表不增加浏览。
- 实验使用人次：同一标签页会话首次成功完成三维动画操作时记录1次。导航、场景准备、取消和重播不计。数据为使用人次，不是独立用户人数。
- 日期：按北京时间（Asia/Shanghai）归入每日计数。
- 界面：未建计数器的已确认空数据为0；网络失败或无效响应显示“—”，不以本地数字替代共享统计。

Each authenticated teaching-page load counts once. Refreshing the statistics does not add a view. Experiment usage counts only the first successful 3D action per tab session, not navigation, scene preparation, canceled actions, or replays. These are sessions, not unique people. Daily buckets use Asia/Shanghai. Missing counters return zero only for the provider's documented key-not-found response; errors remain unavailable.

## 服务与维护 / Service and maintenance

使用 [CountAPI](https://github.com/syntaxerror019/countapi) 的公开免密钥接口，访问量按 `hit` 增加，按 `get` 读取；浏览器只发送站点计数器名称及日期，不发送项目登录账号、密码、实验参数或报告。生产前缀见 `assets/js/sharing-stats.js`。公开计数不应视为正式教学成绩或防作弊依据。

The public no-key CountAPI uses `hit` to increment and `get` to read. Requests contain counter names and dates, with credentials omitted and no referrer. No project login credentials, experiment parameters or reports are sent. As public counters, they are informational and are not authenticated teaching records.

总量和每日量分别写入；网络中断可能造成部分写入，客户端不自动重试不确定的写操作，避免响应丢失导致重复增加。服务未承诺SLA；后续若迁移到学校统计服务，应在新服务中核验并迁移已记录的数据。

Total and daily counters are separate writes. An interrupted request may yield partial recording; uncertain writes are not automatically retried. The provider has no guaranteed SLA. A future migration to a school-hosted analytics service should verify and migrate stored counts.

本地预览不写入正式计数器。在本机页面加 `?stats_test=1` 可使用隔离的 `-qa` 计数器进行集成测试。生产站点不接受该参数切换数据源。不得把测试计数写进正式统计。

Local previews never write production counters. On localhost only, `?stats_test=1` enables isolated `-qa` counters for integration tests. The production site ignores that override. Keep technical tests out of production traffic.
