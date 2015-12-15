/*-------------- COMPONENT STRUCTURE --------------*/

/*
    - ChartBox
      - Input Data
        -input text
        -noise
        -submit button
      - Output data
        - output text
        - data set 1
        - data set 2

*/



/*-------------- LEVEL 3 COMPONENTS --------------*/

var Datum = React.createClass({
  render: function() {

    // chart properties
    var dataSets = [
      {
        values: this.props.dataset1,
        key: "Transmitted Signal",
        color: '#1FB0C5'
      },
          {
          values: this.props.dataset2,
          key: 'Received Signal',
          color: '#2ca02c'
          }
    ];

    var xAxis=
          {
            axisLabel: 'Sample/Bit Index',
            tickFormat: d3.format(',r')
          }

    var yAxis=
          {
            axisLabel: 'Relative Voltage',
            tickFormat: d3.format('.02f')
          }

    return (
      <div className="datum">

        <h4>
          At a noise level of {this.props.noise},
          the following message was received:
          &nbsp;{this.props.children}
        </h4>



        <NVD3Chart
          type="lineChart"
          useInteractiveGuideline={true}
          datum={dataSets}
          xAxis={xAxis} yAxis={yAxis}
        />

      </div>
    );
  }
});




/*-------------- LEVEL 2 COMPONENTS --------------*/
var InputData = React.createClass({

  getInitialState: function() {
    return {noise: '', text: ''};
  },
  handleNoiseChange: function(e) {
    this.setState({noise: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var noise = this.state.noise;
    var text = this.state.text.trim();
    if (!text || !noise) {
      return;
    }
    this.props.onDataSubmit({noise: noise, text: text});
    this.setState({noise: '', text: ''});
  },

  render: function() {
    return (
      <div>
        <h3>Input Data:</h3>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Input Message"
            required
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Noise"
            min="0" max="10.0"
            required
            value={this.state.noise}
            onChange={this.handleNoiseChange}
          />
          <input
            type="submit"
            className='btn btn-default'
            value="Submit"

          />
        </form>
      </div>
    );
  }
});

var OutputData = React.createClass({
  render: function() {

    var dataNodes = this.props.data.map(function(datum) {
      return (
        <Datum dataset1={datum.dataset1} dataset2={datum.dataset2}  noise={datum.noise} key={datum.id}>
          {datum.text}
        </Datum>
      );
    });

    return (
      <div className="outputData">
        <h3>Output Data:</h3>
          {dataNodes}
      </div>
    );
  }
});

/*-------------- LEVEL 1 COMPONENT and SERVER COMMUNICATION --------------*/
var ChartBox = React.createClass({

  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDataSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="chartBox">
        <h1>Basic Communication System</h1>
        <InputData onDataSubmit={this.handleDataSubmit}  />
        <OutputData data={this.state.data}/>
      </div>
    );
  }
});


/*-------------- RENDER COMPONENTS --------------*/
ReactDOM.render(
  <ChartBox url="/api/data" pollInterval={2000}  />,
  document.getElementById('content')
);













//
// ;(function(global){
//
// /*-------------- COMPONENT STRUCTURE --------------*/
//
// /*
//     - ChartBox
//       - Input Data
//         -text
//         -noise
//         -submit button
//       - Output data
//         - Messagelist
//         - graph
//
// */
// /*-------------- DATA --------------*/
// var datum = function() {
//   var sin = [],
//       cos = [];
//
//   for (var i = 0; i < 100; i++) {
//     sin.push({x: i, y: Math.sin(i/10)});
//     cos.push({x: i, y: .5 * Math.cos(i/10)});
//   }
//
//   return [
//     {
//       values: sin,
//       key: 'Transmitted Signal',
//       color: '#1FB0C5'
//     },
//     {
//     values: cos,
//     key: 'Received Signal',
//     color: '#2ca02c'
//     }
//   ];
// };
//
//
// /*-------------- PROPERTIES --------------*/
//
// var xAxis=
//       {
//         axisLabel: 'Time (ms)',
//         tickFormat: d3.format(',r')
//       }
//
// var yAxis=
//       {
//         axisLabel: 'Voltage (v)',
//         tickFormat: d3.format('.02f')
//       }
//
//
// /*-------------- LEVEL 3 COMPONENTS --------------*/
//
// var Datum = React.createClass({
//   render: function() {
//     return (
//       <div className="datum">
//
//         <h4>
//           At noise level {this.props.noise},
//           your original message returned: &quot;{this.props.children}&quot;
//         </h4>
//
//         <NVD3Chart
//           type="lineChart"
//           useInteractiveGuideline={true}
//           datum={datum}
//           xAxis={xAxis} yAxis={yAxis}
//         />
//
//       </div>
//     );
//   }
// });
//
//
// /*-------------- LEVEL 2 COMPONENTS --------------*/
//
// var InputData = React.createClass({
//
//   getInitialState: function() {
//     return {noise: '', text: ''};
//   },
//   handleNoiseChange: function(e) {
//     this.setState({noise: e.target.value});
//   },
//   handleTextChange: function(e) {
//     this.setState({text: e.target.value});
//   },
//
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var noise = this.state.noise;
//     var text = this.state.text.trim();
//     if (!text || !noise) {
//       return;
//     }
//     this.props.onDataSubmit({noise: noise, text: text});
//     this.setState({noise: '', text: ''});
//   },
//
//   render: function() {
//     return (
//       <div>
//         <h3>Input Data:</h3>
//         <form className="form-inline" onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Input Message"
//             value={this.state.text}
//             onChange={this.handleTextChange}
//           />
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Noise"
//             min="0" max="10.0"
//             value={this.state.noise}
//             onChange={this.handleNoiseChange}
//           />
//           <input
//             type="submit"
//             className='btn btn-default'
//             value="Submit"
//           />
//         </form>
//       </div>
//     );
//   }
// });
//
// var OutputData = React.createClass({
//   render: function() {
//     var outputNodes = this.props.data.map(function(datum) {
//       return (
//         <Datum noise={datum.noise} key={datum.id}>
//           {datum.text}
//         </Datum>
//       );
//     });
//     return (
//       <div className="outputData">
//         <h3>Output Data:</h3>
//           {outputNodes}
//       </div>
//     );
//   }
// });
//
//
//
//
//
//
//
//
// /*-------------- LEVEL 1 COMPONENT and SERVER Communication --------------*/
// var ChartBox = React.createClass({
//
//   loadDataFromServer: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//
//   handleDataSubmit: function(datum) {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       type: 'POST',
//       data: datum,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//
//   getInitialState: function() {
//     return {data: []};
//   },
//
//   componentDidMount: function() {
//     this.loadDataFromServer();
//     setInterval(this.loadDataFromServer, this.props.pollInterval);
//   },
//
//   render: function() {
//     return (
//       <div className="chartBox">
//         <h1>Basic Communication System</h1>
//         <InputData onDataSubmit={this.handleDataSubmit} />
//         <OutputData data={this.state.data} />
//       </div>
//     );
//   }
// });
//
//
//
// /*-------------- RENDER COMPONENTS --------------*/
//
// ReactDOM.render(
//   <ChartBox url="/api/data" pollInterval={2000} />,
//   document.getElementById('content')
// );
//
//
//
// })(window);
