try { canvas=document.createElement("canvas"); (document.body || document.documentElement).appendChild(canvas); context1=canvas.getContext('2d');
canvas=document.createElement("canvas"); (document.body || document.documentElement).appendChild(canvas); context2=canvas.getContext('2d', { willReadFrequently:true });
canvas=document.createElement("canvas"); (document.body || document.documentElement).appendChild(canvas); context3=canvas.getContext('2d');
 } catch (e) { }
try { x=new Array(6); for(var i=0; i<x.length; i++){ x[i]=i*+33.5; }; currentTransform_array1=x;
 } catch (e) { }
try { x=new Array(6); for(var i=0; i<x.length; i++) { x[i]=i*2990646520; }; currentTransformInverse_array1=x;
 } catch (e) { }
try { context1.mozCurrentTransformInverse=currentTransformInverse_array1; } catch (e) { }
try { context2.font="Arial"; } catch (e) { }
try { context2.mozCurrentTransform=currentTransform_array1; } catch (e) { }
try { context3.stroke(); } catch (e) { }
try { context1.strokeStyle="hsl(+237, 27% 42%)"; } catch (e) { }
try { context1.canvas.mozGetAsFile("wrZgSAmC", "audio/mpeg"); } catch (e) { }
