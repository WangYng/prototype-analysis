### 原型图序列 → 自动化结构化文档生成系统

本项目通过 Cursor + Vision AI + 脚本流水线，将 raw_images/ 文件夹中的原型图序列自动转换为：

- 系统主结构文档
- 多个模块规格文档（自动创建 / 自动增量更新）
- 模块关系图
- 完整的可恢复流水线进度状态

适用于：大型产品原型、设计评审、系统结构推理、文档自动化生成。

---

### ✨ 功能特性

- 🚀 **全自动流水线**：按序处理原型图，利用 Cursor 自动化执行，无需人工干预
- 🧠 **细粒度模块化 (Sub-module Strategy)**：自动将大型功能区（如商城）拆分为细分模块（如 `Mall_Order`, `Mall_Product`），大幅提升 AI 处理速度并节省 Token
- ✍️ **增强型文档生成**：自动生成包含“模块概述”和“Mermaid 业务架构图”的结构化 Markdown 文档
- 🔄 **智能增量更新**：已有模块会自动同步 Mermaid 图表并追加新功能描述，保留核心逻辑
- 🧩 **系统结构汇总**：全流程结束后自动产出全局模块依赖关系与数据流总结
- 💾 **断点恢复机制**：PIPELINE_STATUS 实时记录进度，支持随时中断与续跑

---

### 📂 项目结构

```bash
project-root/
│
├─ README.md
├─ workflow.md                 ← 主控自动化工作流
│
├─ prompts/                    ← AI 逻辑核心
│  ├─ classify_module.md       ← 细粒度分类逻辑
│  ├─ generate_new_module.md   ← 文档生成模板
│  ├─ update_existing_module.md ← 增量更新逻辑
│  └─ final_review.md          ← 系统全案总结
│
├─ scripts/                    ← 辅助脚本
│  ├─ init_pipeline_status.js
│  └─ get_next_image.js
│
├─ raw_images/                 ← 输入：原型图序列 (001.png, 002.png...)
│
├─ MASTER_STRUCTURE.md         ← 自动生成：项目总览
├─ PIPELINE_STATUS.json        ← 自动生成：运行进度
└─ MODULE_*.md                 ← 自动生成：细分模块规格说明书
```

---

### 🚀 快速开始

#### 1. 准备环境
- 安装 [Node.js](https://nodejs.org/) (用于执行初始化脚本)
- 使用 [Cursor](https://cursor.sh/) 编辑器 (用于驱动 AI 工作流)

#### 2. 准备原型图
将所有原型图按顺序命名（如 `001.png`, `002.png`...）放入 `raw_images/` 文件夹。

#### 3. 初始化流水线
在终端运行：
```bash
node scripts/init_pipeline_status.js
```

#### 4. 执行自动化工作流
在 Cursor 中打开 `workflow.md`，按照文件中的步骤引导 Cursor 自动处理所有图片。

---

### ⚙️ 工作原理

系统通过 `workflow.md` 作为主控流程，驱动自动化执行：

1. **初始化**：扫描 `raw_images/`，创建任务进度与主文档结构。
2. **分类与拆分**：使用 AI 视觉能力判断图片归属，对于复杂功能自动采用 `父模块_子功能` 命名法进行细分（解决单文件过大导致的 Token 瓶颈）。
3. **文档构建/更新**：
   - 为新模块生成包含 **概览 + Mermaid 图 + 核心细节** 的标准文档。
   - 为已有模块执行增量更新，同步图表并追加新逻辑。
4. **状态记录**：每步操作均实时同步至 `PIPELINE_STATUS.json`，支持随时中断。
5. **最终复核**：全部完成后，梳理模块间的依赖关系与全局业务流。

---

### 🧩 Prompts 说明

| 文件 | 功能描述 |
| :--- | :--- |
| **classify_module.md** | **核心分类器**：负责细粒度拆分，识别并生成格式如 `Parent_Sub` 的模块名。 |
| **generate_new_module.md** | **文档模板**：定义包含“模块概述”和“Mermaid 架构图”的标准输出规范。 |
| **update_existing_module.md** | **增量更新**：指导 AI 在不破坏旧内容的前提下更新 Mermaid 图和细节。 |
| **final_review.md** | **全局汇总**：从全案视角梳理模块间的依赖关系和业务主流程。 |

---

### 🧠 模块文档规范 (MODULE_*.md)

每个模块生成的 Markdown 结构如下：

```markdown
# [ModuleName]

## 模块概述
（简要描述核心功能与系统角色）

## 业务架构图 (Mermaid)
（可视化的页面流转或组件关系图）

## 组件结构
（按页面分类列出的 UI 元素清单）

## 业务逻辑
（详细的交互流程与行为定义）

## 数据接口
（输入输出字段、关键事件与状态）
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