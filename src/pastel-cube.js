// Reuse the original authored Spline geometry, camera, event graph and animation.
// Material finish, light intensity and canvas background match the business theme.
const palette=['#8099bc','#b5c2d0','#d3d9df','#6f88aa','#c4ced9','#9caec5'];
export function applyPastelCube(app){
 const objects=app.getAllObjects();
 if(!objects.length)return false;
 app.setBackgroundColor('rgba(0,0,0,0)');
 let index=0;
 for(const object of objects){
  if(object.name==='Spot Light')object.intensity=1.4;
  if(object.name==='Default Directional Light')object.intensity=.7;
  if(!object.material)continue;
  object.color=palette[index++ % palette.length];
  for(const layer of object.material.layers){
   if(layer.type==='color')layer.alpha=1;
   if(layer.type==='light'){
    layer.alpha=.85;
    if(layer.category==='physical'){layer.metalness=.08;layer.roughness=.55;}
   }
   // Retain a little of the original panel textures without their black-metal finish.
   if(layer.type==='texture')layer.alpha=Math.min(layer.alpha,.12);
   if(layer.type==='matcap')layer.alpha=.12;
   if(layer.type==='fresnel'){layer.color='#f4eafa';layer.alpha=.12;}
   if(layer.type==='rainbow')layer.alpha=.03;
   if(layer.type==='pattern')layer.alpha=.18;
   if(layer.type==='noise')layer.alpha=.08;
   if(layer.type==='depth')layer.alpha=0;
  }
 }
 return true;
}

