import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import { Resizable } from "react-resizable";
import "./index.less";
import ReactVirtualSizeTable from "../src/index";

const tableData = [];
for (let i = 0; i < 10; i++) {
	const row = {};
	for (let j = 0; j < 1000; j++) {
		row[`column_${j}`] = (i + j);
	}
	tableData.push(row)
}

export default class Demo extends Component {
	state = {

		widths: []
	};

	onResize = (index, value) => {
		const { widths } = this.state;
		widths[index] = value.size.width;
		this.setState({
			widths: { ...widths }
		});

	}

	renderCell = ({ columnIndex, key, rowIndex, style }) => {
		const { widths } = this.state;
		const field = `column_${columnIndex}`;
		const text = rowIndex === 0 ? field : tableData[rowIndex] && tableData[rowIndex][field];
		return (
			<Fragment key={key}>
				{rowIndex === 0 ? (

					<Resizable width={widths[columnIndex] || 140} height={36} onResize={(e, value) => { this.onResize(columnIndex, value); }}>
						<div style={style} className="table-header">
							{text}
						</div>
					</Resizable>
				) : (

					<div style={style} className="table-content"
						onDoubleClick={() => this.onDoubleClick(tableData[rowIndex])} >
						{text}
					</div>
				)}
			</Fragment>
		);
	}

	render() {

		const { widths } = this.state;

		// 同步
		const widthArray = new Array(1000).fill(140);
		for (let key in widths) {
			widthArray[key] = widths[key];
		}

		const width = window.innerWidth - 50;
		return (
			<div className={"res-table"}>
				<ReactVirtualSizeTable
					onCell={(value) => this.renderCell(value)}
					columnCount={1000}
					widths={widthArray}
					height={250}
					fixHead={true}
					rowCount={tableData.length}
					rowHeight={36}
					width={width}
					style={{ width: "100%", padding: "0 20px" }}
				/>
			</div>
		);
	}

}
ReactDOM.render(<Demo />, document.getElementById("app"))