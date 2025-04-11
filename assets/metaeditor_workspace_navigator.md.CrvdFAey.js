import{_ as r}from"./chunks/navigator_icon.Cgl4LOH4.js";import{_ as a}from"./chunks/open_icon.zvFzltxF.js";import{_ as i}from"./chunks/new_icon.CP--apCK.js";import{_ as o}from"./chunks/project_from_source_icon.BGzoeRR-.js";import{_ as e}from"./chunks/delete_icon.Dg9Mi4oq.js";import{_ as m}from"./chunks/refresh_icon.DJRCN6hN.js";import{_ as l}from"./chunks/compile_open_files_icon.BKyM_TnY.js";import{_ as s}from"./chunks/storage_enable_icon.Duhug_5g.js";import{_}from"./chunks/mql5storage_update_icon.BBTmqgY4.js";import{a as p,_ as c,b as n}from"./chunks/mql5storage_delete_icon.8L8eQqxX.js";import{_ as g,a as d}from"./chunks/mql5storage_journal_icon.BPiZST-q.js";import{_ as f}from"./chunks/mql5storage_revert_icon.D1h6Vkt9.js";import{_ as h,c as q,ag as u,o as M}from"./chunks/framework.BhgIN1sM.js";const v="/metaeditor/navigator.png",Q="/metaeditor/open_folder_icon.png",k="/metaeditor/project_new_icon.png",w="/metaeditor/new_folder_icon.png",L="/metaeditor/rename_icon.png",T="/metaeditor/show_all_files_icon.png",W=JSON.parse('{"title":"导航","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/metaeditor/workspace/navigator"}],["meta",{"property":"og:title","content":"导航"}]]},"headers":[],"relativePath":"metaeditor/workspace/navigator.md","filePath":"metaeditor/workspace/navigator.md"}'),P={name:"metaeditor/workspace/navigator.md"};function $(b,t,D,I,S,j){return M(),q("div",null,t[0]||(t[0]=[u('<h1 id="导航" tabindex="-1">导航 <a class="header-anchor" href="#导航" aria-label="Permalink to &quot;导航&quot;">​</a></h1><p>导航器窗口允许您操控交易平台 /MQL4 或者 /MQL5 目录内部的文件和文件夹。 它们保存交易机器人，指标和脚本，以及用 MetaQuotes 语言编程的源代码文件和其它数据。 按 Ctrl+D 或执行 <img src="'+r+'" alt="导航"> 在 <a href="/metaeditor/main_menu/main_menu_view#navigator">视图</a> 窗口或在 <a href="/metaeditor/toolbar/toolbar_standard#navigator">标准</a> 工具栏里的 &quot;导航器&quot; 命令来显示/隐藏窗口。</p><p>该窗口类似于将文件夹和文件显示为树列表的文件管理器:</p><p><img src="'+v+'" alt="导航"></p><p>交易平台的导航器窗口中会显示类似的结构。 例如，如果您在 MQL5\\Indicators\\MyIndicator\\ 目录中创建指标，则可以在交易平台上从同一目录启动它。</p><p>若要查看文件夹内容，或打开源文件进行编辑，请双击导航器中的相应元素。 若要重新定位文件夹/文件，选择它并拖动到必要的目录，同时按住鼠标左键（Drag&#39;n&#39;Drop）。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>目录和文件的外部更改（通过 Windows 资源管理器）也会显示在导航器窗口中。</p></div><p>项目</p><p>为管理<a href="/metaeditor/mql5storage/projects">项目</a>专门设计了单独的导航标签。所有使用的文件被分配到不同的类别：</p><ul><li>相关性 ― 包含文件。这些是项目中使用的源代码文件。例如，相关性可能包含标准的程序库文件。</li><li>标题 ― 头文件。这类文件包含自定义标识符、宏、结构和项目中使用的其他构造。</li><li>源 ― 项目的源代码文件。</li><li>资源 ― 资源文件，例如图像、声音等。</li><li>设置和文件 ― 输入参数(*.set)和其他文件的设置。</li></ul><p>请阅读关于如何在<a href="/metaeditor/mql5storage/projects">单独的部分</a>使用项目的更多内容。</p><p>快捷菜单</p><p>以下命令可以从关联菜单中执行:</p><ul><li><img src="'+a+'" alt="打开"> 打开 ― 打开选定的文件进行编辑。 双击文件或按回车键即可完成相同的操作。</li><li><img src="'+Q+'" alt="打开文件夹"> 打开文件夹 ― 打开选定的文件夹或包含选定文件的文件夹。</li><li><img src="'+i+'" alt="新文件"> 新建文件 ― 使用 MQL4/MQL5 向导创建一个新的 MQL4/MQL5 程序。</li><li><img src="'+k+'" alt="新建项目"> 新建项目 ― 创建一个 <a href="/metaeditor/mql5storage/projects#create">新项目</a>。</li><li><img src="'+o+'" alt="从源文件新建项目"> 从源文件新建项目 ― 新 <a href="/metaeditor/mql5storage/projects#create_source">项目从选定源文件</a> 创建。</li><li><img src="'+w+'" alt="新建文件夹"> 新建文件夹 ― 在当前目录中创建一个新文件夹。 按 Insert 即可执行相同的操作。</li><li><img src="'+L+'" alt="重命名"> 重命名 ― 重命名选定的文件或文件夹。 按 F2 即可执行相同的操作。</li><li><img src="'+e+'" alt="删除"> 删除 ― 删除选定的文件或文件夹。 按 Delete 键可以执行相同的操作。</li><li><img src="'+m+'" alt="刷新"> 刷新 ― 刷新导航器窗口。 如果文件或文件夹被复制到 MQL4 或 MQL5 子文件夹之一，这些更改将自动显示在 &quot;导航器&quot; 窗口中。 然而，您可以通过执行此命令或按 F5 手工重新读取文件结构。</li><li><img src="'+l+'" alt="编译"> 编译 ― <a href="/metaeditor/development/compile">编译</a> 所选文件。 对文件夹执行此命令则会编译其中包含的所有文件。</li><li><img src="'+T+'" alt="显示所有文件"> 显示所有文件 ― 显示/隐藏所有文件。 如果禁用该选项，则导航器中将显示源代码（<em>.MQ4，</em>.MQ5，<em>.MQH，</em>.CPP 和 <em>.H）和文本文件（</em>.TXT 和 *.CSV），而可执行文件隐藏。</li><li><img src="'+s+'" alt="激活 MQL5 存储"> 激活 MQL5 存储 ― 开始使用您的个人<a href="/metaeditor/mql5storage/mql5storage_connect">MQL5 存储</a> 保存源代码。</li><li><img src="'+_+'" alt="从存储更新"> 从存储更新 ― 从存储里 <a href="/metaeditor/mql5storage/mql5storage_working#update">提取</a> 最新的数据修订版。</li><li><img src="'+p+'" alt="提交至存储"> 提交至存储 ― <a href="/metaeditor/mql5storage/mql5storage_working#commit">发送</a> 当前数据更改至存储。</li><li><img src="'+c+'" alt="添加文件或文件夹"> 添加文件或文件夹 ― <a href="/metaeditor/mql5storage/mql5storage_working#add">添加</a> 本地文件夹或文件至存储。 文件夹或文件添加至本地。 执行提交至存储命令以便将更改插入存储。</li><li><img src="'+n+'" alt="删除文件或文件夹"> 删除文件或文件夹 ― 从存储理 <a href="/metaeditor/mql5storage/mql5storage_working#add">删除</a> 一个文件夹或文件。 删除是在本地执行的（文件或文件夹被物理删除）。 执行提交至存储命令将更改插入到存储。</li><li><img src="'+g+'" alt="版本的差别"> 版本的差别 ― <a href="/metaeditor/mql5storage/mql5storage_diff">查看当前文件更改</a> 与来自存储里的最后修订版比较。</li><li><img src="'+f+'" alt="恢复更改"> 恢复更改 ― 还原文件的本地副本中所做的更改。</li><li><img src="'+d+'" alt="显示存储日志"> 显示存储日志 ― 显示存储日志。</li></ul>',14)]))}const X=h(P,[["render",$]]);export{W as __pageData,X as default};
