import React, { Component } from "react";
import { withRouter } from "../withRouter";

class Table extends Component {
  render() {
    const {
      header = [],
      tableData = [],
      handleActionButton = () => {},
      isOrders = false,
      ordertrack = false,
      isReturn = false,
    } = this.props;
    const isAdmin = localStorage.getItem("role") === "Admin";
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
              {Object.keys(eachRow).map((eachCell, i) => {
                return (
                  <td className="prod_det_body">
                    {i === Object.keys(eachRow).length - 2 && isOrders ? (
                      <img src={eachRow[eachCell]} className="wh_50" alt="" />
                    ) : (
                      eachRow[eachCell]
                    )}
                  </td>
                );
              })}
              {isReturn && (
                <td>
                  <button className="add_product" onClick={() => {handleActionButton("Approve", eachRow)}}>
                    Approve
                  </button>
                  <button className="add_product" onClick={() => {handleActionButton("Decline", eachRow)}}>
                    Decline
                  </button>
                </td>
              )}
              {!ordertrack && !isReturn && (
                <td>
                  {(isOrders
                    ? !["Cancelled", "Return requested", "Return Approved", "Return Declined" ].includes( eachRow?.order_status) && !isAdmin
                    : header[header.length - 1] === "Action") && (
                    <button
                      className="add_product"
                      onClick={() =>
                        isOrders
                          ? this.props.navigate("/orderUpdate", {
                              state: {
                                orderId: eachRow?.order_id,
                                prodId: eachRow?.prod_id,
                              },
                            })
                          : handleActionButton(eachRow?.user_id)
                      }
                    >
                      {isOrders ? "Cancel" : "Delete"}
                    </button>
                  )}
                  {isOrders && (
                    <button
                      className="add_product"
                      onClick={() =>
                        isAdmin
                          ? this.props.navigate("/orderUpdate", {
                              state: {
                                orderId: eachRow?.order_id,
                                prodId: eachRow?.prod_id,
                              },
                            })
                          : this.props.navigate("/orderTrack", {
                              state: {
                                orderId: eachRow?.order_id,
                                prodId: eachRow?.prod_id,
                              },
                            })
                      }
                    >
                      {isAdmin ? "Update Order" : "Track Order"}
                    </button>
                  )}
                  {isOrders && (
                    <button
                      className="add_product"
                      onClick={() =>
                        isAdmin
                          ? this.props.navigate("/checkReview", {
                              state: {
                                orderId: eachRow?.order_id,
                                prodId: eachRow?.prod_id,
                              },
                            })
                          : this.props.navigate("/giveReview", {
                              state: {
                                orderId: eachRow?.order_id,
                                prodId: eachRow?.prod_id,
                              },
                            })
                      }
                    >
                      {isAdmin ? "Check reviews" : "Give Review"}
                    </button>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </table>
    );
  }
}
export default withRouter(Table);
