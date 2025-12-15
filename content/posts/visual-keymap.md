---
title: 'Visual Keymap 模组发布'
description: '一个用于可视化键位映射的Minecraft模组'
date: 2025-12-15
---

经常玩生电的玩家一定会因为键位绑定而头疼——MaLiLib 的键位绑定和原版是完全分离的，并且由于配置项很多，很难进行有效的筛选。在一次偶然的和群友聊天中，我们谈到了这一点，也找到了很多类似的可视化工具，例如 [键盘映射](https://www.mcmod.cn/class/6879.html) 之类的，但是很显然，他们都只支持原版系统里的键位映射。

于是我便决定自己写一个模组了，它使用了抽象的 KeyBinding 基类使得任何拥有自己的键位系统的模组都可以通过实现接口来把自己的键盘映射加入到这个可视化界面中！因为我本人的生电包里有 MASA 全家桶和 CommandKeys 模组，因此我就为这两类的键位系统都写了适配器。

下面是我的模组地址：

- [CurseForge 页面](https://www.curseforge.com/minecraft/mc-mods/visual-keymap)
- [Modrinth 页面](https://modrinth.com/mod/visual-keymap)
- [GitHub 仓库](https://github.com/USTC-XeF2/visual-keymap)

欢迎大家去尝试一下！如果有问题可以在仓库里反馈或者直接交 PR（x
