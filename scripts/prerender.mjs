import {build} from 'esbuild';
import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const output=path.resolve('.prerender/render.cjs');
await mkdir('.prerender',{recursive:true});
try {
 await build({entryPoints:['src/prerender.jsx'],outfile:output,bundle:true,platform:'node',format:'cjs',jsx:'automatic',packages:'bundle',define:{'process.env.NODE_ENV':'"production"'},logLevel:'warning'});
 const {render}=await import(pathToFileURL(output).href);
 const html=await readFile('dist/index.html','utf8');
 const rendered=render();
 if(!rendered.includes('Less busywork.')||!rendered.includes('id="contact"')) throw new Error('Incomplete prerender');
 await writeFile('dist/index.html',html.replace('<div id="root"></div>',()=>'<div id="root">'+rendered+'</div>'));
 const booking=render('/book.html');
 if(!booking.includes('calendar.google.com/calendar/appointments/schedules/')) throw new Error('Missing booking embed');
 const bookingHtml=html.replace(/<title>.*?<\/title>/,'<title>Book a discovery call · Alex Pena</title>').replace(/<meta name="description" content="[^"]*"\/>/,'<meta name="description" content="Book a discovery call with Alex Pena to discuss workflow automation, systems integration, and AI adoption for your business."/>');
 await writeFile('dist/book.html',bookingHtml.replace('<div id="root"></div>',()=>'<div id="root">'+booking+'</div>'));
 console.log('Prerendered full page HTML for immediate first-load content.');
} finally { await rm('.prerender',{recursive:true,force:true}); }
