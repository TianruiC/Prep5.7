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
  var width=400;
  var height=300;
  var barWidth=width/data.length;
  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data, function(d) { return d.starting; })])
                 .range([0, height*3/4]);
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
                 return yScale(d.starting);
               })
               .attr("fill",function(d){
                 return "grey";
               });
               //.style("padding",2);




}
