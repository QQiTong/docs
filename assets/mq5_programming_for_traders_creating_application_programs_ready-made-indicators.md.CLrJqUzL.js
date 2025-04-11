import{_ as n,c as a,ag as p,o as e}from"./chunks/framework.BhgIN1sM.js";const u=JSON.parse('{"title":"在MQL程序中使用现成指标","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/mq5_programming_for_traders/creating_application_programs/ready-made-indicators"}],["meta",{"property":"og:title","content":"在MQL程序中使用现成指标"}]]},"headers":[],"relativePath":"mq5_programming_for_traders/creating_application_programs/ready-made-indicators.md","filePath":"mq5_programming_for_traders/creating_application_programs/ready-made-indicators.md"}'),i={name:"mq5_programming_for_traders/creating_application_programs/ready-made-indicators.md"};function t(l,s,d,c,o,r){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="在mql程序中使用现成指标" tabindex="-1">在MQL程序中使用现成指标 <a class="header-anchor" href="#在mql程序中使用现成指标" aria-label="Permalink to &quot;在MQL程序中使用现成指标&quot;">​</a></h1><p>在上一章中，我们学习了如何开发自定义指标。用户可以将这些指标放置在图表上，并使用它们进行手动技术分析。但这并非使用指标的唯一方式。MQL5允许你以编程方式创建指标实例并获取其计算数据。既可以在其他指标中这么做，将几个简单指标组合成更复杂的指标，也能在根据指标信号执行自动或半自动交易的智能交易系统中实现。</p><p>只要了解指标参数，以及计算数据在其公共缓冲区中的位置和含义，就能够构建这些新应用的时间序列并访问它们。</p><p>在本章中，我们将学习创建和删除指标以及读取其缓冲区的函数。这不仅适用于用MQL5编写的自定义指标，还适用于大量内置指标。</p><p>以编程方式与指标进行交互的一般原则包括以下几个步骤：</p><ol><li><strong>创建指标描述符</strong>：这是系统响应特定函数调用（iCustom或IndicatorCreate）而发出的唯一识别号，MQL代码通过它来指定所需指标的名称和参数。</li><li><strong>从指标缓冲区读取数据</strong>：使用CopyBuffer函数，根据描述符指定的缓冲区来读取数据。</li><li><strong>释放句柄</strong>：如果不再需要该指标，使用IndicatorRelease函数释放句柄。</li></ol><p>创建和释放描述符通常分别在程序初始化和反初始化期间进行，而缓冲区则会根据需要反复读取和分析，例如在新报价到来时。</p><p>在除特殊情况之外的所有情形下，若需要在程序执行期间动态更改指标设置，建议在OnInit函数或全局对象类的构造函数中一次性获取指标描述符。</p><p>所有创建指标的函数至少有两个参数：交易品种和时间周期。你可以传入NULL来替代交易品种，这意味着当前交易品种。值为0则对应当前时间周期。你也可以选择使用内置变量_Symbol和_Period。如有必要，还能设置与图表无关的任意交易品种和时间周期。这样，尤其可以实现多资产和多时间周期指标。</p><p>在创建指标实例后，你不能立即访问其数据，因为缓冲区的计算需要一定时间。在读取数据之前，你应该使用BarsCalculated函数检查数据是否准备就绪（该函数也接受描述符参数，并返回已计算的K线数量）。否则，你将收到错误信息而非数据。虽然这并非致命错误，不会导致程序停止或卸载，但缺少数据会使程序失去作用。</p><p>在本章后续内容中，为简洁起见，我们将创建指标实例并获取其描述符简称为“创建指标”。需要将其与前一章中提到的“创建自定义指标”（即编写指标源代码）区分开来。</p><h2 id="指标所有者的句柄和计数器" tabindex="-1">指标所有者的句柄和计数器 <a class="header-anchor" href="#指标所有者的句柄和计数器" aria-label="Permalink to &quot;指标所有者的句柄和计数器&quot;">​</a></h2><p>以编程方式使用指标需要操作句柄。这一点可以与文件描述符作类比（请参阅“打开和关闭文件”部分）：在那里我们使用FileOpen函数告知系统文件名和打开模式，之后描述符就成为了使用所有其他文件函数的“通行证”。</p><p>指标描述符系统有几个作用。</p><p>它允许提前告知终端要启动哪个指标以及计算哪个时间序列。由于下载初始历史数据和计算指标（至少在首次请求时）需要一些时间，同时还需要分配资源（内存、图形处理等），所以指标创建的时间点和准备就绪的时间点是不同的。描述符就是它们之间的纽带。它类似于指向终端内部对象的一种链接，这个内部对象存储着我们在创建指标时设置的一组属性以及指标的当前状态。</p><p>当然，为了使用描述符，终端需要维护一个包含所有请求指标及其属性的特定表格。然而，终端不会提供这个总表格中的实际编号信息：相反，每个程序都会形成自己请求的指标的私有列表。这个列表中的条目指向总表格中的元素，而描述符只是该列表中的一个编号。</p><p>因此，在不同的程序中，相同的描述符背后可能是完全不同的指标。所以，在程序之间传递描述符的值是没有意义的。</p><p>描述符是终端资源管理系统的一部分，因为在可能的情况下，它可以避免具有相同特征的指标实例的重复。换句话说，所有通过编程方式、手动方式或从tpl模板创建的内置指标和自定义指标都会被缓存。</p><p>在创建新的指标实例之前，终端会检查缓存中是否存在相同的指标。在检查是否存在副本时，适用以下标准：</p><ol><li>交易品种和时间周期匹配。</li><li>参数匹配。</li></ol><p>对于自定义指标，还必须满足以下条件：</p><ol><li>磁盘上的路径（以字符串形式，无需规范化为绝对形式）匹配。</li><li>指标运行所在的图表匹配（当从MQL程序创建指标时，新创建的指标会继承创建它的程序所在的图表）。</li></ol><p>内置指标是按交易品种进行缓存的，因此它们的实例可以在不同的图表（相同的交易品种/时间周期）上单独使用。</p><p>请注意，不能手动在同一个图表上创建两个相同的指标。不同的程序实例可以请求相同的指标，在这种情况下，只会创建一个指标副本，并提供给两个程序使用。</p><p>对于每个唯一的条件组合，终端都会保留一个计数器：在首次请求创建特定指标后，其计数器值为1，在后续请求时，计数器值会增加1（不会创建指标副本）。当释放一个指标时，其计数器值会减1。只有当计数器值归零，即所有使用该指标的程序都明确表示不再使用它时，该指标才会被卸载。</p><p>需要注意的是，在同一个MQL程序中多次使用相同参数（包括交易品种/时间周期）调用指标创建函数，并不会导致引用计数器多次增加 —— 计数器只会增加一次。因此，对于每个句柄值，调用一次释放函数（IndicatorRelease）就足够了。所有后续调用都是多余的，并且会返回错误，因为已经没有需要释放的内容了。</p><p>除了在MQL5中使用iCustom和IndicatorCreate函数创建指标外，还可以获取第三方（已经存在）指标的句柄。这可以通过使用ChartIndicatorGet函数来实现，我们将在关于图表的章节中学习该函数。这里需要重点注意的是，以这种方式获取句柄也会增加其引用计数，并且在不释放该句柄的情况下会阻止指标被卸载。</p><p>如果一个程序创建了从属指标，当这个程序被卸载时，即使没有调用IndicatorRelease函数，这些从属指标的句柄也会自动释放（计数器减1）。</p><h2 id="简单创建指标实例的方法-icustom" tabindex="-1">简单创建指标实例的方法：iCustom <a class="header-anchor" href="#简单创建指标实例的方法-icustom" aria-label="Permalink to &quot;简单创建指标实例的方法：iCustom&quot;">​</a></h2><p>MQL5 提供了两个用于从程序中创建指标实例的函数：<code>iCustom</code> 和 <code>IndicatorCreate</code>。第一个函数需要传递一个参数列表，这些参数必须在程序编译时就已知。第二个函数允许在程序执行期间动态地形成一个包含被调用指标参数的数组。这种高级模式将在“高级创建指标的方法：IndicatorCreate”部分进行讨论。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int iCustom(const string symbol, ENUM_TIMEFRAMES timeframe, const string pathname, ...)</span></span></code></pre></div><p>该函数为指定的交易品种和时间周期创建一个指标。<code>symbol</code> 参数中使用 <code>NULL</code> 可表示当前图表的交易品种，而 <code>timeframe</code> 参数中使用 <code>0</code> 则设置为当前周期。</p><p>在 <code>pathname</code> 参数中，需指定指标名称（即不带扩展名的 <code>.ex5</code> 文件名称），还可以选择指定路径。下面会详细介绍路径相关内容。</p><p><code>pathname</code> 所引用的指标必须已经编译。</p><p>该函数返回一个指标句柄，若出错则返回 <code>INVALID_HANDLE</code>。这个句柄在调用本章描述的其他函数以及指标程序控制组中的函数时会用到。句柄是一个整数，在调用程序中唯一标识所创建的指标实例。</p><p><code>iCustom</code> 函数原型中的省略号表示指标的实际参数列表。它们的类型和顺序必须与指标代码中的形式参数相对应。不过，允许从参数列表末尾开始省略值。对于调用代码中未指定的这些参数，所创建的指标将使用相应输入的默认值。</p><p>例如，如果指标接受两个输入变量：周期（<code>input int WorkPeriod = 14</code>）和价格类型（<code>input ENUM_APPLIED_PRICE WorkPrice = PRICE_CLOSE</code>），那么可以不同程度详细地调用 <code>iCustom</code>：</p><ul><li><code>iCustom(_Symbol, _Period, 21, PRICE_TYPICAL)</code>：为整个参数列表设置值。</li><li><code>iCustom(_Symbol, _Period, 21)</code>：设置第一个参数，第二个参数省略，将使用默认值 <code>PRICE_CLOSE</code>。</li><li><code>iCustom(_Symbol, _Period)</code>：两个参数都省略，将分别使用默认值 <code>14</code> 和 <code>PRICE_CLOSE</code>。</li></ul><p>不能省略参数列表开头或中间的参数。</p><p>如果要创建的指标具有简短形式的 <code>OnCalculate</code> 函数，那么除了指标内部描述的输入变量列表之外，最后一个额外参数可以是用于构建指标的价格类型。这就如同指标属性对话框中的“应用于”下拉列表。此外，在这个额外参数中，还可以传递一个之前创建的另一个指标的句柄（见下面的示例）。在这种情况下，新创建的指标将使用指定句柄的第一个指标缓冲区进行计算。换句话说，程序员可以设置一个指标基于另一个指标进行计算。</p><p>MQL5 没有提供编程手段来确定特定的第三方指标是使用简短形式还是长形式的 <code>OnCalculate</code> 函数实现的，也就是说，无法确定通过 <code>iCustom</code> 创建时是否允许传递额外的句柄。此外，如果由额外句柄标识的指标有多个缓冲区，MQL5 也不允许选择缓冲区编号。</p><p>现在回到 <code>pathname</code> 参数。</p><p>路径是一个包含至少一个反斜杠 (<code>\\</code>) 或正斜杠 (<code>/</code>) 的字符串，这些字符在文件系统中用作文件夹和文件层次结构的分隔符。可以使用正斜杠或反斜杠，但反斜杠需要“转义”，即必须写两次。这是因为反斜杠是一个控制字符，可形成许多转义码，如制表符 (<code>\\t</code>)、换行符 (<code>\\n</code>) 等（见“字符类型”部分）。</p><p>如果路径以斜杠开头，则称为绝对路径，其根文件夹是所有 MQL5 源代码的目录。例如，在 <code>pathname</code> 参数中指定字符串 <code>&quot;/MyIndicator&quot;</code> 将搜索文件 <code>MQL5/MyIndicator.ex5</code>，而更长的路径 <code>&quot;/Exercise/MyIndicator&quot;</code> 目录将指向 <code>MQL5/Exercise/MyIndicator.ex5</code>。</p><p>如果 <code>pathname</code> 参数包含一个或多个斜杠，但不以斜杠开头，则该路径称为相对路径，因为它被认为是相对于两个预定义位置之一。首先，会相对于调用 MQL 程序所在的文件夹搜索指标文件。如果在那里找不到，搜索将继续在通用指标文件夹 <code>MQL5/Indicators</code> 内进行。</p><p>在包含斜杠的字符串中，最右边斜杠右侧的部分被视为文件名，而之前的部分描述文件夹层次结构。例如，路径 <code>&quot;Folder/SubFolder/Filename&quot;</code> 对应两个子文件夹：<code>Folder</code> 内的 <code>SubFolder</code>，以及 <code>SubFolder</code> 内的 <code>Filename</code> 文件。</p><p>最简单的情况是 <code>pathname</code> 不包含斜杠。这样它只指定文件名。同样会在上述两个搜索起始点的上下文中进行搜索。</p><p>例如，<code>MyExpert.ex5</code> 智能交易系统位于文件夹 <code>MQL5/Experts/Examples</code> 中，其中包含对 <code>iCustom(_Symbol, _Period, &quot;MyIndicator&quot;)</code> 的调用。这里相对路径为空，仅存在文件名。因此，指标搜索从文件夹 <code>MQL5/Experts/Examples/</code> 开始，查找名为 <code>MyIndicator</code> 的文件，即 <code>MQL5/Experts/Examples/MyIndicator.ex5</code>。如果在该目录中未找到此指标，搜索将继续在指标的根文件夹中进行，即通过连接路径和名称 <code>MQL5/Indicators/MyIndicator.ex5</code>。</p><p>如果在这两个位置都未找到指标，函数将返回 <code>INVALID_HANDLE</code>，并将错误代码 <code>4802</code>（<code>ERR_INDICATOR_CANNOT_CREATE</code>）设置给 <code>_LastError</code>。</p><p>更复杂的情况是，如果 <code>pathname</code> 不仅包含名称，还包含目录，例如 <code>&quot;TradeSignals/MyIndicator&quot;</code>。然后将指定的路径添加到调用程序的文件夹中，得到以下搜索目标：<code>MQL5/Experts/Examples/TradeSignals/MyIndicator.ex5</code>。如果失败，将相同的路径添加到 <code>MQL5/Indicators</code> 中，即搜索文件 <code>MQL5/Indicators/TradeSignals/MyIndicator.ex5</code>。请注意，如果使用反斜杠作为分隔符，不要忘记写两次，例如 <code>iCustom(_Symbol, _Period, &quot;TradeSignals\\\\MyIndicator&quot;)</code>。</p><p>要释放不再使用的指标所占用的计算机内存，可以使用 <code>IndicatorRelease</code> 函数，并将该指标的句柄作为参数传递给它。</p><p>特别需要注意测试使用指标的程序。如果 <code>iCustom</code> 调用中的 <code>pathname</code> 参数被指定为常量字符串，那么编译器会自动检测相应的所需指标，并将其与被测试的程序一起传递给测试器。否则，如果该参数是在表达式中计算得出的，或者是从外部获取的（例如通过用户输入），则必须在源代码中指定属性 <code>#property tester_indicator</code>：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property tester_indicator &quot;indicator_name.ex5&quot;</span></span></code></pre></div><p>这意味着在程序中只能测试之前已知的自定义指标。</p><p>考虑一个新指标 <code>UseWPR1.mq5</code> 的示例，它在其 <code>OnInit</code> 处理程序内部将创建上一章讨论的 <code>IndWPR</code> 指标的句柄（不要忘记编译 <code>IndWPR</code>，因为 <code>iCustom</code> 会加载 <code>.ex5</code> 文件）。在 <code>UseWPR1</code> 中获得的句柄目前暂未使用，因为我们只是研究这种可能性并检查是否成功。因此，在新指标中不需要缓冲区。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property indicator_separate_window</span></span>
<span class="line"><span>#property indicator_buffers 0</span></span>
<span class="line"><span>#property indicator_plots   0</span></span></code></pre></div><p>该指标将创建一个空的子窗口，但目前不会在其中显示任何内容。这是正常行为。</p><p>让我们检查几种获取描述符的选项，使用不同的 <code>pathname</code> 值：</p><ol><li>以斜杠开头的绝对路径，因此包含整个文件夹层次结构（从 <code>MQL5</code> 开始）以及第 5 章指标的示例，即 <code>&quot;/Indicators/MQL5Book/p5/IndWPR&quot;</code>。</li><li>仅使用名称 <code>&quot;IndWPR&quot;</code>，在调用指标 <code>UseWPR1.mq5</code> 所在的同一文件夹中进行搜索（两个指标都位于同一文件夹中）。</li><li>相对于标准目录 <code>MQL5/Indicators</code> 的指标示例的文件夹层次结构路径，即 <code>&quot;MQL5Book/p5/IndWPR&quot;</code>（注意开头没有斜杠）。</li><li>与第 2 点相同，仅使用名称，但针对不存在的指标 <code>&quot;IndWPR NonExistent&quot;</code>。</li><li>与第 1 点相同的绝对路径，但使用未转义的反斜杠，即 <code>&quot;\\Indicators\\MQL5Book\\p5\\IndWPR&quot;</code>。</li><li>完全复制第 2 点。</li></ol><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int handle1 = PRTF(iCustom(_Symbol, _Period, &quot;/Indicators/MQL5Book/p5/IndWPR&quot;));</span></span>
<span class="line"><span>   int handle2 = PRTF(iCustom(_Symbol, _Period, &quot;IndWPR&quot;));</span></span>
<span class="line"><span>   int handle3 = PRTF(iCustom(_Symbol, _Period, &quot;MQL5Book/p5/IndWPR&quot;));</span></span>
<span class="line"><span>   int handle4 = PRTF(iCustom(_Symbol, _Period, &quot;IndWPR NonExistent&quot;));</span></span>
<span class="line"><span>   int handle5 = PRTF(iCustom(_Symbol, _Period, &quot;\\Indicators\\MQL5Book\\p5\\IndWPR&quot;));</span></span>
<span class="line"><span>   int handle6 = PRTF(iCustom(_Symbol, _Period, &quot;IndWPR&quot;));</span></span>
<span class="line"><span>   return INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>由于句柄变量未被使用，它们被声明为局部变量。特别说明一下，虽然局部句柄变量在 <code>OnInit</code> 退出时会被删除，但这不会影响句柄本身：只要“父”指标 <code>UseWPR</code> 仍在执行，这些句柄就会继续存在。我们只是在代码中丢失了这些句柄的值，但这不是问题，因为它们在这里没有被使用。在我们后面将考虑的实际指标示例中，句柄当然会被存储（通常存储在全局变量中）并使用。</p><p>也不用担心资源泄漏问题：当从图表中删除 <code>UseWPR</code> 指标时，终端会自动清除它创建的所有句柄。使用 <code>IndicatorRelease</code> 删除指标实例的原理和显式释放句柄的必要性将在相关部分详细描述。</p><p>上述 <code>OnInit</code> 代码会生成以下日志条目：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>iCustom(_Symbol,_Period,/Indicators/MQL5Book/p5/IndWPR)=10 / ok</span></span>
<span class="line"><span>iCustom(_Symbol,_Period,IndWPR)=11 / ok</span></span>
<span class="line"><span>iCustom(_Symbol,_Period,MQL5Book/p5/IndWPR)=12 / ok</span></span>
<span class="line"><span>cannot load custom indicator &#39;IndWPR NonExistent&#39; [4802]</span></span>
<span class="line"><span>iCustom(_Symbol,_Period,IndWPR NonExistent)=-1 / INDICATOR_CANNOT_CREATE(4802)</span></span>
<span class="line"><span>iCustom(_Symbol,_Period,\\Indicators\\MQL5Book\\p5\\IndWPR)=13 / ok</span></span>
<span class="line"><span>iCustom(_Symbol,_Period,IndWPR)=11 / ok</span></span></code></pre></div><p>正如我们所见，除了第 4 种情况（调用的指标不存在）之外，在所有情况下都获得了有意义的句柄 <code>10</code>、<code>11</code>、<code>12</code> 和 <code>13</code>。句柄的值为 <code>-1</code>（<code>INVALID_HANDLE</code>）。</p><p>还需注意，第 5 行在编译时会生成几个“未识别的字符转义序列”警告。这是因为我们没有对反斜杠进行转义。而且我们很幸运该指令执行成功了，因为如果任何文件夹或文件的名称以支持的转义序列中的某个字母开头，那么该序列的解释将破坏对名称的预期读取。例如，如果我们在同一文件夹中有一个名为 <code>&quot;test&quot;</code> 的指标，并尝试通过路径 <code>&quot;MQL5Book\\p5\\test&quot;</code> 创建它，我们将得到 <code>INVALID_HANDLE</code> 和错误 <code>4802</code>。这是因为 <code>\\t</code> 是制表符，所以终端会查找 <code>&quot;MQL5Book\\p5&lt;nbsp&gt; est&quot;</code>。正确的写法应该是 <code>&quot;MQL5Book\\\\p5\\\\test&quot;</code>。因此，使用正斜杠会更方便。</p><p>同样重要的是要注意，尽管所有成功的变体都指向同一个指标 <code>MQL5/Indicators/MQL5Book/p5/IndWPR.ex5</code>，并且实际上路径 1、2、3 和 5 是等效的，但终端将它们视为不同的字符串，这就是为什么我们得到不同的描述符值。只有选项 6 完全复制了选项 2，返回了相同的描述符 <code>11</code>。</p><p>为什么句柄编号从 <code>10</code> 开始？较小的值是为系统保留的。如前所述，对于具有简短形式 <code>OnCalculate</code> 函数的指标，最后一个参数可用于传递价格类型或另一个指标的句柄，该指标的缓冲区将用于计算新创建的实例。由于 <code>ENUM_APPLIED_PRICE</code> 枚举的元素有自己的常量值，它们占据了小于 <code>10</code> 的范围。更多详细信息请参阅“定义指标的数据源”。</p><p>在下一个 <code>UseWPR2.mq5</code> 示例中，我们将实现一个指标，它将创建 <code>IndWPR</code> 的一个实例，并使用句柄检查其计算进度。但为此，你需要熟悉新函数 <code>BarsCalculated</code>。</p><h2 id="计算柱线数量检查-barscalculated" tabindex="-1">计算柱线数量检查：BarsCalculated <a class="header-anchor" href="#计算柱线数量检查-barscalculated" aria-label="Permalink to &quot;计算柱线数量检查：BarsCalculated&quot;">​</a></h2><p>当我们通过调用 <code>iCustom</code> 或本章后续会介绍的其他函数来创建第三方指标时，计算需要花费一些时间。我们知道，指标数据准备就绪的主要衡量标准是已计算的柱线数量，这一数量由指标的 <code>OnCalculate</code> 函数返回。有了指标句柄，我们就能得知这个数量。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int BarsCalculated(int handle)</span></span></code></pre></div><p>该函数会返回由 <code>handle</code> 指定的指标中已计算数据的柱线数量。若出现错误，则返回 -1。</p><p>在数据尚未计算完成时，结果为 0。之后，应将这个数值与时间序列的大小（例如，若调用指标在其自身的 <code>OnCalculate</code> 函数上下文中检查 <code>BarsCalculated</code>，则与 <code>rates_total</code> 进行比较）进行对比，以分析该指标对新柱线的处理情况。</p><p>在 <code>UseWPR2.mq5</code> 指标中，我们将尝试创建 <code>IndWPR</code> 指标，同时在输入参数中更改威廉指标（WPR）的周期。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input int WPRPeriod = 0;</span></span></code></pre></div><p>其默认值为 0，这是一个无效值。故意设置这个值是为了演示异常情况。回顾一下，在原始的 <code>IndWPR.mq5</code> 代码中，<code>OnInit</code> 和 <code>OnCalculate</code> 函数里都有相应的检查。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// IndWPR.mq5</span></span>
<span class="line"><span>void OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(WPRPeriod &lt; 1)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Alert(StringFormat(&quot;Incorrect Period value (%d). Should be 1 or larger&quot;,</span></span>
<span class="line"><span>         WPRPeriod));</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int OnCalculate(ON_CALCULATE_STD_FULL_PARAM_LIST)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(rates_total &lt; WPRPeriod || WPRPeriod &lt; 1) return 0;</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>因此，当周期为 0 时，我们应该会收到一条错误消息，并且 <code>BarsCalculated</code> 应该始终返回 0。在我们输入一个正的周期值后，辅助指标应该会开始正常计算（考虑到威廉指标计算的简易性，几乎会立即开始计算），并且 <code>BarsCalculated</code> 应该返回柱线的总数。</p><p>现在，让我们来看一下 <code>UseWPR2.mq5</code> 中创建句柄的源代码。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// UseWPR2.mq5</span></span>
<span class="line"><span>int handle; // 全局变量句柄</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 传递名称和参数</span></span>
<span class="line"><span>   handle = PRTF(iCustom(_Symbol, _Period, &quot;IndWPR&quot;, WPRPeriod));</span></span>
<span class="line"><span>   // 此处接下来的检查并无实际用处，因为你必须等待</span></span>
<span class="line"><span>   // 指标加载、运行并完成计算</span></span>
<span class="line"><span>   // （此处仅用于演示目的）</span></span>
<span class="line"><span>   PRTF(BarsCalculated(handle));</span></span>
<span class="line"><span>   // 初始化是否成功取决于描述符</span></span>
<span class="line"><span>   return handle == INVALID_HANDLE ? INIT_FAILED : INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在 <code>OnCalculate</code> 函数中，我们只需记录 <code>BarsCalculated</code> 和 <code>rates_total</code> 的值。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnCalculate(const int rates_total,</span></span>
<span class="line"><span>                const int prev_calculated,</span></span>
<span class="line"><span>                const int begin,</span></span>
<span class="line"><span>                const double &amp;data[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 等待从属指标在所有柱线上完成计算</span></span>
<span class="line"><span>   if(PRTF(BarsCalculated(handle)) != PRTF(rates_total))</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return prev_calculated;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // ... 此处通常是使用句柄进行的后续操作</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   return rates_total;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行 <code>UseWPR2</code>，首先使用参数 0，然后使用某个有效数值，例如 21。以下是周期为 0 时的日志记录。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>iCustom(_Symbol,_Period,IndWPR,WPRPeriod)=10 / ok</span></span>
<span class="line"><span>BarsCalculated(handle)=-1 / INDICATOR_DATA_NOT_FOUND(4806)</span></span>
<span class="line"><span>Alert: Incorrect Period value (0). Should be 1 or larger</span></span>
<span class="line"><span>BarsCalculated(handle)=0 / ok</span></span>
<span class="line"><span>rates_total=20000 / ok</span></span>
<span class="line"><span>...</span></span></code></pre></div><p>在创建句柄后，数据尚未可用，因此会显示 <code>INDICATOR_DATA_NOT_FOUND(4806)</code> 错误，并且 <code>BarsCalculated</code> 的结果等于 -1。随后会有一条关于输入参数不正确的通知，这证实了 <code>IndWPR</code> 指标已成功加载并启动。在后续部分，我们得到的 <code>BarsCalculated</code> 值等于 0。</p><p>为了让指标进行计算，我们需要输入正确的输入参数。在这种情况下，<code>BarsCalculated</code> 等于 <code>rates_total</code>。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>iCustom(_Symbol,_Period,IndWPR,WPRPeriod)=10 / ok</span></span>
<span class="line"><span>BarsCalculated(handle)=-1 / INDICATOR_DATA_NOT_FOUND(4806)</span></span>
<span class="line"><span>BarsCalculated(handle)=20000 / ok</span></span>
<span class="line"><span>rates_total=20000 / ok</span></span>
<span class="line"><span>...</span></span></code></pre></div><p>在我们掌握了检查从属指标是否准备就绪的方法后，就可以开始读取其数据了。让我们在下一个示例 <code>UseWPR3.mq5</code> 中进行这一操作，在那里我们将了解 <code>CopyBuffer</code> 函数。</p><h2 id="从指标中获取时间序列数据-copybuffer" tabindex="-1">从指标中获取时间序列数据：CopyBuffer <a class="header-anchor" href="#从指标中获取时间序列数据-copybuffer" aria-label="Permalink to &quot;从指标中获取时间序列数据：CopyBuffer&quot;">​</a></h2><p>一个MQL程序可以通过指标的句柄从其公共缓冲区中读取数据。回想一下，在自定义指标中，这些缓冲区是在源代码中通过SetIndexBuffer函数调用指定的数组。</p><p>MQL5 API提供了用于读取缓冲区的CopyBuffer函数，该函数有三种形式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int CopyBuffer(int handle, int buffer, int offset, int count, double &amp;array[])</span></span>
<span class="line"><span>int CopyBuffer(int handle, int buffer, datetime start, int count, double &amp;array[])</span></span>
<span class="line"><span>int CopyBuffer(int handle, int buffer, datetime start, datetime stop, double &amp;array[])</span></span></code></pre></div><p>handle参数指定从iCustom或其他函数调用中获得的句柄（更多详细信息，请参阅有关IndicatorCreate和内置指标的部分）。buffer参数设置要从中请求数据的指标缓冲区的索引，编号从0开始。</p><p>请求的时间序列的接收元素会进入通过引用设置的数组中。</p><p>该函数的三种变体的区别在于指定时间戳范围（起始/结束）或获取数据的柱线数量（偏移量）和数量（计数）的方式。使用这些参数的基本原理与我们在“用于获取报价数组的复制函数概述”中所学的完全一致。特别是，偏移量和计数中复制数据的元素是从当前向过去计数的，也就是说，起始位置等于0表示当前柱线。接收数组中的元素在物理上是按从过去到现在的顺序排列的（但是，在逻辑层面上可以使用ArraySetAsSeries来反转这种寻址方式）。</p><p>CopyBuffer是用于读取内置时间序列的函数（如CopyOpen、CopyClose等）的类似函数。主要区别在于，带报价的时间序列是由终端本身生成的，而指标缓冲区中的时间序列是由自定义或内置指标计算得出的。此外，对于指标，我们会在诸如iCustom这样的句柄创建函数中提前设置特定的交易品种和时间框架对，以定义和识别时间序列，而在CopyBuffer中，这些信息是通过句柄间接传递的。</p><p>当复制未知数量的数据作为目标数组时，最好使用动态数组。在这种情况下，CopyBuffer函数将根据复制数据的大小来分配接收数组的大小。如果需要重复复制已知数量的数据，那么最好在静态分配的缓冲区（带有static修饰符的局部缓冲区或全局上下文中的固定大小缓冲区）中进行，以避免重复的内存分配。</p><p>如果接收数组是一个指标缓冲区（之前通过SetIndexBufer函数在系统中注册的数组），那么时间序列和接收缓冲区中的索引是相同的（前提是请求的是相同的交易品种/时间框架对）。在这种情况下，很容易实现对接收缓冲区的部分填充（特别是，这用于更新最后几根柱线，见下面的示例）。如果请求的时间序列的交易品种或时间框架与当前图表的交易品种和/或时间框架不匹配，该函数返回的元素数量将不会超过源和目标中最小的柱线数量。</p><p>如果作为数组参数传递的是一个普通数组（不是缓冲区），那么该函数将从第一个元素开始填充它，对于动态数组是全部填充，对于静态数组（如果大小有剩余）则是部分填充。因此，如果需要将指标值部分复制到另一个数组的任意位置，那么为此需要使用一个中间数组，将所需数量的元素复制到该数组中，然后再从那里将它们传输到最终目标。</p><p>该函数返回复制的元素数量，如果发生错误（包括暂时没有准备好的数据）则返回-1。</p><p>由于指标通常直接或间接依赖于价格时间序列，其计算不会早于报价同步的时间开始。因此，应该考虑终端中时间序列组织和存储的技术特点，并做好请求的数据不会立即出现的准备。特别是，我们可能会收到0个或少于请求数量的数据。所有这些情况都应该根据具体情况进行处理，例如等待构建或向用户报告问题。</p><p>如果请求的时间序列尚未构建，或者需要从服务器下载，那么该函数的行为将根据调用它的MQL程序的类型而有所不同。</p><p>当从指标请求尚未准备好的数据时，该函数将立即返回-1，但会启动加载和构建时间序列的过程。</p><p>当从智能交易系统或脚本请求数据时，如果数据可以从本地历史记录中构建，则会启动从服务器的下载和/或开始构建所需的时间序列。该函数将返回在为同步执行该函数分配的超时时间（45秒）内准备好的数据量（调用代码会等待该函数完成）。</p><p>请注意，CopyBuffer函数可以从缓冲区中读取数据，而不管其操作模式是INDICATOR_DATA、INDICATOR_COLOR_INDEX还是INDICATOR_CALCULATIONS，后两者对用户是隐藏的。</p><p>同样重要的是要注意，可以在被调用的指标中使用属性PLOT_SHIFT设置时间序列的偏移量，这会影响使用CopyBuffer读取数据的偏移量。例如，如果指标线向未来偏移了N根柱线，那么在CopyBuffer（第一种形式）的参数中，必须给出等于（-N）的偏移量，也就是带负号的，因为当前时间序列柱线的索引为0，而未来带偏移的柱线的索引每根柱线减少1。特别是，在Gator指标中会出现这种情况，因为它的零图表向前偏移了TeethShift参数的值，而第一个图表偏移了LipsShift参数的值。应该根据其中较大的值进行修正。我们将在“从有偏移的图表中读取数据”部分看到一个示例。</p><p>MQL5没有提供编程工具来查找第三方指标的PLOT_SHIFT属性。因此，如果有必要，你将不得不通过输入变量向用户请求此信息。</p><p>我们将在关于智能交易系统的章节中从智能交易系统代码中使用CopyBuffer，但目前我们只限于指标方面的使用。</p><p>让我们继续开发一个辅助指标IndWPR的示例。这次在版本UseWPR3.mq5中，我们将提供一个指标缓冲区，并使用CopyBuffer用来自IndWPR的数据填充它。为此，我们将应用带有缓冲区数量和渲染设置的指令。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property indicator_separate_window</span></span>
<span class="line"><span>#property indicator_buffers 1</span></span>
<span class="line"><span>#property indicator_plots   1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#property indicator_type1   DRAW_LINE</span></span>
<span class="line"><span>#property indicator_color1  clrBlue</span></span>
<span class="line"><span>#property indicator_width1  1</span></span>
<span class="line"><span>#property indicator_label1  &quot;WPR&quot;</span></span></code></pre></div><p>在全局上下文中，我们描述了带有WPR周期的输入参数、一个用于缓冲区的数组以及一个带有描述符的变量。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input int WPRPeriod = 14;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>double WPRBuffer[];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int handle;</span></span></code></pre></div><p>OnInit处理程序实际上没有变化：只是添加了SetIndexBuffer调用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   SetIndexBuffer(0, WPRBuffer);</span></span>
<span class="line"><span>   handle = iCustom(_Symbol, _Period, &quot;IndWPR&quot;, WPRPeriod);</span></span>
<span class="line"><span>   return handle == INVALID_HANDLE ? INIT_FAILED : INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在OnCalculate中，我们将复制数据而不进行转换。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnCalculate(const int rates_total,</span></span>
<span class="line"><span>                const int prev_calculated,</span></span>
<span class="line"><span>                const int begin,</span></span>
<span class="line"><span>                const double &amp;data[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 等待所有柱线的计算准备好</span></span>
<span class="line"><span>   if(BarsCalculated(Handle) != rates_total)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return prev_calculated;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   // 将从属指标的整个时间序列或新柱线的数据复制到我们的缓冲区</span></span>
<span class="line"><span>   const int n = CopyBuffer(handle, 0, 0, rates_total - prev_calculated + 1, WPRBuffer);</span></span>
<span class="line"><span>   // 如果没有错误，我们的数据对于所有柱线rates_total都已准备好</span></span>
<span class="line"><span>   return n &gt; -1 ? rates_total : 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>通过编译和运行UseWPR3，我们实际上将得到原始WPR的一个副本，但不包括水平调整、数字精度和标题。这对于测试该机制已经足够了，但通常基于一个或多个辅助指标的新指标会提供一些自己的想法和对数据的转换。因此，我们将开发另一个指标，该指标生成买入和卖出交易信号（从交易的角度来看，它们不应被视为一个模型，因为这只是一个编程任务）。该指标的思路如下图所示。</p><p>指标IndWPR、IndTripleEMA、IndFractals</p><p>指标IndWPR、IndTripleEMA、IndFractals</p><p>我们分别将WPR从超买和超卖区域的退出作为卖出和买入的建议。为了使信号不响应随机波动，我们对WPR应用三重移动平均线，并检查其值是否穿过上下区域的边界。</p><p>作为这些信号的过滤器，我们将检查在此之前的最后一个分形是什么：顶部的分形意味着价格向下反转并确认卖出，而底部的分形意味着向上反转，因此支持买入。分形会在滞后一定数量的柱线后出现，该数量等于分形的阶数。</p><p>新指标在文件UseWPRFractals.mq5中可用。</p><p>我们需要三个缓冲区：两个信号缓冲区和一个用于过滤器的缓冲区。我们本可以以INDICATOR_CALCULATIONS模式发出后者。相反，我们将使其成为标准的INDICATOR_DATA模式，但使用DRAW_NONE样式——这样它不会在图表上造成干扰，但其值将在数据窗口中可见。</p><p>信号将显示在主图表上（默认在收盘价处），所以我们使用指令indicator_chart_window。我们仍然可以调用在单独窗口中绘制的WPR类型的指标，因为所有从属指标都可以在不进行可视化的情况下进行计算。如果需要，我们可以绘制它们，但我们将在关于图表的章节中讨论这一点（请参阅ChartIndicatorAdd）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property indicator_chart_window</span></span>
<span class="line"><span>#property indicator_buffers 3</span></span>
<span class="line"><span>#property indicator_plots   3</span></span>
<span class="line"><span>// 缓冲区绘制设置</span></span>
<span class="line"><span>#property indicator_type1   DRAW_ARROW</span></span>
<span class="line"><span>#property indicator_color1  clrRed</span></span>
<span class="line"><span>#property indicator_width1  1</span></span>
<span class="line"><span>#property indicator_label1  &quot;Sell&quot;</span></span>
<span class="line"><span>#property indicator_type2   DRAW_ARROW</span></span>
<span class="line"><span>#property indicator_color2  clrBlue</span></span>
<span class="line"><span>#property indicator_width2  1</span></span>
<span class="line"><span>#property indicator_label2  &quot;Buy&quot;</span></span>
<span class="line"><span>#property indicator_type3   DRAW_NONE</span></span>
<span class="line"><span>#property indicator_color3  clrGreen</span></span>
<span class="line"><span>#property indicator_width3  1</span></span>
<span class="line"><span>#property indicator_label3  &quot;Filter&quot;</span></span></code></pre></div><p>在输入变量中，我们将提供指定WPR周期、平均（平滑）周期和分形阶数的能力。这些是从属指标的参数。此外，我们引入偏移变量，该变量表示将分析信号的柱线编号。值0（默认值）表示当前柱线并以tick模式进行分析（注意：最后一根柱线上的信号可能会重绘；一些交易者不喜欢这样）。如果我们将偏移量设置为1，我们将分析已经形成的柱线，并且这样的信号不会改变。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input int PeriodWPR = 11;</span></span>
<span class="line"><span>input int PeriodEMA = 5;</span></span>
<span class="line"><span>input int FractalOrder = 1;</span></span>
<span class="line"><span>input int Offset = 0;</span></span>
<span class="line"><span>input double Threshold = 0.2;</span></span></code></pre></div><p>Threshold变量将超买和超卖区域的大小定义为±1.0的分数（在每个方向上）。例如，如果你遵循经典的WPR设置，在从0到-100的刻度上，水平为-20和-80，那么Threshold应该等于0.4。</p><p>为指标缓冲区提供以下数组。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>double UpBuffer[];   // 上信号表示超买，即卖出</span></span>
<span class="line"><span>double DownBuffer[]; // 下信号表示超卖，即买入</span></span>
<span class="line"><span>double filter[];     // 分形过滤器方向 +1（向上/买入），-1（向下/卖出）</span></span></code></pre></div><p>指标句柄将保存在全局变量中。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int handleWPR, handleEMA3, handleFractals;</span></span></code></pre></div><p>我们将像往常一样在OnInit中执行所有设置。由于CopyBuffer函数使用从当前到过去的索引，为了统一读取数据，我们为所有数组设置“series”标志（ArraySetAsSeries）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 绑定缓冲区</span></span>
<span class="line"><span>   SetIndexBuffer(0, UpBuffer);</span></span>
<span class="line"><span>   SetIndexBuffer(1, DownBuffer);</span></span>
<span class="line"><span>   SetIndexBuffer(2, Filter, INDICATOR_DATA); // 版本：INDICATOR_CALCULATIONS</span></span>
<span class="line"><span>   ArraySetAsSeries(UpBuffer, true);</span></span>
<span class="line"><span>   ArraySetAsSeries(DownBuffer, true);</span></span>
<span class="line"><span>   ArraySetAsSeries(Filter, true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   // 箭头信号</span></span>
<span class="line"><span>   PlotIndexSetInteger(0, PLOT_ARROW, 234);</span></span>
<span class="line"><span>   PlotIndexSetInteger(1, PLOT_ARROW, 233);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   // 从属指标</span></span>
<span class="line"><span>   handleWPR = iCustom(_Symbol, _Period, &quot;IndWPR&quot;, PeriodWPR);</span></span>
<span class="line"><span>   handleEMA3 = iCustom(_Symbol, _Period, &quot;IndTripleEMA&quot;, PeriodEMA, 0, handleWPR);</span></span>
<span class="line"><span>   handleFractals = iCustom(_Symbol, _Period, &quot;IndFractals&quot;, FractalOrder);</span></span>
<span class="line"><span>   if(handleWPR == INVALID_HANDLE</span></span>
<span class="line"><span>   || handleEMA3 == INVALID_HANDLE</span></span>
<span class="line"><span>   || handleFractals == INVALID_HANDLE)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return INIT_FAILED;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   return INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在iCustom调用中，应该注意handleEMA3是如何创建的。由于这个平均值是要基于WPR进行计算的，我们将handleWPR（在前一个iCustom调用中获得）作为最后一个参数传递，在指标IndTripleEMA的实际参数之后。这样做时，我们必须指定IndTripleEMA的完整输入参数列表（其中的参数是int InpPeriodEMA和BEGIN_POLICY InpHandleBegin；我们使用第二个参数来研究跳过初始柱线的情况，现在不需要它，但我们必须传递它，所以我们就将其设置为0）。如果我们在调用中因为在当前应用上下文中无关紧要而省略了第二个参数，那么传递的handleWPR句柄将在被调用的指标中被解释为InpHandleBegin。结果，IndTripleEMA将应用于常规收盘价。</p><p>当我们不需要传递额外的句柄时，iCustom调用的语法允许我们省略任意数量的最后参数，此时它们将从源代码中获取默认值。</p><p>在OnCalculate处理程序中，我们等待WPR指标和分形准备好，然后使用辅助函数MarkSignals为整个历史或最后一根柱线计算信号。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnCalculate(const int rates_total,</span></span>
<span class="line"><span>                const int prev_calculated,</span></span>
<span class="line"><span>                const int begin,</span></span>
<span class="line"><span>                const double &amp;data[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(BarsCalculated(handleEMA3) != rates_total</span></span>
<span class="line"><span>   || BarsCalculated(handleFractals) != rates_total)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return prev_calculated;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   ArraySetAsSeries(data, true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if(prev_calculated == 0) // 首次启动</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ArrayInitialize(UpBuffer, EMPTY_VALUE);</span></span>
<span class="line"><span>      ArrayInitialize(DownBuffer, EMPTY_VALUE);</span></span>
<span class="line"><span>      ArrayInitialize(Filter, 0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 在整个历史中寻找信号</span></span>
<span class="line"><span>      for(int i = rates_total - FractalOrder - 1; i &gt;= 0; --i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         MarkSignals(i, Offset, data);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   else // 在线</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      for(int i = 0; i &lt; rates_total - prev_calculated; ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         UpBuffer[i] = EMPTY_VALUE;</span></span>
<span class="line"><span>         DownBuffer[i] = EMPTY_VALUE;</span></span>
<span class="line"><span>         Filter[i] = 0;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 在新柱线或每个tick上寻找信号（如果Offset == 0）</span></span>
<span class="line"><span>      if(rates_total != prev_calculated</span></span>
<span class="line"><span>      || Offset == 0)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         MarkSignals(0, Offset, data);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   return rates_total;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们主要感兴趣的是隐藏在MarkSignals中的CopyBuffer函数的使用。平滑后的WPR值将被读取到wpr[2]数组中，分形将被读取到peaks[1]和hollows[1]中。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int MarkSignals(const int bar, const int offset, const double &amp;data[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   double wpr[2];</span></span>
<span class="line"><span>   double peaks[1], hollows[1];</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>然后我们使用三个CopyBuffer调用来填充局部数组。请注意，我们不需要直接读取IndWPR，因为它在IndTripleEMA的计算中被使用。我们通过handleEMA3句柄将数据读取到wpr数组中。同样重要的是，分形指标中有2个缓冲区，因此CopyBuffer函数会分别针对数组peaks和hollows使用不同的索引0和1调用两次。分形数组是在偏移FractalOrder的情况下读取的，因为分形只能在左右两侧有一定数量柱线的柱线上形成。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   if(CopyBuffer(handleEMA3, 0, bar + offset, 2, wpr) == 2</span></span>
<span class="line"><span>   &amp;&amp; CopyBuffer(handleFractals, 0, bar + offset + FractalOrder, 1, peaks) == 1</span></span>
<span class="line"><span>   &amp;&amp; CopyBuffer(handleFractals, 1, bar + offset + FractalOrder, 1, hollows) == 1)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ...</span></span></code></pre></div><p>接下来，我们从缓冲区Filter的前一根柱线获取过滤器的先前方向（在历史开始时为0，但当出现向上或向下的分形时，我们会在那里写入+1或-1，这可以在下面的源代码中看到），并在检测到任何新分形时相应地更改它。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>      int filterdirection = (int)Filter[bar + 1];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 最后一个分形设置反转走势</span></span>
<span class="line"><span>      if(peaks[0] != EMPTY_VALUE)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         filterdirection = -1; // 卖出</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if(hollows[0] != EMPTY_VALUE)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         filterdirection = +1; // 买入</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      Filter[bar] = filterdirection; // 记住当前方向</span></span></code></pre></div><p>最后，我们考虑到Threshold中指定的区域宽度，分析平滑后的WPR从上部或下部区域到中间区域的转换。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>      // 将2个WPR值转换到范围[-1,+1]</span></span>
<span class="line"><span>      const double</span></span>
<span class="line"><span>        const double old = (wpr[0] + 50) / 50;     // +1.0 -1.0</span></span>
<span class="line"><span>      const double last = (wpr[1] + 50) / 50;    // +1.0 -1.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 从顶部向下反弹</span></span>
<span class="line"><span>      if(filterdirection == -1</span></span>
<span class="line"><span>      &amp;&amp; old &gt;= 1.0 - Threshold &amp;&amp; last &lt;= 1.0 - Threshold)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         UpBuffer[bar] = data[bar];</span></span>
<span class="line"><span>         return -1; // 卖出</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 从底部向上反弹</span></span>
<span class="line"><span>      if(filterdirection == +1</span></span>
<span class="line"><span>      &amp;&amp; old &lt;= -1.0 + Threshold &amp;&amp; last &gt;= -1.0 + Threshold)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         DownBuffer[bar] = data[bar];</span></span>
<span class="line"><span>         return +1; // 买入</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   return 0; // 无信号</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="对多个交易品种和时间框架的支持" tabindex="-1">对多个交易品种和时间框架的支持 <a class="header-anchor" href="#对多个交易品种和时间框架的支持" aria-label="Permalink to &quot;对多个交易品种和时间框架的支持&quot;">​</a></h2><p>到目前为止，在所有的指标示例中，我们创建的描述符都与当前图表上的交易品种和时间框架相同。然而，实际上并没有这样的限制。我们可以在任何交易品种和时间框架上创建辅助指标。当然，在这种情况下，就像我们之前所做的那样，例如通过定时器，我们需要等待第三方时间序列准备就绪。</p><p>让我们实现一个多时间框架的威廉指标（WPR）（请参阅文件 <code>UseWPRMTF.mq5</code>），它也可以被设置为在任意一个交易品种（非当前图表上的交易品种）上进行计算。</p><p>我们将显示来自 <code>ENUM_TIMEFRAMES</code> 枚举中所有标准时间框架的给定周期的 WPR 值。时间框架的数量是 21 个，所以该指标将始终显示在最后 21 根柱线上。最右边的第 0 根柱线将包含 M1 时间框架的 WPR 值，下一根柱线将包含 M2 时间框架的 WPR 值，以此类推，直到第 20 根柱线包含月线时间框架的 WPR 值。为了便于阅读，我们将用不同颜色为图表曲线上色：分钟时间框架用红色，小时时间框架用绿色，日线及更大时间框架用蓝色。</p><p>由于可以在指标中设置工作交易品种，并且可以在同一图表上为不同交易品种创建多个副本，我们将选择 <code>DRAW_ARROW</code> 绘图样式，并提供一个输入参数来指定交易品种。通过这种方式，就可以区分不同交易品种的指标指示。上色需要额外的缓冲区。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property indicator_separate_window</span></span>
<span class="line"><span>#property indicator_buffers 2</span></span>
<span class="line"><span>#property indicator_plots   1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#property indicator_type1   DRAW_COLOR_ARROW</span></span>
<span class="line"><span>#property indicator_color1  clrRed,clrGreen,clrBlue</span></span>
<span class="line"><span>#property indicator_width1  3</span></span>
<span class="line"><span>#property indicator_label1  &quot;WPR&quot;</span></span></code></pre></div><p>WPR 值被转换到范围 <code>[-1, +1]</code> 内。让我们选择子窗口的刻度范围，使其比该范围略大一些。值为 <code>±0.6</code> 的水平位对应于 WPR 转换前的标准值 <code>-20</code> 和 <code>-80</code>。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property indicator_maximum    +1.2</span></span>
<span class="line"><span>#property indicator_minimum    -1.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#property indicator_level1     +0.6</span></span>
<span class="line"><span>#property indicator_level2     -0.6</span></span>
<span class="line"><span>#property indicator_levelstyle STYLE_DOT</span></span>
<span class="line"><span>#property indicator_levelcolor clrSilver</span></span>
<span class="line"><span>#property indicator_levelwidth 1</span></span></code></pre></div><p>在输入变量中：WPR 周期、工作交易品种和显示箭头的代码。当交易品种留空时，将使用当前图表的交易品种。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input int WPRPeriod = 14;</span></span>
<span class="line"><span>input string WorkSymbol = &quot;&quot;; // 交易品种</span></span>
<span class="line"><span>input int Mark = 0;</span></span></code></pre></div><p>为了方便编码，时间框架的集合列在数组 <code>TF</code> 中。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#define TFS 21</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ENUM_TIMEFRAMES TF[TFS] =</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   PERIOD_M1,</span></span>
<span class="line"><span>   PERIOD_M2,</span></span>
<span class="line"><span>   PERIOD_M3,</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>   PERIOD_D1,</span></span>
<span class="line"><span>   PERIOD_W1,</span></span>
<span class="line"><span>   PERIOD_MN1,</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>每个时间框架的指标描述符存储在数组 <code>Handle</code> 中。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int Handle[TFS];</span></span></code></pre></div><p>我们将在 <code>OnInit</code> 函数中配置指标缓冲区并获取句柄。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>double WPRBuffer[];</span></span>
<span class="line"><span>double Colors[];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   SetIndexBuffer(0, WPRBuffer);</span></span>
<span class="line"><span>   SetIndexBuffer(1, Colors, INDICATOR_COLOR_INDEX);</span></span>
<span class="line"><span>   ArraySetAsSeries(WPRBuffer, true);</span></span>
<span class="line"><span>   ArraySetAsSeries(Colors, true);</span></span>
<span class="line"><span>   PlotIndexSetString(0, PLOT_LABEL, _WorkSymbol + &quot; WPR&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if(Mark != 0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      PlotIndexSetInteger(0, PLOT_ARROW, Mark);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   for(int i = 0; i &lt; TFS; ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Handle[i] = iCustom(_WorkSymbol, TF[i], &quot;IndWPR&quot;, WPRPeriod);</span></span>
<span class="line"><span>      if(Handle[i] == INVALID_HANDLE) return INIT_FAILED;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   IndicatorSetInteger(INDICATOR_DIGITS, 2);</span></span>
<span class="line"><span>   IndicatorSetString(INDICATOR_SHORTNAME,</span></span>
<span class="line"><span>      &quot;%Rmtf&quot; + &quot;(&quot; + _WorkSymbol + &quot;/&quot; + (string)WPRPeriod + &quot;)&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   return INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>OnCalculate</code> 函数中的计算按照常规方案进行：等待数据准备就绪、初始化、在新柱线上填充数据。辅助函数 <code>IsDataReady</code> 和 <code>FillData</code> 对描述符进行直接操作（如下所示）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnCalculate(const int rates_total,</span></span>
<span class="line"><span>                const int prev_calculated,</span></span>
<span class="line"><span>                const int begin,</span></span>
<span class="line"><span>                const double &amp;data[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 等待从属指标准备就绪</span></span>
<span class="line"><span>   if(!IsDataReady())</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      EventSetTimer(1); // 如果未准备好，推迟计算</span></span>
<span class="line"><span>      return prev_calculated;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   if(prev_calculated == 0) // 初始化</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ArrayInitialize(WPRBuffer, EMPTY_VALUE);</span></span>
<span class="line"><span>      ArrayInitialize(Colors, EMPTY_VALUE);</span></span>
<span class="line"><span>      // 为最后 TFS 根柱线设置固定颜色</span></span>
<span class="line"><span>      for(int i = 0; i &lt; TFS; ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         Colors[i] = i &lt; 11? 0 : (i &lt; 18? 1 : 2);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   else // 准备新柱线</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      for(int i = prev_calculated; i &lt; rates_total; ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         WPRBuffer[i] = EMPTY_VALUE;</span></span>
<span class="line"><span>         Colors[i] = 0;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if(prev_calculated != rates_total) // 新柱线</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      // 清除移动到 TFS 根柱线左侧最旧柱线上的标签</span></span>
<span class="line"><span>      WPRBuffer[TFS] = EMPTY_VALUE;</span></span>
<span class="line"><span>      // 更新柱线颜色</span></span>
<span class="line"><span>      for(int i = 0; i &lt; TFS; ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         Colors[i] = i &lt; 11? 0 : (i &lt; 18? 1 : 2);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   // 将数据从从属指标复制到我们的缓冲区</span></span>
<span class="line"><span>   FillData();</span></span>
<span class="line"><span>   return rates_total;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如有必要，我们通过定时器启动重新计算。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnTimer()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ChartSetSymbolPeriod(0, _Symbol, _Period);</span></span>
<span class="line"><span>   EventKillTimer();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>以下是函数 <code>IsDataReady</code> 和 <code>FillData</code>。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool IsDataReady()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   for(int i = 0; i &lt; TFS; ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(BarsCalculated(Handle[i]) != iBars(_WorkSymbol, TF[i]))</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         Print(&quot;Waiting for &quot;, _WorkSymbol, &quot; &quot;, EnumToString(TF[i]));</span></span>
<span class="line"><span>         return false;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   return true;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void FillData()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   for(int i = 0; i &lt; TFS; ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      double data[1];</span></span>
<span class="line"><span>      // 获取最后一个实际值（缓冲区 0，索引 0）</span></span>
<span class="line"><span>      if(CopyBuffer(Handle[i], 0, 0, 1, data) == 1)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         WPRBuffer[i] = (data[0] + 50) / 50;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>让我们编译该指标并查看它在图表上的显示情况。例如，让我们为欧元兑美元（EURUSD）、美元兑俄罗斯卢布（USDRUB）和黄金（XAUUSD）创建三个副本。</p><p>不同工作交易品种的三个多时间框架 WPR 指标实例</p><p>不同工作交易品种的三个多时间框架 WPR 指标实例</p><p>在第一次计算时，该指标可能需要相当长的时间来为所有时间框架准备时间序列。</p><p>在计算部分，完全相同的指标 <code>UseWPRMTFDashboard.mq5</code> 被设计成了交易者常用的仪表盘形式。对于每个交易品种，我们在指标的 <code>Level</code> 参数中设置单独的垂直缩进。在这里，所有时间框架的 WPR 值以一行标记的形式显示，并且这些值用颜色编码。在这个版本中，WPR 值被归一化到范围 <code>[0..1]</code> 内，所以使用相隔几十的水平位刻度（例如，如下图截图中的 20）可以在子窗口中放置多个指标实例而不会重叠（80、100、120 等）。每个副本用于其自己的工作交易品种。此外，由于 <code>Level</code> 大于 <code>1.0</code>，而 WPR 值较小，它们在数据窗口中的值可以分别从小数点的左边和右边清晰可见。</p><p>标签刻度的标签由在 <code>OnInit</code> 函数中动态添加的水平位提供。</p><p>不同工作交易品种的三个多时间框架 WPR 指标线面板</p><p>不同工作交易品种的三个多时间框架 WPR 指标线面板</p><p>你可以研究 <code>UseWPRMTFDashboard.mq5</code> 的源代码，并将其与 <code>UseWPRMTF.mq5</code> 进行比较。为了生成颜色色调的调色板，我们使用了文件 <code>ColorMix.mqh</code>。</p><p>在我们完成对内置指标（包括 <code>iWPR</code>）的学习后，我们可以用内置的 <code>iWPR</code> 指标来替换自定义的 <code>IndWPR</code> 指标。</p><h3 id="关于复合指标的有效性和资源占用" tabindex="-1">关于复合指标的有效性和资源占用 <a class="header-anchor" href="#关于复合指标的有效性和资源占用" aria-label="Permalink to &quot;关于复合指标的有效性和资源占用&quot;">​</a></h3><p>上面展示的生成许多辅助指标的方法，在速度和资源消耗方面效率并不高。这主要是一个集成 MQL 程序并在它们之间交换数据的示例。但就像任何技术一样，应该恰当地使用它。</p><p>所创建的两个指标中的每一个都会在时间序列的所有柱线上计算 WPR，然后只有最后一个值会被取到调用指标中。我们既浪费了内存，也浪费了处理器时间。</p><p>如果辅助指标的源代码可用，或者知道它们的运行原理，最理想的方法是将计算算法放在主指标（或智能交易系统）内部，并将其应用于有限的、最小深度的即时历史数据。</p><p>在某些情况下，可以通过在当前时间框架上进行等效计算来避免引用更高的时间框架：例如，对于 14 根日线柱线的价格区间（这需要构建完整的 D1 时间序列），可以在 14 * 24 根 H1 柱线上取一个区间，前提是 24 小时交易并且在 H1 图表上启动该指标。</p><p>同时，当在交易系统中使用一个商业指标（没有源代码）时，只能通过开放的编程接口从它那里获取数据。在这种情况下，创建一个句柄，然后通过 <code>CopyBuffer</code> 从指标缓冲区读取数据是唯一可行的选择，但同时也是一种方便、通用的方法。只是应该始终记住，调用 API 函数是一种比在 MQL 程序内部操作自己的数组和调用局部函数更“昂贵”的操作。如果你需要打开许多终端，可能每个终端都有一组这样未优化的 MQL 程序，并且如果你的资源有限，那么性能很可能会下降。</p><h2 id="内置指标概述" tabindex="-1">内置指标概述 <a class="header-anchor" href="#内置指标概述" aria-label="Permalink to &quot;内置指标概述&quot;">​</a></h2><p>终端提供了大量常用指标，这些指标也可以通过API使用。因此，您无需在MQL5中实现它们的算法。此类指标是使用类似于iCustom的内置函数创建的。例如，我们之前出于教学目的创建了自己版本的威廉指标（WPR）和三重指数移动平均线（EMA）。然而，相应的指标可以直接通过iWPR和iTEMA函数使用。所有可用的指标如下表所示。</p><p>所有内置指标都将工作交易品种的字符串和时间框架作为前两个参数，并且还会返回一个整数，该整数是指标描述符。一般来说，所有函数的原型如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int iFunction(const string symbol, ENUM_TIMEFRAMES timeframe, ...)</span></span></code></pre></div><p>省略号的位置后面跟着特定指标的具体参数。参数的数量和类型各不相同。有些指标没有参数。</p><p>例如，WPR有一个参数，就像我们自制版本中的一样——周期：int iWPR(const string symbol, ENUM_TIMEFRAMES timeframe, int period)。与我们的版本不同，内置的分形指标没有特殊参数：int iFractals(const string symbol, ENUM_TIMEFRAMES period)。在这种情况下，分形的阶数是硬编码的，等于2，也就是说，在极值（顶部或底部）之前和之后，必须分别至少有两根高低价格不太明显的柱线。</p><p>允许设置值NULL来代替交易品种。NULL表示当前图表的工作交易品种，并且时间框架参数中的值0对应于当前图表的时间框架，因为它也是ENUM_TIMEFRAMES枚举中的PERIOD_CURRENT值（请参阅“交易品种和时间框架”部分）。</p><p>您还应该记住，不同类型的指标具有不同数量的缓冲区。例如，移动平均线或WPR只有一个缓冲区，而分形有两个缓冲区。缓冲区的数量也在表格的单独一列中注明。</p><table tabindex="0"><thead><tr><th>函数</th><th>指标名称</th><th>选项</th><th>缓冲区</th></tr></thead><tbody><tr><td>iAC</td><td>加速振荡器</td><td>–</td><td>1*</td></tr><tr><td>iAD</td><td>累积/派发指标</td><td>ENUM_APPLIED_VOLUME volume</td><td>1*</td></tr><tr><td>iADX</td><td>平均趋向指数</td><td>int period</td><td>3*</td></tr><tr><td>iADXWilder</td><td>威尔德平均趋向指数</td><td>int period</td><td>3*</td></tr><tr><td>iAlligator</td><td>鳄鱼指标</td><td>int jawPeriod, int jawShift, int teethPeriod, int teethShift, int lipsPeriod, int lipsShift, ENUM_MA_METHOD method, ENUM_APPLIED_PRICE price</td><td>3</td></tr><tr><td>iAMA</td><td>自适应移动平均线</td><td>int period, int fast, int slow, int shift, ENUM_APPLIED_PRICE price</td><td>1</td></tr><tr><td>iAO</td><td>很棒振荡器</td><td>–</td><td>1*</td></tr><tr><td>iATR</td><td>平均真实波幅</td><td>int period</td><td>1*</td></tr><tr><td>iBands</td><td>布林带指标</td><td>int period, int shift, double deviation, ENUM_APPLIED_PRICE price</td><td>3</td></tr><tr><td>iBearsPower</td><td>熊市力量指标</td><td>int period</td><td>1*</td></tr><tr><td>iBullsPower</td><td>牛市力量指标</td><td>int period</td><td>1*</td></tr><tr><td>iBWMFI</td><td>比尔·威廉姆斯市场促进指数</td><td>ENUM_APPLIED_VOLUME volume</td><td>1*</td></tr><tr><td>iCCI</td><td>商品通道指标</td><td>int period, ENUM_APPLIED_PRICE price</td><td>1*</td></tr><tr><td>iChaikin</td><td>蔡金振荡器</td><td>int fast, int slow, ENUM_MA_METHOD method, ENUM_APPLIED_VOLUME volume</td><td>1*</td></tr><tr><td>iDEMA</td><td>双指数移动平均线</td><td>int period, int shift, ENUM_APPLIED_PRICE price</td><td>1</td></tr><tr><td>iDeMarker</td><td>德马克指标</td><td>int period</td><td>1*</td></tr><tr><td>iEnvelopes</td><td>包络线指标</td><td>int period, int shift, ENUM_MA_METHOD method, ENUM_APPLIED_PRICE price, double deviation</td><td>2</td></tr><tr><td>iForce</td><td>力量指数</td><td>int period, ENUM_MA_METHOD method, ENUM_APPLIED_VOLUME volume</td><td>1*</td></tr><tr><td>iFractals</td><td>分形指标</td><td>–</td><td>2</td></tr><tr><td>iFrAMA</td><td>分形自适应移动平均线</td><td>int period, int shift, ENUM_APPLIED_PRICE price</td><td>1</td></tr><tr><td>iGator</td><td>鳄鱼振荡器</td><td>int jawPeriod, int jawShift, int teethPeriod, int teethShift, int lipsPeriod, int lipsShift, ENUM_MA_METHOD method, ENUM_APPLIED_PRICE price</td><td>4*</td></tr><tr><td>iIchimoku</td><td>一目均衡表指标</td><td>int tenkan, int kijun, int senkou</td><td>5</td></tr><tr><td>iMomentum</td><td>动量指标</td><td>int period, ENUM_APPLIED_PRICE price</td><td>1*</td></tr><tr><td>iMFI</td><td>资金流量指标</td><td>int period, ENUM_APPLIED_VOLUME volume</td><td>1*</td></tr><tr><td>iMA</td><td>移动平均线</td><td>int period, int shift, ENUM_MA_METHOD method, ENUM_APPLIED_PRICE price</td><td>1</td></tr><tr><td>iMACD</td><td>指数平滑异同移动平均线</td><td>int fast, int slow, int signal, ENUM_APPLIED_PRICE price</td><td>2*</td></tr><tr><td>iOBV</td><td>能量潮指标</td><td>ENUM_APPLIED_VOLUME volume</td><td>1*</td></tr><tr><td>iOsMA</td><td>振荡器移动平均线（MACD直方图）</td><td>int fast, int slow, int signal, ENUM_APPLIED_PRICE price</td><td>1*</td></tr><tr><td>iRSI</td><td>相对强弱指标</td><td>int period, ENUM_APPLIED_PRICE price</td><td>1*</td></tr><tr><td>iRVI</td><td>相对活力指标</td><td>int period</td><td>1*</td></tr><tr><td>iSAR</td><td>抛物线转向指标</td><td>double step, double maximum</td><td>1</td></tr><tr><td>iStdDev</td><td>标准差指标</td><td>int period, int shift, ENUM_MA_METHOD method, ENUM_APPLIED_PRICE price</td><td>1*</td></tr><tr><td>iStochastic</td><td>随机指标</td><td>int Kperiod, int Dperiod, int slowing, ENUM_MA_METHOD method, ENUM_APPLIED_PRICE price</td><td>2*</td></tr><tr><td>iTEMA</td><td>三重指数移动平均线</td><td>int period, int shift, ENUM_APPLIED_PRICE price</td><td>1</td></tr><tr><td>iTriX</td><td>三重指数移动平均线振荡器</td><td>int period, ENUM_APPLIED_PRICE price</td><td>1*</td></tr><tr><td>iVIDyA</td><td>可变指数动态平均线</td><td>int momentum, int smooth, int shift, ENUM_APPLIED_PRICE price</td><td>1</td></tr><tr><td>iVolumes</td><td>成交量指标</td><td>ENUM_APPLIED_VOLUME volume</td><td>1*</td></tr><tr><td>iWPR</td><td>威廉指标</td><td>int period</td><td>1*</td></tr></tbody></table><p>在最右边一列中，带有自己窗口的指标用星号 * 表示（它们显示在主图表下方）。</p><p>最常用的参数是那些定义指标周期的参数（period、fast、slow以及其他变体），以及线条偏移量：当偏移量为正数时，图形向右偏移；当偏移量为负数时，图形向左偏移给定数量的柱线。</p><p>许多参数都有应用枚举类型：ENUM_APPLIED_PRICE、ENUM_APPLIED_VOLUME、ENUM_MA_METHOD。我们已经在“枚举”部分了解了ENUM_APPLIED_PRICE。所有可用的类型及其描述如下表所示。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值</th></tr></thead><tbody><tr><td>PRICE_CLOSE</td><td>柱线收盘价</td><td>1</td></tr><tr><td>PRICE_OPEN</td><td>柱线开盘价</td><td>2</td></tr><tr><td>PRICE_HIGH</td><td>柱线最高价</td><td>3</td></tr><tr><td>PRICE_LOW</td><td>柱线最低价</td><td>4</td></tr><tr><td>PRICE_MEDIAN</td><td>中间价，(最高价+最低价)/2</td><td>5</td></tr><tr><td>PRICE_TYPICAL</td><td>典型价，(最高价+最低价+收盘价)/3</td><td>6</td></tr><tr><td>PRICE_WEIGHTED</td><td>加权平均价，(最高价+最低价+收盘价+收盘价)/4</td><td>7</td></tr></tbody></table><p>与成交量相关的指标可以使用tick成交量（实际上，这是一个tick计数器）或实际成交量（通常仅对交易所交易品种可用）进行运算。这两种类型都汇总在ENUM_APPLIED_VOLUME枚举中。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值</th></tr></thead><tbody><tr><td>VOLUME_TICK</td><td>Tick成交量</td><td>0</td></tr><tr><td>VOLUME_REAL</td><td>交易量</td><td>1</td></tr></tbody></table><p>许多技术指标会对时间序列进行平滑（或平均）处理。终端支持四种最常见的平滑方法，在MQL5中使用ENUM_MA_METHOD枚举的元素来指定这些方法。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值</th></tr></thead><tbody><tr><td>MODE_SMA</td><td>简单平均</td><td>0</td></tr><tr><td>MODE_EMA</td><td>指数平均</td><td>1</td></tr><tr><td>MODE_SMMA</td><td>平滑平均</td><td>2</td></tr><tr><td>MODE_LWMA</td><td>线性加权平均</td><td>3</td></tr></tbody></table><p>对于随机指标，我们将在下一部分中考虑其示例，该指标有两种计算选项：按收盘价计算或按最高价/最低价计算。这些值在特殊的ENUM_STO_PRICE枚举中提供。</p><table tabindex="0"><thead><tr><th>标识符</th><th>描述</th><th>值</th></tr></thead><tbody><tr><td>STO_LOWHIGH</td><td>按最低价/最高价计算</td><td>0</td></tr><tr><td>STO_CLOSECLOSE</td><td>按收盘价/收盘价计算</td><td>1</td></tr></tbody></table><p>对于那些有多个缓冲区的指标，其缓冲区的用途和编号如下表所示。</p><table tabindex="0"><thead><tr><th>指标</th><th>常量</th><th>描述</th><th>值</th></tr></thead><tbody><tr><td>ADX, ADXW</td><td></td><td>主线</td><td>0</td></tr><tr><td></td><td></td><td>+DI线</td><td>1</td></tr><tr><td></td><td></td><td>-DI线</td><td>2</td></tr><tr><td>iAlligator</td><td></td><td>鳄鱼颚线</td><td>0</td></tr><tr><td></td><td></td><td>鳄鱼齿线</td><td>1</td></tr><tr><td></td><td></td><td>鳄鱼唇线</td><td>2</td></tr><tr><td>iBands</td><td></td><td>基线</td><td>0</td></tr><tr><td></td><td></td><td>上轨线</td><td>1</td></tr><tr><td></td><td></td><td>下轨线</td><td>2</td></tr><tr><td>iEnvelopes, iFractals</td><td></td><td>上轨线</td><td>0</td></tr><tr><td></td><td></td><td>下轨线</td><td>1</td></tr><tr><td>iGator</td><td></td><td>上直方图</td><td>0</td></tr><tr><td></td><td></td><td>下直方图</td><td>2</td></tr><tr><td>iIchimoku</td><td></td><td>转换线（Tenkan-sen线）</td><td>0</td></tr><tr><td></td><td></td><td>基准线（Kijun-sen线）</td><td>1</td></tr><tr><td></td><td></td><td>先行上线（Senkou Span A线）</td><td>2</td></tr><tr><td></td><td></td><td>先行下线（Senkou Span B线）</td><td>3</td></tr><tr><td></td><td></td><td>延迟线（Chikou span线）</td><td>4</td></tr><tr><td>iMACD, iRVI, iStochastic</td><td></td><td>主线</td><td>0</td></tr><tr><td></td><td></td><td>信号线</td><td>1</td></tr></tbody></table><p>所有指标的计算公式都在MetaTrader 5文档中给出。</p><p>有关调用指标函数的完整技术信息，包括源代码示例，可以在MQL5文档中找到。我们将在本书后面的部分中考虑一些示例。</p><h2 id="使用内置指标" tabindex="-1">使用内置指标 <a class="header-anchor" href="#使用内置指标" aria-label="Permalink to &quot;使用内置指标&quot;">​</a></h2><p>作为使用内置指标的一个简单入门示例，我们调用 <code>iStochastic</code> 函数。该指标函数的原型如下：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int iStochastic(const string symbol, ENUM_TIMEFRAMES timeframe,</span></span>
<span class="line"><span>  int Kperiod, int Dperiod, int slowing,</span></span>
<span class="line"><span>  ENUM_MA_METHOD method, ENUM_STO_PRICE price)</span></span></code></pre></div><p>可以看到，除了标准参数 <code>symbol</code>（交易品种）和 <code>timeframe</code>（时间周期）外，随机指标还有几个特定参数：</p><ul><li><code>Kperiod</code>：计算 %K 线所需的K线数量。</li><li><code>Dperiod</code>：%D 线的一次平滑周期。</li><li><code>slowing</code>：二次平滑周期（减速）。</li><li><code>method</code>：平均（平滑）方法。</li><li><code>price</code>：计算随机指标的方法。</li></ul><p>我们尝试创建自己的指标 <code>UseStochastic.mq5</code>，它会将随机指标的值复制到自己的缓冲区中。由于随机指标有两个缓冲区，我们也预留两个：即“主”线和“信号”线。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property indicator_separate_window</span></span>
<span class="line"><span>#property indicator_buffers 2</span></span>
<span class="line"><span>#property indicator_plots   2</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>#property indicator_type1   DRAW_LINE</span></span>
<span class="line"><span>#property indicator_color1  clrBlue</span></span>
<span class="line"><span>#property indicator_width1  1</span></span>
<span class="line"><span>#property indicator_label1  &quot;St&#39;Main&quot;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>#property indicator_type2   DRAW_LINE</span></span>
<span class="line"><span>#property indicator_color2  clrChocolate</span></span>
<span class="line"><span>#property indicator_width2  1</span></span>
<span class="line"><span>#property indicator_label2  &quot;St&#39;Signal&quot;</span></span>
<span class="line"><span>#property indicator_style2  STYLE_DOT</span></span></code></pre></div><p>在输入变量中，我们提供所有必需的参数：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input int KPeriod = 5;</span></span>
<span class="line"><span>input int DPeriod = 3;</span></span>
<span class="line"><span>input int Slowing = 3;</span></span>
<span class="line"><span>input ENUM_MA_METHOD Method = MODE_SMA;</span></span>
<span class="line"><span>input ENUM_STO_PRICE StochasticPrice = STO_LOWHIGH;</span></span></code></pre></div><p>接下来，我们描述用于指标缓冲区的数组和一个用于描述符的全局变量：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>double MainBuffer[];</span></span>
<span class="line"><span>double SignalBuffer[];</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>int Handle;</span></span></code></pre></div><p>我们将在 <code>OnInit</code> 函数中进行初始化：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   IndicatorSetString(INDICATOR_SHORTNAME,</span></span>
<span class="line"><span>      StringFormat(&quot;Stochastic(%d,%d,%d)&quot;, KPeriod, DPeriod, Slowing));</span></span>
<span class="line"><span>   // 将数组绑定为缓冲区</span></span>
<span class="line"><span>   SetIndexBuffer(0, MainBuffer);</span></span>
<span class="line"><span>   SetIndexBuffer(1, SignalBuffer);</span></span>
<span class="line"><span>   // 获取随机指标的描述符</span></span>
<span class="line"><span>   Handle = iStochastic(_Symbol, _Period,</span></span>
<span class="line"><span>      KPeriod, DPeriod, Slowing, Method, StochasticPrice);</span></span>
<span class="line"><span>   return Handle == INVALID_HANDLE ? INIT_FAILED : INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在，在 <code>OnCalculate</code> 函数中，一旦句柄准备好，我们就需要使用 <code>CopyBuffer</code> 函数读取数据：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnCalculate(const int rates_total,</span></span>
<span class="line"><span>                const int prev_calculated,</span></span>
<span class="line"><span>                const int begin,</span></span>
<span class="line"><span>                const double &amp;data[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 等待随机指标在所有K线上完成计算</span></span>
<span class="line"><span>   if(BarsCalculated(Handle) != rates_total)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return prev_calculated;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 将数据复制到我们的两个缓冲区</span></span>
<span class="line"><span>   const int n = CopyBuffer(Handle, 0, 0, rates_total - prev_calculated + 1,</span></span>
<span class="line"><span>      MainBuffer);</span></span>
<span class="line"><span>   const int m = CopyBuffer(Handle, 1, 0, rates_total - prev_calculated + 1,</span></span>
<span class="line"><span>      SignalBuffer);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   return n &gt; -1 &amp;&amp; m &gt; -1 ? rates_total : 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>注意，我们调用了两次 <code>CopyBuffer</code> 函数，分别针对每个缓冲区（第二个参数为 0 和 1）。如果尝试读取一个不存在索引的缓冲区（例如 2），将会产生错误，并且我们将无法获取任何数据。</p><p>我们的指标并不是特别有用，因为它没有给原始随机指标添加任何内容，也没有分析其读数。另一方面，我们可以确保标准终端指标的线条和在 MQL5 中创建的线条是一致的（也可以像处理完全自定义指标那样轻松添加级别和精度设置，但那样就很难区分副本和原始指标了）。</p><h3 id="标准随机指标和基于-istochastic-函数的自定义指标" tabindex="-1">标准随机指标和基于 <code>iStochastic</code> 函数的自定义指标 <a class="header-anchor" href="#标准随机指标和基于-istochastic-函数的自定义指标" aria-label="Permalink to &quot;标准随机指标和基于 \`iStochastic\` 函数的自定义指标&quot;">​</a></h3><p>为了演示终端对指标的缓存功能，在 <code>OnInit</code> 函数中添加几行代码：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   double array[];</span></span>
<span class="line"><span>   Print(&quot;This is very first copy of iStochastic with such settings=&quot;,</span></span>
<span class="line"><span>      !(CopyBuffer(Handle, 0, 0, 10, array) &gt; 0));</span></span></code></pre></div><p>这里我们利用了一个已知特性的技巧：指标创建后，需要一些时间进行计算，在获取句柄后立即从缓冲区读取数据是不可能的。这对于“冷启动”情况是适用的，即当具有指定参数的指标在终端内存的缓存中还不存在时。如果有现成的同类指标，那么我们可以立即访问缓冲区。</p><p>编译新指标后，应在同一交易品种和时间周期的两个图表上放置该指标的两个副本。第一次，日志中会显示带有 <code>true</code> 标志的消息（这是第一个副本），第二次（如果有多个图表，后续也是如此）则会显示 <code>false</code>。你也可以先手动将标准的“随机震荡指标”添加到图表中（使用默认设置或后续在 <code>Use Stochastic</code> 中应用的设置），然后运行 <code>Use Stochastic</code>，同样会得到 <code>false</code>。</p><p>现在，让我们尝试基于标准指标设计一些有创意的东西。下面的指标 <code>UseM1MA.mq5</code> 用于在 M5 及更高时间周期（主要是日内）上计算每根 K 线的平均价格。它会累积每个特定工作（更高）时间周期 K 线时间戳范围内的 M1 K 线价格。这使得我们能够比标准价格类型（收盘价、开盘价、中间价、典型价、加权价等）更准确地估算 K 线的有效价格。此外，我们还考虑了在一定周期内对这些价格进行平均的可能性，但要注意，可能无法得到特别平滑的线条。</p><p>该指标将显示在主窗口中，并且包含一个缓冲区。可以使用 3 个参数更改设置：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input uint _BarLimit = 100; // BarLimit</span></span>
<span class="line"><span>input uint BarPeriod = 1;</span></span>
<span class="line"><span>input ENUM_APPLIED_PRICE M1Price = PRICE_CLOSE;</span></span></code></pre></div><ul><li><code>BarLimit</code>：设置用于计算的最近历史 K 线数量。这很重要，因为与分钟级的 M1 时间周期相比，高时间周期图表可能需要大量的 K 线（例如，在 24/7 交易中，一天的 D1 时间周期包含 1440 根 M1 K 线）。这可能会导致额外的数据下载和同步等待。在将此参数设置为 0（表示无限制处理）之前，先尝试使用节省资源的默认设置（工作时间周期的 100 根 K 线）。</li><li>不过，即使将 <code>BarLimit</code> 设置为 0，指标可能也不会对更高时间周期的整个可见历史进行计算：如果终端对图表中的 K 线数量有限制，那么这也会影响对 M1 K 线的请求。换句话说，分析深度由允许的最大 M1 K 线数量对应的历史时间决定。</li><li><code>BarPeriod</code>：设置进行平均计算的更高时间周期 K 线数量。默认值为 1，这样可以分别查看每根 K 线的有效价格。</li><li><code>M1Price</code> 参数：指定用于 M1 K 线计算的价格类型。</li></ul><p>在全局上下文中，描述了一个用于缓冲区的数组、一个描述符和一个自动更新标志，我们需要使用这个标志等待“外部”M1 时间周期的时间序列构建完成：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>double Buffer[];</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>int Handle;</span></span>
<span class="line"><span>int BarLimit;</span></span>
<span class="line"><span>bool PendingRefresh;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>const string MyName = &quot;M1MA (&quot; + StringSubstr(EnumToString(M1Price), 6)</span></span>
<span class="line"><span>   + &quot;,&quot; + (string)BarPeriod + &quot;[&quot; + (string)(PeriodSeconds() / 60) + &quot;])&quot;;</span></span>
<span class="line"><span>const uint P = PeriodSeconds() / 60 * BarPeriod;</span></span></code></pre></div><p>此外，这里还形成了指标的名称和平均周期 <code>P</code>。<code>PeriodSeconds</code> 函数返回当前时间周期内一根 K 线的秒数，通过它可以计算出当前一根 K 线内包含的 M1 K 线数量：<code>PeriodSeconds() / 60</code>（M1 K 线的持续时间为 60 秒）。</p><p>通常的初始化在 <code>OnInit</code> 函数中完成：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   IndicatorSetString(INDICATOR_SHORTNAME, MyName);</span></span>
<span class="line"><span>   IndicatorSetInteger(INDICATOR_DIGITS, _Digits);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   SetIndexBuffer(0, Buffer);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   Handle = iMA(_Symbol, PERIOD_M1, P, 0, MODE_SMA, M1Price);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   return Handle != INVALID_HANDLE ? INIT_SUCCEEDED : INIT_FAILED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>为了获取更高时间周期 K 线的平均价格，我们使用简单移动平均线，以 <code>MODE_SMA</code> 模式调用 <code>iMA</code> 函数。</p><p>下面的 <code>OnCalculate</code> 函数进行了简化。首次运行或历史数据更改时，我们清空缓冲区并填充 <code>BarLimit</code> 变量（这是必需的，因为输入变量不能编辑，而我们希望将值 0 解释为可用于计算的最大 K 线数量）。在后续调用中，仅从 <code>prev_calculated</code> 开始，且不超过 <code>BarLimit</code> 的最后几根 K 线的缓冲区元素会被清空。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnCalculate(ON_CALCULATE_STD_FULL_PARAM_LIST)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(prev_calculated == 0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ArrayInitialize(Buffer, EMPTY_VALUE);</span></span>
<span class="line"><span>      if(_BarLimit == 0</span></span>
<span class="line"><span>      || _BarLimit &gt; (uint)rates_total)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         BarLimit = rates_total;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      else</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         BarLimit = (int)_BarLimit;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   else</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      for(int i = fmax(prev_calculated - 1, (int)(rates_total - BarLimit));</span></span>
<span class="line"><span>         i &lt; rates_total; ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         Buffer[i] = EMPTY_VALUE;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>在从创建的 <code>iMA</code> 指标读取数据之前，需要等待数据准备好：为此，我们将 <code>BarsCalculated</code> 与 M1 K 线的数量进行比较。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   if(BarsCalculated(Handle) != iBars(_Symbol, PERIOD_M1))</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(prev_calculated == 0)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         EventSetTimer(1);</span></span>
<span class="line"><span>         PendingRefresh = true;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      return prev_calculated;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>如果数据未准备好，我们启动一个定时器，以便在一秒后再次尝试读取数据。</p><p>接下来，我们进入算法的主要计算部分，因此如果定时器仍在运行，我们必须停止它。如果下一个报价事件比 1 秒来得更快，并且 M1 的 <code>iMA</code> 指标已经计算完成，就可能会出现这种情况。逻辑上，我们只需调用相应的函数 <code>EventKillTimer</code>。然而，它的行为有一个细微差别：它不会清空指标类型 MQL 程序的事件队列，如果定时器事件已经在队列中，那么 <code>OnTimer</code> 处理程序将被调用一次。为了避免图表不必要的更新，我们使用自己的变量 <code>Pending Refresh</code> 来控制这个过程，并在此处将其赋值为 <code>false</code>。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   ...</span></span>
<span class="line"><span>   Pending Refresh = false; // 数据已准备好，定时器将闲置</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>以下是 <code>OnTimer</code> 处理程序的组织方式：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnTimer()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   EventKillTimer();</span></span>
<span class="line"><span>   if(PendingRefresh)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ChartSetSymbolPeriod(0, _Symbol, _Period);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>让我们回到 <code>OnCalculate</code> 函数，展示主要的工作流程：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   for(int i = fmax(prev_calculated - 1, (int)(rates_total - BarLimit));</span></span>
<span class="line"><span>      i &lt; rates_total; ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      static double result[1];</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      // 获取与当前时间周期第 i 根 K 线对应的最后一根 M1 K 线</span></span>
<span class="line"><span>      const datetime dt = time[i] + PeriodSeconds() - 60;</span></span>
<span class="line"><span>      const int bar = iBarShift(_Symbol, PERIOD_M1, dt);</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      if(bar &gt; -1)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         // 请求 M1 上的 MA 值</span></span>
<span class="line"><span>         if(CopyBuffer(Handle, 0, bar, 1, result) == 1)</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            Buffer[i] = result[0];</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>         else</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            Print(&quot;CopyBuffer failed: &quot;, _LastError);</span></span>
<span class="line"><span>            return prev_calculated;</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   return rates_total;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>该指标的操作通过 EURUSD,H1 图表上的以下图像进行说明。蓝色线条对应默认设置，每个值是通过对 60 根 M1 K 线的收盘价进行平均得到的。橙色线条额外包含了 5 根 H1 K 线的平滑处理，使用的是 M1 的典型价格。</p><h3 id="eurusd-h1-上的两个-usem1ma-指标实例" tabindex="-1">EURUSD,H1 上的两个 <code>UseM1MA</code> 指标实例 <a class="header-anchor" href="#eurusd-h1-上的两个-usem1ma-指标实例" aria-label="Permalink to &quot;EURUSD,H1 上的两个 \`UseM1MA\` 指标实例&quot;">​</a></h3><p>本书展示了 <code>UseM1MASimple.mq5</code> 的简化版本。我们没有详细介绍对最后一根（未完成）K 线的平均处理、空 K 线（M1 上没有数据的 K 线）的处理、<code>PLOT_DRAW_BEGIN</code> 属性的正确设置，以及在新 K 线出现时对平均计算短期滞后的控制。完整版本可在 <code>UseM1MA.mq5</code> 文件中找到。</p><p>作为基于标准指标构建指标的最后一个示例，让我们分析对 <code>IndUnityPercent.mq5</code> 指标的改进，该指标在“多货币和多时间周期指标”部分有介绍。第一个版本使用 <code>CopyBuffer</code> 函数获取收盘价进行计算。在新的 <code>UseUnityPercentPro.mq5</code> 版本中，我们将这种方法替换为读取 <code>iMA</code> 指标的数据。这将使我们能够实现新的功能：</p><ul><li>在给定周期内对价格进行平均。</li><li>选择平均方法。</li><li>选择用于计算的价格类型。</li></ul><p>源代码的更改非常小。我们添加了 3 个新参数和一个用于 <code>iMA</code> 句柄的全局数组：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input ENUM_APPLIED_PRICE PriceType = PRICE_CLOSE;</span></span>
<span class="line"><span>input ENUM_MA_METHOD PriceMethod = MODE_EMA;</span></span>
<span class="line"><span>input int PricePeriod = 1;</span></span>
<span class="line"><span>...   </span></span>
<span class="line"><span>int Handles[];</span></span></code></pre></div><p>在辅助函数 <code>InitSymbols</code> 中（该函数从 <code>OnInit</code> 调用，用于解析包含工作交易品种列表的字符串），我们为新数组分配内存（其 <code>SymbolCount</code> 大小由列表确定）：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>string InitSymbols()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   SymbolCount = StringSplit(Instruments, &#39;,&#39;, Symbols);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   ArrayResize(Handles, SymbolCount);</span></span>
<span class="line"><span>   ArrayInitialize(Handles, INVALID_HANDLE);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   for(int i = 0; i &lt; SymbolCount; i++)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      Handles[i] = iMA(Symbols[i], PERIOD_CURRENT, PricePeriod, 0,</span></span>
<span class="line"><span>         PriceMethod, PriceType);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在同一函数的末尾，我们将创建所需从属指标的描述符。</p><p>在进行主要计算的 <code>Calculate</code> 函数中，我们将以下形式的调用：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CopyClose(Symbols[j], _Period, time0, time1, w);</span></span></code></pre></div><p>替换为：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>CopyBuffer(Handles[j], 0, time0, time1, w); // 第 j 个句柄，第 0 个缓冲区</span></span></code></pre></div><p>为了清晰起见，我们还在指标的短名称中补充了三个新参数：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   IndicatorSetString(INDICATOR_SHORTNAME,</span></span>
<span class="line"><span>      StringFormat(&quot;Unity [%d] %s(%d,%s)&quot;, workCurrencies.getSize(),</span></span>
<span class="line"><span>      StringSubstr(EnumToString(PriceMethod), 5), PricePeriod,</span></span>
<span class="line"><span>      StringSubstr(EnumToString(PriceType), 6)));</span></span></code></pre></div><p>以下是最终的结果：</p><h3 id="useunitypercentpro-多交易品种指标与主要外汇货币对" tabindex="-1"><code>UseUnityPercentPro</code> 多交易品种指标与主要外汇货币对 <a class="header-anchor" href="#useunitypercentpro-多交易品种指标与主要外汇货币对" aria-label="Permalink to &quot;\`UseUnityPercentPro\` 多交易品种指标与主要外汇货币对&quot;">​</a></h3><p>这里展示了一个包含 8 种主要外汇货币的篮子（默认设置），对 11 根 K 线进行平均，并基于典型价格进行计算。两条粗线对应当前图表货币的相对价值：欧元用蓝色标记，美元用绿色标记。</p><h2 id="创建指标的高级方法-indicatorcreate" tabindex="-1">创建指标的高级方法：IndicatorCreate <a class="header-anchor" href="#创建指标的高级方法-indicatorcreate" aria-label="Permalink to &quot;创建指标的高级方法：IndicatorCreate&quot;">​</a></h2><p>使用 <code>iCustom</code> 函数或构成内置指标集合的那些函数之一来创建指标，需要在编码阶段了解参数列表。然而，在实际应用中，常常需要编写足够灵活的程序，以便能够将一个指标替换为另一个指标。</p><p>例如，在测试器中优化智能交易系统（Expert Advisor）时，不仅选择移动平均线的周期是有意义的，而且选择其计算算法也是有必要的。当然，如果我们基于单个指标 <code>iMA</code> 构建算法，你可以在其 <code>method</code> 设置中提供指定 <code>ENUM_MA_METHOD</code>（移动平均方法枚举）的可能性。但有些人可能希望通过在双指数移动平均线、三指数移动平均线和分形移动平均线之间切换来扩大选择范围。乍一看，这可以通过 <code>switch</code> 语句分别调用 <code>DEMA</code>、<code>iTEMA</code> 和 <code>iFrAMA</code> 来实现。然而，如何将自定义指标包含在这个列表中呢？</p><p>虽然在 <code>iCustom</code> 调用中指标的名称很容易被替换，但参数列表可能会有很大差异。一般来说，一个智能交易系统可能需要基于任意指标的组合来生成信号，而这些指标并不一定是预先知道的，而且不仅仅局限于移动平均线。</p><p>对于这种情况，MQL5 有一种通用方法，即使用 <code>IndicatorCreate</code> 函数来创建任意技术指标。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int IndicatorCreate(const string symbol, ENUM_TIMEFRAMES timeframe, ENUM_INDICATOR indicator, int count = 0, const MqlParam &amp;parameters[] = NULL)</span></span></code></pre></div><p>该函数为指定的交易品种和时间框架创建一个指标实例。指标类型通过 <code>indicator</code> 参数设置。其类型为 <code>ENUM_INDICATOR</code> 枚举（见后文），其中包含所有内置指标的标识符，以及 <code>iCustom</code> 的一个选项。指标参数的数量及其描述分别通过 <code>count</code> 参数和 <code>MqlParam</code> 结构体数组（见下文）传递。</p><p>这个数组的每个元素描述了正在创建的指标的相应输入参数，所以元素的内容和顺序必须与内置指标函数的原型相对应，或者对于自定义指标来说，要与它源代码中输入变量的描述相对应。</p><p>违反这条规则可能会导致程序执行阶段出现错误（见下面的示例），并且无法创建句柄。在最坏的情况下，传递的参数将被错误地解释，指标的行为也不会如预期那样，但由于没有错误提示，这一点并不容易被察觉。例外情况是传递一个空数组或者根本不传递（因为 <code>count</code> 和 <code>parameters</code> 参数是可选的）：在这种情况下，指标将使用默认设置创建。此外，对于自定义指标，你可以从参数列表的末尾省略任意数量的参数。</p><p><code>MqlParam</code> 结构体是专门为在使用 <code>IndicatorCreate</code> 创建指标时传递输入参数，或者使用 <code>IndicatorParameters</code> 获取关于（图表上的）第三方指标参数的信息而设计的。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>struct MqlParam </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>   ENUM_DATATYPE type;          // 输入参数类型</span></span>
<span class="line"><span>   long          integer_value; // 用于存储整数值的字段</span></span>
<span class="line"><span>   double        double_value;  // 用于存储双精度或浮点数值的字段</span></span>
<span class="line"><span>   string        string_value;  // 用于存储字符串类型值的字段</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>参数的实际值必须根据第一个 <code>type</code> 字段的值，设置在 <code>integer_value</code>、<code>double_value</code>、<code>string_value</code> 字段之一中。反过来，<code>type</code> 字段使用 <code>ENUM_DATATYPE</code> 枚举来描述，该枚举包含所有内置 MQL5 类型的标识符。</p><table tabindex="0"><thead><tr><th>标识符</th><th>数据类型</th></tr></thead><tbody><tr><td><code>TYPE_BOOL</code></td><td><code>bool</code></td></tr><tr><td><code>TYPE_CHAR</code></td><td><code>char</code></td></tr><tr><td><code>TYPE_UCHAR</code></td><td><code>uchar</code></td></tr><tr><td><code>TYPE_SHORT</code></td><td><code>short</code></td></tr><tr><td><code>TYPE_USHORT</code></td><td><code>ushort</code></td></tr><tr><td><code>TYPE_COLOR</code></td><td><code>color</code></td></tr><tr><td><code>TYPE_INT</code></td><td><code>int</code></td></tr><tr><td><code>TYPE_UINT</code></td><td><code>uint</code></td></tr><tr><td><code>TYPE_DATETIME</code></td><td><code>datetime</code></td></tr><tr><td><code>TYPE_LONG</code></td><td><code>long</code></td></tr><tr><td><code>TYPE_ULONG</code></td><td><code>ulong</code></td></tr><tr><td><code>TYPE_FLOAT</code></td><td><code>float</code></td></tr><tr><td><code>TYPE_DOUBLE</code></td><td><code>double</code></td></tr><tr><td><code>TYPE_STRING</code></td><td><code>string</code></td></tr></tbody></table><p>如果任何指标参数具有枚举类型，你应该在 <code>type</code> 字段中使用 <code>TYPE_INT</code> 值来描述它。</p><p><code>IndicatorCreate</code> 函数的第三个参数中用于指示指标类型的 <code>ENUM_INDICATOR</code> 枚举包含以下常量。</p><table tabindex="0"><thead><tr><th>标识符</th><th>指标</th></tr></thead><tbody><tr><td><code>IND_AC</code></td><td>加速振荡器（Accelerator Oscillator）</td></tr><tr><td><code>IND_AD</code></td><td>累积/派发指标（Accumulation/Distribution）</td></tr><tr><td><code>IND_ADX</code></td><td>平均趋向指数（Average Directional Index）</td></tr><tr><td><code>IND_ADXW</code></td><td>威尔斯·威尔德平均趋向指数（ADX by Welles Wilder）</td></tr><tr><td><code>IND_ALLIGATOR</code></td><td>鳄鱼指标（Alligator）</td></tr><tr><td><code>IND_AMA</code></td><td>自适应移动平均线（Adaptive Moving Average）</td></tr><tr><td><code>IND_AO</code></td><td>令人敬畏的振荡器（Awesome Oscillator）</td></tr><tr><td><code>IND_ATR</code></td><td>平均真实波幅（Average True Range）</td></tr><tr><td><code>IND_BANDS</code></td><td>布林带（Bollinger Bands®）</td></tr><tr><td><code>IND_BEARS</code></td><td>空头力量（Bears Power）</td></tr><tr><td><code>IND_BULLS</code></td><td>多头力量（Bulls Power）</td></tr><tr><td><code>IND_BWMFI</code></td><td>市场促进指数（Market Facilitation Index）</td></tr><tr><td><code>IND_CCI</code></td><td>商品通道指数（Commodity Channel Index）</td></tr><tr><td><code>IND_CHAIKIN</code></td><td>蔡金振荡器（Chaikin Oscillator）</td></tr><tr><td><code>IND_CUSTOM</code></td><td>自定义指标（Custom indicator）</td></tr><tr><td><code>IND_DEMA</code></td><td>双指数移动平均线（Double Exponential Moving Average）</td></tr><tr><td><code>IND_DEMARKER</code></td><td>德马克指标（DeMarker）</td></tr><tr><td><code>IND_ENVELOPES</code></td><td>包络线（Envelopes）</td></tr><tr><td><code>IND_FORCE</code></td><td>力量指数（Force Index）</td></tr><tr><td><code>IND_FRACTALS</code></td><td>分形（Fractals）</td></tr><tr><td><code>IND_FRAMA</code></td><td>分形自适应移动平均线（Fractal Adaptive Moving Average）</td></tr><tr><td><code>IND_GATOR</code></td><td>鳄鱼振荡器（Gator Oscillator）</td></tr><tr><td><code>IND_ICHIMOKU</code></td><td>一目均衡表（Ichimoku Kinko Hyo）</td></tr><tr><td><code>IND_MA</code></td><td>移动平均线（Moving Average）</td></tr><tr><td><code>IND_MACD</code></td><td>指数平滑异同移动平均线（MACD）</td></tr><tr><td><code>IND_MFI</code></td><td>资金流量指数（Money Flow Index）</td></tr><tr><td><code>IND_MOMENTUM</code></td><td>动量指标（Momentum）</td></tr><tr><td><code>IND_OBV</code></td><td>能量潮（On Balance Volume）</td></tr><tr><td><code>IND_OSMA</code></td><td>移动平均振荡器（OsMA）</td></tr><tr><td><code>IND_RSI</code></td><td>相对强弱指数（Relative Strength Index）</td></tr><tr><td><code>IND_RVI</code></td><td>相对活力指数（Relative Vigor Index）</td></tr><tr><td><code>IND_SAR</code></td><td>抛物线转向指标（Parabolic SAR）</td></tr><tr><td><code>IND_STDDEV</code></td><td>标准差（Standard Deviation）</td></tr><tr><td><code>IND_STOCHASTIC</code></td><td>随机振荡器（Stochastic Oscillator）</td></tr><tr><td><code>IND_TEMA</code></td><td>三指数移动平均线（Triple Exponential Moving Average）</td></tr><tr><td><code>IND_TRIX</code></td><td>三重指数平均线振荡器（Triple Exponential Moving Averages Oscillator）</td></tr><tr><td><code>IND_VIDYA</code></td><td>可变指数动态平均线（Variable Index Dynamic Average）</td></tr><tr><td><code>IND_VOLUMES</code></td><td>成交量（Volumes）</td></tr><tr><td><code>IND_WPR</code></td><td>威廉指标（Williams Percent Range）</td></tr></tbody></table><p>需要注意的是，如果传递 <code>IND_CUSTOM</code> 值作为指标类型，那么 <code>parameters</code> 数组的第一个元素的 <code>type</code> 字段必须具有 <code>TYPE_STRING</code> 值，并且 <code>string_value</code> 字段必须包含自定义指标的名称（路径）。</p><p>如果成功，<code>IndicatorCreate</code> 函数将返回所创建指标的句柄，若失败则返回 <code>INVALID_HANDLE</code>。错误代码将在 <code>_LastError</code> 中提供。</p><p>回顾一下，为了测试创建自定义指标的 MQL 程序（在编译阶段指标名称未知，使用 <code>IndicatorCreate</code> 时也是这种情况），你必须使用指令显式绑定它们：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property tester_indicator &quot;indicator_name.ex5&quot;</span></span></code></pre></div><p>这允许测试器将所需的辅助指标发送给测试代理，但将该过程限制为仅预先知道的指标。</p><p>让我们看几个例子。首先从一个简单的应用开始，将 <code>IndicatorCreate</code> 作为已知函数的替代方法，然后，为了展示这种新方法的灵活性，我们将创建一个通用的包装指标，用于可视化任意内置或自定义指标。</p><p><code>UseEnvelopesParams1.mq5</code> 的第一个示例创建了一个包络线（Envelopes）指标的嵌入式副本。为此，我们描述了两个缓冲区、两个绘图、用于它们的数组，以及重复 <code>iEnvelopes</code> 参数的输入参数。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property indicator_chart_window</span></span>
<span class="line"><span>#property indicator_buffers 2</span></span>
<span class="line"><span>#property indicator_plots   2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 绘图设置</span></span>
<span class="line"><span>#property indicator_type1   DRAW_LINE</span></span>
<span class="line"><span>#property indicator_color1  clrBlue</span></span>
<span class="line"><span>#property indicator_width1  1</span></span>
<span class="line"><span>#property indicator_label1  &quot;Upper&quot;</span></span>
<span class="line"><span>#property indicator_style1  STYLE_DOT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#property indicator_type2   DRAW_LINE</span></span>
<span class="line"><span>#property indicator_color2  clrRed</span></span>
<span class="line"><span>#property indicator_width2  1</span></span>
<span class="line"><span>#property indicator_label2  &quot;Lower&quot;</span></span>
<span class="line"><span>#property indicator_style2  STYLE_DOT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>input int WorkPeriod = 14;</span></span>
<span class="line"><span>input int Shift = 0;</span></span>
<span class="line"><span>input ENUM_MA_METHOD Method = MODE_EMA;</span></span>
<span class="line"><span>input ENUM_APPLIED_PRICE Price = PRICE_TYPICAL;</span></span>
<span class="line"><span>input double Deviation = 0.1; // 偏差，%</span></span>
<span class="line"><span></span></span>
<span class="line"><span>double UpBuffer[];</span></span>
<span class="line"><span>double DownBuffer[];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int Handle; // 从属指标的句柄</span></span></code></pre></div><p>如果你使用 <code>iEnvelopes</code> 函数，<code>OnInit</code> 处理程序可能如下所示。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   SetIndexBuffer(0, UpBuffer);</span></span>
<span class="line"><span>   SetIndexBuffer(1, DownBuffer);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   Handle = iEnvelopes(WorkPeriod, Shift, Method, Price, Deviation);</span></span>
<span class="line"><span>   return Handle == INVALID_HANDLE? INIT_FAILED : INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>缓冲区绑定将保持不变，但现在为了创建句柄，我们将采用另一种方式。让我们描述 <code>MqlParam</code> 数组，填充它并调用 <code>IndicatorCreate</code> 函数。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   MqlParam params[5] = {};</span></span>
<span class="line"><span>   params[0].type = TYPE_INT;</span></span>
<span class="line"><span>   params[0].integer_value = WorkPeriod;</span></span>
<span class="line"><span>   params[1].type = TYPE_INT;</span></span>
<span class="line"><span>   params[1].integer_value = Shift;</span></span>
<span class="line"><span>   params[2].type = TYPE_INT;</span></span>
<span class="line"><span>   params[2].integer_value = Method;</span></span>
<span class="line"><span>   params[3].type = TYPE_INT;</span></span>
<span class="line"><span>   params[3].integer_value = Price;</span></span>
<span class="line"><span>   params[4].type = TYPE_DOUBLE;</span></span>
<span class="line"><span>   params[4].double_value = Deviation;</span></span>
<span class="line"><span>   Handle = IndicatorCreate(_Symbol, _Period, IND_ENVELOPES,</span></span>
<span class="line"><span>      ArraySize(params), params);</span></span>
<span class="line"><span>   return Handle == INVALID_HANDLE? INIT_FAILED : INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>获得句柄后，我们在 <code>OnCalculate</code> 函数中使用它来填充其两个缓冲区。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnCalculate(const int rates_total,</span></span>
<span class="line"><span>                const int prev_calculated,</span></span>
<span class="line"><span>                const int begin,</span></span>
<span class="line"><span>                const double &amp;data[])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(BarsCalculated(Handle) != rates_total)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return prev_calculated;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   const int n = CopyBuffer(Handle, 0, 0, rates_total - prev_calculated + 1, UpBuffer);</span></span>
<span class="line"><span>   const int m = CopyBuffer(Handle, 1, 0, rates_total - prev_calculated + 1, DownBuffer);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   return n &gt; -1 &amp;&amp; m &gt; -1? rates_total : 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>让我们检查一下所创建的指标 <code>UseEnvelopesParams1</code> 在图表上的显示情况。</p><p><code>UseEnvelopesParams1</code> 指标</p><p><code>UseEnvelopesParams1</code> 指标</p><p>上面是一种标准但不是很优雅的填充属性的方法。由于在许多项目中可能需要调用 <code>IndicatorCreate</code>，因此简化调用代码的过程是有意义的。为此，我们将开发一个名为 <code>MqlParamBuilder</code> 的类（请参阅文件 <code>MqlParamBuilder.mqh</code>）。它的任务是使用一些方法接受参数值，确定它们的类型，并将适当的元素（正确填充的结构体）添加到数组中。</p><p>MQL5 并不完全支持运行时类型信息（RTTI）的概念。借助 RTTI，程序可以在运行时询问关于其组成部分的描述性元数据，包括变量、结构体、类、函数等。MQL5 中可以归类为 RTTI 的几个内置特性是 <code>typename</code> 运算符和 <code>offsetof</code> 运算符。因为 <code>typename</code> 返回类型名称作为字符串，所以让我们基于字符串构建我们的类型自动检测器（请参阅文件 <code>RTTI.mqh</code>）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>template&lt;typename T&gt;</span></span>
<span class="line"><span>ENUM_DATATYPE rtti(T v = (T)NULL)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   static string types[] =</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      &quot;null&quot;,</span><span>     //               (0)</span></span>
<span class="line"><span>      &quot;bool&quot;,</span><span>     // 0 TYPE_BOOL=1 (1)</span></span>
<span class="line"><span>      &quot;char&quot;,</span><span>     // 1 TYPE_CHAR=2 (2)</span></span>
<span class="line"><span>      &quot;uchar&quot;,</span><span>    // 2 TYPE_UCHAR=3 (3)</span></span>
<span class="line"><span>      &quot;short&quot;,</span><span>    // 3 TYPE_SHORT=4 (4)</span></span>
<span class="line"><span>      &quot;ushort&quot;,</span><span>   // 4 TYPE_USHORT=5 (5)</span></span>
<span class="line"><span>      &quot;color&quot;,</span><span>    // 5 TYPE_COLOR=6 (6)</span></span>
<span class="line"><span>      &quot;int&quot;,</span><span>      // 6 TYPE_INT=7 (7)</span></span>
<span class="line"><span>      &quot;uint&quot;,</span><span>     // 7 TYPE_UINT=8 (8)</span></span>
<span class="line"><span>      &quot;datetime&quot;,</span><span> // 8 TYPE_DATETIME=9 (9)</span></span>
<span class="line"><span>      &quot;long&quot;,</span><span>     // 9 TYPE_LONG=10 (A)</span></span>
<span class="line"><span>      &quot;ulong&quot;,</span><span>    // 10 TYPE_ULONG=11 (B)</span></span>
<span class="line"><span>      &quot;float&quot;,</span><span>    // 11 TYPE_FLOAT=12 (C)</span></span>
<span class="line"><span>      &quot;double&quot;,</span><span>   // 12 TYPE_DOUBLE=13 (D)</span></span>
<span class="line"><span>      &quot;string&quot;,</span><span>   // 13 TYPE_STRING=14 (E)</span></span>
<span class="line"><span>   };</span></span>
<span class="line"><span>   const string t = typename(T);</span></span>
<span class="line"><span>   for(int i = 0; i &lt; ArraySize(types); ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(types[i] == t)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         return (ENUM_DATATYPE)i;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   return (ENUM_DATATYPE)0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>模板函数 <code>rtti</code> 使用 <code>typename</code> 来接收一个包含模板类型参数字符串名称的字符串，并将其与包含 <code>ENUM_DATATYPE</code> 枚举中所有内置类型的数组元素进行比较。数组中名称的枚举顺序与枚举元素的值相对应，所以当找到匹配的字符串时，只需将索引转换为 <code>(ENUM_DATATYPE)</code> 类型并返回给调用代码即可。例如，调用 <code>rtti(1.0)</code> 或 <code>rtti&lt;double&gt;()</code> 将得到 <code>TYPE_DOUBLE</code> 值。</p><p>有了这个工具，我们可以回到 <code>MqlParamBuilder</code> 的开发工作。在这个类中，我们描述 <code>MqlParam</code> 结构体数组和 <code>n</code> 变量，<code>n</code> 变量将包含要填充的最后一个元素的索引。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>class MqlParamBuilder</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>protected:</span></span>
<span class="line"><span>   MqlParam array[];</span></span>
<span class="line"><span>   int n;</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>让我们将向参数列表中添加下一个值的公共方法设为模板方法。此外，我们将其实现为 <code>operator &#39;&lt;&lt;&#39;</code> 运算符的重载，该运算符返回指向 “构建器” 对象本身的指针。这将允许在一行中向数组写入多个值，例如：<code>builder &lt;&lt; WorkPeriod &lt;&lt; PriceType &lt;&lt; SmoothingMode</code>。</p><p>正是在这个方法中，我们增加数组的大小，获取用于填充的工作索引 <code>n</code>，并立即重置这个第 <code>n</code> 个结构体。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>...</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   template&lt;typename T&gt;</span></span>
<span class="line"><span>   MqlParamBuilder *operator&lt;&lt;(T v)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span> // 扩展数组</span></span>
<span class="line"><span>      n = ArraySize(array);</span></span>
<span class="line"><span>      ArrayResize(array, n + 1);</span></span>
<span class="line"><span>      ZeroMemory(array[n]);</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      return &amp;this;</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>在省略号的位置，将是主要的工作部分，即填充结构体的字段。可以假设我们将使用自制的 <code>rtti</code> 直接确定参数的类型。但你应该注意一个细微差别。如果我们编写指令 <code>array[n].type = rtti(v)</code>，对于枚举类型它将无法正确工作。每个枚举都是一个具有自己名称的独立类型，尽管它的存储方式与整数相同。对于枚举类型，函数 <code>rtti</code> 将返回 0，因此，你需要显式地将其替换为 <code>TYPE_INT</code>。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>      ...</span></span>
<span class="line"><span>      // 定义值的类型</span></span>
<span class="line"><span>      array[n].type = rtti(v);</span></span>
<span class="line"><span>      if(array[n].type == 0) array[n].type = TYPE_INT; // 意味着是枚举类型</span></span>
<span class="line"><span>      ...</span></span></code></pre></div><p>现在我们只需要将 <code>v</code> 值放入结构体的三个字段之一：<code>long</code> 类型的 <code>integer_value</code> 字段（注意，<code>long</code> 是长整数，因此该字段以此命名）、<code>double</code> 类型的 \`</p><h2 id="使用indicatorcreate灵活创建指标" tabindex="-1">使用IndicatorCreate灵活创建指标 <a class="header-anchor" href="#使用indicatorcreate灵活创建指标" aria-label="Permalink to &quot;使用IndicatorCreate灵活创建指标&quot;">​</a></h2><p>在了解了创建指标的新方法之后，让我们来处理一个更接近实际的任务。IndicatorCreate通常用于事先不知道被调用指标的情况。例如，在编写能够根据用户配置的任意信号进行交易的通用智能交易系统时，就会产生这样的需求。甚至指标的名称也可以由用户设置。</p><p>我们还没有准备好开发智能交易系统，因此我们将通过一个包装指标UseDemoAll.mq5的示例来研究这项技术，该指标能够显示任何其他指标的数据。</p><p>这个过程应该是这样的。当我们在图表上运行UseDemoAll时，属性对话框中会出现一个列表，我们应该从其中选择一个内置指标或自定义指标，如果是后者，我们还需要在输入字段中指定其名称。在另一个字符串参数中，我们可以输入用逗号分隔的参数列表。参数类型将根据其拼写自动确定。例如，带小数点的数字（10.0）将被视为双精度浮点数，不带小数点的数字（15）将被视为整数，用引号括起来的内容（&quot;text&quot;）将被视为字符串。</p><p>这些只是UseDemoAll的基本设置，但并非所有可能的设置。我们稍后将讨论其他设置。</p><p>让我们以ENUM_INDICATOR枚举为基础来解决这个问题：它已经包含了所有类型指标的元素，包括自定义指标（IND_CUSTOM）。说实话，单纯从这个枚举本身来看，由于几个原因，它并不适用。首先，无法从中获取关于特定指标的元数据，例如参数的数量和类型、缓冲区的数量，以及指标显示在哪个窗口（主窗口或子窗口）。这些信息对于正确创建和可视化指标很重要。其次，如果我们定义一个ENUM_INDICATOR类型的输入变量，以便用户可以选择所需的指标，在属性对话框中，这将表现为一个下拉列表，其中的选项仅包含元素的名称。实际上，希望在这个列表中为用户提供提示（至少是关于参数的提示）。因此，我们将描述自己的枚举IndicatorType。回想一下，MQL5允许为每个元素在右侧指定一个注释，该注释会显示在界面中。</p><p>在IndicatorType枚举的每个元素中，我们不仅要对来自ENUM_INDICATOR的相应标识符（ID）进行编码，还要对参数数量（P）、缓冲区数量（B）和工作窗口编号（W）进行编码。为此开发了以下宏：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#define MAKE_IND(P,B,W,ID) (int)((W &lt;&lt; 24) | ((B &amp; 0xFF) &lt;&lt; 16) | ((P &amp; 0xFF) &lt;&lt; 8) | (ID &amp; 0xFF))</span></span>
<span class="line"><span>#define IND_PARAMS(X)   ((X &gt;&gt; 8) &amp; 0xFF)</span></span>
<span class="line"><span>#define IND_BUFFERS(X)  ((X &gt;&gt; 16) &amp; 0xFF)</span></span>
<span class="line"><span>#define IND_WINDOW(X)   ((uchar)(X &gt;&gt; 24))</span></span>
<span class="line"><span>#define IND_ID(X)       ((ENUM_INDICATOR)(X &amp; 0xFF))</span></span></code></pre></div><p>MAKE_IND宏将上述所有特征作为参数，并将它们打包到一个4字节整数的不同字节中，从而为新枚举的元素形成一个唯一的代码。其余4个宏允许执行反向操作，即使用代码计算指标的所有特征。</p><p>我们不会在此处提供整个IndicatorType枚举，而只提供其中一部分。完整的源代码可以在文件AutoIndicator.mqh中找到。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>enum IndicatorType</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   iCustom_ = MAKE_IND(0, 0, 0, IND_CUSTOM), // {iCustom}(...)[?]</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   iAC_ = MAKE_IND(0, 1, 1, IND_AC), // iAC( )[1]*</span></span>
<span class="line"><span>   iAD_volume = MAKE_IND(1, 1, 1, IND_AD), // iAD(volume)[1]*</span></span>
<span class="line"><span>   iADX_period = MAKE_IND(1, 3, 1, IND_ADX), // iADX(period)[3]*</span></span>
<span class="line"><span>   iADXWilder_period = MAKE_IND(1, 3, 1, IND_ADXW), // iADXWilder(period)[3]*</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   iMomentum_period_price = MAKE_IND(2, 1, 1, IND_MOMENTUM), // iMomentum(period,price)[1]*</span></span>
<span class="line"><span>   iMFI_period_volume = MAKE_IND(2, 1, 1, IND_MFI), // iMFI(period,volume)[1]*</span></span>
<span class="line"><span>   iMA_period_shift_method_price = MAKE_IND(4, 1, 0, IND_MA), // iMA(period,shift,method,price)[1]</span></span>
<span class="line"><span>   iMACD_fast_slow_signal_price = MAKE_IND(4, 2, 1, IND_MACD), // iMACD(fast,slow,signal,price)[2]*</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   iTEMA_period_shift_price = MAKE_IND(3, 1, 0, IND_TEMA), // iTEMA(period,shift,price)[1]</span></span>
<span class="line"><span>   iVolumes_volume = MAKE_IND(1, 1, 1, IND_VOLUMES), // iVolumes(volume)[1]*</span></span>
<span class="line"><span>   iWPR_period = MAKE_IND(1, 1, 1, IND_WPR) // iWPR(period)[1]*</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>这些注释将成为用户可见的下拉列表的元素，其中指明了带有命名参数的原型、方括号中的缓冲区数量，以及在自己窗口中显示的指标的星号标记。标识符本身也具有信息性，因为它们是由用于将消息输出到日志的EnumToString函数转换为文本的内容。</p><p>参数列表尤为重要，因为用户需要在为此保留的输入变量中输入相应的用逗号分隔的值。我们也可以显示参数的类型，但为了简单起见，决定只保留有意义的名称，从这些名称中也可以推断出类型。例如，period、fast、slow是表示周期（柱线数量）的整数，method是平均方法ENUM_MA_METHOD，price是价格类型ENUM_APPLIED_PRICE，volume是成交量类型ENUM_APPLIED_VOLUME。</p><p>为了方便用户（无需记住枚举元素的值），程序将支持所有枚举的名称。特别是，sma标识符表示MODE_SMA，ema表示MODE_EMA，依此类推。Price close将转换为PRICE_CLOSE，open将转换为PRICE_OPEN，其他类型的价格也会根据枚举元素标识符中的最后一个单词（下划线后面的部分）进行类似的转换。例如，对于iMA指标参数列表（iMA_period_shift_method_price），可以编写以下一行：11,0,sma,close。标识符无需加引号。但是，如果需要，可以传递一个包含相同文本的字符串，例如，列表1.5,&quot;close&quot;包含实数1.5和字符串&quot;close&quot;。</p><p>指标类型，以及带有参数列表的字符串，还有（可选的）名称（如果指标是自定义的），是AutoIndicator类构造函数的主要数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>class AutoIndicator</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>protected:</span></span>
<span class="line"><span>   IndicatorTypetype;       // 选定的指标类型</span></span>
<span class="line"><span>   string symbols;          // 工作交易品种（可选）</span></span>
<span class="line"><span>   ENUM_TIMEFRAMES tf;      // 工作时间框架（可选）</span></span>
<span class="line"><span>   MqlParamBuilder builder; // 参数数组的“构建器”</span></span>
<span class="line"><span>   int handle;              // 指标句柄</span></span>
<span class="line"><span>   string name;             // 自定义指标名称</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   AutoIndicator(const IndicatorType t, const string custom, const string parameters,</span></span>
<span class="line"><span>      const string s = NULL, const ENUM_TIMEFRAMES p = 0):</span></span>
<span class="line"><span>      type(t), name(custom), symbol(s), tf(p), handle(INVALID_HANDLE)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      PrintFormat(&quot;Initializing %s(%s) %s, %s&quot;,</span></span>
<span class="line"><span>         (type == iCustom_ ? name : EnumToString(type)), parameters,</span></span>
<span class="line"><span>         (symbol == NULL ? _Symbol : symbol), EnumToString(tf == 0 ? _Period : tf));</span></span>
<span class="line"><span>      // 将字符串拆分为参数数组（在构建器内部形成）</span></span>
<span class="line"><span>      parseParameters(parameters);</span></span>
<span class="line"><span>      // 创建并存储句柄</span></span>
<span class="line"><span>      handle = create();</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   int getHandle() const</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return handle;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>在此处及以下内容中，省略了一些与检查输入数据正确性相关的片段。完整的源代码包含在本书的配套内容中。</p><p>分析参数字符串的过程委托给parseParameters方法。它实现了上述识别值类型并将其传递给MqlParamBuilder对象的方案，我们在上一个示例中已经见过这个对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   int parseParameters(const string &amp;list)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      string sparams[];</span></span>
<span class="line"><span>      const int n = StringSplit(list, &#39;,&#39;, sparams);</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      for(int i = 0; i &lt; n; i++)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         // 字符串规范化（去除空格，转换为小写）</span></span>
<span class="line"><span>         StringTrimLeft(sparams[i]);</span></span>
<span class="line"><span>         StringTrimRight(sparams[i]);</span></span>
<span class="line"><span>         StringToLower(sparams[i]);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>         if(StringGetCharacter(sparams[i], 0) == &#39;&quot;&#39;</span></span>
<span class="line"><span>         &amp;&amp; StringGetCharacter(sparams[i], StringLen(sparams[i]) - 1) == &#39;&quot;&#39;)</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            // 引号内的所有内容都被视为字符串</span></span>
<span class="line"><span>            builder &lt;&lt; StringSubstr(sparams[i], 1, StringLen(sparams[i]) - 2);</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>         else</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            string part[];</span></span>
<span class="line"><span>            int p = StringSplit(sparams[i], &#39;.&#39;, part);</span></span>
<span class="line"><span>            if(p == 2) // 双精度浮点数/浮点数</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>               builder &lt;&lt; StringToDouble(sparams[i]);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            else if(p == 3) // 日期时间</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>               builder &lt;&lt; StringToTime(sparams[i]);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            else if(sparams[i] == &quot;true&quot;)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>               builder &lt;&lt; true;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            else if(sparams[i] == &quot;false&quot;)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>               builder &lt;&lt; false;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            else // 整数</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>               int x = lookUpLiterals(sparams[i]);</span></span>
<span class="line"><span>               if(x == -1)</span></span>
<span class="line"><span>               {</span></span>
<span class="line"><span>                  x = (int)StringToInteger(sparams[i]);</span></span>
<span class="line"><span>               }</span></span>
<span class="line"><span>               builder &lt;&lt; x;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      return n;</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>辅助函数lookUpLiterals提供将标识符转换为标准枚举常量的功能。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   int lookUpLiterals(const string &amp;s)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(s == &quot;sma&quot;) return MODE_SMA;</span></span>
<span class="line"><span>      else if(s == &quot;ema&quot;) return MODE_EMA;</span></span>
<span class="line"><span>      else if(s == &quot;smma&quot;) return MODE_SMMA;</span></span>
<span class="line"><span>      else if(s == &quot;lwma&quot;) return MODE_LWMA;</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      else if(s == &quot;close&quot;) return PRICE_CLOSE;</span></span>
<span class="line"><span>      else if(s == &quot;open&quot;) return PRICE_OPEN;</span></span>
<span class="line"><span>      else if(s == &quot;high&quot;) return PRICE_HIGH;</span></span>
<span class="line"><span>      else if(s == &quot;low&quot;) return PRICE_LOW;</span></span>
<span class="line"><span>      else if(s == &quot;median&quot;) return PRICE_MEDIAN;</span></span>
<span class="line"><span>      else if(s == &quot;typical&quot;) return PRICE_TYPICAL;</span></span>
<span class="line"><span>      else if(s == &quot;weighted&quot;) return PRICE_WEIGHTED;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>      else if(s == &quot;lowhigh&quot;) return STO_LOWHIGH;</span></span>
<span class="line"><span>      else if(s == &quot;closeclose&quot;) return STO_CLOSECLOSE;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>      else if(s == &quot;tick&quot;) return VOLUME_TICK;</span></span>
<span class="line"><span>      else if(s == &quot;real&quot;) return VOLUME_REAL;</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      return -1;</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>在识别参数并将其保存在对象的内部数组MqlParamBuilder中之后，将调用create方法。其目的是将参数复制到局部数组中，添加自定义指标的名称（如果有），并调用IndicatorCreate函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   int create()</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      MqlParam p[];</span></span>
<span class="line"><span>      // 用“builder”对象收集的参数填充“p”数组</span></span>
<span class="line"><span>      builder &gt;&gt; p;</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      if(type == iCustom_)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         // 在数组最开头插入自定义指标的名称</span></span>
<span class="line"><span>         ArraySetAsSeries(p, true);</span></span>
<span class="line"><span>         const int n = ArraySize(p);</span></span>
<span class="line"><span>         ArrayResize(p, n + 1);</span></span>
<span class="line"><span>         p[n].type = TYPE_STRING;</span></span>
<span class="line"><span>         p[n].string_value = name;</span></span>
<span class="line"><span>         ArraySetAsSeries(p, false);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      return IndicatorCreate(symbol, tf, IND_ID(type), ArraySize(p), p);</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>该方法返回接收到的句柄。</p><p>特别值得注意的是，如何将带有自定义指标名称的额外字符串参数插入到数组的最开头。首先，将数组指定为“按时间序列”的索引顺序（请参阅ArraySetAsSeries），结果是最后一个（在物理上，按内存中的位置）元素的索引变为0，并且元素从右向左计数。然后增大数组的大小，并将指标名称写入添加的元素中。由于反向索引，此添加操作不会发生在现有元素的右侧，而是在左侧。最后，我们将数组恢复为通常的索引顺序，并且索引0处是刚刚添加的、包含字符串的新元素，该字符串原本是最后一个元素。</p><p>可选地，AutoIndicator类可以从枚举元素的名称中形成内置指标的缩写名称。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   ...</span></span>
<span class="line"><span>   string getName() const</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(type != iCustom_)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         const string s = EnumToString(type);</span></span>
<span class="line"><span>         const int p = StringFind(s, &quot;_&quot;);</span></span>
<span class="line"><span>         if(p &gt; 0) return StringSubstr(s, 0, p);</span></span>
<span class="line"><span>         return s;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      return name;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>现在，一切都准备就绪，可以直接进入UseDemoAll.mq5的源代码了。但让我们从一个稍微简化的版本UseDemoAllSimple.mq5开始。</p><p>首先，让我们定义指标缓冲区的数量。由于内置指标中缓冲区的最大数量是五个（对于一目均衡表指标Ichimoku），我们将其作为限制。我们将把注册这么多数量的数组作为缓冲区的任务交给我们已经熟悉的类BufferArray（请参阅“多货币和多时间框架指标，示例IndUnityPercent”部分）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#define BUF_NUM 5</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>#property indicator_chart_window</span></span>
<span class="line"><span>#property indicator_buffers BUF_NUM</span></span>
<span class="line"><span>#property indicator_plots   BUF_NUM</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>#include &lt;MQL5Book/IndBufArray.mqh&gt;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>BufferArray buffers(5);</span></span></code></pre></div><p>重要的是要记住，指标可以设计为显示在主窗口或单独的窗口中。MQL5不允许同时使用两种模式。然而，我们事先不知道用户会选择哪个指标，因此我们需要想出某种“解决方法”。目前，让我们将指标放置在主窗口中，稍后再处理单独窗口的问题。</p><p>从技术上讲，将具有indicator_separate_window属性的指标缓冲区中的数据复制到显示在主窗口中的缓冲区中没有障碍。然而，应该记住，此类指标的值范围通常与价格刻度不一致，因此不太可能在图表上看到它们（线条会在可见区域的上方或下方很远的地方），尽管这些值仍然会输出到数据窗口中。</p><p>借助输入变量，我们将选择指标类型、自定义指标的名称以及参数列表。我们还将添加用于渲染类型和线条宽度的变量。由于缓冲区将根据源指标的缓冲区数量动态连接使用，我们不会使用指令静态描述缓冲区样式，而是在OnInit中通过调用内置的Plot函数来完成此操作。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input IndicatorType IndicatorSelector = iMA_period_shift_method_price; // 内置指标选择器</span></span>
<span class="line"><span>input string IndicatorCustom = &quot;&quot;; // 自定义指标名称</span></span>
<span class="line"><span>input string IndicatorParameters = &quot;11,0,sma,close&quot;; // 指标参数（用逗号分隔的列表）</span></span>
<span class="line"><span>input ENUM_DRAW_TYPE DrawType = DRAW_LINE; // 绘制类型</span></span>
<span class="line"><span>input int DrawLineWidth = 1; // 绘制线条宽度</span></span></code></pre></div><p>让我们定义一个全局变量来存储指标描述符。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int Handle;</span></span></code></pre></div><p>在OnInit处理程序中，我们使用前面介绍的AutoIndicator类，用于解析输入数据、准备MqlParam数组并基于此获取句柄。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#include &lt;MQL5Book/AutoIndicator.mqh&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   AutoIndicator indicator(IndicatorSelector, IndicatorCustom, IndicatorParameters);</span></span>
<span class="line"><span>   Handle = indicator.getHandle();</span></span>
<span class="line"><span>   if(Handle == INVALID_HANDLE)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Alert(StringFormat(&quot;Can&#39;t create indicator: %s&quot;,</span></span>
<span class="line"><span>         _LastError ? E2S(_LastError) : &quot;The name or number of parameters is incorrect&quot;));</span></span>
<span class="line"><span>      return INIT_FAILED;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>为了自定义图形，我们描述一组颜色，并从AutoIndicator对象中获取指标的简称。我们还使用IND_BUFFERS宏计算内置指标使用的n个缓冲区的数量，对于任何自定义指标（事先未知），由于没有更好的解决方案，我们将包含所有缓冲区。此外，在复制数据的过程中，不必要的CopyBuffer调用将简单地返回错误，并且这样的数组可以用空值填充。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   ...</span></span>
<span class="line"><span>   static color defColors[BUF_NUM] = {clrBlue, clrGreen, clrRed, clrCyan, clrMagenta};</span></span>
<span class="line"><span>   const string s = indicator.getName();</span></span>
<span class="line"><span>   const int n = (IndicatorSelector != iCustom_) ? IND_BUFFERS(IndicatorSelector) : BUF_NUM;</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>在循环中，我们将设置图表的属性，同时考虑限制n：高于该限制的缓冲区将被隐藏。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   for(int i = 0; i &lt; BUF_NUM; ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      PlotIndexSetString(i, PLOT_LABEL, s + &quot;[&quot; + (string)i + &quot;]&quot;);</span></span>
<span class="line"><span>      PlotIndexSetInteger(i, PLOT_DRAW_TYPE, i &lt; n ? DrawType : DRAW_NONE);</span></span>
<span class="line"><span>      PlotIndexSetInteger(i, PLOT_LINE_WIDTH, DrawLineWidth);</span></span>
<span class="line"><span>      PlotIndexSetInteger(i, PLOT_LINE_COLOR, defColors[i]);</span></span>
<span class="line"><span>      PlotIndexSetInteger(i, PLOT_SHOW_DATA, i &lt; n);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   Comment(&quot;DemoAll: &quot;, (IndicatorSelector == iCustom_ ? IndicatorCustom : s),</span></span>
<span class="line"><span>      &quot;(&quot;, IndicatorParameters, &quot;)&quot;);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   return INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="图表上指标管理函数概述" tabindex="-1">图表上指标管理函数概述 <a class="header-anchor" href="#图表上指标管理函数概述" aria-label="Permalink to &quot;图表上指标管理函数概述&quot;">​</a></h2><p>正如我们已经了解到的，指标是一种 MQL 程序，它将计算部分和可视化部分结合在一起。计算在内部进行，用户无法察觉，但可视化需要与图表关联。这就是为什么指标与图表密切相关，并且 MQL5 API 甚至包含一组用于管理图表上指标的函数。我们将在关于图表的章节中更详细地讨论这些函数，在这里我们仅列出它们。</p><table tabindex="0"><thead><tr><th>函数</th><th>用途</th></tr></thead><tbody><tr><td><code>ChartWindowFind</code></td><td>返回包含当前指标或具有给定名称指标的子窗口编号</td></tr><tr><td><code>ChartIndicatorAdd</code></td><td>将具有指定句柄的指标添加到指定的图表窗口中</td></tr><tr><td><code>ChartIndicatorDelete</code></td><td>从指定的图表窗口中删除具有指定名称的指标</td></tr><tr><td><code>ChartIndicatorGet</code></td><td>返回指定图表窗口上具有指定短名称的指标句柄</td></tr><tr><td><code>ChartIndicatorName</code></td><td>通过指定图表窗口上指标列表中的编号返回指标的短名称</td></tr><tr><td><code>ChartIndicatorsTotal</code></td><td>返回附加到指定图表窗口的所有指标的数量</td></tr></tbody></table><p>在下一节“在主窗口和辅助窗口中组合信息输出”中，我们将看到一个 <code>UseDemoAll.mq5</code> 的示例，该示例使用了其中一些函数。</p><h3 id="主窗口和辅助窗口的输出组合" tabindex="-1">主窗口和辅助窗口的输出组合 <a class="header-anchor" href="#主窗口和辅助窗口的输出组合" aria-label="Permalink to &quot;主窗口和辅助窗口的输出组合&quot;">​</a></h3><p>让我们回到在主窗口和子窗口中显示同一指标图形的问题上，因为在开发示例 <code>UseDemoAllSimple.mq5</code> 时我们遇到过这个问题。专门为单独窗口设计的指标不适合在主图表上进行可视化，而为主窗口设计的指标又没有额外的窗口。有几种替代方法：</p><ol><li><strong>实现父指标</strong>：为单独窗口实现一个父指标，在那里显示图表，并在主窗口中使用它以图形对象的形式显示数据。这种方法不太好，因为无法像读取时间序列那样读取对象中的数据，而且大量对象会消耗额外的资源。</li><li><strong>开发虚拟面板</strong>：为主窗口开发自己的虚拟面板（类），并在正确的比例尺下，在其中呈现本应显示在子窗口中的时间序列。</li><li><strong>使用多个指标</strong>：使用多个指标，至少一个用于主窗口，一个用于子窗口，并通过共享内存（需要 DLL）、资源或数据库在它们之间交换数据。</li><li><strong>重复计算</strong>：在主窗口和子窗口的指标中重复进行计算（使用相同的源代码）。</li></ol><p>我们将介绍其中一种超出单个 MQL 程序范畴的解决方案：我们需要一个具有 <code>indicator_separate_window</code> 属性的额外指标。实际上，我们已经通过请求句柄创建了它的计算部分，只需要以某种方式将其显示在单独的子窗口中。</p><p>在新的（完整）版本的 <code>UseDemoAll.mq5</code> 中，我们将分析在相应的 <code>IndicatorType</code> 枚举元素中请求创建的指标的元数据。请记住，其中对每种内置指标的工作窗口进行了编码。当一个指标需要单独的窗口时，我们将使用专门的 MQL5 函数来创建一个，这些函数我们稍后会学习。</p><p>对于自定义指标，无法获取其工作窗口的信息。因此，我们添加 <code>IndicatorCustomSubwindow</code> 输入变量，用户可以在其中指定是否需要子窗口。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input bool IndicatorCustomSubwindow = false; // 自定义指标子窗口</span></span></code></pre></div><p>在 <code>OnInit</code> 函数中，我们隐藏用于子窗口的缓冲区。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   const bool subwindow = (IND_WINDOW(IndicatorSelector) &gt; 0)</span></span>
<span class="line"><span>      || (IndicatorSelector == iCustom_ &amp;&amp; IndicatorCustomSubwindow);</span></span>
<span class="line"><span>   for(int i = 0; i &lt; BUF_NUM; ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      PlotIndexSetInteger(i, PLOT_DRAW_TYPE,</span></span>
<span class="line"><span>         i &lt; n &amp;&amp; !subwindow ? DrawType : DRAW_NONE);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>完成此设置后，我们需要使用几个不仅适用于指标操作，还适用于图表操作的函数。我们将在相应的章节中详细研究它们，而在前一节中已经进行了初步介绍。</p><p>其中一个函数 <code>ChartIndicatorAdd</code> 允许将由句柄指定的指标添加到窗口中，不仅可以添加到主窗口，还可以添加到子窗口。我们将在图表相关章节中讨论图表标识符和窗口编号，目前只需知道下一次调用 <code>ChartIndicatorAdd</code> 函数会将带有句柄的指标添加到当前图表的新子窗口中。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int handle = ...// 获取指标句柄，通过 iCustom 或 IndicatorCreate</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 设置当前图表（0）</span></span>
<span class="line"><span>// |</span></span>
<span class="line"><span>// |     设置窗口编号为当前窗口总数</span></span>
<span class="line"><span>// |                          |</span></span>
<span class="line"><span>// |                          | 传递描述符</span></span>
<span class="line"><span>// |                          |                       |</span></span>
<span class="line"><span>// v                          v                       v</span></span>
<span class="line"><span>ChartIndicatorAdd(  0, (int)ChartGetInteger(0, CHART_WINDOWS_TOTAL), handle);</span></span></code></pre></div><p>了解到这种可能性后，我们可以考虑调用 <code>ChartIndicatorAdd</code> 函数，并将已准备好的从属指标的句柄传递给它。</p><p>我们需要的第二个函数是 <code>ChartIndicatorName</code>。它通过指标的句柄返回其短名称。这个名称对应于指标代码中设置的 <code>INDICATOR_SHORTNAME</code> 属性，可能与文件名不同。在删除或重新配置父指标后，需要这个名称来清理工作，即移除辅助指标及其子窗口。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>string subTitle = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   if(subwindow)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      // 在子窗口中显示新指标</span></span>
<span class="line"><span>      const int w = (int)ChartGetInteger(0, CHART_WINDOWS_TOTAL);</span></span>
<span class="line"><span>      ChartIndicatorAdd(0, w, Handle);</span></span>
<span class="line"><span>      // 保存名称，以便在 OnDeinit 中移除指标</span></span>
<span class="line"><span>      subTitle = ChartIndicatorName(0, w, 0);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在 <code>OnDeinit</code> 处理程序中，我们使用保存的 <code>subTitle</code> 来调用另一个我们稍后会学习的函数 — <code>ChartIndicatorDelete</code>。它会从图表中移除最后一个参数指定名称的指标。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnDeinit(const int)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(__FUNCSIG__, (StringLen(subTitle) &gt; 0 ? &quot; deleting &quot; + subTitle : &quot;&quot;));</span></span>
<span class="line"><span>   if(StringLen(subTitle) &gt; 0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ChartIndicatorDelete(0, (int)ChartGetInteger(0, CHART_WINDOWS_TOTAL) - 1,</span></span>
<span class="line"><span>         subTitle);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里假设只有我们的指标在图表上运行，并且仅运行一个实例。在更一般的情况下，应该分析所有子窗口以进行正确删除，但这需要图表章节中介绍的更多函数，所以目前我们先采用这种简单的版本。</p><p>如果现在运行 <code>UseDemoAll</code> 并从列表中选择带有星号标记的指标（即需要子窗口的指标），例如相对强弱指数（RSI），我们将看到预期的结果：RSI 显示在单独的窗口中。</p><h2 id="从有偏移的图表中读取数据" tabindex="-1">从有偏移的图表中读取数据 <a class="header-anchor" href="#从有偏移的图表中读取数据" aria-label="Permalink to &quot;从有偏移的图表中读取数据&quot;">​</a></h2><p>我们的新指标UseDemoAll几乎已经准备就绪。我们只需要再考虑一个要点。</p><p>在从属指标中，一些图表可以通过PLOT_SHIFT属性设置偏移量。例如，当偏移量为正数时，时间序列元素会向未来偏移，并显示在索引为0的柱线的右侧。奇怪的是，它们的索引是负数。随着向右移动，数字越来越小：-1，-2，-3，等等。这种寻址方式也会影响CopyBuffer函数。当我们使用CopyBuffer的第一种形式时，偏移参数设置为0表示时间序列中当前时间的元素。但是，如果时间序列本身向右偏移，我们将从编号为N的元素开始获取数据，其中N是源指标中的偏移值。同时，位于我们缓冲区中索引N右侧的元素将不会被数据填充，并且其中会保留“无效数据”。</p><p>为了演示这个问题，让我们从一个没有偏移的指标开始：很棒振荡器（Awesome Oscillator）非常符合这个要求。回想一下，UseDemoAll会将所有值复制到它的数组中，尽管由于不同的价格刻度和指标读数，这些值在图表上不可见，但我们可以通过数据窗口进行检查。无论我们在图表上把鼠标光标移动到哪里，数据窗口子窗口中的指标值和UseDemoAll缓冲区中的指标值都会匹配。例如，在下面的图片中，你可以清楚地看到，在16:00的小时柱线上，两个值都等于0.001797。</p><p>UseDemoAll缓冲区中的AO指标数据</p><p>UseDemoAll缓冲区中的AO指标数据</p><p>现在，在UseDemoAll的设置中，我们选择iGator（鳄鱼振荡器）指标。为了简单起见，清空鳄鱼指标参数的字段，这样它将使用默认参数构建。在这种情况下，直方图偏移量是5根柱线（向前），这在图表上可以清楚地看到。</p><p>未对未来偏移进行修正的UseDemoAll缓冲区中的鳄鱼指标数据</p><p>未对未来偏移进行修正的UseDemoAll缓冲区中的鳄鱼指标数据</p><p>黑色垂直线标记的是16:00的小时柱线。然而，数据窗口中的鳄鱼指标值和我们从同一指标读取到的数组中的值是不同的。UseDemoAll用黄色突出显示了包含无效数据的缓冲区。</p><p>如果我们检查向过去移动5根柱线的数据，即在11:00（橙色垂直线），我们会发现那里是鳄鱼指标在16:00输出的值。上下直方图的成对正确值分别用绿色和粉色突出显示。</p><p>为了解决这个问题，我们必须在UseDemoAll中添加一个输入变量，让用户指定图表偏移量，然后在调用CopyBuffer时对其进行修正。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input int IndicatorShift = 0; // 图表偏移量</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>int OnCalculate(ON_CALCULATE_STD_SHORT_PARAM_LIST)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   for(int k = 0; k &lt; m; ++k)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      const int n = buffers[k].copy(Handle, k,</span></span>
<span class="line"><span>         -IndicatorShift, rates_total - prev_calculated + 1);</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>不幸的是，从MQL5中无法找到第三方指标的PLOT_SHIFT属性。</p><p>让我们检查一下引入5的偏移量是如何解决鳄鱼指标（使用默认设置）的情况的。</p><p>对未来偏移进行调整后UseDemoAll缓冲区中的鳄鱼指标数据</p><p>对未来偏移进行调整后UseDemoAll缓冲区中的鳄鱼指标数据</p><p>现在，UseDemoAll在16:00柱线上的读数对应于来自鳄鱼指标的、来自虚拟未来5根柱线之后的实际数据（21:00处的淡紫色垂直线）。</p><p>你可能会想，为什么在鳄鱼指标窗口中只显示了2个缓冲区，而我们的有4个。关键在于，鳄鱼指标的彩色直方图使用了一个额外的缓冲区进行颜色编码。但只有两种颜色，红色和绿色，我们在数组中看到它们的值为0或1。</p><h2 id="删除指标实例-indicatorrelease" tabindex="-1">删除指标实例：IndicatorRelease <a class="header-anchor" href="#删除指标实例-indicatorrelease" aria-label="Permalink to &quot;删除指标实例：IndicatorRelease&quot;">​</a></h2><p>正如本章引言部分所述，终端会为每个创建的指标维护一个引用计数器，只要至少有一个 MQL 程序或图表在使用该指标，它就会保持运行状态。在 MQL 程序中，对指标的需求标志是一个有效的句柄。通常，我们在初始化时请求一个句柄，并在程序运行期间的算法中使用它，直到程序结束。</p><p>当程序卸载时，所有创建的唯一句柄会自动释放，即它们的计数器减 1（如果计数器达到零，这些指标也会从内存中卸载）。因此，无需显式释放句柄。</p><p>然而，在程序运行过程中，有时子指标会变得不再需要。此时，无用的指标会继续消耗资源。因此，必须使用 <code>IndicatorRelease</code> 显式释放句柄。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool IndicatorRelease(int handle)</span></span></code></pre></div><p>该函数会删除指定的指标句柄，如果没有其他程序使用该指标，还会卸载该指标本身。卸载操作会有轻微延迟。</p><p>函数返回操作成功（<code>true</code>）或出错（<code>false</code>）的指示。</p><p>调用 <code>IndicatorRelease</code> 后，传递给它的句柄将变得无效，尽管变量本身仍保留其先前的值。尝试在其他指标函数（如 <code>CopyBuffer</code>）中使用这样的句柄将失败，并返回错误代码 4807（<code>ERR_INDICATOR_WRONG_HANDLE</code>）。为避免误解，最好在释放句柄后立即将 <code>INVALID_HANDLE</code> 值赋给相应的变量。</p><p>但是，如果程序随后为新指标请求句柄，该句柄很可能与先前释放的句柄具有相同的值，但现在将与新指标的数据关联。</p><p>在策略测试器中工作时，<code>IndicatorRelease</code> 函数不会执行。</p><p>为了演示 <code>IndicatorRelease</code> 的应用，我们准备一个特殊版本的 <code>UseDemoAllLoop.mq5</code>，它将周期性地从列表中循环重新创建一个辅助指标，该列表仅包含主窗口的指标（为了清晰起见）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>IndicatorType MainLoop[] =</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   iCustom_,</span></span>
<span class="line"><span>   iAlligator_jawP_jawS_teethP_teethS_lipsP_lipsS_method_price,</span></span>
<span class="line"><span>   iAMA_period_fast_slow_shift_price,</span></span>
<span class="line"><span>   iBands_period_shift_deviation_price,</span></span>
<span class="line"><span>   iDEMA_period_shift_price,</span></span>
<span class="line"><span>   iEnvelopes_period_shift_method_price_deviation,</span></span>
<span class="line"><span>   iFractals_,</span></span>
<span class="line"><span>   iFrAMA_period_shift_price,</span></span>
<span class="line"><span>   iIchimoku_tenkan_kijun_senkou,</span></span>
<span class="line"><span>   iMA_period_shift_method_price,</span></span>
<span class="line"><span>   iSAR_step_maximum,</span></span>
<span class="line"><span>   iTEMA_period_shift_price,</span></span>
<span class="line"><span>   iVIDyA_momentum_smooth_shift_price,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>const int N = ArraySize(MainLoop);</span></span>
<span class="line"><span>int Cursor = 0; // MainLoop 数组中的当前位置</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>const string IndicatorCustom = &quot;LifeCycle&quot;;</span></span></code></pre></div><p>数组的第一个元素包含一个自定义指标 <code>LifeCycle</code>，这是个例外，它来自“不同类型程序启动和停止的特点”部分。虽然这个指标不显示任何线条，但它在这里很合适，因为当调用其 <code>OnInit</code>/<code>OnDeinit</code> 处理程序时，它会在日志中显示消息，这将使我们能够跟踪其生命周期。其他指标的生命周期类似。</p><p>在输入变量中，我们只保留渲染设置。<code>DRAW_ARROW</code> 标签的默认输出对于显示不同类型的指标是最优的。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input ENUM_DRAW_TYPE DrawType = DRAW_ARROW; // 绘图类型</span></span>
<span class="line"><span>input int DrawLineWidth = 1; // 绘图线宽</span></span></code></pre></div><p>为了“动态”重新创建指标，我们在 <code>OnInit</code> 中启动一个 5 秒的定时器，并将整个先前的初始化（有一些下面描述的修改）移到 <code>OnTimer</code> 处理程序中。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Comment(&quot;Wait 5 seconds to start looping through indicator set&quot;);</span></span>
<span class="line"><span>   EventSetTimer(5);</span></span>
<span class="line"><span>   return INIT_SUCCEEDED;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>IndicatorType IndicatorSelector; // 当前选择的指标类型</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>void OnTimer()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(Handle != INVALID_HANDLE &amp;&amp; ClearHandles)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      IndicatorRelease(Handle);</span></span>
<span class="line"><span>      /*</span></span>
<span class="line"><span>      // 句柄仍然是 10，但不再有效</span></span>
<span class="line"><span>      // 如果我们取消注释该片段，将得到以下错误</span></span>
<span class="line"><span>      double data[1];</span></span>
<span class="line"><span>      const int n = CopyBuffer(Handle, 0, 0, 1, data);</span></span>
<span class="line"><span>      Print(&quot;Handle=&quot;, Handle, &quot; CopyBuffer=&quot;, n, &quot; Error=&quot;, _LastError);</span></span>
<span class="line"><span>      // Handle=10 CopyBuffer=-1 Error=4807 (ERR_INDICATOR_WRONG_HANDLE)</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   IndicatorSelector = MainLoop[Cursor];</span></span>
<span class="line"><span>   Cursor = ++Cursor % N;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 使用默认参数创建句柄</span></span>
<span class="line"><span>   // （因为我们在构造函数的第三个参数中传递了空字符串）</span></span>
<span class="line"><span>   AutoIndicator indicator(IndicatorSelector,</span></span>
<span class="line"><span>      (IndicatorSelector == iCustom_ ? IndicatorCustom : &quot;&quot;), &quot;&quot;);</span></span>
<span class="line"><span>   Handle = indicator.getHandle();</span></span>
<span class="line"><span>   if(Handle == INVALID_HANDLE)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Print(StringFormat(&quot;Can&#39;t create indicator: %s&quot;,</span></span>
<span class="line"><span>         _LastError ? E2S(_LastError) : &quot;The name or number of parameters is incorrect&quot;));</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   else</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Print(&quot;Handle=&quot;, Handle);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   buffers.empty(); // 清空缓冲区，因为将显示新的指标</span></span>
<span class="line"><span>   ChartSetSymbolPeriod(0,NULL,0); // 请求完全重绘</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   // 图表的进一步设置 - 与之前类似</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   Comment(&quot;DemoAll: &quot;, (IndicatorSelector == iCustom_ ? IndicatorCustom : s),</span></span>
<span class="line"><span>      &quot;(default-params)&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>主要区别在于，当前创建的指标类型 <code>IndicatorSelector</code> 现在不是由用户设置，而是从 <code>MainLoop</code> 数组中按 <code>Cursor</code> 索引顺序选择。每次调用定时器时，该索引会循环增加，即当到达数组末尾时，我们会跳转到数组开头。</p><p>对于所有指标，参数行都是空的。这样做是为了统一它们的初始化。结果，每个指标将使用其自身的默认值创建。</p><p>在 <code>OnTimer</code> 处理程序的开头，我们为前一个句柄调用 <code>IndicatorRelease</code>。然而，我们提供了一个输入变量 <code>ClearHandles</code> 来禁用给定的 <code>if</code> 语句分支，并查看如果不清理句柄会发生什么。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>input bool ClearHandles = true;</span></span></code></pre></div><p>默认情况下，<code>ClearHandles</code> 等于 <code>true</code>，即指标将按预期被删除。</p><p>最后，另一个额外的设置是清空缓冲区和请求图表完全重绘的代码行。这两者都是必需的，因为我们替换了提供显示数据的从属指标。</p><p><code>OnCalculate</code> 处理程序没有改变。</p><p>让我们使用默认设置运行 <code>UseDemoAllLoop</code>。日志中将出现以下条目（仅显示开头部分）：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing LifeCycle() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=10</span></span>
<span class="line"><span>LifeCycle      (EURUSD,H1) Loader::Loader()</span></span>
<span class="line"><span>LifeCycle      (EURUSD,H1) void OnInit() 0 DEINIT_REASON_PROGRAM</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iAlligator_jawP_jawS_teethP_teethS_lipsP_lipsS_method_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iAlligator_jawP_jawS_teethP_teethS_lipsP_lipsS_method_price requires 8 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=10</span></span>
<span class="line"><span>LifeCycle      (EURUSD,H1) void OnDeinit(const int) DEINIT_REASON_REMOVE</span></span>
<span class="line"><span>LifeCycle      (EURUSD,H1) Loader::~Loader()</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iAMA_period_fast_slow_shift_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iAMA_period_fast_slow_shift_price requires 5 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=10</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iBands_period_shift_deviation_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iBands_period_shift_deviation_price requires 4 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=10</span></span>
<span class="line"><span>...</span></span></code></pre></div><p>注意，每次我们都会得到相同的句柄“编号”（10），因为我们在创建新句柄之前释放了旧句柄。</p><p>同样重要的是，<code>LifeCycle</code> 指标在我们释放它后不久就被卸载了（假设它没有被单独添加到同一个图表中，因为那样它的引用计数不会重置为零）。</p><p>下图显示了我们的指标渲染鳄鱼指标（Alligator）数据的时刻。</p><h3 id="usedemoallloop-在鳄鱼指标演示步骤中" tabindex="-1"><code>UseDemoAllLoop</code> 在鳄鱼指标演示步骤中 <a class="header-anchor" href="#usedemoallloop-在鳄鱼指标演示步骤中" aria-label="Permalink to &quot;\`UseDemoAllLoop\` 在鳄鱼指标演示步骤中&quot;">​</a></h3><p>如果将 <code>ClearHandles</code> 的值更改为 <code>false</code>，我们将在日志中看到完全不同的情况。句柄编号现在将不断增加，这表明指标仍留在终端中并继续运行，白白消耗资源。特别是，不会收到来自 <code>LifeCycle</code> 指标的反初始化消息。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing LifeCycle() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=10</span></span>
<span class="line"><span>LifeCycle      (EURUSD,H1) Loader::Loader()</span></span>
<span class="line"><span>LifeCycle      (EURUSD,H1) void OnInit() 0 DEINIT_REASON_PROGRAM</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iAlligator_jawP_jawS_teethP_teethS_lipsP_lipsS_method_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iAlligator_jawP_jawS_teethP_teethS_lipsP_lipsS_method_price requires 8 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=11</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iAMA_period_fast_slow_shift_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iAMA_period_fast_slow_shift_price requires 5 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=12</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iBands_period_shift_deviation_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iBands_period_shift_deviation_price requires 4 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=13</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iDEMA_period_shift_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iDEMA_period_shift_price requires 3 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=14</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iEnvelopes_period_shift_method_price_deviation() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iEnvelopes_period_shift_method_price_deviation requires 5 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=15</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iVIDyA_momentum_smooth_shift_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iVIDyA_momentum_smooth_shift_price requires 4 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=22</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing LifeCycle() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=10</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iAlligator_jawP_jawS_teethP_teethS_lipsP_lipsS_method_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iAlligator_jawP_jawS_teethP_teethS_lipsP_lipsS_method_price requires 8 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=11</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iAMA_period_fast_slow_shift_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iAMA_period_fast_slow_shift_price requires 5 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=12</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iBands_period_shift_deviation_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iBands_period_shift_deviation_price requires 4 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=13</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Initializing iDEMA_period_shift_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) iDEMA_period_shift_price requires 3 parameters, 0 given</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) Handle=14</span></span>
<span class="line"><span>UseDemoAllLoop (EURUSD,H1) void OnDeinit(const int)</span></span>
<span class="line"><span>...</span></span></code></pre></div><p>当指标类型数组循环中的索引到达最后一个元素并从开头重新开始时，终端将开始向我们的代码返回已存在指标的句柄（相同的值：句柄 22 之后又是 10）。</p><h2 id="通过句柄获取指标设置" tabindex="-1">通过句柄获取指标设置 <a class="header-anchor" href="#通过句柄获取指标设置" aria-label="Permalink to &quot;通过句柄获取指标设置&quot;">​</a></h2><p>有时候，MQL 程序需要了解正在运行的指标实例的参数。这些指标可以是图表上的第三方指标，或者是从主程序传递到库文件或头文件的句柄所对应的指标。为此，MQL5 提供了 <code>IndicatorParameters</code> 函数。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int IndicatorParameters(int handle, ENUM_INDICATOR &amp;type, MqlParam &amp;params[])</span></span></code></pre></div><p>该函数通过指定的句柄，返回指标输入参数的数量，以及它们的类型和值。</p><p>如果成功，函数会填充传递给它的 <code>params</code> 数组，并将指标类型保存在 <code>type</code> 参数中。</p><p>如果出现错误，函数返回 -1。</p><p>作为使用此函数的一个示例，我们来改进在“删除指标实例”部分中介绍的指标 <code>UseDemoAllLoop.mq5</code>。我们将新版本命名为 <code>UseDemoAllParams.mq5</code>。</p><p>你可能还记得，我们在循环中依次创建了列表中的一些内置指标，并将参数列表留空，这导致指标使用了一些未知的默认值。因此，我们在图表的注释中显示了一个通用的原型：只有名称，没有具体的值。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// UseDemoAllLoop.mq5</span></span>
<span class="line"><span>void OnTimer()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   Comment(&quot;DemoAll: &quot;, (IndicatorSelector == iCustom_ ? IndicatorCustom : s),</span></span>
<span class="line"><span>      &quot;(default-params)&quot;);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在，我们有机会根据指标句柄找出其参数，并将它们显示给用户。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// UseDemoAllParams.mq5</span></span>
<span class="line"><span>void OnTimer()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   ...   </span></span>
<span class="line"><span>   // 读取指标默认应用的参数</span></span>
<span class="line"><span>   ENUM_INDICATOR itype;</span></span>
<span class="line"><span>   MqlParam defParams[];</span></span>
<span class="line"><span>   const int p = IndicatorParameters(Handle, itype, defParams);</span></span>
<span class="line"><span>   ArrayPrint(defParams);</span></span>
<span class="line"><span>   Comment(&quot;DemoAll: &quot;, (IndicatorSelector == iCustom_ ? IndicatorCustom : s),</span></span>
<span class="line"><span>      &quot;(&quot; + MqlParamStringer::stringify(defParams) + &quot;)&quot;);</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>将 <code>MqlParam</code> 数组转换为字符串的功能在特殊类 <code>MqlParamStringer</code> 中实现（见文件 <code>MqlParamStringer.mqh</code>）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>class MqlParamStringer</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   static string stringify(const MqlParam &amp;param)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      switch(param.type)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>      case TYPE_BOOL:</span></span>
<span class="line"><span>      case TYPE_CHAR:</span></span>
<span class="line"><span>      case TYPE_UCHAR:</span></span>
<span class="line"><span>      case TYPE_SHORT:</span></span>
<span class="line"><span>      case TYPE_USHORT:</span></span>
<span class="line"><span>      case TYPE_DATETIME:</span></span>
<span class="line"><span>      case TYPE_COLOR:</span></span>
<span class="line"><span>      case TYPE_INT:</span></span>
<span class="line"><span>      case TYPE_UINT:</span></span>
<span class="line"><span>      case TYPE_LONG:</span></span>
<span class="line"><span>      case TYPE_ULONG:</span></span>
<span class="line"><span>         return IntegerToString(param.integer_value);</span></span>
<span class="line"><span>      case TYPE_FLOAT:</span></span>
<span class="line"><span>      case TYPE_DOUBLE:</span></span>
<span class="line"><span>         return (string)(float)param.double_value;</span></span>
<span class="line"><span>      case TYPE_STRING:</span></span>
<span class="line"><span>         return param.string_value;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      return NULL;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   static string stringify(const MqlParam &amp;params[])</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      string result = &quot;&quot;;</span></span>
<span class="line"><span>      const int p = ArraySize(params);</span></span>
<span class="line"><span>      for(int i = 0; i &lt; p; ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         result += stringify(params[i]) + (i &lt; p - 1 ? &quot;,&quot; : &quot;&quot;);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      return result;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>编译并运行新指标后，你可以确认现在图表左上角会显示正在渲染的指标的具体参数列表。</p><p>对于列表中的单个自定义指标（<code>LifeCycle</code>），第一个参数将包含指标的路径和文件名。第二个参数在源代码中被描述为整数。但第三个参数很有趣，因为它隐式描述了“应用于”属性，这是所有具有简短形式 <code>OnCalculate</code> 处理程序的指标所固有的。在这种情况下，默认情况下，指标应用于收盘价（<code>PRICE_CLOSE</code>，值为 1）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Initializing LifeCycle() EURUSD, PERIOD_H1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Handle=10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [type] [integer_value] [double_value] [string_value]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[0]     14               0        0.00000 &quot;Indicators\\MQL5Book\\p5\\LifeCycle.ex5&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[1]      7               0        0.00000 null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[2]      7               1        0.00000 null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Initializing iAlligator_jawP_jawS_teethP_teethS_lipsP_lipsS_method_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>iAlligator_jawP_jawS_teethP_teethS_lipsP_lipsS_method_price requires 8 parameters, 0 given</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Handle=10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [type] [integer_value] [double_value] [string_value]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[0]      7              13        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[1]      7               8        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[2]      7               8        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[3]      7               5        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[4]      7               5        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[5]      7               3        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[6]      7               2        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[7]      7               5        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>Initializing iAMA_period_fast_slow_shift_price() EURUSD, PERIOD_H1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>iAMA_period_fast_slow_shift_price requires 5 parameters, 0 given</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Handle=10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [type] [integer_value] [double_value] [string_value]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[0]      7               9        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[1]      7               2        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[2]      7              30        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[3]      7               0        0.00000 null          </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[4]      7               1        0.00000 null</span></span></code></pre></div><p>根据日志，内置指标的设置也符合默认值。</p><p>综上所述，<code>IndicatorParameters</code> 函数为我们提供了一种方便的方式来获取运行中指标的参数设置，并且通过 <code>MqlParamStringer</code> 类可以将这些参数以字符串形式显示出来，方便用户查看。这在开发和调试 MQL 程序时非常有用，能够让我们更清楚地了解指标的运行状态和参数配置。</p><h2 id="为指标定义数据源" tabindex="-1">为指标定义数据源 <a class="header-anchor" href="#为指标定义数据源" aria-label="Permalink to &quot;为指标定义数据源&quot;">​</a></h2><p>在MQL程序的内置变量中，有一个只能在指标中使用的变量。这就是int类型的_AppliedTo变量，它允许从指标设置对话框中读取“应用于”属性。此外，如果指标是通过调用iCustom函数创建的，并且向该函数传递了第三方指标的句柄，那么_AppliedTo变量将包含这个句柄。</p><p>下表描述了_AppliedTo变量的可能取值。</p><table tabindex="0"><thead><tr><th>值</th><th>用于计算的数据描述</th></tr></thead><tbody><tr><td>0</td><td>该指标使用OnCalculate的完整形式，并且计算数据不是由一个数据数组设置的</td></tr><tr><td>1</td><td>收盘价</td></tr><tr><td>2</td><td>开盘价</td></tr><tr><td>3</td><td>最高价</td></tr><tr><td>4</td><td>最低价</td></tr><tr><td>5</td><td>平均价 = (最高价 + 最低价)/2</td></tr><tr><td>6</td><td>典型价 = (最高价 + 最低价 + 收盘价)/3</td></tr><tr><td>7</td><td>加权价 = (开盘价 + 最高价 + 最低价 + 收盘价)/4</td></tr><tr><td>8</td><td>在该指标之前在图表上启动的指标的数据</td></tr><tr><td>9</td><td>最先在图表上启动的指标的数据</td></tr><tr><td>10及以上</td><td>_AppliedTo中包含的指标句柄对应的数据；在创建该指标时，这个句柄作为最后一个参数传递给了iCustom函数</td></tr></tbody></table><p>为了便于分析这些值，本书附带了一个头文件AppliedTo.mqh，其中包含了相关的枚举。</p>`,455)]))}const g=n(i,[["render",t]]);export{u as __pageData,g as default};
