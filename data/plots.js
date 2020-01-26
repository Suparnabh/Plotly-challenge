//HOMEWORK

// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("samples.json").then((importedData) => {
  console.log(importedData);
  const data = importedData;
  console.log(data.samples);
  

  // Use filter() to pass the function as its argument
  const patient_id = "940"
  var filtereddata = data.samples.filter(item => (item.id === patient_id));

  console.log(filtereddata);

 //  //Create a dictionary with the otuId and sample values to obtain the sorted 10 top values 
  const otuIds = filtereddata.map(item => item.otu_ids);
  const sampleValues = filtereddata.map(item => item.sample_values);

  
  const pairedData = otuIds.map((item,i) => ({otuId:item, samplevalue: sampleValues[i]}));
  const otuIdArr = pairedData.map(item => item.otuId);
  const samplevalueArr = pairedData.map(item => item.samplevalue);


  const xAxis = samplevalueArr[0].slice(0,10);
  const yAxis= otuIdArr[0].slice(0,10);
  //const xAxismod =xAxis.map(item=> d3.format("OTU " + item));
  console.log(pairedData);
  console.log(yAxis);
  console.log(xAxis);
  //console.log(xAxismod);
  // Trace for the Data
  var trace = {
    x: xAxis,
    y: yAxis,
    type: "bar",
    orientation: "h",
    name: 'Sample values for corresponding OtuIds',
    marker: {
    color: 'rgb(49,130,189)',
    opacity: 0.7,
    width: 0.5
  }
    
  };

  // data
  var chartData = [trace];

  // Apply the group bar mode to the layout
  var layout = {
    title: ("Top 10 values for Patient Id") }
    
  

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", chartData, layout);
});
