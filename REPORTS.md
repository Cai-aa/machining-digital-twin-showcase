# 实验报告与成绩 / Reports and grades

中文：三维实验下方提供富文本报告、自动保存草稿、提交、查看和下载。每次“新建实验”保留旧报告并创建独立记录；提交后冻结正文和操作记录。未完成30步时明确作为阶段报告，未完成步骤为0分。

English: Below the 3D lab, learners can edit, save, submit, view and download a rich-text report. Starting a new experiment preserves previous reports. Submission freezes the report body and operation trace. Partial submissions are stage reports; unfinished steps receive zero points.

## 评分 / Scoring

中文：网页操作成绩采用原30步赋分，总计100分。仅实际成功结束的交互动作满足要求、并点击“完成本步”后记分；选择步骤、重播或取消动画不直接得分。网页可识别的错误按该步骤原扣分尺度扣分，同类错误不反复扣分，接线按不同错误接线项计，单步扣分不超过满分。第15步须在同一次进入该步骤后完成至少两种方向、两种速度操作。物理精度、夹紧力等无法通过网页判断的指标须由教师复核；网页操作分属于教学演练记录。

English: Practice scoring follows the original 30-step allocation, totalling 100. Successful completed actions and explicit step completion are required. Navigation, replay and cancelled animations do not directly earn points. Detectable errors use the step's deduction scale, capped at its maximum; repeated errors of the same category are charged once, with distinct wiring mistakes charged separately. Step 15 requires two directions and two speeds within one visit. Physical accuracy and workholding require teacher review.

中文：报告文字由教师人工录入0—100分、评语和评阅人，独立于操作分；不自动评判文字，也不擅自生成加权总分。统计支持姓名、学号、班级及状态筛选，包括提交数、评阅数、平均操作分、平均报告成绩、报告及格率和固定分段分布。平均操作分统计已提交报告，报告平均分和及格率仅统计已评阅报告，0分纳入、未评分排除。及格线默认60分，可调整。

English: Teachers manually enter a separate report grade from 0 to 100, reviewer and feedback. No automatic prose grading or weighted combined grade is applied. Filters and statistics cover submissions, reviews, operation and report averages, pass rate and fixed grade bands. Operation averages include submitted reports; report averages and pass rates include only graded reports, including zero. The pass mark defaults to 60 and can be changed.

## 保存与汇总 / Storage and aggregation

中文：报告、姓名和学号仅保存在当前浏览器的 localStorage；当前标签页的实验由 sessionStorage 标识，不上传到 GitHub 或统计服务。本机最多100份。共享登录账号不能提供教师权限隔离，当前评阅功能是本机记录工具。不同设备、浏览器之间不会自动同步。清除浏览器数据或关闭隐私浏览可能导致记录丢失，请及时下载备份。

English: Reports and learner identifiers remain in this browser's localStorage; sessionStorage identifies the active experiment in the tab. They are not uploaded to GitHub or the analytics service. Storage is limited to 100 reports. The shared login does not enforce teacher roles. Records do not automatically synchronize across devices or browsers; clearing browser data or ending private browsing may remove them. Export backups regularly.

中文：学生可导出单份报告JSON交给教师；教师在自己的浏览器中“导入报告汇总”，人工评阅并导出CSV成绩表。可备份全部报告JSON。重复报告编号跳过，不覆盖已有评阅。导入后按操作事件重新计算操作分；本地文件和浏览器数据可被修改，不具备防篡改或正式集中成绩管理能力。下载HTML报告包含正文、30步得分明细及评语，可打印或另存PDF。

English: Learners can transfer individual report JSON files to a teacher, who imports them for local review and CSV export. Full JSON backups are also available. Duplicate IDs are skipped without overwriting existing reviews. Operation scores are recomputed from imported events. Local files and browser data are editable, so this is not tamper-proof or centralized official grade management. Downloaded HTML includes the body, all 30 score details and feedback, and supports printing or saving as PDF.

## 编辑器许可 / Editor license

Quill 2.0.3 is self-hosted in `assets/vendor/quill/` under the BSD 3-Clause license. See its [LICENSE](assets/vendor/quill/LICENSE) and [official documentation](https://quilljs.com/docs/quickstart). No editor CDN or third-party report upload is required.
