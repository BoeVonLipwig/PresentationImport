import React from "react";

class SelectButton extends React.Component {
  clickHandler() {
    alert("Hello1");
    /*
    $("#showProjects").on('change', function () {
      $("#viewAid").hide();
      $("#viewAid-label").hide();
      $('#showSchools').prop('checked', false);
      $('#showProjects').prop('checked', true);
      $('#showCollab').prop('checked', false);

    })


    $("#showSchools").on('change', function () {
      $("#viewAid").hide();
      $("#viewAid-label").hide();
      $('#showSchools').prop('checked', true);
      $('#showProjects').prop('checked', false);
      $('#showCollab').prop('checked', false);
    })

    $("#showCollab").on('change', function () {
      $("#viewAid").hide();
      $("#viewAid-label").hide();
      $('#showSchools').prop('checked', false);
      $('#showProjects').prop('checked', false);
      $('#showCollab').prop('checked', true);
    })*/
  }

  render() {
    return (
      <div className="control">
        <div className="checkbox-round">
          <a onClick={this.clickHandler}>
            <input id={this.props.id} type="checkbox" />
            <label htmlFor={this.props.id} />
          </a>
        </div>

        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default SelectButton;
