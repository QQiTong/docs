import{_ as i,c as a,ag as e,o as n}from"./chunks/framework.BhgIN1sM.js";const g=JSON.parse('{"title":"变量与标识符","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/mq5_programming_for_traders/welcome/variables_and_identifiers"}],["meta",{"property":"og:title","content":"变量与标识符"}]]},"headers":[],"relativePath":"mq5_programming_for_traders/welcome/variables_and_identifiers.md","filePath":"mq5_programming_for_traders/welcome/variables_and_identifiers.md"}'),t={name:"mq5_programming_for_traders/welcome/variables_and_identifiers.md"};function h(l,s,p,r,k,d){return n(),a("div",null,s[0]||(s[0]=[e(`<h1 id="变量与标识符" tabindex="-1">变量与标识符 <a class="header-anchor" href="#变量与标识符" aria-label="Permalink to &quot;变量与标识符&quot;">​</a></h1><h2 id="变量基础" tabindex="-1">变量基础 <a class="header-anchor" href="#变量基础" aria-label="Permalink to &quot;变量基础&quot;">​</a></h2><p>变量是具有唯一名称（用于无差错引用）的内存单元，可存储特定类型的值。编译器会为变量分配恰好足够的内存空间，并采用特定的内部格式进行存储。每个类型都有固定的大小和对应的内存存储格式（详见第二部分）。</p><h2 id="标识符规则" tabindex="-1">标识符规则 <a class="header-anchor" href="#标识符规则" aria-label="Permalink to &quot;标识符规则&quot;">​</a></h2><p>标识符是程序中用于命名变量、函数及其他实体的更严格术语，其命名规则包括： • 只能包含：拉丁字母、数字和下划线 • 不能以数字开头 • 示例：函数名<code>Greeting</code>符合规范</p><h2 id="变量特性" tabindex="-1">变量特性 <a class="header-anchor" href="#变量特性" aria-label="Permalink to &quot;变量特性&quot;">​</a></h2><p>变量具有三个核心特征：</p><ol><li><strong>类型</strong>：决定存储格式和内存大小</li><li><strong>名称</strong>：遵循标识符命名规则</li><li><strong>上下文</strong>：定义变量的作用域（即变量可被正确使用的代码区域）</li></ol><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 变量值可通过特定语句在程序执行期间改变</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> counter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">counter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> counter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 值变更示例</span></span></code></pre></div><h2 id="函数参数的特殊性" tabindex="-1">函数参数的特殊性 <a class="header-anchor" href="#函数参数的特殊性" aria-label="Permalink to &quot;函数参数的特殊性&quot;">​</a></h2><p>函数参数是变量的特殊形式，具有以下特点： • 用于向函数传递值 • 作用域限定在函数体内 • 防止外部代码意外修改函数内部状态</p><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Greeting</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> hour</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // hour参数的作用域仅限于此函数块</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello, &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="上下文作用域示例" tabindex="-1">上下文作用域示例 <a class="header-anchor" href="#上下文作用域示例" aria-label="Permalink to &quot;上下文作用域示例&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[函数参数 hour] --&gt; B[函数体内可访问]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt; C{外部代码}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt;|访问hour会报错| D[编译错误]</span></span></code></pre></div><h2 id="数组优化方案" tabindex="-1">数组优化方案 <a class="header-anchor" href="#数组优化方案" aria-label="Permalink to &quot;数组优化方案&quot;">​</a></h2><p>当需要处理多个相关值时，推荐使用数组而非多个独立变量： • 优点：统一访问接口 • 优点：简化算法实现 • 示例：问候语数组可替代三个独立字符串变量</p><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">greetings</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;Good morning&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;Good afternoon&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;Good evening&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><blockquote><p><strong>关键总结</strong>：变量定义必须显式声明类型和名称，其上下文由定义位置隐式决定。合理使用参数作用域和数据结构（如数组）能显著提升代码质量和可维护性。</p></blockquote>`,18)]))}const c=i(t,[["render",h]]);export{g as __pageData,c as default};
