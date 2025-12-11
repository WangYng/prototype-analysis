# 🚀 Cursor Workflow：原型图序列结构化文档生成流水线

本文件为 **Cursor 自动化文档生成主控工作流（workflow.md）**，用于从 `raw_images/` 生成结构化模块文档。

---

# 0. 初始化任务

## 0.1 检查 PIPELINE_STATUS.json

若不存在，执行：

```bash
node scripts/init_pipeline_status.js
```

若存在，读取：

* total_images
* current_index
* processed_images

---

## 0.2 检查 MASTER_STRUCTURE.md

若不存在，创建：

```markdown
# 项目结构总览

## 模块列表

## 模块关系图
```

---

# 1. 主循环（按顺序处理图片）

循环条件：

```
current_index < total_images
```

---

## 1.1 加载当前图片

从 raw_images 中读取：

```
raw_images[current_index]
```

---

## 1.2 分类图片 → 判断模块归属

使用 Prompt：`prompts/classify_module.md`

产出：

```
target_module_name
```

---

# 2. 模块处理分支

## 2.1 新模块（MODULE_[target].md 不存在）

### 2.1.1 创建完整模块文档

使用 Prompt：`prompts/generate_new_module.md`
输出写入：

```
MODULE_[target_module].md
```

### 2.1.2 更新 MASTER_STRUCTURE.md

在 `## 模块列表` 下追加：

```
- 模块名
  - 与前一模块的关系：AI 推断
```

---

## 2.2 现有模块（MODULE_[target].md 存在）

### 2.2.1 加载模块文档

使用 Prompt：`prompts/update_existing_module.md`

### 2.2.2 进行增量更新

* 不覆盖旧内容
* 修正冲突
* 在对应区块追加组件/逻辑/数据

覆盖写回原文件。

---

# 3. 更新流水线状态

修改 `PIPELINE_STATUS.json`：

```
current_index += 1
processed_images append 当前文件名
status = "PROCESSING_INDEX_[new_index]"
```

保存后回到主循环。

---

# 4. 完成阶段

当：

```
current_index == total_images
```

执行：

1. `status = COMPLETE`
2. 执行 Final Review

## 4.1 Final Review

使用 Prompt：`prompts/final_review.md`
将结果写入 `MASTER_STRUCTURE.md`：

```
## 模块关系图
```

---

# 📌（工作流结束）
