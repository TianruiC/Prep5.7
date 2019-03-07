var draw=function()
{
  var dataP=d3.csv("data.csv")
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

var drawChart=function(data)
{
  var width=1000;
  var height=500;
  var barWidth=width/data.length;
  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data, function(d) { return d.starting; })])
                 .range([0, height*6/7]);
  var svg=d3.select("div").append("svg")
            .attr("width",width)
            .attr("height",height)
            .style("margin-right",40)
            .style("background-color","#F7F7F6");

  svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
              return i*barWidth+2;
            })
            .attr("y",function(d,i){
                 //return height-d.num;
              return height-yScale(d.starting);
            })
            .attr("width",barWidth-4)
            .attr("height",function(d){
              return yScale(d.starting)-20;
            })
            .attr("fill",function(d){
              return "grey";
            });
               //.style("padding",2);

  svg.selectAll("text")
     .data(data)
     .enter()
     .append("text")
     .text(function(d){
       return d.starting;
     })
     .attr("x",function(d,i){
       return i*barWidth+15;
     })
     .attr("y",function(d,i){
       return height-yScale(d.starting)+15;
     })
     .attr("fill","white")
     .attr("font-size", 15)
     .attr("font-family", "sans-serif");

     svg.append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(function(d){
       return d.major;
     })
     .attr("x",function(d,i){
       return i*barWidth;
     })
     .attr("y",function(d,i){
       return height-10;
     })
     .attr("fill","black")
     .attr("font-size", 14)
     .attr("font-family", "sans-serif");


}
