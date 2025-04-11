import{_ as a,c as o,ag as r,o as t}from"./chunks/framework.BhgIN1sM.js";const i="/images/book1/MQL5-Programming-for-Traders-2-1.png",n="/images/book1/MQL5-Programming-for-Traders-2-2.png",d="/images/book1/MQL5-Programming-for-Traders-2-3.png",h=JSON.parse('{"title":"编辑、编译和运行程序","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/mq5_programming_for_traders/welcome/editing_compiling_running"}],["meta",{"property":"og:title","content":"编辑、编译和运行程序"}]]},"headers":[],"relativePath":"mq5_programming_for_traders/welcome/editing_compiling_running.md","filePath":"mq5_programming_for_traders/welcome/editing_compiling_running.md"}'),m={name:"mq5_programming_for_traders/welcome/editing_compiling_running.md"};function c(p,e,l,s,_,g){return t(),o("div",null,e[0]||(e[0]=[r('<h1 id="编辑、编译和运行程序" tabindex="-1">编辑、编译和运行程序 <a class="header-anchor" href="#编辑、编译和运行程序" aria-label="Permalink to &quot;编辑、编译和运行程序&quot;">​</a></h1><p>所有MetaTrader 5程序都是可编译的。也就是说，用MQL5编写的源代码必须经过编译，才能获得可在终端中执行的二进制表示。</p><h2 id="在metaeditor中编辑mql程序" tabindex="-1">在MetaEditor中编辑MQL程序 <a class="header-anchor" href="#在metaeditor中编辑mql程序" aria-label="Permalink to &quot;在MetaEditor中编辑MQL程序&quot;">​</a></h2><p>程序使用MetaEditor进行编辑和编译。</p><p><img src="'+i+'" alt="在MetaEditor中编辑MQL5程序"></p><p>源代码是按照MQL5规则编写的文本，保存为扩展名为<code>.mq5</code>的文件。编译后的程序文件将具有相同的名称，扩展名为<code>.ex5</code>。</p><p>在简单情况下，一个可执行文件对应一个包含源代码的文件。但当编写复杂程序时，通常需要将源代码拆分为多个文件：主文件和若干辅助文件（通过特殊方式从主文件调用）。在这种情况下： • 主文件必须保留<code>.mq5</code>扩展名 • 从主文件调用的辅助文件使用<code>.mqh</code>扩展名</p><p>所有源文件中的语句都将合并到生成的可执行文件中。这意味着多个源代码文件可以共同构建一个可执行程序（这部分内容将在本书第二部分详细介绍）。</p><h2 id="mql5语法规则" tabindex="-1">MQL5语法规则 <a class="header-anchor" href="#mql5语法规则" aria-label="Permalink to &quot;MQL5语法规则&quot;">​</a></h2><p>我们使用&quot;MQL5语法&quot;这个术语来表示构建MQL5程序所需遵循的所有规则集合。只有严格遵守语法规则，才能编写出与编译器兼容的程序。实际上，学习编程就是逐步掌握特定语言（这里指MQL5）的规则，这也是本书的主要目的。</p><h2 id="编译mql程序" tabindex="-1">编译MQL程序 <a class="header-anchor" href="#编译mql程序" aria-label="Permalink to &quot;编译MQL程序&quot;">​</a></h2><p>要编译源代码，可以使用以下方法： • 使用MetaEditor的菜单命令：文件 -&gt; 编译 • 直接按F7快捷键 • 其他特殊编译方法（后续章节将详细介绍）</p><p><img src="'+n+'" alt="在MetaEditor中编译MQL5程序"></p><p>编译过程中会在编辑器日志中显示状态变化。对于包含多个源文件的MQL5程序，每个文件的调用都会在日志中单独标记一行。</p><p>编译成功的标志是&quot;0 errors&quot;。虽然警告不会影响编译结果，但它们提示潜在问题，建议像处理错误一样修复警告。理想情况下应该达到&quot;0 warnings&quot;状态。</p><p>成功编译<code>.mq5</code>文件后，会生成同名<code>.ex5</code>文件。MetaTrader 5导航器会以树形结构显示<code>MQL5</code>文件夹及其子文件夹中的所有可执行<code>.ex5</code>文件，包括刚编译完成的文件。</p><h2 id="运行已编译程序" tabindex="-1">运行已编译程序 <a class="header-anchor" href="#运行已编译程序" aria-label="Permalink to &quot;运行已编译程序&quot;">​</a></h2><p><img src="'+d+'" alt="包含已编译MQL5程序的MetaTrader 5导航器"></p><p>已完成的程序可以通过用户熟悉的任何方式在终端中启动。例如： • 除服务程序外的其他程序，可以通过鼠标从导航器拖拽到图表上运行 • 服务程序有专门的运行方式（后续章节将单独说明）</p><h2 id="调试模式" tabindex="-1">调试模式 <a class="header-anchor" href="#调试模式" aria-label="Permalink to &quot;调试模式&quot;">​</a></h2><p>开发者通常需要以调试模式运行程序来定位错误原因。为此提供多个专用命令，我们将在&quot;错误修复和调试&quot;章节中详细介绍相关内容。</p><blockquote><p>注意：所有技术术语（如MetaEditor、MQL5、ex5等）保持原名不变，以确保技术准确性。文件扩展名使用行内代码格式标注（如<code>.mq5</code>）。</p></blockquote>',22)]))}const u=a(m,[["render",c]]);export{h as __pageData,u as default};
