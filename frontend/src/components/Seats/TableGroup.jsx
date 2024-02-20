import "./TableGroup.css";
import table from './public/thistle-rect.svg'

const TableGroup = () => {
  return (
    <div className="table-group19">
      <img
        className="thistle-rect-icon"
        loading="eager"
        alt=""
        src={table}
      />
      <img
        className="orchid-rect-icon"
        loading="eager"
        alt=""
        src={table}
      />
      <div className="orchid">ORCHID</div>
      <img
        className="iris-rect-icon"
        loading="eager"
        alt=""
        src={table}
      />
      <div className="iris">IRIS</div>
      <div className="thistle">THISTLE</div>
    </div>
  );
};

export default TableGroup;
