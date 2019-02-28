import React from "react";
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { FilteringState, IntegratedFiltering } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow
} from "@devexpress/dx-react-grid-material-ui";

class Beers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "beer_name", title: "Name" },
        { name: "brewery_name", title: "Brewery" },
        { name: "abv", title: "A.B.V" },
        { name: "descript", title: "Description" },
        { name: "style_name", title: "Style" }
      ],
      rows: [    
      ]

    };

    fetch('http://localhost:3001/beerTable')
    .then(response => response.json())
    .then(gridData => {
      console.log(gridData);
      this.setState({
        rows: gridData
      })
    })


    this.changeFilters = filters => this.setState({ filters });
  }

  render(){
    const { rows, columns, filters } = this.state;

    return (
      <Paper>
        <Grid rows={rows} columns={columns}>
          <FilteringState
            filters={filters}
            onFiltersChange={this.changeFilters}
          />
          <IntegratedFiltering />
          <Table />
          <TableHeaderRow />
          <TableFilterRow />
        </Grid>
      </Paper>
    );
  }
}

render(<Beers />, document.getElementById("root"));
