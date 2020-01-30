//HOMEWORK
// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("samples.json").then((importedData) => {
  console.log(importedData);
  const data = importedData;
  console.log(data.samples);
  console.log(data.metadata);
  

  // Use filter() to pass the function as its argument
  const patient_id = "940"
  var filtereddata = data.samples.filter(item => (item.id === patient_id));
  var tabledata = data.metadata.filter(item => (item.id === parseInt(patient_id)));

  console.log(filtereddata);
  console.log(tabledata);

 ////Create a dictionary with the otuId and sample values to obtain the sorted 10 top values 
  const otuIds = filtereddata.map(item => item.otu_ids);
  const sampleValues = filtereddata.map(item => item.sample_values);
  const otuLabels = filtereddata.map(item => item.otu_labels);
  

  //Create a dictionary
  const pairedData = otuIds.map((item,i) => ({otuId:item, samplevalue: sampleValues[i], otuLabel : otuLabels[i]}));
  //Create separate arrays
  const otuIdArrMap = pairedData.map(item => item.otuId);
  const samplevalueArrMap = pairedData.map(item => item.samplevalue);
  const otuLabelMap = pairedData.map(item => item.otuLabel);
  
//Since the output is an array as a first item in the above created arrays, we obtain the first elemt, to get the data in the form of arrays
  const otuIdArr = otuIdArrMap[0];
  const samplevalueArr = samplevalueArrMap[0];
  const otuLabel= otuLabelMap[0];
  
  const yAxis = samplevalueArr.slice(0,10);
  const xAxis= otuIdArr.slice(0,10);

  const  xAxisString =[];
  for(i=0; i<= xAxis.length; i++){
    xAxisString.push("OTU"+ xAxis[i]);
  };
  // console.log(xAxisString);
  // console.log(pairedData);
  // console.log(yAxis);
  // console.log(xAxis);
  // console.log(otuIdArr);
  // console.log(samplevalueArr);
  // console.log(otuLabel);

  //Trace for the Data
  var trace = {
    x: xAxisString,
    y: yAxis,
    text: otuLabel.slice(0,10),
    type: "bar",
    name: 'Sample values for corresponding OtuIds',
    marker: {
    color: 'rgb(49,130,189)',
    opacity: 0.7,
    width: 50
  }
};

//layout  
const layout = {
  title: `Top 10 values for Patient Id ${patient_id}`,
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: false,
  xaxis: {
    zeroline: false,
    gridwidth: 2,  
  },
  yaxis: {
     tickangle: -90
  },
  bargap :0.05
};
    


  // data
  var chartData = [trace];
    

//   // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", chartData, layout);
// 

// Plotly Bubble Chart

var trace1 = {
  x: otuIdArr,
  y: samplevalueArr,
  mode: 'markers',
  text: otuLabel,
  marker: {
    size: samplevalueArr,
    color: otuIdArr
  }
};

var bubbledata = [trace1];

var bubblelayout = {
  title: `Bubble Plot for Patient Id ${patient_id}- sample values and OTU_ID`,
  showlegend: false,
  height: 600,
  width: 1000,
};

Plotly.newPlot("bubbleplot", bubbledata, bubblelayout)

//Create Table for the data

    
  // Since tabledata is a dictionary , extracting the data in the desied output format, preferably in an array
  var valueTable =[]
  const tabledatakeys = Object.keys(tabledata[0]);
  const tabledatavalues = Object.values(tabledata[0]);

  for(let i=0;i<=6;i++){
    valueTable[i]= tabledatakeys[i]+":"+tabledatavalues[i]
  };

  console.log(valueTable);
  
var dataTable = [{
type: 'table',
header: {
  values: ["<b>Demographic Info</b>"],
  align: "center",
  line: {width: 0.5, color: 'blue'},
  fill: {color: "blue"},
  font: {family: "Arial", size: 12, color: "white"}
},
cells: {
  values: [valueTable],
  align: "center",
  line: {color: "white", width: 0.5},
  fill: {color: "white"},
  font: {family: "Arial", size: 11, color: ["blue"]}
}
}];

Plotly.newPlot('tableplot', dataTable)
});