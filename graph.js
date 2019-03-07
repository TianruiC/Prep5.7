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
  var padding=50;
  var barWidth=(width-100)/data.length;

  var yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return d.starting; })])
                .range([height-padding,padding]);

  var svg=d3.select("div").append("svg")
            .attr("width",width)
            .attr("height",height)
            .style("background-color","#F2F1E0");

  svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
              return i*barWidth+padding;
            })
            .attr("y",function(d,i){
                 //return height-d.num;
              return yScale(d.starting);
            })
            .attr("width",barWidth-4)
            .attr("height",function(d){
              return height-yScale(d.starting)-padding;
            })
            .attr("fill",function(d){
              if(d.starting>d3.max(data, function(d) { return d.starting; })*0.9){
                return "#333333";
              }
              else if(d.starting>d3.max(data, function(d) { return d.starting; })*0.8){
                return "#777777"
              }
              else if(d.starting>d3.max(data, function(d) { return d.starting; })*0.7){
                return "#999999"
              }
              else{return "#BBBBBB";}
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
       return i*barWidth+padding+10;
     })
     .attr("y",function(d,i){
       return yScale(d.starting)+14;
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
       return height-940;
     })
     .attr("y",function(d,i){
       return i*barWidth+padding+35;
     })
     .attr("transform","rotate(-90)")
     .attr("fill","white")
     .attr("font-size", 15)
     .attr("font-family", "sans-serif");

     var yAxis = d3.axisLeft() .scale(yScale)
                               .ticks(10);
     svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(40,0)")
      .call(yAxis);


}
