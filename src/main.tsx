import React,{useState,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {UIContext,Modal,Icon} from './ui';
import {Landing} from './Landing';
import {Workspace,Auth} from './Workspace';
import './styles.css';
function App(){const [route,setRoute]=useState(location.hash.slice(1)||'/');const [theme,setTheme]=useState(()=>localStorage.getItem('af-theme')||'light');const [toast,setToast]=useState('');const [info,setInfo]=useState<{title:string;body:string}|null>(null);
useEffect(()=>{const f=()=>{setRoute(location.hash.slice(1)||'/');if(location.hash.startsWith('#/'))window.scrollTo(0,0)};window.addEventListener('hashchange',f);return()=>window.removeEventListener('hashchange',f)},[]);
useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('af-theme',theme)},[theme]);useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(''),4500);return()=>clearTimeout(t)}},[toast]);
return <UIContext.Provider value={{toast:setToast,theme,toggleTheme:()=>setTheme(theme==='light'?'dark':'light'),openInfo:(title,body)=>setInfo({title,body})}}>{route.startsWith('/app')?<Workspace route={route}/>:route==='/login'||route==='/register'?<Auth register={route==='/register'}/>:<Landing/>}<Modal open={!!info} onClose={()=>setInfo(null)} title={info?.title||''} description="AutoFlow resource"><p className="resource-copy">{info?.body}</p><a className="button primary" href="#/app/overview" onClick={()=>setInfo(null)}>Explore the demo <Icon name="ArrowRight"/></a></Modal>{toast&&<div className="toast" role="status"><Icon name="CheckCircle"/><span>{toast}</span><button aria-label="Dismiss notification" onClick={()=>setToast('')}><Icon name="X" size={16}/></button></div>}</UIContext.Provider>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

import './product.css';
import './builder.css';
import './responsive.css';
import './theme.css';
