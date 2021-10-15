import React from 'react'

//===> เขียน CSS แบบ Inline styling
const headerTab = {
  backgroundColor: 'powderblue'
};

    const orgPosition = ({ orgposition }) => {
      return (
        <div>
          <center style={headerTab}><h1>Get Data Org_Position From API(DB)</h1></center>
          {orgposition.map((_orgposition) => (
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">ID : {_orgposition.ObjectID}</h5>
                <h6 class="card-subtitle mb-2 text-muted">CODE : {_orgposition.PosCode}</h6>
                <h6 class="card-subtitle mb-2 text-muted">NAME : {_orgposition.PosName}</h6>
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default orgPosition