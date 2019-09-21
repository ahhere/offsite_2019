import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.openJira = this.openJira.bind(this);
  }

  openJira() {
    var jiraUrl='https://jira.mongodb.com/';
    var ticket = this.props.task.jira_ticket
    window.open(jiraUrl+ticket, '_blank')
  }

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            aria-roledescription="Press space bar to lift the task"
          >
            <button onClick={this.openJira}>
            {this.props.task.content} - {this.props.task.jira_ticket}
             </button>
          </Container>
        )}
      </Draggable>
    );
  }
}
