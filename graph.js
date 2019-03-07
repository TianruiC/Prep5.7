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
  var xScale = d3.scaleLinear()
                 .domain([0, d3.max(data, function(d) { return d[0]; })])
                 .range([0, w]);
  var svg=d3.select("div").append("svg")
            .attr("width",width)
            .attr("height",height)
            .style("margin-right",40)
            .style("background-color","#F7F7F6");
}
