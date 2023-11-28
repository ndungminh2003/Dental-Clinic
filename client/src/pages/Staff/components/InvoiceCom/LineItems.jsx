import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import LineItem from "./LineItem";

class LineItems extends Component {
  render = () => {
    const { items, ...functions } = this.props;

    return (
      <form>
        <div className="lineItems">
          <div className="gridTable">
            <div className={`row header`}>
              <div>#</div>
              <div>Item</div>
              <div>Qty</div>
              <div>Price</div>
              <div>Total</div>
            </div>

            <DragDropContext>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={
                      snapshot.isDraggingOver ? "listDraggingOver" : ""
                    }
                  >
                    {this.props.items.map((item, i) => (
                      <Draggable key={item.id} draggableId={item.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                            className={
                              snapshot.isDragging ? "listItemDragging" : ""
                            }
                          >
                            <LineItem
                              style={{ color: "red" }}
                              key={i + item.id}
                              index={i}
                              name={item.name}
                              quantity={item.quantity}
                              price={item.price}
                              {...functions}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </form>
    );
  };
}

export default LineItems;

LineItems.propTypes = {
  items: PropTypes.array.isRequired,
  currencyFormatter: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  reorderHandler: PropTypes.func.isRequired,
};
