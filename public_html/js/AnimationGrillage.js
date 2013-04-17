///* 
// * To change this template, choose Tools | Templates
// * and open the template in the editor.
// */
//
//function dessineCercle(context, x, y, couleur, fond) {
//    
//    
//    
////    context.fillStyle = fond;
////    context.strokeStyle = couleur;
////    context.lineWidth = 2;
////    context.beginPath();
////    context.arc(x + 15, y + 15, 15, 15, Math.PI, true);
////    context.arc(x + 15, y + 15, 15, 15, Math.PI, true);
////
////    context.fill();
////    context.stroke();
//
//    
//}
//
//var canvas5 = document.getElementById("cercle");
//var canvas = document.createElement("canvas")
//canvas.setAttribute("width", "300");
//canvas.setAttribute("height", "300");
//canvas5.appendChild(canvas);
//var ctx = canvas.getContext('2d');
//
//
//pacStart = 0;
//pacEnd = 360;
//pacOpen = true;
//
//canvas.width = 142;
//canvas.height = 105;
//
//temp = 30
//function draw()
//{
//    ctx.clearRect(0, 0, 142, 105);
//    ctx.beginPath();
//    ctx.arc(70, 53, 50, (Math.PI / 180) * pacStart, (Math.PI / 180) * pacEnd, false);
//    ctx.lineTo(70, 53);
//    ctx.closePath();
//    ctx.fillStyle = 'yellow';
//    ctx.fill();
//
//    if (pacOpen && pacStart < 45)
//    {
//        pacStart += 5;
//        pacEnd -= 5;
//    }
//    else
//    {
//        if (pacStart > 0)
//        {
//            pacOpen = false;
//            pacStart -= 5;
//            pacEnd += 5;
//        }
//        else
//        {
//            pacOpen = true;
//        }
//    }
//
//    setTimeout("draw()", 1000);
//    
//}
//draw();
//
//
//
