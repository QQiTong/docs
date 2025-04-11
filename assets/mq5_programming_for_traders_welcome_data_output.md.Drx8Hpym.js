import{_ as n,c as s,ag as e,o as t}from"./chunks/framework.BhgIN1sM.js";const p="/images/book1/MQL5-Programming-for-Traders-11-1.png",o="/images/book1/MQL5-Programming-for-Traders-11-2.png",g=JSON.parse('{"title":"数据输出","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/mq5_programming_for_traders/welcome/data_output"}],["meta",{"property":"og:title","content":"数据输出"}]]},"headers":[],"relativePath":"mq5_programming_for_traders/welcome/data_output.md","filePath":"mq5_programming_for_traders/welcome/data_output.md"}'),i={name:"mq5_programming_for_traders/welcome/data_output.md"};function l(r,a,d,c,m,u){return t(),s("div",null,a[0]||(a[0]=[e(`<h1 id="数据输出" tabindex="-1">数据输出 <a class="header-anchor" href="#数据输出" aria-label="Permalink to &quot;数据输出&quot;">​</a></h1><p>在我们的脚本案例中，数据输出通过使用<code>Print</code>函数将问候语记录到日志中来实现。必要时，MQL5允许将结果保存到文件和数据库、通过互联网发送，并显示为图形序列（在指标中）或图表上的对象。</p><h2 id="即时信息显示" tabindex="-1">即时信息显示 <a class="header-anchor" href="#即时信息显示" aria-label="Permalink to &quot;即时信息显示&quot;">​</a></h2><p>若需要向用户传递简单的即时信息，且不希望用户查看日志（日志是用于监控程序运行的服务工具，可能被隐藏于屏幕外），最简单的方式是使用MQL5 API函数<code>Comment</code>。它的用法与<code>Print</code>完全相同。不过，执行该函数后文本不会显示在日志中，而是出现在当前图表的左上角。</p><p>例如，在脚本中将<code>Print</code>替换为<code>Comment</code>后，我们可以得到以下<code>Greeting</code>函数：</p><div class="language-MQL5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">MQL5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  Comment(Greeting(GreetingHour), &quot;, &quot;, Symbol());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在终端中运行修改后的脚本后，效果如下：</p><p><img src="`+p+'" alt="使用Comment函数在图表上显示文本信息"></p><h2 id="警报通知" tabindex="-1">警报通知 <a class="header-anchor" href="#警报通知" aria-label="Permalink to &quot;警报通知&quot;">​</a></h2><p>若需要同时向用户显示文本信息并提醒其注意环境变化（如新的交易信号或需要人工干预的突发事件），最好使用<code>Alert</code>函数。它会将通知发送到独立的终端窗口，该窗口会弹出在主窗口上方，并伴随声音提示。</p><p><code>Alert</code>的语法与<code>Print</code>和<code>Comment</code>完全相同。</p><p>下图展示了<code>Alert</code>函数的运行效果：</p><p><img src="'+o+`" alt="使用Alert函数显示通知"></p><blockquote><p><strong>注意</strong><br> 本书未附赠使用<code>Comment</code>和<code>Alert</code>函数的脚本版本，建议读者自行编辑<code>GoodTime2.mq5</code>文件进行尝试，并复现本文提供的截图效果。</p></blockquote><h2 id="功能对比表" tabindex="-1">功能对比表 <a class="header-anchor" href="#功能对比表" aria-label="Permalink to &quot;功能对比表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>函数</th><th>输出位置</th><th>特点</th><th>适用场景</th></tr></thead><tbody><tr><td><code>Print</code></td><td>终端日志</td><td>静默记录</td><td>日常运行日志记录</td></tr><tr><td><code>Comment</code></td><td>图表左上角</td><td>实时可见</td><td>即时状态显示</td></tr><tr><td><code>Alert</code></td><td>弹出窗口+声音提示</td><td>强提醒功能</td><td>重要事件通知</td></tr></tbody></table><h2 id="代码示例扩展" tabindex="-1">代码示例扩展 <a class="header-anchor" href="#代码示例扩展" aria-label="Permalink to &quot;代码示例扩展&quot;">​</a></h2><p>以下是使用三种输出方式的完整示例：</p><div class="language-MQL5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">MQL5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// 定义问候时段枚举</span></span>
<span class="line"><span>enum ENUM_GREETING_HOURS {</span></span>
<span class="line"><span>    MORNING = 6,</span></span>
<span class="line"><span>    DAY     = 12,</span></span>
<span class="line"><span>    EVENING = 18,</span></span>
<span class="line"><span>    NIGHT   = 0</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 获取问候语函数</span></span>
<span class="line"><span>string Greeting(int hour)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    if(hour &gt;= 6 &amp;&amp; hour &lt; 12)  return &quot;早上好&quot;;</span></span>
<span class="line"><span>    if(hour &gt;= 12 &amp;&amp; hour &lt; 18) return &quot;下午好&quot;;</span></span>
<span class="line"><span>    if(hour &gt;= 18 &amp;&amp; hour &lt; 24) return &quot;晚上好&quot;;</span></span>
<span class="line"><span>    return &quot;晚安&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // 获取当前小时（演示用固定值）</span></span>
<span class="line"><span>    int demoHour = 9;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 三种输出方式演示</span></span>
<span class="line"><span>    Print(&quot;[日志] &quot;, Greeting(demoHour));          // 输出到日志</span></span>
<span class="line"><span>    Comment(Greeting(demoHour), &quot;，当前品种：&quot;, Symbol()); // 图表显示</span></span>
<span class="line"><span>    Alert(&quot;注意！&quot;, Greeting(demoHour), &quot;交易信号&quot;);  // 弹出警报</span></span>
<span class="line"><span>}</span></span></code></pre></div><blockquote><p><strong>操作建议</strong><br> 建议在策略测试器中运行不同版本，观察：</p><ol><li>日志输出在&quot;专家&quot;标签页</li><li>图表注释实时更新</li><li>警报窗口的弹出位置和声音提示（需启用终端通知设置）</li></ol></blockquote>`,20)]))}const _=n(i,[["render",l]]);export{g as __pageData,_ as default};
