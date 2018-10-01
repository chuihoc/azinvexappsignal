import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
class ListSignals extends React.Component {
 
  render() {
    const { myActiveSignals, close, select, loading } = this.props
    return (
      <div className="col-md-12 col-lg-8">
        <div  className="card" style={loading ? {opacity:0.5} : {opacity:1}}>
          <div className="card-header">
            <h4 className="card-title">Các Lệnh Đang Chạy  {loading? 'Hide' : 'Show'}</h4>
          </div>
          <div className="card-body">
            <div className="card-block">
              <table className="table table-responsive-md-md table-striped table-bordered compact text-center table-hover">
                <thead>
                  <tr>
                    <th>Lệnh</th>
                    <th>Cặp Tiền</th>
                    <th>TL/TP</th>
                    <th>Thời Gian Vào</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {myActiveSignals && myActiveSignals.map( e =>
                    <tr key={e.id}>
                      <td>
                        {e.typeSignal ? <span className="badge badge-danger">SELL</span> : <span className="badge badge-success">BUY</span>}
                        <br />
                          <b>Open Price :</b>{e.openPrice}
                      </td>
                      <td> {e.symbol.toUpperCase()}</td>
                      <td>
                        <b>Stoploss : </b> {e.stoploss} <br /><b>Takeprofit : </b>{e.takeprofit}
                        </td>
                      <td>{moment(e.startAt.seconds*1000).format('HH:mm DD/MM/YYYY')}</td>
                      <td><img src="https://thumbs.gfycat.com/ImmaculateUnacceptableArizonaalligatorlizard-size_restricted.gif" alt="" height="40px" width="40px" /></td>
                      <td><a onClick={() => select(e)} className="btn btn-raised btn-warning mr-1" type="button"> <i className="ft-edit" /> Sửa Lệnh </a>
                        <a onClick={() => close(e.id)} className="btn btn-raised btn-danger mr-1" type="button"> <i className="ft-x" /> Tắt Lệnh </a>
                      </td>
                    </tr>
                    )}
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.async.loading,
  };

}

const actions = {

};


export default connect(mapStateToProps, actions)(ListSignals);