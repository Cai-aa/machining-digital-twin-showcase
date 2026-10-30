# 页面维护 / Interface maintenance

中文：用户已明确要求独立页面导航。首页正文在“项目相关服务”处结束，完整项目标题保持一行，教师照片使用用户指定版本，不展示照片来源说明。后续精修不得重新合并为长页面。三维模型仅在 `interactive-lab.html` 加载；各加密页面共同保留当前标签页登录状态。

English: The user requires separate HTML documents for navigation. Homepage content ends at related project services; the full project title stays on one line. Use the user-selected versions of the teacher portraits without an on-page source caption. Do not merge the site back into one long page. Load the 3D model only on `interactive-lab.html`, and preserve login across pages within the current tab.

中文：此工作副本安装了 Impeccable 4.8.0。项目技能位于 `.agents/skills/impeccable`，Codex 用户级副本位于用户技能目录。官方安装器生成了 `.codex/hooks.json`；自动钩子需由用户在 Codex 的 `/hooks` 中批准。本次页面维护使用手动检查，不将“已生成配置”视为“钩子已运行”。新技能在下一轮对话可用。

English: Impeccable 4.8.0 is installed in this checkout under `.agents/skills/impeccable`, with a user-level Codex copy as well. The official installer generated `.codex/hooks.json`. Approve the project hooks through Codex `/hooks` before relying on automatic checks. This maintenance pass uses manual verification; generated hook configuration does not prove execution. The newly installed skill becomes available on the next turn.

中文：本项目的视觉依据由用户明确指定为 [武汉理工大学虚拟仿真实验教学参考页](https://xnfz.whut.edu.cn/cms/index_sn.html)。保留其居中门户结构、校徽页头、蓝色视频简介区、八个彩色资源入口、双栏图文实验项目和教师照片区；通用“去AI味”建议不得覆盖这些已确定的结构与风格。精修只改善阅读、响应式布局、可访问性和冗余表达。保留两个视频、三维操作及30步原始说明，不删改申报书中的教学事实、评分标准，也不把演示信号写成真实测量或真实AI输出。工具、钩子、缓存不随网页发布；不在公开仓库存放账号密码、解密内容或原始Unity工程。

English: The user explicitly selected the [WHUT virtual experiment reference page](https://xnfz.whut.edu.cn/cms/index_sn.html) as the visual authority. Preserve its centered portal structure, university crest header, blue video introduction, eight colored resource tiles, two-column illustrated experiment entries and teacher portraits. Generic anti-AI styling advice must not override these approved choices. Refine readability, responsive behavior, accessibility and redundant wording. Preserve both videos, the 3D interactions, all 30 original descriptions, teaching facts and assessment criteria. Keep simulated signals distinct from measurements or real AI output. Do not publish tools, hook runtime data, credentials, decrypted content or the private Unity source.

本地检查 / Local check:

```powershell
.\.agents\skills\impeccable\scripts\impeccable.cmd detect --json assets/css/portal.css
```

中文：登录内页保留加密发布方式。检查内页时必须使用非公开工作副本，不能只扫描包含密文的公开 `index.html`，也不能为了扫描将内页明文发布到 GitHub。用户提出重新设计整站时，再通过 `$impeccable init` 确认产品背景并生成 PRODUCT.md。

English: The teaching page remains encrypted for publication. Inspect its non-public source, rather than treating the encrypted public `index.html` as the teaching UI or publishing plaintext for a scan. Use `$impeccable init` to confirm product context before a future full redesign and creation of PRODUCT.md.
