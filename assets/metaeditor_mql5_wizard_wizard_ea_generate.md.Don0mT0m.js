import{_ as i}from"./chunks/compile_icon.BdBG-A29.js";import{_ as r,c as l,ag as o,o as s}from"./chunks/framework.BhgIN1sM.js";const p="/metaeditor/wizard_ea_common.png",n="/metaeditor/wizard_ea_signal.png",a="/metaeditor/parameter_active_icon.png",e="/metaeditor/parameter_inactive_icon.png",m="/metaeditor/wizard_ea_trailing.png",c="/metaeditor/wizard_ea_mm.png",b=JSON.parse('{"title":"创建成品智能交易系统","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/metaeditor/mql5_wizard/wizard_ea_generate"}],["meta",{"property":"og:title","content":"创建成品智能交易系统"}]]},"headers":[],"relativePath":"metaeditor/mql5_wizard/wizard_ea_generate.md","filePath":"metaeditor/mql5_wizard/wizard_ea_generate.md"}'),d={name:"metaeditor/mql5_wizard/wizard_ea_generate.md"};function _(u,t,h,g,q,w){return s(),l("div",null,t[0]||(t[0]=[o('<h1 id="创建成品智能交易系统" tabindex="-1">创建成品智能交易系统 <a class="header-anchor" href="#创建成品智能交易系统" aria-label="Permalink to &quot;创建成品智能交易系统&quot;">​</a></h1><p><a href="/metaeditor/mql5_wizard/">MQL4/MQL5 向导</a> 能够基于与交易平台一起提供的 <a href="https://www.mql5.com/zh/docs/standardlibrary" title="标准程序库" target="_blank" rel="noreferrer">标准库</a>创建整套操作的 EA。 为此，请在 MQL4/MQL5 向导的第一页上选择 &quot;智能交易系统 (生成)&quot;。</p><h2 id="一般参数" tabindex="-1">一般参数 <a class="header-anchor" href="#一般参数" aria-label="Permalink to &quot;一般参数&quot;">​</a></h2><p><img src="'+p+'" alt="一般参数"></p><p>填写以下字段:</p><ul><li>名称 ― EA 名称 相同的名称被分配给 EA 文件。 在此，您还可以更改目标文件的路径。 例如，在新的 \\Experts子文件夹中创建它。</li><li>作者 ― 作者名。</li><li>链接 ― 开发者的电子邮件地址或网站。</li></ul><p>下面描述默认创建时的一组强制参数:</p><ul><li id="symbol">品种 ― 在 &quot;数值&quot; 字段中指定 EA 要处理的品种。 如果是 &quot;当前&quot;, 则 EA 能处理任何品种。 加载 EA 的图表品种将用作工作品种。</li><li id="timeframe">时间帧 ― 指定 EA 处理 &quot;数值&quot; 字段的时间帧。 如果是 &quot;当前&quot;, 则 EA 能工作在任何图表时间帧。</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>智能交易系统不会在指定品种或时间帧之外的图表上运行。 如果品种或时间帧不正确，相应的消息将显示在平台日志中。</p></div><h2 id="signal" tabindex="-1">信号 <a class="header-anchor" href="#signal" aria-label="Permalink to &quot;信号{#signal}&quot;">​</a></h2><p>在这个阶段选择信号模块。 EA 根据从它们收到的数据做出交易决策。 共有 64 个模块可用。 您可以任意组合模块，还可将具有不同设置的一些类似模块添加到 EA。</p><h2 id="制定交易决策的机制在-mql5-参考-中有所阐述。" tabindex="-1">制定交易决策的机制在 <a href="https://www.mql5.com/zh/docs/standardlibrary/ExpertClasses/CSignal#mechanism" target="_blank" rel="noreferrer">MQL5 参考</a> 中有所阐述。 <a class="header-anchor" href="#制定交易决策的机制在-mql5-参考-中有所阐述。" aria-label="Permalink to &quot;制定交易决策的机制在 [MQL5 参考](https://www.mql5.com/zh/docs/standardlibrary/ExpertClasses/CSignal#mechanism) 中有所阐述。&quot;">​</a></h2><p>若要添加或更改模块设置，请单击添加或修改。</p><p><img src="'+n+'" alt="信号"></p><p>指定信号模块参数:</p><ul><li>名称 ― 可定制（添加）信号模块。 信号源代码文件位于 \\MQL5\\Include\\Expert\\Signal\\ 目录中。 若要打开一个 <a href="https://www.mql5.com/zh/docs/standardlibrary/ExpertClasses/CSignal" target="_blank" rel="noreferrer">所选模块的详尽描述</a>，请单击 &quot;?&quot;。</li><li>品种 是一个工作品种，其价格数据将由模块进行分析。</li><li>使用当前 ― 当启用时, <a href="/metaeditor/mql5_wizard/wizard_ea_generate#symbol">EA 自选的工作品种</a> 作为工作模块的品种。</li><li>时间帧 ― 工作时间帧由模块分析。 如果是 &quot;当前&quot;, <a href="/metaeditor/mql5_wizard/wizard_ea_generate#timeframe">EA 自选的工作时间帧</a> 作为工作模块的时间帧。</li></ul><p>每个信号模块都有一组内置参数:</p><ul><li><p>名称 ― 参数名。 例如，PeriodMA 是应用移动平均的时间帧。</p></li><li><p>类型 ― 参数变量类型。 例如，int 表示整数。</p></li><li><p>值 ― 默认参数值。</p></li><li><p>如果参数标记为<img src="'+a+'" alt="激活">图标, 它可用作 EA 输入变量。 这些参数可以在 EA 操作期间更改，并在策略测试器中进行优化时使用。 双击参数令其锁定（在智能交易系统运行时不可修改）。 它的图标变成灰色 ―<img src="'+e+'" alt="未激活"> 中的测试程序。</p></li><li><p>每个模块都有自己的权重参数。 它定义制定交易操作的最终决策时所参考的模块信号权重。 制定交易决策的机制在 <a href="https://www.mql5.com/zh/docs/standardlibrary/ExpertClasses/CSignal#mechanism" target="_blank" rel="noreferrer">MQL5 参考</a> 中有所阐述。</p></li></ul><hr><p>追踪</p><p>在此阶段，选择移动止损类型和止盈价位。</p><p><img src="'+m+'" alt="追踪"></p><p>在名称字段中选择追踪类型。 函数数据的源代码文件位于文件夹 [平台数据目录]\\MQL5\\Include\\Expert\\Trailing\\。 每种类型的追踪都有自己的一组参数。</p><ul><li>名称 ― 参数名称。</li><li>类型 ― 参数变量类型。</li><li>值 ― 默认参数值。</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>如果参数标记为<img src="'+a+'" alt="激活">图标, 它可用作 EA 输入变量。 这些参数可以在 EA 操作期间更改，并在策略测试器中进行优化时使用。 双击参数，令其锁定（在智能交易系统运行时不可修改）。 它的图标变成灰色 ―<img src="'+e+'" alt="未激活"> 中的测试程序。</p></div><h2 id="资金管理" tabindex="-1">资金管理 <a class="header-anchor" href="#资金管理" aria-label="Permalink to &quot;资金管理&quot;">​</a></h2><p>在这个阶段，您应该为您的 EA 选择一个资金管理类型。</p><p><img src="'+c+'" alt="资金管理"></p><p>在名称字段中设置资金管理类型。 函数数据的源代码文件位于文件夹 [平台数据]\\MQL5\\Include\\Expert\\Money\\ 目录中。 每种类型的资金管理都有自己的一套参数。</p><ul><li>名称 ― 参数名称。</li><li>类型 ― 参数变量类型。</li><li>值 ― 默认参数值。</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>如果参数标记为<img src="'+a+'" alt="激活">图标, 它可用作 EA 输入变量。 这些参数可以在 EA 操作期间更改，并在策略测试器中进行优化时使用。 双击参数，令其锁定（在智能交易系统运行时不可修改）。 它的图标变成灰色 ―<img src="'+e+'" alt="未激活"> 中的测试程序。</p></div><p>单击完成生成 EA 的 MQ5 文件。 若要获取可在交易平台上运行的可执行 EA 文件，请 <a href="/metaeditor/development/compile">编译</a> 所获得的 MQ5 文件。 为此, 点击 <img src="'+i+'" alt="编译">编译或按 F7。</p><p>来自标准库中的特殊类作为信号、追踪和资金管理模块。 另外，您可以编写自己的类（以及基于现有类创建它们）。 将它们放在以下目录中，令它们在 MQL5 向导中可用:</p><ul><li>信号模块: [平台目录]\\MQL5\\Include\\Expert\\Signal</li><li>追踪模块: [平台目录]\\MQL5\\Include\\Expert\\Trailing</li><li>资金管理模块: [平台目录]\\MQL5\\Include\\Expert\\Money</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>请在文章 <a href="https://www.mql5.com/zh/articles/226" target="_blank" rel="noreferrer">&quot;MQL5 向导: 如何创建交易信号模块&quot;</a> 中查找更多有关自建模块的内容。</p></div>',35)]))}const A=r(d,[["render",_]]);export{b as __pageData,A as default};
