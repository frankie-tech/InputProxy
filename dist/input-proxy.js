let e,t="value",r=JSON.parse,s=JSON.stringify,y=y=>(y[t]=""===y[t]?"{}":y[t],new Proxy(y,{set:(y,l,o)=>((e=r(y[t]))[l]=o,y[t]=s(e),!0),get:(e,s)=>s==="__"+t?e[t]:r(e[t])[s],deleteProperty:(y,l)=>(delete(e=r(y[t]))[l],y[t]=s(e),!0),ownKeys:e=>Object.keys(r(e[t]))}));export{y as IP};
//# sourceMappingURL=input-proxy.js.map
