
import React, { Component, Fragment } from "react";

class ReactVirtualSizeTable extends Component {
	state={
		scrollLeft: 0,
		scrollTop: 0
	}

	// 缓存数据
	getTotalWidth() {
		const {widths} = this.props;
		if (JSON.stringify(widths) !== JSON.stringify(this.widths)) {
			this.cacheTotalWidth = 0;
			this.cacheWidths = [];
			widths.forEach((item, index)=>{
				this.cacheTotalWidth += item;
				this.cacheWidths[index] = this.cacheTotalWidth;
			});
			this.widths = widths;
		}
		return this.cacheTotalWidth;
	}

	renderCell() {
		const {onCell, rowCount, columnCount, width, height, rowHeight} = this.props;
		let startColumn ; let endColumn=columnCount-1; let startRow ;let endRow;
		const {scrollLeft, scrollTop} = this.state;

		// 开始计算滚动到哪个区间
		const endWidth = scrollLeft + width ;
		for (let i = 0;i < this.cacheWidths.length;i++) {
			const nowWidth = this.cacheWidths[i];
			if (startColumn === undefined && nowWidth > scrollLeft) {
				startColumn = i;
			}
			if (nowWidth >= endWidth) {
				endColumn = i;
				break;
			}
		}

		startRow = Math.floor(scrollTop / rowHeight);
		endRow = Math.min(Math.ceil((scrollTop + height) / rowHeight) - 1, rowCount);

		const cells = [];
		for (let i = startColumn;i <= endColumn;i++) {
			for (let j = startRow;j < endRow;j++) {
				cells.push(onCell({rowIndex: j, columnIndex: i, key: `${i}_${j}`, style: {
					position: "absolute",
					transform: `translate(${this.cacheWidths[i - 1] || 0}px,${j * rowHeight}px)`,
					width: this.widths[i],
					height: rowHeight
				}}));
			}
		}
		return cells;
	}

	onScroll = (e) => {
		this.setState({
			scrollLeft: e.target.scrollLeft,
			scrollTop: e.target.scrollTop
		});
	}

	render() {
		const {width = 200, height = 100, rowCount, rowHeight} = this.props;
		const totalWidth = this.getTotalWidth();
		const totalHeight = rowCount * rowHeight;
		return <div className="react-virtual-size-table" onScroll={this.onScroll} style={{width, height, overflow: "scroll"}} >
			<div className="react-virtual-size-container" style={{width: totalWidth, height: totalHeight, position: "relative"}} >
				{this.renderCell()}
			</div>
		</div>;
	}
}

export default ReactVirtualSizeTable;
