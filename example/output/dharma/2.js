try { canvas=document.createElement("canvas"); (document.body || document.documentElement).appendChild(canvas); context1=canvas.getContext('2d');
canvas=document.createElement("canvas"); (document.body || document.documentElement).appendChild(canvas); context2=canvas.getContext('2d', { alpha:true });
canvas=document.createElement("canvas"); (document.body || document.documentElement).appendChild(canvas); context3=canvas.getContext('2d');
canvas=document.createElement("canvas"); (document.body || document.documentElement).appendChild(canvas); context4=canvas.getContext('2d', { willReadFrequently:true });
 } catch (e) { }
try { x=new Array(6); for(var i=0; i<x.length; i++) { x[i]=i*2391695420; }; currentTransformInverse_array1=x;
 } catch (e) { }
try { textMetrics1=context1.measureText("iI");
textMetrics2=context2.measureText("UIBYuY");
 } catch (e) { }
try { path2D1=new Path2D("M100,0L200,0L200,100L100,100z");
 } catch (e) { }
try { context1.canvas.mozGetAsFile("gJiKMG", "video/ogg"); } catch (e) { }
try { context2.clip(path2D1, "evenodd"); } catch (e) { }
try { context1.mozDashOffset=27050.75; } catch (e) { }
try { context2.mozCurrentTransformInverse=currentTransformInverse_array1; } catch (e) { }
try { textMetrics1.actualBoundingBoxDescent; } catch (e) { }
try { context3.canvas.width=-25164.817; } catch (e) { }
try { context4.scale(5.17764, +212); } catch (e) { }
try { context3.canvas.mozGetAsFile("eKygDtY", "image/webp"); } catch (e) { }
try { textMetrics2.actualBoundingBoxAscent; } catch (e) { }
try { context4.drawFocusIfNeeded(document.documentElement); } catch (e) { }
