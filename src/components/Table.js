import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      header = [],
      tableData = [],
      handleActionButton = () => {},
      isOrders = false,
    } = this.props;
    return (
      <table className="white_bg prod_det_body">
        <tr className="prod_det_body">
          {header.map((eachheader, i) => {
            return (
              <th className="prod_det_body" key={i}>
                {eachheader}
              </th>
            );
          })}
        </tr>
        {tableData.map((eachRow) => {
          return (
            <tr className="prod_det_body">
              {Object.keys(eachRow).map((eachCell) => {
                return <td className="prod_det_body">{eachRow[eachCell]}</td>;
              })}
              {(isOrders ? eachRow?.order_status === "Confirmed" : header[header.length - 1] === "Action" )&& (
                <td>
                  <button
                    className="add_product"
                    onClick={() =>
                      handleActionButton(
                        isOrders ? eachRow?.order_id : eachRow?.user_id
                      )
                    }
                  >
                    {isOrders ? "Cancel" : "Delete"}
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </table>
    );
  }
}
export default Table;
