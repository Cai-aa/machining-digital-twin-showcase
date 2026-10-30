# 页面维护 / Interface maintenance

中文：此工作副本安装了 Impeccable 4.8.0。项目技能位于 `.agents/skills/impeccable`，Codex 用户级副本位于用户技能目录。官方安装器生成了 `.codex/hooks.json`；自动钩子需由用户在 Codex 的 `/hooks` 中批准。本次页面维护使用手动检查，不将“已生成配置”视为“钩子已运行”。新技能在下一轮对话可用。

English: Impeccable 4.8.0 is installed in this checkout under `.agents/skills/impeccable`, with a user-level Codex copy as well. The official installer generated `.codex/hooks.json`. Approve the project hooks through Codex `/hooks` before relying on automatic checks. This maintenance pass uses manual verification; generated hook configuration does not prove execution. The newly installed skill becomes available on the next turn.

中文：本项目是教学资源网站。保留学校教学门户的蓝白配色、导航、两个视频、三维操作及30步原始说明。精修时删减无意义英文与口号、重复图案和过度装饰，不删改申报书中的教学事实、评分标准，也不把演示信号写成真实测量或真实AI输出。工具、钩子、缓存不随网页发布；不在公开仓库存放账号密码、解密内容或原始Unity工程。

English: Preserve the academic portal's blue-and-white identity, navigation, two videos, 3D interactions and all 30 original descriptions. Remove decorative English, slogans, repetitive imagery and unnecessary ornament. Preserve teaching facts and assessment criteria, and keep simulated signals distinct from measurements or real AI output. Do not publish tools, hook runtime data, credentials, decrypted content or the private Unity source.

本地检查 / Local check:

```powershell
.\.agents\skills\impeccable\scripts\impeccable.cmd detect --json assets/css/portal.css
```

中文：登录内页保留加密发布方式。检查内页时必须使用非公开工作副本，不能只扫描包含密文的公开 `index.html`，也不能为了扫描将内页明文发布到 GitHub。用户提出重新设计整站时，再通过 `$impeccable init` 确认产品背景并生成 PRODUCT.md。

English: The teaching page remains encrypted for publication. Inspect its non-public source, rather than treating the encrypted public `index.html` as the teaching UI or publishing plaintext for a scan. Use `$impeccable init` to confirm product context before a future full redesign and creation of PRODUCT.md.
