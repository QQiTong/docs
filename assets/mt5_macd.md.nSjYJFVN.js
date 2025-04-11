import{_ as i,a}from"./chunks/xauusd-1h-2013-macd-backtest.DQjKtBYo.js";import{_ as t,c as h,ag as e,o as n}from"./chunks/framework.BhgIN1sM.js";const c=JSON.parse('{"title":"MACD","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://vite.dev/mt5/macd"}],["meta",{"property":"og:title","content":"MACD"}]]},"headers":[],"relativePath":"mt5/macd.md","filePath":"mt5/macd.md"}'),l={name:"mt5/macd.md"};function p(d,s,k,r,E,o){return n(),h("div",null,s[0]||(s[0]=[e(`<h1 id="getting-started" tabindex="-1">MACD <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;MACD {#getting-started}&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">温馨提醒</p><p>所有策略必须经过充分验证后，才能用于实盘</p></div><h2 id="overview" tabindex="-1">黄金 <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;黄金 {#overview}&quot;">​</a></h2><h4 id="options" tabindex="-1">开平条件 <a class="header-anchor" href="#options" aria-label="Permalink to &quot;开平条件 {#options}&quot;">​</a></h4><table tabindex="0"><thead><tr><th>做多</th><th></th></tr></thead><tbody><tr><td>做多条件1</td><td>MACD慢线零轴上方</td></tr><tr><td>做多条件2</td><td>快线慢线金叉</td></tr><tr><td>开仓手数</td><td>每次开仓0.14手</td></tr><tr><td>止损条件</td><td>追踪止损2%</td></tr><tr><td>止盈条件</td><td>追踪止损2%</td></tr></tbody></table><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-lH5xe" id="tab-ZiOKXFO" checked><label data-title="MT5" for="tab-ZiOKXFO">MT5</label><input type="radio" name="group-lH5xe" id="tab-TbZCna2"><label data-title="文华T8" for="tab-TbZCna2">文华T8</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">请看视频教程</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DIFF</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> :=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EMA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CLOSE,12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EMA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CLOSE,26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//短周期与长周期的收盘价的指数平滑移动平均值做差。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DEA</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  :=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EMA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DIFF,9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//DIFF的M个周期指数平滑移动平均</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MACD:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=2*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DIFF-DEA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//定义红绿柱</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DEA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;&amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CROSSUP(DIFF,DEA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),BK;       </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//水上金叉开多</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DEA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;0&amp;&amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CROSSDOWN(DIFF,DEA</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),SK;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//水下死叉开空</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CLOSE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;BKHIGH*(1-ZS/1000),SP;  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//追踪止损2%</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CLOSE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">SKLOW*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1+ZS/1000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),BP;  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//追踪止损2%</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AUTOFILTER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></div></div><h3 id="回测" tabindex="-1">回测 <a class="header-anchor" href="#回测" aria-label="Permalink to &quot;回测&quot;">​</a></h3><h4 id="回测曲线" tabindex="-1">回测曲线 <a class="header-anchor" href="#回测曲线" aria-label="Permalink to &quot;回测曲线&quot;">​</a></h4><p><img src="`+i+'" alt=""><img src="'+a+'" alt=""></p><h4 id="回测报告" tabindex="-1">回测报告 <a class="header-anchor" href="#回测报告" aria-label="Permalink to &quot;回测报告&quot;">​</a></h4><table tabindex="0"><thead><tr><th>关键指标</th><th></th></tr></thead><tbody><tr><td>回测时间</td><td>2013-01-01 ~2025-04-07</td></tr><tr><td>本金</td><td>10000</td></tr><tr><td>交易周期</td><td>1H</td></tr><tr><td>收益率</td><td>2200%</td></tr><tr><td>最大回撤</td><td>29%</td></tr><tr><td>夏普率</td><td>0.3</td></tr></tbody></table>',11)]))}const y=t(l,[["render",p]]);export{c as __pageData,y as default};
