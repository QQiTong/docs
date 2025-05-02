import{_ as n,c as a,ag as e,o as p}from"./chunks/framework.CCnnzLsu.js";const m=JSON.parse('{"title":"定时器的使用","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/mq5_programming_for_traders/creating_application_programs/working_with_timer"}],["meta",{"property":"og:title","content":"定时器的使用"}]]},"headers":[],"relativePath":"mq5_programming_for_traders/creating_application_programs/working_with_timer.md","filePath":"mq5_programming_for_traders/creating_application_programs/working_with_timer.md","lastUpdated":1744387121000}'),i={name:"mq5_programming_for_traders/creating_application_programs/working_with_timer.md"};function l(t,s,c,o,d,r){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="定时器的使用" tabindex="-1">定时器的使用 <a class="header-anchor" href="#定时器的使用" aria-label="Permalink to &quot;定时器的使用&quot;">​</a></h1><p>对于许多实际应用任务而言，能够按照预定的时间间隔执行操作是非常重要的。在 MQL5 里，定时器这一系统时间计数器提供了此功能，它可以被设置为定期向 MQL 程序发送通知。</p><p>MQL5 API 中有几个用于设置或取消定时器通知的函数，分别是 <code>EventSetTimer</code>、<code>EventSetMillisecondTimer</code> 和 <code>EventKillTimer</code>。这些通知会以特殊类型的事件形式进入程序，在源代码里，<code>OnTimer</code> 处理程序专门用于处理此类事件。本章将详细讨论这组函数。</p><p>需要注意的是，在 MQL5 中，只有在图表上运行的交互式程序（即指标和智能交易系统）才能接收事件。脚本和服务不支持任何事件，包括来自定时器的事件。</p><p>不过，在“时间处理函数”这一章节里，我们已经涉及到了相关主题：</p><ul><li><strong>获取当前本地或服务器时钟的时间戳</strong>：可以使用 <code>TimeLocal</code> 或 <code>TimeCurrent</code> 函数。</li><li><strong>暂停程序执行</strong>：通过 <code>Sleep</code> 函数能让程序在指定时间段内暂停执行。</li><li><strong>获取计算机系统时间计数器的状态</strong>：可以获取从操作系统启动开始计算的时间（使用 <code>GetTickCount</code>），或者自 MQL 程序启动以来的时间（使用 <code>GetMicrosecondCount</code>）。</li></ul><p>这些功能所有类型的 MQL 程序都能使用。</p><p>在前面的章节中，尽管我们现在才正式介绍定时器函数，但其实已经多次使用过它们。由于定时器事件仅在指标或智能交易系统中可用，所以在掌握这些程序的创建方法之前，研究定时器会有一定难度。在我们学会创建指标之后，定时器的相关内容就成了顺理成章的后续学习内容。</p><p>基本上，我们主要利用定时器来等待时间序列的构建。在“数据等待”“多货币和多时间框架指标”“支持多交易品种和时间框架”“使用内置指标”等章节中都能找到这类示例。</p><p>此外，在“删除指标实例”章节的指标“动画”演示里，我们还设置了每 5 秒切换一次从属指标类型的定时器。</p><h2 id="开启和关闭定时器-eventsettimer-eventkilltimer" tabindex="-1">开启和关闭定时器：EventSetTimer/EventKillTimer <a class="header-anchor" href="#开启和关闭定时器-eventsettimer-eventkilltimer" aria-label="Permalink to &quot;开启和关闭定时器：EventSetTimer/EventKillTimer&quot;">​</a></h2><p>MQL5允许你开启或关闭标准定时器，以执行任何预定的操作。为此提供了两个函数：EventSetTimer和EventKillTimer。</p><h3 id="bool-eventsettimer-int-seconds" tabindex="-1">bool EventSetTimer(int seconds) <a class="header-anchor" href="#bool-eventsettimer-int-seconds" aria-label="Permalink to &quot;bool EventSetTimer(int seconds)&quot;">​</a></h3><p>该函数告知客户端终端，对于此智能交易系统或指标，需要按照指定的频率（以秒为单位，由参数<code>seconds</code>设置）从定时器生成事件。</p><p>函数返回操作成功（<code>true</code>）或出错（<code>false</code>）的标志。可以从<code>_LastError</code>获取错误代码。</p><p>为了处理定时器事件，智能交易系统或指标的代码中必须有<code>OnTimer</code>函数。第一次定时器事件不会在调用<code>EventSetTimer</code>后立即发生，而是在<code>seconds</code>秒之后。</p><p>对于每个调用<code>EventSetTimer</code>函数的智能交易系统或指标，会创建其自己的专用定时器。程序将仅接收来自该定时器的事件。不同程序中的定时器独立工作。</p><p>放置在图表上的每个交互式MQL程序都有一个单独的事件队列，接收到的事件会添加到该队列中。如果队列中已经存在<code>OnTimer</code>事件或者该事件正在处理状态，那么新的<code>OnTimer</code>事件不会被排入队列。</p><p>如果不再需要定时器，应该使用<code>EventKillTimer</code>函数将其禁用。</p><h3 id="void-eventkilltimer-void" tabindex="-1">void EventKillTimer(void) <a class="header-anchor" href="#void-eventkilltimer-void" aria-label="Permalink to &quot;void EventKillTimer(void)&quot;">​</a></h3><p>该函数停止之前由<code>EventSetTimer</code>函数（或我们接下来将讨论的<code>EventSetMillisecondTimer</code>函数）启用的定时器。该函数也可以从<code>OnTimer</code>处理程序中调用。因此，特别地，可以执行一次延迟操作。</p><p>在指标中调用<code>EventKillTimer</code>不会清空队列，因此之后你可能会收到最后残留的<code>OnTimer</code>事件。</p><p>当MQL程序终止时，如果定时器已创建但未通过<code>EventKillTimer</code>函数禁用，定时器将被强制销毁。</p><p>每个程序只能设置一个定时器。因此，如果你想以不同的时间间隔调用算法的不同部分，应该启用一个周期为所需周期的最小公倍数（在极限情况下，最小周期为1秒）的定时器，并在<code>OnTimer</code>处理程序中独立跟踪更长的周期。我们将在下一节中查看这种方法的示例。</p><p>MQL5还允许创建周期小于1秒的定时器：为此有一个函数<code>EventSetMillisecondTimer</code>。</p><h2 id="定时器事件-ontimer" tabindex="-1">定时器事件：OnTimer <a class="header-anchor" href="#定时器事件-ontimer" aria-label="Permalink to &quot;定时器事件：OnTimer&quot;">​</a></h2><p><code>OnTimer</code> 事件是 MQL5 程序支持的标准事件之一（请参阅“事件处理函数概述”部分）。为了在程序代码中接收定时器事件，应该描述一个具有以下原型的函数：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnTimer(void)</span></span></code></pre></div><p><code>OnTimer</code> 事件由客户端终端定期为使用 <code>EventSetTimer</code> 或 <code>EventSetMillisecondTimer</code> 函数激活定时器的智能交易系统或指标生成（请参阅下一节）。</p><p>注意！在通过其他程序调用 <code>iCustom</code> 或 <code>IndicatorCreate</code> 创建的从属指标中，定时器不起作用，也不会生成 <code>OnTimer</code> 事件。这是 MetaTrader 5 的架构限制。</p><p>应该理解，启用的定时器和 <code>OnTimer</code> 处理程序的存在并不会使 MQL 程序成为多线程的。每个 MQL 程序最多分配一个线程（一个指标甚至可以与同一交易品种上的其他指标共享一个线程），因此 <code>OnTimer</code> 和其他处理程序的调用总是按照事件队列的顺序依次发生。如果包括 <code>OnTimer</code> 在内的某个处理程序开始进行长时间的计算，这将暂停程序代码中所有其他事件和部分的执行。</p><p>如果需要组织并行数据处理，应该同时运行几个 MQL 程序（也许是在不同图表或图表对象上运行同一程序的实例），并使用它们自己的协议（例如，使用自定义事件）在它们之间交换命令和数据。</p><p>例如，让我们创建一些类，这些类可以在一个程序中组织多个逻辑定时器。所有逻辑定时器的周期将设置为基本周期的倍数，也就是说，单个硬件定时器的周期为标准处理程序 <code>OnTimer</code> 提供事件。在这个处理程序中，我们必须调用新的 <code>MultiTimer</code> 类的某个方法，该方法将管理所有逻辑定时器。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnTimer()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   // 调用 MultiTimer 方法，在需要时检查并调用从属定时器</span></span>
<span class="line"><span>   MultiTimer::onTimer();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>MultiTimer</code> 类和各个定时器的相关类将组合在一个文件 <code>MultiTimer.mqh</code> 中。</p><p>工作定时器的基类将是 <code>TimerNotification</code>。严格来说，这可以是一个接口，但将一般实现的一些细节输出到其中会很方便：特别是，存储计数器 <code>chronometer</code> 的读数，通过它我们将确保定时器以主定时器相对周期的某个倍数触发，以及一个用于检查定时器应触发时刻的方法 <code>isTimeCome</code>。这就是为什么 <code>TimerNotification</code> 是一个抽象类。它缺少两个虚方法的实现：<code>notify</code>（用于定时器触发时的操作）和 <code>getInterval</code>（用于获取确定特定定时器相对于主定时器周期的倍数）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>class TimerNotification</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>protected:</span></span>
<span class="line"><span>   int chronometer; // 定时器检查计数器（isTimeCome 调用次数）</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   TimerNotification(): chronometer(0)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 定时器工作事件</span></span>
<span class="line"><span>   // 纯虚方法，需要在子类中描述</span></span>
<span class="line"><span>   virtual void notify() = 0;</span></span>
<span class="line"><span>   // 返回定时器的周期（可以动态更改）</span></span>
<span class="line"><span>   // 纯虚方法，需要在子类中描述</span></span>
<span class="line"><span>   virtual int getInterval() = 0;</span></span>
<span class="line"><span>   // 检查定时器是否该触发，如果是，则调用 notify</span></span>
<span class="line"><span>   virtual bool isTimeCome()</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(chronometer &gt;= getInterval() - 1)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         chronometer = 0; // 重置计数器</span></span>
<span class="line"><span>         notify();        // 通知应用程序代码</span></span>
<span class="line"><span>         return true;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      ++chronometer;</span></span>
<span class="line"><span>      return false;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>所有逻辑都在 <code>isTimeCome</code> 方法中提供。每次调用它时，<code>chronometer</code> 计数器都会递增，如果根据 <code>getInterval</code> 方法达到最后一次迭代，则会调用 <code>notify</code> 方法来通知应用程序代码。</p><p>例如，如果主定时器以 1 秒的周期启动（<code>EventSetTimer(1)</code>），那么从 <code>getInterval</code> 返回 5 的 <code>TimerNotification</code> 子对象将每隔 5 秒接收一次对其 <code>notify</code> 方法的调用。</p><p>正如我们已经说过的，这样的定时器对象将由 <code>MultiTimer</code> 管理器对象管理。我们只需要一个这样的对象。因此，它的构造函数被声明为受保护的，并且在类内静态创建一个单例实例。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>class MultiTimer</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>protected:</span></span>
<span class="line"><span>   static MultiTimer _mainTimer;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   MultiTimer()</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>在这个类中，我们组织存储 <code>TimerNotification</code> 对象数组（我们将在几段之后看到它是如何填充的）。一旦我们有了这个数组，我们就可以轻松编写 <code>checkTimers</code> 方法，该方法会遍历所有逻辑定时器。为了外部访问，这个方法由公共静态方法 <code>onTimer</code> 复制，我们已经在全局 <code>OnTimer</code> 处理程序中看到过它。由于唯一的管理器实例是静态创建的，我们可以从静态方法访问它。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   ...</span></span>
<span class="line"><span>   TimerNotification *subscribers[];</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   void checkTimers()</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      int n = ArraySize(subscribers);</span></span>
<span class="line"><span>      for(int i = 0; i &lt; n; ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         if(CheckPointer(subscribers[i]) != POINTER_INVALID)</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            subscribers[i].isTimeCome();</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   static void onTimer()</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      _mainTimer.checkTimers();</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   ...</span></span></code></pre></div><p>使用 <code>bind</code> 方法将 <code>TimerNotification</code> 对象添加到 <code>subscribers</code> 数组中。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   void bind(TimerNotification &amp;tn)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      int i, n = ArraySize(subscribers);</span></span>
<span class="line"><span>      for(i = 0; i &lt; n; ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         if(subscribers[i] == &amp;tn) return; // 已经存在这样的对象</span></span>
<span class="line"><span>         if(subscribers[i] == NULL) break; // 找到一个空槽</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if(i == n)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         ArrayResize(subscribers, n + 1);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      else</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         n = i;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      subscribers[n] = &amp;tn;</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>该方法可防止对象被重复添加，并且如果可能的话，指针会被放置在数组的空元素中（如果有的话），这样就无需扩展数组。如果使用 <code>unbind</code> 方法删除了任何 <code>TimerNotification</code> 对象（定时器可以偶尔使用），数组中可能会出现空元素。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   void unbind(TimerNotification &amp;tn)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      const int n = ArraySize(subscribers);</span></span>
<span class="line"><span>      for(int i = 0; i &lt; n; ++i)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         if(subscribers[i] == &amp;tn)</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            subscribers[i] = NULL;</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>请注意，管理器并不拥有定时器对象的所有权，也不会尝试调用 <code>delete</code>。如果你打算在管理器中注册动态分配的定时器对象，你可以在清零之前的 <code>if</code> 语句中添加以下代码：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>            if(CheckPointer(subscribers[i]) == POINTER_DYNAMIC) delete subscribers[i];</span></span></code></pre></div><p>现在还需要了解如何方便地组织 <code>bind/unbind</code> 调用，以免这些实用操作给应用程序代码带来负担。如果你“手动”进行操作，很容易忘记在某个地方创建定时器，或者相反，忘记删除定时器。</p><p>让我们开发从 <code>TimerNotification</code> 派生的 <code>SingleTimer</code> 类，在其中分别从构造函数和析构函数实现 <code>bind</code> 和 <code>unbind</code> 调用。此外，我们在其中描述 <code>multiplier</code> 变量来存储定时器周期。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>   class SingleTimer: public TimerNotification</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>   protected:</span></span>
<span class="line"><span>      int multiplier;</span></span>
<span class="line"><span>      MultiTimer *owner;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   public:</span></span>
<span class="line"><span>      // 使用指定的基本周期倍数创建定时器，可选择暂停</span></span>
<span class="line"><span>      // 自动在管理器中注册对象</span></span>
<span class="line"><span>      SingleTimer(const int m, const bool paused = false): multiplier(m)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         owner = &amp;MultiTimer::_mainTimer;</span></span>
<span class="line"><span>         if(!paused) owner.bind(this);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>      // 自动将对象与管理器断开连接</span></span>
<span class="line"><span>      ~SingleTimer()</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         owner.unbind(this);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>      // 返回定时器周期</span></span>
<span class="line"><span>      virtual int getInterval() override </span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         return multiplier;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>      // 暂停此定时器</span></span>
<span class="line"><span>      virtual void stop()</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         owner.unbind(this);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>      // 恢复此定时器</span></span>
<span class="line"><span>      virtual void start()</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         owner.bind(this);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   };</span></span></code></pre></div><p>构造函数的第二个参数（<code>paused</code>）允许创建一个对象，但不立即启动定时器。这样一个延迟启动的定时器可以随后使用 <code>start</code> 方法激活。</p><p>一些对象订阅其他对象事件的方案是面向对象编程（OOP）中流行的设计模式之一，称为“发布者/订阅者”模式。</p><p>需要注意的是，这个类也是抽象类，因为它没有实现 <code>notify</code> 方法。基于 <code>SingleTimer</code>，让我们描述具有附加功能的定时器类。</p><p>让我们从 <code>CountableTimer</code> 类开始。它允许指定它应该触发的次数，之后它将自动停止。特别是，使用它很容易组织单个延迟操作。<code>CountableTimer</code> 构造函数有用于设置定时器周期、暂停标志和重试次数的参数。默认情况下，重复次数不受限制，因此这个类将成为大多数应用定时器的基础。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>class CountableTimer: public MultiTimer::SingleTimer</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>protected:</span></span>
<span class="line"><span>   const uint repeat;</span></span>
<span class="line"><span>   uint count;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   CountableTimer(const int m, const uint r = UINT_MAX, const bool paused = false):</span></span>
<span class="line"><span>      SingleTimer(m, paused), repeat(r), count(0) { }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   virtual bool isTimeCome() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(count &gt;= repeat &amp;&amp; repeat != UINT_MAX)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         stop();</span></span>
<span class="line"><span>         return false;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      // 将时间检查委托给父类，</span></span>
<span class="line"><span>      // 仅当定时器触发（返回 true）时才递增我们的计数器</span></span>
<span class="line"><span>      return SingleTimer::isTimeCome() &amp;&amp; (bool)++count;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   // 停止时重置我们的计数器</span></span>
<span class="line"><span>   virtual void stop() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      SingleTimer::stop();</span></span>
<span class="line"><span>      count = 0;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>   uint getCount() const</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return count;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   uint getRepeat() const</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      return repeat;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>为了使用 <code>CountableTimer</code>，我们必须在程序中如下描述派生类：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// MultipleTimers.mq5 </span></span>
<span class="line"><span>class MyCountableTimer: public CountableTimer</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   MyCountableTimer(const int s, const uint r = UINT_MAX):</span></span>
<span class="line"><span>      CountableTimer(s, r) { }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   virtual void notify() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Print(__FUNCSIG__, multiplier, &quot; &quot;, count);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>在这个 <code>notify</code> 方法的实现中，我们只是将定时器周期和触发次数记录到日志中。顺便说一下，这是 <code>MultipleTimers.mq5</code> 指标的一个片段，我们将其用作实际示例。</p><p>让我们将从 <code>SingleTimer</code> 派生的第二个类称为 <code>FunctionalTimer</code>。它的目的是为那些喜欢函数式编程风格并且不想编写派生类的人提供一个简单的定时器实现。<code>FunctionalTimer</code> 类的构造函数除了周期之外，还将接受一个指向特殊类型函数 <code>TimerHandler</code> 的指针。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// MultiTimer.mqh</span></span>
<span class="line"><span>typedef bool (*TimerHandler)(void);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>class FunctionalTimer: public MultiTimer::SingleTimer</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   TimerHandler func;</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   FunctionalTimer(const int m, TimerHandler f):</span></span>
<span class="line"><span>      SingleTimer(m), func(f) { }</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>   virtual void notify() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      if(func != NULL)</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         if(!func())</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>            stop();</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>在这个 <code>notify</code> 方法的实现中，对象通过指针调用函数。有了这样一个类，我们可以定义一个宏，当它放在花括号括起来的语句块之前时，将“使”该语句块成为定时器函数的主体。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// MultiTimer.mqh</span></span>
<span class="line"><span>#define OnTimerCustom(P) OnTimer##P(); \\</span></span>
<span class="line"><span>FunctionalTimer ft##P(P, OnTimer##P); \\</span></span>
<span class="line"><span>bool OnTimer##P()</span></span></code></pre></div><p>然后在应用程序代码中可以这样编写：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>// MultipleTimers.mq5</span></span>
<span class="line"><span>bool OnTimerCustom(3)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(__FUNCSIG__);</span></span>
<span class="line"><span>   return true;        // 继续运行定时器</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这个构造声明了一个周期为 3 的定时器以及括号内的一组指令（这里只是打印到日志）。如果这个函数返回 <code>false</code>，这个定时器将停止。</p><p>让我们进一步考虑 <code>MultipleTimers.mq5</code> 指标。由于它不提供可视化，我们将图表数量指定为零。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#property indicator_chart_window</span></span>
<span class="line"><span>#property indicator_buffers 0</span></span>
<span class="line"><span>#property indicator_plots   0</span></span></code></pre></div><p>为了使用逻辑定时器类，我们包含头文件 <code>MultiTimer.mqh</code> 并添加一个用于基本（全局）定时器周期的输入变量。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>#include &lt;MQL5Book/MultiTimer.mqh&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>input int BaseTimerPeriod = 1;</span></span></code></pre></div><p>在 <code>OnInit</code> 中启动基本定时器。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(__FUNCSIG__, &quot; &quot;, BaseTimerPeriod, &quot; Seconds&quot;);</span></span>
<span class="line"><span>   EventSetTimer(BaseTimerPeriod);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>回想一下，所有逻辑定时器的操作是通过拦截全局 <code>OnTimer</code> 事件来确保的。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnTimer()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   MultiTimer::onTimer();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>除了上面的定时器应用类 <code>MyCountableTimer</code> 之外，让我们描述另一个暂停定时器类 <code>MySuspendedTimer</code>。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>class MySuspendedTimer: public CountableTimer</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>   MySuspendedTimer(const int s, const uint r = UINT_MAX):</span></span>
<span class="line"><span>      CountableTimer(s, r, true) { }</span></span>
<span class="line"><span>   virtual void notify() override</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      Print(__FUNCSIG__, multiplier, &quot; &quot;, count);</span></span>
<span class="line"><span>      if(count == repeat - 1) // 最后一次执行</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>         Print(&quot;Forcing all timers to stop&quot;);</span></span>
<span class="line"><span>         EventKillTimer();</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>我们将在下面看到它是如何启动的。这里还需要注意的是，在达到指定的操作次数后，这个定时器将通过调用 <code>EventKillTimer</code> 关闭所有定时器。</p><p>现在让我们展示如何（在全局上下文中）描述这两个类的不同定时器的对象。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>MySuspendedTimer st(1, 5);</span></span>
<span class="line"><span>MyCountableTimer t1(2);</span></span>
<span class="line"><span>MyCountableTimer t2(4);</span></span></code></pre></div><p><code>MySuspendedTimer</code> 类的 <code>st</code> 定时器周期为 1（<code>1*BaseTimerPeriod</code>），并且应该在 5 次操作后停止。</p><p><code>MyCountableTimer</code> 类的 <code>t1</code> 和 <code>t2</code> 定时器周期分别为 2（<code>2 * BaseTimerPeriod</code>）和 4（<code>4 * BaseTimerPeriod</code>）。默认值 <code>BaseTimerPeriod = 1</code> 时，所有周期都以秒为单位。这两个定时器在程序启动后立即启动。</p><p>我们还将以函数式风格创建两个定时器。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool OnTimerCustom(5)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(__FUNCSIG__);</span></span>
<span class="line"><span>   st.start();         // 启动延迟定时器</span></span>
<span class="line"><span>   return false;       // 并停止这个定时器对象</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>bool OnTimerCustom(3)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(__FUNCSIG__);</span></span>
<span class="line"><span>   return true;        // 这个定时器继续运行</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>请注意，<code>OnTimerCustom5</code> 只有一个任务：在程序启动后的 5 个周期后，它需要启动一个延迟定时器 <code>st</code> 并终止自身的执行。考虑到延迟定时器应该在 5 个周期后停用所有定时器，在默认设置下，我们得到程序活动 10 秒。</p><p><code>OnTimerCustom3</code> 定时器应该在此期间触发 3 次。</p><p>因此，我们有 5 个不同周期的定时器：1 秒、2 秒、3 秒、4 秒、5 秒。</p><p>让我们分析一个输出到日志的示例（时间戳在右侧示意性显示）。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>                                                // time</span></span>
<span class="line"><span>17:08:45.174  void OnInit() 1 Seconds             |</span></span>
<span class="line"><span>17:08:47.202  void MyCountableTimer::notify()2 0    |</span></span>
<span class="line"><span>17:08:48.216  bool OnTimer3()                        |</span></span>
<span class="line"><span>17:08:49.230  void MyCountableTimer::notify()2 1      |</span></span>
<span class="line"><span>17:08:49.230  void MyCountableTimer::notify()4 0      |</span></span>
<span class="line"><span>17:08:50.244  bool OnTimer5()                          |</span></span>
<span class="line"><span>17:08:51.258  void MyCountableTimer::notify()2 2        |</span></span>
<span class="line"><span>17:08:51.258  bool OnTimer3()                           |</span></span>
<span class="line"><span>17:08:51.258  void MySuspendedTimer::notify()1 0        |</span></span>
<span class="line"><span>17:08:52.272  void MySuspendedTimer::notify()1 1         |</span></span>
<span class="line"><span>17:08:53.286  void MyCountableTimer::notify()2 3          |</span></span>
<span class="line"><span>17:08:53.</span></span></code></pre></div><h2 id="高精度定时器-eventsetmillisecondtimer" tabindex="-1">高精度定时器：EventSetMillisecondTimer <a class="header-anchor" href="#高精度定时器-eventsetmillisecondtimer" aria-label="Permalink to &quot;高精度定时器：EventSetMillisecondTimer&quot;">​</a></h2><p>如果你的程序需要定时器触发的频率高于每秒一次，那么可以使用 <code>EventSetMillisecondTimer</code> 函数，而非 <code>EventSetTimer</code>。</p><p>不同单位的定时器不能同时启动，也就是说，只能使用其中一个函数。实际运行的定时器类型由最后调用的函数决定。高精度定时器保留了标准定时器的所有特性。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>bool EventSetMillisecondTimer(int milliseconds)</span></span></code></pre></div><p>该函数告知客户端终端，需要为这个智能交易系统或指标以小于一秒的频率生成定时器事件。周期以毫秒为单位设置（通过 <code>milliseconds</code> 参数）。</p><p>函数返回成功（<code>true</code>）或错误（<code>false</code>）的标志。</p><p>在策略测试器中运行时要注意，定时器周期越短，测试所需的时间就越长，因为定时器事件处理程序的调用次数会增加。</p><p>在正常运行时，由于硬件限制，定时器事件的生成频率不会超过每 10 - 16 毫秒一次。</p><p>为了展示如何使用毫秒级定时器，我们来扩展指标示例 <code>MultipleTimers.mq5</code>。由于全局定时器的激活由应用程序控制，我们可以轻松更改定时器的类型，同时保持逻辑定时器类不变。唯一的区别在于，这些类的乘数将应用于我们在 <code>EventSetMillisecondTimer</code> 函数中指定的以毫秒为单位的基本周期。</p><p>为了选择定时器类型，我们定义一个枚举并添加一个新的输入变量。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>enum TIMER_TYPE</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Seconds,</span></span>
<span class="line"><span>   Milliseconds</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>input TIMER_TYPE TimerType = Seconds;</span></span></code></pre></div><p>默认情况下，我们使用秒级定时器。在 <code>OnInit</code> 函数中，启动所需类型的定时器。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>void OnInit()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   Print(__FUNCSIG__, &quot; &quot;, BaseTimerPeriod, &quot; &quot;, EnumToString(TimerType));</span></span>
<span class="line"><span>   if(TimerType == Seconds)</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      EventSetTimer(BaseTimerPeriod);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   else</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>      EventSetMillisecondTimer(BaseTimerPeriod);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>让我们看看选择毫秒级定时器时日志中会显示什么内容。</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span>                                               // time ms</span></span>
<span class="line"><span>17:27:54.483  void OnInit() 1 Milliseconds        |             </span></span>
<span class="line"><span>17:27:54.514  void MyCountableTimer::notify()2 0    |           +31</span></span>
<span class="line"><span>17:27:54.545  bool OnTimer3()                        |          +31</span></span>
<span class="line"><span>17:27:54.561  void MyCountableTimer::notify()2 1      |         +16</span></span>
<span class="line"><span>17:27:54.561  void MyCountableTimer::notify()4 0      |</span></span>
<span class="line"><span>17:27:54.577  bool OnTimer5()                          |        +16</span></span>
<span class="line"><span>17:27:54.608  void MyCountableTimer::notify()2 2        |       +31</span></span>
<span class="line"><span>17:27:54.608  bool OnTimer3()                           |</span></span>
<span class="line"><span>17:27:54.608  void MySuspendedTimer::notify()1 0        |</span></span>
<span class="line"><span>17:27:54.623  void MySuspendedTimer::notify()1 1         |      +15</span></span>
<span class="line"><span>17:27:54.655  void MyCountableTimer::notify()2 3          |     +32</span></span>
<span class="line"><span>17:27:54.655  void MyCountableTimer::notify()4 1          |</span></span>
<span class="line"><span>17:27:54.655  void MySuspendedTimer::notify()1 2          |</span></span>
<span class="line"><span>17:27:54.670  bool OnTimer3()                              |    +15</span></span>
<span class="line"><span>17:27:54.670  void MySuspendedTimer::notify()1 3           |</span></span>
<span class="line"><span>17:27:54.686  void MyCountableTimer::notify()2 4            |   +16</span></span>
<span class="line"><span>17:27:54.686  void MySuspendedTimer::notify()1 4            |</span></span>
<span class="line"><span>17:27:54.686  Forcing all timers to stop                    |</span></span></code></pre></div><p>事件生成的顺序与秒级定时器的情况完全相同，但一切发生得更快，几乎是瞬间完成。</p><p>由于系统定时器的精度限制在几十毫秒以内，事件之间的实际间隔会明显超过理论上无法达到的 1 毫秒。此外，每次“步进”的时间间隔也存在差异。因此，即使使用毫秒级定时器，也建议不要设置小于几十毫秒的周期。</p>`,106)]))}const u=n(i,[["render",l]]);export{m as __pageData,u as default};
