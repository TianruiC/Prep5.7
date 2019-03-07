var draw=function()
{
  var dataP=d3.json("degrees-that-pay-back.csv");
  dataP.then(function(data)
  {
    console.log("data",data)
    drawChart(data);
  },
  function(err)
  {
    console.log(err);
  }
  )
  document.getElementById("button1").disabled = true;
};

var drawChart=function(colordata)
{
  var width=400;
  var height=300;
  var barWidth=width/colordata.length;
  var svg=d3.select("div").append("svg")
            .attr("width",width)
            .attr("height",height)
            .style("margin-right",40)
            .style("background-color","#F7F7F6");
            //.attr("x",100)
            //.attr("y",500);

  svg.selectAll("rect")
     .data(colordata)
     .enter()
     .append("rect")
     .attr("x",function(d,i){
       return i*barWidth+2;
     })
     .attr("y",function(d,i){
       //return height-d.num;
       return height-d.num*20;
     })
     .attr("width",barWidth-4)
     .attr("height",function(d){
       return d.num*20;
     })
     .attr("fill",function(d){
       return d.color;
     })
     .style("padding",2);

  svg.selectAll("text")
     .data(colordata)
     .enter()
     .append("text")
     .text(function(d){
       return d.num;
     })
     .attr("x",function(d,i){
       return i*barWidth+barWidth/2-4;
     })
     .attr("y",function(d,i){
       return height-d.num*20+15;
     })
     .attr("fill","white")
     .attr("font-size", 14)
     .attr("font-family", "sans-serif");

     legend=svg.append("g")
                  .attr("x",width-65)
                  .attr("y",25)
                  .attr("height", 100)
                  .attr("width", 100);
     legend.selectAll("rect")
           .data(colordata)
           .enter()
           .append("rect")
           .attr("x",width-100)
           .attr("y",function(d,i){
             return i*(100/colordata.length)+30;
           })
           .attr("height",10)
           .attr("width",10)
           .attr("fill",function(d){
             return d.color;
           });
     legend.selectAll("text")
        .data(colordata)
        .enter()
        .append("text")
        .text(function(d){
          return d.color;
        })
        .attr("x",function(d,i){
          return width-85;
        })
        .attr("y",function(d,i){
          return i*(100/colordata.length)+40;
        })
        .attr("fill","black")
        .attr("font-size", 14)
        .attr("font-family", "sans-serif");
}
