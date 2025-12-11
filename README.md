### 原型图序列 → 自动化结构化文档生成系统

本项目通过 Cursor + Vision AI + 脚本流水线，将 raw_images/ 文件夹中的原型图序列自动转换为：

- 系统主结构文档
- 多个模块规格文档（自动创建 / 自动增量更新）
- 模块关系图
- 完整的可恢复流水线进度状态

适用于：大型产品原型、设计评审、系统结构推理、文档自动化生成。

---

### ✨ 功能特性

- 🚀 全自动：按序处理原型图，无需人工干预
- 🧠 模块智能分类：自动判断图片属于哪个模块
- ✍️ 自动生成文档：结构化 Markdown 文档（组件、逻辑、接口）
- 🔄 增量更新：已有模块会智能追加内容
- 🧩 系统结构推导：自动生成模块关系图
- 💾 断点恢复：pipeline 可以中断并从进度继续
- 🗂 文件规范统一：支持 Cursor 编辑器的自动化规范管理

---

### 📂 项目结构

```bash
project-root/
│
├─ README.md
├─ .cursorrules
├─ workflow.md
│
├─ prompts/
│  ├─ classify_module.md
│  ├─ generate_new_module.md
│  ├─ update_existing_module.md
│  └─ final_review.md
│
├─ scripts/
│  └─ init_pipeline_status.js
│
├─ raw_images/
│  └─ （按序命名的 UI 原型图）
│
├─ MASTER_STRUCTURE.md         ← 自动生成
├─ PIPELINE_STATUS.json        ← 自动生成
└─ MODULE_*.md                 ← 自动生成
```

---

### ⚙️ 工作原理

系统通过 workflow.md 作为主控流程，驱动自动化执行：

1. 初始化

- 检查/创建 PIPELINE_STATUS.json
- 检查/创建 MASTER_STRUCTURE.md

2. 处理每张原型图

- 加载当前图片
- 使用分类 Prompt 判断模块归属
- 若是新模块 → 创建模块文档
- 若模块已存在 → 增量更新

3. 更新流水线状态

- 记录 current_index
- 添加 processed_images
- 写回状态文件

4. 全部处理完毕时

- 运行 Final Review
- 填充主文档的 `模块关系图`

---

### 🚀 快速开始
#### 1. 安装环境

需要 Node.js（用于初始化脚本）

需要 Cursor（用于自动化执行 AI 工作流）

#### 2. 准备 raw_images

将所有按顺序命名的图片放入：

``` bash
raw_images/
001.png
002.png
003.png
...
```

#### 3. 初始化流水线

首次运行时执行：

``` bash
node scripts/init_pipeline_status.js
```

#### 4. 在 Cursor 中运行 workflow.md

打开 `workflow.md`，让 Cursor 自动执行整个流程。

---

### 🧩 prompts 文件夹说明
| 文件                        | 功能         |
| ------------------------- | ---------- |
| classify_module.md        | 判断图片属于哪个模块 |
| generate_new_module.md    | 创建新模块文档    |
| update_existing_module.md | 增量更新已有模块   |
| final_review.md           | 生成模块关系图总结  |

这些 prompt 会用于 Vision AI 推理与文档生成。

---

### 🧠 模块文档规范

每个模块自动生成格式如下：

``` bash
# ModuleName

## 组件结构
...

## 业务逻辑
...

## 数据接口
...
```

---

### 🔄 断点恢复机制

`PIPELINE_STATUS.json` 保存：

- 当前正在处理的图片 index
- 已处理文件数组
- 总图片数
- 当前状态

Cursor 可以随时中断，再次运行时自动续跑。

---

### 📌 注意事项

- 不要手动编辑 PIPELINE_STATUS.json
- 不要手动修改 MODULE_*.md（交给 AI）
- workflow.md 是整套系统的“核心调度器”，不要随意改动
- prompt 文件可根据项目需要定制

---

### 🏁 完成后

项目将生成：

- 完整模块文档集
- 系统结构总览
- 模块关系图（由 AI 推理）
- 全链路数据与交互逻辑文档

你可以直接用于：

- 技术交接
- 产品评审
- 架构设计
- API 定义
- 需求说明书编写