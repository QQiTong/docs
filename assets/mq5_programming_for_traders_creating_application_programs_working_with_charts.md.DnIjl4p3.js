import{_ as l,c as h,ag as i,j as n,a,G as e,w as t,B as d,o as k}from"./chunks/framework.BhgIN1sM.js";const b=JSON.parse('{"title":"图表操作","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/mq5_programming_for_traders/creating_application_programs/working_with_charts"}],["meta",{"property":"og:title","content":"图表操作"}]]},"headers":[],"relativePath":"mq5_programming_for_traders/creating_application_programs/working_with_charts.md","filePath":"mq5_programming_for_traders/creating_application_programs/working_with_charts.md"}'),c={name:"mq5_programming_for_traders/creating_application_programs/working_with_charts.md"};function o(r,s,E,g,y,C){const p=d("tag");return k(),h("div",null,[s[12]||(s[12]=i(`<h1 id="图表操作" tabindex="-1">图表操作 <a class="header-anchor" href="#图表操作" aria-label="Permalink to &quot;图表操作&quot;">​</a></h1><p>大多数MQL程序，像脚本、指标以及智能交易系统，都是在图表上执行的。只有服务程序会在后台运行，且不与特定的时间安排绑定。MQL提供了丰富的函数集，可用于获取和修改图表属性、分析图表列表以及查找其他正在运行的程序。</p><p>由于图表是指标运行的天然环境，在之前关于指标的章节中，我们已经有机会了解到其中一些功能。在本章，我们将有针对性地研究所有这些函数。</p><p>在处理图表时，我们会用到“窗口”这个概念。窗口是用于显示价格图表和/或指标图表的特定区域。最上面的窗口通常也是最大的窗口，用于显示价格图表，其编号为0，并且这个窗口始终存在。在放置指标时添加到下方的所有额外窗口，编号从1开始依次递增（从上到下编号）。每个子窗口只有在至少包含一个指标时才会存在。</p><p>由于用户可以删除任意子窗口（包括并非最下方的子窗口）中的所有指标，剩余子窗口的索引可能会随之减小。</p><p>关于图表的事件模型，即接收和处理图表事件通知以及生成自定义事件，将在单独的章节中进行讨论。</p><p>除了这里所讨论的“窗口中的图表”，MetaTrader 5还允许创建“对象中的图表”。我们将在下一章中探讨图形对象相关内容。</p><h2 id="获取当前图表基本属性的函数" tabindex="-1">获取当前图表基本属性的函数 <a class="header-anchor" href="#获取当前图表基本属性的函数" aria-label="Permalink to &quot;获取当前图表基本属性的函数&quot;">​</a></h2><p>在本书的许多示例中，我们已经不得不使用预定义变量，这些变量包含了图表及其工作交易品种的主要属性。MQL 程序也可以访问一些能够返回其中某些变量值的函数。无论是使用变量还是函数都无关紧要，因此你可以使用自己喜欢的源代码风格。</p><p>每个图表都由一个工作交易品种和时间周期来表征。分别可以使用 <code>Symbol</code> 和 <code>Period</code> 函数来获取它们。此外，MQL5 提供了对两种最常用交易品种属性的简化访问方式：价格点值（<code>Point</code>）以及价格中小数点后的有效数字位数（<code>Digits</code>）。</p><ol><li><p><strong><code>string Symbol()</code></strong><code>Symbol</code> 函数返回当前图表的交易品种名称，即系统变量 <code>_Symbol</code> 的值。要获取任意图表的交易品种，有 <code>ChartSymbol</code> 函数，它基于图表标识符进行操作。我们稍后会讨论获取图表标识符的方法。</p></li><li><p><strong><code>ENUM_TIMEFRAMES Period()</code></strong><code>Period</code> 函数返回当前图表的时间周期值（<code>ENUM_TIMEFRAMES</code>），这与 <code>_Period</code> 变量相对应。要获取任意图表的时间周期，请使用 <code>ChartPeriod</code> 函数，并且它也需要一个标识符作为参数。</p></li><li><p><strong><code>double Point()</code></strong><code>Point</code> 函数返回当前交易品种以报价货币表示的点值，这与 <code>_Point</code> 变量的值相同。</p></li><li><p><strong><code>int Digits()</code></strong> 该函数返回小数点后的小数位数，它决定了当前图表交易品种价格测量的精度，这等同于变量 <code>_Digits</code>。</p></li></ol><p>当前交易品种的其他属性可以通过 <code>SymbolInfo</code> 系列函数来获取，在更一般的情况下，这些函数可用于分析所有交易品种。</p><p>下面是脚本 <code>ChartMainProperties.mq5</code> 的一个简单示例，它将本节描述的属性记录到日志中。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   PRTF(_Symbol);</span></span>
<span class="line"><span>   PRTF(Symbol());</span></span>
<span class="line"><span>   PRTF(_Period);</span></span>
<span class="line"><span>   PRTF(Period());</span></span>
<span class="line"><span>   PRTF(_Point);</span></span>
<span class="line"><span>   PRTF(Point());</span></span>
<span class="line"><span>   PRTF(_Digits);</span></span>
<span class="line"><span>   PRTF(Digits());</span></span>
<span class="line"><span>   PRTF(DoubleToString(_Point, _Digits));</span></span>
<span class="line"><span>   PRTF(EnumToString(_Period));</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>对于 EURUSD,H1 图表，我们将得到以下日志记录：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>_Symbol=EURUSD / ok</span></span>
<span class="line"><span>Symbol()=EURUSD / ok</span></span>
<span class="line"><span>_Period=16385 / ok</span></span>
<span class="line"><span>Period()=16385 / ok</span></span>
<span class="line"><span>_Point=1e-05 / ok</span></span>
<span class="line"><span>Point()=1e-05 / ok</span></span>
<span class="line"><span>_Digits=5 / ok</span></span>
<span class="line"><span>Digits()=5 / ok</span></span>
<span class="line"><span>DoubleToString(_Point,_Digits)=0.00001 / ok</span></span>
<span class="line"><span>EnumToString(_Period)=PERIOD_H1 / ok</span></span></code></pre></div><h2 id="图表标识" tabindex="-1">图表标识 <a class="header-anchor" href="#图表标识" aria-label="Permalink to &quot;图表标识&quot;">​</a></h2><p>在 MetaTrader 5 里，每个图表都在独立的窗口中运行，并且拥有唯一的标识符。对于熟悉 Windows 操作系统原理的程序员，需要说明的是，这个标识符并非系统窗口句柄（不过 MQL5 API 允许通过 <code>CHART_WINDOW_HANDLE</code> 属性获取系统窗口句柄）。我们知道，除了包含报价的图表主工作区域之外，还有一些带有 <code>indicator_separate_window</code> 属性的指标的额外区域（子窗口）。所有子窗口都是图表的一部分，并且属于同一个 Windows 窗口。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>long ChartID()</span></span></code></pre></div><p>该函数会返回当前图表的唯一标识符。</p><p>我们后续会介绍的许多函数都需要将图表 ID 作为参数，但你可以用 0 来表示当前图表，而无需调用 <code>ChartID</code> 函数。当标识符需要在 MQL 程序之间传递时，使用 <code>ChartID</code> 函数就很有必要了，例如在同一图表或不同图表之间交换消息（自定义事件）时。如果指定了无效的 ID，将会导致 <code>ERR_CHART_WRONG_ID</code>（4101）错误。</p><p>一般来说，图表 ID 在不同会话之间保持不变。</p><p>在学习了获取图表列表的方法之后，我们将在示例脚本 <code>ChartList1.mq5</code> 中演示 <code>ChartID</code> 函数的使用以及标识符的样子。</p><h2 id="获取图表列表" tabindex="-1">获取图表列表 <a class="header-anchor" href="#获取图表列表" aria-label="Permalink to &quot;获取图表列表&quot;">​</a></h2><p>MQL程序能够借助<code>ChartFirst</code>和<code>ChartNext</code>函数获取终端中打开的图表列表（包括窗口和图形对象）。</p><h3 id="long-chartfirst" tabindex="-1">long ChartFirst() <a class="header-anchor" href="#long-chartfirst" aria-label="Permalink to &quot;long ChartFirst()&quot;">​</a></h3><p><code>ChartFirst</code>函数会返回客户端终端中第一个图表的标识符。MetaTrader 5维护着一个包含所有图表的内部列表，其顺序可能和我们在屏幕上看到的不同，比如在窗口标签最大化时。特别是，拖动标签、取消窗口停靠和重新停靠窗口等操作可能会改变列表中的顺序。在终端加载完成后，标签的可见顺序和内部列表的顺序是一致的。</p><h3 id="long-chartnext-long-chartid" tabindex="-1">long ChartNext(long chartId) <a class="header-anchor" href="#long-chartnext-long-chartid" aria-label="Permalink to &quot;long ChartNext(long chartId)&quot;">​</a></h3><p><code>ChartNext</code>函数会返回指定<code>chartId</code>图表之后的图表的ID。</p><p>和其他用于处理图表的函数不同，<code>ChartId</code>参数的值为0并不代表当前图表，而是列表的起始位置。也就是说，调用<code>ChartNext(0)</code>等同于调用<code>ChartFirst</code>。</p><p>如果到达列表末尾，该函数会返回 -1。</p><p>脚本<code>ChartList1.mq5</code>会将图表列表输出到日志中。主要工作由<code>OnStart</code>调用的<code>ChartList</code>函数完成。在该函数一开始，我们使用<code>ChartID</code>获取当前图表的标识符，然后在列表中用星号标记它。最后，输出图表的总数。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ChartList();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>void ChartList()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   const long me = ChartID();</span></span>
<span class="line"><span>   long id = ChartFirst();</span></span>
<span class="line"><span>   // long id = ChartNext(0); - 等同于调用ChartFirst()</span></span>
<span class="line"><span>   int count = 0, used = 0;</span></span>
<span class="line"><span>   Print(&quot;Chart List\\nN, ID, *active&quot;);</span></span>
<span class="line"><span>   // 持续遍历图表，直到没有剩余图表</span></span>
<span class="line"><span>   while(id != -1)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      const string header = StringFormat(&quot;%d %lld %s&quot;,</span></span>
<span class="line"><span>         count, id, (id == me ? &quot; *&quot; : &quot;&quot;));</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>      // 字段：编号、ID、当前图表标签</span></span>
<span class="line"><span>      Print(header);</span></span>
<span class="line"><span>      count++;</span></span>
<span class="line"><span>      id = ChartNext(id);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   Print(&quot;Total chart number: &quot;, count);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>下面是一个示例结果：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Chart List</span></span>
<span class="line"><span>N, ID, *active</span></span>
<span class="line"><span>0 132358585987782873 </span></span>
<span class="line"><span>1 132360375330772909  *</span></span>
<span class="line"><span>2 132544239145024745 </span></span>
<span class="line"><span>3 132544239145024732 </span></span>
<span class="line"><span>4 132544239145024744 </span></span>
<span class="line"><span>Total chart number: 5</span></span></code></pre></div><p>这段代码的主要逻辑如下：</p><ol><li>在<code>OnStart</code>函数中调用<code>ChartList</code>函数。</li><li><code>ChartList</code>函数首先获取当前图表的ID。</li><li>调用<code>ChartFirst</code>函数获取第一个图表的ID。</li><li>进入循环，只要<code>id</code>不为 -1，就持续遍历图表。</li><li>在循环中，格式化并输出当前图表的编号、ID以及是否为当前激活图表的标记。</li><li>增加计数器<code>count</code>的值，并调用<code>ChartNext</code>函数获取下一个图表的ID。</li><li>循环结束后，输出图表的总数。</li></ol><h2 id="获取任意图表的交易品种和时间周期" tabindex="-1">获取任意图表的交易品种和时间周期 <a class="header-anchor" href="#获取任意图表的交易品种和时间周期" aria-label="Permalink to &quot;获取任意图表的交易品种和时间周期&quot;">​</a></h2><p>任何图表都有两个基本属性，即其工作交易品种和时间周期。正如我们之前所了解到的，当前图表的这些属性可以通过内置变量 <code>_Symbol</code> 和 <code>_Period</code> 来获取，也可以通过相关函数 <code>Symbol</code> 和 <code>Period</code> 来获取。若要确定其他图表的相同属性，可以使用以下函数：<code>ChartSymbol</code> 和 <code>ChartPeriod</code>。</p><ol><li><strong><code>string ChartSymbol(long chartId = 0)</code></strong> 该函数用于返回具有指定标识符的图表的交易品种名称。若参数为 0，则默认表示当前图表。</li></ol><p>若图表不存在，函数会返回空字符串 <code>&quot;&quot;</code>，并且 <code>_LastError</code> 会设置错误代码 <code>ERR_CHART_WRONG_ID</code>（4101）。</p><ol start="2"><li><strong><code>ENUM_TIMEFRAMES ChartPeriod(long chartId = 0)</code></strong> 此函数返回具有指定标识符的图表的时间周期值。</li></ol><p>若图表不存在，函数将返回 0。</p><p>脚本 <code>ChartList2.mq5</code> 与 <code>ChartList1.mq5</code> 类似，它会生成一个图表列表，其中会标明每个图表的交易品种和时间周期。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#include &lt;MQL5Book/Periods.mqh&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ChartList();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>void ChartList()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   const long me = ChartID();</span></span>
<span class="line"><span>   long id = ChartFirst();</span></span>
<span class="line"><span>   int count = 0;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   Print(&quot;Chart List\\nN, ID, Symbol, TF, *active&quot;);</span></span>
<span class="line"><span>   // 持续遍历图表，直到没有剩余图表</span></span>
<span class="line"><span>   while(id != -1)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      const string header = StringFormat(&quot;%d %lld %s %s %s&quot;,</span></span>
<span class="line"><span>         count, id, ChartSymbol(id), PeriodToString(ChartPeriod(id)),</span></span>
<span class="line"><span>         (id == me ? &quot; *&quot; : &quot;&quot;));</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>      // 字段：序号、ID、交易品种、时间周期、当前图表的标签</span></span>
<span class="line"><span>      Print(header);</span></span>
<span class="line"><span>      count++;</span></span>
<span class="line"><span>      id = ChartNext(id);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   Print(&quot;Total chart number: &quot;, count);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>以下是在 EURUSD、H1 图表（第二行）上运行该脚本后，日志内容的示例：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Chart List</span></span>
<span class="line"><span>N, ID, Symbol, TF, *active</span></span>
<span class="line"><span>0 132358585987782873 EURUSD M15 </span></span>
<span class="line"><span>1 132360375330772909 EURUSD H1  *</span></span>
<span class="line"><span>2 132544239145024745 XAUUSD H1 </span></span>
<span class="line"><span>3 132544239145024732 USDRUB D1 </span></span>
<span class="line"><span>4 132544239145024744 EURUSD H1 </span></span>
<span class="line"><span>Total chart number: 5</span></span></code></pre></div><p>MQL5 不仅能够识别任意图表的交易品种和时间周期，还能对其进行切换。</p><h2 id="处理完整图表属性集的函数概述" tabindex="-1">处理完整图表属性集的函数概述 <a class="header-anchor" href="#处理完整图表属性集的函数概述" aria-label="Permalink to &quot;处理完整图表属性集的函数概述&quot;">​</a></h2><p>图表属性可通过 <code>ChartSet-</code> 和 <code>ChartGet-</code> 这两组函数进行读取和编辑，每组函数涵盖特定类型的属性，包括实数（<code>double</code>）、整数（<code>long</code>、<code>int</code>、<code>datetime</code>、<code>color</code>、<code>bool</code>、枚举类型）和字符串。</p><p>所有这些函数的第一个参数都是图表 ID。值为 0 表示当前图表，这等同于传递 <code>ChartID()</code> 函数的调用结果。但这并不意味着当前图表的 ID 就是 0。</p><p>描述所有属性的常量形成了三个枚举：<code>ENUM_CHART_PROPERTY_INTEGER</code>、<code>ENUM_CHART_PROPERTY_DOUBLE</code> 和 <code>ENUM_CHART_PROPERTY_STRING</code>，这些枚举用作相应类型函数的参数。所有属性的汇总表可在 MQL5 文档的图表属性页面找到。在本章后续部分，我们将逐步介绍几乎所有属性，并根据其用途进行分组。唯一的例外是图表上的事件管理属性，我们将在事件相关章节的相应部分进行描述。</p><p>这三个枚举的元素被赋予的值形成了一个无交集（无重复）的单一列表。这使得我们可以通过特定值来确定枚举类型。例如，给定一个常量，我们可以依次尝试将其转换为某个枚举的名称字符串，直到成功为止。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int value = ...;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>ResetLastError(); // 如果之前有错误代码，清除它</span></span>
<span class="line"><span>EnumToString((ENUM_CHART_PROPERTY_INTEGER)value); // 结果字符串不重要</span></span>
<span class="line"><span>if(_LastError == 0) // 分析是否有新的错误</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 成功，是 ENUM_CHART_PROPERTY_INTEGER 的元素</span></span>
<span class="line"><span>   return ChartGetInteger(0, (ENUM_CHART_PROPERTY_INTEGER)value);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>ResetLastError();</span></span>
<span class="line"><span>EnumToString((ENUM_CHART_PROPERTY_DOUBLE)value);</span></span>
<span class="line"><span>if(_LastError == 0)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 成功，是 ENUM_CHART_PROPERTY_DOUBLE 的元素</span></span>
<span class="line"><span>   return ChartGetDouble(0, (ENUM_CHART_PROPERTY_DOUBLE)value);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>... // 对 ENUM_CHART_PROPERTY_STRING 继续进行类似检查</span></span></code></pre></div><p>后续我们会在测试脚本中使用这种方法。</p><p>有些属性（例如可见K线的数量）是只读的，不能被修改，后续会标记为 “r/o”（只读）。</p><p>属性读取函数有短形式和长形式：短形式直接返回请求的值，长形式返回一个表示成功（<code>true</code>）或错误（<code>false</code>）的布尔属性，而值本身则放在通过引用传递的最后一个参数中。使用短形式时，检查 <code>_LastError</code> 变量中的错误代码尤为重要，因为出现问题时返回的值 0（<code>NULL</code>）可能本身就是正确的。</p><p>访问某些属性时，必须指定一个额外的参数 <code>window</code>，用于指示图表窗口/子窗口。0 表示主窗口，子窗口从 1 开始编号。有些属性适用于整个图表，因此这些函数的变体没有 <code>window</code> 参数。</p><p>以下是读取和写入整数属性的函数原型。请注意，其中的值类型为 <code>long</code>。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool ChartSetInteger(long chartId, ENUM_CHART_PROPERTY_INTEGER property, long value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bool ChartSetInteger(long chartId, ENUM_CHART_PROPERTY_INTEGER property, int window, long value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>long ChartGetInteger(long chartId, ENUM_CHART_PROPERTY_INTEGER property, int window = 0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bool ChartGetInteger(long chartId, ENUM_CHART_PROPERTY_INTEGER property, int window, long &amp;value)</span></span></code></pre></div><p>实数属性的函数描述类似。子窗口没有可写的实数属性，因此 <code>ChartSetDouble</code> 只有一种形式，即没有 <code>window</code> 参数的形式。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool ChartSetDouble(long chartId, ENUM_CHART_PROPERTY_DOUBLE property, double value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>double ChartGetDouble(long chartId, ENUM_CHART_PROPERTY_DOUBLE property, int window = 0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bool ChartGetDouble(long chartId, ENUM_CHART_PROPERTY_DOUBLE property, int window, double &amp;value)</span></span></code></pre></div><p>字符串属性也是如此，但需要考虑一个细节：字符串长度不能超过 2045 个字符（多余的字符将被截断）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool ChartSetString(long chartId, ENUM_CHART_PROPERTY_STRING property, string value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>string ChartGetString(long chartId, ENUM_CHART_PROPERTY_STRING property)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bool ChartGetString(long chartId, ENUM_CHART_PROPERTY_STRING property, string &amp;value)</span></span></code></pre></div><p>使用 <code>ChartGetInteger</code>/<code>ChartGetDouble</code> 的短形式读取属性时，<code>window</code> 参数是可选的，默认为主窗口（<code>window = 0</code>）。</p><p>设置图表属性的函数（<code>ChartSetInteger</code>、<code>ChartSetDouble</code>、<code>ChartSetString</code>）是异步的，用于向图表发送更改命令。如果这些函数执行成功，命令将被添加到图表事件的公共队列中，并返回 <code>true</code>。出现错误时，函数返回 <code>false</code>，此时应检查 <code>_LastError</code> 变量中的错误代码。</p><p>图表属性会在处理该图表的事件队列时进行更改，通常会有一定延迟，因此在应用新设置后，不应期望图表立即更新。要强制更新图表的外观和属性，可以使用 <code>ChartRedraw</code> 函数。如果要一次性更改多个图表属性，需要在一个代码块中调用相应的函数，然后调用一次 <code>ChartRedraw</code>。</p><p>一般来说，终端会根据新报价的到来、图表窗口大小的变化、缩放、滚动、添加指标等事件自动更新图表。</p><p>获取图表属性的函数（<code>ChartGetInteger</code>、<code>ChartGetDouble</code>、<code>ChartGetString</code>）是同步的，即调用代码会等待它们的执行结果。</p><h2 id="图表描述属性" tabindex="-1">图表描述属性 <a class="header-anchor" href="#图表描述属性" aria-label="Permalink to &quot;图表描述属性&quot;">​</a></h2><p><code>ChartSetString</code>和<code>ChartGetString</code>函数能够读取和设置图表的以下字符串属性。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th></tr></thead><tbody><tr><td>CHART_COMMENT</td><td>图表注释文本</td></tr><tr><td>CHART_EXPERT_NAME</td><td>在图表上运行的智能交易系统的名称（只读）</td></tr><tr><td>CHART_SCRIPT_NAME</td><td>在图表上运行的脚本的名称（只读）</td></tr></tbody></table><p>在“在图表窗口中显示消息”这一章节中，我们了解了<code>Comment</code>函数，它可以在图表的左上角显示文本消息。<code>CHART_COMMENT</code>属性允许读取当前图表的注释，方法是<code>ChartGetString(0, CHART_COMMENT)</code>。通过将其他图表的标识符传递给该函数，也可以访问其他图表的注释。如果知道图表的ID，使用<code>ChartSetString</code>函数可以更改当前图表和其他图表的注释，例如<code>ChartSetString(ID, CHART_COMMENT, &quot;text&quot;)</code>。</p><p>如果有智能交易系统或/和脚本在任何图表上运行，我们可以通过以下调用了解它们的名称：<code>ChartGetString(ID, CHART_EXPERT_NAME)</code>和<code>ChartGetString(ID, CHART_SCRIPT_NAME)</code>。</p><p>脚本<code>ChartList3.mq5</code>与<code>ChartList2.mq5</code>类似，它在图表列表中补充了有关智能交易系统和脚本的信息。之后我们还会在其中添加有关指标的信息。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void ChartList()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   const long me = ChartID();</span></span>
<span class="line"><span>   long id = ChartFirst();</span></span>
<span class="line"><span>   int count = 0, used = 0, temp, experts = 0, scripts = 0;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>   Print(&quot;Chart List\\nN, ID, Symbol, TF, *active&quot;);</span></span>
<span class="line"><span>   // 持续遍历图表，直到没有剩余图表</span></span>
<span class="line"><span>   while(id != -1)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      temp =0;// 此图表上MQL程序的标志</span></span>
<span class="line"><span>      const string header = StringFormat(&quot;%d %lld %s %s %s&quot;,</span></span>
<span class="line"><span>         count, id, ChartSymbol(id), PeriodToString(ChartPeriod(id)),</span></span>
<span class="line"><span>         (id == me ? &quot; *&quot; : &quot;&quot;));</span></span>
<span class="line"><span>      // 字段：编号、ID、交易品种、时间框架、当前图表标签</span></span>
<span class="line"><span>      Print(header);</span></span>
<span class="line"><span>      string expert = ChartGetString(id, CHART_EXPERT_NAME);</span></span>
<span class="line"><span>      string script = ChartGetString(id, CHART_SCRIPT_NAME);</span></span>
<span class="line"><span>      if(StringLen(expert) &gt; 0) expert = &quot;[E] &quot; + expert;</span></span>
<span class="line"><span>      if(StringLen(script) &gt; 0) script = &quot;[S] &quot; + script;</span></span>
<span class="line"><span>      if(expert != NULL || script != NULL)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         Print(expert, &quot; &quot;, script);</span></span>
<span class="line"><span>         if(expert != NULL) experts++;</span></span>
<span class="line"><span>         if(script != NULL) scripts++;</span></span>
<span class="line"><span>         temp++;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      count++;</span></span>
<span class="line"><span>      if(temp &gt; 0)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         used++;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      id = ChartNext(id);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   Print(&quot;Total chart number: &quot;, count, &quot;, with MQL-programs: &quot;, used);</span></span>
<span class="line"><span>   Print(&quot;Experts: &quot;, experts, &quot;, Scripts: &quot;, scripts);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这是该脚本输出的一个示例。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Chart List</span></span>
<span class="line"><span>N, ID, Symbol, TF, *active</span></span>
<span class="line"><span>0 132358585987782873 EURUSD M15 </span></span>
<span class="line"><span>1 132360375330772909 EURUSD H1  *</span></span>
<span class="line"><span> [S] ChartList3</span></span>
<span class="line"><span>2 132544239145024745 XAUUSD H1 </span></span>
<span class="line"><span>3 132544239145024732 USDRUB D1 </span></span>
<span class="line"><span>4 132544239145024744 EURUSD H1 </span></span>
<span class="line"><span>Total chart number: 5, with MQL-programs: 1</span></span>
<span class="line"><span>Experts: 0, Scripts: 1</span></span></code></pre></div><p>从这里可以看出，只有一个脚本正在执行。</p><h2 id="检查主窗口状态" tabindex="-1">检查主窗口状态 <a class="header-anchor" href="#检查主窗口状态" aria-label="Permalink to &quot;检查主窗口状态&quot;">​</a></h2><p><code>ChartSetInteger</code> 和 <code>ChartGetInteger</code> 这对函数可以用来了解图表的一些状态特征，同时也能够对其中的部分特征进行更改。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值类型</th></tr></thead><tbody><tr><td><code>CHART_BRING_TO_TOP</code></td><td>图表的活动状态（输入焦点）是否在所有其他图表之上</td><td><code>bool</code>（布尔型）</td></tr><tr><td><code>CHART_IS_MAXIMIZED</code></td><td>图表是否处于最大化状态</td><td><code>bool</code>（布尔型）</td></tr><tr><td><code>CHART_IS_MINIMIZED</code></td><td>图表是否处于最小化状态</td><td><code>bool</code>（布尔型）</td></tr><tr><td><code>CHART_WINDOW_HANDLE</code></td><td>图表窗口的 Windows 句柄（只读）</td><td><code>int</code>（整型）</td></tr><tr><td><code>CHART_IS_OBJECT</code></td><td>一个标识图表是否为图表对象（<code>OBJ_CHART</code>）的标志；如果是图形对象则为 <code>true</code>，如果是普通图表则为 <code>false</code>（只读）</td><td><code>bool</code>（布尔型）</td></tr></tbody></table><p>正如预期的那样，窗口句柄和图表对象的属性是只读的。其他属性是可编辑的：例如，通过调用 <code>ChartSetInteger(ID, CHART_BRING_TO_TOP, true)</code>，你可以激活具有指定 ID 的图表。</p><p>在下一节的 <code>ChartList4.mq5</code> 脚本中给出了这些属性应用的示例。</p><h2 id="获取窗口-子窗口的数量和可见性" tabindex="-1">获取窗口/子窗口的数量和可见性 <a class="header-anchor" href="#获取窗口-子窗口的数量和可见性" aria-label="Permalink to &quot;获取窗口/子窗口的数量和可见性&quot;">​</a></h2><p>借助 <code>ChartGetInteger</code> 函数，MQL 程序能够获取图表上的窗口（包含子窗口）数量以及它们的可见状态。</p><h3 id="标识符与描述" tabindex="-1">标识符与描述 <a class="header-anchor" href="#标识符与描述" aria-label="Permalink to &quot;标识符与描述&quot;">​</a></h3><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值类型</th></tr></thead><tbody><tr><td><code>CHART_WINDOWS_TOTAL</code></td><td>图表窗口的总数，包含指标子窗口（只读）</td><td><code>int</code></td></tr><tr><td><code>CHART_WINDOW_IS_VISIBLE</code></td><td>子窗口的可见性，<code>window</code> 参数表示子窗口编号（只读）</td><td><code>bool</code></td></tr></tbody></table><p>若在属性对话框的可视化选项卡中，将某些指标在当前时间框架下禁用，那么这些指标所在的子窗口可能会被隐藏。不过，无法将所有标志重置，因为 <code>tpl</code> 模板的存储特性决定了这种状态会被解读为启用所有时间框架。所以，若用户想在一段时间内隐藏子窗口，至少要在使用频率最低的时间框架上保留一个启用标志。</p><h3 id="mql5-中指标可见性的设置" tabindex="-1">MQL5 中指标可见性的设置 <a class="header-anchor" href="#mql5-中指标可见性的设置" aria-label="Permalink to &quot;MQL5 中指标可见性的设置&quot;">​</a></h3><p>需要注意的是，MQL5 里没有标准工具能以编程方式确定特定标志的状态并进行切换。模拟这种控制最简单的办法是保存 <code>tpl</code> 模板并进行分析，必要时对其编辑和加载（可参考“处理 <code>tpl</code> 模板”部分）。</p><h3 id="示例代码" tabindex="-1">示例代码 <a class="header-anchor" href="#示例代码" aria-label="Permalink to &quot;示例代码&quot;">​</a></h3><p>在新版本的脚本 <code>ChartList4.mq5</code> 中，我们输出了子窗口的数量（主窗口始终存在）、图表活动标志、图表对象标志以及 Windows 句柄。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>const int win = (int)ChartGetInteger(id, CHART_WINDOWS_TOTAL);</span></span>
<span class="line"><span>const string header = StringFormat(&quot;%d %lld %s %s %s %s %s %s %lld&quot;,</span></span>
<span class="line"><span>    count, id, ChartSymbol(id), PeriodToString(ChartPeriod(id)),</span></span>
<span class="line"><span>    (win &gt; 1 ? &quot;#&quot; + (string)(win - 1) : &quot;&quot;), (id == me ? &quot; *&quot; : &quot;&quot;),</span></span>
<span class="line"><span>    (ChartGetInteger(id, CHART_BRING_TO_TOP, 0) ? &quot;active&quot; : &quot;&quot;),</span></span>
<span class="line"><span>    (ChartGetInteger(id, CHART_IS_OBJECT) ? &quot;object&quot; : &quot;&quot;),</span></span>
<span class="line"><span>    ChartGetInteger(id, CHART_WINDOW_HANDLE));</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>for(int i = 0; i &lt; win; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    const bool visible = ChartGetInteger(id, CHART_WINDOW_IS_VISIBLE, i);</span></span>
<span class="line"><span>    if(!visible)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        Print(&quot;  &quot;, i, &quot;/Hidden&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="示例结果" tabindex="-1">示例结果 <a class="header-anchor" href="#示例结果" aria-label="Permalink to &quot;示例结果&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Chart List</span></span>
<span class="line"><span>N, ID, Symbol, TF, #subwindows, *active, Windows handle</span></span>
<span class="line"><span>0 132358585987782873 EURUSD M15 #1    68030</span></span>
<span class="line"><span>1 132360375330772909 EURUSD H1  * active  68048</span></span>
<span class="line"><span> [S] ChartList4</span></span>
<span class="line"><span>2 132544239145024745 XAUUSD H1     395756</span></span>
<span class="line"><span>3 132544239145024732 USDRUB D1     395768</span></span>
<span class="line"><span>4 132544239145024744 EURUSD H1 #2    461286</span></span>
<span class="line"><span>  2/Hidden</span></span>
<span class="line"><span>Total chart number: 5, with MQL-programs: 1</span></span>
<span class="line"><span>Experts: 0, Scripts: 1</span></span></code></pre></div><p>第一个图表（索引为 0）有一个子窗口（<code>#1</code>）。最后一个图表有两个子窗口（<code>#2</code>），且第二个子窗口当前处于隐藏状态。后续在“管理图表上的指标”部分，我们会给出 <code>ChartList.mq5</code> 的完整版本，该版本会在报告中包含子窗口和主窗口中指标的相关信息。</p><h3 id="特别注意" tabindex="-1">特别注意 <a class="header-anchor" href="#特别注意" aria-label="Permalink to &quot;特别注意&quot;">​</a></h3><p>即便在当前时间框架或所有时间框架下禁用了对象可视化，图表对象内的图表的 <code>CHART_WINDOW_IS_VISIBLE</code> 属性始终为 <code>true</code>。</p><h2 id="图表显示模式" tabindex="-1">图表显示模式 <a class="header-anchor" href="#图表显示模式" aria-label="Permalink to &quot;图表显示模式&quot;">​</a></h2><p>ENUM_CHART_PROPERTY_INTEGER枚举中的四个属性描述了图表的显示模式。所有这些属性都可以通过<code>ChartGetInteger</code>函数读取，并通过<code>ChartSetInteger</code>函数写入，这使得你能够改变图表的外观。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值类型</th></tr></thead><tbody><tr><td>CHART_MODE</td><td>图表类型（蜡烛图、柱线图或折线图）</td><td>ENUM_CHART_MODE</td></tr><tr><td>CHART_FOREGROUND</td><td>前景中的价格图表</td><td>bool</td></tr><tr><td>CHART_SHIFT</td><td>价格图表从右边缘的缩进模式</td><td>bool</td></tr><tr><td>CHART_AUTOSCROLL</td><td>自动滚动到图表的右边缘</td><td>bool</td></tr></tbody></table><p>在MQL5中，对于<code>CHART_MODE</code>模式有一个特殊的枚举ENUM_CHART_MODE。其元素如下表所示。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值</th></tr></thead><tbody><tr><td>CHART_BARS</td><td>以柱线图显示</td><td>0</td></tr><tr><td>CHART_CANDLES</td><td>以日本蜡烛图显示</td><td>1</td></tr><tr><td>CHART_LINE</td><td>以收盘价绘制的折线显示</td><td>2</td></tr></tbody></table><p>让我们实现脚本<code>ChartMode.mq5</code>，它将监控模式的状态，并在检测到变化时将消息打印到日志中。由于属性处理算法具有通用性，我们将把它们放在一个单独的头文件<code>ChartModeMonitor.mqh</code>中，然后将其连接到不同的测试中。</p><p>让我们在一个抽象类<code>ChartModeMonitorInterface</code>中奠定基础：它为所有类型提供了重载的获取和设置方法。派生类将必须通过重写虚方法<code>snapshot</code>，在所需的程度上直接检查属性。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>class ChartModeMonitorInterface</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   long get(const ENUM_CHART_PROPERTY_INTEGER property, const int window = 0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return ChartGetInteger(0, property, window);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   double get(const ENUM_CHART_PROPERTY_DOUBLE property, const int window = 0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return ChartGetDouble(0, property, window);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   string get(const ENUM_CHART_PROPERTY_STRING property)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return ChartGetString(0, property);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   bool set(const ENUM_CHART_PROPERTY_INTEGER property, const long value, const int window = 0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return ChartSetInteger(0, property, window, value);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   bool set(const ENUM_CHART_PROPERTY_DOUBLE property, const double value)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return ChartSetDouble(0, property, value);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   bool set(const ENUM_CHART_PROPERTY_STRING property, const string value)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return ChartSetString(0, property, value);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   virtual void snapshot() = 0;</span></span>
<span class="line"><span>   virtual void print() { };</span></span>
<span class="line"><span>   virtual void backup() { }</span></span>
<span class="line"><span>   virtual void restore() { }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>该类还具有保留方法：例如<code>print</code>用于输出到日志，<code>backup</code>用于保存当前状态，<code>restore</code>用于恢复状态。它们被声明为非抽象方法，但实现为空，因为它们是可选的。</p><p>为不同类型的属性定义某些类作为从<code>ChartModeMonitorInterface</code>继承的单个模板，并接受参数化的值（T）和枚举（E）类型是有意义的。例如，对于整数属性，需要设置<code>T = long</code>和<code>E = ENUM_CHART_PROPERTY_INTEGER</code>。</p><p>该对象包含数据数组，用于存储所有请求属性的[键，值]对。它具有通用类型<code>MapArray&lt;K,V&gt;</code>，我们在“多货币和多时间框架指标”章节中为指标<code>IndUnityPercent</code>引入过该类型。其特点在于，除了通过数字对数组元素进行常规访问外，还可以使用按键寻址。</p><p>为了填充数组，一个整数数组被传递给构造函数，同时首先使用<code>detect</code>方法检查这些整数是否符合给定枚举E的标识符。所有正确的属性会立即通过<code>get</code>调用读取，得到的值将与其标识符一起存储在映射中。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#include &lt;MQL5Book/MapArray.mqh&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>template&lt;typename T,typename E&gt;</span></span>
<span class="line"><span>class ChartModeMonitorBase: public ChartModeMonitorInterface</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>protected:</span></span>
<span class="line"><span>   MapArray&lt;E,T&gt; data; // [属性, 值]对的数组映射</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 该方法检查传递的常量是否为枚举元素，</span></span>
<span class="line"><span>   // 如果是，则将其添加到映射数组中</span></span>
<span class="line"><span>   bool detect(const int v)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ResetLastError();</span></span>
<span class="line"><span>      EnumToString((E)v); // 得到的字符串未使用</span></span>
<span class="line"><span>      if(_LastError == 0) // 重要的是是否有错误</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         data.put((E)v, get((E)v));</span></span>
<span class="line"><span>         return true;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      return false;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   ChartModeMonitorBase(int &amp;flags[])</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      for(int i = 0; i &lt; ArraySize(flags); ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         detect(flags[i]);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   virtual void snapshot() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      MapArray&lt;E,T&gt; temp;</span></span>
<span class="line"><span>      // 收集所有属性的当前状态</span></span>
<span class="line"><span>      for(int i = 0; i &lt; data.getSize(); ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         temp.put(data.getKey(i), get(data.getKey(i)));</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      // 与先前状态进行比较，显示差异</span></span>
<span class="line"><span>      for(int i = 0; i &lt; data.getSize(); ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         if(data[i] != temp[i])</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            Print(EnumToString(data.getKey(i)), &quot; &quot;, data[i], &quot; -&gt; &quot;, temp[i]);</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      // 保存以便下次比较</span></span>
<span class="line"><span>      data = temp;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>};</span></span></code></pre></div><p><code>snapshot</code>方法遍历数组的所有元素，并为每个属性请求值。由于我们希望检测到变化，新数据首先存储在一个临时映射数组<code>temp</code>中。然后逐元素比较数组<code>data</code>和<code>temp</code>，对于每个差异，会显示一条消息，包含属性的名称、其旧值和新值。这个简化的示例仅使用了日志。然而，如果需要，程序可以调用一些应用函数，使行为适应环境。</p><p><code>print</code>、<code>backup</code>和<code>restore</code>方法的实现尽可能简单。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>template&lt;typename T,typename E&gt;</span></span>
<span class="line"><span>class ChartModeMonitorBase: public ChartModeMonitorInterface</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>protected:</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   MapArray&lt;E,T&gt; store; // 备份</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   virtual void print() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      data.print();</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   virtual void backup() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      store = data;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   virtual void restore() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      data = store;</span></span>
<span class="line"><span>      // 恢复图表属性</span></span>
<span class="line"><span>      for(int i = 0; i &lt; data.getSize(); ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         set(data.getKey(i), data[i]);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p><code>backup</code>和<code>restore</code>方法的组合允许你在开始对图表进行实验之前保存图表的状态，并在测试脚本完成后将一切恢复到原来的状态。</p><p>最后，<code>ChartModeMonitor.mqh</code>文件中的最后一个类是<code>ChartModeMonitor</code>。它结合了<code>ChartModeMonitorBase</code>的三个实例，为属性类型的可用组合而创建。它们有一个<code>m</code>指针数组，指向基础接口<code>ChartModeMonitorInterface</code>。该类本身也从该接口派生。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#include &lt;MQL5Book/AutoPtr.mqh&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>#define CALL_ALL(A,M) for(int i = 0, size = ArraySize(A); i &lt; size; ++i) A[i][].M</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>class ChartModeMonitor: public ChartModeMonitorInterface</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   AutoPtr&lt;ChartModeMonitorInterface&gt; m[3];</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   ChartModeMonitor(int &amp;flags[])</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      m[0] = new ChartModeMonitorBase&lt;long,ENUM_CHART_PROPERTY_INTEGER&gt;(flags);</span></span>
<span class="line"><span>      m[1] = new ChartModeMonitorBase&lt;double,ENUM_CHART_PROPERTY_DOUBLE&gt;(flags);</span></span>
<span class="line"><span>      m[2] = new ChartModeMonitorBase&lt;string,ENUM_CHART_PROPERTY_STRING&gt;(flags);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   virtual void snapshot() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CALL_ALL(m, snapshot());</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   virtual void print() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CALL_ALL(m, print());</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   virtual void backup() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CALL_ALL(m, backup());</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   virtual void restore() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CALL_ALL(m, restore());</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>为了简化代码，这里使用了<code>CALL_ALL</code>宏，它为数组中的所有对象调用指定的方法，并且在调用时考虑了<code>AutoPtr</code>类中重载的<code>[]</code>运算符（它用于解引用智能指针并获取指向“受保护”对象的直接指针）。</p><p>析构函数通常负责释放对象，但在这种情况下，决定使用<code>AutoPtr</code>数组（在“对象类型模板”部分讨论过这个类）。这保证了在正常释放<code>m</code>数组时自动删除动态对象。</p><p>在<code>ChartModeMonitorFull.mqh</code>文件中提供了支持子窗口编号的更完整版本的监控器。</p><p>基于<code>ChartModeMonitor</code>类，你可以轻松实现预期的脚本<code>ChartMode.mq5</code>。它的任务是每隔半秒检查一组给定属性的状态。现在我们在这里使用了无限循环和<code>Sleep</code>，但很快我们将学习如何以不同的方式对图表上的事件做出反应：通过终端的通知。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#include &lt;MQL5Book/ChartModeMonitor.mqh&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int flags[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CHART_MODE, CHART_FOREGROUND, CHART_SHIFT, CHART_AUTOSCROLL</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   ChartModeMonitor m(flags);</span></span>
<span class="line"><span>   Print(&quot;Initial state:&quot;);</span></span>
<span class="line"><span>   m.print();</span></span>
<span class="line"><span>   m.backup();</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   while(!IsStopped())</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      m.snapshot();</span></span>
<span class="line"><span>      Sleep(500);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   m.restore();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在任何图表上运行该脚本，并尝试使用工具按钮更改模式。通过这种方式，你可以访问除<code>CHART_FOREGROUND</code>之外的所有元素，<code>CHART_FOREGROUND</code>可以从属性对话框（“常规”选项卡，“图表在顶部”标志）中切换。</p><p>切换图表模式的工具栏按钮</p><p>切换图表模式的工具栏按钮</p><p>例如，以下日志是通过将显示从蜡烛图切换到柱线图，再从柱线图切换到折线图，然后再切换回蜡烛图，最后启用缩进和自动滚动到起始位置而创建的。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Initial state:</span></span>
<span class="line"><span>    [key] [value]</span></span>
<span class="line"><span>[0]     0       1</span></span>
<span class="line"><span>[1]     1       0</span></span>
<span class="line"><span>[2]     2       0</span></span>
<span class="line"><span>[3]     4       0</span></span>
<span class="line"><span>CHART_MODE 1 -&gt; 0</span></span>
<span class="line"><span>CHART_MODE 0 -&gt; 2</span></span>
<span class="line"><span>CHART_MODE 2 -&gt; 1</span></span>
<span class="line"><span>CHART_SHIFT 0 -&gt; 1</span></span>
<span class="line"><span>CHART_AUTOSCROLL 0 -&gt; 1</span></span></code></pre></div><p>使用<code>CHART_MODE</code>属性的一个更实际的例子是指标<code>IndSubChart.mq5</code>的改进版本（我们在“多货币和多时间框架指标”部分讨论过其简化版本<code>IndSubChartSimple.mq5</code>）。该指标旨在在子窗口中显示第三方交易品种的报价，之前我们必须通过输入参数向用户请求显示方法（蜡烛图、柱线图或折线图）。现在不再需要该参数，因为我们可以自动将指标切换到主窗口中使用的模式。</p><p>当前模式存储在全局变量<code>mode</code>中，并在初始化期间首先赋值。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>ENUM_CHART_MODE mode = 0;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   mode = (ENUM_CHART_MODE)ChartGetInteger(0, CHART_MODE);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>检测新模式最好在专门设计的事件处理程序<code>OnChartEvent</code>中完成，我们将在单独的章节中学习该处理程序。在这个阶段，重要的是要知道，如果代码描述了一个具有此预定义原型（名称和参数列表）的函数，那么在图表发生任何变化时，MQL程序可以从终端接收通知。特别是，其第一个参数包含描述事件含义的事件标识符。我们仍然关注图表本身，因此我们检查<code>eventId</code>是否等于<code>CHARTEVENT_CHART_CHANGE</code>。这是必要的，因为该处理程序还能够跟踪图形对象、键盘、鼠标和任意用户消息。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnChartEvent(const int eventId,</span></span>
<span class="line"><span>                 // 这里未使用的参数</span></span>
<span class="line"><span>                  const long &amp;, const double &amp;, const string &amp;)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(eventId == CHARTEVENT_CHART_CHANGE)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      const ENUM_CHART_MODE newmode = (ENUM_CHART_MODE)ChartGetInteger(0, CHART_MODE);</span></span>
<span class="line"><span>      if(mode != newmode)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         const ENUM_CHART_MODE oldmode = mode;</span></span>
<span class="line"><span>         mode = newmode;</span></span>
<span class="line"><span>         // 动态更改缓冲区绑定和渲染类型</span></span>
<span class="line"><span>         InitPlot(0, InitBuffers(mode), Mode2Style(mode));</span></span>
<span class="line"><span>         // 待办事项：我们稍后将自动调整颜色</span></span>
<span class="line"><span>         // SetPlotColors(0, mode);</span></span>
<span class="line"><span>         if(oldmode == CHART_LINE || newmode == CHART_LINE)</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            // 切换到或从CHART_LINE模式需要更新整个图表，</span></span>
<span class="line"><span>            // 因为缓冲区的数量会发生变化</span></span>
<span class="line"><span>            Print(&quot;Refresh&quot;);</span></span>
<span class="line"><span>            ChartSetSymbolPeriod(0, _Symbol, _Period);</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>         else</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>           // 在蜡烛图和柱线图之间切换时，</span></span>
<span class="line"><span>           // 只需以新的方式重绘图表即可，</span></span>
<span class="line"><span>           // 因为数据不会改变（之前的4个带值缓冲区）</span></span>
<span class="line"><span>            Print(&quot;Redraw&quot;);</span></span>
<span class="line"><span>            ChartRedraw();</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>你可以自己在图表上运行新指标并切换绘制方法来测试它。</p><p>这些并不是<code>IndSubChart.mq5</code>中所做的所有改进。稍后，在关于图表颜色的部分，我们将展示如何自动调整图形以适应图表的配色方案。</p><h2 id="管理图表元素的可见性" tabindex="-1">管理图表元素的可见性 <a class="header-anchor" href="#管理图表元素的可见性" aria-label="Permalink to &quot;管理图表元素的可见性&quot;">​</a></h2><p><code>ENUM_CHART_PROPERTY_INTEGER</code> 中有大量属性可用于控制图表元素的可见性。几乎所有这些属性都是布尔类型：<code>true</code> 表示显示元素，<code>false</code> 表示隐藏元素。例外的是 <code>CHART_SHOW_VOLUMES</code>，它使用 <code>ENUM_CHART_VOLUME_MODE</code> 枚举（见下文）。</p><h3 id="图表元素可见性属性表" tabindex="-1">图表元素可见性属性表 <a class="header-anchor" href="#图表元素可见性属性表" aria-label="Permalink to &quot;图表元素可见性属性表&quot;">​</a></h3><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值类型</th></tr></thead><tbody><tr><td><code>CHART_SHOW</code></td><td>通用价格图表显示。若设置为 <code>false</code>，则禁用任何价格图表属性的渲染，并消除图表边缘的所有填充：时间和价格刻度、快速导航栏、日历事件标记、交易图标、指标和K线提示、指标子窗口、成交量直方图等。</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_TICKER</code></td><td>在左上角显示交易品种报价牌。禁用报价牌会自动禁用 OHLC（<code>CHART_SHOW_OHLC</code>）</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_OHLC</code></td><td>在左上角显示 OHLC 值。启用 OHLC 会自动启用报价牌（<code>CHART_SHOW_TICKER</code>）</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_BID_LINE</code></td><td>将买入价（Bid）显示为水平线</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_ASK_LINE</code></td><td>将卖出价（Ask）显示为水平线</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_LAST_LINE</code></td><td>将最后成交价（Last）显示为水平线</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_PERIOD_SEP</code></td><td>显示相邻周期之间的垂直分隔线</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_GRID</code></td><td>显示图表上的网格</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_VOLUMES</code></td><td>显示图表上的成交量</td><td><code>ENUM_CHART_VOLUME_MODE</code></td></tr><tr><td><code>CHART_SHOW_OBJECT_DESCR</code></td><td>显示对象的文本描述（并非所有类型的对象都显示描述）</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_TRADE_LEVELS</code></td><td>显示图表上的交易水平（开仓头寸、止损、止盈和挂单的水平）</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_DATE_SCALE</code></td><td>显示图表上的日期刻度</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_PRICE_SCALE</code></td><td>显示图表上的价格刻度</td><td><code>bool</code></td></tr><tr><td><code>CHART_SHOW_ONE_CLICK</code></td><td>显示图表上的快速交易面板（“一键交易”选项）</td><td><code>bool</code></td></tr></tbody></table><h3 id="部分属性设置说明" tabindex="-1">部分属性设置说明 <a class="header-anchor" href="#部分属性设置说明" aria-label="Permalink to &quot;部分属性设置说明&quot;">​</a></h3><p>这些属性中，有些可以通过图表上下文菜单供用户设置，有些则只能通过设置对话框进行设置。还有一些设置只能通过 MQL5 代码更改，特别是垂直（<code>CHART_SHOW_DATE_SCALE</code>）和水平（<code>CHART_SHOW_DATE_SCALE</code>）刻度的显示，以及整个图表的可见性（<code>CHART_SHOW</code>）。特别要注意最后一种情况，因为关闭渲染是使用图形资源和图形对象创建自定义程序界面的理想解决方案，无论 <code>CHART_SHOW</code> 的值如何，这些图形资源和对象总是会被渲染。</p><h3 id="示例脚本-chartblackout-mq5" tabindex="-1">示例脚本：ChartBlackout.mq5 <a class="header-anchor" href="#示例脚本-chartblackout-mq5" aria-label="Permalink to &quot;示例脚本：ChartBlackout.mq5&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ChartSetInteger(0, CHART_SHOW, !ChartGetInteger(0, CHART_SHOW));</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这个脚本每次运行时都会将 <code>CHART_SHOW</code> 模式从当前状态切换为相反状态。因此，你可以在普通图表上使用它来完全清空窗口，然后再次运行以恢复之前的外观。</p><h3 id="enum-chart-volume-mode-枚举" tabindex="-1"><code>ENUM_CHART_VOLUME_MODE</code> 枚举 <a class="header-anchor" href="#enum-chart-volume-mode-枚举" aria-label="Permalink to &quot;\`ENUM_CHART_VOLUME_MODE\` 枚举&quot;">​</a></h3><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值</th></tr></thead><tbody><tr><td><code>CHART_VOLUME_HIDE</code></td><td>隐藏成交量</td><td>0</td></tr><tr><td><code>CHART_VOLUME_TICK</code></td><td>显示逐笔成交量</td><td>1</td></tr><tr><td><code>CHART_VOLUME_REAL</code></td><td>显示交易成交量（如果有）</td><td>2</td></tr></tbody></table><h3 id="示例脚本-chartelements-mq5" tabindex="-1">示例脚本：ChartElements.mq5 <a class="header-anchor" href="#示例脚本-chartelements-mq5" aria-label="Permalink to &quot;示例脚本：ChartElements.mq5&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int flags[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CHART_SHOW,</span></span>
<span class="line"><span>      CHART_SHOW_TICKER, CHART_SHOW_OHLC,</span></span>
<span class="line"><span>      CHART_SHOW_BID_LINE, CHART_SHOW_ASK_LINE, CHART_SHOW_LAST_LINE,</span></span>
<span class="line"><span>      CHART_SHOW_PERIOD_SEP, CHART_SHOW_GRID,</span></span>
<span class="line"><span>      CHART_SHOW_VOLUMES,</span></span>
<span class="line"><span>      CHART_SHOW_OBJECT_DESCR,</span></span>
<span class="line"><span>      CHART_SHOW_TRADE_LEVELS,</span></span>
<span class="line"><span>      CHART_SHOW_DATE_SCALE, CHART_SHOW_PRICE_SCALE,</span></span>
<span class="line"><span>      CHART_SHOW_ONE_CLICK</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   m.backup();</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   ChartSetInteger(0, CHART_SHOW_DATE_SCALE, false); </span></span>
<span class="line"><span>   ChartSetInteger(0, CHART_SHOW_PRICE_SCALE, false);</span></span>
<span class="line"><span>   ... </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在这个脚本中，创建了一个包含多个图表元素可见性标志的数组。在创建设置备份后，代码会故意禁用时间刻度和价格刻度。当脚本结束时，会从备份中恢复这些设置。</p><h3 id="日志片段及说明" tabindex="-1">日志片段及说明 <a class="header-anchor" href="#日志片段及说明" aria-label="Permalink to &quot;日志片段及说明&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CHART_SHOW_DATE_SCALE 1 -&gt; 0 // disabled the time scale in the MQL5 code</span></span>
<span class="line"><span>CHART_SHOW_PRICE_SCALE 1 -&gt; 0 // disabled the price scale in the MQL5 code</span></span>
<span class="line"><span>CHART_SHOW_ONE_CLICK 0 -&gt; 1 // disabled &quot;One click trading&quot;</span></span>
<span class="line"><span>CHART_SHOW_GRID 1 -&gt; 0 // disable &quot;Grid&quot;</span></span>
<span class="line"><span>CHART_SHOW_VOLUMES 0 -&gt; 2 // showed real &quot;Volumes&quot;</span></span>
<span class="line"><span>CHART_SHOW_VOLUMES 2 -&gt; 1 // showed &quot;Tick volumes&quot;</span></span>
<span class="line"><span>CHART_SHOW_TRADE_LEVELS 1 -&gt; 0 // disabled &quot;Trade levels&quot;</span></span></code></pre></div><p>日志展示了图表元素可见性的变化，前两条记录是因为在 MQL 代码中创建初始备份后禁用了刻度。后续记录展示了其他图表元素可见性的更改。</p><h2 id="水平偏移" tabindex="-1">水平偏移 <a class="header-anchor" href="#水平偏移" aria-label="Permalink to &quot;水平偏移&quot;">​</a></h2><p>图表显示的另一个细节是左右边缘的水平缩进。它们的工作方式略有不同，但都在 <code>ENUM_CHART_PROPERTY_DOUBLE</code> 枚举中进行描述，并且使用 <code>double</code> 类型。</p><h3 id="属性标识符及描述" tabindex="-1">属性标识符及描述 <a class="header-anchor" href="#属性标识符及描述" aria-label="Permalink to &quot;属性标识符及描述&quot;">​</a></h3><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th></tr></thead><tbody><tr><td><code>CHART_SHIFT_SIZE</code></td><td>零号K线距离右边缘的缩进百分比（范围从 10 到 50）。仅在 <code>CHART_SHIFT</code> 模式开启时有效。该偏移在图表上通过窗口右侧顶部边框上的一个小倒灰色三角形表示。</td></tr><tr><td><code>CHART_FIXED_POSITION</code></td><td>图表固定位置距离左边缘的百分比（范围从 0 到 100）。固定的图表位置通过水平时间轴上的一个小灰色三角形表示，并且仅在禁用新报价到来时自动向右滚动（<code>CHART_AUTOCROLL</code>）时显示。处于固定位置的K线在缩放时会保持在同一位置。默认情况下，三角形位于图表的左下角。</td></tr></tbody></table><h3 id="脚本示例" tabindex="-1">脚本示例 <a class="header-anchor" href="#脚本示例" aria-label="Permalink to &quot;脚本示例&quot;">​</a></h3><p>我们有一个名为 <code>ChartShifts.mq5</code> 的脚本来检查对这些属性的访问，它的工作方式与 <code>ChartMode.mq5</code> 类似，只是控制的属性集不同。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int flags[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CHART_SHIFT_SIZE, CHART_FIXED_POSITION</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   ChartModeMonitor m(flags);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="日志输出示例" tabindex="-1">日志输出示例 <a class="header-anchor" href="#日志输出示例" aria-label="Permalink to &quot;日志输出示例&quot;">​</a></h3><p>当用鼠标拖动固定位置标签（左下角）时，会产生以下日志输出：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Initial state:</span></span>
<span class="line"><span>    [key]  [value]</span></span>
<span class="line"><span>[0]     3 21.78771</span></span>
<span class="line"><span>[1]    41 17.87709</span></span>
<span class="line"><span>CHART_FIXED_POSITION 17.87709497206704 -&gt; 26.53631284916201</span></span>
<span class="line"><span>CHART_FIXED_POSITION 26.53631284916201 -&gt; 27.93296089385475</span></span>
<span class="line"><span>CHART_FIXED_POSITION 27.93296089385475 -&gt; 28.77094972067039</span></span>
<span class="line"><span>CHART_FIXED_POSITION 28.77094972067039 -&gt; 50.0</span></span></code></pre></div><p>从日志可以看出，随着鼠标拖动操作，<code>CHART_FIXED_POSITION</code> 属性的值不断发生变化。这表明可以通过这种方式动态调整图表固定位置相对于左边缘的百分比。同时，<code>ChartShifts.mq5</code> 脚本可以帮助我们监测和控制这些水平偏移属性，以满足不同的图表显示需求。</p><h2 id="水平刻度-按时间" tabindex="-1">水平刻度（按时间） <a class="header-anchor" href="#水平刻度-按时间" aria-label="Permalink to &quot;水平刻度（按时间）&quot;">​</a></h2><p>要确定水平轴上的刻度和柱线数量，可使用ENUM_CHART_PROPERTY_INTEGER中的一组整数属性。在这些属性中，只有CHART_SCALE是可编辑的。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th></tr></thead><tbody><tr><td>CHART_SCALE</td><td>刻度（0到5）</td></tr><tr><td>CHART_VISIBLE_BARS</td><td>当前图表上可见的柱线数量（由于CHART_SHIFT_SIZE缩进，可能小于CHART_WIDTH_IN_BARS）（只读）</td></tr><tr><td>CHART_FIRST_VISIBLE_BAR</td><td>图表上第一个可见柱线的编号。编号从右到左，就像在时间序列中一样。（只读）</td></tr><tr><td>CHART_WIDTH_IN_BARS</td><td>以柱线为单位的图表宽度（潜在容量，左右两端的极端柱线可能部分可见）（只读）</td></tr><tr><td>CHART_WIDTH_IN_PIXELS</td><td>以像素为单位的图表宽度（只读）</td></tr></tbody></table><p>图表上的ENUM_CHART_PROPERTY_INTEGER属性</p><p>图表上的ENUM_CHART_PROPERTY_INTEGER属性</p><p>我们已准备好实现下一个测试脚本ChartScaleTime.mq5，它可以用来分析这些属性的变化。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int flags[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CHART_SCALE,</span></span>
<span class="line"><span>      CHART_VISIBLE_BARS,</span></span>
<span class="line"><span>      CHART_FIRST_VISIBLE_BAR,</span></span>
<span class="line"><span>      CHART_WIDTH_IN_BARS,</span></span>
<span class="line"><span>      CHART_WIDTH_IN_PIXELS</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   ChartModeMonitor m(flags);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>以下是带有对所采取操作的注释的部分日志内容。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Initial state:</span></span>
<span class="line"><span>    [key] [value]</span></span>
<span class="line"><span>[0]     5       4</span></span>
<span class="line"><span>[1]   100      35</span></span>
<span class="line"><span>[2]   104      34</span></span>
<span class="line"><span>[3]   105      45</span></span>
<span class="line"><span>[4]   106     715</span></span>
<span class="line"><span>                                 // 1) 将刻度更改为较小的值：</span></span>
<span class="line"><span>CHART_SCALE 4 -&gt; 3              // - “刻度”属性的值发生了变化</span></span>
<span class="line"><span>CHART_VISIBLE_BARS 35 -&gt; 69        // - 可见柱线的数量增加了</span></span>
<span class="line"><span>CHART_FIRST_VISIBLE_BAR 34 -&gt; 68 // - 第一个可见柱线的编号增加了</span></span>
<span class="line"><span>CHART_WIDTH_IN_BARS 45 -&gt; 90 // - 潜在的柱线数量增加了</span></span>
<span class="line"><span>                                 // 2) 禁用右边缘的缩进</span></span>
<span class="line"><span>CHART_VISIBLE_BARS 69 -&gt; 89 // - 可见柱线的数量增加了</span></span>
<span class="line"><span>CHART_FIRST_VISIBLE_BAR 68 -&gt; 88 // - 第一个可见柱线的编号增加了</span></span>
<span class="line"><span>                                 // 3) 减小窗口大小</span></span>
<span class="line"><span>CHART_VISIBLE_BARS 89 -&gt; 86 // - 可见柱线数量减少了</span></span>
<span class="line"><span>CHART_WIDTH_IN_BARS 90 -&gt; 86 // - 潜在的柱线数量减少了</span></span>
<span class="line"><span>CHART_WIDTH_IN_PIXELS 715 -&gt; 680 // - 像素宽度减小了</span></span>
<span class="line"><span>                                 // 4) 点击“结束”按钮以移动到当前时间</span></span>
<span class="line"><span>CHART_VISIBLE_BARS 86 -&gt; 85 // - 可见柱线数量减少了</span></span>
<span class="line"><span>CHART_FIRST_VISIBLE_BAR 88 -&gt; 84 // - 第一个可见柱线的编号减少了</span></span></code></pre></div><h2 id="垂直刻度-按价格和指标读数" tabindex="-1">垂直刻度（按价格和指标读数） <a class="header-anchor" href="#垂直刻度-按价格和指标读数" aria-label="Permalink to &quot;垂直刻度（按价格和指标读数）&quot;">​</a></h2><p>与垂直刻度相关的属性是通过两个枚举的元素来设置和解析的：<code>ENUM_CHART_PROPERTY_INTEGER</code> 和 <code>ENUM_CHART_PROPERTY_DOUBLE</code>。在下面的表格中，列出了这些属性及其值的类型。</p><p>有些属性不仅允许访问主窗口，还能访问子窗口，对于子窗口，<code>ChartSet</code> 和 <code>ChartGet</code> 函数应使用参数 <code>window</code>（0 表示主窗口，并且是 <code>ChartGet</code> 简短形式的默认值）。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值类型</th></tr></thead><tbody><tr><td><code>CHART_SCALEFIX</code></td><td>固定刻度模式</td><td><code>bool</code></td></tr><tr><td><code>CHART_FIXED_MAX</code></td><td>窗口子窗口的固定最大值或主窗口的初始最大值</td><td><code>double</code></td></tr><tr><td><code>CHART_FIXED_MIN</code></td><td>窗口子窗口的固定最小值或主窗口的初始最小值</td><td><code>double</code></td></tr><tr><td><code>CHART_SCALEFIX_11</code></td><td>1:1 刻度模式</td><td><code>bool</code></td></tr><tr><td><code>CHART_SCALE_PT_PER_BAR</code></td><td>每根 K 线的点数刻度指示模式</td><td><code>bool</code></td></tr><tr><td><code>CHART_POINTS_PER_BAR</code></td><td>每根 K 线的点数刻度值</td><td><code>double</code></td></tr><tr><td><code>CHART_PRICE_MIN</code></td><td>窗口或子窗口中的最小值（只读）</td><td><code>double</code></td></tr><tr><td><code>CHART_PRICE_MAX</code></td><td>窗口或子窗口中的最大值（只读）</td><td><code>double</code></td></tr><tr><td><code>CHART_HEIGHT_IN_PIXELS</code></td><td>窗口或子窗口的固定高度（以像素为单位），需要 <code>window</code> 参数</td><td><code>int</code></td></tr><tr><td><code>CHART_WINDOW_YDISTANCE</code></td><td>窗口子窗口的顶部框架与主图表窗口的上框架之间沿垂直 Y 轴的距离（以像素为单位）。（只读）</td><td><code>int</code></td></tr></tbody></table><p>默认情况下，图表支持自适应刻度，以便报价或指标线在可见的时间段内完全垂直显示。对于某些应用程序，固定刻度是很有必要的，为此终端提供了几种模式。在这些模式下，图表不仅可以用鼠标或按键（<code>Shift</code> + 箭头）左右滚动，还可以上下滚动，并且在右侧刻度处会出现一个滑块条，使用它可以用鼠标快速滚动图表。</p><p>固定模式是通过启用 <code>CHART_SCALEFIX</code> 标志，并在 <code>CHART_FIXED_MAX</code> 和 <code>CHART_FIXED_MIN</code> 字段中指定所需的最大值和最小值来设置的（在主窗口中，用户将能够上下移动图表，因此 <code>CHART_FIXED_MAX</code> 和 <code>CHART_FIXED_MIN</code> 的值将同步变化，但垂直刻度将保持不变）。用户还可以通过在价格刻度上按下鼠标按钮，并且不松开，上下移动来更改垂直刻度。子窗口不提供垂直刻度的交互式编辑。在这方面，我们稍后将展示一个指标 <code>SubScaler.mq5</code>（请参阅键盘事件部分），它将允许用户使用键盘控制子窗口中的值范围，而不是通过设置对话框中“刻度”选项卡上的字段来进行控制。</p><p><code>CHART_SCALEFIX_11</code> 模式提供了屏幕上正方形各边的近似视觉相等：X 根 K 线的像素数（水平方向）将等于 X 个点的像素数（垂直方向）。这种相等是近似的，因为通常像素的垂直和水平大小是不一样的。</p><p>最后，还有一种固定每根 K 线点数比例的模式，它通过 <code>CHART_SCALE_PT_PER_BAR</code> 选项启用，并且所需的比例本身是使用 <code>CHART_POINTS_PER_BAR</code> 属性来设置的。与 <code>CHART_SCALEFIX</code> 模式不同，用户将无法在图表上用鼠标交互式地更改刻度。在这种模式下，一根 K 线的水平距离将在屏幕上以与指定的垂直点数相同的比例显示，就像图表的纵横比（以像素为单位）一样。如果两个图表的时间周期和大小相等，根据它们的 <code>CHART_POINTS_PER_BAR</code> 值的比例，其中一个图表在价格方面看起来会比另一个压缩。显然，时间周期越小，K 线的范围就越小，因此，在相同的刻度下，小时间周期看起来更“扁平”。</p><p>以编程方式设置 <code>CHART_HEIGHT_IN_PIXELS</code> 属性会使用户无法编辑窗口/子窗口的大小。这通常用于承载具有预定义控件集（按钮、输入字段等）的交易面板的窗口。为了取消大小的固定，将该属性的值设置为 -1。</p><p><code>CHART_WINDOW_YDISTANCE</code> 的值对于将主图表的绝对坐标转换为子窗口的局部坐标是必需的，以便正确处理图形对象。问题在于，当发生鼠标事件时，光标坐标是相对于主图表窗口传输的，而指标子窗口中图形对象的坐标是相对于子窗口的左上角设置的。</p><p>让我们准备 <code>ChartScalePrice.mq5</code> 脚本来分析垂直刻度和大小的变化。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int flags[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CHART_SCALEFIX, CHART_SCALEFIX_11,</span></span>
<span class="line"><span>      CHART_SCALE_PT_PER_BAR, CHART_POINTS_PER_BAR,</span></span>
<span class="line"><span>      CHART_FIXED_MAX, CHART_FIXED_MIN,</span></span>
<span class="line"><span>      CHART_PRICE_MIN, CHART_PRICE_MAX,</span></span>
<span class="line"><span>      CHART_HEIGHT_IN_PIXELS, CHART_WINDOW_YDISTANCE</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   ChartModeMonitor m(flags);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>它以以下方式对图表操作做出反应：</p><p>初始状态：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>    [key] [value]   // ENUM_CHART_PROPERTY_INTEGER</span></span>
<span class="line"><span>[0]     6       0</span></span>
<span class="line"><span>[1]     7       0</span></span>
<span class="line"><span>[2]    10       0</span></span>
<span class="line"><span>[3]   107     357</span></span>
<span class="line"><span>[4]   110       0</span></span>
<span class="line"><span>    [key]  [value]  // ENUM_CHART_PROPERTY_DOUBLE</span></span>
<span class="line"><span>[0]    11 10.00000</span></span>
<span class="line"><span>[1]     8  1.13880</span></span>
<span class="line"><span>[2]     9  1.12330</span></span>
<span class="line"><span>[3]   108  1.12330</span></span>
<span class="line"><span>[4]   109  1.13880</span></span></code></pre></div><p>// 减小了窗口的垂直大小</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CHART_HEIGHT_IN_PIXELS 357 -&gt; 370</span></span>
<span class="line"><span>CHART_HEIGHT_IN_PIXELS 370 -&gt; 408</span></span>
<span class="line"><span>CHART_FIXED_MAX 1.1389 -&gt; 1.1388</span></span>
<span class="line"><span>CHART_FIXED_MIN 1.1232 -&gt; 1.1233</span></span>
<span class="line"><span>CHART_PRICE_MIN 1.1232 -&gt; 1.1233</span></span>
<span class="line"><span>CHART_PRICE_MAX 1.1389 -&gt; 1.1388</span></span></code></pre></div><p>// 减小了水平刻度，这增加了价格范围</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CHART_FIXED_MAX 1.1388 -&gt; 1.139</span></span>
<span class="line"><span>CHART_FIXED_MIN 1.1233 -&gt; 1.1183</span></span>
<span class="line"><span>CHART_PRICE_MIN 1.1233 -&gt; 1.1183</span></span>
<span class="line"><span>CHART_PRICE_MAX 1.1388 -&gt; 1.139</span></span>
<span class="line"><span>CHART_FIXED_MAX 1.139 -&gt; 1.1406</span></span>
<span class="line"><span>CHART_FIXED_MIN 1.1183 -&gt; 1.1167</span></span>
<span class="line"><span>CHART_PRICE_MIN 1.1183 -&gt; 1.1167</span></span>
<span class="line"><span>CHART_PRICE_MAX 1.139 -&gt; 1.1406</span></span></code></pre></div><p>// 使用鼠标扩大价格范围（报价在垂直方向上“收缩”）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CHART_FIXED_MAX 1.1406 -&gt; 1.1454</span></span>
<span class="line"><span>CHART_FIXED_MIN 1.1167 -&gt; 1.1119</span></span>
<span class="line"><span>CHART_PRICE_MIN 1.1167 -&gt; 1.1119</span></span>
<span class="line"><span>CHART_PRICE_MAX 1.1406 -&gt; 1.1454</span></span></code></pre></div><h2 id="颜色设置" tabindex="-1">颜色设置 <a class="header-anchor" href="#颜色设置" aria-label="Permalink to &quot;颜色设置&quot;">​</a></h2><p>MQL 程序能够识别并更改用于显示所有图表元素的颜色。相应的属性属于 <code>ENUM_CHART_PROPERTY_INTEGER</code> 枚举。</p><h3 id="颜色属性标识符及描述" tabindex="-1">颜色属性标识符及描述 <a class="header-anchor" href="#颜色属性标识符及描述" aria-label="Permalink to &quot;颜色属性标识符及描述&quot;">​</a></h3><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th></tr></thead><tbody><tr><td><code>CHART_COLOR_BACKGROUND</code></td><td>图表背景颜色</td></tr><tr><td><code>CHART_COLOR_FOREGROUND</code></td><td>坐标轴、刻度和 OHLC 线的颜色</td></tr><tr><td><code>CHART_COLOR_GRID</code></td><td>网格颜色</td></tr><tr><td><code>CHART_COLOR_VOLUME</code></td><td>成交量和持仓开仓水平的颜色</td></tr><tr><td><code>CHART_COLOR_CHART_UP</code></td><td>上涨K线、影线以及阳线实体边框的颜色</td></tr><tr><td><code>CHART_COLOR_CHART_DOWN</code></td><td>下跌K线、影线以及阴线实体边框的颜色</td></tr><tr><td><code>CHART_COLOR_CHART_LINE</code></td><td>图表线和日本蜡烛图轮廓的颜色</td></tr><tr><td><code>CHART_COLOR_CANDLE_BULL</code></td><td>阳线实体颜色</td></tr><tr><td><code>CHART_COLOR_CANDLE_BEAR</code></td><td>阴线实体颜色</td></tr><tr><td><code>CHART_COLOR_BID</code></td><td>买价线颜色</td></tr><tr><td><code>CHART_COLOR_ASK</code></td><td>卖价线颜色</td></tr><tr><td><code>CHART_COLOR_LAST</code></td><td>最后成交价线（Last）的颜色</td></tr><tr><td><code>CHART_COLOR_STOP_LEVEL</code></td><td>止损单水平（止损和止盈）的颜色</td></tr></tbody></table><h3 id="颜色反转脚本示例" tabindex="-1">颜色反转脚本示例 <a class="header-anchor" href="#颜色反转脚本示例" aria-label="Permalink to &quot;颜色反转脚本示例&quot;">​</a></h3><p>作为使用这些属性的示例，我们创建一个脚本 <code>ChartColorInverse.mq5</code>，它会将图表的所有颜色反转，即对 RGB 格式的颜色进行按位异或（<code>^</code>）操作。这样，在同一图表上重新运行脚本时，设置将恢复原状。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#define RGB_INVERSE(C) ((color)C ^ 0xFFFFFF)</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ENUM_CHART_PROPERTY_INTEGER colors[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CHART_COLOR_BACKGROUND,</span></span>
<span class="line"><span>      CHART_COLOR_FOREGROUND,</span></span>
<span class="line"><span>      CHART_COLOR_GRID,</span></span>
<span class="line"><span>      CHART_COLOR_VOLUME,</span></span>
<span class="line"><span>      CHART_COLOR_CHART_UP,</span></span>
<span class="line"><span>      CHART_COLOR_CHART_DOWN,</span></span>
<span class="line"><span>      CHART_COLOR_CHART_LINE,</span></span>
<span class="line"><span>      CHART_COLOR_CANDLE_BULL,</span></span>
<span class="line"><span>      CHART_COLOR_CANDLE_BEAR,</span></span>
<span class="line"><span>      CHART_COLOR_BID,</span></span>
<span class="line"><span>      CHART_COLOR_ASK,</span></span>
<span class="line"><span>      CHART_COLOR_LAST,</span></span>
<span class="line"><span>      CHART_COLOR_STOP_LEVEL</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   for(int i = 0; i &lt; ArraySize(colors); ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ChartSetInteger(0, colors[i], RGB_INVERSE(ChartGetInteger(0, colors[i])));</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="指标颜色设置示例" tabindex="-1">指标颜色设置示例 <a class="header-anchor" href="#指标颜色设置示例" aria-label="Permalink to &quot;指标颜色设置示例&quot;">​</a></h3><p>接下来，我们完成对 <code>IndSubChart.mq5</code> 的编辑。需要读取主图表的颜色并将其应用到我们的指标图表上。为此有一个函数 <code>SetPlotColors</code>，其调用在 <code>OnChartEvent</code> 处理程序中被注释掉了（见“图表显示模式”部分的最后一个示例）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void SetPlotColors(const int index, const ENUM_CHART_MODE m)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(m == CHART_CANDLES)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      PlotIndexSetInteger(index, PLOT_COLOR_INDEXES, 3);</span></span>
<span class="line"><span>      PlotIndexSetInteger(index, PLOT_LINE_COLOR, 0, (int)ChartGetInteger(0, CHART_COLOR_CHART_LINE));  // rectangle</span></span>
<span class="line"><span>      PlotIndexSetInteger(index, PLOT_LINE_COLOR, 1, (int)ChartGetInteger(0, CHART_COLOR_CANDLE_BULL)); // up</span></span>
<span class="line"><span>      PlotIndexSetInteger(index, PLOT_LINE_COLOR, 2, (int)ChartGetInteger(0, CHART_COLOR_CANDLE_BEAR)); // down</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   else</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      PlotIndexSetInteger(index, PLOT_COLOR_INDEXES, 1);</span></span>
<span class="line"><span>      PlotIndexSetInteger(index, PLOT_LINE_COLOR, (int)ChartGetInteger(0, CHART_COLOR_CHART_LINE));</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在这个新函数中，根据图表的绘制模式，我们获取阳线和阴线的轮廓及实体颜色，或者线条颜色，并将这些颜色应用到图表上。当然，在初始化时不要忘记调用这个函数。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   mode = (ENUM_CHART_MODE)ChartGetInteger(0, CHART_MODE);</span></span>
<span class="line"><span>   InitPlot(0, InitBuffers(mode), Mode2Style(mode));</span></span>
<span class="line"><span>   SetPlotColors(0, mode);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在指标已经完成。你可以尝试在窗口中运行它，并在图表属性对话框中更改颜色，图表应该会自动适应新的设置。通过这些代码，我们可以灵活地控制图表元素的颜色，满足不同的显示需求。</p><h2 id="鼠标和键盘控制" tabindex="-1">鼠标和键盘控制 <a class="header-anchor" href="#鼠标和键盘控制" aria-label="Permalink to &quot;鼠标和键盘控制&quot;">​</a></h2><p>在这部分内容中，你会了解到一组属性，这些属性会影响图表对鼠标和键盘操作的响应方式，默认情况下这些操作被视为控制动作。例如，MetaTrader 5 的用户都清楚，可以用鼠标滚动图表，也能通过右键调出上下文菜单来执行常用命令。MQL5 可以让你完全或部分禁用图表的这些默认行为。需要注意的是，这只能通过编程实现，终端用户界面里并没有类似的设置选项。</p><p>唯一的例外是<code>CHART_DRAG_TRADE_LEVELS</code>选项（见下表）：终端设置里的“图表”选项卡有一个下拉列表，可用于控制是否允许用鼠标拖动交易水平线。</p><p>这组属性都是布尔类型（<code>true</code>表示允许，<code>false</code>表示禁用），它们都包含在<code>ENUM_CHART_PROPERTY_INTEGER</code>枚举中。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th></tr></thead><tbody><tr><td>CHART_CONTEXT_MENU</td><td>通过鼠标右键启用/禁用对上下文菜单的访问。值为<code>false</code>时仅禁用图表的上下文菜单，而图表上对象的上下文菜单仍然可用。默认值为<code>true</code>。</td></tr><tr><td>CHART_CROSSHAIR_TOOL</td><td>通过鼠标中键启用/禁用对十字准线工具的访问。默认值为<code>true</code>。</td></tr><tr><td>CHART_MOUSE_SCROLL</td><td>使用鼠标左键或滚轮滚动图表。启用滚动时，不仅适用于水平滚动，也适用于垂直滚动，但后者仅在设置了固定刻度时可用，如<code>CHART_SCALEFIX</code>、<code>CHART_SCALEFIX_11</code>或<code>CHART_SCALE_PT_PER_BAR</code>属性之一。默认值为<code>true</code>。</td></tr><tr><td>CHART_KEYBOARD_CONTROL</td><td>能否使用键盘管理图表（如<code>Home</code>、<code>End</code>、<code>PageUp</code>/<code>PageDown</code>、<code>+</code>/<code>-</code>、上下箭头等按键）。设置为<code>false</code>可禁用图表的滚动和缩放，但同时可以在<code>OnChartEvent</code>中接收这些按键的按键事件。默认值为<code>true</code>。</td></tr><tr><td>CHART_QUICK_NAVIGATION</td><td>启用图表中的快速导航栏，当双击鼠标或按下<code>Space</code>或<code>Input</code>键时，该导航栏会自动出现在时间轴的左上角。使用该导航栏，你可以快速更改交易品种、时间框架或第一个可见柱线的日期。默认情况下，此属性设置为<code>true</code>，即启用快速导航。</td></tr><tr><td>CHART_DRAG_TRADE_LEVELS</td><td>允许用鼠标在图表上拖动交易水平线。默认启用拖动模式（<code>true</code>）。</td></tr></tbody></table><p>在测试脚本<code>ChartInputControl.mq5</code>里，我们会对上述所有属性进行监控，并且提供输入变量，让用户可以任意设置这些属性的值。脚本在启动时会保存设置的备份，这样在脚本结束时，所有被更改的属性都会恢复到初始状态。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property script_show_inputs</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>#include &lt;MQL5Book/ChartModeMonitor.mqh&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>input bool ContextMenu = true; // CHART_CONTEXT_MENU</span></span>
<span class="line"><span>input bool CrossHairTool = true; // CHART_CROSSHAIR_TOOL</span></span>
<span class="line"><span>input bool MouseScroll = true; // CHART_MOUSE_SCROLL</span></span>
<span class="line"><span>input bool KeyboardControl = true; // CHART_KEYBOARD_CONTROL</span></span>
<span class="line"><span>input bool QuickNavigation = true; // CHART_QUICK_NAVIGATION</span></span>
<span class="line"><span>input bool DragTradeLevels = true; // CHART_DRAG_TRADE_LEVELS</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   const bool Inputs[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ContextMenu, CrossHairTool, MouseScroll,</span></span>
<span class="line"><span>      KeyboardControl, QuickNavigation, DragTradeLevels</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   const int flags[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CHART_CONTEXT_MENU, CHART_CROSSHAIR_TOOL, CHART_MOUSE_SCROLL,</span></span>
<span class="line"><span>      CHART_KEYBOARD_CONTROL, CHART_QUICK_NAVIGATION, CHART_DRAG_TRADE_LEVELS</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   ChartModeMonitor m(flags);</span></span>
<span class="line"><span>   Print(&quot;Initial state:&quot;);</span></span>
<span class="line"><span>   m.print();</span></span>
<span class="line"><span>   m.backup();</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   for(int i = 0; i &lt; ArraySize(flags); ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ChartSetInteger(0, (ENUM_CHART_PROPERTY_INTEGER)flags[i], Inputs[i]);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   while(!IsStopped())</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      m.snapshot();</span></span>
<span class="line"><span>      Sleep(500);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   m.restore();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>例如，运行该脚本时，我们可以将上下文菜单、十字准线工具、鼠标和键盘控制的权限重置为<code>false</code>。以下是相应的日志结果。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Initial state:</span></span>
<span class="line"><span>    [key] [value]</span></span>
<span class="line"><span>[0]    50       1</span></span>
<span class="line"><span>[1]    49       1</span></span>
<span class="line"><span>[2]    42       1</span></span>
<span class="line"><span>[3]    47       1</span></span>
<span class="line"><span>[4]    45       1</span></span>
<span class="line"><span>[5]    43       1</span></span>
<span class="line"><span>CHART_CONTEXT_MENU 1 -&gt; 0</span></span>
<span class="line"><span>CHART_CROSSHAIR_TOOL 1 -&gt; 0</span></span>
<span class="line"><span>CHART_MOUSE_SCROLL 1 -&gt; 0</span></span>
<span class="line"><span>CHART_KEYBOARD_CONTROL 1 -&gt; 0</span></span></code></pre></div><p>在这种情况下，你既不能用鼠标也不能用键盘移动图表，甚至无法调用上下文菜单。所以，为了恢复图表的正常操作，你得在图表上拖放相同或其他脚本（要记住，一个图表上只能有一个脚本运行，当拖放新脚本时，之前的脚本会被卸载）。只需拖放新的脚本实例，但不用运行它（在输入变量对话框中点击“取消”）即可。</p><h2 id="取消停靠图表窗口" tabindex="-1">取消停靠图表窗口 <a class="header-anchor" href="#取消停靠图表窗口" aria-label="Permalink to &quot;取消停靠图表窗口&quot;">​</a></h2><p>终端中的图表窗口可以从主窗口中取消停靠，之后它们可以被移动到桌面的任何位置，包括其他显示器上。MQL5 允许查询和更改此设置，相应的属性包含在 <code>ENUM_CHART_PROPERTY_INTEGER</code> 枚举中。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值类型</th></tr></thead><tbody><tr><td><code>CHART_IS_DOCKED</code></td><td>图表窗口已停靠（默认值为 <code>true</code>）。如果设置为 <code>false</code>，则可以将图表拖出终端</td><td><code>bool</code>（布尔型）</td></tr><tr><td><code>CHART_FLOAT_LEFT</code></td><td>取消停靠的图表相对于虚拟屏幕的左坐标</td><td><code>int</code>（整型）</td></tr><tr><td><code>CHART_FLOAT_TOP</code></td><td>取消停靠的图表相对于虚拟屏幕的上坐标</td><td><code>int</code>（整型）</td></tr><tr><td><code>CHART_FLOAT_RIGHT</code></td><td>取消停靠的图表相对于虚拟屏幕的右坐标</td><td><code>int</code>（整型）</td></tr><tr><td><code>CHART_FLOAT_BOTTOM</code></td><td>取消停靠的图表相对于虚拟屏幕的下坐标</td><td><code>int</code>（整型）</td></tr></tbody></table><p>让我们在 <code>ChartDock.mq5</code> 脚本中设置对这些属性的跟踪。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   const int flags[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      CHART_IS_DOCKED,</span></span>
<span class="line"><span>      CHART_FLOAT_LEFT, CHART_FLOAT_TOP, CHART_FLOAT_RIGHT, CHART_FLOAT_BOTTOM</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   ChartModeMonitor m(flags);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果现在运行该脚本，然后使用上下文菜单取消停靠图表（取消按下“已停靠”切换命令），并移动或调整图表大小，相应的日志将被添加到日志记录中。</p><p>初始状态：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>    [key] [value]</span></span>
<span class="line"><span>[0]    51       1</span></span>
<span class="line"><span>[1]    52       0</span></span>
<span class="line"><span>[2]    53       0</span></span>
<span class="line"><span>[3]    54       0</span></span>
<span class="line"><span>[4]    55       0</span></span></code></pre></div><p>// 取消停靠</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CHART_IS_DOCKED 1 -&gt; 0</span></span>
<span class="line"><span>CHART_FLOAT_LEFT 0 -&gt; 299</span></span>
<span class="line"><span>CHART_FLOAT_TOP 0 -&gt; 75</span></span>
<span class="line"><span>CHART_FLOAT_RIGHT 0 -&gt; 1263</span></span>
<span class="line"><span>CHART_FLOAT_BOTTOM 0 -&gt; 472</span></span></code></pre></div><p>// 更改了垂直大小</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CHART_FLOAT_BOTTOM 472 -&gt; 500</span></span>
<span class="line"><span>CHART_FLOAT_BOTTOM 500 -&gt; 539</span></span></code></pre></div><p>// 更改了水平大小</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CHART_FLOAT_RIGHT 1263 -&gt; 1024</span></span>
<span class="line"><span>CHART_FLOAT_RIGHT 1024 -&gt; 1023</span></span></code></pre></div><p>// 重新停靠</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CHART_IS_DOCKED 0 -&gt; 1</span></span></code></pre></div><p>本节完成了对通过 <code>ChartGet</code> 和 <code>ChartSet</code> 函数管理的属性的描述，所以让我们使用通用脚本 <code>ChartFullSet.mq5</code> 来总结这些内容。它会跟踪所有类型的所有属性的状态。标志数组的初始化只需在循环中填充连续的索引即可完成。为了应对可能出现的新属性，取一个较大的最大值，并且 <code>ChartModeMonitorBase</code> 类中内置的检查（记住 <code>detect</code> 方法）会自动丢弃额外的不存在的数字。</p><p>激活该脚本后，尝试更改任何设置，同时观察日志中的程序消息。</p><h2 id="获取-mql-程序在图表上的拖放坐标" tabindex="-1">获取 MQL 程序在图表上的拖放坐标 <a class="header-anchor" href="#获取-mql-程序在图表上的拖放坐标" aria-label="Permalink to &quot;获取 MQL 程序在图表上的拖放坐标&quot;">​</a></h2><p>用户经常使用鼠标将 MQL 程序拖放到图表上。这不仅方便，还能为算法设置一些上下文信息。例如，一个指标可以应用在不同的子窗口中，或者一个脚本可以在用户在图表上放置的价格位置设置一个挂单。接下来的这组函数就是用于获取程序被拖放的点的坐标。</p><ol><li><strong><code>ChartWindowOnDropped</code> 函数</strong></li></ol><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int ChartWindowOnDropped()</span></span></code></pre></div><p>该函数返回当前智能交易系统、脚本或指标被鼠标拖放到的图表子窗口的编号。我们知道，主窗口编号为 0，子窗口从 1 开始编号。子窗口的编号并不取决于在它上面是否存在隐藏的子窗口，因为隐藏子窗口的索引仍然保留。换句话说，如果存在隐藏子窗口，可见子窗口的编号可能与其实际索引不同。</p><ol start="2"><li><strong><code>ChartPriceOnDropped</code> 和 <code>ChartTimeOnDropped</code> 函数</strong></li></ol><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>double ChartPriceOnDropped()</span></span>
<span class="line"><span>datetime ChartTimeOnDropped()</span></span></code></pre></div><p>这一对函数返回程序拖放点的价格和时间坐标。请注意，子窗口中可以显示任意数据，而不仅仅是价格，尽管函数名 <code>ChartPriceOnDropped</code> 中包含 “Price”。 需要注意的是！目标点的时间不会根据图表的时间框架大小进行四舍五入，所以即使在 H1 和 D1 图表上，你也可能得到包含分钟甚至秒的值。</p><ol start="3"><li><strong><code>ChartXOnDropped</code> 和 <code>ChartYOnDropped</code> 函数</strong></li></ol><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int ChartXOnDropped()</span></span>
<span class="line"><span>int ChartYOnDropped()</span></span></code></pre></div><p>这两个函数以像素为单位返回一个点的 X 和 Y 屏幕坐标。坐标原点位于主图表窗口的左上角。我们在“屏幕规格”部分讨论过坐标轴的方向。 Y 坐标总是从主图表的左上角开始计算，即使拖放点属于子窗口。要将这个值转换为相对于子窗口的 y 坐标，可以使用 <code>CHART_WINDOW_YDISTANCE</code> 属性（见示例）。</p><h3 id="示例脚本-chartdrop-mq5" tabindex="-1">示例脚本 <code>ChartDrop.mq5</code> <a class="header-anchor" href="#示例脚本-chartdrop-mq5" aria-label="Permalink to &quot;示例脚本 \`ChartDrop.mq5\`&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   const int w = PRTF(ChartWindowOnDropped());</span></span>
<span class="line"><span>   PRTF(ChartTimeOnDropped());</span></span>
<span class="line"><span>   PRTF(ChartPriceOnDropped());</span></span>
<span class="line"><span>   PRTF(ChartXOnDropped());</span></span>
<span class="line"><span>   PRTF(ChartYOnDropped());</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 对于子窗口，将 y 坐标重新计算为局部坐标</span></span>
<span class="line"><span>   if(w &gt; 0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      const int y = (int)PRTF(ChartGetInteger(0, CHART_WINDOW_YDISTANCE, w));</span></span>
<span class="line"><span>      PRTF(ChartYOnDropped() - y);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>例如，如果我们将这个脚本拖放到运行着威廉指标（WPR）的第一个子窗口中，可能会得到以下结果：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>ChartWindowOnDropped()=1 / ok</span></span>
<span class="line"><span>ChartTimeOnDropped()=2021.11.30 03:52:30 / ok</span></span>
<span class="line"><span>ChartPriceOnDropped()=-50.0 / ok</span></span>
<span class="line"><span>ChartXOnDropped()=217 / ok</span></span>
<span class="line"><span>ChartYOnDropped()=312 / ok</span></span>
<span class="line"><span>ChartGetInteger(0,CHART_WINDOW_YDISTANCE,w)=282 / ok</span></span>
<span class="line"><span>ChartYOnDropped()-y=30 / ok</span></span></code></pre></div><p>尽管脚本被拖放到了 EURUSD、H1 图表上，但我们得到了包含分钟和秒的时间戳。 请注意，“价格” 值为 -50，是因为 WPR 的值范围是 [0, -100]。 此外，点的垂直坐标 312（相对于整个图表窗口）被转换为子窗口的局部坐标：由于从主图表开始到子窗口的垂直距离是 282，所以子窗口内的 y 值为 30。</p><h2 id="屏幕坐标与时间-价格的相互转换" tabindex="-1">屏幕坐标与时间/价格的相互转换 <a class="header-anchor" href="#屏幕坐标与时间-价格的相互转换" aria-label="Permalink to &quot;屏幕坐标与时间/价格的相互转换&quot;">​</a></h2><p>由于图表工作空间存在不同的度量原则，这就产生了在不同度量单位之间进行重新计算的需求。为此提供了两个函数。</p><h3 id="bool-charttimepricetoxy-long-chartid-int-window-datetime-time-double-price-int-x-int-y" tabindex="-1">bool ChartTimePriceToXY(long chartId, int window, datetime time, double price, int &amp;x, int &amp;y) <a class="header-anchor" href="#bool-charttimepricetoxy-long-chartid-int-window-datetime-time-double-price-int-x-int-y" aria-label="Permalink to &quot;bool ChartTimePriceToXY(long chartId, int window, datetime time, double price, int &amp;x, int &amp;y)&quot;">​</a></h3><h3 id="bool-chartxytotimeprice-long-chartid-int-x-int-y-int-window-datetime-time-double-price" tabindex="-1">bool ChartXYToTimePrice(long chartId, int x, int y, int &amp;window, datetime &amp;time, double &amp;price) <a class="header-anchor" href="#bool-chartxytotimeprice-long-chartid-int-x-int-y-int-window-datetime-time-double-price" aria-label="Permalink to &quot;bool ChartXYToTimePrice(long chartId, int x, int y, int &amp;window, datetime &amp;time, double &amp;price)&quot;">​</a></h3><p><code>ChartTimePriceToXY</code>函数将图表坐标从时间/价格表示形式（时间/价格）转换为以像素为单位的X和Y坐标（x/y）。<code>ChartXYToTimePrice</code>函数执行相反的操作：它将X和Y坐标转换为时间和价格值。</p><p>这两个函数都要求在第一个参数<code>chartId</code>中指定图表的ID。除此之外，<code>ChartTimePriceToXY</code>函数还会传入窗口子窗口的编号（它应该在窗口数量范围内）。如果有多个子窗口，每个子窗口都有自己的时间序列以及沿垂直轴的刻度（条件性地称为“价格”，由<code>price</code>参数表示）。</p><p><code>ChartXYToTimePrice</code>函数中的<code>window</code>参数是输出参数。该函数会与<code>time</code>和<code>price</code>一起填充这个参数。这是因为像素坐标对于整个屏幕是通用的，而原点x/y可能会落在任何子窗口中。</p><p>时间、价格和屏幕坐标</p><p>时间、价格和屏幕坐标</p><p>函数成功完成时返回<code>true</code>。</p><p>请注意，在两种坐标系中，对应于报价或屏幕坐标的可见矩形区域都是有限的。因此，在特定的初始数据下，可能会出现所得到的时间、价格或像素超出可见区域的情况。特别是，也可能会得到负值。我们将在关于图表事件的章节中查看一个交互式的重新计算示例。</p><p>在上一节中，我们了解了如何确定MQL程序的启动位置。虽然在物理上只有一个最终放置点，但它在报价坐标和屏幕坐标中的表示通常包含计算误差。两个用于将像素转换为价格/时间以及反之的新函数将帮助我们确认这一点。</p><p>修改后的脚本名为<code>ChartXY.mq5</code>。它大致可以分为三个阶段。在第一阶段，我们像以前一样得出放置点的坐标。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   const int w1 = PRTF(ChartWindowOnDropped());</span></span>
<span class="line"><span>   const datetime t1 = PRTF(ChartTimeOnDropped());</span></span>
<span class="line"><span>   const double p1 = PRTF(ChartPriceOnDropped());</span></span>
<span class="line"><span>   const int x1 = PRTF(ChartXOnDropped());</span></span>
<span class="line"><span>   const int y1 = PRTF(ChartYOnDropped());</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>在第二阶段，我们尝试将屏幕坐标<code>x1</code>和<code>y1</code>转换为时间（<code>t2</code>）和价格（<code>p2</code>），并将它们与上面从<code>OnDropped</code>函数中得到的值进行比较。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   int w2;</span></span>
<span class="line"><span>   datetime t2;</span></span>
<span class="line"><span>   double p2;</span></span>
<span class="line"><span>   PRTF(ChartXYToTimePrice(0, x1, y1, w2, t2, p2));</span></span>
<span class="line"><span>   Print(w2, &quot; &quot;, p2, &quot; &quot;, t2);</span></span>
<span class="line"><span>   PRTF(w1 == w2 &amp;&amp; t1 == t2 &amp;&amp; p1 == p2);</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>然后我们执行反向转换：使用得到的报价坐标<code>t1</code>和<code>p1</code>来计算屏幕坐标<code>x2</code>和<code>y2</code>，并且也与原始值<code>x1</code>和<code>y1</code>进行比较。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   int x2, y2;</span></span>
<span class="line"><span>   PRTF(ChartTimePriceToXY(0, w1, t1, p1, x2, y2));</span></span>
<span class="line"><span>   Print(x2, &quot; &quot;, y2);</span></span>
<span class="line"><span>   PRTF(x1 == x2 &amp;&amp; y1 == y2);</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>正如我们稍后在示例日志中会看到的，上述所有检查都会失败（值之间会有轻微差异）。所以我们需要第三步。</p><p>让我们重新计算变量名中带有后缀2的屏幕坐标和报价坐标，并将它们保存在带有新后缀3的变量中。然后将第一阶段和第三阶段的所有值相互进行比较。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   int w3;</span></span>
<span class="line"><span>   datetime t3;</span></span>
<span class="line"><span>   double p3;</span></span>
<span class="line"><span>   PRTF(ChartXYToTimePrice(0, x2, y2, w3, t3, p3));</span></span>
<span class="line"><span>   Print(w3, &quot; &quot;, p3, &quot; &quot;, t3);</span></span>
<span class="line"><span>   PRTF(w1 == w3 &amp;&amp; t1 == t3 &amp;&amp; p1 == p3);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   int x3, y3;</span></span>
<span class="line"><span>   PRTF(ChartTimePriceToXY(0, w2, t2, p2, x3, y3));</span></span>
<span class="line"><span>   Print(x3, &quot; &quot;, y3);</span></span>
<span class="line"><span>   PRTF(x1 == x3 &amp;&amp; y1 == y3);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>让我们在XAUUSD，H1图表上运行该脚本。以下是原始点数据。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>ChartWindowOnDropped()=0 / ok</span></span>
<span class="line"><span>ChartTimeOnDropped()=2021.11.22 18:00:00 / ok</span></span>
<span class="line"><span>ChartPriceOnDropped()=1797.7 / ok</span></span>
<span class="line"><span>ChartXOnDropped()=234 / ok</span></span>
<span class="line"><span>ChartYOnDropped()=280 / ok</span></span></code></pre></div><p>将像素转换为报价得到以下结果。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>ChartXYToTimePrice(0,x1,y1,w2,t2,p2)=true / ok</span></span>
<span class="line"><span>0 1797.16 2021.11.22 18:30:00</span></span>
<span class="line"><span>w1==w2&amp;&amp;t1==t2&amp;&amp;p1==p2=false / ok</span></span></code></pre></div><p>在时间和价格上都存在差异。反向计算在精度方面也并不完美。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>ChartTimePriceToXY(0,w1,t1,p1,x2,y2)=true / ok</span></span>
<span class="line"><span>232 278</span></span>
<span class="line"><span>x1==x2&amp;&amp;y1==y2=false / ok</span></span></code></pre></div><p>精度损失是由于根据度量单位（特别是像素和点）对轴上的值进行量化造成的。</p><p>最后，最后一步证明了上面得到的误差不是函数本身的问题，因为循环重新计算会得到原始结果。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>ChartXYToTimePrice(0,x2,y2,w3,t3,p3)=true / ok</span></span>
<span class="line"><span>0 1797.7 2021.11.22 18:00:00</span></span>
<span class="line"><span>w1==w3&amp;&amp;t1==t3&amp;&amp;p1==p3=true / ok</span></span>
<span class="line"><span>ChartTimePriceToXY(0,w2,t2,p2,x3,y3)=true / ok</span></span>
<span class="line"><span>234 280</span></span>
<span class="line"><span>x1==x3&amp;&amp;y1==y3=true / ok</span></span></code></pre></div><p>用伪代码表示，这可以由以下等式表达：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>ChartTimePriceToXY(ChartXYToTimePrice(XY)) = XY</span></span>
<span class="line"><span>ChartXYToTimePrice(ChartTimePriceToXY(TP)) = TP</span></span></code></pre></div><p>将<code>ChartTimePriceToXY</code>函数应用于<code>ChartXYToTimePrice</code>的工作结果将得到原始坐标。对于另一个方向的转换也是如此：将<code>ChartXYToTimePrice</code>应用于<code>ChartTimePriceToXY</code>的结果将得到匹配的值。</p><p>因此，如果对使用重新计算函数的算法有更高的精度要求，那么在实现这些算法时应该仔细考虑。</p><p>在“管理图表上的指标”部分的脚本<code>ChartIndicatorMove.mq5</code>中，将给出<code>ChartWindowOnDropped</code>的另一个使用示例。</p><h2 id="沿时间轴滚动图表" tabindex="-1">沿时间轴滚动图表 <a class="header-anchor" href="#沿时间轴滚动图表" aria-label="Permalink to &quot;沿时间轴滚动图表&quot;">​</a></h2><p>MetaTrader 5 的用户对快速图表导航面板应该很熟悉，通过双击时间轴左上角，或者按下空格键或回车键，就能打开该面板。借助 <code>ChartNavigate</code> 函数，也能以编程方式实现类似的操作。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool ChartNavigate(long chartId, ENUM_CHART_POSITION position, int shift = 0)</span></span></code></pre></div><p>此函数会让 <code>chartId</code> 对应的图表相对于 <code>position</code> 参数所指定的预定义图表位置，按指定的K线数量进行移动。<code>position</code> 属于 <code>ENUM_CHART_POSITION</code> 枚举类型，其元素如下：</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th></tr></thead><tbody><tr><td>CHART_BEGIN</td><td>图表起始位置（最旧的价格）</td></tr><tr><td>CHART_CURRENT_POS</td><td>当前位置</td></tr><tr><td>CHART_END</td><td>图表结束位置（最新的价格）</td></tr></tbody></table><p><code>shift</code> 参数用于设定图表需要移动的K线数量。正值会使图表向右移动（朝着结束位置），负值则会让图表向左移动（朝着起始位置）。</p><p>若操作成功，该函数返回 <code>true</code>；若出现错误，则返回 <code>false</code>。</p><p>为了对这个函数进行测试，我们来创建一个简单的脚本 <code>ChartNavigate.mq5</code>。用户可以借助输入变量来选择起始点和K线移动数量。</p><div class="language-mq5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mq5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property script_show_inputs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>input ENUM_CHART_POSITION Position = CHART_CURRENT_POS;</span></span>
<span class="line"><span>input int Shift = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ChartSetInteger(0, CHART_AUTOSCROLL, false);</span></span>
<span class="line"><span>    const int start = (int)ChartGetInteger(0, CHART_FIRST_VISIBLE_BAR);</span></span>
<span class="line"><span>    ChartNavigate(0, Position, Shift);</span></span>
<span class="line"><span>    const int stop = (int)ChartGetInteger(0, CHART_FIRST_VISIBLE_BAR);</span></span>
<span class="line"><span>    Print(&quot;Moved by: &quot;, stop - start, &quot;, from &quot;, start, &quot; to &quot;, stop);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>日志会显示移动前后第一个可见K线的编号。</p><p>一个更实用的例子是脚本 <code>ChartSynchro.mq5</code>，它能让所有运行该脚本的图表同步滚动，响应于用户手动滚动其中一个图表的操作。这样一来，你就能同步同一交易品种不同时间周期的窗口，或者分析不同交易品种的并行价格走势。</p><div class="language-mq5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mq5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    datetime bar = 0; // 当前位置（第一个可见K线的时间）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const string namePosition = __FILE__; // 全局变量名</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ChartSetInteger(0, CHART_AUTOSCROLL, false); // 禁用自动滚动</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    while (!IsStopped())</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        const bool active = ChartGetInteger(0, CHART_BRING_TO_TOP);</span></span>
<span class="line"><span>        const int move = (int)ChartGetInteger(0, CHART_FIRST_VISIBLE_BAR);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 活动图表为主导，其余为从属</span></span>
<span class="line"><span>        if (active)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            const datetime first = iTime(_Symbol, _Period, move);</span></span>
<span class="line"><span>            if (first != bar)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                // 若位置改变，将其保存到全局变量中</span></span>
<span class="line"><span>                bar = first;</span></span>
<span class="line"><span>                GlobalVariableSet(namePosition, bar);</span></span>
<span class="line"><span>                Comment(&quot;Chart &quot;, ChartID(), &quot; scrolled to &quot;, bar);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            const datetime b = (datetime)GlobalVariableGet(namePosition);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (b != bar)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                // 若全局变量的值改变，调整位置</span></span>
<span class="line"><span>                bar = b;</span></span>
<span class="line"><span>                const int difference = move - iBarShift(_Symbol, _Period, bar);</span></span>
<span class="line"><span>                ChartNavigate(0, CHART_CURRENT_POS, difference);</span></span>
<span class="line"><span>                Comment(&quot;Chart &quot;, ChartID(), &quot; forced to &quot;, bar);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Sleep(250);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    Comment(&quot;&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>对齐操作是依据第一个可见K线的日期和时间（<code>CHART_FIRST_VISIBLE_BAR</code>）来完成的。该脚本会在循环中检查这个值，若它运行在活动图表上，就把这个值写入全局变量。其他图表上的脚本会读取这个全局变量，并使用 <code>ChartNavigate</code> 相应地调整自身位置。参数指定了图表的相对移动（<code>CHART_CURRENT_POS</code>），要移动的K线数量定义为当前第一个可见K线编号与从全局变量中读取的编号之差。</p><p>下图展示了欧元兑美元（EURUSD）的H1和M15图表同步的结果。</p><p>在我们熟悉了图表上的系统事件之后，会把这个脚本转换为指标，从而去掉无限循环。</p><h2 id="图表重绘请求" tabindex="-1">图表重绘请求 <a class="header-anchor" href="#图表重绘请求" aria-label="Permalink to &quot;图表重绘请求&quot;">​</a></h2><p>在大多数情况下，图表会自动响应数据和终端设置的变化，并相应地刷新窗口图像（如价格图表、指标图表等）。然而，MQL程序功能极为多样，能够执行任意操作，因此判断是否需要重绘并非易事。此外，分析该账户上每个MQL程序的任意操作可能会消耗大量资源，导致终端整体性能下降。所以，MQL5 API提供了<code>ChartRedraw</code>函数，借助该函数，MQL程序在必要时可以自行请求重绘图表。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void ChartRedraw(long chartId = 0)</span></span></code></pre></div><p>该函数会强制重绘指定标识符的图表（默认值0表示当前图表）。通常，在程序更改图表或放置在其上的对象的属性后会使用此函数。</p><p>我们在“图表显示模式”部分的<code>IndSubChart.mq5</code>指标中看到过使用<code>ChartRedraw</code>的示例。“打开和关闭图表”部分还会给出另一个示例。</p><p>此函数仅影响图表的重绘，不会导致带有报价和指标的时间序列重新计算。更新（实际上是重建）图表的另一种更“强力”的选项是通过<code>ChartSetSymbolPeriod</code>函数来执行（见下一节）。</p><h2 id="切换交易品种和时间周期" tabindex="-1">切换交易品种和时间周期 <a class="header-anchor" href="#切换交易品种和时间周期" aria-label="Permalink to &quot;切换交易品种和时间周期&quot;">​</a></h2><p>有时，MQL程序需要切换图表的当前交易品种或时间周期。特别是对于许多多货币对、多时间周期的交易面板或交易历史分析工具而言，这是一项常见功能。为此，MQL5 API提供了<code>ChartSetSymbolPeriod</code>函数。</p><p>你还可以使用该函数来启动整个图表（包括其上的指标）的重新计算。你只需将当前的交易品种和时间周期作为参数指定即可。对于那些在首次调用<code>OnCalculate</code>时无法完全计算，需要等待第三方数据（其他交易品种、报价或指标）加载的指标来说，这种方法可能会很有用。此外，更改交易品种/时间周期会导致附加到图表上的智能交易系统重新初始化。在这个过程中，脚本（如果它是在循环中定期执行的）会从图表中完全消失（它会从旧的交易品种/时间周期组合中卸载，但不会自动加载到新的组合中）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool ChartSetSymbolPeriod(long chartId, string symbol, ENUM_TIMEFRAMES timeframe)</span></span></code></pre></div><p>该函数会将具有<code>chartId</code>标识符的指定图表的交易品种和时间周期更改为相应参数<code>symbol</code>和<code>timeframe</code>的值。<code>chartId</code>参数为0表示当前图表，<code>symbol</code>参数为<code>NULL</code>表示当前交易品种，<code>timeframe</code>参数为0表示当前时间周期。</p><p>更改是异步生效的，也就是说，该函数只是向终端发送一个命令，而不会等待其执行。该命令会被添加到图表的消息队列中，并且只有在所有先前的命令都被处理完毕后才会执行。</p><p>如果命令成功放入图表队列，函数返回<code>true</code>；如果出现问题，则返回<code>false</code>。有关错误的信息可以在<code>_LastError</code>中找到。</p><p>我们已经见过使用该函数更新多个指标的示例，具体如下：</p><ul><li><code>IndDeltaVolume.mq5</code>（参见“等待数据和管理可见性”）</li><li><code>IndUnityPercent.mq5</code>（参见“多货币对和多时间周期指标”）</li><li><code>UseWPRMTF.mq5</code>（参见“支持多个交易品种和时间周期”）</li><li><code>UseM1MA.mq5</code>（参见“使用内置指标”）</li><li><code>UseDemoAllLoop.mq5</code>（参见“删除指标实例”）</li><li><code>IndSubChart.mq5</code>（参见“图表显示模式”）</li></ul><h2 id="图表上的指标管理" tabindex="-1">图表上的指标管理 <a class="header-anchor" href="#图表上的指标管理" aria-label="Permalink to &quot;图表上的指标管理&quot;">​</a></h2><p>正如我们所知，图表是指标的执行和可视化环境。它们之间的紧密联系通过一组内置函数得到了进一步证实，这些函数可用于控制图表上的指标。在前面的章节中，我们已经对这些功能进行了概述。在了解了图表之后，现在我们准备详细探讨它们。</p><p>所有这些函数的前两个参数是统一的：即图表标识符（<code>chartId</code>）和窗口编号（<code>window</code>）。参数的零值分别表示当前图表和主窗口。</p><h3 id="int-chartindicatorstotal-long-chartid-int-window" tabindex="-1">int ChartIndicatorsTotal(long chartId, int window) <a class="header-anchor" href="#int-chartindicatorstotal-long-chartid-int-window" aria-label="Permalink to &quot;int ChartIndicatorsTotal(long chartId, int window)&quot;">​</a></h3><p>该函数返回附加到指定图表窗口的所有指标的数量。它可用于枚举附加到给定图表的所有指标。所有图表窗口的数量可以通过<code>ChartGetInteger</code>函数从<code>CHART_WINDOWS_TOTAL</code>属性中获取。</p><h3 id="string-chartindicatorname-long-chartid-int-window-int-index" tabindex="-1">string ChartIndicatorName(long chartId, int window, int index) <a class="header-anchor" href="#string-chartindicatorname-long-chartid-int-window-int-index" aria-label="Permalink to &quot;string ChartIndicatorName(long chartId, int window, int index)&quot;">​</a></h3><p>该函数通过位于指定图表窗口的指标列表中的索引返回指标的短名称。短名称是通过<code>IndicatorSetString</code>函数在<code>INDICATOR_SHORTNAME</code>属性中指定的名称（如果未设置，则默认等于指标文件的名称）。</p><h3 id="int-chartindicatorget-long-chartid-int-window-const-string-shortname" tabindex="-1">int ChartIndicatorGet(long chartId, int window, const string shortname) <a class="header-anchor" href="#int-chartindicatorget-long-chartid-int-window-const-string-shortname" aria-label="Permalink to &quot;int ChartIndicatorGet(long chartId, int window, const string shortname)&quot;">​</a></h3><p>它返回在特定图表窗口中具有指定短名称的指标的句柄。可以说，<code>ChartIndicatorGet</code>函数中对指标的识别正是通过短名称进行的，因此建议将其编写为包含所有输入参数的值。如果由于某种原因无法做到这一点，还有另一种方法可以通过其参数列表来识别指标实例，这些参数可以使用给定的描述符通过<code>IndicatorParameters</code>函数获取。</p><p>从<code>ChartIndicatorGet</code>函数获取句柄会增加该指标的内部使用计数器。终端执行系统会保留所有计数器大于零的指标的加载状态。因此，不再需要的指标必须通过调用<code>IndicatorRelease</code>显式释放。否则，指标将保持闲置状态并消耗资源。</p><h3 id="bool-chartindicatoradd-long-chartid-int-window-int-handle" tabindex="-1">bool ChartIndicatorAdd(long chartId, int window, int handle) <a class="header-anchor" href="#bool-chartindicatoradd-long-chartid-int-window-int-handle" aria-label="Permalink to &quot;bool ChartIndicatorAdd(long chartId, int window, int handle)&quot;">​</a></h3><p>该函数将最后一个参数中传递的描述符所对应的指标添加到指定的图表窗口。指标和图表必须具有相同的交易品种和时间框架组合。否则，将发生错误<code>ERR_CHART_INDICATOR_CANNOT_ADD</code>（4114）。</p><p>要将指标添加到新窗口，<code>window</code>参数必须比最后一个现有窗口的索引大1，即等于通过<code>ChartGetInteger</code>调用获得的<code>CHART_WINDOWS_TOTAL</code>属性。如果参数值超过<code>ChartGetInteger(ID,CHART_WINDOWS_TOTAL)</code>的值，则不会创建新窗口和指标。</p><p>如果将一个应在单独子窗口中绘制的指标添加到主图表窗口（例如，内置的<code>iMACD</code>或带有指定属性<code>#property indicator_separate_window</code>的自定义指标），那么这样的指标可能看起来不可见，尽管它会出现在指标列表中。这通常意味着该指标的值不在价格图表的显示范围内。可以在“数据”窗口中观察并使用其他MQL程序中的函数读取此类“不可见”指标的值。</p><p>将指标添加到图表会因其与图表的绑定而增加其内部使用计数器。如果MQL程序保留其描述符且不再需要它，则应通过调用<code>IndicatorRelease</code>将其删除。这实际上会减少计数器，但指标仍将保留在图表上。</p><h3 id="bool-chartindicatordelete-long-chartid-int-window-const-string-shortname" tabindex="-1">bool ChartIndicatorDelete(long chartId, int window, const string shortname) <a class="header-anchor" href="#bool-chartindicatordelete-long-chartid-int-window-const-string-shortname" aria-label="Permalink to &quot;bool ChartIndicatorDelete(long chartId, int window, const string shortname)&quot;">​</a></h3><p>该函数从具有<code>chartId</code>的图表上编号为<code>window</code>的窗口中删除具有指定短名称的指标。如果在指定的图表子窗口中有多个具有相同短名称的指标，则将删除顺序中的第一个。</p><p>如果在同一图表上使用已删除指标的值来计算其他指标，它们也将被删除。</p><p>从图表中删除指标并不意味着其计算部分也会从终端内存中删除，如果描述符仍保留在MQL程序中。要释放指标句柄，请使用<code>IndicatorRelease</code>函数。</p><h3 id="chartwindowfind函数" tabindex="-1">ChartWindowFind函数 <a class="header-anchor" href="#chartwindowfind函数" aria-label="Permalink to &quot;ChartWindowFind函数&quot;">​</a></h3><p><code>ChartWindowFind</code>函数返回指标所在的子窗口的编号。有两种形式用于在其图表上查找当前指标或在具有<code>chartId</code>标识符的任意图表上查找具有给定短名称的指标。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int ChartWindowFind()</span></span>
<span class="line"><span>int ChartWindowFind(long chartId, string shortname)</span></span></code></pre></div><p>第二种形式可用于脚本和智能交易系统。</p><h3 id="示例一-chartlist-mq5脚本" tabindex="-1">示例一：ChartList.mq5脚本 <a class="header-anchor" href="#示例一-chartlist-mq5脚本" aria-label="Permalink to &quot;示例一：ChartList.mq5脚本&quot;">​</a></h3><p>作为展示这些函数的第一个示例，让我们考虑<code>ChartList.mq5</code>脚本的完整版本。我们在前面的章节中创建并逐步完善了它，直到“获取窗口/子窗口的数量和可见性”这一章节。与那里展示的<code>ChartList4.mq5</code>相比，我们将添加输入变量，以便能够仅列出包含MQL程序的图表并抑制隐藏窗口的显示。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input bool IncludeEmptyCharts = true;</span></span>
<span class="line"><span>input bool IncludeHiddenWindows = true;</span></span></code></pre></div><p><code>IncludeEmptyCharts</code>参数的默认值（<code>true</code>）指示将所有图表（包括空图表）包含在列表中。<code>IncludeHiddenWindows</code>参数默认设置为显示隐藏窗口。这些设置对应于先前的脚本逻辑<code>ChartListN</code>。</p><p>为了计算指标的总数和子窗口中的指标数，我们定义了<code>indicators</code>和<code>subs</code>变量。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void ChartList()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   int indicators = 0, subs = 0;</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>当前图表窗口的工作循环发生了重大变化。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void ChartList()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      for(int i = 0; i &lt; win; i++)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         const bool visible = ChartGetInteger(id, CHART_WINDOW_IS_VISIBLE, i);</span></span>
<span class="line"><span>         if(!visible &amp;&amp; !IncludeHiddenWindows) continue;</span></span>
<span class="line"><span>         if(!visible)</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            Print(&quot;  &quot;, i, &quot;/Hidden&quot;);</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>         const int n = ChartIndicatorsTotal(id, i);</span></span>
<span class="line"><span>         for(int k = 0; k &lt; n; k++)</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            if(temp == 0)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>               Print(header);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            Print(&quot;  &quot;, i, &quot;/&quot;, k, &quot; [I] &quot;, ChartIndicatorName(id, i, k));</span></span>
<span class="line"><span>            indicators++;</span></span>
<span class="line"><span>            if(i &gt; 0) subs++;</span></span>
<span class="line"><span>            temp++;</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      ...</span></span></code></pre></div><p>这里我们添加了<code>ChartIndicatorsTotal</code>和<code>ChartIndicatorName</code>调用。现在列表将提及所有类型的MQL程序：<code>[E]</code> — 智能交易系统，<code>[S]</code> — 脚本，<code>[I]</code> — 指标。</p><p>以下是脚本在默认设置下生成的日志条目的示例。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Chart List</span></span>
<span class="line"><span>N, ID, Symbol, TF, #subwindows, *active, Windows handle</span></span>
<span class="line"><span>0 132358585987782873 EURUSD M15 #1    133538</span></span>
<span class="line"><span>  1/0 [I] ATR(11)</span></span>
<span class="line"><span>1 132360375330772909 EURUSD D1     133514</span></span>
<span class="line"><span>2 132544239145024745 EURUSD M15   *   395646</span></span>
<span class="line"><span> [S] ChartList</span></span>
<span class="line"><span>3 132544239145024732 USDRUB D1     395688</span></span>
<span class="line"><span>4 132544239145024744 EURUSD H1 #2  active  2361730</span></span>
<span class="line"><span>  1/0 [I] %R(14)</span></span>
<span class="line"><span>  2/Hidden</span></span>
<span class="line"><span>  2/0 [I] Momentum(15)</span></span>
<span class="line"><span>5 132544239145024746 EURUSD H1     133584</span></span>
<span class="line"><span>Total chart number: 6, with MQL-programs: 3</span></span>
<span class="line"><span>Experts: 0, Scripts: 1, Indicators: 3 (main: 0 / sub: 3)</span></span></code></pre></div><p>如果将两个输入参数都设置为<code>false</code>，我们将得到一个精简的列表。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Chart List</span></span>
<span class="line"><span>N, ID, Symbol, TF, #subwindows, *active, Windows handle</span></span>
<span class="line"><span>0 132358585987782873 EURUSD M15 #1    133538</span></span>
<span class="line"><span>  1/0 [I] ATR(11)</span></span>
<span class="line"><span>2 132544239145024745 EURUSD M15   * active  395646</span></span>
<span class="line"><span> [S] ChartList</span></span>
<span class="line"><span>4 132544239145024744 EURUSD H1 #2    2361730</span></span>
<span class="line"><span>  1/0 [I] %R(14)</span></span>
<span class="line"><span>Total chart number: 6, with MQL-programs: 3</span></span>
<span class="line"><span>Experts: 0, Scripts: 1, Indicators: 2 (main: 0 / sub: 2)</span></span></code></pre></div><h3 id="示例二-chartindicatormove-mq5脚本" tabindex="-1">示例二：ChartIndicatorMove.mq5脚本 <a class="header-anchor" href="#示例二-chartindicatormove-mq5脚本" aria-label="Permalink to &quot;示例二：ChartIndicatorMove.mq5脚本&quot;">​</a></h3><p>作为第二个示例，让我们考虑一个有趣的脚本<code>ChartIndicatorMove.mq5</code>。</p><p>当在图表上运行多个指标时，我们经常需要更改指标的顺序。MetaTrader 5没有为此提供内置工具，这迫使我们删除一些指标并重新添加它们，同时重要的是要保存和恢复设置。<code>ChartIndicatorMove.mq5</code>脚本提供了自动化此过程的选项。需要注意的是，该脚本仅转移指标：如果需要更改子窗口以及其中的图形对象的顺序，则应使用<code>tpl</code>模板。</p><p><code>ChartIndicatorMove.mq5</code>的工作原理如下。当脚本应用于图表时，它确定将其添加到哪个窗口/子窗口，并开始向用户列出在那里找到的指标，请求确认转移。用户可以同意或继续列出。</p><p>移动方向（向上或向下）在<code>MoveDirection</code>输入变量中设置。<code>DIRECTION</code>枚举将描述它。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property script_show_inputs</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>enum DIRECTION</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Up = -1,</span></span>
<span class="line"><span>   Down = +1,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>input DIRECTION MoveDirection = Up;</span></span></code></pre></div><p>为了将指标转移到下一个子窗口而不是相邻子窗口，即实际上交换带有指标的子窗口的位置（这通常是需要的），我们引入了<code>jumpover</code>输入变量。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input bool JumpOver = true;</span></span></code></pre></div><p>在<code>OnStart</code>中开始遍历从<code>ChartWindowOnDropped</code>获得的目标窗口的指标。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   const int w = ChartWindowOnDropped();</span></span>
<span class="line"><span>   if(w == 0 &amp;&amp; MoveDirection == Up)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Alert(&quot;Can&#39;t move up from window at index 0&quot;);</span></span>
<span class="line"><span>      return;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   const int n = ChartIndicatorsTotal(0, w);</span></span>
<span class="line"><span>   for(int i = 0; i &lt; n; ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在循环内部，我们定义下一个指标的名称，向用户显示一条消息，并使用以下一系列操作将指标从一个窗口移动到另一个窗口：</p><ol><li>通过调用<code>ChartIndicatorGet</code>获取句柄。</li><li>根据所选方向通过<code>ChartIndicatorAdd</code>将其添加到当前窗口上方或下方的窗口，并且在向下移动时可以自动创建新的子窗口。</li><li>使用<code>ChartIndicatorDelete</code>从先前的窗口中删除指标。</li><li>释放描述符，因为我们在程序中不再需要它。</li></ol><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>      ...</span></span>
<span class="line"><span>      const string name = ChartIndicatorName(0, w, i);</span></span>
<span class="line"><span>      const string caption = EnumToString(MoveDirection);</span></span>
<span class="line"><span>      const int button = MessageBox(&quot;Move &#39;&quot; + name + &quot;&#39; &quot; + caption + &quot;?&quot;,</span></span>
<span class="line"><span>         caption, MB_YESNOCANCEL);</span></span>
<span class="line"><span>      if(button == IDCANCEL) break;</span></span>
<span class="line"><span>      if(button == IDYES)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         const int h = ChartIndicatorGet(0, w, name);</span></span>
<span class="line"><span>         ChartIndicatorAdd(0, w + MoveDirection, h);</span></span>
<span class="line"><span>         ChartIndicatorDelete(0, w, name);</span></span>
<span class="line"><span>         IndicatorRelease(h);</span></span>
<span class="line"><span>         break;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      ...</span></span></code></pre></div><p>以下图像显示了交换带有指标<code>WPR</code>和<code>Momentum</code>的子窗口的结果。脚本通过将其拖放到带有<code>WPR</code>指标的顶部子窗口上启动，选择的移动方向为向下（<code>Down</code>），默认启用了跳跃（<code>JumpOver</code>）。</p><p>子窗口中指标的交换</p><p>子窗口中指标的交换</p><p>请注意，如果将指标从子窗口移动到主窗口，由于其值超出显示的价格范围，其图表很可能不可见。如果发生这种错误，可以使用脚本将指标移回子窗口。</p><h2 id="打开和关闭图表" tabindex="-1">打开和关闭图表 <a class="header-anchor" href="#打开和关闭图表" aria-label="Permalink to &quot;打开和关闭图表&quot;">​</a></h2><p>一个 MQL 程序不仅可以分析图表列表，还能对其进行修改：打开新图表或关闭现有的图表。有两个函数可用于这些操作：<code>ChartOpen</code> 和 <code>ChartClose</code>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>long ChartOpen(const string symbol, ENUM_TIMEFRAMES timeframe)</span></span></code></pre></div><p>该函数会打开一个具有指定交易品种和时间周期的新图表，并返回新图表的 ID。如果在执行过程中发生错误，结果为 0，并且可以在内置变量 <code>_LastError</code> 中读取错误代码。</p><p>如果 <code>symbol</code> 参数为 <code>NULL</code>，则表示当前图表（正在其上执行 MQL 程序的图表）的交易品种。<code>timeframe</code> 参数中的 0 值对应于 <code>PERIOD_CURRENT</code>。</p><p>终端中同时打开的图表的最大数量不能超过 <code>CHARTS_MAX</code>（100）。</p><p>在学习了用于处理 <code>tpl</code> 模板的函数之后，我们将在下一节中看到使用 <code>ChartOpen</code> 函数的示例。</p><p>请注意，终端不仅允许您创建完整的图表窗口，还可以创建图表对象。它们与趋势线、通道、价格标签等其他图形对象一样，放置在普通图表内部。图表对象允许在一个标准图表中显示多个替代交易品种和时间周期的价格序列的小片段。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool ChartClose(long chartId = 0)</span></span></code></pre></div><p>该函数关闭具有指定 ID 的图表（默认值 0 表示当前图表）。该函数返回一个表示操作是否成功的指示值。</p><p>作为示例，我们来实现脚本 <code>ChartCloseIdle.mq5</code>，它将关闭那些包含重复的交易品种和时间周期组合的重复图表，前提是这些图表不包含 MQL 程序和图形对象。</p><p>首先，我们需要制作一个列表，用于统计特定交易品种/时间周期对的图表数量。这项任务由 <code>ChartIdleList</code> 函数实现，它与我们在脚本 <code>ChartList.mq5</code> 中看到的非常相似。列表本身在 <code>MapArray&lt;string,int&gt; chartCounts</code> 数组中形成。</p><div class="language-mq5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mq5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#include &lt;MQL5Book/Periods.mqh&gt;</span></span>
<span class="line"><span>#include &lt;MQL5Book/MapArray.mqh&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define PUSH(A,V) (A[ArrayResize(A, ArraySize(A) + 1) - 1] = V)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    MapArray&lt;string,int&gt; chartCounts;</span></span>
<span class="line"><span>    ulong duplicateChartIDs[];</span></span>
<span class="line"><span>    // 收集重复的空图表</span></span>
<span class="line"><span>    if(ChartIdleList(chartCounts, duplicateChartIDs))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>       ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        Print(&quot;No idle charts.&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>同时，<code>ChartIdleList</code> 函数会用符合关闭条件的空闲图表的标识符填充 <code>duplicateChartIDs</code> 数组。</p><div class="language-mq5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mq5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int ChartIdleList(MapArray&lt;string,int&gt; &amp;map, ulong &amp;duplicateChartIDs[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // 列出图表，直到图表列表结束</span></span>
<span class="line"><span>    for(long id = ChartFirst(); id != -1; id = ChartNext(id))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // 跳过对象</span></span>
<span class="line"><span>        if(ChartGetInteger(id, CHART_IS_OBJECT)) continue;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 获取图表的主要属性</span></span>
<span class="line"><span>        const int win = (int)ChartGetInteger(id, CHART_WINDOWS_TOTAL);</span></span>
<span class="line"><span>        const string expert = ChartGetString(id, CHART_EXPERT_NAME);</span></span>
<span class="line"><span>        const string script = ChartGetString(id, CHART_SCRIPT_NAME);</span></span>
<span class="line"><span>        const int objectCount = ObjectsTotal(id);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 统计指标数量</span></span>
<span class="line"><span>        int indicators = 0;</span></span>
<span class="line"><span>        for(int i = 0; i &lt; win; ++i)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            indicators += ChartIndicatorsTotal(id, i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        const string key = ChartSymbol(id) + &quot;/&quot; + PeriodToString(ChartPeriod(id));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if(map[key] == 0     // 第一次我们总是读取一个新的交易品种/时间周期组合</span></span>
<span class="line"><span>                            // 否则，只统计空图表：</span></span>
<span class="line"><span>           || (indicators == 0           // 没有指标</span></span>
<span class="line"><span>               &amp;&amp; StringLen(expert) == 0  // 没有智能交易系统</span></span>
<span class="line"><span>               &amp;&amp; StringLen(script) == 0  // 没有脚本</span></span>
<span class="line"><span>               &amp;&amp; objectCount == 0))      // 没有对象</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            const int i = map.inc(key);</span></span>
<span class="line"><span>            if(map[i] &gt; 1)                // 重复</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                PUSH(duplicateChartIDs, id);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return map.getSize();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在形成要删除的图表列表之后，在 <code>OnStart</code> 函数中，我们会在列表上循环调用 <code>ChartClose</code> 函数。</p><div class="language-mq5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mq5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>    if(ChartIdleList(chartCounts, duplicateChartIDs))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        for(int i = 0; i &lt; ArraySize(duplicateChartIDs); ++i)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            const ulong id = duplicateChartIDs[i];</span></span>
<span class="line"><span>            // 请求将图表置于前台</span></span>
<span class="line"><span>            ChartSetInteger(id, CHART_BRING_TO_TOP, true);</span></span>
<span class="line"><span>            // 更新窗口状态，处理请求队列</span></span>
<span class="line"><span>            ChartRedraw(id);</span></span>
<span class="line"><span>            // 请求用户确认</span></span>
<span class="line"><span>            const int button = MessageBox(</span></span>
<span class="line"><span>                &quot;Remove idle chart: &quot;</span></span>
<span class="line"><span>                + ChartSymbol(id) + &quot;/&quot; + PeriodToString(ChartPeriod(id)) + &quot;?&quot;,</span></span>
<span class="line"><span>                __FILE__, MB_YESNOCANCEL);</span></span>
<span class="line"><span>            if(button == IDCANCEL) break;</span></span>
<span class="line"><span>            if(button == IDYES)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                ChartClose(id);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>       ...</span></span></code></pre></div><p>对于每个图表，首先调用 <code>ChartSetInteger(id, CHART_BRING_TO_TOP, true)</code> 函数，向用户显示要关闭的是哪个窗口。由于此函数是异步的（只是将激活窗口的命令放入事件队列中），因此需要额外调用 <code>ChartRedraw</code> 函数，它会处理所有累积的消息。然后会提示用户确认操作。只有在点击“是”时，图表才会关闭。选择“否”会跳过当前图表（使其保持打开状态），循环继续。按下“取消”可以提前中断循环。</p><h2 id="使用-tpl图表模板" tabindex="-1">使用.tpl图表模板 <a class="header-anchor" href="#使用-tpl图表模板" aria-label="Permalink to &quot;使用.tpl图表模板&quot;">​</a></h2><p>MQL5 API提供了两个用于处理模板的函数。模板是扩展名为.tpl的文件，它们保存图表的内容，即图表的所有设置，以及绘制的对象、指标和智能交易系统（如果有的话）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool ChartSaveTemplate(long chartId, const string filename)</span></span></code></pre></div><p>该函数将当前图表设置保存到具有指定名称的.tpl模板中。</p><p>图表由<code>chartId</code>指定，0表示当前图表。</p><p>保存模板的文件名（<code>filename</code>）可以在不指定“.tpl”扩展名的情况下指定：它会自动添加。默认情况下，模板会保存到<code>terminal_dir/Profiles/Templates/</code>文件夹中，然后可以在终端中手动应用。不过，不仅可以指定名称，还可以指定相对于MQL5目录的路径，特别是以“/Files/”开头的路径。这样，就可以使用文件操作函数打开保存的模板，进行分析，并在必要时进行编辑（请参阅后面的<code>ChartTemplate.mq5</code>示例）。</p><p>如果指定路径上已经存在同名文件，其内容将被覆盖。</p><p>稍后我们将看一个保存和应用模板的综合示例。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool ChartApplyTemplate(long chartId, const string filename)</span></span></code></pre></div><p>该函数将指定文件中的模板应用到<code>chartId</code>图表上。</p><p>模板文件的搜索遵循以下规则：</p><ul><li>如果<code>filename</code>包含路径（以反斜杠“\\”或正斜杠“/”开头），则相对于<code>terminal_data_directory/MQL5</code>路径进行模式匹配。</li><li>如果名称中没有路径，则在调用该函数的EX5可执行文件所在的同一位置搜索模板。</li><li>如果在前两个位置未找到模板，则在标准模板文件夹<code>terminal_dir/Profiles/Templates/</code>中搜索。</li></ul><p>请注意，<code>terminal_data_directory</code>指的是存储修改后文件的文件夹，其位置可能因操作系统类型、用户名和计算机安全设置而异。通常它与<code>terminal_dir</code>文件夹不同，尽管在某些情况下（例如，以管理员组账户工作时），它们可能相同。可以使用<code>TerminalInfoString</code>函数分别找到<code>terminal_data_directory</code>和<code>terminal_directory</code>文件夹的位置（分别参见常量<code>TERMINAL_DATA_PATH</code>和<code>TERMINAL_PATH</code>）。</p><p>调用<code>ChartApplyTemplate</code>会创建一个命令，该命令会添加到图表的消息队列中，并且只有在所有先前的命令都被处理完毕后才会执行。</p><p>加载模板会停止在图表上运行的所有MQL程序，包括启动加载的那个程序。如果模板包含指标和智能交易系统，将启动它们的新实例。</p><p>出于安全考虑，当将带有智能交易系统的模板应用到图表上时，可以限制交易权限。如果调用<code>ChartApplyTemplate</code>函数的MQL程序没有交易权限，那么使用模板加载的智能交易系统也将没有交易权限，无论模板设置如何。如果调用<code>ChartApplyTemplate</code>的MQL程序被允许交易，但模板设置中不允许交易，那么使用模板加载的智能交易系统将不被允许交易。</p><p><code>ChartDuplicate.mq5</code>脚本的示例允许你创建当前图表的副本。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> OnStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string temp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;/Files/ChartTemp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ChartSaveTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, temp))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> long</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ChartOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ChartApplyTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(id, temp))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">         Print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Apply Error: &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, _LastError);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   else</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      Print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Save Error: &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, _LastError);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>首先，使用<code>ChartSaveTemplate</code>创建一个临时的.tpl文件，然后打开一个新图表（调用<code>ChartOpen</code>），最后，<code>ChartApplyTemplate</code>函数将此模板应用到新图表上。</p><p>然而，在许多情况下，程序员面临着更困难的任务：不仅仅是应用模板，而是预先对其进行编辑。</p><p>使用模板，你可以更改许多其他MQL5 API函数无法提供的图表属性，例如，指标在不同时间周期下的可见性、指标子窗口的顺序以及应用到它们的对象等。</p><p>.tpl文件格式与终端在会话之间用于存储图表的.chr文件相同（位于<code>terminal_directory/Profiles/Charts/profile_name</code>文件夹中）。</p><p>.tpl文件是一个具有特殊语法的文本文件。其中的属性可以是写在一行上的“键=值”对，或者是包含多个“键=值”属性的某种组。下面将这种组称为容器，因为除了单个属性之外，它们还可以包含其他嵌套容器。</p><p>容器以类似<code>&lt;tag&gt;</code>的行开始，其中<code>tag</code>是预定义的容器类型之一（见下文），并以类似<code>&lt;/tag&gt;</code>的两行结束（标签名称必须匹配）。换句话说，这种格式在某种意义上类似于XML（没有头部），其中所有词法单元必须写在单独的行上，并且标签属性不像XML中那样在开始部分<code>&lt;tag attribute1=value1...&gt; </code>中通过属性来表示，而是在标签的内部文本中表示。</p><p>支持的标签列表：</p><ul><li><code>chart</code> — 包含主要图表属性和所有下级容器的根容器；</li><li><code>expert</code> — 包含智能交易系统一般属性的容器，例如交易权限（在<code>chart</code>内部）；</li><li><code>window</code> — 包含窗口/子窗口属性及其下级容器的容器（在<code>chart</code>内部）；</li><li><code>object</code> — 包含图形对象属性的容器（在<code>window</code>内部）；</li><li><code>indicator</code> — 包含指标属性的容器（在<code>window</code>内部）；</li><li><code>graph</code> — 包含指标图表属性的容器（在<code>indicator</code>内部）；</li><li><code>level</code> — 包含指标级别属性的容器（在<code>indicator</code>内部）；</li><li><code>period</code> — 包含对象或指标在特定时间周期上的可见性属性的容器（在<code>object</code>或<code>indicator</code>内部）；</li><li><code>inputs</code> — 包含自定义指标和智能交易系统的设置（输入变量）的容器。</li></ul><p>“键=值”对的可能属性列表相当广泛，并且没有官方文档。如果需要，你可以自己研究该平台的这些特性。</p><p>以下是一个.tpl文件的片段（格式中的缩进是为了可视化容器的嵌套）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>&lt;chart&gt;</span></span>
<span class="line"><span>id=0</span></span>
<span class="line"><span>symbol=EURUSD</span></span>
<span class="line"><span>description=Euro vs US Dollar</span></span>
<span class="line"><span>period_type=1</span></span>
<span class="line"><span>period_size=1</span></span>
<span class="line"><span>digits=5</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>&lt;window&gt;</span></span>
<span class="line"><span>  height=117.133747</span></span>
<span class="line"><span>  objects=0</span></span>
<span class="line"><span>  &lt;indicator&gt;</span></span>
<span class="line"><span>    name=Main</span></span>
<span class="line"><span>    path=</span></span>
<span class="line"><span>    apply=1</span></span>
<span class="line"><span>    show_data=1</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    fixed_height=-1</span></span>
<span class="line"><span>  &lt;/indicator&gt;</span></span>
<span class="line"><span>&lt;/window&gt;</span></span>
<span class="line"><span>&lt;window&gt;</span></span>
<span class="line"><span>  &lt;indicator&gt;</span></span>
<span class="line"><span>    name=Momentum</span></span>
<span class="line"><span>    path=</span></span>
<span class="line"><span>    apply=6</span></span>
<span class="line"><span>    show_data=1</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    fixed_height=-1</span></span>
<span class="line"><span>    period=14</span></span>
<span class="line"><span>    &lt;graph&gt;</span></span>
<span class="line"><span>      name=</span></span>
<span class="line"><span>      draw=1</span></span>
<span class="line"><span>      style=0</span></span>
<span class="line"><span>      width=1</span></span>
<span class="line"><span>      color=16748574</span></span>
<span class="line"><span>    &lt;/graph&gt;</span></span>
<span class="line"><span>  &lt;/indicator&gt;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>&lt;/window&gt;</span></span>
<span class="line"><span>&lt;/chart&gt;</span></span></code></pre></div><p>我们有用于处理.tpl文件的<code>TplFile.mqh</code>头文件，使用它你可以分析和修改模板。它有两个类：</p><ul><li><code>Container</code> — 用于读取和存储文件元素，同时考虑层次结构（嵌套），以及在可能的修改后写入文件；</li><li><code>Selector</code> — 用于按顺序遍历层次结构的元素（<code>Container</code>对象），以搜索与某个查询匹配的内容，该查询以类似于xpath选择器（“/path/element[attribute=value]”）的字符串形式编写。</li></ul><p><code>Container</code>类的对象使用构造函数创建，该构造函数将用于读取的.tpl文件描述符作为第一个参数，将标签名称作为第二个参数。默认情况下，标签名称为<code>NULL</code>，这意味着根容器（整个文件）。因此，容器在读取文件的过程中会自行填充内容（请参阅<code>read</code>方法）。</p><p>当前元素的属性，即直接位于此容器内部的“键=值”对，应添加到<code>MapArray&lt;string,string&gt; properties</code>映射中。嵌套容器添加到<code>Container *children[]</code>数组中。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &lt;MQL5Book/MapArray.mqh&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#define</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> PUSH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">V</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ArrayResize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ArraySize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> V)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Container</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   MapArray</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">string,string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> properties;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   Container </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">children</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string tag;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> handle;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">public:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   Container</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> h, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string t </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">): </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">handle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h), </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t) { }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   ~</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Container</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ArraySize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(children); </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CheckPointer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i]) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> POINTER_DYNAMIC) delete </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   bool</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> read</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> verbose </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FileIsEnding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handle))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         string text </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FileReadString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handle);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> len </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringLen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(text);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(len </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&lt;&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;&amp;</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[len </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&gt;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">               const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string subtag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringSubstr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(text, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, len </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">               if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">subtag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;&amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringFind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(subtag, tag) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">               {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(verbose)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                  {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                     print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                  return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       // 元素已准备好</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">               }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">               </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">               PUSH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(children, new </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Container</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handle, subtag)).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">read</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(verbose);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            else</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">               string pair</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">               if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">StringSplit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(text, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;=&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, pair) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">               {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                  properties.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">pair</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">pair</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">               }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div>`,420)),n("p",null,[s[1]||(s[1]=a("在")),s[2]||(s[2]=n("code",null,"read",-1)),s[3]||(s[3]=a("方法中，我们逐行读取并解析文件。如果是“")),e(p,null,{default:t(()=>s[0]||(s[0]=[a("”形式的开始标签，我们创建一个新的容器对象并在其中继续读取。如果是具有相同名称的“")])),_:1}),s[4]||(s[4]=a("”形式的结束标签，我们返回成功标志（")),s[5]||(s[5]=n("code",null,"true",-1)),s[6]||(s[6]=a("），这意味着容器已生成。在其余行中，我们读取“键=值”对并将它们添加到属性数组中。"))]),s[13]||(s[13]=i(`<p>我们准备了<code>Selector</code>来在模板中搜索元素。一个包含要搜索标签层次结构的字符串会传递给它的构造函数。例如，字符串“/chart/window/indicator”对应于一个具有窗口/子窗口的图表，而该窗口/子窗口又包含任意指标。搜索结果将是第一个匹配项。通常，此查询将找到报价图表，因为它在模板中存储为名为“Main”的指标，并且位于文件开头，在其他子窗口之前。</p><p>更实际的查询会指定特定属性的名称和值。特别是，修改后的字符串“/chart/window/indicator[name=Momentum]”将仅搜索“Momentum”指标。此搜索与调用<code>ChartWindowFind</code>不同，因为这里指定的名称不带参数，而<code>ChartWindowFind</code>使用指标的短名称，该短名称通常包括参数值，但这些值可能会变化。</p><p>对于内置指标，<code>name</code>属性包含指标名称本身，对于自定义指标，它将显示为“Custom Indicator”。自定义指标的链接在<code>path</code>属性中作为可执行文件的路径给出，例如“Indicators\\MQL5Book\\IndTripleEMA.ex5”。</p><p>让我们看看<code>Selector</code>类的内部结构。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">class Selector</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string selector;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   string path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cursor;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">public:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   Selector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string s): </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">selector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(s), </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cursor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      StringSplit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(selector, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, path);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ...</span></span></code></pre></div><p>在构造函数中，我们将选择器查询分解为单独的组件，并将它们保存在<code>path</code>数组中。<code>cursor</code>变量表示当前正在与模式匹配的路径组件。在搜索开始时，我们处于根容器（我们正在考虑整个.tpl文件），并且<code>cursor</code>为0。随着匹配项的找到，<code>cursor</code>应该增加（请参阅下面的<code>accept</code>方法）。</p><p>类中重载了<code>[]</code>运算符，借助它可以获取路径的第<code>i</code>个片段。它还考虑到在片段中，方括号内可以指定“[key=value]”对。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   string operator</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ArraySize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(path)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> param </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringFind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i], </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(param </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringSubstr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i], </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, param);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ...</span></span></code></pre></div><p><code>accept</code>方法检查元素名称（标签）及其属性（<code>properties</code>）是否与选择器路径中为当前<code>cursor</code>位置指定的数据匹配。<code>this[cursor]</code>记录使用了上述重载的<code>[]</code>运算符 。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   bool</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> accept</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, MapArray</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">string,string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">properties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[cursor];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tag))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 如果请求有参数，则在属性中检查它</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 注意！目前仅支持一个属性，但需要支持多个 &quot;tag[a1=v1][a2=v2]...&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> start </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringLen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[cursor]) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringFind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[cursor], </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(start </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> stop </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringFind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[cursor], </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;]&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string prop </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringSubstr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[cursor], start </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, stop </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> start </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         // 注意！仅支持 &#39;=&#39;，但应该支持 &#39;&gt;&#39;, &#39;&lt;&#39; 等</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         string kv</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // 键和值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">StringSplit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(prop, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;=&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, kv) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> properties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">kv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">kv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> value)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">               return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      cursor</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ...</span></span></code></pre></div><p>如果标签名称与路径的当前片段不匹配，并且片段包含某个参数的值且该值不相等或不在<code>properties</code>数组中，则该方法将返回<code>false</code>。在其他情况下，我们将获得条件匹配，结果是<code>cursor</code>将向前移动（<code>cursor++</code>）并且该方法将返回<code>true</code>。</p><p>当<code>cursor</code>到达请求中的最后一个片段时，搜索过程将成功完成，因此我们需要一个方法来确定这个时刻，即<code>isComplete</code>方法。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   bool</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isComplete</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cursor </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ArraySize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(path);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> level</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cursor;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span></code></pre></div><p>此外，在模板分析过程中，可能会出现这样的情况：我们遍历了路径的一部分容器层次结构（即找到了几个匹配项），然后下一个请求片段不匹配。在这种情况下，需要“返回”到请求的先前级别，为此实现了<code>unwind</code>方法。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   bool</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> unwind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(cursor </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         cursor</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>现在，一切准备就绪，可以使用<code>Selector</code>对象在容器层次结构中（在读取.tpl文件后得到）组织搜索。所有必要的操作将由<code>Container</code>类中的<code>find</code>方法执行。它将<code>Selector</code>对象作为输入参数，并在根据<code>Selector::accept</code>方法存在匹配项时递归调用自身。到达请求末尾意味着成功，并且<code>find</code>方法将把当前容器返回给调用代码。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   Container </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Selector </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">selector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string element </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StringFormat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">%*s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> selector.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">level</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         +</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&gt; &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (string)</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ArraySize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(children);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(selector.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">accept</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tag, properties))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">         Print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(element </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot; accepted&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(selector.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isComplete</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">this;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ArraySize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(children); </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Container </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(selector);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(c) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> c;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         selector.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unwind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      else</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">         Print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(element);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ...</span></span></code></pre></div><p>请注意，在沿着对象树移动时，<code>find</code>方法会记录当前对象的标签名称和嵌套对象的数量，并以与对象嵌套级别成比例的缩进进行记录。如果项目与请求匹配，则日志条目会附加“accepted”一词。</p><p>还需要注意的是，此实现返回第一个匹配元素，并且不会继续搜索其他候选元素，从理论上讲，这对于模板可能很有用，因为它们通常在同一容器中包含多个相同类型的标签。例如，一个窗口可能包含许多对象，并且MQL程序可能有兴趣解析整个对象列表。建议可自行研究这一方面。</p><p>为了简化搜索调用，添加了一个同名方法，该方法接受一个字符串参数并在本地创建<code>Selector</code>对象。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   Container </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">selector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      Selector </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(selector);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">s);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span></code></pre></div><p>由于我们要编辑模板，因此应该提供修改容器的方法，特别是添加“键=值”对和具有给定标签的新嵌套容器。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> assign</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      properties.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key, value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   Container </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">subtag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> PUSH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(children, new </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Container</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handle, subtag));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      properties.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span></code></pre></div><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      properties.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span></code></pre></div>`,24)),n("p",null,[s[8]||(s[8]=a("编辑完成后，需要将容器的内容写回到文件中（可以是同一个文件或不同的文件）。辅助方法 ")),s[9]||(s[9]=n("code",null,"save",-1)),s[10]||(s[10]=a(" 按照上述的 tpl 格式保存对象：以开始标签“")),e(p,null,{default:t(()=>s[7]||(s[7]=[a("”开头，接着写入所有的“键=值”属性，然后对嵌套对象调用 "),n("code",null,"save",-1),a(" 方法，最后以结束标签“")])),_:1}),s[11]||(s[11]=a("”结尾。保存时将文件描述符作为参数传入。"))]),s[14]||(s[14]=i(`<div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   bool</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> h</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FileWriteString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&lt;&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> properties.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FileWriteString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h, properties.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getKey</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;=&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> properties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ArraySize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(children); </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">         children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FileWriteString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&lt;/&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span></code></pre></div><p>将整个模板写入文件的高级方法称为 <code>write</code>。它的输入参数（文件描述符）可以为 0，这意味着写入从其读取的同一个文件。不过，该文件必须以可写权限打开。</p><p>需要注意的是，当覆盖一个 Unicode 文本文件时，MQL5 不会写入初始的 UTF 标记（即所谓的 BOM，字节序标记），因此我们必须自己写入。否则，没有该标记，终端将无法读取和应用我们的模板。</p><p>如果调用代码传入的 <code>h</code> 参数是另一个专门以 Unicode 格式打开用于写入的文件，MQL5 将自动写入 BOM。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   bool</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> write</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> h </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      bool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rewriting </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         h </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> handle;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         rewriting </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FileGetInteger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h, FILE_IS_WRITABLE))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">         Print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;File is not writable&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rewriting)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         // 注意！我们手动写入 BOM，因为 MQL5 在覆盖时不会这样做</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         ushort</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> u</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">0x</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">FEFF</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">         FileSeek</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h, SEEK_SET, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">         FileWriteString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ShortArrayToString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(u));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      bool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rewriting)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         // 注意！MQL5 不允许减小文件大小，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         // 所以我们用空格填充多余的结尾部分</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FileTell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FileSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IsStopped</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            FileWriteString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(h, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span></code></pre></div><p>为了演示新类的功能，考虑隐藏特定指标窗口的问题。如你所知，用户可以通过在指标属性对话框（“显示”选项卡）中重置时间周期的可见性标志来实现这一点。从编程角度来看，无法直接做到这一点。这时编辑模板的功能就派上用场了。</p><p>在模板中，指标在不同时间周期的可见性在 <code>&lt;indicator&gt;</code> 容器中指定，在该容器中，为每个可见的时间周期 <code>&lt;period&gt;</code> 写入一个单独的容器。例如，在 M15 时间周期上的可见性如下所示：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>&lt;period&gt;</span></span>
<span class="line"><span>period_type=0</span></span>
<span class="line"><span>period_size=15</span></span>
<span class="line"><span>&lt;/period&gt;</span></span></code></pre></div><p>在 <code>&lt;period&gt;</code> 容器内部使用了 <code>period_type</code> 和 <code>period_size</code> 属性。<code>period_type</code> 是度量单位，为以下之一：</p><ul><li>0 表示分钟</li><li>1 表示小时</li><li>2 表示周</li><li>3 表示月</li></ul><p><code>period_size</code> 是时间周期中的度量单位数量。需要注意的是，日线时间周期表示为 24 小时。</p><p>当 <code>&lt;indicator&gt;</code> 容器中没有嵌套的 <code>&lt;period&gt;</code> 容器时，该指标将在所有时间周期上显示。</p><p>本书附带了 <code>ChartTemplate.mq5</code> 脚本，它会将 “Momentum” 指标添加到图表中（如果尚未存在），并使其仅在单个月线时间周期上可见。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> OnStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // 如果图表上还没有 Momentum(14)，则添加它</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> w </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ChartWindowFind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Momentum(14)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(w </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> momentum </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> iMomentum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">14</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, PRICE_TYPICAL);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      ChartIndicatorAdd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ChartGetInteger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, CHART_WINDOWS_TOTAL), momentum);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 不一定在这里，因为脚本很快就会退出，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 不过明确声明在代码中不再需要该句柄</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      IndicatorRelease</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(momentum);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ...</span></span></code></pre></div><p>接下来，我们将当前图表模板保存到一个文件中，然后打开该文件进行读写操作。也可以分配一个单独的文件用于写入。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string filename </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> _Symbol </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;-&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> PeriodToString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_Period) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;-momentum-rw&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PRTF</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ChartSaveTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/Files/&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> filename)))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> handle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> PRTF</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FileOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(filename </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;.tpl&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         FILE_READ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> FILE_WRITE </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> FILE_TXT </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> FILE_SHARE_READ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> FILE_SHARE_WRITE));</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 另一种选择 - 打开另一个仅用于写入的文件</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // int writer = PRTF(FileOpen(filename + &quot;w.tpl&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      //    FILE_WRITE | FILE_TXT | FILE_SHARE_READ | FILE_SHARE_WRITE));</span></span></code></pre></div><p>获取文件描述符后，我们创建一个根容器 <code>main</code> 并将整个文件读取到其中（嵌套容器及其所有属性将自动读取）。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      Container </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handle);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      main.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">read</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><p>然后，我们定义一个选择器来搜索 “Momentum” 指标。从理论上讲，更严格的方法还需要检查指定的周期（14），但我们的类不支持同时查询多个属性（这种可能性留给读者自行研究）。</p><p>使用选择器，我们进行搜索，打印找到的对象（仅作参考），并添加其嵌套容器 <code>&lt;period&gt;</code> 以及用于显示月线时间周期的设置。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      Container </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">found </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> main.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/chart/window/indicator[name=Momentum]&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(found)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         found.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         Container </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">period </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> found.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;period&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         period.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">assign</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;period_type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;3&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         period.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">assign</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;period_size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span></code></pre></div><p>最后，我们将修改后的模板写回到同一个文件中，关闭该文件，然后将其应用到图表上。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      main.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">write</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 或者 main.write(writer);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      FileClose</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handle);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      PRTF</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ChartApplyTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/Files/&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> filename));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>当在一个干净的图表上运行该脚本时，我们会在日志中看到如下记录：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>ChartSaveTemplate(0,/Files/+filename)=true / ok</span></span>
<span class="line"><span>FileOpen(filename+.tpl,FILE_READ|FILE_WRITE|FILE_TXT| »</span></span>
<span class="line"><span>» FILE_SHARE_READ|FILE_SHARE_WRITE|FILE_UNICODE)=1 / ok</span></span>
<span class="line"><span> &lt;&gt; 1 accepted</span></span>
<span class="line"><span>  &lt;chart&gt; 2 accepted</span></span>
<span class="line"><span>    &lt;window&gt; 1 accepted</span></span>
<span class="line"><span>      &lt;indicator&gt; 0</span></span>
<span class="line"><span>    &lt;window&gt; 1 accepted</span></span>
<span class="line"><span>      &lt;indicator&gt; 1 accepted</span></span>
<span class="line"><span>Tag: indicator</span></span>
<span class="line"><span>                    [key]    [value]</span></span>
<span class="line"><span>[ 0] &quot;name&quot;               &quot;Momentum&quot;</span></span>
<span class="line"><span>[ 1] &quot;path&quot;               &quot;&quot;        </span></span>
<span class="line"><span>[ 2] &quot;apply&quot;              &quot;6&quot;       </span></span>
<span class="line"><span>[ 3] &quot;show_data&quot;          &quot;1&quot;       </span></span>
<span class="line"><span>[ 4] &quot;scale_inherit&quot;      &quot;0&quot;       </span></span>
<span class="line"><span>[ 5] &quot;scale_line&quot;         &quot;0&quot;       </span></span>
<span class="line"><span>[ 6] &quot;scale_line_percent&quot; &quot;50&quot;      </span></span>
<span class="line"><span>[ 7] &quot;scale_line_value&quot;   &quot;0.000000&quot;</span></span>
<span class="line"><span>[ 8] &quot;scale_fix_min&quot;      &quot;0&quot;       </span></span>
<span class="line"><span>[ 9] &quot;scale_fix_min_val&quot;  &quot;0.000000&quot;</span></span>
<span class="line"><span>[10] &quot;scale_fix_max&quot;      &quot;0&quot;       </span></span>
<span class="line"><span>[11] &quot;scale_fix_max_val&quot;  &quot;0.000000&quot;</span></span>
<span class="line"><span>[12] &quot;expertmode&quot;         &quot;0&quot;       </span></span>
<span class="line"><span>[13] &quot;fixed_height&quot;       &quot;-1&quot;      </span></span>
<span class="line"><span>[14] &quot;period&quot;             &quot;14&quot;      </span></span>
<span class="line"><span>ChartApplyTemplate(0,/Files/+filename)=true / ok</span></span></code></pre></div><p>可以看到，在找到所需的指标（标记为 “accepted”）之前，算法在前面的主窗口中找到了一个指标，但它不符合要求，因为其名称不等于所需的 “Momentum”。</p><p>现在，如果打开图表上的指标列表，会看到 “momentum” 指标，并且在其属性对话框的 “显示” 选项卡中，唯一启用的时间周期是 “月线（Month）”。</p><p>本书附带了 <code>TplFileFull.mqh</code> 文件的扩展版本，它在选择标签的条件中支持不同的比较操作，并支持将多个标签选择到数组中。使用它的一个示例可以在 <code>ChartUnfix.mq5</code> 脚本中找到，该脚本会取消固定所有图表子窗口的大小。</p><h2 id="保存图表图像" tabindex="-1">保存图表图像 <a class="header-anchor" href="#保存图表图像" aria-label="Permalink to &quot;保存图表图像&quot;">​</a></h2><p>在MQL程序中，经常需要记录程序本身和交易环境的当前状态。通常，为此会将各种分析或财务指标输出到日志中，但有些情况用图表图像来呈现会更清晰，比如在进行交易的时候。MQL5 API包含一个函数，允许将图表图像保存到文件中。</p><h3 id="bool-chartscreenshot-long-chartid-string-filename-int-width-int-height-enum-align-mode-alignment-align-right" tabindex="-1">bool ChartScreenShot(long chartId, string filename, int width, int height, ENUM_ALIGN_MODE alignment = ALIGN_RIGHT) <a class="header-anchor" href="#bool-chartscreenshot-long-chartid-string-filename-int-width-int-height-enum-align-mode-alignment-align-right" aria-label="Permalink to &quot;bool ChartScreenShot(long chartId, string filename, int width, int height, ENUM_ALIGN_MODE alignment = ALIGN_RIGHT)&quot;">​</a></h3><p>该函数根据文件名<code>filename</code>（最多63个字符）所在字符串中的扩展名，以GIF、PNG或BMP格式对指定图表进行截图。截图会被放置在<code>MQL5/Files</code>目录中。</p><p>参数<code>width</code>和<code>height</code>设置图像的宽度和高度（以像素为单位）。</p><p>参数<code>alignment</code>会影响图表的哪一部分将包含在文件中。值<code>ALIGN_RIGHT</code>（默认值）表示对最新价格进行截图（可以认为是在截图前终端在按下<code>End</code>键时默默进行了跳转）。<code>ALIGN_LEFT</code>值确保从当前左侧可见的第一根柱线开始，柱线会被截取到图像中。因此，如果你需要从某个特定位置对图表进行截图，必须首先手动或使用<code>ChartNavigate</code>函数定位图表。</p><p><code>ChartScreenShot</code>函数在成功时返回<code>true</code>。</p><p>让我们在脚本<code>ChartPanorama.mq5</code>中测试这个函数。它的任务是保存从当前左侧可见柱线到当前时间的图表副本。通过首先将图表的起始位置移回到所需的历史深度，你可以得到一个相当扩展的全景图。在这种情况下，你不需要考虑选择多大宽度的图像。然而，请记住，过长的历史记录将需要一个巨大的图像，有可能超出图形格式或软件的处理能力。</p><p>图像的高度将自动确定为等于图表的当前高度。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 价格刻度的确切宽度未知，我们通过经验取值</span></span>
<span class="line"><span>   const int scale = 60;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 计算总高度，包括窗口之间的间隙</span></span>
<span class="line"><span>   const int w = (int)ChartGetInteger(0, CHART_WINDOWS_TOTAL);</span></span>
<span class="line"><span>   int height = 0;</span></span>
<span class="line"><span>   int gutter = 0;</span></span>
<span class="line"><span>   for(int i = 0; i &lt; w; ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(i == 1)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         gutter = (int)ChartGetInteger(0, CHART_WINDOW_YDISTANCE, i) - height;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      height += (int)ChartGetInteger(0, CHART_HEIGHT_IN_PIXELS, i);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   Print(&quot;Gutter=&quot;, gutter, &quot;, total=&quot;, gutter * (w - 1));</span></span>
<span class="line"><span>   height += gutter * (w - 1);</span></span>
<span class="line"><span>   Print(&quot;Height=&quot;, height);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 根据每根柱线的像素数量计算总宽度，</span></span>
<span class="line"><span>   // 同时包括图表从右边缘的偏移量和刻度宽度</span></span>
<span class="line"><span>   const int shift = (int)(ChartGetInteger(0, CHART_SHIFT) ?</span></span>
<span class="line"><span>      ChartGetDouble(0, CHART_SHIFT_SIZE) * ChartGetInteger(0, CHART_WIDTH_IN_PIXELS) / 100 : 0);</span></span>
<span class="line"><span>   Print(&quot;Shift=&quot;, shift);</span></span>
<span class="line"><span>   const int pixelPerBar = (int)MathRound(1.0 * ChartGetInteger(0, CHART_WIDTH_IN_PIXELS)</span></span>
<span class="line"><span>      / ChartGetInteger(0, CHART_WIDTH_IN_BARS));</span></span>
<span class="line"><span>   const int width = (int)ChartGetInteger(0, CHART_FIRST_VISIBLE_BAR) * pixelPerBar + scale + shift;</span></span>
<span class="line"><span>   Print(&quot;Width=&quot;, width);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 以PNG格式写入包含图片的文件</span></span>
<span class="line"><span>   const string filename = _Symbol + &quot;-&quot; + PeriodToString() + &quot;-panorama.png&quot;;</span></span>
<span class="line"><span>   if(ChartScreenShot(0, filename, width, height, ALIGN_LEFT))</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Print(&quot;File saved: &quot;, filename);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们也可以使用<code>ALIGN_RIGHT</code>模式，但那样的话，我们必须强制禁用从右边缘的偏移量，因为它会根据图像的大小重新计算，而且结果看起来会与屏幕上的样子完全不同（右侧的缩进会变得太大，因为它是按宽度的百分比指定的）。</p><p>以下是在XAUUSD，H1图表上运行该脚本后的日志示例。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Gutter=2, total=2</span></span>
<span class="line"><span>Height=440</span></span>
<span class="line"><span>Shift=74</span></span>
<span class="line"><span>Width=2086</span></span>
<span class="line"><span>File saved: XAUUSD-H1-panorama.png</span></span></code></pre></div><p>考虑到导航到不是非常久远的历史记录，得到了以下截图（以缩小4倍的副本形式呈现）。</p>`,42))])}const _=l(c,[["render",o]]);export{b as __pageData,_ as default};
