(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5042:function(){},8329:function(e,t,s){Promise.resolve().then(s.bind(s,5153))},5153:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return g}});var a=s(7437),n=s(2265),i=s(6105);let l={WIN:3,DRAW:1};class r{clone(){return new r(this.name,this.played,this.won,this.drawn,this.lost,this.goalsFor,this.goalsAgainst,this.points)}constructor(e,t,s,a,n,i,l,r){this.name=e,this.played=t,this.won=s,this.drawn=a,this.lost=n,this.goalsFor=i,this.goalsAgainst=l,this.points=r,this.goalDifference=i-l}}class o{constructor(e,t,s=!1,a=0,n=0,i=null){this.homeTeam=e,this.awayTeam=t,this.played=s,this.homeGoals=a,this.awayGoals=n,this.roundInfo=i}}class c{getPossibleOutcomeCombinations(e){let t=this.remainingMatches.filter(t=>t.homeTeam===e||t.awayTeam===e).length,s=[];for(let e=0;e<=t;e++)for(let a=0;a<=t-e;a++){let n=t-e-a;s.push({wins:e,draws:a,losses:n})}return s}getNumberOfWaysToAchieveOutcome(e,t){let{wins:s,draws:a,losses:n}=t;return i.SJ_([s,a,n])}calculateTeamPoints(e,t){let{wins:s,draws:a,losses:n}=t;return e.points+s*l.WIN+a*l.DRAW}canTeamAchievePosition(e,t,s){let a=this.teams.map(e=>e.clone()),n=a.findIndex(t=>t.name===e.name);if(-1===n)return!1;let i=a[n];return i.won+=s.wins,i.drawn+=s.draws,i.lost+=s.losses,i.played+=s.wins+s.draws+s.losses,i.points=this.calculateTeamPoints(e,s),a.sort((e,t)=>e.points!==t.points?t.points-e.points:e.goalDifference!==t.goalDifference?t.goalDifference-e.goalDifference:t.goalsFor-e.goalsFor),a.findIndex(t=>t.name===e.name)===t-1}findValidOutcomes(e,t){let s=this.teams.find(t=>t.name===e);if(!s)return{validOutcomes:[],totalPossible:0};let a=this.getPossibleOutcomeCombinations(e).filter(e=>this.canTeamAchievePosition(s,t,e)),n=0;return a.forEach(t=>{let s=this.remainingMatches.filter(t=>t.homeTeam===e||t.awayTeam===e);n+=this.getNumberOfWaysToAchieveOutcome(s.length,t)}),{validOutcomes:a,totalPossible:this.totalPossibleOutcomes,totalValidWays:n,probability:n/this.totalPossibleOutcomes*100}}monteCarloSimulation(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e4;if(!this.teams.find(t=>t.name===e))return{probability:0,successCount:0,iterations:s};let a=0;for(let n=0;n<s;n++){let s=this.teams.map(e=>e.clone());for(let t of(s.findIndex(t=>t.name===e),this.remainingMatches)){let e=Math.floor(3*Math.random()),a=s.findIndex(e=>e.name===t.homeTeam),n=s.findIndex(e=>e.name===t.awayTeam);-1!==a&&-1!==n&&(0===e?(s[a].points+=l.WIN,s[a].won+=1,s[n].lost+=1):1===e?(s[a].points+=l.DRAW,s[n].points+=l.DRAW,s[a].drawn+=1,s[n].drawn+=1):(s[n].points+=l.WIN,s[n].won+=1,s[a].lost+=1),s[a].played+=1,s[n].played+=1)}s.sort((e,t)=>e.points!==t.points?t.points-e.points:e.goalDifference!==t.goalDifference?t.goalDifference-e.goalDifference:t.goalsFor-e.goalsFor),s.findIndex(t=>t.name===e)===t-1&&a++}return{probability:a/s*100,successCount:a,iterations:s}}findEarliestFirstPlaceClinch(e){let t=this.teams.find(t=>t.name===e);if(!t)return null;let s=this.groupMatchesByRound(),a=Object.keys(s).sort((e,t)=>parseInt(e)-parseInt(t));if(0===a.length)return null;let n=this.teams.map(e=>e.clone()),i=[];for(let e of(console.log("Looking for clinch scenario across these rounds:",a),a)){let a=s[e],l=this.identifyKeyFixturesInRound(a,n,t.name,parseInt(e));l.length>0&&(console.log("Round ".concat(e," key fixtures:"),l.length),i.push(...l))}console.log("Total key fixtures found across all rounds:",i.length);let l=this.teams.map(e=>e.clone());for(let n of a){let a=s[n],r=this.calculateMaxPossiblePoints(l,n,s),o=this.calculateMinPointsForFirstPlace(t,l,r);if(this.simulateBestCaseScenario(t.name,a,l).points>=o){let e=this.determineRequiredResults(t.name,a,l,r,o),s=i.filter(e=>e.round<parseInt(n));return console.log("Clinch found in round ".concat(n,". Earlier fixtures: ").concat(s.length)),{round:parseInt(n),pointsNeeded:o,currentPoints:t.points,pointsToGain:o-t.points,requiredResults:e,matches:a,keyFixtures:s}}this.simulateRound(a,l,e)}return null}groupMatchesByRound(){let e={};return this.remainingMatches.forEach(t=>{let s=t.roundInfo?t.roundInfo.round:"unknown";e[s]||(e[s]=[]),e[s].push(t)}),e}calculateMaxPossiblePoints(e,t,s){let a={};return e.forEach(e=>{a[e.name]=e.points,Object.keys(s).forEach(n=>{parseInt(n)>=parseInt(t)&&s[n].forEach(t=>{(t.homeTeam===e.name||t.awayTeam===e.name)&&(a[e.name]+=l.WIN)})})}),a}calculateMinPointsForFirstPlace(e,t,s){let a=e.points;return t.forEach(t=>{t.name!==e.name&&(a=Math.max(a,s[t.name]+1))}),a}simulateBestCaseScenario(e,t,s){let a=s.findIndex(t=>t.name===e);if(-1===a)return null;let n=s[a].clone();return t.forEach(t=>{t.homeTeam===e?(n.points+=l.WIN,n.won+=1,n.played+=1):t.awayTeam===e&&(n.points+=l.WIN,n.won+=1,n.played+=1)}),n}determineRequiredResults(e,t,s,a,n){let i=[];return t.filter(t=>t.homeTeam===e||t.awayTeam===e).forEach(t=>{i.push({match:t,result:t.homeTeam===e?"home_win":"away_win",explanation:"".concat(e," must win to gain 3 points")})}),s.forEach(s=>{if(s.name!==e){s.points;let l=t.filter(e=>e.homeTeam===s.name||e.awayTeam===s.name);a[s.name]<n||l.forEach(t=>{if(t.homeTeam===e||t.awayTeam===e)return;let a=t.homeTeam===s.name;a?t.awayTeam:t.homeTeam,i.push({match:t,result:a?"away_win_or_draw":"home_win_or_draw",explanation:"".concat(s.name," must drop points to prevent them from catching ").concat(e)})})}}),i}simulateRound(e,t,s){e.forEach(e=>{let a=t.findIndex(t=>t.name===e.homeTeam),n=t.findIndex(t=>t.name===e.awayTeam);-1!==a&&-1!==n&&(e.homeTeam===s?(t[a].points+=l.WIN,t[a].won+=1,t[n].lost+=1):e.awayTeam===s?(t[n].points+=l.WIN,t[n].won+=1,t[a].lost+=1):(t[a].points+=l.DRAW,t[n].points+=l.DRAW,t[a].drawn+=1,t[n].drawn+=1),t[a].played+=1,t[n].played+=1)})}identifyKeyFixturesInRound(e,t,s,a){let n=[],i=t.find(e=>e.name===s);if(!i||!e||0===e.length)return[];let l=t.filter(e=>e.name!==s&&12>=Math.abs(i.points-e.points)).map(e=>e.name);if(console.log("Round ".concat(a,": Found ").concat(l.length," close competitors within 12 points")),0===l.length&&([...t].sort((e,t)=>t.points-e.points).slice(0,3).forEach(e=>{e.name!==s&&l.push(e.name)}),console.log("No close competitors found, using top ".concat(l.length," teams instead"))),e.forEach(e=>{let t=e.homeTeam===s||e.awayTeam===s,i=l.includes(e.homeTeam)||l.includes(e.awayTeam),r=l.includes(e.homeTeam)&&l.includes(e.awayTeam);if(!t&&i){let t=null,i="";if(r)t="draw",i="A draw would limit points gained by both ".concat(e.homeTeam," and ").concat(e.awayTeam);else{let a=l.includes(e.homeTeam)?e.homeTeam:e.awayTeam;t=e.homeTeam===a?"away_win":"home_win",i="".concat(a," dropping points would help ").concat(s," gain ground")}n.push({match:e,result:t,explanation:i,round:a,importance:r?"high":"medium"})}}),0===n.length&&e.length>0){let t=e.find(e=>e.homeTeam!==s&&e.awayTeam!==s);t&&n.push({match:t,result:"draw",explanation:"Other match in the same round that may affect league standings",round:a,importance:"low"})}return n}constructor(e,t){this.teams=e,this.matches=t,this.remainingMatches=t.filter(e=>!e.played),this.totalGames=this.remainingMatches.length,this.totalPossibleOutcomes=Math.pow(3,this.totalGames)}}function m(){return"aidenlyons.com"===window.location.hostname||window.location.hostname.includes("github.io")?"https://corsproxy.io/?https://api.sofascore.com":"/api/sofascore"}async function d(){try{let e=await fetch("".concat(m(),"/api/v1/unique-tournament/206/season/62411/standings/total"),{headers:{Accept:"application/json","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}});if(!e.ok)throw Error("Failed to fetch standings data: ".concat(e.status));let t=await e.json(),s=function(e){var t,s;if(!(null==e?void 0:null===(s=e.standings)||void 0===s?void 0:null===(t=s[0])||void 0===t?void 0:t.rows))throw Error("Invalid API data format");let a=[];return e.standings[0].rows.forEach(e=>{let t=new r(e.team.name,e.matches,e.wins,e.draws,e.losses,e.scoresFor,e.scoresAgainst,e.points);a.push(t)}),a}(t),a=await h(),n=function(e,t){if(!e||!Array.isArray(e)||0===e.length)return function(e){if(!e||!Array.isArray(e)||0===e.length)return[];let t=[];e.forEach((s,a)=>{for(let n=0;n<3;n++){let i=(a+n+1)%e.length,l=n%2==0,r={round:Math.floor(n/2)+1};l?t.push(new o(s.name,e[i].name,!1,0,0,r)):t.push(new o(e[i].name,s.name,!1,0,0,r))}});let s=[],a=new Set;return t.forEach(e=>{let t="".concat(e.homeTeam,"-").concat(e.awayTeam);a.has(t)||(a.add(t),s.push(e))}),s}(t);let s=[];return e.forEach(e=>{var t,a;if((null===(t=e.status)||void 0===t?void 0:t.type)==="notstarted"||(null===(a=e.status)||void 0===a?void 0:a.type)==="postponed"){let t=new o(e.homeTeam.name,e.awayTeam.name,!1,0,0,e.roundInfo);s.push(t)}}),s}(a,s);return{teams:s,matches:n}}catch(e){return console.error("Error fetching Scottish Championship data:",e),null}}async function h(){let e=[],t=0,s=!0;for(;s;)try{let a=await fetch("".concat(m(),"/api/v1/unique-tournament/206/season/62411/events/next/").concat(t),{headers:{Accept:"application/json","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}});if(!a.ok)throw Error("Failed to fetch upcoming matches on page ".concat(t,": ").concat(a.status));let n=await a.json();n.events&&0!==n.events.length?(e=[...e,...n.events],s=!0===n.hasNextPage,t++,await new Promise(e=>setTimeout(e,300))):s=!1}catch(e){console.error("Error fetching upcoming matches page ".concat(t,":"),e),s=!1}return e}function x(e){let{setResults:t,setLoading:s}=e,[i,l]=(0,n.useState)(""),[r,o]=(0,n.useState)(""),[m,h]=(0,n.useState)("exact"),[x,u]=(0,n.useState)(""),[p,f]=(0,n.useState)(null),[g,y]=(0,n.useState)(!0);(0,n.useEffect)(()=>{!async function(){y(!0);try{let e=await d();e?f(e):u("Could not load league data. Please try again later.")}catch(e){console.error("Error loading live data:",e),u("Could not load league data. Please try again later.")}finally{y(!1)}}()},[]);let w=()=>(null==p?void 0:p.teams)||[],b=()=>(null==p?void 0:p.matches)||[],j=async e=>{e.preventDefault(),u("");let a=w();if(!i){u("Please select a team");return}if(!r||isNaN(parseInt(r))||1>parseInt(r)||parseInt(r)>a.length){u("Please enter a valid position between 1 and ".concat(a.length));return}if(0===a.length||0===b().length){u("No league data available. Please try again later.");return}s(!0),setTimeout(()=>{try{let e;let s=b(),n=new c(a,s);e="exact"===m&&s.length<=15?n.findValidOutcomes(i,parseInt(r)):n.monteCarloSimulation(i,parseInt(r),1e4);let l=n.remainingMatches.filter(e=>e.homeTeam===i||e.awayTeam===i),o=null;1===parseInt(r)&&(o=n.findEarliestFirstPlaceClinch(i)),t({teamName:i,targetPosition:parseInt(r),results:e,teams:a,method:m,remainingMatches:l,allRemainingMatches:n.remainingMatches,isLiveData:!0,clinchScenario:o})}catch(e){console.error("Simulation error:",e),u("An error occurred during simulation. Please try again.")}finally{s(!1)}},100)},N=()=>{let e=w();return e?e.length:0};return(0,a.jsx)("form",{onSubmit:j,className:"space-y-6",children:g?(0,a.jsxs)("div",{className:"flex justify-center items-center p-6",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"}),(0,a.jsx)("span",{className:"ml-3",children:"Loading league data..."})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,a.jsx)("h3",{className:"text-lg font-medium",children:"Scottish Championship Data"}),p&&(0,a.jsx)("div",{className:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",children:"Live Data"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"team",className:"block text-sm font-medium text-gray-700 mb-1",children:"Select Team"}),(0,a.jsxs)("select",{id:"team",className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",value:i,onChange:e=>l(e.target.value),children:[(0,a.jsx)("option",{value:"",children:"-- Select a team --"}),w().map(e=>(0,a.jsx)("option",{value:e.name,children:e.name},e.name))]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"position",className:"block text-sm font-medium text-gray-700 mb-1",children:"Target Position"}),(0,a.jsx)("input",{type:"number",id:"position",min:"1",max:N(),className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",value:r,onChange:e=>o(e.target.value),placeholder:"Enter position (1-".concat(N(),")")})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Simulation Method"}),(0,a.jsxs)("div",{className:"flex space-x-4",children:[(0,a.jsxs)("label",{className:"inline-flex items-center",children:[(0,a.jsx)("input",{type:"radio",className:"form-radio text-blue-500",name:"simMethod",value:"exact",checked:"exact"===m,onChange:()=>h("exact")}),(0,a.jsx)("span",{className:"ml-2",children:"Exact Calculation"})]}),(0,a.jsxs)("label",{className:"inline-flex items-center",children:[(0,a.jsx)("input",{type:"radio",className:"form-radio text-blue-500",name:"simMethod",value:"monteCarlo",checked:"monteCarlo"===m,onChange:()=>h("monteCarlo")}),(0,a.jsx)("span",{className:"ml-2",children:"Monte Carlo Simulation"})]})]}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"exact"===m?"Calculates exact probabilities but may be slow for many remaining matches":"Uses statistical approximation, faster but provides estimated results"})]}),x&&(0,a.jsx)("div",{className:"text-red-500 text-sm",children:x}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"submit",className:"w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",disabled:!p||g,children:"Run Simulation"})})]})})}function u(e){let{teams:t,highlightTeam:s,remainingMatches:n}=e,i=[...t].sort((e,t)=>e.points!==t.points?t.points-e.points:e.goalDifference!==t.goalDifference?t.goalDifference-e.goalDifference:t.goalsFor-e.goalsFor),l=e=>n?n.filter(t=>t.homeTeam===e||t.awayTeam===e).length:null;return(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Pos"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Team"}),(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"P"}),(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"W"}),(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"D"}),(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"L"}),(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"GF"}),(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"GA"}),(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"GD"}),(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Pts"}),n&&(0,a.jsx)("th",{scope:"col",className:"px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"RM"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:i.map((e,t)=>(0,a.jsxs)("tr",{className:e.name===s?"bg-blue-50":"",children:[(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-gray-500",children:t+1}),(0,a.jsx)("td",{className:"px-6 py-3 whitespace-nowrap",children:(0,a.jsx)("div",{className:"flex items-center",children:(0,a.jsxs)("div",{className:"text-sm font-medium text-gray-900",children:[e.name,e.name===s&&(0,a.jsx)("span",{className:"ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",children:"Selected"})]})})}),(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500",children:e.played}),(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500",children:e.won}),(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500",children:e.drawn}),(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500",children:e.lost}),(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500",children:e.goalsFor}),(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500",children:e.goalsAgainst}),(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500",children:e.goalDifference>0?"+".concat(e.goalDifference):e.goalDifference}),(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-center font-bold text-gray-900",children:e.points}),n&&(0,a.jsx)("td",{className:"px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500",children:l(e.name)})]},e.name))})]})})}function p(e){let{scenario:t,teamName:s}=e;if(!t)return(0,a.jsxs)("div",{className:"bg-gray-50 p-4 rounded-md mb-4",children:[(0,a.jsx)("h3",{className:"text-lg font-medium mb-2",children:"First Place Clinching Scenario"}),(0,a.jsx)("p",{className:"text-gray-500",children:"No clinching scenario could be determined. This could be because:"}),(0,a.jsxs)("ul",{className:"list-disc ml-5 mt-2 text-gray-500",children:[(0,a.jsx)("li",{children:"The team is mathematically eliminated from finishing first"}),(0,a.jsx)("li",{children:"There are too many complex interdependencies between teams"}),(0,a.jsx)("li",{children:"The team needs to win all remaining matches and is dependent on other teams' results"})]})]});let{round:n,pointsNeeded:i,currentPoints:l,pointsToGain:r,requiredResults:o,matches:c,keyFixtures:m}=t;console.log("Clinch scenario data:",{round:n,pointsNeeded:i,keyFixtures:m||[],keyFixturesLength:m?m.length:0});let d={};m&&m.length>0?(console.log("Key fixtures found:",m.length),m.forEach(e=>{let t=String(e.round);d[t]||(d[t]=[]),d[t].push(e)}),console.log("Key fixtures by round:",Object.keys(d).length,d)):console.log("No key fixtures found");let h=e=>{switch(e){case"home_win":return"Home team must win";case"away_win":return"Away team must win";case"draw":return"Teams must draw";case"home_win_or_draw":return"Home team must win or draw";case"away_win_or_draw":return"Away team must win or draw";default:return"Result needed"}},x=m&&m.length>0&&Object.keys(d).length>0;return(0,a.jsxs)("div",{className:"bg-blue-50 p-4 rounded-md mb-6",children:[(0,a.jsx)("h3",{className:"text-lg font-medium mb-2 text-blue-800",children:"Earliest First Place Clinch Scenario"}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsxs)("p",{className:"text-gray-700",children:[(0,a.jsx)("span",{className:"font-semibold",children:s})," could clinch first place as early as ",(0,a.jsxs)("span",{className:"font-bold",children:["Round ",n]}),"."]}),(0,a.jsxs)("p",{className:"text-sm text-gray-600 mt-1",children:["Current points: ",(0,a.jsx)("span",{className:"font-medium",children:l})," | Points needed: ",(0,a.jsx)("span",{className:"font-medium",children:i})," | Points to gain: ",(0,a.jsx)("span",{className:"font-medium",children:r})]})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsxs)("h4",{className:"text-md font-medium mb-2 text-blue-700",children:["Required Results in Round ",n]}),(0,a.jsx)("div",{className:"bg-white rounded-md border border-blue-100 divide-y divide-blue-100",children:o.map((e,t)=>(0,a.jsxs)("div",{className:"px-4 py-3",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("span",{className:"font-medium ".concat(e.match.homeTeam===s?"text-blue-600":"text-gray-800"),children:e.match.homeTeam}),(0,a.jsx)("span",{className:"mx-2 text-gray-500",children:"vs"}),(0,a.jsx)("span",{className:"font-medium ".concat(e.match.awayTeam===s?"text-blue-600":"text-gray-800"),children:e.match.awayTeam})]}),(0,a.jsx)("span",{className:"text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800",children:h(e.result)})]}),(0,a.jsx)("p",{className:"text-sm text-gray-600 mt-1",children:e.explanation})]},t))})]}),x&&(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("h4",{className:"text-md font-medium mb-2 text-blue-700",children:"Key Fixtures from Earlier Rounds"}),Object.keys(d).sort((e,t)=>parseInt(e)-parseInt(t)).map(e=>(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsxs)("h5",{className:"text-sm font-medium text-gray-700 mb-2",children:["Round ",e]}),(0,a.jsx)("div",{className:"bg-white rounded-md border border-blue-100 divide-y divide-blue-100",children:d[e].map((e,t)=>(0,a.jsxs)("div",{className:"px-4 py-3",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("span",{className:"font-medium text-gray-800",children:e.match.homeTeam}),(0,a.jsx)("span",{className:"mx-2 text-gray-500",children:"vs"}),(0,a.jsx)("span",{className:"font-medium text-gray-800",children:e.match.awayTeam})]}),(0,a.jsxs)("div",{className:"flex items-center",children:["high"===e.importance&&(0,a.jsx)("span",{className:"text-xs px-2 py-1 mr-2 rounded-full bg-red-100 text-red-800",children:"High impact"}),(0,a.jsx)("span",{className:"text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800",children:h(e.result)})]})]}),(0,a.jsx)("p",{className:"text-sm text-gray-600 mt-1",children:e.explanation})]},t))})]},e))]}),m&&m.length>0&&!x&&(0,a.jsx)("div",{className:"p-3 bg-yellow-50 border border-yellow-100 rounded-md mb-4",children:(0,a.jsxs)("p",{className:"text-sm text-yellow-800",children:[m.length," key fixtures from earlier rounds exist but couldn't be displayed correctly. This may be due to how rounds are structured in the data."]})}),(0,a.jsxs)("p",{className:"text-xs text-gray-500 mt-2",children:["Note: This scenario assumes all earlier rounds play out optimally for ",s,"."]})]})}function f(e){let{results:t}=e,{teamName:s,targetPosition:n,results:i,method:l,remainingMatches:r,isLiveData:o,clinchScenario:c}=t,m="monteCarlo"===l,d=e=>void 0!==e?e.toLocaleString():"0";return(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"bg-gray-50 p-4 rounded-md",children:[(0,a.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Summary"}),(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-semibold",children:s})," has a "," ",(0,a.jsx)("span",{className:"font-bold text-blue-600",children:i.probability.toFixed(2)+"%"})," "," ","chance of finishing in position ",n,"."]}),!m&&void 0!==i.totalValidWays&&(0,a.jsxs)("p",{className:"mt-2 text-sm text-gray-600",children:["There are ",d(i.totalValidWays)," valid outcome combinations out of ",d(i.totalPossible)," possible combinations."]}),m&&void 0!==i.iterations&&(0,a.jsxs)("p",{className:"mt-2 text-sm text-gray-600",children:["Based on ",d(i.iterations)," simulated scenarios, "," ",d(i.successCount)," scenarios resulted in the desired outcome."]}),o&&(0,a.jsx)("div",{className:"mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",children:"Using live Scottish Championship data"})]}),1===n&&(0,a.jsx)(p,{scenario:c,teamName:s}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("h3",{className:"text-lg font-medium mb-3",children:["Remaining Matches for ",s,(0,a.jsxs)("span",{className:"ml-2 text-sm font-normal text-gray-500",children:["(",r?r.length:0," matches)"]})]}),r&&r.length>0?(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Home Team"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"vs"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Away Team"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:r.map((e,t)=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium ".concat(e.homeTeam===s?"text-blue-600":"text-gray-900"),children:e.homeTeam}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center",children:"vs"}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium ".concat(e.awayTeam===s?"text-blue-600":"text-gray-900"),children:e.awayTeam})]},t))})]})}):(0,a.jsx)("p",{className:"text-gray-500",children:"No remaining matches found."})]}),!m&&i.validOutcomes&&i.validOutcomes.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-lg font-medium mb-3",children:"Valid Outcome Combinations"}),(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:i.validOutcomes.map((e,t)=>(0,a.jsxs)("div",{className:"border border-gray-200 rounded-md p-4",children:[(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsxs)("span",{className:"text-sm text-gray-500",children:["Scenario ",t+1]}),(0,a.jsx)("span",{className:"text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full",children:e.wins+e.draws+e.losses===0?"0 matches":"".concat(e.wins+e.draws+e.losses," matches")})]}),(0,a.jsxs)("div",{className:"mt-2 space-y-1",children:[(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("span",{className:"text-green-600",children:"Wins:"}),(0,a.jsx)("span",{className:"font-semibold",children:e.wins})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("span",{className:"text-yellow-600",children:"Draws:"}),(0,a.jsx)("span",{className:"font-semibold",children:e.draws})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("span",{className:"text-red-600",children:"Losses:"}),(0,a.jsx)("span",{className:"font-semibold",children:e.losses})]}),(0,a.jsxs)("div",{className:"flex justify-between pt-2 border-t border-gray-100 mt-2",children:[(0,a.jsx)("span",{className:"font-medium",children:"Points:"}),(0,a.jsx)("span",{className:"font-bold",children:3*e.wins+1*e.draws})]})]})]},t))})]}),(0,a.jsx)("div",{className:"mt-4",children:(0,a.jsx)("p",{className:"text-sm text-gray-500",children:"exact"===l?"Calculation method: Exact (all possible combinations evaluated)":"Calculation method: Monte Carlo simulation (statistical approximation)"})})]})}function g(){let[e,t]=(0,n.useState)(null),[s,i]=(0,n.useState)(!1);return(0,a.jsx)("main",{className:"min-h-screen p-6 md:p-12 bg-white",children:(0,a.jsxs)("div",{className:"max-w-5xl mx-auto",children:[(0,a.jsxs)("header",{className:"mb-8 text-center",children:[(0,a.jsx)("h1",{className:"text-3xl md:text-4xl font-bold text-gray-800 mb-4",children:"Football Standings Simulator"}),(0,a.jsx)("p",{className:"text-gray-600 text-lg mb-2",children:"Calculate all possible combinations that would allow your team to finish in a specific position"}),(0,a.jsx)("p",{className:"text-gray-500 text-sm",children:"Scottish Championship live data from Sofascore API"})]}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8",children:(0,a.jsx)(x,{setResults:t,setLoading:i})}),s&&(0,a.jsxs)("div",{className:"flex justify-center items-center p-12",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"}),(0,a.jsx)("span",{className:"ml-3 text-lg",children:"Running simulation..."})]}),e&&!s&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8",children:[(0,a.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"Simulation Results"}),(0,a.jsx)(f,{results:e})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-lg p-6",children:[(0,a.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"Current League Table"}),(0,a.jsx)(u,{teams:e.teams,highlightTeam:e.teamName,remainingMatches:e.allRemainingMatches})]})]}),(0,a.jsxs)("footer",{className:"mt-12 text-center text-gray-500 text-sm",children:[(0,a.jsx)("p",{children:"Created by Aiden Lyons"}),(0,a.jsx)("p",{className:"mt-1",children:"Data provided by Sofascore API"})]})]})})}s(3254)},3254:function(){}},function(e){e.O(0,[642,105,971,117,744],function(){return e(e.s=8329)}),_N_E=e.O()}]);