import{_ as a,c as n,ag as e,o as p}from"./chunks/framework.BhgIN1sM.js";const g=JSON.parse('{"title":"语句","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/mq5_programming_for_traders/mql5_programming_fundamentals/statements"}],["meta",{"property":"og:title","content":"语句"}]]},"headers":[],"relativePath":"mq5_programming_for_traders/mql5_programming_fundamentals/statements.md","filePath":"mq5_programming_for_traders/mql5_programming_fundamentals/statements.md"}'),i={name:"mq5_programming_for_traders/mql5_programming_fundamentals/statements.md"};function l(c,s,t,o,d,h){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="语句" tabindex="-1">语句 <a class="header-anchor" href="#语句" aria-label="Permalink to &quot;语句&quot;">​</a></h1><p>到目前为止，我们已经学习了数据类型、变量声明以及它们在计算表达式中的运用。不过，这些仅仅是可类比为程序这座大厦的小砖块。即便是最简单的程序，也是由更大的代码块构成的，这些代码块能将相关的数据处理操作进行分组，并控制其执行顺序。这些代码块就被称作语句，实际上我们已经使用过其中一些了。</p><p>具体而言，变量（或多个变量）的声明就是一条语句。将表达式的求值结果赋给一个变量同样也是一条语句。严格来讲，赋值操作本身是表达式的一部分，所以更准确地说，这类语句应被称为表达式语句。顺便提一下，表达式可能并不包含赋值运算符（例如，若它仅仅调用某个不返回值的函数，像 <code>Print(&quot;Hello&quot;);</code> 这样）。</p><p>程序的执行就是逐步执行语句：按照从上到下、从左到右的顺序（如果一行中有多条语句）。在最简单的情形下，语句是按线性顺序依次执行的。但对于大多数程序而言，这样是不够的，因此就有了各种各样的控制语句。这些控制语句能让我们在程序中组织循环（重复计算），还能根据条件来选择算法的操作选项。</p><p>语句是一种特殊的语法结构，代表着按照规则编写的源代码文本。特定类型的语句有其自身的规则，但也存在一些共性。除了复合语句外，所有类型的语句都以分号 <code>;</code> 结尾。复合语句可以不用分号，因为它的起始和结束是由一对花括号来界定的。值得注意的是，借助复合语句，我们能够把一组语句包含在其他语句内部，从而构建出任意的算法层次结构。</p><p>在本章中，我们将了解 MQL5 所有类型的控制语句，同时巩固声明语句和表达式语句的特性。</p><h2 id="复合语句-代码块" tabindex="-1">复合语句（代码块） <a class="header-anchor" href="#复合语句-代码块" aria-label="Permalink to &quot;复合语句（代码块）&quot;">​</a></h2><p>复合语句是用花括号 <code>{</code> 和 <code>}</code> 括起来的其他语句的通用容器。这样的代码块可用于定义函数体；当其他控制语句需要控制多条语句时，可放在这些控制语句的头部之后；或者仅仅作为函数体或其他语句内部的一个嵌套块独立存在。这使得你可以为变量创建一个局部的、有范围限制的作用域。我们在“变量的上下文、作用域和生命周期”这一节中已经讨论过这个问题。</p><p>从广义上讲，复合语句可以描述如下：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    [语句]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在这样的示意图描述中，任何用方括号括起来的片段表示它是可选的。在这种情况下，代码块内部可能没有任何嵌套语句。</p><p>在接下来的章节中，我们将了解复合语句如何与其他类型的语句结合使用，以及它们可以包含哪些内容。</p><p>有一个细微的差别值得强调：在复合语句的描述结束后，不需要分号 <code>;</code>。这一点将它与所有其他语句区分开来。</p><h2 id="声明-定义语句" tabindex="-1">声明/定义语句 <a class="header-anchor" href="#声明-定义语句" aria-label="Permalink to &quot;声明/定义语句&quot;">​</a></h2><p>变量、数组、函数或程序中任何其他具名元素（包括结构体和类，这将在第三部分讨论）的声明都是一条语句。</p><p>声明必须包含元素的类型和标识符（请参阅“声明和定义变量”），以及用于初始化的可选初始值。此外，在声明时，可以指定额外的修饰符来改变元素的某些特性。特别是，我们已经知道了 <code>static</code> 和 <code>const</code> 修饰符，很快还会介绍更多修饰符。数组需要额外指定维度和元素数量（请参阅“数组的描述”），而函数则需要参数列表（更多详细信息请参阅“函数”）。</p><p>变量声明语句可以总结如下：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>[修饰符] 标识符 类型 [= 初始化表达式] ;</span></span></code></pre></div><p>对于数组，其形式如下：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>[修饰符] 标识符 类型 [ [size_1]ᵒᵖᵗ ] [ [size_N] ]ᵒᵖᵗ(3) [ = { 初始化列表 } ]ᵒᵖᵗ ;</span></span></code></pre></div><p>主要区别在于必须至少有一对方括号（方括号内的大小可以指定也可以不指定；根据这一点，我们得到的是固定数组或动态分配的数组）。总共最多允许 4 对方括号（4 是支持的最大维度数）。</p><p>在许多情况下，声明可以同时充当定义，也就是说，它为元素预留内存，确定其行为，并使其能够在程序中使用。具体来说，变量或数组的声明也是定义。从这个角度来看，声明语句同样可以称为定义语句，但这尚未成为普遍的做法。</p><p>我们对函数的基本知识足以合理地推测出它们的定义应该是什么样子：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>类型 标识符 ( [参数列表] )</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  [语句]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>类型、标识符和参数列表构成了函数头。</p><p>请注意，这是一个定义，因为此描述既包含函数的外部属性（接口），又包含定义其内部本质（实现）的语句。后者是通过一对花括号形成的代码块来完成的，该代码块紧跟在函数头之后。正如你可能猜到的，这是我们在上一节中提到的复合语句的一个示例。在这种情况下，术语上的同义反复是不可避免的，因为这是完全合理的：复合语句是函数定义语句的一部分。</p><p>稍后，我们将了解为什么以及如何将接口描述与实现分离，从而实现函数声明而不进行定义。我们还将以类为例展示声明和定义之间的区别。</p><p>声明语句使新元素在包含该语句的代码块的上下文中（请参阅“变量的上下文、作用域和生命周期”）可以通过其名称使用。回想一下，代码块形成了对象（变量、数组）的局部作用域。在本书的第一部分，我们在描述问候函数时遇到过这种情况。</p><p>除了局部作用域之外，总是存在一个全局作用域，在其中你也可以使用声明语句来创建在程序的任何地方都可访问的元素。</p><p>如果声明语句中没有 <code>static</code> 修饰符，并且它位于某个局部代码块中，那么相应的元素将在语句执行时创建并初始化（严格来说，为了提高效率，函数内部的所有局部变量在进入函数时会立即分配内存，但此时它们尚未形成）。</p><p>例如，在 <code>OnStart</code> 函数开头对变量 <code>i</code> 的以下声明可确保一旦函数获得控制权（即终端会调用它，因为它是脚本的主函数），就会使用指定的初始值（0）创建这样一个变量。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int i = 0;</span></span>
<span class="line"><span>   Print(i);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 错误：&#39;j&#39; - 未声明的标识符</span></span>
<span class="line"><span>   // Print(j); </span></span>
<span class="line"><span>   int j = 1;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>由于在第一条语句中的声明，变量 <code>i</code> 在函数的后续行中是已知且可用的，特别是在调用 <code>Print</code> 函数的第二行中，该函数会在日志中显示变量的内容。</p><p>在函数最后一行中描述的变量 <code>j</code> 将在函数结束前创建（当然，这没有实际意义，但很清楚）。因此，在该函数的所有先前行中，这个变量都是未知的。尝试使用注释掉的 <code>Print</code> 调用来将 <code>j</code> 输出到日志中会导致“未声明的标识符”编译错误。</p><p>以这种方式声明的元素（在代码块内部且没有 <code>static</code> 修饰符）称为自动变量，因为程序在进入代码块时会自动为它们分配内存，并在退出代码块时销毁它们（在我们的示例中，是在退出函数之后）。因此，发生这种情况的内存区域称为堆栈（“后进先出”）。</p><p>自动元素按照声明语句的执行顺序创建（先 <code>i</code>，然后 <code>j</code>）。销毁则按相反的顺序进行（先 <code>j</code>，然后 <code>i</code>）。</p><p>如果声明一个变量但未进行初始化，并且在后续语句中（例如在 <code>=</code> 符号右侧）开始使用它，而没有首先向其中写入有意义的值，编译器会发出警告：“可能使用未初始化的变量”。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int i, p;</span></span>
<span class="line"><span>   i = p; // 警告：可能使用未初始化的变量 &#39;p&#39;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果声明语句带有 <code>static</code> 修饰符，相应的元素仅在该语句第一次执行时创建一次，并且会一直保留在内存中，无论是否退出以及后续可能在同一代码块中的进入和退出情况。所有这些静态成员只有在程序卸载时才会被移除。</p><p>尽管静态变量的生命周期延长了，但它们的作用域仍然限于定义它们的局部上下文，并且只能从后续语句（在代码中位于下方）访问。</p><p>相比之下，全局上下文中的声明语句在程序加载后（在调用任何标准启动函数之前，例如脚本的 <code>OnStart</code> 函数），会按照它们在源代码中出现的顺序创建其元素。全局对象在程序卸载时按相反的顺序删除。</p><p>为了演示上述内容，让我们创建一个更“巧妙”的示例（<code>StmtDeclaration.mq5</code>）。回顾在第一部分学到的知识，除了 <code>OnStart</code> 函数之外，我们还将编写一个简单的函数 <code>Init</code>，它将用于变量初始化表达式中，并在日志中记录调用顺序。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int Init(const int v)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(&quot;Init: &quot;, v);</span></span>
<span class="line"><span>   return v;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>Init</code> 函数接受一个整数类型 <code>int</code> 的单个参数 <code>v</code>，其值会返回给调用代码（<code>return</code> 语句）。</p><p>这使得可以将它用作设置变量初始值的包装器，例如对于两个全局变量：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int k = Init(-1);</span></span>
<span class="line"><span>int m = Init(-2);</span></span></code></pre></div><p>通过调用函数并从函数返回，传递的参数值会进入变量 <code>k</code> 和 <code>m</code>。然而，在 <code>Init</code> 函数内部，我们还使用 <code>Print</code> 输出了该值，因此我们可以跟踪变量是如何创建的。</p><p>请注意，我们不能在 <code>Init</code> 函数定义上方的全局变量初始化中使用 <code>Init</code> 函数。如果我们尝试将变量 <code>k</code> 的声明移到 <code>Init</code> 声明上方，我们会得到错误“&#39;Init&#39; 是未知标识符”。此限制仅适用于全局变量的初始化，因为函数也是全局定义的，并且编译器会一次性构建此类标识符的列表。在所有其他情况下，代码中函数定义的顺序并不重要，因为编译器首先会将它们全部注册到内部列表中，然后再从代码块中相互链接它们的调用。特别是，你可以将整个 <code>Init</code> 函数以及全局变量 <code>k</code> 和 <code>m</code> 的声明移到 <code>OnStart</code> 函数下方——这不会破坏任何东西。</p><p>在 <code>OnStart</code> 函数内部，我们将使用 <code>Init</code> 再描述几个变量：局部变量 <code>i</code> 和 <code>j</code>，以及静态变量 <code>n</code>。为简单起见，给所有变量赋予唯一的值，以便能够区分它们。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(k);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   int i = Init(1);</span></span>
<span class="line"><span>   Print(i);</span></span>
<span class="line"><span>   // 错误：&#39;n&#39; - 未声明的标识符</span></span>
<span class="line"><span>   // Print(n);</span></span>
<span class="line"><span>   static int n = Init(0);</span></span>
<span class="line"><span>   // 错误：&#39;j&#39; - 未声明的标识符</span></span>
<span class="line"><span>   // Print(j);</span></span>
<span class="line"><span>   int j = Init(2);</span></span>
<span class="line"><span>   Print(j);</span></span>
<span class="line"><span>   Print(n);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里的注释显示了在定义相关变量之前调用它们的错误尝试。</p><p>运行脚本，得到以下日志：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Init: -1</span></span>
<span class="line"><span>Init: -2</span></span>
<span class="line"><span>-1</span></span>
<span class="line"><span>Init: 1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Init: 0</span></span>
<span class="line"><span>Init: 2</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>0</span></span></code></pre></div><p>正如我们所看到的，全局变量在 <code>OnStart</code> 函数被调用之前就已初始化，并且完全按照它们在代码中出现的顺序进行初始化。内部变量的创建顺序与它们的声明语句的编写顺序相同。</p><p>如果定义了一个变量但在任何地方都未使用它，编译器会发出“变量 &#39;名称&#39; 未使用”的警告。这是潜在编程错误的一个迹象。</p><p>提前说明一下，借助声明/定义语句，不仅可以将数据元素（变量、数组）或函数引入程序，还可以引入我们尚未了解的新的用户定义类型（结构体、类、模板、命名空间）。这样的语句只能在全局级别进行，也就是说，在所有函数之外。</p><p>也不可能在一个函数内部定义另一个函数。以下代码将无法编译：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int Init(const int v)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Print(&quot;Init: &quot;, v);</span></span>
<span class="line"><span>      return v;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   int i = 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译器将生成错误：“函数声明仅允许在全局、命名空间或类作用域中进行”。</p><h2 id="简单语句-表达式" tabindex="-1">简单语句（表达式） <a class="header-anchor" href="#简单语句-表达式" aria-label="Permalink to &quot;简单语句（表达式）&quot;">​</a></h2><p>简单语句包含表达式，例如为变量赋值新的值或计算结果，以及函数调用。</p><p>从形式上看，其语法如下：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>表达式 ;</span></span></code></pre></div><p>这里末尾的分号很重要。由于 MQL5 源代码支持自由格式排版，分号 <code>;</code> 是唯一能告知编译器前一条语句结束、下一条语句开始的分隔符。通常情况下，语句会写在单独的行上，例如：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int i = 0, j = 1, k;   // 声明语句</span></span>
<span class="line"><span>++i;                   // 简单语句</span></span>
<span class="line"><span>j += i;                // 简单语句</span></span>
<span class="line"><span>k = (i + 1) * (j + 1); // 简单语句</span></span>
<span class="line"><span>Print(i, &quot; &quot;, j);      // 简单语句</span></span></code></pre></div><p>然而，规则并不禁止编写简写代码：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int i=0,j=1;++i;j+=i;k=(i+1)*(j+1);Print(i,&quot; &quot;,j);</span></span></code></pre></div><p>如果没有分号 <code>;</code>，相邻的表达式可能会悄然“粘连”在一起，从而导致意外的结果。例如，表达式 <code>x = y - 10 * z</code> 很可能是两个表达式：<code>x = y;</code> 和 <code>-10 * z;</code>（<code>-10</code> 带有一元负号）。这怎么可能呢？</p><p>事实上，从语法角度讲，编写一条实际上无实际作用（即不保存结果）的语句是允许的。这里还有另一个例子：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>i + j; // 警告：表达式无效果</span></span></code></pre></div><p>编译器会发出“表达式无效果”的警告。之所以有构造这种表达式的可能性是必要的，因为我们将在第三部分学习的对象类型允许运算符重载，也就是说，我们可以用某些特定操作来替代运算符符号的常规含义。那么，如果 <code>i</code> 和 <code>j</code> 的类型不是 <code>int</code>，而是某个重载了加法操作的类，这样的表示就会有效果，编译器也不会发出警告。</p><p>简单语句只能写在复合语句内部。例如，在函数外部调用 <code>Print</code> 函数是行不通的：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Print(&quot;Hello &quot;, Symbol());</span></span>
<span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们将会得到一连串的错误：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>&#39;Print&#39; - 意外的标记，可能缺少类型？</span></span>
<span class="line"><span>&#39;Hello, &#39; - 声明无类型</span></span>
<span class="line"><span>&#39;Hello, &#39; - 期望逗号</span></span>
<span class="line"><span>&#39;Symbol&#39; - 声明无类型</span></span>
<span class="line"><span>&#39;(&#39; - 期望逗号</span></span>
<span class="line"><span>&#39;)&#39; - 期望分号</span></span>
<span class="line"><span>&#39;)&#39; - 不允许在全局作用域中使用表达式</span></span></code></pre></div><p>在这种情况下，最关键的是最后一条错误：“不允许在全局上下文中使用表达式”。</p><h2 id="控制语句概述" tabindex="-1">控制语句概述 <a class="header-anchor" href="#控制语句概述" aria-label="Permalink to &quot;控制语句概述&quot;">​</a></h2><p>控制语句旨在组织其他语句（包括声明语句、表达式语句和嵌套的控制语句）的非线性执行。控制语句可分为三种类型：</p><ol><li><strong>重复语句，即循环语句</strong></li><li><strong>条件语句，用于从多个可选操作分支中选择其一</strong></li><li><strong>跳转语句，必要时可改变前两种类型语句的标准行为</strong></li></ol><p>循环语句和选择语句都由一个语句头（每种语句头的语法各不相同）以及其后的受控语句组成。如果受控部分需要指定多条语句，则使用复合语句。跳转语句不具备此特性。跳转语句仅根据特殊规则移动内部指针，程序依据该指针来确定当前要执行的语句，我们将在后续章节中讨论这些规则。</p><p>在最简单的情况下，没有控制语句时，语句会按照它们在代码块（特别是对于脚本而言，在主函数 <code>OnStart</code> 的函数体中）中编写的顺序依次执行。如果在代码块中遇到一个调用其他函数的表达式，程序会按照同样的线性原则，开始执行被调用函数内部的语句，当这些语句全部执行完毕后，程序会返回到调用代码块，并从函数调用之后的下一条语句继续执行。控制语句能够显著改变这种工作逻辑。</p><p>你可以在循环中使用选择语句，反之亦然，并且嵌套层级没有限制。然而，过多的嵌套会使程序员难以理解程序。因此，建议将代码块划分（转移）到函数中（一个或多个）：在每个函数内部，保持不超过 2 到 3 层的嵌套层级是比较合理的。</p><p>MQL5 支持以下重复语句：</p><ol><li><strong><code>for</code> 循环</strong></li><li><strong><code>while</code> 循环</strong></li><li><strong><code>do</code> 循环</strong></li></ol><p>所有循环都允许一条或多条语句被执行指定的次数，或者执行到满足某个布尔条件为止。循环内容的一次执行被称为一次迭代。通常情况下，会在循环中处理数组，或者执行周期性的重复操作（通常在脚本或服务中）。</p><p>条件语句包括：</p><ol><li><strong><code>if</code> 选择语句</strong></li><li><strong><code>switch</code> 选择语句</strong></li></ol><p>前者允许指定一个或多个条件，根据这些条件的真假来执行为其分配的选项（一条或多条语句）。后者计算一个整数类型的表达式，并根据其值从多个可选分支中选择其一。</p><p>最后，跳转语句包括：</p><ol><li><strong><code>break</code> 语句</strong></li><li><strong><code>continue</code> 语句</strong></li><li><strong><code>return</code> 语句</strong></li></ol><p>稍后我们将详细讨论每一种跳转语句。</p><p>与 C++ 不同，MQL5 没有 <code>goto</code> 语句。</p><h2 id="for-循环" tabindex="-1"><code>for</code> 循环 <a class="header-anchor" href="#for-循环" aria-label="Permalink to &quot;\`for\` 循环&quot;">​</a></h2><p>这种循环是通过带有 <code>for</code> 关键字的语句来实现的，因此得名。从广义上讲，它可以描述如下：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for ( [初始化] ; [条件] ; [表达式] )</span></span>
<span class="line"><span>  循环体</span></span></code></pre></div><p>在 <code>for</code> 关键字后面的语句头部分，括号中包含以下内容：</p><ol><li><strong>初始化</strong>：在循环开始前进行一次性初始化的语句；</li><li><strong>条件</strong>：一个布尔条件，在每次迭代开始时进行检查，只要该条件为真，循环就会继续执行；</li><li><strong>表达式</strong>：在每次迭代结束时（当循环体中的所有语句都执行完后）执行的计算表达式。</li></ol><p>循环体可以是简单语句，也可以是复合语句。</p><p>语句头的这三个部分都是可选的，可以以任意组合方式省略，甚至可以全部省略。</p><p>初始化可以包括变量的声明（同时设置初始值），或者对已存在变量进行赋值。这样的变量被称为循环变量。如果它们在语句头中声明，那么它们的作用域和生命周期将仅限于该循环。</p><p>如果在初始化之后，条件为真，循环就会开始执行，并且只要在每次后续迭代开始时条件都为真，循环就会继续执行。如果在下次检查时，条件不成立，循环就会退出，即控制转移到循环及其循环体之后的语句。如果在循环开始前（初始化之后）条件就为假，那么循环将永远不会被执行。</p><p>条件和表达式通常包含循环变量。</p><p>执行循环意味着执行其循环体。</p><p><code>for</code> 循环最常见的形式是使用单个循环变量来控制迭代次数。在下面的示例中，我们计算数组 <code>a</code> 中各元素的平方：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int a[] = {1, 2, 3, 4, 5, 6, 7};</span></span>
<span class="line"><span>const int n = ArraySize(a);</span></span>
<span class="line"><span>for(int i = 0; i &lt; n; ++i)</span></span>
<span class="line"><span>   a[i] = a[i] * a[i];</span></span>
<span class="line"><span>ArrayPrint(a);    // 1  4  9 16 25 36 49</span></span>
<span class="line"><span>// Print(i);</span><span>      // 错误：&#39;i&#39; - 未声明的标识符</span></span></code></pre></div><p>这个循环按以下步骤执行：</p><ol><li>创建一个初始值为 0 的变量 <code>i</code>。</li><li>检查变量 <code>i</code> 是否小于循环的大小 <code>n</code>。只要条件为真，循环就继续执行。如果条件为假，我们跳转到调用 <code>ArrayPrint</code> 函数的语句。</li><li>如果条件为真，执行循环体中的语句。在这种情况下，数组的第 <code>i</code> 个元素会被赋值为该元素初始值的平方，即每个元素的值被替换为其平方。</li><li>变量 <code>i</code> 自增 1。</li><li>然后从步骤 2 开始重复上述过程。循环退出后，循环变量 <code>i</code> 会被销毁，尝试访问它将导致错误。</li></ol><p>步骤 4 中的表达式可以具有任意的复杂性，而不仅仅是循环变量的递增。例如，要遍历偶数或奇数元素，可以写成 <code>i += 2</code>。</p><p>无论循环体由多少条语句组成，都建议将其与语句头写在不同的行上。这使得逐步调试过程更加容易。</p><p>初始化可以包括多个变量的声明，但它们必须是相同的类型，因为它们是一条语句。例如，要将数组元素逆序排列，可以编写这样的循环（这只是循环的一个演示，有内置函数 <code>ArrayReverse</code> 可以实现数组的逆序，详见“复制和编辑数组”）：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for(int i = 0, j = n - 1; i &lt; n / 2; ++i, --j)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   int temp = a[i];</span></span>
<span class="line"><span>   a[i] = a[j];</span></span>
<span class="line"><span>   a[j] = temp;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>ArrayPrint(a);    // 49 36 25 16  9  4  1</span></span></code></pre></div><p>辅助变量 <code>temp</code> 在每次循环迭代时创建和删除，但编译器在进入函数时，只会为它（以及所有局部变量）分配一次内存。这种优化对于内置类型效果很好。然而，如果在循环中描述了一个自定义类对象，那么它的构造函数和析构函数将在每次迭代时被调用。</p><p>在循环体中改变循环变量是可行的，但这种技巧只在非常特殊的情况下使用。不建议这样做，因为这可能会导致错误（特别是，可能会跳过要处理的元素，或者执行进入无限循环）。</p><p>为了演示省略语句头部分的能力，让我们考虑以下问题：我们需要找到同一个数组中元素之和小于 100 的元素个数。为此，我们需要在循环前定义一个计数器变量 <code>k</code>，因为它在循环结束后必须继续存在。我们还将创建变量 <code>sum</code> 来累计计算元素之和。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int k = 0, sum = 0;</span></span>
<span class="line"><span>for( ; sum &lt; 100; )</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  sum += a[k++];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>Print(k - 1, &quot; &quot;, sum - a[k - 1]); // 2 85</span></span></code></pre></div><p>因此，不需要在语句头中进行初始化。此外，<code>k</code> 计数器在计算和的表达式（在访问数组元素时）中直接使用后缀自增运算符进行递增。所以，我们在语句头中不需要表达式部分。</p><p>在循环结束时，我们打印出 <code>k</code> 和 <code>sum</code> 减去最后添加的元素的值，因为正是这个元素使得总和超过了我们设定的 100 的限制。</p><p>请注意，即使循环体中只有一条语句，我们仍然使用了复合代码块。这是很有用的，因为当程序规模扩大时，在括号内添加额外的语句就变得很方便。此外，这种方法保证了所有循环的风格统一。但无论如何，选择的权利在程序员手中。</p><p>在最明确、最简化的版本中，循环语句头可能如下所示：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for( ; ; )</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // ...</span><span>       // 周期性操作</span></span>
<span class="line"><span>   Sleep(1000); // 暂停程序 1 秒</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果这样的循环体中没有任何语句会因为某些条件而中断循环，它将无限执行。我们将分别在“<code>break</code> 跳转”和“<code>if</code> 选择”中学习如何中断循环和测试条件。</p><p>这种循环算法通常用于服务程序（它们旨在持续的后台运行）中，以监控终端或外部网络资源的状态。它们通常包含以指定间隔暂停程序的语句，例如使用内置函数 <code>Sleep</code>。如果没有这种预防措施，无限循环将使一个处理器核心负载达到 100%。</p><p>脚本 <code>StmtLoopsFor.mq5</code> 的末尾包含一个无限循环，但它仅用于演示目的：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for( ; ; )</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Comment(GetTickCount());</span></span>
<span class="line"><span>   Sleep(1000); // 1000 毫秒</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>   // 只能通过用户命令删除脚本来退出循环</span></span>
<span class="line"><span>   // 等待 3 秒后，我们将得到消息 &#39;异常终止&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Comment(&quot;&quot;);  // 这行代码永远不会被执行</span></span></code></pre></div><p>在循环中，每秒会使用 <code>Comment</code> 函数显示计算机的内部计时器（<code>GetTickCount</code>）的值：该值显示在图表的左上角。只有用户通过从图表中删除整个脚本（“专家”对话框中的“删除”按钮）才能中断循环。这段代码在循环内部没有检查用户的停止请求，尽管有一个内置函数 <code>IsStopped</code> 用于此目的。如果用户发出了停止命令，该函数将返回 <code>true</code>。在程序中，特别是如果有循环和长时间的计算，最好检查这个函数的值，并在收到 <code>true</code> 时自愿终止循环和整个程序。否则，终端将在等待 3 秒后强制终止脚本（并在日志中输出“异常终止”），就像在这个示例中一样。</p><p>这个循环的更好版本应该是：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for( ; !IsStopped(); ) // 继续执行，直到用户中断</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Comment(GetTickCount());</span></span>
<span class="line"><span>   Sleep(1000); // 1000 毫秒</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Comment(&quot;&quot;);    // 将清除注释</span></span></code></pre></div><p>然而，这个循环使用另一个重复语句 <code>while</code> 来实现会更好。一般来说，<code>for</code> 循环应该只在有明显的循环变量和/或预定迭代次数的情况下使用。在这种情况下，这些条件不满足。</p><p>循环变量通常是整数，不过也允许其他类型，比如 <code>double</code> 类型。这是因为循环操作的逻辑本身就意味着对迭代进行编号。此外，总是可以从整数索引计算出所需的实数，并且精度更高。例如，以下循环以 0.01 的增量遍历从 0.0 到 1.0 的值：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for(double x = 0.0; x &lt; 1.0; x += 0.01) { ... }</span></span></code></pre></div><p>它可以被一个类似的带有整数变量的循环所替代：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for(int i = 0; i &lt; 100; ++i) { double x = i * 0.01; ... }</span></span></code></pre></div><p>在第一种情况下，当执行 <code>x += 0.01</code> 时，浮点计算的误差会逐渐积累。在第二种情况下，每个值 <code>x</code> 都是通过一次 <code>i * 0.01</code> 操作得到的，具有最大的可用精度。</p><p>习惯上给循环变量使用以下单字母名称，例如 <code>i</code>、<code>j</code>、<code>k</code>、<code>m</code>、<code>p</code>、<code>q</code>。当循环嵌套，或者在同一个循环中同时计算正向（递增）和反向（递减）索引时，就需要多个名称。</p><p>顺便说一下，这里有一个嵌套循环的示例。以下代码计算乘法表并将其存储在一个二维数组中：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int table[10][10] = {0};</span></span>
<span class="line"><span>for(int i = 1; i &lt;= 10; ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   for(int j = 1; j &lt;= 10; ++j)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      table[i - 1][j - 1] = i * j;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>ArrayPrint(table);</span></span></code></pre></div><h2 id="while-循环" tabindex="-1"><code>while</code> 循环 <a class="header-anchor" href="#while-循环" aria-label="Permalink to &quot;\`while\` 循环&quot;">​</a></h2><p>这种循环使用 <code>while</code> 关键字来描述。只要其语句头中的逻辑表达式为真，它就会重复执行受控语句。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>while ( 条件 )</span></span>
<span class="line"><span>  循环体</span></span></code></pre></div><p>条件是一个任意的布尔类型表达式。条件必须存在。如果在循环开始前条件就为假，那么循环将永远不会执行。</p><p>与 C++ 不同，MQL5 不支持在 <code>while</code> 循环的语句头中定义变量。</p><p>条件中包含的变量必须在循环之前定义。</p><p>循环体可以是简单语句，也可以是复合语句。</p><p><code>while</code> 循环通常用于迭代次数不确定的情况。因此，一个每秒输出计算机计时器计数值的循环示例可以使用 <code>while</code> 循环并检查停止标志（通过调用 <code>IsStopped</code> 函数）来编写，如下所示（<code>StmtLoopsWhile.mq5</code>）：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>while(!IsStopped())</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Comment(GetTickCount());</span></span>
<span class="line"><span>   Sleep(1000);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Comment(&quot;&quot;);</span></span></code></pre></div><p>此外，当循环终止条件可以与变量的修改合并在一个表达式中时，<code>while</code> 循环很方便。下面的循环会一直执行，直到变量 <code>i</code> 变为零（0 被视为假）。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int i = 5;</span></span>
<span class="line"><span>while(--i) // 警告：表达式不是布尔类型</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(i);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然而，在这种情况下，语句头中的表达式不是布尔类型（并且会被隐式转换为真或假）。编译器会生成相应的警告。最好始终根据（规则所规定的）预期特性来编写表达式。以下是正确的循环版本：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int i = 5;</span></span>
<span class="line"><span>while(--i &gt; 0)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(i);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>该循环也可以与简单语句（无代码块）一起使用：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>while(i &lt; 10)</span></span>
<span class="line"><span>   Print(++i);</span></span></code></pre></div><p>请注意，简单语句以分号结尾。这也表明在语句头中被检查的变量的修改是在循环内部完成的。</p><p>在使用循环时，使用无符号整数要小心。例如，下面的循环将永远不会结束，因为其条件始终为真（理论上，编译器可以在这种地方发出警告，但它没有）。在变为零之后，计数器会“变成”一个很大的正数（<code>UINT_MAX</code>），然后循环会继续执行。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>uint i = 5;</span></span>
<span class="line"><span>while(--i &gt;= 0)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(i);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从用户的角度来看，MQL 程序会冻结（停止响应命令），尽管它仍会消耗资源（处理器和内存）。</p><p><code>while</code> 循环可以像其他类型的重复语句一样进行嵌套。</p><h2 id="do-循环" tabindex="-1"><code>do</code> 循环 <a class="header-anchor" href="#do-循环" aria-label="Permalink to &quot;\`do\` 循环&quot;">​</a></h2><p>这种循环与 <code>while</code> 循环类似，但其条件是在循环体执行之后进行检查的。正因如此，受控语句至少会执行一次。</p><p>使用 <code>do</code> 和 <code>while</code> 这两个关键字来描述该循环：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>do</span></span>
<span class="line"><span>  循环体</span></span>
<span class="line"><span>while ( 条件 ) ;</span></span></code></pre></div><p>这样，循环的语句头是分开的，括号内的逻辑条件之后应该有一个分号。条件不能省略。当条件变为假时，循环退出。</p><p>条件中包含的变量必须在循环之前定义。</p><p>循环体可以是简单语句，也可以是复合语句。</p><p>以下示例计算从 1 开始的一个数字序列，序列中每个后续数字是前一个数字乘以预定义常量 <code>M_SQRT2</code>（2 的平方根）得到的（<code>StmtLoopsDo.mq5</code>）：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>double d = 1.0;</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(d);</span></span>
<span class="line"><span>   d *= M_SQRT2;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>while(d &lt; 100.0);</span></span></code></pre></div><p>当数字超过 100 时，该过程终止。</p><h2 id="if-选择语句" tabindex="-1"><code>if</code> 选择语句 <a class="header-anchor" href="#if-选择语句" aria-label="Permalink to &quot;\`if\` 选择语句&quot;">​</a></h2><p><code>if</code> 语句有几种形式。最简单的形式是，若指定条件为真，则执行相关语句：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>if ( 条件 )</span></span>
<span class="line"><span>  语句</span></span></code></pre></div><p>若条件为假，该语句会被跳过，执行流程会立刻跳转到算法的后续部分（如果有后续语句的话）。</p><p>语句可以是简单语句，也可以是复合语句。条件是一个布尔类型或者可转换为布尔类型的表达式。</p><p>第二种形式允许指定两个操作分支：不仅针对条件为真的情况（语句 A），也针对条件为假的情况（语句 B）：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>if ( 条件 )</span></span>
<span class="line"><span>  语句 A</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  语句 B</span></span></code></pre></div><p>无论执行哪一个受控语句，算法随后都会继续执行 <code>if/else</code> 语句下面的语句。</p><p>例如，一个脚本可以根据它所放置图表的时间周期采用不同的策略。为此，只需分析内置函数 <code>Period</code> 返回的值即可。该值的类型为 <code>ENUM_TIMEFRAMES</code> 枚举类型。如果该值小于 <code>PERIOD_D1</code>，则表示日内交易；否则，表示日间交易（<code>StmtSelectionIf.mq5</code>）。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>if(Period() &lt; PERIOD_D1)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(&quot;Intraday&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(&quot;Interday&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在 <code>else</code> 分支的语句位置，允许使用另一个 <code>if</code> 语句，从而将它们排列成一个连续检查的链。例如，下面的代码片段会统计字符串中大写字母和标点符号（更准确地说，是非拉丁字母）的数量。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>string s = &quot;Hello, &quot; + Symbol();</span></span>
<span class="line"><span>int capital = 0, punctuation = 0;</span></span>
<span class="line"><span>for(int i = 0; i &lt; StringLen(s); ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(s[i] &gt;= &#39;A&#39; &amp;&amp; s[i] &lt;= &#39;Z&#39;)</span></span>
<span class="line"><span>      ++capital;</span></span>
<span class="line"><span>   else if(!(s[i] &gt;= &#39;a&#39; &amp;&amp; s[i] &lt;= &#39;z&#39;))</span></span>
<span class="line"><span>      ++punctuation;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Print(capital, &quot; &quot;, punctuation);</span></span></code></pre></div><p>这个循环会遍历字符串中的所有字符（编号从 0 开始），<code>StringLen</code> 函数会返回字符串的长度。第一个 <code>if</code> 检查每个字符是否在 &#39;A&#39; 到 &#39;Z&#39; 的范围内，如果是，则将大写字母计数器 <code>capital</code> 加 1。如果字符不在这个范围内，则执行第二个 <code>if</code>，其中将属于小写字母范围（<code>s[i] &gt;= &#39;a&#39; &amp;&amp; s[i] &lt;= &#39;z&#39;</code>）的条件用 &#39;!&#39; 取反。换句话说，该条件表示字符不在给定范围内。通过这两个连续的检查，如果字符不是大写字母（<code>else</code>）且不是小写字母（第二个 <code>if</code>），我们可以得出该字符不是拉丁字母的结论。在这种情况下，我们将标点符号计数器 <code>punctuation</code> 加 1。</p><p>同样的检查可以用更详细的形式编写，使用 <code>{...}</code> 代码块以提高清晰度。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int capital = 0, small = 0, punctuation = 0;</span></span>
<span class="line"><span>for(int i = 0; i &lt; StringLen(s); ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(s[i] &gt;= &#39;A&#39; &amp;&amp; s[i] &lt;= &#39;Z&#39;)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      ++capital;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   else</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(s[i] &gt;= &#39;a&#39; &amp;&amp; s[i] &lt;= &#39;z&#39;)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         ++small;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      else</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         ++punctuation;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用花括号有助于避免因程序员仅依据代码缩进编写代码而产生的逻辑错误。特别地，最常见的问题被称为“悬空 <code>else</code>”。</p><p>当 <code>if</code> 语句嵌套时，有时 <code>else</code> 分支的数量会少于 <code>if</code> 语句的数量。下面是一个例子：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>factor = 0.0;</span></span>
<span class="line"><span>if(mode &gt; 10)</span></span>
<span class="line"><span>   if(mode &gt; 20)</span></span>
<span class="line"><span>      factor = +1.0;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>   factor = -1.0;</span></span></code></pre></div><p>缩进显示了程序员期望的逻辑：当 <code>mode</code> 大于 20 时，<code>factor</code> 应为 +1；当 <code>mode</code> 在 10 到 20 之间时，<code>factor</code> 应保持为 0；否则（<code>mode &lt;= 10</code>），<code>factor</code> 应变为 -1。但代码会按此逻辑运行吗？</p><p>在 MQL5 中，每个 <code>else</code> 都被认为是指向前一个最近的、没有对应 <code>else</code> 的 <code>if</code>。因此，编译器会将这些语句处理如下：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>factor = 0.0;</span></span>
<span class="line"><span>if(mode &gt; 10)</span></span>
<span class="line"><span>   if(mode &gt; 20)</span></span>
<span class="line"><span>      factor = +1.0;</span></span>
<span class="line"><span>   else</span></span>
<span class="line"><span>      factor = -1.0;</span></span></code></pre></div><p>所以，当 <code>mode</code> 在 10 到 20 之间时，<code>factor</code> 会为 -1；当 <code>mode &lt;= 10</code> 时，<code>factor</code> 会为 0。有趣的是，这个程序在编译和执行过程中都不会产生任何形式上的错误，但它确实无法正确运行。</p><p>使用花括号可以消除这类微妙的逻辑问题。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>if(mode &gt; 10)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(mode &gt; 20)</span></span>
<span class="line"><span>      factor = +1.0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>   factor = -1.0;</span></span></code></pre></div><p>为了保持设计的一致性，如果 <code>if</code> 语句的至少一个分支已经需要使用代码块，那么最好在所有分支中都使用代码块。</p><p>在使用循环进行相等性检查时，要注意可能会出现将两个 &#39;=&#39; 写成一个 &#39;=&#39; 的拼写错误。这会将比较操作变成赋值操作，并且赋值后的值会被当作逻辑条件进行分析。例如：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// 本应是 x == y + 1，这样会得到 false 并跳过 if</span></span>
<span class="line"><span>if(x = y + 1) // 警告：表达式不是布尔类型</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 赋值 x = 5 并将 x 视为 true，因此 if 语句会被执行</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译器会产生“表达式不是布尔类型”的警告。</p><h2 id="switch-选择语句" tabindex="-1"><code>switch</code> 选择语句 <a class="header-anchor" href="#switch-选择语句" aria-label="Permalink to &quot;\`switch\` 选择语句&quot;">​</a></h2><p><code>switch</code> 操作符提供了从多个算法选项中选择其一的能力。通常，选项的数量会显著多于两个，因为否则使用 <code>if/else</code> 语句会更简单。从理论上讲，在许多情况下（但并非所有情况），<code>if/else</code> 语句链可以实现与 <code>switch</code> 类似的功能。<code>switch</code> 的一个重要特点是，所有选项都是基于一个整数表达式的值（通常是一个变量）来选择（识别）的。</p><p>一般情况下，<code>switch</code> 语句的形式如下：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>switch ( 表达式 )</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   case 常量表达式 : 语句 [break; ]</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>   [ default : 语句 ] </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>语句头以关键字 <code>switch</code> 开头。其后必须跟随一个用括号括起来的表达式。包含花括号的代码块也是必需的。</p><p>通过计算表达式可能得到的整数值，应在 <code>case</code> 关键字之后指定为常量。常量可以是任何整数类型的字面值，例如 <code>int</code> 类型（10、123）、<code>ushort</code> 类型（字符 &#39;A&#39;、&#39;s&#39;、&#39;*&#39; 等），或者枚举类型的元素。这里不允许使用实数、变量或表达式。</p><p>这样的 <code>case</code> 选项可以有很多个，也可以一个都没有，这由带有索引 <code>opt(n)</code> 的圆括号表示。所有选项的常量必须是唯一的（不能重复）。</p><p>对于每个用 <code>case</code> 声明的选项，在冒号后面必须编写一条语句，当表达式的值等于相应的常量时，该语句将被执行。同样，语句可以是简单语句，也可以是复合语句。此外，允许编写几条简单语句而不将它们用花括号括起来：它们仍然会作为一组（一个复合语句）被执行。</p><p>这些语句中的一条或多条后面可以跟随 <code>break</code> 跳转语句。</p><p>如果有 <code>break</code>，在执行完 <code>case</code> 分支中的前一条语句后，<code>switch</code> 语句就会退出，即控制转移到 <code>switch</code> 下面的语句。</p><p>如果没有 <code>break</code>，下一个分支或几个 <code>case</code> 分支的语句会继续执行，也就是说，直到遇到第一个 <code>break</code> 或者 <code>switch</code> 代码块结束。这被称为“穿透”。</p><p>因此，<code>switch</code> 语句不仅允许将算法执行流程拆分为几个选项，还可以将它们组合起来，这是 <code>if</code> 操作符所不具备的功能。另一方面，与 <code>if</code> 不同，在 <code>switch</code> 语句中，不能选择一个值的范围作为激活选项的条件。</p><p><code>default</code> 关键字允许设置默认的算法选项，即对于除了所有 <code>case</code> 中的常量之外的任何其他表达式值。<code>default</code> 选项可以不存在，或者只能有一个。</p><p><code>case</code> 常量和 <code>default</code> 的列出顺序可以是任意的。</p><p>即使目前 <code>default</code> 分支没有算法，也建议将其显式地设置为空，即包含 <code>break</code>。一个空的 <code>default</code> 会提醒你和其他程序员存在其他选项，但被认为不重要，因为否则 <code>default</code> 分支就必须发出错误信号。</p><p>几个具有不同常量的 <code>case</code> 选项可以一个接一个地（或从左到右）列出而不包含语句，但最后一个必须有一条语句。在示意图中，这样组合的 <code>case</code> 由索引 (i) 表示。</p><p>下面是一个最简单且没什么实际用途的 <code>switch</code> 示例：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>switch(0)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>让我们来看一个更复杂的示例，涉及不同的模式（<code>StmtSelectionSwitch.mq5</code>）。在这个示例中，<code>switch</code> 操作符被放置在循环内部，以展示它的执行如何依赖于控制变量 <code>i</code> 的值。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for(int i = 0; i &lt; 7; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   double factor = 1.0;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   switch(i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      case -1:</span></span>
<span class="line"><span>         Print(&quot;-1: Never hit&quot;);</span></span>
<span class="line"><span>         break;</span></span>
<span class="line"><span>      case 1:</span></span>
<span class="line"><span>         Print(&quot;Case 1&quot;);</span></span>
<span class="line"><span>         factor = 1.5;</span></span>
<span class="line"><span>         break;</span></span>
<span class="line"><span>      case 2: // 穿透，没有 break (!)</span></span>
<span class="line"><span>         Print(&quot;Case 2&quot;);</span></span>
<span class="line"><span>         factor *= 2;</span></span>
<span class="line"><span>      case 3: // 对于 3 和 4 是相同的语句</span></span>
<span class="line"><span>      case 4:</span></span>
<span class="line"><span>         Print(&quot;Case 3 &amp; 4&quot;);</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            double local_var = i * i;</span></span>
<span class="line"><span>            factor *= local_var;</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>         break;</span></span>
<span class="line"><span>      case 5:</span></span>
<span class="line"><span>         Print(&quot;Case 5&quot;);</span></span>
<span class="line"><span>         factor = 100;</span></span>
<span class="line"><span>         break;</span></span>
<span class="line"><span>      default:</span></span>
<span class="line"><span>         Print(&quot;Default: &quot;, i);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   Print(factor);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>-1</code> 这个选项永远不会被命中，因为循环将变量 <code>i</code> 的值从 0 变化到 6（包括 0 和 6）。当 <code>i</code> 为 0 时，<code>default</code> 分支将被触发。当 <code>i</code> 等于 6 时，它也会起作用。所有其他可能的 <code>i</code> 值会根据相应的 <code>case</code> 指令进行分配。同时，<code>case 2</code> 后面没有 <code>break</code> 语句，因此除了 <code>case 2</code> 的代码外，<code>case 3</code> 和 <code>case 4</code> 的代码也会被执行（在这种情况下，总是建议留下注释，表明这是有意为之的）。</p><p><code>case 3</code> 和 <code>case 4</code> 有一个共同的语句块。但这里还需要注意的是，如果你想在其中一个 <code>case</code> 选项内部声明一个局部变量，需要将语句用一个嵌套的复合代码块（<code>{...}</code>）括起来。这里就是这样定义变量 <code>local_var</code> 的。</p><p>值得一提的是，在 <code>default</code> 情况中没有 <code>break</code> 语句。这是多余的，因为在这个例子中 <code>default</code> 写在最后。然而，许多程序员建议在任何选项的末尾都插入 <code>break</code>，即使是最后一个选项，因为在后续修改代码的过程中，它可能不再是最后一个选项，然后很容易忘记添加 <code>break</code>，这很可能会导致程序逻辑错误。</p><p>如果 <code>switch</code> 中没有 <code>default</code>，并且语句头中的表达式与任何一个 <code>case</code> 常量都不匹配，那么整个 <code>switch</code> 都会被跳过。</p><p>脚本执行的结果是，我们会在日志中收到以下消息：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>Default: 0</span></span>
<span class="line"><span>1.0</span></span>
<span class="line"><span>Case 1</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>Case 2</span></span>
<span class="line"><span>Case 3 &amp; 4</span></span>
<span class="line"><span>8.0</span></span>
<span class="line"><span>Case 3 &amp; 4</span></span>
<span class="line"><span>9.0</span></span>
<span class="line"><span>Case 3 &amp; 4</span></span>
<span class="line"><span>16.0</span></span>
<span class="line"><span>Case 5</span></span>
<span class="line"><span>100.0</span></span>
<span class="line"><span>Default: 6</span></span>
<span class="line"><span>1.0</span></span></code></pre></div><h2 id="break-跳转语句" tabindex="-1"><code>break</code> 跳转语句 <a class="header-anchor" href="#break-跳转语句" aria-label="Permalink to &quot;\`break\` 跳转语句&quot;">​</a></h2><p><code>break</code> 操作符用于提前终止 <code>for</code>、<code>while</code>、<code>do</code> 循环，以及从 <code>switch</code> 选择语句中退出。该操作符只能在指定的这些语句内部使用，并且当存在多个嵌套语句时，它只会影响直接包含 <code>break</code> 的那个语句。在处理完 <code>break</code> 语句后，程序会继续执行被中断的循环或 <code>switch</code> 语句之后的语句。</p><p>其语法非常简单：关键字 <code>break</code> 加上一个分号：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>break ;</span></span></code></pre></div><p>当在循环内部使用时，<code>break</code> 通常会在 <code>if/else</code> 条件操作符的某个分支中实现。</p><p>考虑一个脚本，它每秒打印一次当前系统时间计数器的值，但最多打印 100 次。它还考虑了用户对进程的中断处理：为此，在 <code>if</code> 条件操作符中轮询 <code>IsStopped</code> 函数，并且其相关语句包含 <code>break</code>（<code>StmtJumpBreak.mq5</code>）。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int count = 0;</span></span>
<span class="line"><span>while(++count &lt; 100)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Comment(GetTickCount());</span></span>
<span class="line"><span>   Sleep(1000);</span></span>
<span class="line"><span>   if(IsStopped())</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Print(&quot;Terminated by user&quot;);</span></span>
<span class="line"><span>      break;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在下面的示例中，用乘法表填充一个对角矩阵（右上角将保持为零）。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int a[10][10] = {0};</span></span>
<span class="line"><span>for(int i = 0; i &lt; 10; ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   for(int j = 0; j &lt; 10; ++j)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(j &gt; i)</span></span>
<span class="line"><span>         break;</span></span>
<span class="line"><span>      a[i][j] = (i + 1) * (j + 1);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>ArrayPrint(a);</span></span></code></pre></div><p>当内层循环变量 <code>j</code> 大于外层循环变量 <code>i</code> 时，<code>break</code> 语句会中断内层循环。当然，这并不是填充对角矩阵的最佳方式：更简单的做法是让 <code>j</code> 从 0 循环到 <code>i</code> 而无需使用 <code>break</code>，但这里展示了有 <code>break</code> 和无 <code>break</code> 的等效结构。</p><p>尽管在实际项目中情况可能并非如此明显，但建议尽可能避免使用 <code>break</code> 操作符，而是用额外的变量（例如，一个具有描述性名称的布尔变量 <code>needAbreak</code>）来替代它，这些变量应在循环语句头的终止表达式中使用，以按标准方式中断循环。</p><p>设想使用两个嵌套循环来查找字符串中的重复字符。第一个循环依次将字符串中的每个字符设为当前字符，第二个循环遍历其余（右侧）的字符。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>string s = &quot;Hello, &quot; + Symbol();</span></span>
<span class="line"><span>ushort d = 0;</span></span>
<span class="line"><span>const int n = StringLen(s);</span></span>
<span class="line"><span>for(int i = 0; i &lt; n; ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   for(int j = i + 1; j &lt; n; ++j)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(s[i] == s[j])</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         d = s[i];</span></span>
<span class="line"><span>         break;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果位置 <code>i</code> 和 <code>j</code> 处的字符匹配，就记住重复的字符并通过 <code>break</code> 退出循环。</p><p>可能会认为在执行完这段代码后，变量 <code>d</code> 应该包含字母 <code>&#39;l&#39;</code>。然而，如果将该脚本应用于最常用的交易品种 “EURUSD”，答案将是 <code>&#39;U&#39;</code>。问题在于 <code>break</code> 只会中断内层循环，并且在找到第一个重复字符（单词 “Hello” 中的 <code>&#39;ll&#39;</code>）后，外层循环会继续处理 <code>i</code> 的下一个值。因此，要一次性退出多个嵌套循环，必须采取额外的措施。</p><p>最常用的方法是在外层循环（或所有外层循环）的条件中包含一个在内层循环中赋值的变量。在我们的例子中，已经有这样一个变量：<code>d</code>。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for(int i = 0; i &lt; n &amp;&amp; d == 0; ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   for(int j = i + 1; j &lt; n; ++j)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(s[i] == s[j])</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         d = s[i];</span></span>
<span class="line"><span>         break;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在检查 <code>d</code> 是否等于 0，将在找到第一个重复字符后停止外层循环。但同样的检查也可以添加到内层循环中，这样就无需使用 <code>break</code> 了。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for(int i = 0; i &lt; n &amp;&amp; d == 0; ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   for(int j = i + 1; j &lt; n &amp;&amp; d == 0; ++j)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(s[i] == s[j])</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         d = s[i];</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="continue-跳转语句" tabindex="-1"><code>continue</code> 跳转语句 <a class="header-anchor" href="#continue-跳转语句" aria-label="Permalink to &quot;\`continue\` 跳转语句&quot;">​</a></h2><p><code>continue</code> 语句会中断包含它的最内层循环的当前迭代，并启动下一次迭代。该语句只能在 <code>for</code>、<code>while</code> 和 <code>do</code> 循环内部使用。在 <code>for</code> 循环内部执行 <code>continue</code> 会导致对循环语句头中的表达式进行下一次计算（循环变量的递增/递减），然后检查循环继续的条件。在 <code>while</code> 或 <code>do</code> 循环内部执行 <code>continue</code> 会立即检查循环语句头中的条件。</p><p>该语句由关键字 <code>continue</code> 和一个分号组成：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>continue ;</span></span></code></pre></div><p>它通常放置在 <code>if/else</code> 或 <code>switch</code> 条件语句的某个分支中。</p><p>例如，我们可以生成一个带有间隔的乘法表：当两个索引的乘积为奇数时，相应的数组元素将保持为零（<code>StmtJumpContinue.mq5</code>）。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int a[10][10] = {0};</span></span>
<span class="line"><span>for(int i = 0; i &lt; 10; ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   for(int j = 0; j &lt; 10; ++j)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if((j * i) % 2 == 1)</span></span>
<span class="line"><span>         continue;</span></span>
<span class="line"><span>      a[i][j] = (i + 1) * (j + 1);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>ArrayPrint(a);</span></span></code></pre></div><p>下面是如何计算数组中正数元素的和的示例。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>int b[10] = {1, -2, 3, 4, -5, -6, 7, 8, -9, 10};</span></span>
<span class="line"><span>int sum = 0;</span></span>
<span class="line"><span>for(int i = 0; i &lt; 10; ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(b[i] &lt; 0) continue;</span></span>
<span class="line"><span>   sum += b[i];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Print(sum); // 33</span></span></code></pre></div><p>请注意，同一个循环可以在不使用 <code>continue</code> 的情况下重写，但代码块的嵌套会更深：</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>for(int i = 0; i &lt; 10; ++i)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   if(b[i] &gt;= 0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      sum += b[i];</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>因此，<code>continue</code> 操作符常常用于简化代码格式（特别是当有多个条件需要判断时）。然而，选择这两种方法中的哪一种，取决于个人偏好。</p><h2 id="return-跳转语句" tabindex="-1"><code>return</code> 跳转语句 <a class="header-anchor" href="#return-跳转语句" aria-label="Permalink to &quot;\`return\` 跳转语句&quot;">​</a></h2><p><code>return</code> 操作符旨在从函数中返回控制权。鉴于所有可执行语句都在特定函数内部，它可以间接地用于中断函数内任何嵌套层级的 <code>for</code>、<code>while</code> 和 <code>do</code> 循环。需要注意的是，与 <code>continue</code> 不同，尤其是与 <code>break</code> 不同的是，函数内被中断循环之后的所有语句也都会被忽略。</p><p><code>return</code> 操作符的语法为：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>return ([表达式]) ;</span></span></code></pre></div><p>是否需要指定表达式由函数签名决定（关于这一点，将在相关章节中详细讨论）。为了从总体上理解 <code>return</code> 在控制语句中的工作方式，让我们来看一个主脚本函数 <code>OnStart</code> 的示例。由于它的类型是 <code>void</code>，即不返回任何内容，所以该操作符采用以下形式：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>return ;</span></span></code></pre></div><p>在关于 <code>break</code> 的章节中，我们实现了一个在字符串中查找重复字符的算法。为了中断两个嵌套循环，我们不仅使用了 <code>break</code>，还修改了外层循环的条件。</p><p>使用 <code>return</code> 操作符可以更简单地实现这一点（<code>StmtJumpReturn.mq5</code>）。</p><div class="language-mql5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mql5</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnStart()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   string s = &quot;Hello, &quot; + Symbol();</span></span>
<span class="line"><span>   const int n = StringLen(s);</span></span>
<span class="line"><span>   for(int i = 0; i &lt; n; ++i)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      for(int j = i + 1; j &lt; n; ++j)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         if(s[i] == s[j])</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            PrintFormat(&quot;Duplicate: %c&quot;, s[i]);</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   Print(&quot;No duplicates&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果在 <code>if</code> 操作符中发现字符相等，我们会显示该字符并退出函数。如果这个算法在除 <code>OnStart</code> 之外的自定义函数中，我们可以为其定义一个返回类型（例如，用 <code>ushort</code> 代替 <code>void</code>），并使用完整形式的 <code>return</code> 将找到的字符传递给调用代码。</p><p>由于我们知道测试字符串中存在双写字母 <code>&#39;l&#39;</code>，所以循环之后的语句（<code>Print</code>）将不会被执行。</p>`,262)]))}const k=a(i,[["render",l]]);export{g as __pageData,k as default};
