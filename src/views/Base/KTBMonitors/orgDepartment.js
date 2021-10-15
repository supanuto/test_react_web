import React from 'react'

//===> เขียน CSS แบบ Inline styling
const headerTab = {
  backgroundColor: 'powderblue'
};

    const orgDepartment = ({ orgdepartment }) => {
      return (
        <div>
          <center style={headerTab}><h1>Get Data Org_Department From API(DB)</h1></center>
          {orgdepartment.map((_orgdepartment, index) => (
            <div className="card" key={_orgdepartment.ObjectID}>
            <React.Fragment key={_orgdepartment.ObjectID}/> 
              <div className="card-body">
                <h5 className="card-title">ID : {_orgdepartment.ObjectID}</h5>
                <h6 className="card-subtitle mb-2 text-muted">CODE : {_orgdepartment.DeptCode}</h6>
                <h6 className="card-subtitle mb-2 text-muted">NAME : {_orgdepartment.DeptName}</h6>
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default orgDepartment