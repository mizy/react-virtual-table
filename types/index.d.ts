export default ReactVirtualSizeTable;
declare class ReactVirtualSizeTable {
    state: {
        scrollLeft: number;
        scrollTop: number;
    };
    getTotalWidth(): number;
    cacheTotalWidth: number;
    cacheWidths: any[];
    widths: any;
    renderCell(): any[];
    onScroll: (e: any) => void;
    render(): any;
}
